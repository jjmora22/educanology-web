import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");

const proposalPath = path.join(
  projectRoot,
  "content/editorial-proposals/sample-topic-proposals.json"
);
const workflowPath = path.join(
  projectRoot,
  "content/editorial-workflows/sample-guided-workflow.json"
);
const outputPath = path.join(
  projectRoot,
  "content/editorial-review-packets/sample-review-packet.md"
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function formatList(items) {
  if (!items || items.length === 0) return "- Sem informação disponível.";
  return items.map((item) => `- ${item}`).join("\n");
}

function formatSources(sources) {
  if (!sources || sources.length === 0) return "- Sem fontes associadas.";

  return sources
    .map((source) => {
      const verification = source.requiresHumanVerification ? "Sim" : "Não";
      return [
        `- [${source.title}](${source.url})`,
        `  - Entidade: ${source.publisher || "a confirmar"}`,
        `  - Tipo: ${source.sourceType}`,
        `  - Confiança: ${source.confidence}`,
        `  - Verificação humana necessária: ${verification}`,
        `  - Factos confirmados:`,
        formatList(source.confirmedFacts)
          .split("\n")
          .map((line) => `    ${line}`)
          .join("\n"),
        source.notes ? `  - Notas: ${source.notes}` : undefined,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

function formatProposalSummary(proposal) {
  return [
    `### ${proposal.title}`,
    "",
    `- ID: \`${proposal.id}\``,
    `- Prioridade: ${proposal.recommendation.priority}`,
    `- Pontuação: ${proposal.recommendation.score}`,
    `- Revisor recomendado: ${proposal.recommendedReviewer}`,
    `- Decisão: ${proposal.approvalDecision}`,
    "",
    "**Porque importa agora**",
    "",
    proposal.whyItMatters,
    "",
    "**Ângulo Educanology sugerido**",
    "",
    proposal.suggestedEducanologyAngle,
  ].join("\n");
}

function formatProposalDetails(proposal) {
  return [
    `## Proposta: ${proposal.title}`,
    "",
    `- ID: \`${proposal.id}\``,
    `- Estado: ${proposal.status}`,
    `- Revisor recomendado: ${proposal.recommendedReviewer}`,
    `- Prioridade: ${proposal.recommendation.priority}`,
    `- Pontuação: ${proposal.recommendation.score}`,
    `- Justificação da recomendação: ${proposal.recommendation.rationale}`,
    "",
    "### Factos confirmados",
    "",
    formatList(proposal.confirmedFacts),
    "",
    "### Interpretação / oportunidade editorial",
    "",
    formatList(proposal.interpretation),
    "",
    "### Ângulo Educanology sugerido",
    "",
    proposal.suggestedEducanologyAngle,
    "",
    "### Fontes",
    "",
    formatSources(proposal.sources),
  ].join("\n");
}

function formatChronology(proposals) {
  const rows = [];

  for (const proposal of proposals) {
    for (const source of proposal.sources || []) {
      rows.push({
        date: source.publishedAt || "data a confirmar",
        source: source.title,
        relevance: source.confirmedFacts?.[0] || "relevância a confirmar",
        implication: proposal.suggestedEducanologyAngle,
        url: source.url,
      });
    }
  }

  if (rows.length === 0) return "Sem cronologia disponível.";

  return [
    "| Data | Fonte / evento | Relevância | Implicação editorial |",
    "| --- | --- | --- | --- |",
    ...rows.map(
      (row) =>
        `| ${row.date} | [${row.source}](${row.url}) | ${row.relevance} | ${row.implication} |`
    ),
  ].join("\n");
}

function buildReviewPacket({ batch, workflow }) {
  const recommended =
    batch.proposals.find(
      (proposal) => proposal.id === batch.recommendedProposalId
    ) || batch.proposals[0];

  const proposals = batch.proposals.slice(0, 5);
  const verificationNeeded = proposals.some((proposal) =>
    proposal.sources?.some((source) => source.requiresHumanVerification)
  );

  return [
    "# Pacote de Revisão Editorial - Educanology",
    "",
    "## Revisão rápida: decisão em 60-90 segundos",
    "",
    "### Resumo executivo",
    "",
    `Este pacote apresenta ${proposals.length} propostas editoriais para a categoria **${batch.category}**. O fluxo está no passo **${workflow.currentStep}** e aguarda seleção humana antes de qualquer geração final, publicação ou preparação de LinkedIn.`,
    "",
    `- Categoria editorial: ${batch.category}`,
    `- Dia editorial: ${batch.workingDay}`,
    `- Passo atual: ${workflow.currentStep}`,
    `- Revisor indicado no fluxo: ${workflow.reviewer || "a confirmar"}`,
    `- Proposta recomendada: ${recommended ? recommended.title : "a confirmar"}`,
    `- Verificação humana de fontes necessária: ${verificationNeeded ? "Sim" : "Não"}`,
    `- Próxima ação: ${workflow.nextAction}`,
    "",
    "### Recomendação editorial",
    "",
    recommended ? formatProposalSummary(recommended) : "Sem recomendação.",
    "",
    "### Lista rápida de propostas",
    "",
    ...proposals.map((proposal, index) => [
      `${index + 1}. **${proposal.title}**`,
      `   - Prioridade: ${proposal.recommendation.priority}`,
      `   - Pontuação: ${proposal.recommendation.score}`,
      `   - Revisor: ${proposal.recommendedReviewer}`,
      `   - Verificação humana: ${
        proposal.sources?.some((source) => source.requiresHumanVerification)
          ? "Sim"
          : "Não"
      }`,
    ].join("\n")),
    "",
    "### Checklist de decisão rápida",
    "",
    "- [ ] A categoria corresponde à linha editorial do dia.",
    "- [ ] O tema recomendado é oportuno e relevante para Educanology.",
    "- [ ] As fontes são suficientemente credíveis para avançar.",
    "- [ ] Os factos confirmados estão separados da interpretação.",
    "- [ ] Não há promessas, dados privados, chamadas de financiamento inventadas ou afirmações legais/financeiras não verificadas.",
    "- [ ] Daniel ou Juan José seleciona uma proposta ou pede nova pesquisa.",
    "",
    "### Decisões possíveis",
    "",
    "- Aprovar proposta recomendada.",
    "- Aprovar outra proposta.",
    "- Pedir revisão do ângulo.",
    "- Pedir nova pesquisa.",
    "- Rejeitar o lote.",
    "",
    "## Validação aprofundada",
    "",
    "### Cronologia",
    "",
    formatChronology(proposals),
    "",
    "### Riscos e pontos a verificar",
    "",
    "- Confirmar datas de publicação das fontes antes de citar no artigo final.",
    "- Confirmar se cada URL continua ativo e aponta para a página institucional correta.",
    "- Evitar transformar recomendações institucionais gerais em obrigações legais específicas.",
    "- Não apresentar interpretação Educanology como facto confirmado.",
    "- Não iniciar artigo final antes de seleção humana do tema e do ângulo.",
    "",
    ...proposals.map((proposal) => `${formatProposalDetails(proposal)}\n`),
    "",
    "## Secção pronta para email",
    "",
    "Assunto: Seleção de tema editorial Educanology",
    "",
    `Olá,\n\nSegue o pacote de revisão editorial para **${batch.category}**.\n\nProposta recomendada: **${recommended ? recommended.title : "a confirmar"}**.\n\nMotivo: ${recommended ? recommended.recommendation.rationale : "a confirmar"}\n\nPróxima ação: selecionar uma proposta, pedir revisão do ângulo ou solicitar nova pesquisa antes de gerar o artigo final.\n\nObrigado.`,
    "",
    "## Estado do fluxo",
    "",
    `- Workflow ID: \`${workflow.id}\``,
    `- Proposal batch ID: \`${batch.id}\``,
    `- Estado do lote: ${batch.status}`,
    `- Aprovação: ${workflow.approvalStatus}`,
    `- Criado em: ${workflow.createdAt}`,
    `- Atualizado em: ${workflow.updatedAt}`,
  ].join("\n");
}

const batch = readJson(proposalPath);
const workflow = readJson(workflowPath);
const markdown = buildReviewPacket({ batch, workflow });

fs.writeFileSync(outputPath, `${markdown}\n`, "utf8");

console.log("Editorial review packet created:");
console.log(outputPath);
