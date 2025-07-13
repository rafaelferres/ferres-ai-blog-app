# Configuração do Strapi v5

Este projeto está configurado para conectar com o Strapi v5 CMS. Siga os passos abaixo para configurar a conexão.

⚠️ **Importante**: Este projeto foi atualizado para funcionar com o Strapi v5. Se você estiver usando Strapi v4, você precisará fazer ajustes na configuração.

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# Outras configurações
NODE_ENV=development
```

### Explicação das Variáveis

- `NEXT_PUBLIC_STRAPI_URL`: URL do seu servidor Strapi (pode ser local ou remoto)
- `STRAPI_API_TOKEN`: Token de API do Strapi para autenticação

## Como Obter o Token de API

1. Acesse o painel administrativo do Strapi
2. Vá para **Settings** > **API Tokens**
3. Clique em **Create new API Token**
4. Configure o token:
   - **Name**: Nome descritivo (ex: "Blog App Token")
   - **Description**: Descrição opcional
   - **Token duration**: Unlimited (ou defina um período)
   - **Token type**: Full access (ou configure permissões específicas)
5. Clique em **Save**
6. Copie o token gerado e cole na variável `STRAPI_API_TOKEN`

## Estrutura de Dados Esperada

O projeto espera que o Strapi tenha as seguintes coleções configuradas:

### Articles

- `title` (Text)
- `content` (Rich Text)
- `slug` (UID)
- `excerpt` (Text, opcional)
- `featuredImage` (Media, opcional)
- `author` (Relation com Authors)
- `categories` (Relation com Categories)
- `tags` (Relation com Tags)
- `featured` (Boolean, opcional)

### Authors

- `name` (Text)
- `email` (Email, opcional)
- `bio` (Text, opcional)
- `avatar` (Media, opcional)

### Categories

- `name` (Text)
- `slug` (UID)
- `description` (Text, opcional)

### Tags

- `name` (Text)
- `slug` (UID)

### Users

- `username` (Text)
- `email` (Email)
- `avatar` (Media, opcional)

## Actions Disponíveis

### Posts

- `getPosts()` - Busca todos os posts
- `getPostBySlug(slug)` - Busca post por slug
- `getPostById(id)` - Busca post por ID
- `getPostsByCategory(categorySlug)` - Busca posts por categoria
- `getPostsByTag(tagSlug)` - Busca posts por tag
- `getFeaturedPosts(limit)` - Busca posts em destaque
- `getRelatedPosts(postId, categoryIds, limit)` - Busca posts relacionados

### Categories

- `getCategories()` - Busca todas as categorias
- `getCategoryBySlug(slug)` - Busca categoria por slug
- `getCategoryById(id)` - Busca categoria por ID
- `getCategoriesWithPostCount()` - Busca categorias com contagem de posts

### Tags

- `getTags()` - Busca todas as tags
- `getTagBySlug(slug)` - Busca tag por slug
- `getTagById(id)` - Busca tag por ID
- `getTagsWithPostCount()` - Busca tags com contagem de posts
- `getPopularTags(limit)` - Busca tags populares

### Users

- `getUsers()` - Busca todos os usuários
- `getUserById(id)` - Busca usuário por ID
- `getUserByUsername(username)` - Busca usuário por username
- `getUserByEmail(email)` - Busca usuário por email
- `getAuthors()` - Busca autores (usuários com posts)

### Utilitárias

- `fetchCollection(collection, params)` - Busca dados de qualquer coleção
- `fetchItemById(collection, id, params)` - Busca item por ID
- `fetchItemsByFilter(collection, filter, params)` - Busca itens por filtro
- `fetchItemBySlug(collection, slug, params)` - Busca item por slug
- `fetchWithPagination(collection, page, pageSize, params)` - Busca com paginação
- `fetchWithSorting(collection, sort, params)` - Busca com ordenação
- `fetchWithPopulate(collection, populate, params)` - Busca com população

## Exemplo de Uso

```typescript
import { getPosts, getPostBySlug } from "@/actions";

// Buscar todos os posts
const posts = await getPosts({
  pagination: { page: 1, pageSize: 10 },
  sort: ["publishedAt:desc"],
});

// Buscar post específico
const post = await getPostBySlug("meu-post");
```

## Mudanças Importantes do Strapi v5

### 1. Document Service API

- **Antes (v4)**: `strapi.entityService.find('posts')`
- **Agora (v5)**: `strapiClient.collection('posts').find()`

### 2. Identificadores

- **Antes (v4)**: Usava `id` numérico
- **Agora (v5)**: Usa `documentId` string único

### 3. Estrutura de Dados

- **Antes (v4)**: `post.attributes.title`
- **Agora (v5)**: `post.title` (dados diretamente no documento)

### 4. Cliente Strapi

- **Antes (v4)**: `import strapi from '@strapi/client'`
- **Agora (v5)**: `import { strapi } from '@strapi/client'`
- Configuração: `baseURL` e `auth` em vez de `url` e `token`

### 5. Relacionamentos

- Relacionamentos são populados diretamente no documento
- Não há mais necessidade de acessar `data.attributes`

## Tratamento de Erros

Todas as actions incluem tratamento de erros e retornam mensagens de erro em português. Em caso de falha na conexão com o Strapi, verifique:

1. Se o servidor Strapi está rodando (v5)
2. Se as variáveis de ambiente estão configuradas corretamente
3. Se o token de API tem as permissões necessárias
4. Se a estrutura de dados no Strapi corresponde ao esperado
5. Se você está usando Strapi v5 (este código não é compatível com v4)
