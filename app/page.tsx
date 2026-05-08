import {
  ArrowRight,
  BrainCircuit,
  Building2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Políticas educativas",
    text: "Apoiamos governos, municípios e instituições na definição de estratégias educativas alinhadas com os desafios da inteligência artificial, da inclusão e da aprendizagem ao longo da vida.",
  },
  {
    icon: GraduationCap,
    title: "Transformação pedagógica",
    text: "Desenhamos modelos de aprendizagem ativa, personalizada e baseada em projetos, ajudando professores e equipas diretivas a transformar a cultura educativa.",
  },
  {
    icon: BrainCircuit,
    title: "IA na educação",
    text: "Integramos inteligência artificial de forma responsável, humana e útil: tutoria, personalização, análise de dados, apoio docente e novos modelos de aprendizagem.",
  },
  {
    icon: Network,
    title: "Ecossistemas tecnológicos",
    text: "Ajudamos a planear laboratórios STEAM, FabLabs, MakerSpaces, plataformas digitais, conteúdos educativos e infraestrutura tecnológica com propósito pedagógico.",
  },
];

const audiences = [
  "Câmaras Municipais",
  "Agrupamentos de Escolas",
  "Ministérios e Governos",
  "Universidades",
  "Centros de Formação",
  "Fundações e Organismos Europeus",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ee] text-[#17202a]">
      <section className="relative isolate min-h-screen px-6 py-8 md:px-10 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(45,183,149,0.28),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(111,62,92,0.22),_transparent_34%),linear-gradient(180deg,_#fffaf3_0%,_#f7f3ee_55%,_#edf7f3_100%)]" />

        <header className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6f3e5c] text-xl font-black text-white shadow-lg shadow-[#6f3e5c]/20">
              E
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">Educanology</p>
              <p className="text-xs uppercase tracking-[0.28em] text-[#58736b]">
                Education · AI · Policy
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#3c4b47] md:flex">
            <a href="#desafio" className="hover:text-[#6f3e5c]">
              O desafio
            </a>
            <a href="#transformacao" className="hover:text-[#6f3e5c]">
              A transformação
            </a>
            <a href="#ia" className="hover:text-[#6f3e5c]">
              IA
            </a>
            <a href="#especialistas" className="hover:text-[#6f3e5c]">
              Especialistas
            </a>
          </nav>

          <a
            href="mailto:hello@educanology.eu"
            className="hidden rounded-full bg-[#17202a] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#6f3e5c] md:inline-flex"
          >
            Agendar reunião
          </a>
        </header>

        <div className="mx-auto grid max-w-7xl items-center gap-14 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2db795]/30 bg-white/70 px-4 py-2 text-sm font-medium text-[#245a50] shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Consultoria educativa para a era da inteligência artificial
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#17202a] md:text-7xl lg:text-8xl">
              Educação para uma nova inteligência humana.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#41514c] md:text-xl">
              Ajudamos municípios, escolas, governos e organizações a passar da
              simples compra de tecnologia para uma verdadeira transformação
              educativa: políticas, metodologias ativas, IA responsável,
              formação docente, conteúdos e ecossistemas de aprendizagem.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:hello@educanology.eu?subject=Pedido%20de%20reuni%C3%A3o%20Educanology"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#6f3e5c] px-7 py-4 text-base font-bold text-white shadow-2xl shadow-[#6f3e5c]/25 transition hover:-translate-y-1 hover:bg-[#563048]"
              >
                Pedir uma reunião
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>

              <a
                href="#transformacao"
                className="inline-flex items-center justify-center rounded-full border border-[#17202a]/15 bg-white/70 px-7 py-4 text-base font-bold text-[#17202a] shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-[#2db795]"
              >
                Explorar soluções
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[#2db795]/30 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-[#6f3e5c]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#17202a] p-6 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.28em] text-[#8ce2cc]">
                    Learning ecosystem
                  </p>
                  <Lightbulb className="h-6 w-6 text-[#8ce2cc]" />
                </div>

                <div className="mt-12 grid gap-4">
                  {[
                    "Aprendizagem ativa",
                    "IA responsável",
                    "Laboratórios STEAM",
                    "Formação docente",
                    "Fundos europeus",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-5 py-4"
                    >
                      <span className="font-semibold">{item}</span>
                      <span className="text-sm text-[#8ce2cc]">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-3xl bg-[#f7f3ee] p-5 text-[#17202a]">
                  <p className="text-sm font-bold text-[#6f3e5c]">
                    Não vendemos tecnologia.
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-tight">
                    Desenhamos transformação educativa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="desafio" className="px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
            O desafio
          </p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
              A tecnologia entrou na escola. Agora precisa transformar a
              aprendizagem.
            </h2>
            <div className="space-y-6 text-lg leading-8 text-[#41514c]">
              <p>
                Municípios e instituições investem em equipamentos, conectividade
                e plataformas. Mas a verdadeira mudança acontece quando a
                infraestrutura se converte em aprendizagem ativa, criatividade,
                competências digitais, empregabilidade e coesão territorial.
              </p>
              <p>
                A inteligência artificial não substitui a missão humana da
                educação. Amplia-a. Ajuda professores, personaliza percursos,
                antecipa riscos e abre novas formas de aprender, criar e
                participar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="transformacao"
        className="bg-[#17202a] px-6 py-24 text-white md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]">
              A transformação
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Estratégia, pedagogia, tecnologia e financiamento no mesmo plano.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/[0.1]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8ce2cc] text-[#17202a]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 text-xl font-black">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {service.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
              Para quem trabalhamos
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Soluções para instituições que querem liderar a mudança.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div
                key={audience}
                className="rounded-3xl border border-[#17202a]/10 bg-white/75 p-6 text-lg font-bold shadow-sm transition hover:-translate-y-1 hover:border-[#2db795]/60"
              >
                {audience}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="ia"
        className="px-6 pb-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto overflow-hidden rounded-[2rem] bg-[#6f3e5c] p-8 text-white shadow-2xl shadow-[#6f3e5c]/20 md:p-12 lg:max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#d9f8ef]">
                IA humanista
              </p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                A inteligência artificial deve potenciar as pessoas, não
                substituí-las.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/80">
              <p>
                A Educanology ajuda instituições a integrar IA com critérios de
                ética, privacidade, segurança, utilidade pedagógica e impacto
                humano.
              </p>
              <p>
                O objetivo não é automatizar a educação. É libertar tempo,
                personalizar percursos, fortalecer professores e desenvolver as
                capacidades que tornam os seres humanos insubstituíveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="especialistas"
        className="px-6 pb-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#17202a]/10 bg-white/80 p-8 shadow-xl shadow-slate-900/5 md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
                Os especialistas
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
                Experiência em política pública, educação, tecnologia e
                transformação institucional.
              </h2>
            </div>
            <a
              href="mailto:hello@educanology.eu"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#17202a] px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#6f3e5c]"
            >
              Falar com a equipa
              <Handshake className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f7f3ee] p-7">
              <h3 className="text-2xl font-black">Daniel Adrião</h3>
              <p className="mt-4 leading-7 text-[#41514c]">
                Especialista em política pública, comunicação, governação e
                inovação educativa, com experiência em programas nacionais de
                inclusão digital e internacionalização EdTech.
              </p>
            </div>
            <div className="rounded-3xl bg-[#f7f3ee] p-7">
              <h3 className="text-2xl font-black">Juan José de la Mora</h3>
              <p className="mt-4 leading-7 text-[#41514c]">
                Consultor internacional em educação, tecnologia, IA, projetos
                financiáveis, transformação digital, desenvolvimento territorial
                e implementação de ecossistemas de aprendizagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#17202a]/10 px-6 py-10 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#41514c] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Educanology Lda. Todos os direitos reservados.</p>
          <p>educanology.eu · hello@educanology.eu</p>
        </div>
      </footer>
    </main>
  );
}