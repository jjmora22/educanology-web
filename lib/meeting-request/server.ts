const MAX_BODY_BYTES = 16_384;
const DELIVERY_TIMEOUT_MS = 10_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ALLOWED_MAIL_REGIONS = new Set(["fr-par"]);
const requestWindows = new Map<string, number[]>();

type FieldName =
  | "fullName"
  | "email"
  | "organization"
  | "role"
  | "message"
  | "privacyAcknowledged";

type MeetingRequestPayload = {
  fullName: string;
  email: string;
  organization: string;
  role: string;
  message: string;
  privacyAcknowledged: boolean;
  website: string;
};

type MailConfiguration = {
  apiKey: string;
  projectId: string;
  region: string;
  fromEmail: string;
  toEmail: string;
};

type HandlerOptions = {
  env?: NodeJS.ProcessEnv;
  now?: () => Date;
  sendEmail?: typeof fetch;
  logError?: (message: string) => void;
  isRateLimited?: (request: Request, now: Date) => boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SINGLE_LINE_PATTERN = /^[^\u0000-\u001f\u007f]*$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function jsonResponse(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

function parsePayload(value: unknown): MeetingRequestPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const input = value as Record<string, unknown>;

  return {
    fullName: text(input.fullName),
    email: text(input.email).toLowerCase(),
    organization: text(input.organization),
    role: text(input.role),
    message: text(input.message),
    privacyAcknowledged: input.privacyAcknowledged === true,
    website: text(input.website),
  };
}

function validatePayload(payload: MeetingRequestPayload) {
  const fieldErrors: Partial<Record<FieldName, string>> = {};

  if (
    payload.fullName.length < 2 ||
    payload.fullName.length > 120 ||
    !SINGLE_LINE_PATTERN.test(payload.fullName)
  ) {
    fieldErrors.fullName =
      "Indique um nome válido entre 2 e 120 caracteres.";
  }

  if (!isValidEmail(payload.email)) {
    fieldErrors.email = "Indique um endereço de email válido.";
  }

  if (
    payload.organization.length > 160 ||
    !SINGLE_LINE_PATTERN.test(payload.organization)
  ) {
    fieldErrors.organization = "Indique uma organização numa única linha.";
  }

  if (
    payload.role.length > 120 ||
    !SINGLE_LINE_PATTERN.test(payload.role)
  ) {
    fieldErrors.role = "Indique um cargo numa única linha.";
  }

  if (payload.message.length < 10 || payload.message.length > 3000) {
    fieldErrors.message = "Escreva uma mensagem entre 10 e 3000 caracteres.";
  }

  if (!payload.privacyAcknowledged) {
    fieldErrors.privacyAcknowledged =
      "Confirme que tomou conhecimento da Política de Privacidade.";
  }

  return fieldErrors;
}

function requestHasExpectedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const forwardedHost = request.headers
      .get("x-forwarded-host")
      ?.split(",")[0]
      .trim();
    const expectedHost =
      forwardedHost || request.headers.get("host") || requestUrl.host;
    const forwardedProto = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      .trim();
    const expectedProtocol = forwardedProto
      ? `${forwardedProto}:`
      : requestUrl.protocol;

    return originUrl.host === expectedHost && originUrl.protocol === expectedProtocol;
  } catch {
    return false;
  }
}

function isRequestRateLimited(request: Request, now: Date) {
  const clientAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";
  const windowStart = now.getTime() - RATE_LIMIT_WINDOW_MS;
  const recentRequests = (requestWindows.get(clientAddress) ?? []).filter(
    (timestamp) => timestamp > windowStart
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestWindows.set(clientAddress, recentRequests);
    return true;
  }

  recentRequests.push(now.getTime());
  requestWindows.set(clientAddress, recentRequests);

  if (requestWindows.size > 1_000) {
    for (const [key, timestamps] of requestWindows) {
      if (timestamps.every((timestamp) => timestamp <= windowStart)) {
        requestWindows.delete(key);
      }
    }
  }

  return false;
}

function getMailConfiguration(env: NodeJS.ProcessEnv): MailConfiguration | null {
  const enabled = text(env.MEETING_REQUEST_ENABLED) === "true";
  const apiKey = text(env.MAIL_API_KEY);
  const projectId = text(env.MAIL_PROJECT_ID);
  const region = text(env.MAIL_REGION) || "fr-par";
  const fromEmail = text(env.MEETING_FROM_EMAIL).toLowerCase();
  const toEmail = text(env.MEETING_TO_EMAIL).toLowerCase();

  if (
    !enabled ||
    !apiKey ||
    !UUID_PATTERN.test(projectId) ||
    !ALLOWED_MAIL_REGIONS.has(region) ||
    !isValidEmail(fromEmail) ||
    !isValidEmail(toEmail)
  ) {
    return null;
  }

  return { apiKey, projectId, region, fromEmail, toEmail };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmail(payload: MeetingRequestPayload, receivedAt: Date) {
  const receivedAtText = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Lisbon",
  }).format(receivedAt);
  const optionalLines = [
    payload.organization ? `Organização: ${payload.organization}` : null,
    payload.role ? `Cargo / Função: ${payload.role}` : null,
  ].filter(Boolean);
  const plainText = [
    "Novo pedido de reunião recebido em educanology.eu",
    "",
    `Nome: ${payload.fullName}`,
    `Email: ${payload.email}`,
    ...optionalLines,
    `Data de receção: ${receivedAtText}`,
    "",
    "Mensagem:",
    payload.message,
  ].join("\n");

  const optionalRows = [
    payload.organization
      ? `<p><strong>Organização:</strong> ${escapeHtml(payload.organization)}</p>`
      : "",
    payload.role
      ? `<p><strong>Cargo / Função:</strong> ${escapeHtml(payload.role)}</p>`
      : "",
  ].join("");

  return {
    subject: `Pedido de reunião — ${payload.fullName}`.slice(0, 200),
    text: plainText,
    html: [
      "<h1>Novo pedido de reunião</h1>",
      `<p><strong>Nome:</strong> ${escapeHtml(payload.fullName)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>`,
      optionalRows,
      `<p><strong>Data de receção:</strong> ${escapeHtml(receivedAtText)}</p>`,
      "<h2>Mensagem</h2>",
      `<p>${escapeHtml(payload.message).replaceAll("\n", "<br>")}</p>`,
    ].join(""),
  };
}

export async function handleMeetingRequest(
  request: Request,
  options: HandlerOptions = {}
) {
  if (!requestHasExpectedOrigin(request)) {
    return jsonResponse({ message: "Pedido inválido." }, 403);
  }

  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return jsonResponse({ message: "Formato de pedido inválido." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ message: "O pedido excede o tamanho permitido." }, 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ message: "Não foi possível ler o pedido." }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ message: "O pedido excede o tamanho permitido." }, 413);
  }

  let payload: MeetingRequestPayload | null;
  try {
    payload = parsePayload(JSON.parse(rawBody));
  } catch {
    payload = null;
  }

  if (!payload) {
    return jsonResponse({ message: "Pedido inválido." }, 400);
  }

  if (payload.website) {
    return jsonResponse({ message: "Pedido recebido." }, 200);
  }

  const fieldErrors = validatePayload(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return jsonResponse(
      { message: "Reveja os campos assinalados.", fieldErrors },
      400
    );
  }

  const now = (options.now ?? (() => new Date()))();
  if ((options.isRateLimited ?? isRequestRateLimited)(request, now)) {
    return jsonResponse(
      { message: "Recebemos vários pedidos num curto espaço de tempo." },
      429
    );
  }

  const configuration = getMailConfiguration(options.env ?? process.env);
  if (!configuration) {
    return jsonResponse(
      { message: "O envio de pedidos ainda não está disponível." },
      503
    );
  }

  const email = buildEmail(payload, now);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

  try {
    const response = await (options.sendEmail ?? fetch)(
      `https://api.scaleway.com/transactional-email/v1alpha1/regions/${configuration.region}/emails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": configuration.apiKey,
        },
        body: JSON.stringify({
          project_id: configuration.projectId,
          from: { email: configuration.fromEmail, name: "Educanology" },
          to: [{ email: configuration.toEmail }],
          subject: email.subject,
          text: email.text,
          html: email.html,
          additional_headers: [
            { key: "Reply-To", value: payload.email },
          ],
        }),
        cache: "no-store",
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      options.logError?.("Meeting request email delivery failed.");
      return jsonResponse(
        {
          message:
            "Não foi possível enviar o pedido. Tente novamente mais tarde.",
        },
        502
      );
    }

    return jsonResponse({ message: "Pedido recebido." }, 200);
  } catch {
    options.logError?.("Meeting request email delivery failed.");
    return jsonResponse(
      {
        message:
          "Não foi possível enviar o pedido. Tente novamente mais tarde.",
      },
      502
    );
  } finally {
    clearTimeout(timeout);
  }
}
