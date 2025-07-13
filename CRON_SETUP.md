# Configuração do Cron Job - Reset Semanal do Visit Count

Este projeto inclui um cron job automatizado que limpa o `visit_weekly_count` de todos os artigos toda segunda-feira às 00:00 UTC.

## Configuração no Vercel

### 1. Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente no painel do Vercel:

```env
CRON_SECRET=your_secure_cron_secret_here
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_strapi_api_token_here
```

**Importante:** O `CRON_SECRET` deve ser uma string segura e aleatória. Você pode gerar uma usando:

```bash
openssl rand -base64 32
```

### 2. Configuração do Cron Job

O arquivo `vercel.json` já está configurado com:

```json
{
  "crons": [
    {
      "path": "/api/cron/reset-weekly-visits",
      "schedule": "0 0 * * 1"
    }
  ]
}
```

**Schedule:** `0 0 * * 1` significa toda segunda-feira às 00:00 UTC.

### 3. Como Funciona

1. **Endpoint:** `/api/cron/reset-weekly-visits`
2. **Método:** POST
3. **Autenticação:** Bearer token usando `CRON_SECRET`
4. **Ação:** Busca todos os artigos e define `visit_weekly_count: 0`

### 4. Logs e Monitoramento

Os logs do cron job aparecem na seção **Functions** do painel do Vercel. Você verá:

- ✅ Status de sucesso/erro
- 📊 Número de artigos processados
- 🔍 Detalhes de cada artigo atualizado
- ⏱️ Timestamp da execução

### 5. Teste Local

Para testar o cron job localmente:

```bash
# 1. Configure as variáveis de ambiente no .env.local
CRON_SECRET=test-secret-123
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here

# 2. Execute o projeto
npm run dev

# 3. Teste o endpoint
curl -X POST http://localhost:3000/api/cron/reset-weekly-visits \
  -H "Authorization: Bearer test-secret-123" \
  -H "Content-Type: application/json"
```

### 6. Teste de Conectividade

Para verificar se o endpoint está funcionando:

```bash
# GET para informações do endpoint
curl http://localhost:3000/api/cron/reset-weekly-visits
```

## Configuração no Strapi

### Campo visit_weekly_count

Certifique-se de que o campo `visit_weekly_count` existe na collection `articles` do Strapi:

1. Acesse o painel do Strapi
2. Vá para **Content-Type Builder** > **Articles**
3. Adicione um campo:
   - **Type:** Number
   - **Name:** visit_weekly_count
   - **Default Value:** 0
   - **Required:** false

### Permissões da API

Configure as permissões no Strapi para permitir que o token de API:

1. **Find** artigos (para buscar todos)
2. **Update** artigos (para resetar o contador)

## Troubleshooting

### Erro 401 (Não Autorizado)

- Verifique se `CRON_SECRET` está configurado corretamente
- Confirme que o header `Authorization` está sendo enviado

### Erro 500 (Erro do Servidor)

- Verifique se o Strapi está acessível
- Confirme se `STRAPI_API_TOKEN` está válido
- Verifique se o campo `visit_weekly_count` existe na collection

### Cron Job não Executando

- Verifique se o projeto está deployado na Vercel
- Confirme se o arquivo `vercel.json` está na raiz do projeto
- Verifique os logs na seção **Functions** do painel Vercel

## Modificando o Schedule

Para alterar a frequência do cron job, edite o campo `schedule` no `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/reset-weekly-visits",
      "schedule": "0 0 * * 1" // Toda segunda às 00:00 UTC
    }
  ]
}
```

### Exemplos de Schedules

- `0 0 * * 0` - Domingos às 00:00 UTC
- `0 0 1 * *` - Primeiro dia do mês às 00:00 UTC
- `0 */6 * * *` - A cada 6 horas
- `0 0 * * 1,3,5` - Segunda, quarta e sexta às 00:00 UTC

## Monitoramento

Para monitorar o cron job:

1. **Vercel Dashboard:** Vá para Functions > Cron Jobs
2. **Logs:** Verifique os logs de execução
3. **Alertas:** Configure alertas para falhas (se necessário)

## Segurança

- ✅ O endpoint usa autenticação Bearer token
- ✅ O `CRON_SECRET` não é exposto no código
- ✅ Logs não expõem informações sensíveis
- ✅ Apenas o método POST é permitido para execução
