"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FloatingConversion from "@/components/FloatingConversion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  Building2,
  Check,
  ChevronRight,
  Euro,
  GraduationCap,
  Handshake,
  Landmark,
  Map,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Cpu,
  Globe2,
  FileSearch,
  TrendingUp,
  Lightbulb,
  Layers3,
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

// 5 fases según el guion estratégico
const method = [
  {
    step: "01",
    title: "Escutar",
    text: "Compreendemos o território, a instituição, os desafios educativos, a infraestrutura existente e as prioridades políticas ou pedagógicas.",
  },
  {
    step: "02",
    title: "Desenhar",
    text: "Criamos uma arquitetura de transformação: estratégia, modelo pedagógico, tecnologia, formação, conteúdos, KPIs e orçamento.",
  },
  {
    step: "03",
    title: "Ativar",
    text: "Formação docente, liderança educativa, cultura organizacional e acompanhamento à mudança com equipas reais.",
  },
  {
    step: "04",
    title: "Implementar",
    text: "Apoiamos a adoção pedagógica, a integração de ferramentas, laboratórios, plataformas e modelos de gestão educativa.",
  },
  {
    step: "05",
    title: "Medir",
    text: "Geramos evidência, indicadores, relatórios e aprendizagem institucional para escalar aquilo que realmente funciona.",
  },
];

const authority = [
  "Experiência na governação do programa e.Escola — inclusão digital educativa à escala nacional",
  "Internacionalização de soluções EdTech portuguesas através do consórcio E-xample (20+ empresas)",
  "Consultoria em política pública, governação educativa e transformação institucional",
  "Projetos educativos, tecnológicos e financiáveis em Portugal, Espanha, Europa e América Latina",
];

const insights = [
  {
    title: "IA responsável na escola pública: como começar sem errar",
    tag: "IA na Educação",
    href: "/blog/categoria/ia-na-educacao",
  },
  {
    title: "Municípios como motores de aprendizagem ao longo da vida",
    tag: "Política Municipal",
    href: "/blog/categoria/politica-municipal",
  },
  {
    title: "Laboratórios STEAM com propósito pedagógico: além dos equipamentos",
    tag: "Laboratórios",
    href: "/blog/categoria/laboratorios",
  },
  {
    title: "Da compra de equipamentos à transformação educativa real",
    tag: "Estratégia",
    href: "/blog/categoria/estrategia",
  },
  {
    title: "Financiamento europeu para educação digital: guia para municípios",
    tag: "Financiamento",
    href: "/blog/categoria/financiamento",
  },
];

// Fotos: copia estos archivos a /public/images/ en tu proyecto Next.js
const photos = [
  { src: "/images/foto_1.png", alt: "Estudantes a trabalhar com tecnologia em sala de aula colaborativa" },
  { src: "/images/nueva_educacion_4.png", alt: "Laboratório de inovação com estudantes e equipamentos de prototipagem" },
  { src: "/images/nueva_educacion_5.png", alt: "Professor e estudante a trabalhar com impressora 3D e eletrónica" },
  { src: "/images/imagen_2.png", alt: "Equipa a desenvolver projeto com ferramentas digitais e hardware" },
  { src: "/images/foto_6.png", alt: "Estudantes a trabalhar com eletrónica e programação" },
  { src: "/images/foto_8.png", alt: "Grupo a desenvolver projeto de inovação educativa" },
  { src: "/images/foto_9.png", alt: "Colaboração entre estudantes com laptop e metodologia ativa" },
  { src: "/images/imagen_1.png", alt: "Aprendizagem colaborativa apoiada por tecnologia" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#17202a]">

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative isolate min-h-screen px-6 py-8 md:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(45,183,149,0.30),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(111,62,92,0.25),_transparent_34%),linear-gradient(180deg,_#fffaf3_0%,_#f7f3ee_58%,_#edf7f3_100%)]" />
        <div className="learning-grid absolute inset-0 -z-10 opacity-[0.42]" />

        {/* NAV */}
        <SiteHeader />

        {/* HERO GRID */}
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

            {/* Nuevo titular del guion */}
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.065em] text-[#17202a] md:text-4xl lg:text-[4rem] xl:text-[4rem]"
            >
              <span className="block">A educação mudou.</span>
              <span className="block text-[#6f3e5c]">A forma de a transformar</span>
              <span className="block">também.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.85 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-[#41514c] md:text-xl"
            >
              A Educanology ajuda municípios, escolas, governos e organizações a transformar
              tecnologia, inteligência artificial, formação e políticas educativas em
              aprendizagem ativa, competências reais e impacto territorial mensurável.
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
                Marcar uma reunião de 45 min
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

          {/* HERO IMAGE with floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative lg:-mt-2"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-0 top-0 z-20 hidden rounded-3xl border border-white/70 bg-white/85 p-3 shadow-xl backdrop-blur md:block"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#2db795]/15 p-3 text-[#24675a]">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#58736b]">Impacto</p>
                  <p className="font-black">Aprendizagem real</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute bottom-[9.5rem] right-0 z-20 hidden rounded-3xl border border-white/70 bg-white/85 px-5 py-4 shadow-xl backdrop-blur md:block"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#6f3e5c]/15 p-3 text-[#6f3e5c]">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#58736b]">Evidência</p>
                  <p className="font-black">Decisões melhores</p>
                </div>
              </div>
            </motion.div>

            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[#2db795]/30 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-[#6f3e5c]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/foto_1.png"
                  alt="Estudantes a trabalhar com tecnologia e inteligência artificial em ambiente educativo"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17202a]/28 via-transparent to-white/5" />

                <div className="absolute left-20 top-20 rounded-2xl border border-white/40 bg-white/78 px-4 py-3 backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#58736b]">IA humanista</p>
                  <p className="mt-1 text-sm font-bold text-[#17202a]">Personalização com propósito</p>
                </div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-1 max-w-[22rem] rounded-2xl border border-white/20 bg-[#17202a]/78 px-5 py-4 text-white shadow-lg backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <BookOpenCheck className="h-4 w-4 text-[#8ce2cc]" />
                    <p className="text-sm font-bold">Percurso personalizado</p>
                  </div>
                  <p className="mt-1 text-xs text-white/72">Ritmo, apoio e conteúdos adaptados</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute bottom-11 left-4 max-w-[20rem] rounded-2xl border border-white/20 bg-[#17202a]/78 px-5 py-4 text-white shadow-lg backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#8ce2cc]" />
                    <p className="text-sm font-bold">Apoio ao professor</p>
                  </div>
                  <p className="mt-1 text-xs text-white/72">Mais contexto para orientar melhor</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-28 right-0 rounded-2xl border border-white/40 bg-white/82 px-5 py-4 shadow-lg backdrop-blur"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#58736b]">
                    Famílias · Escola · Dados
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#17202a]">Visibilidade e acompanhamento</p>
                </motion.div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#f7f3ee] px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#58736b]">Preferências</p>
                  <p className="mt-1 font-bold text-[#17202a]">Diferentes formas de aprender</p>
                </div>
                <div className="rounded-2xl bg-[#f7f3ee] px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#58736b]">Evidência</p>
                  <p className="mt-1 font-bold text-[#17202a]">Dados úteis para decidir melhor</p>
                </div>
                <div className="rounded-2xl bg-[#2db795] px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Impacto</p>
                  <p className="mt-1 font-bold text-white">Resultados mensuráveis</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BANNER SHOWCASE ─────────────────────────────────────────────────── */}
      <section className="px-6 pb-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/15"
          >
            <div className="relative h-[320px] w-full md:h-[440px]">
              <Image
                src="/images/nueva_educacion_1.png"
                alt="Estudantes e professores a trabalhar em projeto de design e prototipagem — laboratório de aprendizagem ativa"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#17202a]/85 via-[#17202a]/50 to-[#17202a]/10" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-14">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]">
                O futuro que já existe
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight text-white md:text-5xl">
                Aprendizagem ativa. Tecnologia com propósito. Pessoas no centro.
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/70">
                É isto que a Educanology ajuda a construir — em escolas, municípios e governos.
              </p>
              <div className="mt-8">
                <a
                  href="mailto:hello@educanology.eu?subject=Pedido%20de%20reunião%20Educanology"
                  className="inline-flex items-center gap-3 rounded-full bg-[#6f3e5c] px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#563048]"
                >
                  Falar com a equipa
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── GALERIA DE FOTOS ────────────────────────────────────────────────── */}
      <section className="overflow-hidden px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]"
          >
            Aprendizagem que se vê
          </motion.p>

          {/* Grid de cards verticais — formato natural das fotos */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { src: "/images/foto_1.png",   alt: "Estudante com óculos a trabalhar com tecnologia, sorrindo" },
              { src: "/images/imagen_2.png", alt: "Equipa de estudantes a desenvolver projeto com hardware" },
              { src: "/images/foto_6.png",   alt: "Estudantes a trabalhar com eletrónica e programação" },
              { src: "/images/foto_8.png",   alt: "Grupo a colaborar em projeto de inovação educativa" },
              { src: "/images/foto_9.png",   alt: "Estudantes a trabalhar juntos num laptop" },
              { src: "/images/imagen_1.png", alt: "Aprendizagem colaborativa apoiada por tecnologia" },
            ].map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="overflow-hidden rounded-[1.5rem]"
              >
                {/* aspect-[2/3] = slot vertical — formato natural de estas fotos */}
                <div className="relative aspect-[2/3] w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-center text-sm text-[#58736b]"
          >
            Escolas, laboratórios, municípios e organizações que já estão a transformar a educação.
          </motion.p>
        </div>
      </section>

      {/* ─── O DESAFIO ───────────────────────────────────────────────────────── */}
      <section id="desafio" className="px-6 py-24 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
                O desafio
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Durante anos investiu-se em tecnologia. Mas a verdadeira pergunta continua em aberto.
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="space-y-6 text-lg leading-8 text-[#41514c]">
              <p>
                Como transformar esses recursos em melhores aprendizagens, professores mais preparados,
                estudantes mais autónomos e comunidades mais competitivas?
              </p>
              <p>
                A inteligência artificial, os dados, os laboratórios STEAM e as metodologias ativas
                permitem redesenhar a educação. Não para substituir o humano, mas para libertar o seu
                potencial: pensamento crítico, criatividade, colaboração, cidadania e capacidade de
                resolver problemas reais.
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
                text: "Equipamentos isolados raramente mudam resultados. Precisam de estratégia, formação e uso pedagógico para gerar impacto real.",
              },
              {
                icon: UsersRound,
                title: "Professores precisam de tempo e apoio",
                text: "A mudança educativa acontece quando a tecnologia simplifica, apoia e fortalece o trabalho docente, não quando o complica.",
              },
              {
                icon: Map,
                title: "A escola também transforma território",
                text: "Municípios podem converter escolas, centros e laboratórios em motores de competências locais, emprego e coesão social.",
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

      {/* ─── A TRANSFORMAÇÃO ─────────────────────────────────────────────────── */}
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
            <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]">
              A transformação
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Da estratégia à sala de aula. Da sala de aula ao território.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-white/70">
              A transformação educativa não acontece quando se instala tecnologia. Acontece quando uma
              instituição alinha visão, políticas, formação, conteúdos, plataformas, equipamentos, gestão
              e evidências de impacto.
            </motion.p>
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
                  <p className="mt-4 text-sm leading-7 text-white/70">{service.text}</p>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Banner panorâmico com foto real */}
          <motion.div
            variants={fadeUp}
            className="mt-14 overflow-hidden rounded-[2rem]"
          >
            <div className="relative h-72 w-full md:h-[400px]">
              <Image
                src="/images/nueva_educacion_1.png"
                alt="Estudantes a trabalhar em laboratório de design e prototipagem — aprendizagem ativa"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#17202a]/80 via-[#17202a]/40 to-transparent" />
              {/* Label de experiência — enquadramento essencial */}
              <div className="absolute left-8 top-8 md:left-12 md:top-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                  A experiência que trazemos
                </p>
              </div>
              {/* Stats overlay */}
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 md:gap-12">
                  {[
                    {
                      num: "+20",
                      label: "Empresas EdTech do ecosistema português",
                      sub: "Conhecidas em detalhe — consórcio E-xample",
                    },
                    {
                      num: "e.Escola",
                      label: "Programa nacional de inclusão digital",
                      sub: "Participação direta na governação",
                    },
                    {
                      num: "PT · ES · EU · LATAM",
                      label: "Regiões onde temos experiência",
                      sub: "Rede construída ao longo de anos",
                    },
                  ].map(({ num, label, sub }) => (
                    <div key={num}>
                      <p className="text-2xl font-black text-[#8ce2cc] md:text-4xl">{num}</p>
                      <p className="mt-1 text-sm font-black text-white md:text-base">{label}</p>
                      <p className="mt-0.5 text-xs text-white/50">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PARA QUEM (MUNICÍPIOS) ──────────────────────────────────────────── */}
      <section id="municipios" className="px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
              Para quem trabalhamos
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
              Soluções para instituições que querem liderar a mudança.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-7 text-lg leading-8 text-[#41514c]">
              O nosso cliente ideal é um município, agrupamento ou governo que quer modernizar
              a educação sem cair na armadilha de comprar tecnologia sem estratégia.
            </motion.p>

            {/* Mini foto dentro desta secção */}
            <motion.div variants={fadeUp} className="mt-8 overflow-hidden rounded-[1.5rem]">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/nueva_educacion_3.png"
                  alt="Professora a orientar estudantes em laboratório de design e tecnologia"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
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
                  <p className="mt-4 leading-7 text-[#41514c]">{audience.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── IA NA EDUCAÇÃO ──────────────────────────────────────────────────── */}
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
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#d9f8ef]">IA humanista</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                A inteligência artificial deve potenciar as pessoas, não substituí-las.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/80">
              <p>
                A Educanology ajuda instituições a integrar IA com critérios de ética, privacidade,
                segurança, utilidade pedagógica e impacto humano.
              </p>
              <p>
                O objetivo não é automatizar a educação. É libertar tempo, personalizar percursos,
                fortalecer professores e desenvolver as capacidades que tornam os seres humanos
                insubstituíveis.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Ética",
                text: "IA com supervisão humana, transparência, privacidade e segurança como base.",
              },
              {
                icon: GraduationCap,
                title: "Professores",
                text: "Preparação de aulas, avaliação formativa, feedback e redução de carga administrativa.",
              },
              {
                icon: BookOpenCheck,
                title: "Estudantes",
                text: "Percursos personalizados, tutores inteligentes e pensamento crítico como competência.",
              },
              {
                icon: Layers3,
                title: "Gestores",
                text: "Análise de dados, risco de abandono escolar, planeamento e evidências de impacto.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/15 bg-white/10 p-6">
                <Icon className="h-6 w-6 text-[#d9f8ef]" />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-white/75">{text}</p>
              </div>
            ))}
          </div>

          {/* Mensaje fuerte */}
          <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-6">
            <p className="text-lg font-bold italic text-white/90">
              "A IA deve entrar na educação como cultura, não como moda. Sem formação, governança e projeto
              pedagógico, a IA aumenta o ruído. Com método, aumenta a capacidade humana."
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── MÉTODO (5 fases) ────────────────────────────────────────────────── */}
      <section id="metodo" className="px-6 pb-24 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">Como trabalhamos</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Um método claro para passar da intenção à implementação.
            </h2>
          </motion.div>

          {/* 5 fases en grid responsive */}
          <div className="mt-14 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {method.map((item) => (
              <motion.div
                variants={fadeUp}
                key={item.step}
                className="relative rounded-[1.75rem] border border-[#17202a]/10 bg-white/75 p-7 shadow-sm backdrop-blur"
              >
                <p className="text-sm font-black text-[#2db795]">{item.step}</p>
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-[#41514c]">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Banner panorâmico com foto real */}
          <motion.div
            variants={fadeUp}
            className="mt-10 overflow-hidden rounded-[2rem]"
          >
            <div className="relative h-64 w-full md:h-80">
              <Image
                src="/images/nueva_educacion_2.png"
                alt="Professor a orientar grupo de estudantes com projeto de robótica e programação"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17202a]/80 via-[#17202a]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-8 md:flex-row md:items-end md:justify-between">
                <p className="text-xl font-black text-white md:text-2xl max-w-lg">
                  "Da estratégia à sala de aula —{" "}
                  <span className="text-[#8ce2cc]">com acompanhamento em cada fase.</span>"
                </p>
                <a
                  href="mailto:hello@educanology.eu?subject=Pedido%20de%20reunião%20Educanology"
                  className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3 font-bold text-[#17202a] transition hover:bg-[#8ce2cc]"
                >
                  Iniciar um projeto
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FINANCIAMENTO (nova secção) ─────────────────────────────────────── */}
      <section id="financiamento" className="bg-[#17202a] px-6 py-24 text-white md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-7xl"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]">
                Financiamento europeu
              </motion.p>
              <motion.h2 variants={fadeUp} className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Boas ideias educativas precisam de estratégia, financiamento e execução.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-white/70">
                Apoiamos municípios, escolas, fundações e governos no desenho de projetos
                financiáveis: fundos europeus, consórcios, narrativas de impacto, indicadores,
                orçamento e implementação.
              </motion.p>
            </div>

            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: FileSearch,
                  title: "Mapeamento",
                  text: "Identificamos convocatórias compatíveis com educação, IA, competências digitais e coesão territorial.",
                },
                {
                  icon: Lightbulb,
                  title: "Desenho de projeto",
                  text: "Convertemos uma necessidade institucional numa proposta coerente, avaliável e financiável.",
                },
                {
                  icon: Globe2,
                  title: "Consórcios",
                  text: "Articulamos parceiros educativos, tecnológicos, municipais e de impacto a nível europeu.",
                },
                {
                  icon: TrendingUp,
                  title: "Implementação",
                  text: "Acompanhamos a execução, reporting, indicadores, avaliação e melhoria contínua.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition hover:bg-white/[0.1]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8ce2cc] text-[#17202a]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-black">{title}</h3>
                  <p className="mt-3 leading-6 text-white/65">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA de financiamento */}
          <motion.div variants={fadeUp} className="mt-12 flex justify-center">
            <a
              href="mailto:hello@educanology.eu?subject=Projetos%20financiáveis%20Educanology"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition hover:bg-white/20"
            >
              <Euro className="h-5 w-5 text-[#8ce2cc]" />
              Avaliar oportunidades de financiamento
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── EVIDÊNCIA E AUTORIDADE ──────────────────────────────────────────── */}
      <section className="bg-[#edf7f3] px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
              Evidência e autoridade
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
              Experiência que liga política pública, tecnologia e aprendizagem.
            </h2>

            {/* Foto de credibilidade */}
            <div className="mt-8 overflow-hidden rounded-[1.5rem]">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/nueva_educacion_6.png"
                  alt="Equipa a trabalhar em makerspace educativo com tecnologia avançada"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
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

      {/* ─── OS ESPECIALISTAS ────────────────────────────────────────────────── */}
      <section id="especialistas" className="px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#17202a]/10 bg-white/80 p-8 shadow-xl shadow-slate-900/5 backdrop-blur md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
                Os especialistas
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Experiência em política pública, educação, tecnologia e transformação institucional.
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
            {/* Daniel Adrião — bio completa do guion */}
            <div className="rounded-3xl bg-[#f7f3ee] p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6f3e5c] text-xl font-black text-white">
                  DA
                </div>
                <div>
                  <h3 className="text-2xl font-black">Daniel Adrião</h3>
                  <p className="text-sm text-[#58736b]">Fundador · Política Pública & EdTech</p>
                </div>
              </div>
              <p className="mt-5 leading-7 text-[#41514c]">
                Consultor de políticas públicas e investigador doutoral em Ciência Política no ISCTE —
                Instituto Universitário de Lisboa. Combina experiência em governação pública, comunicação
                política e programas de inclusão digital. Participou na governação do programa e.Escola,
                uma das maiores iniciativas portuguesas de inclusão digital educativa, e liderou estratégias
                internacionais para o consórcio E-xample, reunindo mais de vinte empresas portuguesas de
                tecnologia educativa e inovação.
              </p>
            </div>

            {/* Juan José de la Mora — bio completa do guion */}
            <div className="rounded-3xl bg-[#f7f3ee] p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2db795] text-xl font-black text-white">
                  JM
                </div>
                <div>
                  <h3 className="text-2xl font-black">Juan José de la Mora</h3>
                  <p className="text-sm text-[#58736b]">Consultor Internacional · IA & Transformação Digital</p>
                </div>
              </div>
              <p className="mt-5 leading-7 text-[#41514c]">
                Consultor internacional em tecnologia educativa, inteligência artificial aplicada,
                transformação digital, desenvolvimento de negócio e projetos financiáveis. A sua
                experiência combina estratégia comercial, inovação territorial, integração de soluções
                tecnológicas e formação, atuando como ponte entre políticas educativas, tecnologia,
                financiamento e implementação operacional entre Espanha, Portugal e América Latina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSIGHTS ────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-[#17202a] p-8 text-white md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]">Insights</p>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">
                  Conteúdo pensado para decisores públicos.
                </h2>
                <p className="mt-6 leading-8 text-white/70">
                  Artigos, guias, perguntas frequentes e páginas de autoridade sobre IA, educação,
                  municípios, financiamento europeu e transformação digital educativa.
                </p>
              </div>

              <div className="grid gap-4">
                {insights.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5"
                  >
                    <div>
                      <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8ce2cc]">
                        {item.tag}
                      </p>
                      <p className="font-bold leading-6">{item.title}</p>
                    </div>
                    <Rocket className="h-5 w-5 shrink-0 text-[#8ce2cc]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────────── */}
      <SiteFooter />

      {/* ─── CTA FLOTANTE ────────────────────────────────────────────────────── */}
      <FloatingConversion />
    </main>
  );
}
