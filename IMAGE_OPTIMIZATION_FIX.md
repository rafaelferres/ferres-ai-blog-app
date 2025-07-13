# 🔧 Correção do Problema de Otimização de Imagens

## 🚨 Problema Identificado

O erro `INVALID_IMAGE_OPTIMIZE_REQUEST` ocorre quando o Next.js não consegue otimizar imagens porque o domínio do Strapi não está configurado corretamente no `next.config.ts`.

## ✅ Soluções Implementadas

### 1. Configuração Automática do Next.js

O `next.config.ts` foi atualizado para detectar automaticamente o domínio do Strapi:

```typescript
// Obter URL do Strapi da variável de ambiente
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const strapiHostname = new URL(strapiUrl).hostname;
const strapiProtocol = new URL(strapiUrl).protocol.replace(":", "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: strapiProtocol as "http" | "https",
        hostname: strapiHostname,
        pathname: "/uploads/**",
      },
      // Domínios adicionais para produção
      {
        protocol: "https",
        hostname: "strapi.ferres.io",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cms.ferres.io",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.ferres.io",
        pathname: "/uploads/**",
      },
    ],
    // Configurações adicionais para melhor compatibilidade
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

### 2. Componente StrapiImage Otimizado

Criado o componente `src/components/ui/strapi-image.tsx` que:

- ✅ Normaliza URLs do Strapi automaticamente
- ✅ Lida com URLs relativas e absolutas
- ✅ Fornece fallback em caso de erro
- ✅ Mantém compatibilidade com Next.js Image

```typescript
// Exemplo de uso
<StrapiImage
  src={article.cover.url}
  alt={article.cover.alternativeText || article.title}
  fill
  className="object-cover"
/>
```

### 3. Página de Teste

Criada a página `/test-images` para diagnosticar problemas:

- 🔍 Testa conexão com Strapi
- 🖼️ Verifica acesso às imagens
- 📊 Mostra configurações atuais
- 🧪 Testa normalização de URLs

## 🔧 Como Usar

### 1. Verificar Configuração

Acesse `/test-images` no seu site para verificar se tudo está funcionando.

### 2. Atualizar Componentes

Substitua `Image` do Next.js pelo `StrapiImage` nos componentes:

```typescript
// Antes
import Image from "next/image";
<Image src={imageUrl} alt="..." />;

// Depois
import { StrapiImage } from "@/components/ui/strapi-image";
<StrapiImage src={imageUrl} alt="..." />;
```

### 3. Verificar Variável de Ambiente

Certifique-se de que `NEXT_PUBLIC_STRAPI_URL` está configurada corretamente:

```env
# Desenvolvimento
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Produção
NEXT_PUBLIC_STRAPI_URL=https://strapi.ferres.io
```

## 🚀 Próximos Passos

### 1. Atualizar Outros Componentes

Atualize os seguintes componentes para usar `StrapiImage`:

- `src/components/ui/article-sidebar.tsx`
- `src/app/articles/[slug]/page.tsx`
- `src/components/home/sub-header.tsx`

### 2. Testar em Produção

1. Faça deploy das alterações
2. Acesse `/test-images` para verificar
3. Teste carregamento de artigos com imagens

### 3. Monitorar Logs

Fique atento aos logs do console para identificar problemas:

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build && npm start
```

## 🔍 Diagnóstico de Problemas

### Erro: "INVALID_IMAGE_OPTIMIZE_REQUEST"

**Causa**: Domínio não configurado no `next.config.ts`

**Solução**:

1. Verificar se `NEXT_PUBLIC_STRAPI_URL` está correta
2. Reiniciar o servidor de desenvolvimento
3. Limpar cache do Next.js: `rm -rf .next`

### Erro: "Failed to load resource"

**Causa**: URL da imagem incorreta

**Solução**:

1. Usar componente `StrapiImage`
2. Verificar se Strapi está acessível
3. Testar URL diretamente no navegador

### Erro: "Image optimization failed"

**Causa**: Problema com formato de imagem

**Solução**:

1. Verificar se imagem existe no Strapi
2. Testar com diferentes formatos (JPG, PNG, WebP)
3. Usar fallback do componente `StrapiImage`

## 📋 Checklist de Verificação

- [ ] `NEXT_PUBLIC_STRAPI_URL` configurada corretamente
- [ ] `next.config.ts` atualizado com domínios corretos
- [ ] Componente `StrapiImage` implementado
- [ ] Página `/test-images` funcionando
- [ ] Imagens carregando em artigos
- [ ] Fallback funcionando para imagens quebradas

## 🎯 Resultado Esperado

Após implementar essas correções:

- ✅ Imagens carregam corretamente
- ✅ Otimização do Next.js funciona
- ✅ Fallback para imagens quebradas
- ✅ Compatibilidade com diferentes domínios
- ✅ Performance otimizada

---

🔧 **Problema resolvido! As imagens devem funcionar corretamente agora.**
