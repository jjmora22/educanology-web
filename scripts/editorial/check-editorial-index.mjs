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
const indexPath = path.join(
  projectRoot,
  "content/editorial-index/editorial-index.json"
);
const inputBaseName = path.basename(inputProposalPath, ".json");
const outputBaseName = slugify(inputBaseName || "editorial-index-check");
const outputDir = path.join(projectRoot, "content/editorial-index-checks");
const markdownOutputPath = path.join(outputDir, `${outputBaseName}.md`);
const jsonOutputPath = path.join(outputDir, `${outputBaseName}.json`);

const STOP_WORDS = new Set([
  "a",
  "ao",
  "aos",
  "as",
  "com",
  "como",
  "da",
  "das",
  "de",
  "do",
  "dos",
  "e",
  "em",
  "na",
  "nas",
  "no",
  "nos",
  "o",
  "os",
  "ou",
  "para",
  "por",
  "que",
  "se",
  "sem",
  "um",
  "uma",
]);

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

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordsFrom(value) {
  return normalizeText(value)
    .split(" ")
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function overlapRatio(sourceValues, targetValues) {
  const source = new Set(sourceValues.map(normalizeText).filter(Boolean));
  const target = new Set(targetValues.map(normalizeText).filter(Boolean));

  if (source.size === 0 || target.size === 0) return 0;

  let matches = 0;
  for (const value of source) {
    if (target.has(value)) matches += 1;
  }

  return matches / Math.min(source.size, target.size);
}

function selectProposal(batch) {
  const humanSelection = batch.humanSelection;
  const hasHumanSelection =
    humanSelection &&
    ["selected", "approved"].includes(humanSelection.decision) &&
    humanSelection.selectedProposalId;

  const selectedId = hasHumanSelection
    ? humanSelection.selectedProposalId
    : batch.selectedProposalId || batch.recommendedProposalId;

  if (selectedId) {
    const selected = batch.proposals.find((proposal) => proposal.id === selectedId);

    if (selected) {
      return {
        proposal: selected,
        selectionSource: hasHumanSelection
          ? "humanSelection"
          : batch.selectedProposalId
            ? "selectedProposalId"
            : "recommendedProposalId",
      };
    }
  }

  const highestScoring = [...batch.proposals].sort(
    (a, b) => (b.recommendation?.score || 0) - (a.recommendation?.score || 0)
  )[0];

  return {
    proposal: highestScoring,
    selectionSource: "highest_score",
  };
}

function proposalKeywords(proposal) {
  return unique([
    ...wordsFrom(proposal.title),
    ...wordsFrom(proposal.suggestedEducanologyAngle),
    ...wordsFrom(proposal.whyItMatters),
    ...proposal.confirmedFacts.flatMap(wordsFrom),
    ...proposal.interpretation.flatMap(wordsFrom),
  ]);
}

function proposalSubtopics(proposal) {
  return unique([
    ...proposal.interpretation.flatMap((item) => wordsFrom(item).slice(0, 5)),
    ...wordsFrom(proposal.suggestedEducanologyAngle).slice(0, 10),
  ]);
}

function proposalSourceUrls(proposal) {
  return unique((proposal.sources || []).map((source) => source.url));
}

function compareWithEntry(proposal, entry) {
  const categoryMatch = proposal.category === entry.category;
  const keywords = proposalKeywords(proposal);
  const subtopics = proposalSubtopics(proposal);
  const entryKeywords = (entry.keywords || []).flatMap(wordsFrom);
  const entrySubtopics = (entry.subtopics || []).flatMap(wordsFrom);
  const sourceUrls = proposalSourceUrls(proposal);
  const titleAndAngleWords = wordsFrom(
    `${proposal.title} ${proposal.suggestedEducanologyAngle}`
  );
  const entryTopicWords = wordsFrom(
    `${entry.title} ${entry.mainTopic} ${entry.summary}`
  );

  const keywordOverlap = overlapRatio(keywords, entryKeywords);
  const subtopicOverlap = overlapRatio(subtopics, entrySubtopics);
  const mainTopicSimilarity = overlapRatio(titleAndAngleWords, entryTopicWords);
  const sourceOverlap = overlapRatio(sourceUrls, entry.sourceUrls || []);
  const score =
    (categoryMatch ? 0.2 : 0) +
    keywordOverlap * 0.3 +
    subtopicOverlap * 0.2 +
    mainTopicSimilarity * 0.2 +
    sourceOverlap * 0.1;

  return {
    contentId: entry.id,
    title: entry.title,
    slug: entry.slug,
    status: entry.status,
    category: entry.category,
    categoryMatch,
    keywordOverlap,
    subtopicOverlap,
    mainTopicSimilarity,
    sourceOverlap,
    score,
    recommendedAction: entry.recommendedAction,
  };
}

function hasDistinctAngle(proposal) {
  const text = normalizeText(`${proposal.title} ${proposal.suggestedEducanologyAngle}`);
  return (
    text.includes("human first") ||
    text.includes("bicicleta") ||
    text.includes("capacidades humanas") ||
    text.includes("competencias fundamentais") ||
    text.includes("neuromitos")
  );
}

function hasNewSource(proposal, bestMatch) {
  const sourceUrls = proposalSourceUrls(proposal);
  return sourceUrls.length > 0 && bestMatch.sourceOverlap < 1;
}

function recommendAction(proposal, bestMatch) {
  const highOverlap =
    bestMatch.categoryMatch &&
    (bestMatch.keywordOverlap >= 0.6 ||
      bestMatch.subtopicOverlap >= 0.55 ||
      bestMatch.mainTopicSimilarity >= 0.55);
  const mediumOverlap =
    bestMatch.categoryMatch &&
    (bestMatch.keywordOverlap >= 0.3 ||
      bestMatch.subtopicOverlap >= 0.3 ||
      bestMatch.mainTopicSimilarity >= 0.3);
  const correction = normalizeText(proposal.title).includes("correcao");
  const distinctAngle = hasDistinctAngle(proposal);
  const newSource = hasNewSource(proposal, bestMatch);
  const enoughSubstance =
    (proposal.confirmedFacts || []).length + (proposal.interpretation || []).length >= 4;

  if (correction) {
    return {
      recommendation: "correction",
      duplicationRisk: "medium",
      reasoning: "A proposta aparenta corrigir conteúdo existente.",
      nextAction:
        "Validar a alegada correção, identificar o conteúdo afetado e rever a publicação existente antes de comunicar.",
    };
  }

  if (highOverlap && !distinctAngle && !newSource) {
    return {
      recommendation: "reject_duplicate",
      duplicationRisk: "high",
      reasoning:
        "Há elevada sobreposição com conteúdo existente e não foi identificado ângulo, fonte ou implicação prática suficientemente nova.",
      nextAction:
        "Rejeitar como duplicado ou reformular a proposta com fonte, público ou tese editorial distinta.",
    };
  }

  if (highOverlap && newSource && !distinctAngle) {
    return {
      recommendation: "update_existing",
      duplicationRisk: "high",
      reasoning:
        "Há elevada sobreposição com conteúdo existente, mas a proposta introduz fonte ou implicação nova que pode justificar atualização.",
      nextAction:
        "Rever o artigo existente e decidir que secção deve ser atualizada antes de criar novo conteúdo.",
    };
  }

  if (mediumOverlap && distinctAngle) {
    return {
      recommendation: "follow_up",
      duplicationRisk: "medium",
      reasoning:
        "A proposta está relacionada com conteúdo existente, mas tem ângulo editorial distinto e útil para um artigo de seguimento.",
      nextAction:
        "Avançar como follow-up após validação humana das fontes e confirmação de que o artigo anterior será referenciado ou ligado.",
    };
  }

  if (!enoughSubstance) {
    return {
      recommendation: "linkedin_only",
      duplicationRisk: "low",
      reasoning:
        "A proposta parece útil, mas ainda não tem profundidade suficiente para artigo editorial completo.",
      nextAction:
        "Preparar publicação LinkedIn curta ou pedir pesquisa adicional antes de criar artigo.",
    };
  }

  return {
    recommendation: "new_article",
    duplicationRisk: mediumOverlap ? "medium" : "low",
    reasoning:
      "A proposta tem substância e não apresenta sobreposição suficiente para bloquear novo artigo.",
    nextAction:
      "Avançar para revisão humana, pacote editorial e validação de fontes antes de publicação.",
  };
}

function percent(value) {
  return `${Math.round(value * 100)}%`;
}

function createMarkdown(report) {
  return [
    "# Verificação do Índice Editorial - Educanology",
    "",
    "## 1. Resumo executivo",
    "",
    `A proposta selecionada foi comparada com ${report.totalIndexEntries} entradas do índice editorial interno. A recomendação é **${report.recommendation}** com risco de duplicação **${report.duplicationRisk}**.`,
    "",
    `- Proposta selecionada: ${report.selectedProposal.title}`,
    `- Fonte da seleção: ${report.selectionSource}`,
    `- Categoria: ${report.selectedProposal.category}`,
    `- Conteúdo mais próximo: ${report.bestMatch.title}`,
    `- Próxima ação: ${report.nextAction}`,
    "",
    "## 2. Ficheiro de proposta analisado",
    "",
    report.inputProposalFile,
    "",
    "## 3. Proposta selecionada",
    "",
    `- ID: \`${report.selectedProposal.id}\``,
    `- Título: ${report.selectedProposal.title}`,
    `- Revisor recomendado: ${report.selectedProposal.recommendedReviewer}`,
    `- Pontuação editorial: ${report.selectedProposal.score}`,
    "",
    "## 4. Categoria",
    "",
    report.selectedProposal.category,
    "",
    "## 5. Recomendação",
    "",
    report.recommendation,
    "",
    "## 6. Risco de duplicação",
    "",
    report.duplicationRisk,
    "",
    "## 7. Conteúdo existente com maior correspondência",
    "",
    `- ID: \`${report.bestMatch.contentId}\``,
    `- Título: ${report.bestMatch.title}`,
    `- Estado: ${report.bestMatch.status}`,
    `- Categoria: ${report.bestMatch.category}`,
    `- Score combinado: ${percent(report.bestMatch.score)}`,
    "",
    "## 8. Sinais de similaridade",
    "",
    `- Categoria coincide: ${report.bestMatch.categoryMatch ? "Sim" : "Não"}`,
    `- Sobreposição de palavras-chave: ${percent(report.bestMatch.keywordOverlap)}`,
    `- Sobreposição de subtemas: ${percent(report.bestMatch.subtopicOverlap)}`,
    `- Similaridade de tópico principal: ${percent(report.bestMatch.mainTopicSimilarity)}`,
    `- Sobreposição de fontes: ${percent(report.bestMatch.sourceOverlap)}`,
    "",
    "## 9. Raciocínio",
    "",
    report.reasoning,
    "",
    "## 10. Próxima ação sugerida",
    "",
    report.nextAction,
    "",
    "## 11. Checklist de revisão humana",
    "",
    "- [ ] Confirmar se a proposta selecionada é a correta.",
    "- [ ] Abrir o conteúdo existente com maior correspondência.",
    "- [ ] Validar se o novo ângulo é realmente distinto.",
    "- [ ] Confirmar se há novas fontes, atualização institucional ou implicação prática relevante.",
    "- [ ] Decidir entre novo artigo, atualização, seguimento, correção, LinkedIn-only ou rejeição como duplicado.",
    "- [ ] Registar a decisão no índice editorial depois de aprovada.",
    "",
    "## Correspondências analisadas",
    "",
    ...report.matches.map((match, index) =>
      [
        `### ${index + 1}. ${match.title}`,
        "",
        `- ID: \`${match.contentId}\``,
        `- Categoria coincide: ${match.categoryMatch ? "Sim" : "Não"}`,
        `- Palavras-chave: ${percent(match.keywordOverlap)}`,
        `- Subtemas: ${percent(match.subtopicOverlap)}`,
        `- Tópico principal: ${percent(match.mainTopicSimilarity)}`,
        `- Fontes: ${percent(match.sourceOverlap)}`,
        `- Score combinado: ${percent(match.score)}`,
      ].join("\n")
    ),
  ].join("\n");
}

if (!fs.existsSync(inputProposalPath)) {
  console.error("Editorial index check failed: proposal input file not found.");
  console.error(inputProposalPath);
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error("Editorial index check failed: editorial index file not found.");
  console.error(indexPath);
  process.exit(1);
}

const batch = readJson(inputProposalPath);
const editorialIndex = readJson(indexPath);
const selected = selectProposal(batch);

if (!selected.proposal) {
  console.error("Editorial index check failed: no proposal could be selected.");
  process.exit(1);
}

const matches = editorialIndex.entries
  .filter(
    (entry) =>
      normalizeText(entry.title) !== normalizeText(selected.proposal.title)
  )
  .map((entry) => compareWithEntry(selected.proposal, entry))
  .sort((a, b) => b.score - a.score);
const bestMatch = matches[0];
const decision = recommendAction(selected.proposal, bestMatch);
const report = {
  id: outputBaseName,
  inputProposalFile: inputProposalPath,
  editorialIndexFile: indexPath,
  generatedAt: new Date().toISOString(),
  selectionSource: selected.selectionSource,
  selectedProposal: {
    id: selected.proposal.id,
    title: selected.proposal.title,
    category: selected.proposal.category,
    recommendedReviewer: selected.proposal.recommendedReviewer,
    score: selected.proposal.recommendation?.score || null,
  },
  recommendation: decision.recommendation,
  duplicationRisk: decision.duplicationRisk,
  bestMatch,
  matches,
  reasoning: decision.reasoning,
  nextAction: decision.nextAction,
  totalIndexEntries: editorialIndex.entries.length,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(jsonOutputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
fs.writeFileSync(markdownOutputPath, `${createMarkdown(report)}\n`, "utf8");

console.log("Editorial index check completed:");
console.log(`Input file: ${inputProposalPath}`);
console.log(`Selected proposal: ${report.selectedProposal.title}`);
console.log(`Recommendation: ${report.recommendation}`);
console.log(`Duplication risk: ${report.duplicationRisk}`);
console.log(`Markdown report: ${markdownOutputPath}`);
console.log(`JSON report: ${jsonOutputPath}`);
console.log(`Next recommended action: ${report.nextAction}`);
