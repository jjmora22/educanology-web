# Formulário de reuniões — ativação controlada

Estado em 17 de outubro de 2026: implementação concluída, mas envio real deliberadamente inativo até serem configuradas as credenciais e concluídas as verificações abaixo.

## Fluxo técnico

1. O visitante abre o modal através de qualquer CTA comercial.
2. O navegador envia apenas nome, email, organização e cargo opcionais, mensagem e confirmação de leitura da política para `POST /api/meeting-request`.
3. O servidor valida origem, tipo e tamanho do pedido, campos, honeypot e limite de frequência.
4. O servidor cria uma mensagem com a data de receção e envia-a para uma caixa interna através da API de Scaleway Transactional Email.
5. O endereço do visitante é usado apenas no cabeçalho `Reply-To`. Não é usado como remetente.

Não existe chamada a Scaleway quando a configuração está incompleta. As respostas de erro não expõem credenciais, detalhes do fornecedor nem dados pessoais, e a aplicação não regista o conteúdo do formulário.

## Variáveis de ambiente

Configurar exclusivamente no ambiente seguro do servidor/Vercel; nunca prefixar com `NEXT_PUBLIC_` nem colocar valores reais em `.env.example`:

| Variável | Conteúdo |
|---|---|
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

## Proteção contra abuso

O endpoint inclui honeypot, limite de 16 KiB, validação de origem, campos e email, timeout de dez segundos e um limite em memória de cinco pedidos por endereço de origem em dez minutos. Este último é apenas uma defesa complementar: em funções serverless, diferentes instâncias não partilham memória.

Antes de ativar, criar no Vercel WAF uma regra de rate limiting específica para `POST /api/meeting-request`, testar o limiar com dados fictícios e configurar alertas de consumo. A [documentação de Vercel](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting) deve ser consultada para limites, disponibilidade e preço atuais. Uma solução persistente adicional só é necessária se o risco ou o volume justificar o tratamento extra.

## Validação prévia à produção

- [ ] Dados da conservatória e contacto de privacidade confirmados.
- [ ] DPA, localização, subcontratantes e retenção Scaleway aprovados.
- [ ] Domínio e registos SPF/DKIM/DMARC/MX validados.
- [ ] Credenciais dedicadas configuradas apenas no ambiente servidor.
- [ ] WAF configurada para o endpoint e alertas de consumo ativos.
- [ ] Caixa de destino, responsáveis, retenção e resposta aos direitos definidos.
- [ ] Teste de ponta a ponta apenas com dados fictícios e autorização específica.
- [ ] Política de Privacidade novamente verificada após a configuração real.
