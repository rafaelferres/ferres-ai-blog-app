# Push Notifications Setup - Sistema de Notificações Push

Este sistema permite que o blog envie notificações push para os usuários quando novos artigos são publicados no Strapi.

## 🚀 Funcionalidades Implementadas

- ✅ **Webhook do Strapi**: Recebe notificações de publicação de artigos
- ✅ **Push Notifications**: Envia notificações para usuários subscritos
- ✅ **Gerenciamento de Subscriptions**: APIs para criar e remover subscriptions
- ✅ **Service Worker**: Lida com notificações push no cliente
- ✅ **Componente React**: Interface para gerenciar notificações
- ✅ **Integração com PWA**: Funciona com o next-pwa existente

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env.local`:

```env
# Push Notifications
VAPID_PUBLIC_KEY=your_vapid_public_key_here
VAPID_PRIVATE_KEY=your_vapid_private_key_here
VAPID_SUBJECT=mailto:your-email@example.com

# Webhook Security
STRAPI_WEBHOOK_SECRET=your_webhook_secret_here
```

### 2. Gerar VAPID Keys

Para gerar as VAPID keys, você pode usar o utilitário integrado:

```bash
# No terminal, execute:
node -e "const webpush = require('web-push'); const keys = webpush.generateVAPIDKeys(); console.log('VAPID_PUBLIC_KEY:', keys.publicKey); console.log('VAPID_PRIVATE_KEY:', keys.privateKey);"
```

Ou use a função já incluída no código:

```javascript
// Em um arquivo temporário ou no console do navegador
import { generateVapidKeys } from "@/lib/push-notifications";
generateVapidKeys();
```

### 3. Configurar Webhook no Strapi

No seu painel do Strapi:

1. Vá para **Settings** > **Webhooks**
2. Clique em **Create new webhook**
3. Configure:
   - **Name**: `Push Notifications`
   - **URL**: `https://your-domain.com/api/webhook/strapi`
   - **Events**: Selecione `entry.publish` para o content type `article`
   - **Headers**: Adicione `Authorization: Bearer your_webhook_secret_here`

## 📱 Como Usar

### 1. Adicionar o Componente ao Layout

Adicione o componente `PushNotificationManager` ao seu layout:

```tsx
import PushNotificationManager from "@/components/push-notification-manager";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <nav>
          {/* Sua navegação */}
          <PushNotificationManager className="ml-auto" />
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
```

### 2. Fluxo do Usuário

1. **Primeira visita**: O usuário verá um botão "Ativar Notificações"
2. **Clique no botão**: Solicitará permissão para notificações
3. **Permissão concedida**: Criará uma subscription e enviará para o servidor
4. **Artigo publicado**: Strapi enviará webhook → Sistema enviará push notification

### 3. Teste das Notificações

Para testar o sistema:

```bash
# 1. Teste o webhook
curl -X POST https://your-domain.com/api/webhook/strapi \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_webhook_secret" \
  -d '{
    "event": "entry.publish",
    "model": "article",
    "entry": {
      "id": 1,
      "title": "Teste de Notificação",
      "slug": "teste-notificacao",
      "cover": { "url": "/test-image.jpg" }
    }
  }'

# 2. Teste da API de subscription
curl -X GET https://your-domain.com/api/push-notifications/vapid-key

# 3. Teste do service worker
# Abra o Developer Tools > Application > Service Workers
# Verifique se o SW está ativo e os logs
```

## 🛠️ APIs Disponíveis

### Webhook do Strapi

- **Endpoint**: `POST /api/webhook/strapi`
- **Autenticação**: Bearer token via `STRAPI_WEBHOOK_SECRET`
- **Payload**: Dados do artigo publicado

### Subscriptions

- **Criar**: `POST /api/push-notifications/subscribe`
- **Remover**: `POST /api/push-notifications/unsubscribe`
- **VAPID Key**: `GET /api/push-notifications/vapid-key`

### Analytics e Admin

- **Estatísticas**: `GET /api/push-notifications/stats`
- **Limpeza**: `POST /api/push-notifications/cleanup` (requer auth)
- **Painel Admin**: `/admin/push-notifications`

## 🔒 Segurança

- ✅ **Autenticação**: Webhook protegido com token Bearer
- ✅ **VAPID**: Chaves seguras para autenticação das notificações
- ✅ **Origem**: Verificação de origem nas subscriptions
- ✅ **Validação**: Validação de dados de entrada

## 📊 Armazenamento

**✅ IMPLEMENTADO**: As subscriptions agora são armazenadas permanentemente no Strapi!

### Collection `push-subscription` no Strapi:

- **endpoint** - URL única da subscription
- **p256dh** - Chave pública para criptografia
- **auth** - Token de autenticação
- **status** - active/inactive/invalid
- **userAgent** - Informações do navegador
- **lastUsed** - Última utilização
- **userId** - ID do usuário (opcional)
- **preferences** - Preferências de notificação (JSON)
- **metadata** - Metadados extras (JSON)

### Recursos Avançados:

- ✅ **Segmentação por categorias**
- ✅ **Analytics e estatísticas**
- ✅ **Limpeza automática de subscriptions inválidas**
- ✅ **Tracking de uso e metadados**
- ✅ **Painel admin em `/admin/push-notifications`**

## 🐛 Troubleshooting

### Notificações não aparecem

1. Verifique se o service worker está ativo
2. Confirme que a permissão foi concedida
3. Verifique os logs do console para erros

### Webhook não funciona

1. Teste a URL do webhook manualmente
2. Verifique se o token de autorização está correto
3. Confirme que o Strapi está enviando os dados corretos

### VAPID Keys inválidas

1. Regere as keys usando o comando fornecido
2. Certifique-se de que não há espaços extras nas variáveis
3. Teste a key pública via API

## 📝 Próximos Passos (Opcionais)

Funcionalidades extras que podem ser implementadas:

1. **Integração de usuários**: Conectar com sistema de autenticação
2. **A/B Testing**: Testar diferentes tipos de notificação
3. **Agendamento**: Notificações programadas
4. **Templates**: Templates personalizados por categoria
5. **Rate limiting**: Controle de frequência por usuário
6. **PWA avançado**: Notificações offline

## 🤝 Contribuição

Este sistema foi desenvolvido de forma modular e é facilmente extensível. Contribuições são bem-vindas!

---

**Desenvolvido para o Ferres AI Blog** 🚀
