/**
 * Teste simples da conexão com Strapi
 */

export async function testStrapiConnection() {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const apiUrl = `${strapiUrl}/api`;

  console.log("🔍 Testando conexão Strapi:");
  console.log("📍 Base URL:", strapiUrl);
  console.log("📍 API URL:", apiUrl);
  console.log(
    "🔑 Token:",
    process.env.STRAPI_API_TOKEN ? "Definido" : "NÃO DEFINIDO"
  );

  try {
    // Teste básico da API
    const response = await fetch(`${apiUrl}/articles`, {
      headers: {
        "Content-Type": "application/json",
        ...(process.env.STRAPI_API_TOKEN && {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        }),
      },
    });

    console.log("📡 Status da resposta:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Conexão bem-sucedida!");
      console.log("📊 Dados recebidos:", data);
      return { success: true, data };
    } else {
      console.log("❌ Erro na resposta:", response.status, response.statusText);
      return {
        success: false,
        error: `${response.status} - ${response.statusText}`,
      };
    }
  } catch (error) {
    console.log("❌ Erro de conexão:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
