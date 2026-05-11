export default function TermosUtilizacaoPage() {
    return (
      <main className="min-h-screen bg-[#f7f3ee] px-6 py-16 text-[#17202a] md:px-10 lg:px-16">
        <article className="mx-auto max-w-4xl rounded-[2rem] bg-white/80 p-8 shadow-xl md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#6f3e5c]">
            Condições de utilização
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">
            Termos de utilização
          </h1>
  
          <div className="mt-8 space-y-6 leading-8 text-[#41514c]">
            <section>
              <h2 className="text-xl font-black text-[#17202a]">1. Aceitação dos termos</h2>
              <p className="mt-3">
                Ao aceder e utilizar este website, o utilizador aceita estes termos de utilização. Caso
                não concorde com os mesmos, deverá abster-se de utilizar o website.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">2. Finalidade do website</h2>
              <p className="mt-3">
                Este website tem como finalidade apresentar a Educanology, os seus serviços, áreas de
                atuação, conteúdos informativos e formas de contacto para potenciais clientes,
                parceiros e instituições.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">3. Conteúdos</h2>
              <p className="mt-3">
                Os conteúdos disponibilizados têm caráter informativo e podem ser alterados, atualizados
                ou removidos sem aviso prévio. A informação publicada não substitui aconselhamento
                profissional adaptado a cada caso concreto.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">4. Utilização proibida</h2>
              <p className="mt-3">O utilizador não deve:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Utilizar o website para fins ilícitos ou fraudulentos;</li>
                <li>Tentar aceder indevidamente a sistemas, dados ou áreas restritas;</li>
                <li>Introduzir vírus, malware ou código malicioso;</li>
                <li>Reproduzir conteúdos protegidos sem autorização;</li>
                <li>Prejudicar a segurança, disponibilidade ou desempenho do website.</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">5. Agente educativo e ferramentas digitais</h2>
              <p className="mt-3">
                Caso o website disponibilize um agente educativo, chatbot ou ferramenta baseada em
                inteligência artificial, as respostas fornecidas deverão ser entendidas como apoio
                informativo inicial. A Educanology poderá rever, adaptar ou complementar qualquer
                informação antes da tomada de decisões institucionais, técnicas, financeiras ou jurídicas.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">6. Limitação de responsabilidade</h2>
              <p className="mt-3">
                A Educanology não se responsabiliza por danos resultantes de utilização indevida do
                website, indisponibilidade temporária, erros técnicos, conteúdos de terceiros ou decisões
                tomadas exclusivamente com base em informação geral disponibilizada no website.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">7. Alterações</h2>
              <p className="mt-3">
                A Educanology pode alterar estes termos a qualquer momento. A versão aplicável será a
                publicada neste website em cada momento.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-black text-[#17202a]">8. Lei aplicável</h2>
              <p className="mt-3">
                Estes termos regem-se pela legislação portuguesa aplicável.
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