# Ferres - Blog de Notícias

Um blog moderno e responsivo sobre tecnologia, construído com Next.js 15, TypeScript, Tailwind CSS e Strapi CMS.

## 🚀 Características

- **Design Moderno**: Interface limpa e responsiva com tema escuro
- **CMS Headless**: Gerenciamento de conteúdo via Strapi
- **Performance**: Otimizado com Next.js 15 e App Router
- **SEO**: Meta tags e estrutura otimizada para motores de busca
- **Componentes Reutilizáveis**: Arquitetura modular e escalável
- **Tipagem Forte**: TypeScript para melhor desenvolvimento

## 📱 Páginas Principais

### 🏠 Página Inicial

- Hero section com chamada para ação
- Grid de artigos em destaque
- Seção de newsletter

### 📰 Página de Artigos (`/articles`)

- Listagem completa de artigos
- Filtros por categoria
- Busca de conteúdo
- Paginação

### 📄 Página de Artigo (`/articles/[slug]`)

- Layout completo do artigo
- Informações do autor
- Categoria e tags
- Breadcrumb de navegação

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **CMS**: Strapi v5
- **UI Components**: Lucide React Icons
- **Styling**: CSS Modules com Tailwind
- **Deployment**: Vercel (recomendado)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Strapi CMS configurado

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/ferres-ai-blog-app.git
cd ferres-ai-blog-app
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

4. Configure a conexão com o Strapi no arquivo `.env.local`:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=seu-token-aqui
```

5. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

6. Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── actions/           # Server Actions para API
│   ├── articles.ts    # Ações relacionadas a artigos
│   ├── categories.ts  # Ações relacionadas a categorias
│   └── ...
├── app/              # App Router (Next.js 15)
│   ├── articles/     # Páginas de artigos
│   ├── articles/     # Página de artigos
│   └── ...
├── components/       # Componentes React
│   ├── header/       # Componentes do cabeçalho
│   ├── ui/           # Componentes de UI reutilizáveis
│   └── ...
├── lib/              # Utilitários e configurações
│   ├── strapi.ts     # Cliente Strapi
│   └── ...
└── types/            # Definições de tipos TypeScript
    └── strapi.ts     # Tipos do Strapi
```

## 🎨 Componentes Principais

### ArticleCard

Componente reutilizável para exibir cards de artigos com:

- Imagem de capa
- Título e resumo
- Informações do autor e data
- Tags (opcional)
- Link para leitura completa

### Newsletter

Componente para captura de emails com:

- Formulário de inscrição
- Design responsivo
- Integração com tema

### Header

Navegação principal com:

- Logo e branding
- Menu de categorias
- Links para serviços
- Menu mobile responsivo

## 🔧 Configuração do Strapi

### Estrutura de Conteúdo Necessária

1. **Collection Type: Articles**

   - title (Text)
   - slug (UID)
   - content (Rich Text)
   - excerpt (Text)
   - cover (Media)
   - author (Relation - Users)
   - category (Relation - Categories)
   - tags (Relation - Tags)

2. **Collection Type: Categories**

   - name (Text)
   - slug (UID)
   - description (Text)

3. **Collection Type: Tags**
   - name (Text)
   - slug (UID)

### Permissões

Configure as permissões no Strapi para permitir leitura pública dos artigos, categorias e tags.

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js.

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no GitHub.

---

Desenvolvido com ❤️ pela equipe Ferres
