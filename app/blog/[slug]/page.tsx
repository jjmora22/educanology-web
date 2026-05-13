import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import FloatingConversion from "@/components/FloatingConversion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado | Educanology",
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: post.coverImage,
          alt: post.coverAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#17202a]">
      <article className="relative isolate px-6 py-8 md:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(45,183,149,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(111,62,92,0.18),_transparent_34%),linear-gradient(180deg,_#fffaf3_0%,_#f7f3ee_56%,_#edf7f3_100%)]" />
        <div className="learning-grid absolute inset-0 -z-10 opacity-[0.28]" />

        <SiteHeader />

        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[#17202a]/10 bg-white/70 px-4 py-2 text-sm font-black text-[#6f3e5c] shadow-sm transition hover:text-[#2db795]"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog
          </Link>

          <header className="mt-12 rounded-[2rem] border border-[#17202a]/10 bg-white/80 p-8 shadow-xl shadow-slate-900/5 md:p-12">
            <Link
              href={`/blog/categoria/${post.categorySlug}`}
              className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c] transition hover:text-[#2db795]"
            >
              {post.category}
            </Link>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#41514c]">
              {post.summary}
            </p>
            <p className="mt-6 text-sm font-semibold text-[#58736b]">
              {new Date(post.date).toLocaleDateString("pt-PT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {" · "}
              {post.readingTime}
            </p>
          </header>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem] border border-[#17202a]/10 shadow-xl shadow-slate-900/5">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#17202a]/10 bg-white/80 p-8 shadow-xl shadow-slate-900/5 md:p-12">
            <div className="space-y-10" itemScope itemType="https://schema.org/Article">
              <meta itemProp="headline" content={post.title} />
              <meta itemProp="description" content={post.summary} />
              <meta itemProp="datePublished" content={post.date} />
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-black tracking-[-0.03em] text-[#17202a]">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-lg leading-8 text-[#41514c]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {post.faq && post.faq.length > 0 && (
            <section className="mt-8 rounded-[2rem] border border-[#17202a]/10 bg-white/80 p-8 shadow-xl shadow-slate-900/5 md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
                Perguntas frequentes
              </p>
              <div className="mt-6 space-y-5">
                {post.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-3xl bg-[#f7f3ee] p-6"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <h2
                      className="text-xl font-black tracking-[-0.02em]"
                      itemProp="name"
                    >
                      {item.question}
                    </h2>
                    <div
                      className="mt-3 leading-7 text-[#41514c]"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p itemProp="text">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8 rounded-[2rem] bg-[#17202a] p-8 text-white shadow-xl shadow-slate-900/10 md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#8ce2cc]">
              Trabalhar com a Educanology
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Transformar estratégia educativa em projetos concretos.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/75">
              Apoiamos municípios, escolas, agrupamentos, fundações e
              organizações no desenho, financiamento, implementação e avaliação
              de projetos de educação, tecnologia e inteligência artificial
              responsável.
            </p>
            <a
              href="mailto:hello@educanology.eu?subject=Contacto%20sobre%20projeto%20educativo"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#8ce2cc] px-5 py-3 text-sm font-black text-[#17202a] transition hover:bg-white"
            >
              Contactar Educanology
              <ArrowRight className="h-4 w-4" />
            </a>
          </section>
        </div>
      </article>

      <SiteFooter />
      <FloatingConversion />
    </main>
  );
}
