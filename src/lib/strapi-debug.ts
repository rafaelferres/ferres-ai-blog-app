/**
 * Arquivo de debug para testar a conexão com o Strapi
 */

export async function debugStrapiConnection() {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const strapiToken = process.env.STRAPI_API_TOKEN;

  console.log("🔍 Debug da conexão Strapi:");
  console.log("📍 STRAPI_URL:", strapiUrl);
  console.log("📍 API_URL:", `${strapiUrl}/api`);
  console.log("🔑 TOKEN definido:", !!strapiToken);
  console.log(
    "🔑 TOKEN (primeiros 10 chars):",
    strapiToken?.substring(0, 10) + "..."
  );

  // Teste básico de conectividade
  try {
    console.log("🌐 Testando conectividade básica...");
    const basicResponse = await fetch(strapiUrl);
    console.log("✅ Servidor responde:", basicResponse.status);

    if (basicResponse.status === 404) {
      console.log(
        "❌ Servidor retornou 404 - verifique se o Strapi está rodando"
      );
    }
  } catch (error) {
    console.log("❌ Erro de conectividade:", error);
  }

  // Teste da API v5
  try {
    console.log("🔗 Testando endpoint da API v5...");
    const apiResponse = await fetch(`${strapiUrl}/api`, {
      headers: strapiToken
        ? {
            Authorization: `Bearer ${strapiToken}`,
            "Content-Type": "application/json",
          }
        : {},
    });
    console.log("📡 API responde:", apiResponse.status);

    if (apiResponse.status === 404) {
      console.log("❌ Endpoint /api não encontrado - verifique se é Strapi v5");
    }
  } catch (error) {
    console.log("❌ Erro na API:", error);
  }

  // Teste específico de collections
  const collections = ["articles", "categories", "tags", "users", "authors"];

  for (const collection of collections) {
    try {
      console.log(`📁 Testando collection: ${collection}`);
      const collectionResponse = await fetch(`${strapiUrl}/api/${collection}`, {
        headers: strapiToken
          ? {
              Authorization: `Bearer ${strapiToken}`,
              "Content-Type": "application/json",
            }
          : {},
      });
      console.log(`  Status: ${collectionResponse.status}`);

      if (collectionResponse.status === 404) {
        console.log(`  ❌ Collection '${collection}' não encontrada no Strapi`);
      } else if (collectionResponse.status === 403) {
        console.log(`  ⚠️ Sem permissão para acessar '${collection}'`);
      } else if (collectionResponse.status === 200) {
        console.log(`  ✅ Collection '${collection}' está acessível`);
      }
    } catch (error) {
      console.log(`  ❌ Erro ao testar ${collection}:`, error);
    }
  }
}

export async function testStrapiClient() {
  try {
    // Importar o cliente dinamicamente para evitar problemas de SSR
    const { strapiClient } = await import("./strapi");

    console.log("🔧 Testando cliente Strapi...");

    // Teste com uma collection simples
    const response = await strapiClient.collection("articles").find({
      pagination: { limit: 1 },
    });

    console.log("✅ Cliente Strapi funcionando!");
    console.log("📊 Resposta:", response);

    return true;
  } catch (error) {
    console.log("❌ Erro no cliente Strapi:", error);
    return false;
  }
}
