export default function PoliticaCookiesPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-16 text-[#17202a] md:px-10 lg:px-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] bg-white/80 p-8 shadow-xl md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
          Cookies e tecnologias similares
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">
          Política de cookies
        </h1>

        <div className="mt-8 space-y-6 leading-8 text-[#41514c]">
          <section>
            <h2 className="text-xl font-black text-[#17202a]">
              1. O que são cookies e tecnologias similares?
            </h2>
            <p className="mt-3">
              Cookies são pequenos ficheiros armazenados no dispositivo durante a navegação. O
              armazenamento local do navegador permite guardar informação semelhante sem criar um
              cookie. Estas tecnologias podem ser estritamente necessárias ou depender do
              consentimento, consoante a finalidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">2. Tecnologias utilizadas</h2>
            <p className="mt-3">
              A configuração técnica auditada utiliza uma preferência local necessária e duas
              ferramentas analíticas, ambas bloqueadas até o utilizador consentir. Não foram
              identificadas categorias funcionais ou de marketing independentes.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#17202a]/10">
              <table className="w-full min-w-[900px] text-left text-sm leading-6">
                <thead className="bg-[#edf7f3] text-[#17202a]">
                  <tr>
                    <th className="p-4">Tecnologia</th>
                    <th className="p-4">Fornecedor</th>
                    <th className="p-4">Finalidade e dados</th>
                    <th className="p-4">Duração</th>
                    <th className="p-4">Categoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17202a]/10 align-top">
                  <tr>
                    <td className="p-4 font-mono text-xs">educanology-cookie-consent</td>
                    <td className="p-4">Educanology</td>
                    <td className="p-4">
                      Registo da escolha de consentimento no armazenamento local do navegador. Não
                      é transmitido a um fornecedor analítico.
                    </td>
                    <td className="p-4">
                      Até o utilizador alterar a escolha ou eliminar os dados do navegador; o código
                      atual não define caducidade automática.
                    </td>
                    <td className="p-4">Estritamente necessária</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs">_ga</td>
                    <td className="p-4">Google Analytics 4</td>
                    <td className="p-4">
                      Distinguir visitantes para produzir estatísticas de utilização do website.
                    </td>
                    <td className="p-4">Até 2 anos, segundo a documentação da Google.</td>
                    <td className="p-4">Analítica — consentimento prévio</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs">_ga_&#123;container-id&#125;</td>
                    <td className="p-4">Google Analytics 4</td>
                    <td className="p-4">
                      Manter o estado da sessão e medir páginas e eventos de navegação.
                    </td>
                    <td className="p-4">Até 2 anos, segundo a documentação da Google.</td>
                    <td className="p-4">Analítica — consentimento prévio</td>
                  </tr>
                  <tr>
                    <td className="p-4">Vercel Web Analytics</td>
                    <td className="p-4">Vercel</td>
                    <td className="p-4">
                      Métricas agregadas de página, origem, país aproximado, dispositivo, navegador
                      e sistema operativo. A documentação da Vercel indica que não utiliza cookies
                      de terceiros e elimina o identificador temporário usado para deduplicação após
                      24 horas.
                    </td>
                    <td className="p-4">Sem cookie analítico no dispositivo.</td>
                    <td className="p-4">Analítica — consentimento prévio</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">3. Consentimento</h2>
            <p className="mt-3">
              Google Analytics e Vercel Web Analytics não são carregados antes de uma escolha
              afirmativa. Rejeitar as tecnologias analíticas não limita o acesso ao conteúdo nem ao
              formulário de reunião. Os botões de aceitar e rejeitar são apresentados com destaque
              comparável, e o painel permite uma escolha específica.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">4. Alterar ou retirar a escolha</h2>
            <p className="mt-3">
              O botão permanente «Cookies», no canto inferior esquerdo, permite alterar ou retirar o
              consentimento a qualquer momento. A retirada impede novos eventos analíticos através da
              aplicação. Os cookies Google já existentes podem permanecer até caducarem ou serem
              eliminados nas definições do navegador; ficam desativadas novas medições enquanto não
              existir novo consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">5. Configuração do navegador</h2>
            <p className="mt-3">
              O utilizador também pode consultar, bloquear ou eliminar cookies e armazenamento local
              nas definições do navegador. A eliminação de todos os dados locais fará com que o website
              volte a pedir uma escolha.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">6. Contacto</h2>
            <p className="mt-3">
              Para questões sobre estas tecnologias ou privacidade, contacte{" "}
              <a href="mailto:hello@educanology.eu" className="font-bold text-[#6f3e5c]">
                hello@educanology.eu
              </a>.
            </p>
          </section>

          <p className="pt-4 text-sm text-[#58736b]">
            Última auditoria técnica e documental: 17 de outubro de 2026.
          </p>
        </div>
      </article>
    </main>
  );
}
