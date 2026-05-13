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
              <h2 className="text-xl font-black text-[#17202a]">1. O que são cookies?</h2>
              <p className="mt-3">
                Cookies são pequenos ficheiros armazenados no dispositivo do utilizador quando visita
                um website. Podem permitir o funcionamento técnico do site, recordar preferências,
                medir audiência ou apoiar funcionalidades de terceiros.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">2. Que tipos de cookies usamos?</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong>Cookies necessários:</strong> essenciais para o funcionamento básico do website.
                </li>
                <li>
                  <strong>Cookies analíticos:</strong> ajudam a compreender a utilização do website e a
                  melhorar conteúdos e desempenho. Estes cookies apenas deverão ser ativados mediante
                  consentimento prévio do utilizador.
                </li>
                <li>
                  <strong>Cookies funcionais:</strong> permitem recordar preferências ou ativar
                  funcionalidades adicionais.
                </li>
                <li>
                  <strong>Cookies de marketing ou terceiros:</strong> podem ser usados para medição,
                  campanhas, conteúdos incorporados ou plataformas externas. Estes cookies apenas
                  deverão ser ativados quando exista consentimento ou outro fundamento legal aplicável.
                </li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">3. Consentimento</h2>
              <p className="mt-3">
                Em Portugal, a utilização de cookies não necessários deve basear-se no consentimento
                prévio, livre, específico, informado e inequívoco do utilizador. Os cookies necessários
                ao funcionamento técnico do website podem ser utilizados sem consentimento prévio.
              </p>
              <p className="mt-3">
                A recusa de cookies não essenciais não impede a navegação no website, embora algumas
                funcionalidades, medições estatísticas ou conteúdos de terceiros possam ficar limitados.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">4. Gestão de preferências</h2>
              <p className="mt-3">
                O utilizador pode aceitar, rejeitar ou configurar cookies não essenciais através do
                painel de consentimento apresentado no website. Também pode alterar preferências no
                navegador, bloqueando ou eliminando cookies.
              </p>
              <p className="mt-3">
                A qualquer momento, o utilizador poderá alterar ou retirar o consentimento anteriormente
                prestado, quando essa funcionalidade estiver disponível no painel de consentimento do website.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">5. Cookies concretos utilizados</h2>
              <p className="mt-3">
                O website pode utilizar cookies necessários ao seu funcionamento técnico e, mediante
                consentimento prévio do utilizador, cookies analíticos associados ao Google Analytics 4
                para medição estatística de utilização do website.
              </p>
  
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[#17202a]/10">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-[#edf7f3] text-[#17202a]">
                    <tr>
                      <th className="p-4">Nome</th>
                      <th className="p-4">Fornecedor</th>
                      <th className="p-4">Finalidade</th>
                      <th className="p-4">Duração</th>
                      <th className="p-4">Categoria</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#17202a]/10">
                    <tr>
                      <td className="p-4">cookie-consent</td>
                      <td className="p-4">Educanology</td>
                      <td className="p-4">Guardar preferências de consentimento do utilizador</td>
                      <td className="p-4">12 meses</td>
                      <td className="p-4">Necessário</td>
                    </tr>
                    <tr>
                      <td className="p-4">_ga</td>
                      <td className="p-4">Google Analytics 4</td>
                      <td className="p-4">Distinguir utilizadores para medição estatística de utilização do website</td>
                      <td className="p-4">Até 2 anos</td>
                      <td className="p-4">Analítico</td>
                    </tr>
                    <tr>
                      <td className="p-4">_ga_&#123;container-id&#125;</td>
                      <td className="p-4">Google Analytics 4</td>
                      <td className="p-4">Manter o estado da sessão para medição estatística de utilização do website</td>
                      <td className="p-4">Até 2 anos</td>
                      <td className="p-4">Analítico</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <p className="mt-3 text-sm text-[#58736b]">
                Os cookies analíticos apenas deverão ser carregados após o consentimento do utilizador.
                Caso o utilizador rejeite cookies não essenciais, estes cookies não deverão ser ativados.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">6. Contacto</h2>
              <p className="mt-3">
                Para questões sobre cookies ou privacidade, contacte{" "}
                <a href="mailto:hello@educanology.eu" className="font-bold text-[#6f3e5c]">
                  hello@educanology.eu
                </a>.
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