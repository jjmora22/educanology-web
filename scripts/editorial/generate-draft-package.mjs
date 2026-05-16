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
const inputBaseName = path.basename(inputProposalPath, ".json");
const safeName = slugify(inputBaseName || "sample-draft-package");
const isDefaultInput = inputProposalPath === defaultProposalPath;
const outputBaseName = isDefaultInput ? "sample-draft-package" : safeName;
const outputDir = path.join(projectRoot, "content/editorial-draft-packages");
const markdownOutputPath = path.join(outputDir, `${outputBaseName}.md`);
const jsonOutputPath = path.join(outputDir, `${outputBaseName}.json`);

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
  const selection = batch.humanSelection;
  const isHumanSelected =
    selection &&
    ["selected", "approved"].includes(selection.decision) &&
    selection.selectedProposalId;

  if (isHumanSelected) {
    const selected = batch.proposals.find(
      (proposal) => proposal.id === selection.selectedProposalId
    );

    if (selected) {
      return {
        proposal: selected,
        approvalStatus:
          selection.decision === "approved" ? "approved" : "pending_review",
        selectionMode: "human_selection",
      };
    }
  }

  const approved = batch.proposals.find(
    (proposal) => proposal.approvalDecision === "approved"
  );

  if (approved) {
    return {
      proposal: approved,
      approvalStatus: "approved",
      selectionMode: "approved_proposal",
    };
  }

  const recommended =
    batch.proposals.find(
      (proposal) => proposal.id === batch.recommendedProposalId
    ) || batch.proposals[0];

  return {
    proposal: recommended,
    approvalStatus: "pending_human_approval",
    selectionMode: "recommended_fallback",
  };
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

function isHumanFirstTopic(proposal) {
  return (
    proposal.category === "ia-na-educacao" ||
    /IA|inteligência artificial|tecnologia|digital/i.test(proposal.title)
  );
}

function createBlogDraft(proposal) {
  const humanFirst = isHumanFirstTopic(proposal);
  const doctrineSection = humanFirst
    ? [
        "## Análise por eixos",
        "",
        "### 1. Tecnologia como amplificador, não como substituto",
        "",
        "A Educanology defende uma adoção gradual, pedagógica e human-first da tecnologia. A tecnologia deve funcionar como uma bicicleta para as capacidades humanas: aumenta alcance, velocidade e autonomia, mas não substitui equilíbrio, direção ou esforço humano.",
        "",
        "Em educação, isto significa que a tecnologia deve chegar no momento certo e com finalidade clara. Antes da calculadora, os alunos precisam de compreender as operações aritméticas básicas. Antes de dependerem do computador para escrever, precisam de desenvolver coordenação motora, escrita manual e expressão escrita básica. Antes de usarem IA para produzir respostas, precisam de ler, escrever, raciocinar, questionar e pensar criticamente.",
        "",
        "### 2. IA como apoio a aprendizagem mais exigente",
        "",
        "A IA não deve tornar os trabalhos de casa apenas superficialmente mais fáceis. Deve tornar a aprendizagem mais significativa, desafiante, personalizada e motivadora. O seu valor está em ajudar a formular melhores perguntas, apoiar feedback, adaptar percursos e libertar tempo docente para acompanhamento humano.",
        "",
        "### 3. Personalização sem neuromitos",
        "",
        "A personalização pode considerar interesses, progresso, necessidades, motivação, conhecimentos prévios e contexto dos alunos. Mas o artigo deve evitar apresentar teorias de estilos de aprendizagem fixos como facto científico estabelecido. A linha editorial deve distinguir personalização baseada em evidência de neuromitos sobre correspondência rígida entre ensino e estilos fixos.",
        "",
        "### 4. Professor, ética e dados no centro da implementação",
        "",
        "A adoção de IA exige formação docente, critérios de avaliação, proteção de dados, supervisão humana e regras éticas. O professor não é um utilizador passivo da ferramenta: é a pessoa que interpreta, adapta, valida e decide.",
        "",
        "### 5. Implementação gradual e verificável",
        "",
        "A escola ou o município deve começar por pilotos claros, objetivos limitados e acompanhamento próximo. Escalar sem evidência pode criar dependência, desigualdade, uso superficial ou perda de esforço cognitivo.",
      ]
    : [
        "## Análise por eixos",
        "",
        "### 1. Estratégia antes da execução",
        "",
        "A decisão deve começar por uma finalidade pública e educativa clara, antes de avançar para instrumentos, equipamentos ou comunicação.",
        "",
        "### 2. Implementação como critério de qualidade",
        "",
        "Uma boa estratégia só cria valor quando prevê governação, formação, responsabilidades, recursos, acompanhamento e avaliação.",
        "",
        "### 3. Evidência e aprendizagem institucional",
        "",
        "As decisões devem produzir informação útil para ajustar práticas, melhorar programas e apoiar novas escolhas.",
      ];

  return [
    `# ${proposal.title}`,
    "",
    "## Sumário / deck",
    "",
    `${proposal.whyItMatters} O artigo propõe uma leitura Educanology: tecnologia e IA devem ampliar capacidades humanas, não substituir o desenvolvimento das competências fundamentais que sustentam a autonomia dos alunos.`,
    "",
    "## Objetivo do artigo",
    "",
    "Explicar como escolas, agrupamentos, municípios e organizações educativas podem abordar este tema com clareza institucional, prudência pedagógica e capacidade prática de implementação.",
    "",
    "## O que o artigo procura explicar",
    "",
    "O artigo procura mostrar por que razão a adoção de tecnologia em educação deve ser gradual, acompanhada por professores e orientada por objetivos de aprendizagem, proteção de dados, ética e avaliação.",
    "",
    "## Tese orientadora / perguntas de investigação",
    "",
    "- Que problema educativo queremos resolver?",
    "- Que capacidades humanas precisam de ser desenvolvidas antes da automação?",
    "- Que factos estão confirmados pelas fontes disponíveis?",
    "- Que interpretação faz a Educanology?",
    "- Que passos práticos podem ser adotados por decisores públicos e educativos?",
    "",
    "## Contexto e factos confirmados",
    "",
    formatList(proposal.confirmedFacts),
    "",
    "As fontes associadas a este rascunho devem ser verificadas antes de publicação. Quando não há data confirmada, deve ser usada a indicação \"data a confirmar\" e não deve ser inventada qualquer cronologia.",
    "",
    ...doctrineSection,
    "",
    "## Implicações para decisores",
    "",
    "A principal implicação é que a tecnologia não deve ser tratada como solução isolada. A decisão deve articular currículo, formação docente, regras de uso, avaliação, infraestrutura, proteção de dados e comunicação com a comunidade educativa.",
    "",
    "Para municípios, isto significa apoiar escolas, bibliotecas, centros de formação e espaços de inovação como partes de um ecossistema de aprendizagem. Para escolas e agrupamentos, significa criar práticas comuns, linguagem clara e pilotos que possam ser observados, avaliados e ajustados.",
    "",
    "## Recomendações práticas",
    "",
    "- Definir uma política inicial de uso responsável, curta e compreensível.",
    "- Identificar competências humanas que não devem ser substituídas pela ferramenta.",
    "- Criar pilotos pequenos, com objetivos e indicadores simples.",
    "- Formar professores com casos reais, não apenas com demonstrações de ferramentas.",
    "- Definir regras de validação humana, proteção de dados e comunicação aos alunos.",
    "- Avaliar se a tecnologia aumenta compreensão, autonomia e motivação, ou apenas acelera respostas.",
    "",
    "## Riscos e cautelas",
    "",
    "- Não transformar recomendações institucionais gerais em obrigações legais específicas.",
    "- Não apresentar a tecnologia como inerentemente positiva.",
    "- Não substituir esforço cognitivo por produção automática de respostas.",
    "- Não usar teorias de estilos de aprendizagem fixos como base científica não questionada.",
    "- Não publicar sem verificar fontes, datas e contexto.",
    "",
    "## Como a Educanology pode apoiar",
    "",
    "A Educanology pode apoiar diagnóstico, estratégia responsável de tecnologia, política de IA responsável, formação docente, desenho de pilotos, apoio à implementação, desenho de projetos e preparação de candidaturas/financiamento quando relevante.",
    "",
    "O objetivo é transformar uma intenção institucional em capacidade real de execução: regras claras, professores preparados, pilotos bem desenhados, proteção de dados, avaliação e aprendizagem organizacional.",
    "",
    "Contacto: hello@educanology.eu",
    "",
    "Este rascunho não constitui aconselhamento jurídico, financeiro ou técnico vinculativo. Qualquer decisão institucional deve ser revista e validada pela equipa responsável.",
    "",
    "## Fontes",
    "",
    formatSources(proposal.sources),
  ].join("\n");
}

function createLinkedInDraft(proposal, blogLink) {
  return {
    hook:
      "A tecnologia em educação deve funcionar como uma bicicleta: amplia capacidades humanas, mas não substitui equilíbrio, direção ou esforço.",
    mainText: [
      "Na Educanology, defendemos uma adoção human-first da tecnologia educativa.",
      "",
      "Antes da calculadora, é preciso compreender operações básicas.",
      "Antes do computador substituir a escrita, é preciso desenvolver coordenação, letra e expressão.",
      "Antes de usar IA para produzir respostas, é preciso ler, escrever, raciocinar, questionar e pensar criticamente.",
      "",
      "A IA não deve tornar a aprendizagem superficialmente mais fácil.",
      "Deve torná-la mais significativa, desafiante, personalizada e motivadora.",
      "",
      proposal.suggestedEducanologyAngle,
      "",
      "A questão não é tecnologia sim ou não.",
      "A questão é quando, porquê, com que regras, com que formação docente e com que proteção da autonomia humana.",
    ].join("\n"),
    cta:
      "Se a sua escola, município ou organização quer desenhar uma estratégia responsável de IA e tecnologia educativa, fale com a Educanology.",
    hashtags: [
      "#Educação",
      "#IAnaEducação",
      "#TecnologiaEducativa",
      "#EscolaPública",
      "#TransformaçãoDigital",
      "#Educanology",
    ],
    suggestedFirstComment:
      "Artigo completo no blog da Educanology, com uma abordagem human-first para adoção responsável de tecnologia e IA em educação.",
    blogLink,
    imageReference: `${safeName}-visual-brief`,
  };
}

function createVisualBrief(proposal) {
  const blogImagePrompt = [
    "Create a realistic editorial photograph for Educanology, a Portuguese educational consulting organisation.",
    "Scene: a public school classroom or municipal education space in Portugal, with a teacher guiding students through a thoughtful technology-supported activity.",
    "The image should express human-first technology adoption: technology amplifies learning, but the teacher, student reasoning, reading, writing, discussion and human effort remain central.",
    "European, Iberian, Portuguese, municipal, educational, institutional, human, realistic and strategic visual style.",
    "Natural light, grounded public education context, credible people, no visible readable text on screens.",
    "Avoid exaggerated sci-fi, cartoon robots, fake stock-photo perfection, chaotic collages, empty iconography, excessive text, unrealistic holograms and artificial elements without real educational context.",
    "Format: blog hero image, 16:9.",
  ].join(" ");

  const linkedInImagePrompt = [
    "Create a LinkedIn editorial image variant for Educanology based on human-first technology adoption.",
    "Use a realistic Portuguese public education or municipal learning context, showing teacher support, student attention, foundational skills and thoughtful use of digital tools.",
    "Keep the image human, institutional, grounded, uncluttered and strategic.",
    "Avoid text-heavy composition, sci-fi aesthetics, cartoon robots, fake stock-photo perfection and chaotic collages.",
    "Format: LinkedIn image, 1.91:1.",
  ].join(" ");

  return {
    id: `${safeName}-visual-brief`,
    concept:
      "Professor e alunos numa escola pública portuguesa a usar tecnologia como amplificador de capacidades humanas, com foco em leitura, escrita, raciocínio, orientação docente e aprendizagem significativa.",
    visualCategoryStyle:
      "IA na Educação: human-centred AI in schools, teacher support, personalised learning, foundational skills and thoughtful technology use.",
    blogHeroFormat: "16:9",
    linkedInFormat: "1.91:1",
    blogImagePrompt,
    linkedInImagePrompt,
    altText:
      "Professor a orientar estudantes numa sala de aula portuguesa com tecnologia usada para apoiar aprendizagem, leitura, escrita e raciocínio.",
    notes:
      "A imagem deve parecer institucional, realista e educativa, sem estética futurista exagerada.",
  };
}

function createPackage(batch, proposal, selection) {
  const slug = slugify(proposal.title);
  const blogLink = `https://educanology.eu/blog/${slug}`;
  const visualBrief = createVisualBrief(proposal);

  return {
    id: outputBaseName,
    sourceProposalId: proposal.id,
    status: "draft",
    category: proposal.category,
    title: proposal.title,
    slug,
    summary:
      "Pacote interno de rascunho editorial para revisão humana antes de qualquer publicação.",
    reviewer: proposal.recommendedReviewer,
    selectionMode: selection.selectionMode,
    sources: proposal.sources,
    confirmedFacts: proposal.confirmedFacts,
    interpretation: proposal.interpretation,
    blogDraft: createBlogDraft(proposal),
    seoTitle: `${proposal.title} | Educanology`,
    seoDescription:
      "Análise Educanology sobre adoção human-first de tecnologia e inteligência artificial em educação, com foco em competências fundamentais, professores, ética e implementação responsável.",
    linkedInDraft: createLinkedInDraft(proposal, blogLink),
    visualBrief,
    blogImagePrompt: visualBrief.blogImagePrompt,
    linkedInImagePrompt: visualBrief.linkedInImagePrompt,
    altText: visualBrief.altText,
    approvalStatus: selection.approvalStatus,
    createdAt: batch.generatedAt,
    updatedAt: batch.generatedAt,
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
    `- Modo de seleção: ${draftPackage.selectionMode}`,
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
    "- [ ] O rascunho segue a doutrina human-first de adoção tecnológica.",
    "- [ ] A personalização evita neuromitos sobre estilos de aprendizagem fixos.",
    "- [ ] O tom é claro, franco, amigável, positivo, construtivo, resolutivo, empático, institucional e prático.",
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

const batch = readJson(inputProposalPath);
const selection = selectProposal(batch);
const draftPackage = createPackage(batch, selection.proposal, selection);
const markdown = createMarkdown(draftPackage);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(jsonOutputPath, `${JSON.stringify(draftPackage, null, 2)}\n`);
fs.writeFileSync(markdownOutputPath, `${markdown}\n`);

console.log("Editorial draft package created:");
console.log(markdownOutputPath);
console.log(jsonOutputPath);
