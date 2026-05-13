import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  blogCategories,
  getAllPosts,
  getPostsByCategorySlug,
} from "@/lib/blog/posts";
import FloatingConversion from "@/components/FloatingConversion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "Blog | Educanology",
  description:
    "Artigos da Educanology sobre IA na educação, política municipal, laboratórios STEAM, estratégia educativa e financiamento europeu.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#17202a]">
      <section className="relative isolate px-6 py-8 md:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(45,183,149,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(111,62,92,0.20),_transparent_34%),linear-gradient(180deg,_#fffaf3_0%,_#f7f3ee_58%,_#edf7f3_100%)]" />
        <div className="learning-grid absolute inset-0 -z-10 opacity-[0.30]" />

        <SiteHeader />

        <div className="mx-auto max-w-7xl pb-12 pt-16 md:pt-24">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
            Blog Educanology
          </p>
          <div className="mt-5 max-w-4xl">
            <h1 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Ideias claras para transformar educação, tecnologia e território.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#41514c]">
              Artigos práticos sobre inteligência artificial responsável,
              políticas municipais, laboratórios STEAM, estratégia educativa e
              financiamento para inovação com impacto.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-5">
            {blogCategories.map((category) => {
              const count = getPostsByCategorySlug(category.slug).length;

              return (
                <Link
                  key={category.slug}
                  href={`/blog/categoria/${category.slug}`}
                  className="group rounded-[1.5rem] border border-[#17202a]/10 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#2db795]/40 hover:bg-white"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2db795]">
                    {count} artigo{count === 1 ? "" : "s"}
                  </p>
                  <h2 className="mt-3 text-lg font-black tracking-[-0.02em]">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#41514c]">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#6f3e5c] transition group-hover:text-[#2db795]">
                    Ver canal
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex min-h-[420px] flex-col overflow-hidden rounded-[2rem] border border-[#17202a]/10 bg-white/80 shadow-xl shadow-slate-900/5"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Link
                    href={`/blog/categoria/${post.categorySlug}`}
                    className="text-xs font-bold uppercase tracking-[0.24em] text-[#6f3e5c] transition hover:text-[#2db795]"
                  >
                    {post.category}
                  </Link>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.03em]">
                    {post.title}
                  </h2>
                  <p className="mt-4 flex-1 leading-7 text-[#41514c]">
                    {post.summary}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#17202a]/10 pt-5 text-sm text-[#58736b]">
                    <span>
                      {new Date(post.date).toLocaleDateString("pt-PT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" · "}
                      {post.readingTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 font-black text-[#6f3e5c] transition hover:text-[#2db795]"
                    >
                      Ler
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingConversion />
    </main>
  );
}
