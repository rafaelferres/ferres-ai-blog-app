# Criação da Coleção Push Notifications no Strapi

## 1. Acesse o Admin do Strapi

1. Vá para o painel administrativo do Strapi
2. Faça login com suas credenciais de administrador

## 2. Criar a Collection Type

1. No menu lateral, clique em **"Content-Type Builder"**
2. Clique em **"Create new collection type"**
3. **Display name**: `Push Subscription`
4. **API ID (Singular)**: `push-subscription`
5. **API ID (Plural)**: `push-subscriptions`
6. Clique em **"Continue"**

## 3. Configurar os Campos

### Campos Obrigatórios:

#### 1. **endpoint** (Text)

- Field name: `endpoint`
- Type: **Text**
- Advanced settings:
  - ✅ Required field
  - ✅ Unique field
  - Max length: 500

#### 2. **p256dh** (Text)

- Field name: `p256dh`
- Type: **Text**
- Advanced settings:
  - ✅ Required field
  - Max length: 200

#### 3. **auth** (Text)

- Field name: `auth`
- Type: **Text**
- Advanced settings:
  - ✅ Required field
  - Max length: 200

#### 4. **subscriptionStatus** (Enumeration)

- Field name: `subscriptionStatus`
- Type: **Enumeration**
- Values:
  - `active`
  - `inactive`
  - `invalid`
- Advanced settings:
  - ✅ Required field
  - Default value: `active`

### Campos Opcionais:

#### 5. **userAgent** (Text)

- Field name: `userAgent`
- Type: **Text**
- Max length: 500

#### 6. **lastUsed** (DateTime)

- Field name: `lastUsed`
- Type: **DateTime**
- Advanced settings:
  - Default value: `Now`

#### 7. **userId** (Text)

- Field name: `userId`
- Type: **Text**
- Max length: 100

#### 8. **preferences** (JSON)

- Field name: `preferences`
- Type: **JSON**

#### 9. **metadata** (JSON)

- Field name: `metadata`
- Type: **JSON**

## 4. Salvar e Publicar

1. Clique em **"Save"** após configurar cada campo
2. Após adicionar todos os campos, clique em **"Save"**
3. O Strapi irá reiniciar automaticamente

## 5. Configurar Permissões

1. Vá para **"Settings"** > **"Roles & Permissions"**
2. Clique em **"Public"**
3. Em **"Push-subscription"**, marque:
   - ✅ `create`
   - ✅ `update`
   - ✅ `delete`
   - ✅ `find`
   - ✅ `findOne`
4. Clique em **"Save"**

## 6. Estrutura Final da Collection

```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/...",
  "p256dh": "BGg1...",
  "auth": "R7o...",
  "subscriptionStatus": "active",
  "userAgent": "Mozilla/5.0...",
  "lastUsed": "2024-01-01T00:00:00.000Z",
  "userId": "user123",
  "preferences": {
    "allArticles": true,
    "categories": ["tech", "ai"]
  },
  "metadata": {
    "browser": "Chrome",
    "os": "Windows",
    "version": "119.0.0"
  }
}
```

## 7. Testar a Collection

1. Vá para **"Content Manager"**
2. Clique em **"Push Subscription"**
3. Teste criando uma entrada manual para verificar se todos os campos estão funcionando

## Notas Importantes:

- O campo `endpoint` deve ser único para evitar duplicatas
- O campo `subscriptionStatus` controla se a subscription está ativa
- Os campos `preferences` e `metadata` são JSON e podem conter dados estruturados
- A collection será acessível via API em `/api/push-subscriptions`

## Webhook Configuration

Se você quiser notificações automáticas quando artigos são publicados:

1. Vá para **"Settings"** > **"Webhooks"**
2. Clique em **"Create new webhook"**
3. **Name**: `Push Notifications`
4. **URL**: `https://seu-dominio.com/api/webhook/strapi`
5. **Events**: Marque os eventos relevantes (ex: `entry.publish` para artigos)
6. **Headers**: Adicione `Authorization: Bearer seu-token-secreto`
7. Clique em **"Save"**
