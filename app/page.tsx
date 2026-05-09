"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  Building2,
  CalendarDays,
  ChevronRight,
  Cpu,
  Euro,
  GraduationCap,
  Handshake,
  Landmark,
  Layers3,
  Lightbulb,
  Map,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const services = [
  {
    icon: Landmark,
    title: "Políticas educativas",
    text: "Apoiamos governos, municípios e instituições na definição de estratégias educativas alinhadas com IA, inclusão, competências digitais e aprendizagem ao longo da vida.",
  },
  {
    icon: GraduationCap,
    title: "Transformação pedagógica",
    text: "Desenhamos modelos de aprendizagem ativa, personalizada e baseada em projetos, ajudando professores e equipas diretivas a transformar a cultura educativa.",
  },
  {
    icon: BrainCircuit,
    title: "IA na educação",
    text: "Integramos inteligência artificial de forma responsável: tutoria, personalização, análise de dados, apoio docente e novos modelos de aprendizagem.",
  },
  {
    icon: Network,
    title: "Ecossistemas tecnológicos",
    text: "Planeamos laboratórios STEAM, FabLabs, MakerSpaces, plataformas digitais, conteúdos educativos e infraestrutura tecnológica com propósito pedagógico.",
  },
];

const audiences = [
  {
    icon: Building2,
    title: "Câmaras Municipais",
    text: "Modernização educativa, capacitação docente, laboratórios, inovação territorial e projetos financiáveis.",
  },
  {
    icon: BookOpenCheck,
    title: "Agrupamentos de Escolas",
    text: "Modelos ativos de aprendizagem, IA humanista, formação docente e uso inteligente da tecnologia.",
  },
  {
    icon: Landmark,
    title: "Governos e Ministérios",
    text: "Estratégias públicas, políticas educativas, programas nacionais e transformação digital em escala.",
  },
  {
    icon: Handshake,
    title: "Fundações e Organismos",
    text: "Projetos financiáveis, impacto social, inclusão, desenvolvimento territorial e educação para o futuro.",
  },
];

const method = [
  {
    step: "01",
    title: "Escutar",
    text: "Compreendemos o território, a instituição, os desafios educativos, a infraestrutura existente e as prioridades políticas ou pedagógicas.",
  },
  {
    step: "02",
    title: "Desenhar",
    text: "Criamos uma arquitetura de transformação: estratégia, metodologia, tecnologia, formação, financiamento e indicadores de impacto.",
  },
  {
    step: "03",
    title: "Implementar",
    text: "Apoiamos a formação, a adoção pedagógica, a integração de ferramentas, laboratórios, plataformas e modelos de gestão educativa.",
  },
  {
    step: "04",
    title: "Medir",
    text: "Geramos evidência, indicadores, relatórios e aprendizagem institucional para escalar aquilo que realmente funciona.",
  },
];

const authority = [
  "Experiência em programas nacionais de inclusão digital",
  "Internacionalização de soluções EdTech portuguesas",
  "Consultoria em política pública, governação e educação",
  "Projetos educativos, tecnológicos e financiáveis na Europa e América Latina",
];

const insights = [
  "IA responsável na escola pública",
  "Municípios como motores de aprendizagem ao longo da vida",
  "Laboratórios STEAM com propósito pedagógico",
  "Da compra de equipamentos à transformação educativa",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ee] text-[#17202a]">
      <section className="relative isolate min-h-screen px-6 py-8 md:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(45,183,149,0.30),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(111,62,92,0.25),_transparent_34%),linear-gradient(180deg,_#fffaf3_0%,_#f7f3ee_58%,_#edf7f3_100%)]" />
        <div className="learning-grid absolute inset-0 -z-10 opacity-[0.42]" />

        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-7xl items-center justify-between"
        >
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6f3e5c] text-xl font-black text-white shadow-lg shadow-[#6f3e5c]/20">
              E
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">Educanology</p>
              <p className="text-xs uppercase tracking-[0.28em] text-[#58736b]">
                Education · AI · Policy
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#3c4b47] md:flex">
            <a href="#desafio" className="nav-link">
              Desafio
            </a>
            <a href="#transformacao" className="nav-link">
              Transformação
            </a>
            <a href="#municipios" className="nav-link">
              Municípios
            </a>
            <a href="#metodo" className="nav-link">
              Método
            </a>
            <a href="#especialistas" className="nav-link">
              Especialistas
            </a>
          </nav>

          <a
            href="mailto:hello@educanology.eu?subject=Pedido%20de%20reuni%C3%A3o%20Educanology"
            className="hidden rounded-full bg-[#17202a] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#6f3e5c] md:inline-flex"
          >
            Agendar reunião
          </a>
        </motion.header>

        <div className="mx-auto grid max-w-7xl items-start gap-10 pt-8 md:pt-10 lg:grid-cols-[1.03fr_0.97fr] lg:pt-14">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.75 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2db795]/30 bg-white/70 px-4 py-2 text-sm font-medium text-[#245a50] shadow-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              Consultoria educativa para a era da inteligência artificial
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.065em] text-[#17202a] md:text-6xl lg:text-[4.8rem] xl:text-[4rem]"
            >
              <span className="block">Educação para uma nova</span>
              <span className="block">inteligência humana.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.85 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-[#41514c] md:text-xl"
            >
              Ajudamos municípios, escolas, governos e organizações a passar da
              simples compra de tecnologia para uma verdadeira transformação
              educativa: políticas, metodologias ativas, IA responsável,
              formação docente, conteúdos e ecossistemas de aprendizagem.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.9 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
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
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 1 }}
              className="mt-12 flex flex-wrap gap-3 text-sm font-semibold text-[#41514c]"
            >
              {["Portugal", "Espanha", "Europa", "América Latina", "Países Lusófonos"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#17202a]/10 bg-white/55 px-4 py-2 shadow-sm backdrop-blur"
                  >
                    {item}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-5 top-10 z-20 hidden rounded-3xl border border-white/70 bg-white/75 p-4 shadow-xl backdrop-blur md:block"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#2db795]/15 p-3 text-[#24675a]">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#58736b]">
                    Impacto
                  </p>
                  <p className="font-black">Aprendizagem real</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0], rotate: [0, -1.2, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
              className="absolute -right-2 bottom-16 z-20 hidden rounded-3xl border border-white/70 bg-white/75 p-4 shadow-xl backdrop-blur md:block"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#6f3e5c]/15 p-3 text-[#6f3e5c]">
                  <Euro className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#58736b]">
                    Financiamento
                  </p>
                  <p className="font-black">Fundos europeus</p>
                </div>
              </div>
            </motion.div>

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

                <div className="relative mt-12">
                  <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#8ce2cc] via-white/20 to-transparent" />

                  {[
                    ["Infraestrutura", "Equipamentos, conectividade, plataformas"],
                    ["Pedagogia", "Projetos, professores, aprendizagem ativa"],
                    ["IA responsável", "Personalização, evidência, apoio docente"],
                    ["Impacto", "Competências, inclusão, território"],
                  ].map(([title, text], index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="relative mb-5 ml-14 rounded-2xl border border-white/10 bg-white/8 px-5 py-4"
                    >
                      <div className="absolute -left-[2.55rem] top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#8ce2cc] text-xs font-black text-[#17202a]">
                        {index + 1}
                      </div>
                      <p className="font-bold">{title}</p>
                      <p className="mt-1 text-sm text-white/60">{text}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl bg-[#f7f3ee] p-5 text-[#17202a]">
                  <p className="text-sm font-bold text-[#6f3e5c]">
                    Não vendemos tecnologia.
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-tight">
                    Desenhamos transformação educativa.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <a
          href="mailto:hello@educanology.eu?subject=Reuni%C3%A3o%20de%2045%20minutos%20com%20Educanology"
          className="fixed bottom-5 right-5 z-50 hidden items-center gap-3 rounded-full bg-[#17202a] px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-slate-900/25 transition hover:-translate-y-1 hover:bg-[#6f3e5c] md:flex"
        >
          <CalendarDays className="h-5 w-5" />
          Reunião de 45 min
        </a>
      </section>

      <section id="desafio" className="px-6 py-24 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]"
          >
            O desafio
          </motion.p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-black tracking-[-0.04em] md:text-6xl"
            >
              A tecnologia entrou na escola. Agora precisa transformar a
              aprendizagem.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="space-y-6 text-lg leading-8 text-[#41514c]"
            >
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
            </motion.div>
          </div>

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {[
              {
                icon: Cpu,
                title: "Tecnologia sem método perde valor",
                text: "Equipamentos isolados raramente mudam resultados. Precisam de estratégia, formação e uso pedagógico.",
              },
              {
                icon: UsersRound,
                title: "Professores precisam de tempo e apoio",
                text: "A mudança educativa acontece quando a tecnologia simplifica, apoia e fortalece o trabalho docente.",
              },
              {
                icon: Map,
                title: "A escola também transforma território",
                text: "Municípios podem converter escolas, centros e laboratórios em motores de competências locais.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  variants={fadeUp}
                  key={item.title}
                  className="rounded-[1.75rem] border border-[#17202a]/10 bg-white/70 p-7 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2db795]/15 text-[#24675a]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-7 text-xl font-black">{item.title}</h3>
                  <p className="mt-4 leading-7 text-[#41514c]">{item.text}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section
        id="transformacao"
        className="relative overflow-hidden bg-[#17202a] px-6 py-24 text-white md:px-10 lg:px-16"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="learning-grid h-full w-full" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative mx-auto max-w-7xl"
        >
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]"
            >
              A transformação
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl"
            >
              Estratégia, pedagogia, tecnologia e financiamento no mesmo plano.
            </motion.h2>
          </div>

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  variants={fadeUp}
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
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section id="municipios" className="px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]"
            >
              Para quem trabalhamos
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl"
            >
              Soluções para instituições que querem liderar a mudança.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-7 text-lg leading-8 text-[#41514c]"
            >
              O nosso cliente ideal é um município ou instituição que quer
              modernizar a educação sem cair na armadilha de comprar tecnologia
              sem estratégia.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2"
          >
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <motion.div
                  variants={fadeUp}
                  key={audience.title}
                  className="group rounded-3xl border border-[#17202a]/10 bg-white/75 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-[#2db795]/60 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6f3e5c]/10 text-[#6f3e5c] transition group-hover:bg-[#6f3e5c] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ChevronRight className="mt-2 h-5 w-5 text-[#2db795] transition group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-7 text-xl font-black">{audience.title}</h3>
                  <p className="mt-4 leading-7 text-[#41514c]">
                    {audience.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="ia" className="px-6 pb-24 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75 }}
          className="mx-auto overflow-hidden rounded-[2rem] bg-[#6f3e5c] p-8 text-white shadow-2xl shadow-[#6f3e5c]/20 md:p-12 lg:max-w-7xl"
        >
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

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Ética", "IA com supervisão humana, transparência e segurança."],
              ["Personalização", "Percursos adaptados sem perder a dimensão humana."],
              ["Evidência", "Dados úteis para melhorar decisões, não para vigiar pessoas."],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/15 bg-white/10 p-6"
              >
                <ShieldCheck className="h-6 w-6 text-[#d9f8ef]" />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-white/75">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="metodo" className="px-6 pb-24 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
              Como trabalhamos
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Um método claro para passar da intenção à implementação.
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {method.map((item) => (
              <motion.div
                variants={fadeUp}
                key={item.step}
                className="relative rounded-[1.75rem] border border-[#17202a]/10 bg-white/75 p-7 shadow-sm backdrop-blur"
              >
                <p className="text-sm font-black text-[#2db795]">{item.step}</p>
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#41514c]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-[#edf7f3] px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
              Evidência e autoridade
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Experiência que liga política pública, tecnologia e aprendizagem.
            </h2>
          </div>

          <div className="grid gap-4">
            {authority.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-3xl border border-[#17202a]/10 bg-white/75 p-6 shadow-sm"
              >
                <BadgeCheck className="mt-1 h-6 w-6 shrink-0 text-[#2db795]" />
                <p className="text-lg font-bold leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="especialistas"
        className="px-6 py-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#17202a]/10 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur md:p-12">
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
              Especialista em ciência política, política pública, governação,
              comunicação e inovação educativa. Fundador da Educanology, combina
              experiência institucional em programas nacionais de inclusão digital,
              internacionalização EdTech e desenho de estratégias educativas para
              governos, municípios e organizações.
              </p>
            </div>
            <div className="rounded-3xl bg-[#f7f3ee] p-7">
              <h3 className="text-2xl font-black">Juan José de la Mora</h3>
              <p className="mt-4 leading-7 text-[#41514c]">
              Consultor internacional associado em educação, tecnologia, IA, projetos
              financiáveis, transformação digital e desenvolvimento territorial, com
              experiência na articulação de ecossistemas educativos entre Europa e América Latina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-[#17202a] p-8 text-white md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]">
                  Insights
                </p>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                  Conteúdo pensado para Google, IA e decisores públicos.
                </h2>
                <p className="mt-6 leading-8 text-white/70">
                  Esta área será a base do posicionamento orgânico: artigos,
                  guias, perguntas frequentes e páginas de autoridade sobre IA,
                  educação, municípios, financiamento e transformação digital.
                </p>
              </div>

              <div className="grid gap-4">
                {insights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.06] p-5"
                  >
                    <p className="font-bold">{item}</p>
                    <Rocket className="h-5 w-5 text-[#8ce2cc]" />
                  </div>
                ))}
              </div>
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