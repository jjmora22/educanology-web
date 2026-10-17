import Link from "next/link";

export default function PoliticaPrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-6 py-16 text-[#17202a] md:px-10 lg:px-16">
      <article className="mx-auto max-w-4xl rounded-[2rem] bg-white/80 p-8 shadow-xl md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
          Proteção de dados
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">
          Política de privacidade
        </h1>

        <div className="mt-8 space-y-6 leading-8 text-[#41514c]">
          <section>
            <h2 className="text-xl font-black text-[#17202a]">
              1. Responsável pelo tratamento
            </h2>
            <p className="mt-3">
              A responsável pelo tratamento é <strong>Educanology Unipessoal Lda.</strong>,
              NIPC 509746276, com sede no Largo da Graça, 82, 3.º Direito, 1170-165
              Lisboa, Portugal. Para questões sobre privacidade ou para exercer direitos,
              contacte{" "}
              <a href="mailto:hello@educanology.eu" className="font-bold text-[#6f3e5c]">
                hello@educanology.eu
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">
              2. Tratamentos, dados e fundamentos jurídicos
            </h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#17202a]/10">
              <table className="w-full min-w-[860px] text-left text-sm leading-6">
                <thead className="bg-[#edf7f3] text-[#17202a]">
                  <tr>
                    <th className="p-4">Tratamento</th>
                    <th className="p-4">Dados e finalidade</th>
                    <th className="p-4">Base jurídica</th>
                    <th className="p-4">Conservação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17202a]/10 align-top">
                  <tr>
                    <td className="p-4 font-bold">Navegação e segurança</td>
                    <td className="p-4">
                      Endereço IP, data, pedido, dispositivo e registos técnicos necessários para
                      disponibilizar, proteger e diagnosticar o website.
                    </td>
                    <td className="p-4">
                      Interesse legítimo na segurança e funcionamento do serviço, sem prejuízo dos
                      direitos do titular.
                    </td>
                    <td className="p-4">
                      Pelo período tecnicamente necessário e segundo os prazos do fornecedor de
                      alojamento, a confirmar contratualmente.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Pedidos de reunião e contacto</td>
                    <td className="p-4">
                      Nome, email, organização e cargo opcionais, mensagem e data de receção, para
                      responder e avaliar uma eventual relação profissional.
                    </td>
                    <td className="p-4">
                      Diligências pré-contratuais a pedido do titular; quando não exista intenção
                      contratual, interesse legítimo em responder ao contacto.
                    </td>
                    <td className="p-4">
                      Até 24 meses após o último contacto relevante, salvo relação contratual,
                      obrigação legal ou necessidade de defesa de direitos.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Assistente de IA</td>
                    <td className="p-4">
                      Conteúdo escrito pelo utilizador e dados técnicos inerentes à ligação, para
                      gerar uma resposta informativa. Não introduza dados sensíveis, confidenciais,
                      de menores ou dados pessoais desnecessários.
                    </td>
                    <td className="p-4">
                      Diligências pré-contratuais solicitadas pelo utilizador ou interesse legítimo
                      em prestar orientação inicial, consoante o teor da interação.
                    </td>
                    <td className="p-4">
                      A aplicação não mantém um histórico persistente; aplicam-se ainda os prazos
                      técnicos do alojamento e do fornecedor do modelo, sujeitos a confirmação.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Medição de audiência</td>
                    <td className="p-4">
                      Identificadores analíticos, páginas visitadas, informação do dispositivo,
                      origem aproximada e eventos de navegação, para produzir estatísticas.
                    </td>
                    <td className="p-4">Consentimento, que pode ser retirado a qualquer momento.</td>
                    <td className="p-4">
                      Segundo a configuração e os prazos dos fornecedores; consulte a{" "}
                      <Link href="/politica-de-cookies" className="font-bold text-[#6f3e5c]">
                        Política de Cookies
                      </Link>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Os dados dos pedidos de reunião não serão utilizados para newsletters, campanhas
              comerciais não solicitadas nem treino de modelos de inteligência artificial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">
              3. Destinatários e prestadores de serviços
            </h2>
            <p className="mt-3">
              Os dados são acessíveis apenas à Educanology e aos prestadores necessários à
              operação do website, sujeitos às condições e configurações aplicáveis:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Vercel:</strong> alojamento, infraestrutura, registos técnicos e Vercel
                Web Analytics, sendo esta última ativada apenas após consentimento;
              </li>
              <li>
                <strong>Google Analytics 4:</strong> medição de audiência, apenas após
                consentimento;
              </li>
              <li>
                <strong>Scaleway Transactional Email:</strong> transmissão do pedido de reunião
                para a caixa de correio indicada pela Educanology, apenas quando o serviço estiver
                configurado e ativado;
              </li>
              <li>
                <strong>DeepSeek:</strong> fornecedor do modelo utilizado diretamente pelo
                assistente virtual para processar o texto introduzido e gerar a resposta.
              </li>
            </ul>
            <p className="mt-3">
              A Educanology não vende dados pessoais. Outros destinatários apenas receberão dados
              quando isso seja necessário para cumprir uma obrigação legal ou defender direitos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">
              4. Transferências internacionais
            </h2>
            <p className="mt-3">
              Alguns prestadores podem tratar dados fora do Espaço Económico Europeu. A Google e a
              Vercel disponibilizam mecanismos contratuais próprios cuja aplicabilidade depende da
              conta e do plano contratados. A documentação pública da DeepSeek indica que os seus
              serviços utilizam servidores na República Popular da China. A base de transferência,
              as cláusulas contratuais, a avaliação de impacto da transferência e os prazos aplicáveis
              ao uso da API pela Educanology devem ser formalmente validados antes da exploração em
              produção com dados pessoais.
            </p>
            <p className="mt-3">
              Segundo a documentação da Scaleway, a infraestrutura técnica do serviço Transactional
              Email selecionado é operada na União Europeia; esta condição e o acordo de tratamento
              de dados devem ser confirmados na conta contratada antes da ativação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">5. Dados obrigatórios</h2>
            <p className="mt-3">
              No formulário de reunião, nome, email, mensagem e confirmação de leitura desta política
              são necessários para receber e tratar o pedido. Organização e cargo são facultativos.
              Sem os dados obrigatórios não é possível responder através deste canal. O envio do
              formulário não confirma uma reunião nem celebra um contrato.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">6. Direitos dos titulares</h2>
            <p className="mt-3">
              Nos termos aplicáveis, o titular pode pedir acesso, retificação, apagamento, limitação,
              portabilidade, opor-se ao tratamento baseado em interesse legítimo e retirar o
              consentimento sem comprometer a licitude do tratamento anterior. Pode exercer estes
              direitos através de{" "}
              <a href="mailto:hello@educanology.eu" className="font-bold text-[#6f3e5c]">
                hello@educanology.eu
              </a>. Poderá ser solicitada informação estritamente necessária para confirmar a
              identidade do requerente.
            </p>
            <p className="mt-3">
              O titular pode ainda apresentar reclamação à Comissão Nacional de Proteção de Dados
              (CNPD), sem prejuízo de outros meios administrativos ou judiciais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">7. Segurança</h2>
            <p className="mt-3">
              São aplicadas medidas proporcionais ao risco, incluindo validação no servidor,
              limitação de tamanho e frequência dos pedidos, controlo de origem, minimização dos
              campos, credenciais apenas no servidor e ausência deliberada de dados pessoais nos
              registos da aplicação. Nenhum sistema é totalmente isento de risco.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#17202a]">8. Alterações</h2>
            <p className="mt-3">
              Esta política será atualizada quando se alterem os tratamentos, fornecedores ou
              requisitos legais. A versão em vigor é a publicada nesta página.
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
