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
              <h2 className="text-xl font-black text-[#17202a]">1. Identificação do titular do website</h2>
              <p className="mt-3">
                Este website é propriedade de <strong>Educanology Unipessoal Lda.</strong>, sociedade comercial
                registada em Portugal.
              </p>
              <p className="mt-3">
                <strong>NIPC:</strong> 509746276
                <br />
                <strong>Sede:</strong> Largo da Graça, 82, 3. Direito - 1170-165 Lisboa
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
              <h2 className="text-xl font-black text-[#17202a]">2. Objeto do website</h2>
              <p className="mt-3">
                O website da Educanology apresenta serviços de consultoria educativa, transformação
                digital, inteligência artificial aplicada à educação, políticas públicas, formação,
                desenho de projetos financiáveis e apoio a instituições educativas, municípios,
                governos, fundações e organizações.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">3. Utilização do website</h2>
              <p className="mt-3">
                O utilizador compromete-se a utilizar este website de forma lícita, correta e respeitosa,
                abstendo-se de qualquer utilização que possa prejudicar a Educanology, terceiros ou o
                funcionamento normal do website.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">4. Propriedade intelectual</h2>
              <p className="mt-3">
                Os textos, estrutura, design, elementos gráficos, marcas, logótipos, imagens e demais
                conteúdos deste website pertencem à Educanology ou são utilizados com autorização,
                licença ou base legal adequada. A sua reprodução, distribuição ou transformação sem
                autorização prévia é proibida, salvo nos casos legalmente permitidos.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">5. Responsabilidade</h2>
              <p className="mt-3">
                A Educanology procura manter a informação atualizada e correta, mas não garante a
                inexistência de erros, interrupções ou omissões. Os conteúdos disponibilizados têm
                caráter informativo e não constituem aconselhamento jurídico, financeiro ou técnico
                específico sem análise prévia do caso concreto.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">6. Ligações externas</h2>
              <p className="mt-3">
                Este website pode conter ligações para páginas externas. A Educanology não se
                responsabiliza pelos conteúdos, políticas ou práticas de privacidade de websites de
                terceiros.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">7. Lei aplicável</h2>
              <p className="mt-3">
                O presente aviso legal rege-se pela legislação portuguesa aplicável, incluindo o
                Decreto-Lei n.º 7/2004, o Regulamento Geral sobre a Proteção de Dados, a Lei n.º 58/2019
                e demais legislação aplicável.
              </p>
            </section>
  
            <p className="pt-4 text-sm text-[#58736b]">
              Última atualização: maio de 2026.
            </p>
          </div>
        </article>
      </main>
    );
  }