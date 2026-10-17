import assert from "node:assert/strict";
import test from "node:test";
import { handleMeetingRequest } from "../lib/meeting-request/server.ts";

const validPayload = {
  fullName: "Pessoa de Teste",
  email: "pessoa@example.test",
  organization: "Entidade Fictícia",
  role: "Responsável de teste",
  message: "Este é um pedido inteiramente fictício para validar o formulário.",
  privacyAcknowledged: true,
  website: "",
};

const validEnv = {
  MAIL_API_KEY: "fake-development-key",
  MAIL_PROJECT_ID: "00000000-0000-4000-8000-000000000000",
  MAIL_REGION: "fr-par",
  MEETING_FROM_EMAIL: "reunioes@example.test",
  MEETING_TO_EMAIL: "equipa@example.test",
};

function makeRequest(payload = validPayload, headers = {}) {
  return new Request("https://educanology.eu/api/meeting-request", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://educanology.eu",
      ...headers,
    },
    body: JSON.stringify(payload),
  });
}

const noRateLimit = () => false;

test("rejeita pedidos provenientes de outra origem", async () => {
  let called = false;
  const response = await handleMeetingRequest(
    makeRequest(validPayload, { origin: "https://example.test" }),
    {
      env: validEnv,
      isRateLimited: noRateLimit,
      sendEmail: async () => {
        called = true;
        return new Response(null, { status: 200 });
      },
    }
  );

  assert.equal(response.status, 403);
  assert.equal(called, false);
});

test("valida todos os campos no servidor", async () => {
  const response = await handleMeetingRequest(
    makeRequest({
      fullName: "A",
      email: "invalido",
      organization: "O".repeat(161),
      role: "C".repeat(121),
      message: "curta",
      privacyAcknowledged: false,
      website: "",
    }),
    { env: validEnv, isRateLimited: noRateLimit }
  );
  const result = await response.json();

  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys(result.fieldErrors).sort(), [
    "email",
    "fullName",
    "message",
    "organization",
    "privacyAcknowledged",
    "role",
  ]);
});

test("aceita silenciosamente o honeypot sem contactar o fornecedor", async () => {
  let called = false;
  const response = await handleMeetingRequest(
    makeRequest({ ...validPayload, website: "https://bot.example" }),
    {
      env: validEnv,
      sendEmail: async () => {
        called = true;
        return new Response(null, { status: 200 });
      },
    }
  );

  assert.equal(response.status, 200);
  assert.equal(called, false);
});

test("permanece inativo quando faltam credenciais", async () => {
  const response = await handleMeetingRequest(makeRequest(), {
    env: {},
    isRateLimited: noRateLimit,
  });
  const result = await response.json();

  assert.equal(response.status, 503);
  assert.equal(result.message, "O envio de pedidos ainda não está disponível.");
});

test("simula um envio válido sem efetuar chamadas externas", async () => {
  let destination = "";
  let requestBody;
  const response = await handleMeetingRequest(
    makeRequest({
      ...validPayload,
      fullName: "Pessoa <Teste>",
      message: "Mensagem fictícia com <script> e conteúdo suficiente.",
    }),
    {
      env: validEnv,
      now: () => new Date("2026-10-17T10:30:00.000Z"),
      isRateLimited: noRateLimit,
      sendEmail: async (url, init) => {
        destination = String(url);
        requestBody = JSON.parse(String(init?.body));
        return new Response(JSON.stringify({ emails: [] }), { status: 200 });
      },
    }
  );

  assert.equal(response.status, 200);
  assert.equal(
    destination,
    "https://api.scaleway.com/transactional-email/v1alpha1/regions/fr-par/emails"
  );
  assert.equal(requestBody.from.email, "reunioes@example.test");
  assert.equal(requestBody.to[0].email, "equipa@example.test");
  assert.deepEqual(requestBody.additional_headers, [
    { key: "Reply-To", value: "pessoa@example.test" },
  ]);
  assert.match(requestBody.text, /Pessoa <Teste>/);
  assert.doesNotMatch(requestBody.html, /<script>/);
  assert.match(requestBody.html, /&lt;script&gt;/);
});

test("não confirma o envio quando o fornecedor falha", async () => {
  const logged = [];
  const response = await handleMeetingRequest(makeRequest(), {
    env: validEnv,
    isRateLimited: noRateLimit,
    sendEmail: async () => new Response(null, { status: 500 }),
    logError: (message) => logged.push(message),
  });
  const result = await response.json();

  assert.equal(response.status, 502);
  assert.match(result.message, /Não foi possível enviar/);
  assert.deepEqual(logged, ["Meeting request email delivery failed."]);
  assert.doesNotMatch(logged.join(" "), /pessoa@example\.test/);
});

test("devolve 429 quando a proteção de frequência bloqueia o pedido", async () => {
  const response = await handleMeetingRequest(makeRequest(), {
    env: validEnv,
    isRateLimited: () => true,
  });

  assert.equal(response.status, 429);
});

test("rejeita corpos acima do limite", async () => {
  const response = await handleMeetingRequest(
    makeRequest(validPayload, { "content-length": "20000" }),
    { env: validEnv, isRateLimited: noRateLimit }
  );

  assert.equal(response.status, 413);
});
