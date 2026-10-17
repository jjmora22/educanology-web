export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-16 text-[#17202a] md:px-10 lg:px-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] bg-white/80 p-8 shadow-xl md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
          Informação legal
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">
          Aviso legal
        </h1>

        <div className="mt-8 space-y-6 leading-8 text-[#41514c]">
          <section>
            <h2 className="text-xl font-black text-[#17202a]">
              1. Identificação do titular do website
            </h2>
            <p className="mt-3">
              Este website é propriedade de <strong>Educanology Unipessoal Lda.</strong>,
              sociedade comercial registada em Portugal.
            </p>
            <p className="mt-3">
              <strong>NIPC:</strong> 509746276
              <br />
              <strong>Sede:</strong> Largo da Graça, 82, 3.º Direito, 1170-165 Lisboa, Portugal
              <br />
              <strong>Email de contacto:</strong>{" "}
              <a href="mailto:hello@educanology.eu" className="font-bold text-[#6f3e5c]">
                hello@educanology.eu
              </a>
              <br />
              <strong>Website:</strong>{" "}
              <a href="https://educanology.eu" className="font-bold text-[#6f3e5c]">
                educanology.eu
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">2. Objeto e atividade</h2>
            <p className="mt-3">
              O website apresenta a atividade e os serviços de consultoria educativa e
              tecnológica da Educanology, bem como conteúdos informativos e meios de contacto
              destinados a organizações e profissionais interessados. A informação publicada
              não constitui uma proposta contratual nem garante a disponibilidade de qualquer
              serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">3. Utilização do website</h2>
            <p className="mt-3">
              O utilizador deve utilizar o website de forma lícita, correta e respeitosa, sem
              perturbar a sua segurança ou funcionamento, aceder indevidamente a sistemas ou
              dados, transmitir código malicioso ou lesar direitos da Educanology ou de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">4. Propriedade intelectual</h2>
            <p className="mt-3">
              Salvo indicação em contrário, os textos, estrutura, design, elementos gráficos,
              marcas, logótipos, imagens e restantes conteúdos pertencem à Educanology ou são
              utilizados com autorização ou licença adequada. A sua utilização não autorizada
              é proibida, sem prejuízo dos usos permitidos pela lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">5. Conteúdos e responsabilidade</h2>
            <p className="mt-3">
              A Educanology procura manter a informação correta e atualizada, mas não assegura
              disponibilidade ininterrupta nem ausência absoluta de erros. Os conteúdos e as
              respostas do assistente de inteligência artificial têm caráter geral e orientativo;
              não substituem aconselhamento profissional adaptado ao caso concreto. Nenhuma
              disposição deste aviso exclui responsabilidade que não possa ser excluída por lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">6. Ligações externas</h2>
            <p className="mt-3">
              O website pode incluir ligações para páginas de terceiros. A Educanology não
              controla os respetivos conteúdos, disponibilidade ou práticas de privacidade. A
              inclusão de uma ligação não implica aprovação ou responsabilidade pelo serviço
              externo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">7. Privacidade e condições</h2>
            <p className="mt-3">
              O tratamento de dados pessoais, as tecnologias analíticas e as condições de uso
              são descritos na Política de Privacidade, na Política de Cookies e nos Termos de
              Utilização disponíveis neste website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">8. Lei aplicável</h2>
            <p className="mt-3">
              Este aviso rege-se pela legislação portuguesa e da União Europeia aplicável,
              designadamente o Decreto-Lei n.º 7/2004, na sua redação em vigor, sem prejuízo das
              normas imperativas aplicáveis ao utilizador.
            </p>
          </section>

          <p className="pt-4 text-sm text-[#58736b]">
            Última revisão técnica e documental: 17 de outubro de 2026.
          </p>
        </div>
      </article>
    </main>
  );
}
