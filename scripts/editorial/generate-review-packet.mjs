import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");

const defaultProposalPath = path.join(
  projectRoot,
  "content/editorial-proposals/sample-topic-proposals.json"
);
const inputProposalPath = process.argv[2]
  ? path.resolve(projectRoot, process.argv[2])
  : defaultProposalPath;
const workflowPath = path.join(
  projectRoot,
  "content/editorial-workflows/sample-guided-workflow.json"
);
const inputBaseName = path.basename(inputProposalPath, ".json");
const isDefaultInput = inputProposalPath === defaultProposalPath;
const outputBaseName = isDefaultInput
  ? "sample-review-packet"
  : slugify(inputBaseName || "editorial-review-packet");
const outputPath = path.join(
  projectRoot,
  `content/editorial-review-packets/${outputBaseName}.md`
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
        `  - Data: ${source.publishedAt || "data a confirmar"}`,
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

function resolveSelectedProposal(batch) {
  const selection = batch.humanSelection;
  const hasHumanSelection =
    selection &&
    ["selected", "approved"].includes(selection.decision) &&
    selection.selectedProposalId;

  if (hasHumanSelection) {
    const selected = batch.proposals.find(
      (proposal) => proposal.id === selection.selectedProposalId
    );

    if (selected) {
      return {
        proposal: selected,
        source: "humanSelection",
      };
    }
  }

  if (batch.selectedProposalId) {
    const selected = batch.proposals.find(
      (proposal) => proposal.id === batch.selectedProposalId
    );

    if (selected) {
      return {
        proposal: selected,
        source: "batch.selectedProposalId",
      };
    }
  }

  return {
    proposal: null,
    source: "pending_human_selection",
  };
}

function formatHumanSelection(selection) {
  if (!selection) {
    return [
      "- Existe seleção humana: Não",
      "- Estado: lote pendente de seleção humana.",
      "- selectedProposalId: a confirmar",
      "- selectedBy: a confirmar",
      "- selectedAt: a confirmar",
      "- decision: pending_human_selection",
      "- notes: Daniel ou Juan José deve selecionar uma proposta antes de gerar o pacote final.",
    ].join("\n");
  }

  return [
    "- Existe seleção humana: Sim",
    `- selectedProposalId: ${selection.selectedProposalId || "a confirmar"}`,
    `- selectedBy: ${selection.selectedBy || "a confirmar"}`,
    `- selectedAt: ${selection.selectedAt || "a confirmar"}`,
    `- decision: ${selection.decision || "a confirmar"}`,
    `- notes: ${selection.notes || "sem notas"}`,
  ].join("\n");
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
  const selected = resolveSelectedProposal(batch);
  const selectedProposal = selected.proposal;
  const alternatives = batch.proposals.filter(
    (proposal) => proposal.id !== selectedProposal?.id
  );

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
    `Este pacote apresenta ${proposals.length} propostas editoriais para a categoria **${batch.category}**. O fluxo está no passo **${workflow.currentStep}**. ${
      selectedProposal
        ? "Existe uma seleção humana registada ou uma seleção explícita no lote; a proposta deve ainda ser revista antes de qualquer publicação."
        : "O lote está pendente de seleção humana antes de qualquer geração final, publicação ou preparação de LinkedIn."
    }`,
    "",
    `- Categoria editorial: ${batch.category}`,
    `- Dia editorial: ${batch.workingDay}`,
    `- Passo atual: ${workflow.currentStep}`,
    `- Revisor indicado no fluxo: ${workflow.reviewer || "a confirmar"}`,
    `- Seleção humana: ${batch.humanSelection ? "Sim" : "Não"}`,
    `- Proposta selecionada: ${selectedProposal ? selectedProposal.title : "pendente de seleção humana"}`,
    `- Proposta recomendada: ${recommended ? recommended.title : "a confirmar"}`,
    `- Verificação humana de fontes necessária: ${verificationNeeded ? "Sim" : "Não"}`,
    `- Próxima ação: ${workflow.nextAction}`,
    "",
    "### Seleção humana",
    "",
    formatHumanSelection(batch.humanSelection),
    "",
    "### Tema selecionado",
    "",
    selectedProposal
      ? formatProposalSummary(selectedProposal)
      : "Sem tema selecionado. O lote deve ser validado por Daniel ou Juan José antes de avançar.",
    "",
    "### Recomendação editorial",
    "",
    recommended ? formatProposalSummary(recommended) : "Sem recomendação.",
    "",
    "### Temas alternativos",
    "",
    alternatives.length > 0
      ? alternatives
          .map(
            (proposal, index) =>
              `${index + 1}. **${proposal.title}**\n   - ID: \`${proposal.id}\`\n   - Prioridade: ${proposal.recommendation.priority}\n   - Pontuação: ${proposal.recommendation.score}\n   - Revisor: ${proposal.recommendedReviewer}`
          )
          .join("\n")
      : "Sem temas alternativos.",
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
    "- [ ] A seleção humana, quando existe, corresponde ao tema que deve avançar.",
    "- [ ] As fontes são suficientemente credíveis para avançar.",
    "- [ ] Os factos confirmados estão separados da interpretação.",
    "- [ ] Não há promessas, dados privados, chamadas de financiamento inventadas ou afirmações legais/financeiras não verificadas.",
    "- [ ] Daniel ou Juan José confirma a seleção, pede revisão do ângulo ou pede nova pesquisa.",
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
    "### Fontes e confiança",
    "",
    formatSources(proposals.flatMap((proposal) => proposal.sources || [])),
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
    "- Não iniciar artigo final antes de confirmação humana do tema e do ângulo.",
    "- Confirmar que a seleção humana, se existir, foi feita pela pessoa indicada.",
    "",
    ...proposals.map((proposal) => `${formatProposalDetails(proposal)}\n`),
    "",
    "## Secção pronta para email",
    "",
    "Assunto: Seleção de tema editorial Educanology",
    "",
    `Olá,\n\nSegue o pacote de revisão editorial para **${batch.category}**.\n\nProposta selecionada: **${selectedProposal ? selectedProposal.title : "pendente de seleção"}**.\n\nProposta recomendada: **${recommended ? recommended.title : "a confirmar"}**.\n\nMotivo: ${recommended ? recommended.recommendation.rationale : "a confirmar"}\n\nPróxima ação: confirmar a seleção, pedir revisão do ângulo ou solicitar nova pesquisa antes de gerar o artigo final.\n\nObrigado.`,
    "",
    "## Estado do fluxo",
    "",
    `- Workflow ID: \`${workflow.id}\``,
    `- Proposal batch ID: \`${batch.id}\``,
    `- Estado do lote: ${batch.status}`,
    `- Fonte da seleção: ${selected.source}`,
    `- Aprovação: ${workflow.approvalStatus}`,
    `- Criado em: ${workflow.createdAt}`,
    `- Atualizado em: ${workflow.updatedAt}`,
  ].join("\n");
}

const batch = readJson(inputProposalPath);
const workflow = readJson(workflowPath);
const markdown = buildReviewPacket({ batch, workflow });

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${markdown}\n`, "utf8");

console.log("Editorial review packet created:");
console.log(outputPath);
