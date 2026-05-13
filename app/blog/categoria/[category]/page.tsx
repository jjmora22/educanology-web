import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  type BlogCategorySlug,
  blogCategories,
  getCategoryBySlug,
  getPostsByCategorySlug,
} from "@/lib/blog/posts";
import FloatingConversion from "@/components/FloatingConversion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return blogCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Categoria não encontrada | Educanology",
    };
  }

  return {
    title: `${category.title} | Blog Educanology`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategorySlug(category.slug as BlogCategorySlug);

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#17202a]">
      <section className="relative isolate px-6 py-8 md:px-10 lg:px-16">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(45,183,149,0.24),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(111,62,92,0.20),_transparent_34%),linear-gradient(180deg,_#fffaf3_0%,_#f7f3ee_58%,_#edf7f3_100%)]" />
        <div className="learning-grid absolute inset-0 -z-10 opacity-[0.30]" />

        <SiteHeader />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[#17202a]/10 bg-white/70 px-4 py-2 text-sm font-black text-[#6f3e5c] shadow-sm transition hover:text-[#2db795]"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog
          </Link>

          <header className="max-w-4xl pb-12 pt-14 md:pt-20">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
              Canal editorial
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              {category.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#41514c]">
              {category.description}
            </p>
          </header>

          <div className="grid gap-5 pb-20 md:grid-cols-2 lg:grid-cols-3">
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
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6f3e5c]">
                    {post.readingTime}
                  </p>
                  <h2 className="mt-4 text-2xl font-black tracking-[-0.03em]">
                    {post.title}
                  </h2>
                  <p className="mt-4 flex-1 leading-7 text-[#41514c]">
                    {post.summary}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 border-t border-[#17202a]/10 pt-5 text-sm font-black text-[#6f3e5c] transition hover:text-[#2db795]"
                  >
                    Ler artigo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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
