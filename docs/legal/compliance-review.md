# Revisão interna de conformidade

Data da revisão técnica: 17 de outubro de 2026. Este documento é interno e não substitui aconselhamento jurídico. As páginas públicas foram ajustadas à arquitetura observada no repositório; os pontos pendentes não devem ser tratados como validados.

## 1. Informação verificada

| Dado ou decisão | Motivo | Estado | Ação requerida |
|---|---|---|---|
| Denominação `Educanology Unipessoal Lda.`, NIPC 509746276, sede e `hello@educanology.eu` | Constam das páginas existentes | Verificado apenas contra o repositório | Confirmar com certidão comercial atualizada |
| Formulário de reuniões | O código recolhe nome, email, organização/cargo opcionais e mensagem | Verificado tecnicamente | Manter minimização e não reutilizar para marketing |
| Base do pedido de reunião | Resposta a pedido e diligências pré-contratuais; interesse legítimo quando não há intenção contratual | Documentado | Validar juridicamente o teste de ponderação do interesse legítimo |
| Scaleway TEM | Endpoint `fr-par`, envio server-side e `Reply-To` validado | Implementado, inativo sem credenciais | Concluir checklist de ativação |
| Google Analytics 4 | Script só é injetado após consentimento; `ga-disable` impede novos eventos após retirada | Verificado tecnicamente | Confirmar configuração da propriedade, retenção e termos Google |
| Vercel Web Analytics | Componente só é montado após consentimento e `beforeSend` volta a verificar a escolha | Verificado tecnicamente | Confirmar plano, DPA e configuração da conta |
| Preferência de cookies | `localStorage` com chave `educanology-cookie-consent`, sem caducidade automática | Verificado tecnicamente | Decidir e implementar um prazo de renovação se aprovado |
| DeepSeek | A API é chamada diretamente; são enviados prompt de sistema, base de conhecimento e até dez mensagens recentes | Verificado tecnicamente | Rever necessidade, minimização e garantias internacionais |
| Histórico do assistente | Mantido apenas no estado do navegador pela aplicação | Verificado no código | Confirmar retenção em logs de Vercel e no fornecedor |
| Links legais | Footer, formulário, banner e aviso do assistente apontam para as páginas corretas | Verificado no código | Incluir em testes de regressão |

## 2. Recomendações

| Dado ou decisão | Motivo | Estado | Ação requerida |
|---|---|---|---|
| Renovação do consentimento | A escolha local não caduca automaticamente | Recomendado | Definir prazo e versão da política antes de alterar o código |
| Eliminação de cookies Google ao retirar consentimento | O bloqueio impede novas medições, mas cookies existentes podem permanecer | Recomendado | Avaliar eliminação segura por domínio e testar todos os navegadores |
| WAF no formulário | O limite em memória não é global em serverless | Recomendado antes de produção | Criar regra para `POST /api/meeting-request` e alertas de consumo |
| Retenção de pedidos | O texto público indica 24 meses como regra operacional proposta | Recomendado | Aprovar política interna, responsáveis e rotina de eliminação |
| Logs sem conteúdo | Reduz exposição de mensagens e dados de contacto | Implementado no endpoint novo | Rever também logs e observabilidade externos |
| Avaliação de impacto/transferência DeepSeek | Envio de texto para a China e falta de garantias verificadas publicamente | Prioridade alta | Concluir avaliação, contrato e alternativa UE se necessário |
| API do assistente | Atualmente aceita um histórico enviado pelo cliente e não limita expressamente o tamanho no servidor | Risco técnico identificado; não alterado por preservar comportamento | Especificar validação, limites, rate limiting e filtragem de papéis antes de implementar |

## 3. Informação pendente da Educanology

| Dado ou decisão | Motivo | Estado | Ação requerida |
|---|---|---|---|
| Conservatória competente e número de matrícula/registro | Informação exigível ao prestador por via eletrónica; não consta do repositório | Pendente | Fornecer certidão permanente ou dados oficiais atualizados |
| Endereço de estabelecimento, se diferente da sede | Requisito de identificação e contacto | Pendente | Confirmar se a sede publicada é também o estabelecimento relevante |
| Contacto específico de privacidade | Facilita exercício de direitos | Pendente | Confirmar se `hello@educanology.eu` deve manter-se ou indicar outro endereço |
| Público e serviços dirigidos a menores | Afeta transparência, risco e consentimento | Pendente | Confirmar que o website não se dirige diretamente a menores ou definir salvaguardas |
| Conta/plano Vercel | Determina termos, DPA e subcontratantes aplicáveis | Pendente | Fornecer plano e aceitar/documentar o DPA aplicável |
| Propriedade Google Analytics | Determina ID, retenção, região e controlos | Pendente | Confirmar titularidade, retenção, sinais de consentimento e Google Signals |
| Conta e contrato DeepSeek | Não há documentação contratual da conta no repositório | Pendente crítico | Fornecer termos/DPA/SCC ou suspender o assistente para dados pessoais |
| Conta Scaleway e caixa de destino | Necessárias para ativação | Não criadas por este trabalho | Criar só após aprovação, DPA, DNS e processo interno |
| Política de retenção e direitos | Exige responsabilidades organizativas | Pendente | Designar responsáveis, prazos, procedimento e registo de pedidos |
| Relações B2C | Pode implicar deveres adicionais de consumo e resolução de litígios | Pendente | Confirmar se há contratação com consumidores através ou fora do website |

## 4. Revisão por profissional jurídico

| Dado ou decisão | Motivo | Estado | Ação requerida |
|---|---|---|---|
| Aviso Legal e identificação comercial | Confirmar suficiência ao abrigo do Decreto-Lei n.º 7/2004 e legislação societária | Revisão jurídica necessária | Validar antes de publicar |
| Bases jurídicas e prazos | Dependem dos processos empresariais reais | Revisão jurídica necessária | Validar tabela de tratamentos e prazo de 24 meses |
| Transferências internacionais | Google, Vercel e especialmente DeepSeek exigem análise contratual e do capítulo V do RGPD | Revisão jurídica necessária | Documentar adequação/SCC, TIA e medidas suplementares |
| Papéis de responsável/encarregado | Dependem dos contratos e configurações | Revisão jurídica necessária | Confirmar DPA e instruções de tratamento de cada fornecedor |
| Limitação de responsabilidade e foro | Não pode afastar normas imperativas | Revisão jurídica necessária | Validar Termos de Utilização segundo público real |
| Comunicações comerciais | Não fazem parte do formulário atual | Fora do fluxo implementado | Rever antes de qualquer newsletter ou prospeção eletrónica |

## Fontes oficiais consultadas

- [Regulamento (UE) 2016/679 — RGPD, EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=pt)
- [Lei n.º 58/2019, Diário da República](https://diariodarepublica.pt/dr/detalhe/lei/58-2019-123815982)
- [Lei n.º 41/2004, Diário da República](https://diariodarepublica.pt/dr/detalhe/lei/41-2004-480710)
- [Decreto-Lei n.º 7/2004 consolidado, Diário da República](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2004-73199154-73197498)
- [Diretiva 2002/58/CE, EUR-Lex](https://eur-lex.europa.eu/legal-content/pt/TXT/?uri=CELEX%3A32002L0058)
- [CNPD — consentimento](https://www.cnpd.pt/organizacoes/areas-tematicas/consentimento/)
- [CNPD — orientações sobre cookies](https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf)
- [EDPB — relatório da task force sobre banners de cookies](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf)
- [Scaleway — API Transactional Email](https://www.scaleway.com/en/developers/api/transactional-email/emails)
- [Scaleway — contratos e DPA](https://www.scaleway.com/en/contracts/)
- [Google Analytics — utilização de cookies](https://support.google.com/analytics/answer/11397207?hl=pt)
- [Google Analytics — conservação de dados](https://support.google.com/analytics/answer/7667196?hl=pt)
- [Vercel Web Analytics — privacidade](https://vercel.com/docs/analytics/privacy-policy)
- [Vercel — Data Processing Addendum](https://vercel.com/legal/dpa)
- [DeepSeek — Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html?locale=en_US)
- [DeepSeek — Open Platform Terms](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
