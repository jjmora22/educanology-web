export type BlogCategory =
  | "IA na Educação"
  | "Política Municipal"
  | "Laboratórios"
  | "Estratégia"
  | "Financiamento";

export type BlogCategorySlug =
  | "ia-na-educacao"
  | "politica-municipal"
  | "laboratorios"
  | "estrategia"
  | "financiamento";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  category: BlogCategory;
  categorySlug: BlogCategorySlug;
  summary: string;
  readingTime: string;
  coverImage: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  published: boolean;
  sections: BlogSection[];
  faq?: BlogFaq[];
  linkedInDraft: string;
};

export type BlogCategoryInfo = {
  title: BlogCategory;
  slug: BlogCategorySlug;
  description: string;
};

export const blogCategories: BlogCategoryInfo[] = [
  {
    title: "IA na Educação",
    slug: "ia-na-educacao",
    description:
      "Inteligência artificial responsável, governação, formação docente e usos pedagógicos com critério.",
  },
  {
    title: "Política Municipal",
    slug: "politica-municipal",
    description:
      "Estratégias educativas territoriais para municípios, comunidades intermunicipais e ecossistemas locais.",
  },
  {
    title: "Laboratórios",
    slug: "laboratorios",
    description:
      "FabLabs, MakerSpaces e laboratórios STEAM desenhados para aprendizagem ativa e impacto curricular.",
  },
  {
    title: "Estratégia",
    slug: "estrategia",
    description:
      "Transformação educativa, mudança organizacional, adoção tecnológica e evidência para decisão.",
  },
  {
    title: "Financiamento",
    slug: "financiamento",
    description:
      "Projetos financiáveis, arquitetura de candidaturas e planeamento institucional sem promessas artificiais.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: "IA responsável na escola pública: como começar sem errar",
    slug: "ia-responsavel-escola-publica-como-comecar-sem-errar",
    date: "2026-05-13",
    category: "IA na Educação",
    categorySlug: "ia-na-educacao",
    summary:
      "Um guia institucional para iniciar a adoção de inteligência artificial na escola pública com finalidade pedagógica, proteção de dados, formação docente e governação clara.",
    readingTime: "7 min",
    coverImage: "/images/hero-learning.png",
    coverAlt:
      "Estudantes e professores num ambiente de aprendizagem tecnológica colaborativa",
    seoTitle:
      "IA responsável na escola pública: guia prático para começar bem",
    seoDescription:
      "Como escolas, agrupamentos e municípios podem iniciar a adoção de IA na educação com critérios pedagógicos, ética, formação docente e governação.",
    keywords: [
      "IA na educação",
      "inteligência artificial responsável",
      "escola pública",
      "formação docente",
      "governação educativa",
    ],
    published: true,
    sections: [
      {
        heading: "A tecnologia deve responder a uma finalidade educativa",
        paragraphs: [
          "A introdução de inteligência artificial na escola pública não deve começar pela escolha de uma ferramenta. Deve começar por uma pergunta simples e exigente: que problema educativo queremos resolver e que benefício concreto esperamos para alunos, professores e equipas de direção?",
          "A IA pode apoiar a preparação de aulas, a adaptação de materiais, a tutoria, a análise de dados e a organização do trabalho docente. Mas estes usos só fazem sentido quando estão ligados a objetivos pedagógicos claros, avaliáveis e compatíveis com a missão pública da escola.",
        ],
      },
      {
        heading: "Criar uma política de uso antes de escalar",
        paragraphs: [
          "Uma escola ou município não precisa de esperar por uma arquitetura perfeita para começar. Precisa, sim, de uma política inicial de uso: que dados não podem ser introduzidos, que tarefas exigem validação humana, que ferramentas são permitidas e como se explicam os limites da IA aos alunos.",
          "Esta política deve ser prática, compreensível e revista com regularidade. A responsabilidade não está em bloquear toda a experimentação, mas em criar condições para experimentar com segurança, transparência e sentido pedagógico.",
        ],
      },
      {
        heading: "Formação docente com casos reais",
        paragraphs: [
          "A formação em IA deve partir das tarefas quotidianas dos professores. Preparar uma sequência de aprendizagem, criar rubricas, diferenciar materiais, apoiar alunos com ritmos distintos ou desenhar projetos interdisciplinares são pontos de entrada muito mais úteis do que sessões genéricas sobre ferramentas.",
          "A Educanology defende uma abordagem de capacitação aplicada: menos deslumbramento tecnológico, mais prática acompanhada, reflexão ética e integração curricular progressiva.",
        ],
      },
      {
        heading: "Pilotar, medir e decidir com evidência",
        paragraphs: [
          "O primeiro passo institucional deve ser um piloto bem delimitado. Pode envolver um conjunto de professores, uma disciplina, um ciclo de ensino ou um agrupamento. O essencial é definir objetivos, indicadores, responsabilidades e momentos de avaliação.",
          "A expansão deve acontecer quando há evidência de utilidade, segurança e apropriação pedagógica. Em educação, escalar depressa sem aprender primeiro costuma gerar resistência, desperdício e frustração.",
        ],
      },
    ],
    faq: [
      {
        question: "Uma escola deve proibir ferramentas de IA generativa?",
        answer:
          "Uma proibição total tende a ser difícil de aplicar e pouco educativa. O mais útil é definir regras claras, usos permitidos, limites de dados e critérios de validação humana.",
      },
      {
        question: "Qual deve ser o primeiro projeto de IA numa escola?",
        answer:
          "Um bom primeiro projeto é pequeno, acompanhado e ligado a uma necessidade real, como apoio à planificação docente, diferenciação de materiais ou literacia crítica sobre IA.",
      },
    ],
    linkedInDraft:
      "A IA na escola pública deve começar pela finalidade educativa, não pela ferramenta. Políticas de uso, formação aplicada e pilotos com evidência são o caminho mais responsável.",
  },
  {
    title: "Municípios como motores de aprendizagem ao longo da vida",
    slug: "municipios-motores-aprendizagem-ao-longo-da-vida",
    date: "2026-05-13",
    category: "Política Municipal",
    categorySlug: "politica-municipal",
    summary:
      "Como os municípios podem articular escolas, bibliotecas, centros de formação, empresas e comunidade para construir ecossistemas locais de aprendizagem contínua.",
    readingTime: "6 min",
    coverImage: "/images/foto_1.png",
    coverAlt:
      "Estudantes a trabalhar em conjunto numa sala de aula com tecnologia",
    seoTitle:
      "Municípios e aprendizagem ao longo da vida: estratégia educativa local",
    seoDescription:
      "Como câmaras municipais podem estruturar políticas de aprendizagem ao longo da vida, competências digitais e inovação educativa territorial.",
    keywords: [
      "política educativa municipal",
      "aprendizagem ao longo da vida",
      "municípios",
      "educação territorial",
      "competências digitais",
    ],
    published: true,
    sections: [
      {
        heading: "O município como articulador educativo",
        paragraphs: [
          "A aprendizagem ao longo da vida ultrapassa a escola, mas precisa da escola. Bibliotecas, empresas, associações, universidades seniores, centros de formação, espaços culturais e laboratórios de inovação podem formar uma rede coerente de oportunidades educativas.",
          "O município tem uma função especialmente relevante: conhece o território, pode convocar parceiros e tem capacidade para transformar iniciativas dispersas numa estratégia educativa local.",
        ],
      },
      {
        heading: "Da programação avulsa à política pública",
        paragraphs: [
          "Muitos territórios têm atividades interessantes, mas sem continuidade, indicadores ou integração com prioridades educativas. A diferença entre agenda e política pública está na coerência: objetivos comuns, públicos prioritários, calendário, orçamento, responsabilidades e avaliação.",
          "Uma estratégia municipal de aprendizagem ao longo da vida pode incluir competências digitais, IA responsável, inclusão, transição ecológica, empregabilidade, cidadania e reforço da ligação entre escola e comunidade.",
        ],
      },
      {
        heading: "Mapear recursos antes de comprar soluções",
        paragraphs: [
          "Antes de investir em novas plataformas ou equipamentos, vale a pena mapear o que já existe: espaços, pessoas, programas, empresas, associações e conhecimento local. Muitas vezes, o primeiro ganho está na coordenação e não na aquisição.",
          "Este diagnóstico permite desenhar programas mais realistas, evitar duplicações e construir projetos financiáveis com maior credibilidade institucional.",
        ],
      },
      {
        heading: "Medir participação, qualidade e continuidade",
        paragraphs: [
          "A avaliação municipal não deve limitar-se ao número de participantes. É importante medir continuidade, diversidade de públicos, aquisição de competências, satisfação, ligação às escolas e capacidade de gerar novas oportunidades.",
          "Com evidência simples, mas consistente, os municípios conseguem melhorar decisões, comunicar impacto e preparar melhor futuras parcerias e candidaturas.",
        ],
      },
    ],
    faq: [
      {
        question:
          "Uma estratégia municipal de educação deve focar-se apenas nas escolas?",
        answer:
          "Não. As escolas são centrais, mas uma estratégia robusta integra também bibliotecas, associações, empresas, famílias, centros de formação e outros espaços de aprendizagem.",
      },
      {
        question: "Como começar uma política local de aprendizagem contínua?",
        answer:
          "O primeiro passo é mapear necessidades, recursos e parceiros. Depois, devem ser definidos objetivos, públicos prioritários, indicadores e um modelo de governação simples.",
      },
    ],
    linkedInDraft:
      "Os municípios podem transformar iniciativas dispersas em ecossistemas locais de aprendizagem. O ponto de partida é coordenação, diagnóstico e visão educativa territorial.",
  },
  {
    title: "Laboratórios STEAM com propósito pedagógico: além dos equipamentos",
    slug: "laboratorios-steam-proposito-pedagogico-alem-dos-equipamentos",
    date: "2026-05-13",
    category: "Laboratórios",
    categorySlug: "laboratorios",
    summary:
      "Um laboratório STEAM transforma a aprendizagem quando combina espaço, currículo, formação docente, manutenção, segurança e projetos com ligação ao território.",
    readingTime: "7 min",
    coverImage: "/images/nueva_educacion_5.png",
    coverAlt:
      "Professor e estudante a trabalhar com prototipagem e tecnologia educativa",
    seoTitle:
      "Laboratórios STEAM: como criar espaços com propósito pedagógico",
    seoDescription:
      "Critérios para desenhar FabLabs, MakerSpaces e laboratórios STEAM que apoiam aprendizagem ativa, currículo e inovação educativa.",
    keywords: [
      "laboratórios STEAM",
      "FabLabs educativos",
      "MakerSpaces",
      "aprendizagem ativa",
      "tecnologia educativa",
    ],
    published: true,
    sections: [
      {
        heading: "Um laboratório não é uma sala com máquinas",
        paragraphs: [
          "Impressoras 3D, robótica, sensores, kits de eletrónica, cortadoras e software criativo podem enriquecer profundamente a aprendizagem. Mas, por si só, não criam uma cultura de projeto.",
          "Um laboratório STEAM deve nascer de uma pergunta pedagógica: que experiências queremos que os alunos vivam, que competências queremos desenvolver e como vamos integrar o espaço no currículo real das escolas?",
        ],
      },
      {
        heading: "Desenhar o espaço para utilização regular",
        paragraphs: [
          "A funcionalidade importa tanto como a inspiração. Um laboratório precisa de circulação adequada, armazenamento, regras de segurança, materiais consumíveis, manutenção, calendário de utilização e apoio a professores.",
          "Se o espaço depender apenas de entusiasmo inicial, arrisca tornar-se uma montra. Se for desenhado como infraestrutura pedagógica, pode apoiar projetos recorrentes, interdisciplinares e avaliáveis.",
        ],
      },
      {
        heading: "Formar professores para projetar aprendizagem",
        paragraphs: [
          "A formação não deve limitar-se à operação técnica dos equipamentos. Professores precisam de apoio para transformar problemas em desafios de aprendizagem, criar rubricas, gerir grupos, documentar processos e avaliar competências.",
          "A Educanology posiciona estes laboratórios como ambientes de transformação pedagógica, não como anexos tecnológicos separados da vida escolar.",
        ],
      },
      {
        heading: "Ligar projetos ao território",
        paragraphs: [
          "Os laboratórios ganham sentido quando trabalham problemas próximos: sustentabilidade, património, inclusão, mobilidade, energia, água, comunicação local ou apoio a instituições da comunidade.",
          "Esta ligação reforça a motivação dos alunos e demonstra que ciência, tecnologia, engenharia, artes e matemática podem produzir respostas concretas para desafios reais.",
        ],
      },
    ],
    faq: [
      {
        question: "Que equipamentos deve ter um laboratório STEAM?",
        answer:
          "Depende dos objetivos pedagógicos, idade dos alunos, equipa docente e capacidade de manutenção. A escolha deve vir depois do desenho curricular e operacional.",
      },
      {
        question: "Como evitar que um laboratório fique subutilizado?",
        answer:
          "É essencial prever formação docente, calendário de utilização, apoio técnico, materiais consumíveis, integração curricular e acompanhamento nos primeiros ciclos de uso.",
      },
    ],
    linkedInDraft:
      "Um laboratório STEAM só cria impacto quando deixa de ser uma sala de equipamentos e passa a ser uma infraestrutura pedagógica integrada no currículo e no território.",
  },
  {
    title: "Da compra de equipamentos à transformação educativa real",
    slug: "compra-equipamentos-transformacao-educativa-real",
    date: "2026-05-13",
    category: "Estratégia",
    categorySlug: "estrategia",
    summary:
      "A modernização educativa exige mais do que tecnologia: precisa de diagnóstico, liderança, formação, acompanhamento e indicadores de mudança.",
    readingTime: "6 min",
    coverImage: "/images/imagen_2.png",
    coverAlt:
      "Equipa educativa a desenvolver projeto com ferramentas digitais e colaboração",
    seoTitle:
      "Transformação educativa real: além da compra de equipamentos",
    seoDescription:
      "Como escolas, municípios e organizações podem transformar investimento tecnológico em mudança pedagógica, organizacional e mensurável.",
    keywords: [
      "transformação educativa",
      "modernização escolar",
      "estratégia digital educativa",
      "adoção tecnológica",
      "mudança organizacional",
    ],
    published: true,
    sections: [
      {
        heading: "Equipar não é transformar",
        paragraphs: [
          "A compra de equipamentos é frequentemente o sinal mais visível de modernização. Computadores, redes, plataformas e laboratórios são importantes, mas não garantem mudança nas práticas de ensino e aprendizagem.",
          "A transformação educativa real acontece quando a tecnologia altera positivamente a forma como se aprende, se ensina, se colabora, se avalia e se toma decisão.",
        ],
      },
      {
        heading: "Começar por um diagnóstico honesto",
        paragraphs: [
          "Antes de investir, é necessário compreender o ponto de partida: infraestrutura, competências docentes, maturidade digital, prioridades pedagógicas, limitações operacionais e necessidades dos alunos.",
          "Um diagnóstico claro evita compras desalinhadas, ajuda a definir fases e permite construir uma narrativa institucional credível para financiamento, comunicação e mobilização interna.",
        ],
      },
      {
        heading: "A liderança é parte da infraestrutura",
        paragraphs: [
          "Sem liderança, a tecnologia tende a fragmentar-se em iniciativas isoladas. Direções escolares, municípios e equipas técnicas precisam de uma visão comum, responsabilidades definidas e mecanismos de acompanhamento.",
          "Transformar exige gestão de mudança: tempo para experimentar, partilha entre pares, apoio a quem tem mais dificuldade e reconhecimento do trabalho pedagógico que sustenta a adoção.",
        ],
      },
      {
        heading: "Medir o que muda, não apenas o que foi comprado",
        paragraphs: [
          "Indicadores de execução são necessários, mas insuficientes. É importante acompanhar utilização efetiva, qualidade dos projetos, participação docente, competências desenvolvidas, inclusão e satisfação dos utilizadores.",
          "A Educanology trabalha a transformação educativa como um processo completo: estratégia, desenho pedagógico, tecnologia, formação, implementação e evidência.",
        ],
      },
    ],
    faq: [
      {
        question: "Quando é que uma compra tecnológica cria impacto educativo?",
        answer:
          "Quando está ligada a objetivos pedagógicos, formação, acompanhamento, manutenção e indicadores que medem uso e aprendizagem, não apenas instalação.",
      },
      {
        question: "Quem deve liderar uma estratégia de transformação educativa?",
        answer:
          "A liderança deve ser partilhada entre direção, professores, equipas técnicas e decisores institucionais, com responsabilidades claras e acompanhamento regular.",
      },
    ],
    linkedInDraft:
      "Equipar escolas é importante, mas transformar exige diagnóstico, liderança, formação e evidência. A tecnologia só muda educação quando muda práticas.",
  },
  {
    title: "Financiamento europeu para educação digital: guia para municípios",
    slug: "financiamento-europeu-educacao-digital-guia-municipios",
    date: "2026-05-13",
    category: "Financiamento",
    categorySlug: "financiamento",
    summary:
      "Como preparar projetos municipais de educação digital mais coerentes, financiáveis e orientados para impacto educativo mensurável.",
    readingTime: "7 min",
    coverImage: "/images/nueva_educacion_4.png",
    coverAlt:
      "Laboratório de inovação educativa com estudantes e tecnologia de prototipagem",
    seoTitle:
      "Financiamento europeu para educação digital: guia para municípios",
    seoDescription:
      "Orientações para municípios estruturarem projetos de educação digital com diagnóstico, parceiros, coerência pedagógica, indicadores e sustentabilidade.",
    keywords: [
      "financiamento europeu educação",
      "educação digital",
      "municípios",
      "projetos financiáveis",
      "candidaturas educação",
    ],
    published: true,
    sections: [
      {
        heading: "Financiamento não substitui estratégia",
        paragraphs: [
          "O financiamento deve acelerar uma visão, não inventá-la à pressa. Municípios que conhecem as suas necessidades educativas, parceiros e prioridades conseguem desenhar projetos mais coerentes e defender melhor o seu impacto.",
          "A primeira pergunta não é que candidatura está aberta, mas que transformação o território precisa de realizar e que capacidade existe para a implementar com qualidade.",
        ],
      },
      {
        heading: "Construir uma arquitetura de projeto",
        paragraphs: [
          "Um projeto financiável precisa de diagnóstico, objetivos, públicos, atividades, equipa, parceiros, orçamento, calendário, riscos, indicadores e plano de continuidade. Estes elementos devem contar a mesma história.",
          "Na educação digital, essa história deve articular tecnologia, formação docente, inclusão, aprendizagem ativa, governação e evidência. Projetos centrados apenas em aquisição tendem a ser mais frágeis.",
        ],
      },
      {
        heading: "Escolher parceiros com função clara",
        paragraphs: [
          "Parcerias são mais fortes quando cada entidade tem uma contribuição concreta: escolas, centros de formação, universidades, empresas, associações, bibliotecas ou organismos públicos.",
          "A qualidade de uma parceria mede-se pela sua utilidade no projeto, não pelo número de logótipos. Cada parceiro deve reforçar execução, conhecimento, impacto ou sustentabilidade.",
        ],
      },
      {
        heading: "Planear execução e sustentabilidade",
        paragraphs: [
          "Uma candidatura deve antecipar a execução: contratação, coordenação, comunicação, formação, manutenção, monitorização e continuidade após o período financiado.",
          "Este planeamento reduz risco, melhora a qualidade da implementação e demonstra maturidade institucional. A Educanology apoia municípios precisamente nesta passagem entre visão, financiamento e entrega operacional.",
        ],
      },
    ],
    faq: [
      {
        question:
          "Um município deve esperar por uma candidatura para desenhar o projeto?",
        answer:
          "Não. O melhor é preparar diagnóstico, prioridades e arquitetura de projeto antes da oportunidade de financiamento, para responder com mais qualidade quando ela surgir.",
      },
      {
        question: "O que torna um projeto de educação digital mais financiável?",
        answer:
          "Coerência entre problema, objetivos, atividades, orçamento, parceiros, indicadores e sustentabilidade. A tecnologia deve estar ao serviço de impacto educativo claro.",
      },
    ],
    linkedInDraft:
      "Financiamento europeu para educação digital exige mais do que uma boa ideia: diagnóstico, arquitetura de projeto, parceiros úteis e sustentabilidade desde o primeiro desenho.",
  },
];

export function getAllPosts() {
  return blogPosts.filter((post) => post.published);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategorySlug(categorySlug: BlogCategorySlug) {
  return getAllPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getCategoryBySlug(categorySlug: string) {
  return blogCategories.find((category) => category.slug === categorySlug);
}
