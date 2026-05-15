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
const outputDir = path.join(projectRoot, "content/editorial-draft-packages");
const markdownOutputPath = path.join(outputDir, "sample-draft-package.md");
const jsonOutputPath = path.join(outputDir, "sample-draft-package.json");

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

function selectProposal(batch) {
  const approved = batch.proposals.find(
    (proposal) => proposal.approvalDecision === "approved"
  );

  if (approved) return approved;

  return (
    batch.proposals.find(
      (proposal) => proposal.id === batch.recommendedProposalId
    ) || batch.proposals[0]
  );
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
        `  - Tipo: ${source.sourceType}`,
        `  - Confiança: ${source.confidence}`,
        `  - Verificação humana necessária: ${
          source.requiresHumanVerification ? "Sim" : "Não"
        }`,
        `  - Data: ${source.publishedAt || "data a confirmar"}`,
        `  - Factos confirmados:`,
        formatList(source.confirmedFacts)
          .split("\n")
          .map((line) => `    ${line}`)
          .join("\n"),
        source.notes ? `  - Notas: ${source.notes}` : undefined,
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n\n");
}

function createBlogDraft(proposal) {
  return [
    `# ${proposal.title}`,
    "",
    "## Contexto",
    "",
    `${proposal.whyItMatters} Esta é uma questão especialmente relevante para escolas, agrupamentos e municípios que querem integrar inteligência artificial sem transformar a tecnologia num fim em si mesma.`,
    "",
    "A adoção de IA em contexto educativo deve começar por uma decisão institucional: definir para que serve, que limites deve respeitar e como será acompanhada por professores, direções e responsáveis públicos.",
    "",
    "## Factos confirmados",
    "",
    formatList(proposal.confirmedFacts),
    "",
    "As fontes associadas a este rascunho devem ser verificadas antes de publicação. Quando não há data confirmada, deve ser usada a indicação \"data a confirmar\" e não deve ser inventada qualquer cronologia.",
    "",
    "## Interpretação Educanology",
    "",
    formatList(proposal.interpretation),
    "",
    "Para a Educanology, a questão central não é escolher rapidamente uma ferramenta de IA. A questão central é criar uma estrutura de uso responsável, pedagógica e compreensível. Essa estrutura deve ajudar professores e alunos a usar a IA com critério, sem substituir a relação educativa nem reduzir a exigência da aprendizagem.",
    "",
    "## O que deve conter uma primeira política de uso",
    "",
    "Uma primeira política de uso de IA não precisa de ser extensa. Deve ser suficientemente clara para orientar decisões quotidianas. Pode começar por cinco pontos:",
    "",
    "- que dados pessoais, sensíveis ou confidenciais não devem ser introduzidos em ferramentas de IA;",
    "- que usos são aceitáveis para professores, alunos e equipas técnicas;",
    "- que respostas ou materiais exigem validação humana;",
    "- como se explica aos alunos a diferença entre apoio, autoria e atalho;",
    "- como serão avaliados os primeiros pilotos antes de escalar.",
    "",
    "## Implicações para municípios e escolas",
    "",
    "Municípios e escolas têm papéis complementares. As escolas conhecem a prática pedagógica e as necessidades dos alunos. Os municípios podem apoiar condições de formação, infraestrutura, literacia digital e articulação territorial. A adoção responsável de IA deve juntar estas duas dimensões.",
    "",
    "O risco de uma adoção sem orientação é duplo: por um lado, usos superficiais que empobrecem a aprendizagem; por outro, bloqueios excessivos que impedem professores e alunos de desenvolver competências críticas para o presente.",
    "",
    "## Como a Educanology pode apoiar",
    "",
    "A Educanology pode apoiar o diagnóstico, a definição de orientações de uso, a formação docente, a criação de pilotos, a seleção de casos práticos e a avaliação da implementação. O objetivo é transformar preocupação institucional em capacidade concreta de decisão e de execução.",
    "",
    "Este rascunho não constitui aconselhamento jurídico, financeiro ou técnico vinculativo. Qualquer decisão institucional deve ser revista e validada pela equipa responsável.",
  ].join("\n");
}

function createLinkedInDraft(proposal, blogLink) {
  return {
    hook:
      "A IA na escola pública não deve começar pela ferramenta. Deve começar pela pedagogia.",
    mainText: [
      "A inteligência artificial pode apoiar professores, personalizar percursos e tornar a aprendizagem mais desafiante.",
      "",
      "Mas também pode criar ruído, dependência e usos superficiais se entrar na escola sem regras claras.",
      "",
      "Antes de escolher ferramentas, escolas, agrupamentos e municípios devem responder a perguntas simples:",
      "",
      "- Que problema educativo queremos resolver?",
      "- Que dados não devem ser introduzidos?",
      "- Que tarefas exigem validação humana?",
      "- Como formamos professores com exemplos reais?",
      "- Como avaliamos se a adoção está a melhorar a aprendizagem?",
      "",
      proposal.suggestedEducanologyAngle,
    ].join("\n"),
    cta:
      "Municípios, escolas e organizações que queiram iniciar este caminho com responsabilidade podem falar com a Educanology.",
    hashtags: [
      "#Educação",
      "#IAnaEducação",
      "#InteligênciaArtificial",
      "#EscolaPública",
      "#TransformaçãoDigital"
    ],
    suggestedFirstComment:
      "Artigo completo no blog da Educanology, com uma proposta prática para iniciar a adoção responsável de IA em contexto educativo.",
    blogLink,
    imageReference: "sample-draft-package-visual-brief"
  };
}

function createVisualBrief(proposal) {
  const blogImagePrompt = [
    "Create a realistic editorial photograph for Educanology, a Portuguese educational consulting organisation.",
    "Scene: a public school classroom or municipal education space in Portugal, with a teacher supporting a small group of students using laptops and printed learning materials.",
    "The visual tone should be European, Iberian, Portuguese, municipal, educational, institutional, human, realistic and strategic.",
    "Technology should be present but not dominant. The focus is thoughtful teacher support, responsible AI adoption and meaningful learning.",
    "Natural light, real public education context, grounded atmosphere, no visible readable text on screens.",
    "Avoid exaggerated sci-fi, cartoon robots, fake stock-photo perfection, chaotic collages, empty iconography, excessive text and unrealistic holograms.",
    "Format: blog hero image, 16:9."
  ].join(" ");

  const linkedInImagePrompt = [
    "Create a LinkedIn editorial image variant for Educanology based on the same concept.",
    "Use a realistic Portuguese public education or municipal learning context, with teacher support and thoughtful technology use.",
    "Keep the image human, institutional, grounded and uncluttered.",
    "Avoid text-heavy composition, sci-fi aesthetics, cartoon robots, fake stock-photo perfection and chaotic collages.",
    "Format: LinkedIn image, 1.91:1."
  ].join(" ");

  return {
    id: "sample-draft-package-visual-brief",
    concept:
      "Professor e alunos numa escola pública portuguesa a usar tecnologia de forma acompanhada, responsável e pedagogicamente orientada.",
    visualCategoryStyle:
      "IA na Educação: human-centred AI in schools, teacher support, personalised learning and thoughtful technology use.",
    blogHeroFormat: "16:9",
    linkedInFormat: "1.91:1",
    blogImagePrompt,
    linkedInImagePrompt,
    altText:
      "Professor a apoiar estudantes numa sala de aula portuguesa com tecnologia usada de forma colaborativa e responsável.",
    notes:
      "A imagem deve parecer institucional, realista e educativa, sem estética futurista exagerada."
  };
}

function createPackage(batch, proposal) {
  const slug = slugify(proposal.title);
  const blogLink = `https://educanology.eu/blog/${slug}`;
  const visualBrief = createVisualBrief(proposal);

  return {
    id: "sample-draft-package",
    sourceProposalId: proposal.id,
    status: "draft",
    category: proposal.category,
    title: proposal.title,
    slug,
    summary:
      "Pacote interno de rascunho editorial para revisão humana antes de qualquer publicação.",
    reviewer: proposal.recommendedReviewer,
    sources: proposal.sources,
    confirmedFacts: proposal.confirmedFacts,
    interpretation: proposal.interpretation,
    blogDraft: createBlogDraft(proposal),
    seoTitle: `${proposal.title} | Educanology`,
    seoDescription:
      "Orientações práticas para escolas, agrupamentos e municípios iniciarem a adoção responsável de inteligência artificial com finalidade pedagógica e validação humana.",
    linkedInDraft: createLinkedInDraft(proposal, blogLink),
    visualBrief,
    blogImagePrompt: visualBrief.blogImagePrompt,
    linkedInImagePrompt: visualBrief.linkedInImagePrompt,
    altText: visualBrief.altText,
    approvalStatus: "pending_review",
    createdAt: batch.generatedAt,
    updatedAt: batch.generatedAt
  };
}

function createMarkdown(draftPackage) {
  const linkedIn = draftPackage.linkedInDraft;

  return [
    "# Pacote de Rascunho Editorial - Educanology",
    "",
    "## 1. Resumo executivo",
    "",
    `Este pacote transforma a proposta selecionada ou recomendada em rascunho editorial completo para revisão humana. O estado é **${draftPackage.approvalStatus}**. Nada foi publicado.`,
    "",
    `- Tema selecionado: ${draftPackage.title}`,
    `- Categoria editorial: ${draftPackage.category}`,
    `- Revisor recomendado: ${draftPackage.reviewer}`,
    `- Slug sugerido: \`${draftPackage.slug}\``,
    "",
    "## 2. Tema selecionado",
    "",
    draftPackage.title,
    "",
    "## 3. Categoria editorial",
    "",
    draftPackage.category,
    "",
    "## 4. Revisor recomendado",
    "",
    draftPackage.reviewer,
    "",
    "## 5. Lista de fontes",
    "",
    formatSources(draftPackage.sources),
    "",
    "## 6. Factos confirmados",
    "",
    formatList(draftPackage.confirmedFacts),
    "",
    "## 7. Interpretação Educanology",
    "",
    formatList(draftPackage.interpretation),
    "",
    "## 8. Rascunho de artigo",
    "",
    draftPackage.blogDraft,
    "",
    "## 9. SEO title",
    "",
    draftPackage.seoTitle,
    "",
    "## 10. SEO description",
    "",
    draftPackage.seoDescription,
    "",
    "## 11. Slug sugerido",
    "",
    draftPackage.slug,
    "",
    "## 12. Rascunho LinkedIn",
    "",
    `**Hook:** ${linkedIn.hook}`,
    "",
    "**Texto principal:**",
    "",
    linkedIn.mainText,
    "",
    `**CTA:** ${linkedIn.cta}`,
    "",
    `**Link do artigo:** ${linkedIn.blogLink}`,
    "",
    "## 13. Hashtags sugeridas",
    "",
    linkedIn.hashtags.join(" "),
    "",
    "## 14. Primeiro comentário sugerido",
    "",
    linkedIn.suggestedFirstComment || "Sem primeiro comentário sugerido.",
    "",
    "## 15. Brief visual",
    "",
    `- Conceito: ${draftPackage.visualBrief.concept}`,
    `- Estilo: ${draftPackage.visualBrief.visualCategoryStyle}`,
    `- Formato blog: ${draftPackage.visualBrief.blogHeroFormat}`,
    `- Formato LinkedIn: ${draftPackage.visualBrief.linkedInFormat}`,
    `- Notas: ${draftPackage.visualBrief.notes}`,
    "",
    "## 16. Prompt de imagem IA para hero do blog",
    "",
    draftPackage.blogImagePrompt,
    "",
    "## 17. Prompt de imagem IA para variante LinkedIn",
    "",
    draftPackage.linkedInImagePrompt,
    "",
    "## 18. Alt text",
    "",
    draftPackage.altText,
    "",
    "## 19. Checklist de revisão humana",
    "",
    "- [ ] O tema foi aprovado por Daniel ou Juan José.",
    "- [ ] As fontes foram abertas e verificadas.",
    "- [ ] Datas desconhecidas permanecem como \"data a confirmar\".",
    "- [ ] Os factos confirmados estão separados da interpretação.",
    "- [ ] Não há estatísticas, chamadas de financiamento, elegibilidade ou afirmações legais inventadas.",
    "- [ ] O texto está em português de Portugal.",
    "- [ ] O tom é institucional, estratégico, prático e útil.",
    "- [ ] O LinkedIn está pronto para copiar/colar com pequenas edições.",
    "- [ ] O brief visual segue a identidade Educanology.",
    "- [ ] Nenhuma publicação foi feita sem aprovação humana.",
    "",
    "## 20. Estado de aprovação",
    "",
    draftPackage.approvalStatus,
    "",
    "## Metadados",
    "",
    `- ID do pacote: \`${draftPackage.id}\``,
    `- ID da proposta fonte: \`${draftPackage.sourceProposalId}\``,
    `- Criado em: ${draftPackage.createdAt}`,
    `- Atualizado em: ${draftPackage.updatedAt}`,
  ].join("\n");
}

const batch = readJson(proposalPath);
const proposal = selectProposal(batch);
const draftPackage = createPackage(batch, proposal);
const markdown = createMarkdown(draftPackage);

fs.writeFileSync(jsonOutputPath, `${JSON.stringify(draftPackage, null, 2)}\n`);
fs.writeFileSync(markdownOutputPath, `${markdown}\n`);

console.log("Editorial draft package created:");
console.log(markdownOutputPath);
console.log(jsonOutputPath);
