# 🔔 Botão de Notificações no Footer

## 📋 **Visão Geral**

O botão de notificações foi adicionado ao footer do site para permitir que os usuários ativem ou desativem as notificações push de forma conveniente em qualquer página.

## 🎯 **Funcionalidades**

### ✅ **Ativação de Notificações**

- Clique no botão "Ativar Notificações"
- Solicita permissão do navegador
- Cria subscription no servidor
- Mostra feedback visual de sucesso

### ❌ **Desativação de Notificações**

- Clique no botão "Notificações Ativadas"
- Remove subscription do navegador
- Remove dados do servidor
- Atualiza status visual

### 🔄 **Estados do Botão**

| Estado         | Ícone      | Texto                   | Cor            |
| -------------- | ---------- | ----------------------- | -------------- |
| **Desativado** | 🔕 BellOff | "Ativar Notificações"   | Cinza          |
| **Ativado**    | 🔔 Bell    | "Notificações Ativadas" | Azul (Primary) |
| **Carregando** | ⏳ Spinner | "Processando..."        | Opaco          |

## 📱 **Responsividade**

### 🖥️ **Desktop (sm+)**

- Mostra ícone + texto completo
- Botão com padding adequado

### 📱 **Mobile (< sm)**

- Mostra apenas o ícone
- Texto oculto para economizar espaço
- Tooltip com informação completa

## 🔧 **Implementação Técnica**

### 📁 **Arquivos Criados/Modificados**

- `src/components/ui/notification-toggle.tsx` - Componente do botão
- `src/components/ui/footer.tsx` - Integração no footer

### 🔗 **Integração com APIs**

- `/api/push-notifications/vapid-key` - Obtém chave pública
- `/api/push-notifications/subscribe` - Cria subscription
- `/api/push-notifications/unsubscribe` - Remove subscription

### 🎨 **Estilo e UX**

- Usa design system do Tailwind CSS
- Feedback visual com toast notifications
- Estados de loading com spinner
- Cores consistentes com o tema

## 🔐 **Verificações de Segurança**

### ✅ **Verificações de Suporte**

- Verifica se Service Worker está disponível
- Verifica se PushManager está disponível
- Oculta botão se não há suporte

### 🔒 **Permissões**

- Solicita permissão explícita do usuário
- Trata negação de permissão graciosamente
- Não mostra erro se usuário negar

## 📊 **Experiência do Usuário**

### 🎯 **Primeira Vez**

1. Usuário vê botão "Ativar Notificações"
2. Clica e recebe prompt do navegador
3. Aceita permissão
4. Botão muda para "Notificações Ativadas"
5. Toast de sucesso aparece

### 🔄 **Usuário Recorrente**

1. Botão mostra estado correto automaticamente
2. Pode alternar entre ativado/desativado
3. Estado persiste entre sessões

## 🚀 **Localização no Footer**

### 📍 **Posição**

- **Desktop**: Lado direito do footer, antes dos links legais
- **Mobile**: Centralizado, acima dos links legais

### 🎨 **Layout**

```
Desktop:
[Copyright] ..................... [Botão Notificações] [Links Legais]

Mobile:
[Copyright]
[Botão Notificações]
[Links Legais]
```

## 🔧 **Configuração Necessária**

### 🌐 **Variáveis de Ambiente**

```env
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_SUBJECT=mailto:your-email@example.com
```

### 📊 **Strapi Collection**

- Collection `push-subscription` deve estar criada
- Permissões configuradas para role "Public"

## 🎯 **Benefícios para o Usuário**

### ✅ **Conveniência**

- Acesso fácil em qualquer página
- Não precisa procurar configurações
- Feedback imediato

### 🔔 **Controle**

- Ativação/desativação simples
- Estado visual claro
- Não é intrusivo

### 📱 **Acessibilidade**

- Funciona em desktop e mobile
- Tooltips informativos
- Estados visuais claros

## 🚀 **Próximos Passos**

Para usar o botão:

1. ✅ Certifique-se que o Strapi está configurado
2. ✅ Verifique as variáveis de ambiente
3. ✅ Teste em diferentes navegadores
4. ✅ Publique em produção

O botão estará automaticamente disponível no footer de todas as páginas!
