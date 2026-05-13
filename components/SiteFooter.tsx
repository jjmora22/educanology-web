import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#17202a]/10 px-6 py-10 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-[#41514c] md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-black text-[#17202a]">Educanology</p>
          <p className="mt-1">
            Consultoria educativa · Política pública · IA responsável
          </p>
          <p className="mt-1">Portugal · Espanha · Europa · América Latina</p>

          <nav className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold">
            <a
              href="/aviso-legal"
              className="transition-colors hover:text-[#2db795]"
            >
              Aviso legal
            </a>
            <a
              href="/politica-de-privacidade"
              className="transition-colors hover:text-[#2db795]"
            >
              Política de privacidade
            </a>
            <a
              href="/politica-de-cookies"
              className="transition-colors hover:text-[#2db795]"
            >
              Política de cookies
            </a>
            <a
              href="/termos-de-utilizacao"
              className="transition-colors hover:text-[#2db795]"
            >
              Termos de utilização
            </a>
            <Link
              href="/blog"
              className="transition-colors hover:text-[#2db795]"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="md:text-right">
          <p>© 2026 Educanology Lda. Todos os direitos reservados.</p>
          <p className="mt-1">
            <a
              href="https://educanology.eu"
              className="transition-colors hover:text-[#2db795]"
            >
              educanology.eu
            </a>
            {" · "}
            <a
              href="mailto:hello@educanology.eu"
              className="transition-colors hover:text-[#2db795]"
            >
              hello@educanology.eu
            </a>
          </p>
          <p className="mt-3 max-w-md text-xs text-[#58736b] md:ml-auto">
            Informação legal e políticas de privacidade/cookies disponíveis nos
            links do rodapé.
          </p>
        </div>
      </div>
    </footer>
  );
}
