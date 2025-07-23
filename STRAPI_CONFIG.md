# Configuração do Strapi

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token-here
STRAPI_API_URL=http://localhost:1337/api
```

## Configuração do Strapi

1. **Instale e configure o Strapi**:

   ```bash
   npx create-strapi-app@latest my-strapi-project --quickstart
   ```

2. **Inicie o Strapi**:

   ```bash
   cd my-strapi-project
   npm run develop
   ```

3. **Crie um API Token**:

   - Acesse http://localhost:1337/admin
   - Vá para Settings > API Tokens
   - Clique em "Create new API Token"
   - Dê um nome (ex: "blog-app")
   - Selecione "Full Access"
   - Copie o token gerado

4. **Configure as Collections**:
   - Articles (title, slug, excerpt, content, cover, category, author, createdAt)
   - Categories (name, slug)
   - Authors (name, avatar)

## Funcionalidades Implementadas

### 1. Busca de Artigos

- Busca por título, excerpt ou conteúdo
- Filtro por categoria
- Paginação (9 artigos por página)

### 2. Filtros

- Filtro por categoria (dropdown)
- Busca por texto (input)
- URL preserva os filtros e paginação

### 3. Paginação

- Navegação entre páginas
- Números de página com ellipsis
- Botões anterior/próxima
- URL reflete a página atual

### 4. Componentes

- `ArticleFilters`: Componente para busca e filtros
- `Pagination`: Componente de paginação avançada
- `HoverEffect`: Grid de artigos com efeito hover

### 5. Actions

- `getArticlesPaginated`: Busca com filtros e paginação
- `getCategories`: Busca todas as categorias
- `getArticleBySlug`: Busca artigo por slug

## Testando as Funcionalidades

Execute o teste para verificar se está funcionando:

```bash
npx tsx src/lib/test-articles.ts
```

## Estrutura dos Dados

### Article

```typescript
{
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: {
    url: string;
  }
  category: {
    id: string;
    name: string;
    slug: string;
  }
  author: {
    name: string;
    avatar: {
      url: string;
    }
  }
  createdAt: string;
}
```

### Category

```typescript
{
  id: string;
  name: string;
  slug: string;
}
```
