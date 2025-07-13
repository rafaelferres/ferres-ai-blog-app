// Script para testar imagens do Strapi
export async function testStrapiImages() {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  console.log("🔍 Testando configuração de imagens do Strapi...");
  console.log("📡 URL do Strapi:", strapiUrl);

  try {
    // Testar se o Strapi está respondendo
    const response = await fetch(
      `${strapiUrl}/api/articles?populate=*&pagination[limit]=1`
    );

    if (!response.ok) {
      throw new Error(`Strapi não está respondendo: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Strapi está respondendo corretamente");

    if (data.data && data.data.length > 0) {
      const article = data.data[0];
      if (article.attributes.cover) {
        const imageUrl = article.attributes.cover.data.attributes.url;
        console.log("🖼️ URL da imagem encontrada:", imageUrl);

        // Testar se a imagem está acessível
        const imageResponse = await fetch(`${strapiUrl}${imageUrl}`);
        if (imageResponse.ok) {
          console.log("✅ Imagem está acessível");
        } else {
          console.log("❌ Imagem não está acessível:", imageResponse.status);
        }
      } else {
        console.log("ℹ️ Nenhuma imagem encontrada no artigo");
      }
    }
  } catch (error) {
    console.error("❌ Erro ao testar Strapi:", error);
  }
}

// Função para normalizar URL do Strapi (mesma lógica do componente)
export function normalizeStrapiUrl(url: string) {
  if (!url) return "";

  // Se já é uma URL completa, retorna como está
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Se é uma URL relativa, adiciona o domínio do Strapi
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${strapiUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}
