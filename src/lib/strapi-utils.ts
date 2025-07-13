/**
 * Utilitários para trabalhar com o Strapi
 */

/**
 * Formata a URL de uma imagem do Strapi
 */
export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  // Se já é uma URL completa, retorna como está
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Se é uma URL relativa, adiciona o domínio do Strapi
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${strapiUrl}${url}`;
}

/**
 * Formata a data do Strapi para o formato brasileiro
 */
export function formatStrapiDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formata a data do Strapi para o formato brasileiro (curto)
 */
export function formatStrapiDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR");
}

/**
 * Extrai o texto de um campo Rich Text do Strapi
 */
export function extractTextFromRichText(content: string): string {
  // Remove tags HTML básicas
  return content
    .replace(/<[^>]*>/g, "") // Remove tags HTML
    .replace(/&nbsp;/g, " ") // Substitui &nbsp; por espaço
    .replace(/&amp;/g, "&") // Substitui &amp; por &
    .replace(/&lt;/g, "<") // Substitui &lt; por <
    .replace(/&gt;/g, ">") // Substitui &gt; por >
    .replace(/&quot;/g, '"') // Substitui &quot; por "
    .trim();
}

/**
 * Gera um excerpt a partir do conteúdo
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 150
): string {
  const text = extractTextFromRichText(content);
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + "...";
}

// Tipo para campo de mídia do Strapi
interface StrapiMediaField {
  data: {
    attributes: {
      url: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    };
  } | null;
}

/**
 * Verifica se um campo de mídia do Strapi tem dados
 */
export function hasStrapiMedia(
  mediaField: StrapiMediaField | null | undefined
): boolean {
  return !!(
    mediaField &&
    mediaField.data &&
    mediaField.data.attributes &&
    mediaField.data.attributes.url
  );
}

/**
 * Obtém a URL de uma mídia do Strapi
 */
export function getStrapiMediaUrl(
  mediaField: StrapiMediaField | null | undefined
): string {
  if (!hasStrapiMedia(mediaField)) return "";

  return getStrapiImageUrl(mediaField!.data!.attributes.url);
}

/**
 * Obtém o texto alternativo de uma mídia do Strapi
 */
export function getStrapiMediaAlt(
  mediaField: StrapiMediaField | null | undefined
): string {
  if (!hasStrapiMedia(mediaField)) return "";

  return mediaField!.data!.attributes.alternativeText || "";
}

/**
 * Formata um slug para URL amigável
 */
export function formatSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Verifica se uma string é um slug válido
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}
