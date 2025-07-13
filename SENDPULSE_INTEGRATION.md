# SendPulse Integration - Sistema de Notificações Push

## 📋 Visão Geral

O sistema de notificações push foi migrado para o **SendPulse**, substituindo o sistema anterior baseado em VAPID keys e service workers próprios.

## 🚀 Configuração

### 1. Script SendPulse

O script do SendPulse foi integrado no layout principal (`src/app/layout.tsx`):

```tsx
<script
  charSet="UTF-8"
  src="//web.webpushs.com/js/push/56f5dabfb60218d5c1e60952141a958b_1.js"
  async
/>
```

### 2. Componentes Disponíveis

#### `SendPulseNotification`

- **Arquivo**: `src/components/sendpulse-notification.tsx`
- **Função**: Popup automático para solicitação de notificações
- **Características**:
  - Aparece 3 segundos após carregar a página
  - Só aparece se não foi perguntado antes
  - Não aparece se permissão já foi concedida/negada
  - Controle via localStorage

#### `SendPulseManager`

- **Arquivo**: `src/components/sendpulse-manager.tsx`
- **Função**: Gerenciador manual de notificações
- **Características**:
  - Permite ativar/desativar notificações
  - Mostra status da permissão
  - Interface para gerenciamento manual

## 🔧 Funcionalidades

### API SendPulse

O sistema utiliza a API global `window.sendpulse_webpush` com os seguintes métodos:

```typescript
interface SendPulseWebPush {
  subscribe: () => void; // Inscrever usuário
  unsubscribe: () => void; // Desinscrever usuário
  isSubscribed: () => boolean; // Verificar se está inscrito
  getSubscriptionId: () => string | null; // Obter ID da inscrição
  init: () => void; // Inicializar SDK
}
```

### Verificações de Suporte

- ✅ Verifica suporte a notificações (`"Notification" in window`)
- ✅ Aguarda carregamento do SDK SendPulse
- ✅ Gerencia permissões de notificação
- ✅ Controla estado de inscrição

## 📱 Experiência do Usuário

### Fluxo de Inscrição

1. Usuário acessa o site
2. Após 3 segundos, aparece popup (se não perguntado antes)
3. Usuário clica "Sim, quero" ou "Não, obrigado"
4. Sistema solicita permissão do navegador
5. SendPulse gerencia a inscrição
6. Confirmação exibida ao usuário

### Estados da Notificação

- **Não solicitadas**: Permissão ainda não foi pedida
- **Permitidas**: Usuário autorizou notificações
- **Negadas**: Usuário bloqueou notificações

## 🗂️ Arquivos Removidos

Os seguintes arquivos do sistema anterior foram removidos:

### Componentes

- `src/components/auto-push-notification.tsx`
- `src/components/push-notification-manager.tsx`
- `src/components/ui/notification-toggle.tsx`

### Bibliotecas

- `src/lib/push-notifications.ts`
- `src/lib/strapi-push-notifications.ts`

### API Routes

- `src/app/api/webhook/strapi/route.ts`

### Scripts

- `scripts/generate-vapid-keys.js`
- `public/sw-dev.js`

## 🔄 Migração

### Antes (Sistema Antigo)

```tsx
import AutoPushNotification from "@/components/auto-push-notification";

// No layout
<AutoPushNotification />;
```

### Depois (SendPulse)

```tsx
import SendPulseNotification from "@/components/sendpulse-notification";

// No layout
<SendPulseNotification />;
```

## 📊 Vantagens do SendPulse

1. **Simplicidade**: Não precisa gerenciar VAPID keys
2. **Confiabilidade**: Serviço especializado em notificações
3. **Escalabilidade**: Infraestrutura gerenciada
4. **Analytics**: Dashboard integrado
5. **Suporte**: Suporte técnico especializado

## 🛠️ Desenvolvimento

### Verificar se SendPulse Carregou

```typescript
if (window.sendpulse_webpush) {
  console.log("SendPulse carregado!");
  window.sendpulse_webpush.init();
}
```

### Verificar Status de Inscrição

```typescript
const isSubscribed = window.sendpulse_webpush?.isSubscribed();
console.log("Inscrito:", isSubscribed);
```

### Inscrever Usuário

```typescript
await window.sendpulse_webpush.subscribe();
```

### Desinscrever Usuário

```typescript
await window.sendpulse_webpush.unsubscribe();
```

## 🔒 Segurança

- **localStorage**: Usado para controlar se já foi perguntado
- **Permissões**: Respeita configurações do navegador
- **Graceful Degradation**: Funciona mesmo se SendPulse não carregar

## 🎯 Próximos Passos

1. Testar em diferentes navegadores
2. Configurar campanhas no dashboard SendPulse
3. Implementar segmentação por categorias (se necessário)
4. Monitorar métricas de conversão
5. Otimizar timing do popup

---

✅ **Sistema SendPulse integrado com sucesso!**
