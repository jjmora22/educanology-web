import Link from "next/link";

const navItems = [
  { label: "Desafio", href: "/#desafio" },
  { label: "Transformação", href: "/#transformacao" },
  { label: "Municípios", href: "/#municipios" },
  { label: "IA", href: "/#ia" },
  { label: "Método", href: "/#metodo" },
  { label: "Financiamento", href: "/#financiamento" },
  { label: "Especialistas", href: "/#especialistas" },
  { label: "Blog", href: "/blog" },
];

export default function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6f3e5c] text-xl font-black text-white shadow-lg shadow-[#6f3e5c]/20">
          E
        </div>
        <div>
          <p className="text-xl font-black tracking-tight">Educanology</p>
          <p className="text-xs uppercase tracking-[0.28em] text-[#58736b]">
            Education · AI · Policy
          </p>
        </div>
      </Link>

      <nav className="hidden items-center gap-7 text-sm font-medium text-[#3c4b47] md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link transition-colors hover:text-[#2db795]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
