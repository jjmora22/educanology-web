import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");

const defaultDraftPackagePath = path.join(
  projectRoot,
  "content/editorial-draft-packages/2026-05-15-ia-na-educacao.json"
);
const inputDraftPackagePath = process.argv[2]
  ? path.resolve(projectRoot, process.argv[2])
  : defaultDraftPackagePath;
const outputDir = path.join(projectRoot, "content/editorial-final-reviews");
const publicationOutputDir = path.join(
  projectRoot,
  "content/editorial-publication-candidates"
);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadLocalEnv() {
  const envPath = path.join(projectRoot, ".env.local");

  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (!key || process.env[key] !== undefined) continue;

    const isSingleQuoted = value.startsWith("'") && value.endsWith("'");
    const isDoubleQuoted = value.startsWith('"') && value.endsWith('"');

    if (value.length >= 2 && (isSingleQuoted || isDoubleQuoted)) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function slugify(value) {
  return String(value || "editorial-final-review")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function estimateTokens(value) {
  return Math.ceil(JSON.stringify(value).length / 4);
}

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    console.error(
      "Set the server-side LLM environment variables or add them to .env.local before running this internal script. Do not use NEXT_PUBLIC variables for API keys."
    );
    process.exit(1);
  }

  return value;
}

function stripCodeFence(value) {
  return value
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function parseModelJson(value) {
  const cleaned = stripCodeFence(value);

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error("The LLM response did not contain a JSON object.");
    }

    return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  }
}

function compactDraftPackage(draftPackage) {
  return {
    id: draftPackage.id,
    sourceProposalId: draftPackage.sourceProposalId,
    category: draftPackage.category,
    title: draftPackage.title,
    slug: draftPackage.slug,
    summary: draftPackage.summary,
    reviewer: draftPackage.reviewer,
    sources: draftPackage.sources,
    confirmedFacts: draftPackage.confirmedFacts,
    interpretation: draftPackage.interpretation,
    currentBlogDraft: draftPackage.blogDraft,
    seoTitle: draftPackage.seoTitle,
    seoDescription: draftPackage.seoDescription,
    linkedInDraft: draftPackage.linkedInDraft,
    visualBrief: draftPackage.visualBrief,
    blogImagePrompt: draftPackage.blogImagePrompt,
    linkedInImagePrompt: draftPackage.linkedInImagePrompt,
    altText: draftPackage.altText,
    approvalStatus: draftPackage.approvalStatus,
  };
}

function createSystemPrompt() {
  return [
    "You are an Educanology senior editorial writer and education consultant.",
    "Write in Portuguese from Portugal.",
    "Generate a clean publication-ready Educanology blog article.",
    "Use a clear, frank, friendly, positive, constructive, solution-oriented, empathetic, institutional and practical tone.",
    "Distinguish confirmed facts from Educanology interpretation.",
    "Do not invent dates, statistics, funding calls, eligibility rules, legal claims or source details.",
    "If source dates are unknown, keep the wording 'data a confirmar' in verification notes, not as filler in the main article.",
    "Do not present fixed learning styles as scientifically proven. Discuss preferences, motivation, prior knowledge, needs and context while warning against neuromyths.",
    "The publication-ready article must be a fluent editorial/consultative article, not a template, not a structured review package and not an internal guide.",
    "The publication-ready article must use headings and developed paragraphs. Use bullet lists only where they add practical value.",
    "Avoid long bullet blocks. Prefer explanatory paragraphs, short examples and decision criteria in prose. Use no more than three concise bullet lists in the article.",
    "Do not start the article with a Markdown H1 title; the title is handled separately.",
    "Do not use package language, approval language, internal checklist language or phrases like 'this draft' in the publication-ready article.",
    "The publication-ready article should demonstrate expertise: explain what each element means, what it should contain, how it can be implemented, what decisions must be made and what mistakes should be avoided.",
    "Return only the article body in Markdown. Do not wrap it in code fences. Do not include SEO metadata, image prompts, approval checklists or internal review notes.",
  ].join("\n");
}

function createUserPrompt(draftPackage) {
  return [
    "Create a clean publication-ready article for the Educanology blog from this structured draft package.",
    "",
    "Editorial doctrine summary:",
    "- Technology should be introduced gradually, pedagogically and in proportion to human skill development.",
    "- Technology should amplify human capabilities, like a bicycle: it extends reach, speed and autonomy, but does not replace balance, direction or human effort.",
    "- Before calculator use, learners should understand basic arithmetic.",
    "- Before relying on computers for writing, learners should develop motor coordination, handwriting and basic written expression.",
    "- Before using AI to produce answers, learners should develop reading comprehension, written expression, reasoning, questioning, source comparison and critical thinking.",
    "- AI should support meaningful, challenging, personalized and motivating learning, not make homework superficially easier.",
    "- Personalization may consider interests, progress, needs, motivation, prior knowledge and context, but avoid unsupported fixed learning-styles claims.",
    "- Connect AI adoption with teacher training, assessment, ethical use, data protection, human agency and gradual implementation.",
    "",
    "Publication-ready article requirements:",
    "- Suggested length: 1,500 to 2,300 words.",
    "- It must read like a polished Educanology blog article, not a template.",
    "- It should have a contextual introduction, clear headings, developed paragraphs and practical substance.",
    "- Use bullet lists only when they genuinely help the reader apply a framework. Use no more than three concise bullet lists.",
    "- Avoid filler, repetition, generic motivational language and excessive section labels.",
    "- Do not include internal review notes, metadata, image prompts, checklists, approval status or package language.",
    "- Include practical frameworks, steps, examples or decision criteria, but explain them in prose.",
    "- For IA na Educação, develop responsible AI policy components, foundational skills before automation, small AI pilot design, teacher training, evaluation criteria, family/community communication, common mistakes and how Educanology can help.",
    "- The final section 'Como a Educanology pode apoiar' must mention diagnosis, responsible technology strategy, responsible AI policy, teacher training, pilot design, implementation support, project design, funding/application preparation when relevant, and contact: hello@educanology.eu.",
    "",
    "Return only the article body in Markdown.",
    "Start with the article introduction, not with metadata and not with a Markdown H1 title.",
    "Use clear headings, but avoid excessive bullet lists.",
    "Do not include internal approval notes, source verification notes, image prompts, JSON, or package language.",
    "",
    "Input draft package JSON:",
    JSON.stringify(compactDraftPackage(draftPackage), null, 2),
  ].join("\n");
}

function normalizeFinalPackage({
  article,
  draftPackage,
  modelProvider,
  modelName,
  tokenEstimate,
}) {
  const now = new Date().toISOString();
  return {
    id: `${draftPackage.id}-final-review`,
    sourceDraftPackageId: draftPackage.id,
    status: "pending_review",
    category: draftPackage.category,
    title: draftPackage.title,
    slug: draftPackage.slug,
    seoTitle: draftPackage.seoTitle,
    seoDescription: draftPackage.seoDescription,
    finalArticle: article,
    linkedInDraft: draftPackage.linkedInDraft,
    visualBrief: draftPackage.visualBrief,
    blogImagePrompt: draftPackage.blogImagePrompt,
    linkedInImagePrompt: draftPackage.linkedInImagePrompt,
    altText: draftPackage.altText,
    sources: draftPackage.sources,
    verificationNotes: [
      "Abrir e confirmar todas as fontes antes de publicação.",
      "Confirmar datas das fontes marcadas como 'data a confirmar'.",
      "Confirmar que o artigo não transforma recomendações institucionais gerais em obrigações legais.",
      "Confirmar que as referências a personalização não apresentam estilos de aprendizagem fixos como facto científico.",
    ],
    approvalChecklist: [
      "O artigo está em português de Portugal e pronto para revisão editorial.",
      "O texto distingue factos confirmados de interpretação Educanology.",
      "As fontes foram verificadas manualmente.",
      "Não há datas, estatísticas, chamadas de financiamento, elegibilidade ou obrigações legais inventadas.",
      "A secção 'Como a Educanology pode apoiar' está correta e inclui hello@educanology.eu.",
      "Daniel ou Juan José aprovou o conteúdo antes de qualquer publicação.",
    ],
    approvalStatus: "pending_review",
    createdAt: now,
    updatedAt: now,
    modelProvider,
    modelName,
    tokenEstimate,
  };
}

function normalizePublicationCandidate({
  article,
  draftPackage,
  modelProvider,
  modelName,
  tokenEstimate,
}) {
  const now = new Date().toISOString();
  const cleanArticle = stripLeadingTitle(article, draftPackage.title);

  return {
    id: `${draftPackage.id}-publication-candidate`,
    sourceDraftPackageId: draftPackage.id,
    status: "pending_review",
    title: draftPackage.title,
    slug: draftPackage.slug,
    seoTitle: draftPackage.seoTitle,
    seoDescription: draftPackage.seoDescription,
    article: cleanArticle,
    sources: draftPackage.sources,
    verificationNotes: [
      "Verificar fontes e datas antes de publicação.",
      "Confirmar que a versão final não contém linguagem interna de pacote ou aprovação.",
    ],
    approvalStatus: "pending_review",
    createdAt: now,
    updatedAt: now,
    modelProvider,
    modelName,
    tokenEstimate,
  };
}

function stripLeadingTitle(article, title) {
  const lines = String(article || "").split("\n");
  const normalizedTitle = normalizeHeading(title);

  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift();
  }

  if (
    lines.length > 0 &&
    lines[0].trim().startsWith("#") &&
    normalizeHeading(lines[0].replace(/^#+\s*/, "")) === normalizedTitle
  ) {
    lines.shift();
  }

  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift();
  }

  return lines.join("\n");
}

function normalizeHeading(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function createFinalReviewMarkdown(finalPackage, executiveSummary) {
  const linkedIn = finalPackage.linkedInDraft || {};
  const visual = finalPackage.visualBrief || {};

  return [
    "# Revisão Editorial Final - Educanology",
    "",
    "## 1. Executive summary",
    "",
    executiveSummary || "Resumo executivo a rever.",
    "",
    "## 2. Final article draft",
    "",
    finalPackage.finalArticle,
    "",
    "## 3. SEO title",
    "",
    finalPackage.seoTitle,
    "",
    "## 4. SEO description",
    "",
    finalPackage.seoDescription,
    "",
    "## 5. Suggested slug",
    "",
    finalPackage.slug,
    "",
    "## 6. LinkedIn draft",
    "",
    `**Hook:** ${linkedIn.hook || ""}`,
    "",
    linkedIn.mainText || "",
    "",
    `**CTA:** ${linkedIn.cta || ""}`,
    "",
    `**Blog link:** ${linkedIn.blogLink || ""}`,
    "",
    "## 7. Suggested hashtags",
    "",
    (linkedIn.hashtags || []).join(" "),
    "",
    "## 8. Suggested first comment",
    "",
    linkedIn.suggestedFirstComment || "Sem primeiro comentário sugerido.",
    "",
    "## 9. Visual brief",
    "",
    `- Concept: ${visual.concept || ""}`,
    `- Visual category style: ${visual.visualCategoryStyle || ""}`,
    `- Blog hero format: ${visual.blogHeroFormat || ""}`,
    `- LinkedIn format: ${visual.linkedInFormat || ""}`,
    `- Notes: ${visual.notes || ""}`,
    "",
    "## 10. Blog hero image prompt",
    "",
    finalPackage.blogImagePrompt,
    "",
    "## 11. LinkedIn image prompt",
    "",
    finalPackage.linkedInImagePrompt,
    "",
    "## 12. Alt text",
    "",
    finalPackage.altText,
    "",
    "## 13. Source list",
    "",
    finalPackage.sources
      .map((source) =>
        [
          `- [${source.title}](${source.url})`,
          `  - Publisher: ${source.publisher || "a confirmar"}`,
          `  - Type: ${source.sourceType}`,
          `  - Confidence: ${source.confidence}`,
          `  - Requires human verification: ${
            source.requiresHumanVerification ? "yes" : "no"
          }`,
          `  - Date: ${source.publishedAt || "data a confirmar"}`,
        ].join("\n")
      )
      .join("\n\n"),
    "",
    "## 14. Verification notes",
    "",
    finalPackage.verificationNotes.map((note) => `- ${note}`).join("\n"),
    "",
    "## 15. Human approval checklist",
    "",
    finalPackage.approvalChecklist.map((item) => `- [ ] ${item}`).join("\n"),
    "",
    "## 16. Approval status",
    "",
    finalPackage.approvalStatus,
  ].join("\n");
}

function createPublicationCandidateMarkdown(publicationCandidate) {
  return [
    `# ${publicationCandidate.title}`,
    "",
    publicationCandidate.article,
  ].join("\n");
}

function createCombinedFinalReviewJson({ finalPackage, publicationCandidate }) {
  return {
    id: finalPackage.id,
    sourceDraftPackageId: finalPackage.sourceDraftPackageId,
    status: "pending_review",
    finalReviewPackage: {
      executiveSummary:
        "Revisão final interna gerada a partir do pacote de rascunho. A versão candidata a publicação está separada e deve ser validada por uma pessoa antes de qualquer publicação.",
      ...finalPackage,
    },
    publicationReadyArticle: {
      title: publicationCandidate.title,
      slug: publicationCandidate.slug,
      seoTitle: publicationCandidate.seoTitle,
      seoDescription: publicationCandidate.seoDescription,
      article: publicationCandidate.article,
    },
    approvalStatus: "pending_review",
    createdAt: finalPackage.createdAt,
    updatedAt: finalPackage.updatedAt,
    modelProvider: finalPackage.modelProvider,
    modelName: finalPackage.modelName,
    tokenEstimate: finalPackage.tokenEstimate,
  };
}

if (!fs.existsSync(inputDraftPackagePath)) {
  console.error("Final review generation failed: input draft package not found.");
  console.error(inputDraftPackagePath);
  process.exit(1);
}

loadLocalEnv();

const apiKey = getRequiredEnv("DEEPSEEK_API_KEY");
const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
const modelName = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const modelProvider = new URL(baseUrl).hostname;
const draftPackage = readJson(inputDraftPackagePath);
const safeName = slugify(draftPackage.id || path.basename(inputDraftPackagePath, ".json"));
const markdownOutputPath = path.join(outputDir, `${safeName}.md`);
const jsonOutputPath = path.join(outputDir, `${safeName}.json`);
const publicationMarkdownOutputPath = path.join(
  publicationOutputDir,
  `${safeName}.md`
);
const publicationJsonOutputPath = path.join(publicationOutputDir, `${safeName}.json`);
const messages = [
  { role: "system", content: createSystemPrompt() },
  { role: "user", content: createUserPrompt(draftPackage) },
];

async function requestCompletion(requestMessages) {
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: requestMessages,
      temperature: 0.25,
    }),
  });

  if (!response.ok) {
    console.error(`LLM request failed with status ${response.status}.`);
    process.exit(1);
  }

  return response.json();
}

const completion = await requestCompletion(messages);
const article = completion.choices?.[0]?.message?.content?.trim();

if (!article) {
  console.error("LLM response did not include message content.");
  process.exit(1);
}
const tokenEstimate =
  completion.usage?.total_tokens ||
  estimateTokens({ input: messages, output: article });
const finalPackage = normalizeFinalPackage({
  article,
  draftPackage,
  modelProvider,
  modelName,
  tokenEstimate,
});
const publicationCandidate = normalizePublicationCandidate({
  article,
  draftPackage,
  modelProvider,
  modelName,
  tokenEstimate,
});
const finalReviewJson = createCombinedFinalReviewJson({
  finalPackage,
  publicationCandidate,
});
const markdown = createFinalReviewMarkdown(
  finalPackage,
  "Revisão final interna gerada a partir do pacote de rascunho. A versão candidata a publicação está separada e deve ser validada por uma pessoa antes de qualquer publicação."
);
const publicationMarkdown =
  createPublicationCandidateMarkdown(publicationCandidate);

fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(publicationOutputDir, { recursive: true });
fs.writeFileSync(jsonOutputPath, `${JSON.stringify(finalReviewJson, null, 2)}\n`);
fs.writeFileSync(markdownOutputPath, `${markdown}\n`);
fs.writeFileSync(
  publicationJsonOutputPath,
  `${JSON.stringify(publicationCandidate, null, 2)}\n`
);
fs.writeFileSync(publicationMarkdownOutputPath, `${publicationMarkdown}\n`);

console.log("Final editorial review generated:");
console.log(`Input file: ${inputDraftPackagePath}`);
console.log(`Output Markdown: ${markdownOutputPath}`);
console.log(`Output JSON: ${jsonOutputPath}`);
console.log(`Publication candidate Markdown: ${publicationMarkdownOutputPath}`);
console.log(`Publication candidate JSON: ${publicationJsonOutputPath}`);
console.log(`Model used: ${modelProvider} / ${modelName}`);
console.log(
  "Next human action: review the final package, verify sources and approve, reject or request changes."
);
