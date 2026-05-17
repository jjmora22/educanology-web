import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");
const workspaceId = process.argv[2] || "2026-05-15-ia-na-educacao";
const workspaceDir = path.join(
  projectRoot,
  "content/editorial-workspace",
  workspaceId
);

const sourcePaths = {
  proposalJson: `content/editorial-proposals/${workspaceId}.json`,
  indexCheckMarkdown: `content/editorial-index-checks/${workspaceId}.md`,
  indexCheckJson: `content/editorial-index-checks/${workspaceId}.json`,
  reviewPacketMarkdown: `content/editorial-review-packets/${workspaceId}.md`,
  draftPackageMarkdown: `content/editorial-draft-packages/${workspaceId}.md`,
  draftPackageJson: `content/editorial-draft-packages/${workspaceId}.json`,
  finalReviewMarkdown: `content/editorial-final-reviews/${workspaceId}.md`,
  finalReviewJson: `content/editorial-final-reviews/${workspaceId}.json`,
  publicationCandidateMarkdown: `content/editorial-publication-candidates/${workspaceId}.md`,
  publicationCandidateJson: `content/editorial-publication-candidates/${workspaceId}.json`,
  editorialIndexJson: "content/editorial-index/editorial-index.json",
};

const requiredSources = [
  "proposalJson",
  "indexCheckJson",
  "draftPackageJson",
  "publicationCandidateJson",
  "publicationCandidateMarkdown",
  "editorialIndexJson",
];

function absolute(relativePath) {
  return path.join(projectRoot, relativePath);
}

function readText(relativePath) {
  return fs.readFileSync(absolute(relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function writeText(filename, content) {
  const filePath = path.join(workspaceDir, filename);
  fs.writeFileSync(filePath, `${content.trimEnd()}\n`, "utf8");
  return filePath;
}

function writeJson(filename, data) {
  const filePath = path.join(workspaceDir, filename);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return filePath;
}

function ensureSources() {
  const missing = requiredSources.filter(
    (key) => !fs.existsSync(absolute(sourcePaths[key]))
  );

  if (missing.length > 0) {
    console.error("Editorial workspace migration failed. Missing source files:");
    for (const key of missing) {
      console.error(`- ${sourcePaths[key]}`);
    }
    process.exit(1);
  }
}

function maybeReadText(key) {
  const sourcePath = sourcePaths[key];
  return fs.existsSync(absolute(sourcePath)) ? readText(sourcePath) : null;
}

function maybeReadJson(key) {
  const sourcePath = sourcePaths[key];
  return fs.existsSync(absolute(sourcePath)) ? readJson(sourcePath) : null;
}

function formatList(items) {
  if (!items || items.length === 0) return "- Sem informação disponível.";
  return items.map((item) => `- ${item}`).join("\n");
}

function formatSources(sources) {
  if (!sources || sources.length === 0) return "- Sem fontes associadas.";

  return sources
    .map((source) =>
      [
        `- [${source.title}](${source.url})`,
        `  - Entidade: ${source.publisher || "a confirmar"}`,
        `  - Tipo: ${source.sourceType || "a confirmar"}`,
        `  - Confiança: ${source.confidence || "a confirmar"}`,
        `  - Verificação humana necessária: ${
          source.requiresHumanVerification ? "Sim" : "Não"
        }`,
        `  - Data: ${source.publishedAt || "data a confirmar"}`,
      ].join("\n")
    )
    .join("\n\n");
}

function selectedProposalFrom(batch) {
  const selection = batch.humanSelection;
  const selectedId =
    selection && ["selected", "approved"].includes(selection.decision)
      ? selection.selectedProposalId
      : batch.selectedProposalId || batch.recommendedProposalId;

  return (
    batch.proposals.find((proposal) => proposal.id === selectedId) ||
    batch.proposals[0]
  );
}

function alternativesFrom(batch, selectedProposal) {
  return batch.proposals.filter((proposal) => proposal.id !== selectedProposal.id);
}

function createTopicSuggestionsMarkdown({
  proposalBatch,
  selectedProposal,
  alternatives,
  indexCheck,
}) {
  return [
    "# 01 - Topic Suggestions",
    "",
    "## Executive Summary",
    "",
    `Categoria: **${proposalBatch.category}**`,
    "",
    `Tema selecionado: **${selectedProposal.title}**`,
    "",
    `Recomendação do índice: **${indexCheck.recommendation}**`,
    "",
    `Risco de duplicação: **${indexCheck.duplicationRisk}**`,
    "",
    `Próxima ação sugerida: ${indexCheck.nextAction}`,
    "",
    "## Human Selection",
    "",
    proposalBatch.humanSelection
      ? [
          `- selectedProposalId: ${proposalBatch.humanSelection.selectedProposalId}`,
          `- selectedBy: ${proposalBatch.humanSelection.selectedBy}`,
          `- selectedAt: ${proposalBatch.humanSelection.selectedAt}`,
          `- decision: ${proposalBatch.humanSelection.decision}`,
          `- notes: ${proposalBatch.humanSelection.notes}`,
        ].join("\n")
      : "- Sem seleção humana registada.",
    "",
    "## Selected Topic",
    "",
    `### ${selectedProposal.title}`,
    "",
    `**Porque importa agora:** ${selectedProposal.whyItMatters}`,
    "",
    "**Factos confirmados:**",
    "",
    formatList(selectedProposal.confirmedFacts),
    "",
    "**Interpretação / oportunidade Educanology:**",
    "",
    formatList(selectedProposal.interpretation),
    "",
    "**Ângulo Educanology sugerido:**",
    "",
    selectedProposal.suggestedEducanologyAngle,
    "",
    "## Index Check Result",
    "",
    `- Recomendação: ${indexCheck.recommendation}`,
    `- Risco de duplicação: ${indexCheck.duplicationRisk}`,
    `- Conteúdo mais próximo: ${indexCheck.bestMatch?.title || "a confirmar"}`,
    `- Raciocínio: ${indexCheck.reasoning}`,
    "",
    "## Alternative Topics",
    "",
    alternatives
      .map(
        (proposal, index) =>
          `${index + 1}. **${proposal.title}**\n   - Prioridade: ${
            proposal.recommendation?.priority || "a confirmar"
          }\n   - Pontuação: ${
            proposal.recommendation?.score || "a confirmar"
          }\n   - Revisor recomendado: ${proposal.recommendedReviewer}`
      )
      .join("\n\n") || "Sem alternativas registadas.",
    "",
    "## Sources",
    "",
    formatSources(selectedProposal.sources),
  ].join("\n");
}

function createArticleProposalMarkdown({
  publicationCandidate,
  draftPackage,
  finalReview,
}) {
  const reviewPackage = finalReview.finalReviewPackage || {};
  const visualBrief = publicationCandidate.visualBrief || reviewPackage.visualBrief || draftPackage.visualBrief;
  const blogImagePrompt =
    publicationCandidate.blogImagePrompt ||
    reviewPackage.blogImagePrompt ||
    draftPackage.blogImagePrompt;

  return [
    "# 02 - Editable Article Proposal",
    "",
    "## Article",
    "",
    publicationCandidate.article,
    "",
    "## SEO",
    "",
    `- SEO title: ${publicationCandidate.seoTitle}`,
    `- SEO description: ${publicationCandidate.seoDescription}`,
    `- Suggested slug: ${publicationCandidate.slug}`,
    "",
    "## Sources",
    "",
    formatSources(publicationCandidate.sources || draftPackage.sources),
    "",
    "## Verification Notes",
    "",
    formatList(publicationCandidate.verificationNotes || reviewPackage.verificationNotes),
    "",
    "## Visual Brief",
    "",
    `- Concept: ${visualBrief?.concept || "a confirmar"}`,
    `- Visual category style: ${visualBrief?.visualCategoryStyle || "a confirmar"}`,
    `- Blog hero format: ${visualBrief?.blogHeroFormat || "16:9"}`,
    `- LinkedIn format: ${visualBrief?.linkedInFormat || "1.91:1"}`,
    "",
    "## Blog Hero Image Prompt",
    "",
    blogImagePrompt || "a confirmar",
    "",
    "## Alt Text",
    "",
    publicationCandidate.altText ||
      reviewPackage.altText ||
      draftPackage.altText ||
      "a confirmar",
    "",
    "## Human Review Checklist",
    "",
    formatList(reviewPackage.approvalChecklist || draftPackage.approvalChecklist),
    "",
    "## Approval Status",
    "",
    publicationCandidate.approvalStatus || "pending_review",
  ].join("\n");
}

function createImageBriefMarkdown({ draftPackage, finalReview, publicationCandidate }) {
  const reviewPackage = finalReview.finalReviewPackage || {};
  const visualBrief = reviewPackage.visualBrief || draftPackage.visualBrief || {};

  return [
    "# 02 - Image Brief",
    "",
    "Status: pending_generation",
    "",
    "Approval status: pending_review",
    "",
    "## Visual Concept",
    "",
    visualBrief.concept || "a confirmar",
    "",
    "## Visual Category Style",
    "",
    visualBrief.visualCategoryStyle || "a confirmar",
    "",
    "## Blog Hero Prompt",
    "",
    reviewPackage.blogImagePrompt || draftPackage.blogImagePrompt || "a confirmar",
    "",
    "## LinkedIn Image Prompt",
    "",
    reviewPackage.linkedInImagePrompt ||
      draftPackage.linkedInImagePrompt ||
      "a confirmar",
    "",
    "## Alt Text",
    "",
    publicationCandidate.altText ||
      reviewPackage.altText ||
      draftPackage.altText ||
      "a confirmar",
    "",
    "## Notes",
    "",
    visualBrief.notes ||
      "Gerar apenas uma imagem hero principal nesta fase. A variante LinkedIn pode esperar pela fase final.",
  ].join("\n");
}

function createLinkedInPostMarkdown({ finalReview, draftPackage, publicationCandidate }) {
  const linkedIn =
    finalReview.finalReviewPackage?.linkedInDraft ||
    draftPackage.linkedInDraft ||
    {};

  return [
    "# 03 - LinkedIn Post",
    "",
    "Status: pending_review",
    "",
    "## Hook",
    "",
    linkedIn.hook || "a confirmar",
    "",
    "## Main Post",
    "",
    linkedIn.mainText || "a confirmar",
    "",
    "## CTA",
    "",
    linkedIn.cta || "a confirmar",
    "",
    "## Hashtags",
    "",
    (linkedIn.hashtags || []).join(" ") || "a confirmar",
    "",
    "## Suggested First Comment",
    "",
    linkedIn.suggestedFirstComment || "Sem primeiro comentário sugerido.",
    "",
    "## Blog Link",
    "",
    linkedIn.blogLink ||
      `https://educanology.eu/blog/${publicationCandidate.slug}` ||
      "a confirmar",
  ].join("\n");
}

function createPublicationMetadata({
  proposalBatch,
  selectedProposal,
  indexCheck,
  publicationCandidate,
  finalReview,
  draftPackage,
  sourceFiles,
  generatedAt,
}) {
  return {
    id: workspaceId,
    status: "pending_review",
    approvalStatus: "pending_review",
    title: publicationCandidate.title,
    slug: publicationCandidate.slug,
    category: draftPackage.category,
    seoTitle: publicationCandidate.seoTitle,
    seoDescription: publicationCandidate.seoDescription,
    selectedProposalId: selectedProposal.id,
    indexRecommendation: indexCheck.recommendation,
    duplicationRisk: indexCheck.duplicationRisk,
    finalBlogArticlePath: "03-final-blog-article.md",
    linkedInPostPath: "03-linkedin-post.md",
    approvedImageReference: null,
    imageStatus: "pending_generation",
    publishedAt: null,
    publicationChannels: {
      blog: {
        status: "pending_review",
        url: `https://educanology.eu/blog/${publicationCandidate.slug}`,
      },
      linkedIn: {
        status: "pending_review",
        url: null,
      },
    },
    sourceFiles,
    generatedAt,
    modelProvider: finalReview.modelProvider || null,
    modelName: finalReview.modelName || null,
    notes:
      "Pacote consolidado para revisão humana. Não foi publicado automaticamente.",
    sourceProposalBatchStatus: proposalBatch.status,
  };
}

function createWorkspaceMetadata({
  publicationCandidate,
  draftPackage,
  sourceFiles,
  generatedAt,
}) {
  return {
    id: workspaceId,
    title: publicationCandidate.title,
    slug: publicationCandidate.slug,
    category: draftPackage.category,
    currentPhase: "article_proposal",
    status: "pending_review",
    sourceFiles,
    generatedAt,
    approvalStatus: "pending_review",
    nextHumanAction:
      "Daniel ou Juan José deve rever o artigo, validar fontes, aprovar ou pedir alterações e decidir se a imagem hero deve ser gerada.",
    notes:
      "Workspace consolidado a partir dos artefactos editoriais existentes. Os ficheiros antigos foram preservados.",
    phaseStatus: {
      topicSuggestions: "completed",
      articleProposal: "pending_review",
      image: "pending_generation",
      finalPublication: "pending_review",
    },
    futureUi: {
      topicSuggestionsPath: "01-topic-suggestions.md",
      editableArticlePath: "02-article-proposal.md",
      imageBriefPath: "02-image-brief.md",
      finalBlogArticlePath: "03-final-blog-article.md",
      linkedInPostPath: "03-linkedin-post.md",
      publicationMetadataPath: "03-publication-metadata.json",
    },
    futureKnowledge: {
      shouldEnrichKnowledgeBase: true,
      knowledgeStatus: "not_created",
      suggestedKnowledgeSummaryPath: `content/editorial-knowledge/${workspaceId}.json`,
      notes:
        "Depois de publicado, este artigo deve ser resumido num registo de conhecimento reutilizável com tese editorial, decisões práticas, cautelas, fontes e posicionamento Educanology, para futuras gerações LLM sem enviar o artigo completo.",
    },
  };
}

ensureSources();
fs.mkdirSync(workspaceDir, { recursive: true });

const generatedAt = new Date().toISOString();
const proposalBatch = readJson(sourcePaths.proposalJson);
const indexCheck = readJson(sourcePaths.indexCheckJson);
const draftPackage = readJson(sourcePaths.draftPackageJson);
const finalReview = maybeReadJson("finalReviewJson") || {};
const publicationCandidate = readJson(sourcePaths.publicationCandidateJson);
const selectedProposal = selectedProposalFrom(proposalBatch);
const alternatives = alternativesFrom(proposalBatch, selectedProposal);
const sourceFiles = Object.fromEntries(
  Object.entries(sourcePaths).filter(([, relativePath]) =>
    fs.existsSync(absolute(relativePath))
  )
);

const topicSuggestions = {
  id: `${workspaceId}-topic-suggestions`,
  status: "selected",
  category: proposalBatch.category,
  selectedProposal,
  alternatives,
  humanSelection: proposalBatch.humanSelection || null,
  indexCheck: {
    recommendation: indexCheck.recommendation,
    duplicationRisk: indexCheck.duplicationRisk,
    bestMatch: indexCheck.bestMatch,
    reasoning: indexCheck.reasoning,
    nextAction: indexCheck.nextAction,
  },
  sources: selectedProposal.sources || [],
  sourceFiles,
  generatedAt,
};

const articleProposal = {
  id: `${workspaceId}-article-proposal`,
  status: "pending_review",
  approvalStatus: "pending_review",
  title: publicationCandidate.title,
  slug: publicationCandidate.slug,
  category: draftPackage.category,
  seoTitle: publicationCandidate.seoTitle,
  seoDescription: publicationCandidate.seoDescription,
  article: publicationCandidate.article,
  sources: publicationCandidate.sources || draftPackage.sources,
  verificationNotes: publicationCandidate.verificationNotes || [],
  visualBrief:
    finalReview.finalReviewPackage?.visualBrief || draftPackage.visualBrief || null,
  blogImagePrompt:
    finalReview.finalReviewPackage?.blogImagePrompt ||
    draftPackage.blogImagePrompt ||
    null,
  linkedInImagePrompt:
    finalReview.finalReviewPackage?.linkedInImagePrompt ||
    draftPackage.linkedInImagePrompt ||
    null,
  altText:
    publicationCandidate.altText ||
    finalReview.finalReviewPackage?.altText ||
    draftPackage.altText ||
    null,
  sourceDraftPackageId: draftPackage.id,
  sourcePublicationCandidateId: publicationCandidate.id,
  generatedAt,
};

const publicationMetadata = createPublicationMetadata({
  proposalBatch,
  selectedProposal,
  indexCheck,
  publicationCandidate,
  finalReview,
  draftPackage,
  sourceFiles,
  generatedAt,
});
const workspaceMetadata = createWorkspaceMetadata({
  publicationCandidate,
  draftPackage,
  sourceFiles,
  generatedAt,
});

const createdFiles = [
  writeText(
    "01-topic-suggestions.md",
    createTopicSuggestionsMarkdown({
      proposalBatch,
      selectedProposal,
      alternatives,
      indexCheck,
    })
  ),
  writeJson("01-topic-suggestions.json", topicSuggestions),
  writeText(
    "02-article-proposal.md",
    createArticleProposalMarkdown({
      publicationCandidate,
      draftPackage,
      finalReview,
    })
  ),
  writeJson("02-article-proposal.json", articleProposal),
  writeText(
    "02-image-brief.md",
    createImageBriefMarkdown({
      draftPackage,
      finalReview,
      publicationCandidate,
    })
  ),
  writeText("03-final-blog-article.md", readText(sourcePaths.publicationCandidateMarkdown)),
  writeText(
    "03-linkedin-post.md",
    createLinkedInPostMarkdown({
      finalReview,
      draftPackage,
      publicationCandidate,
    })
  ),
  writeJson("03-publication-metadata.json", publicationMetadata),
  writeJson("metadata.json", workspaceMetadata),
];

console.log("Editorial workspace migration completed.");
console.log(`Workspace: ${workspaceDir}`);
console.log("Files created:");
for (const filePath of createdFiles) {
  console.log(`- ${path.relative(projectRoot, filePath)}`);
}
