# Formulário de reuniões — ativação controlada

Estado em 17 de outubro de 2026: implementação concluída, mas envio real deliberadamente inativo. Mesmo com as credenciais configuradas, o endpoint não contacta a Scaleway enquanto `MEETING_REQUEST_ENABLED` não tiver exatamente o valor `true` no ambiente do servidor.

## Fluxo técnico

1. O visitante abre o modal através de qualquer CTA comercial.
2. O navegador envia apenas nome, email, organização e cargo opcionais, mensagem e confirmação de leitura da política para `POST /api/meeting-request`.
3. O servidor valida origem, tipo e tamanho do pedido, campos, honeypot e limite de frequência.
4. O servidor cria uma mensagem com a data de receção e envia-a para uma caixa interna através da API de Scaleway Transactional Email.
5. O endereço do visitante é usado apenas no cabeçalho `Reply-To`. Não é usado como remetente.

Não existe chamada a Scaleway quando o interruptor está ausente/desativado ou quando a configuração está incompleta. As respostas de erro não expõem credenciais, detalhes do fornecedor nem dados pessoais, e a aplicação não regista o conteúdo do formulário.

## Variáveis de ambiente

Configurar exclusivamente no ambiente seguro do servidor/Vercel; nunca prefixar com `NEXT_PUBLIC_` nem colocar valores reais em `.env.example`:

| Variável | Conteúdo |
|---|---|
| `MEETING_REQUEST_ENABLED` | Interruptor de ativação. Manter ausente ou `false` até existir autorização expressa; apenas `true` permite envios |
| `MAIL_API_KEY` | Secret key Scaleway limitada ao projeto e às permissões necessárias para Transactional Email |
| `MAIL_PROJECT_ID` | UUID do projeto Scaleway que contém o domínio validado |
| `MAIL_REGION` | `fr-par` |
| `MEETING_FROM_EMAIL` | Remetente num domínio validado, por exemplo `reunioes@educanology.eu` |
| `MEETING_TO_EMAIL` | Caixa interna que recebe os pedidos |

## Ativação de Scaleway

- Criar ou selecionar um projeto empresarial com MFA e acesso mínimo necessário.
- Rever e aceitar conscientemente os [contratos e o DPA de Scaleway](https://www.scaleway.com/en/contracts/); registar a versão aplicável.
- Confirmar que o tratamento de Transactional Email permanece na UE e rever a lista de subcontratantes aplicável à conta.
- Registar o domínio de envio e concluir as verificações SPF, DKIM, MX e DMARC indicadas no [guia oficial](https://www.scaleway.com/en/docs/transactional-email/quickstart/).
- Criar uma chave dedicada ao serviço, limitar permissões e estabelecer rotação e revogação.
- Confirmar a caixa de destino e o processo interno de acesso, resposta e eliminação dos pedidos.
- Rever preços e limites vigentes antes de ativar. A programação local não cria conta, subscrição nem custo.

A integração usa o endpoint e o formato documentados na [API oficial de envio](https://www.scaleway.com/en/developers/api/transactional-email/emails).

## Proteção global contra abuso

O endpoint inclui honeypot, limite de 16 KiB, validação de origem, campos e email, timeout de dez segundos e um limite em memória de cinco pedidos por endereço de origem em dez minutos. Este último é apenas uma defesa complementar: em funções serverless, diferentes instâncias não partilham memória.

A regra WAF não está ativa nem pode ser declarada como rate limiting em `vercel.json`; deve ser criada manualmente no painel de cada projeto Vercel que sirva um domínio público da Educanology:

1. Abrir **Project → Firewall → Configure → New Rule**.
2. Nome: `meeting-request-rate-limit`.
3. Condições, todas obrigatórias: **Request Path equals `/api/meeting-request`** e **Request Method equals `POST`**.
4. Ação: **Rate Limit**; estratégia **Fixed Window**; chave **IP**.
5. Limite: **5 pedidos por 10 minutos**, com ação posterior **429**.
6. Na primeira aplicação, usar a ação posterior **Log**, observar pelo menos uma janela completa de 10 minutos e confirmar que não existem falsos positivos. Depois mudar para **429** e publicar a configuração da Firewall.
7. Ativar alertas de consumo e rever periodicamente a observabilidade da regra.

Segundo a [documentação de Vercel consultada em 17 de outubro de 2026](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting), o rate limiting está disponível em todos os planos. O plano Hobby admite uma regra de rate limiting por projeto e inclui 1.000.000 de pedidos permitidos; o plano Pro é faturado por utilização. O preço de referência publicado para infraestrutura gerida é de **US$ 0,50 por cada 1.000.000 de pedidos permitidos**, calculado por região. Os contadores também são regionais, pelo que tráfego distribuído por várias regiões pode superar o limiar agregado. O preço e o plano aplicável devem ser confirmados no diálogo de faturação antes de publicar a regra.

## Validação prévia à produção

- [ ] Dados da conservatória e contacto de privacidade confirmados.
- [ ] DPA, localização, subcontratantes e retenção Scaleway aprovados.
- [ ] Domínio e registos SPF/DKIM/DMARC/MX validados.
- [ ] Credenciais dedicadas configuradas apenas no ambiente servidor.
- [ ] `MEETING_REQUEST_ENABLED` ausente ou `false` até autorização expressa para o teste real.
- [ ] WAF configurada para o endpoint e alertas de consumo ativos.
- [ ] Caixa de destino, responsáveis, retenção e resposta aos direitos definidos.
- [ ] Teste de ponta a ponta apenas com dados fictícios e autorização específica.
- [ ] Após o teste autorizado, decidir expressamente se o interruptor permanece ativo em produção.
- [ ] Política de Privacidade novamente verificada após a configuração real.
