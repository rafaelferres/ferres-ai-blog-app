import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const token = process.env.STRAPI_API_TOKEN;

  const tests = [];

  try {
    // Teste 1: Conexão básica
    const basicResponse = await fetch(`${baseUrl}/api`);
    tests.push({
      name: "Conexão básica",
      status: basicResponse.status,
      success: basicResponse.ok,
      url: `${baseUrl}/api`,
    });

    // Teste 2: Token definido
    tests.push({
      name: "Token definido",
      status: token ? "OK" : "MISSING",
      success: !!token,
      url: "env",
    });

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "STRAPI_API_TOKEN não definido",
        tests,
      });
    }

    // Teste 3: Autenticação
    const authResponse = await fetch(`${baseUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    tests.push({
      name: "Autenticação",
      status: authResponse.status,
      success: authResponse.ok,
      url: `${baseUrl}/api/users/me`,
    });

    // Teste 4: Collection push-subscriptions
    const collectionResponse = await fetch(
      `${baseUrl}/api/push-subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let collectionData;
    if (collectionResponse.ok) {
      collectionData = await collectionResponse.json();
    } else {
      collectionData = await collectionResponse.text();
    }

    tests.push({
      name: "Collection push-subscriptions",
      status: collectionResponse.status,
      success: collectionResponse.ok,
      url: `${baseUrl}/api/push-subscriptions`,
      data: collectionResponse.ok
        ? `${collectionData.data?.length || 0} registros`
        : collectionData,
    });

    // Teste 5: Criar uma subscription de teste
    if (collectionResponse.ok) {
      const testSubscription = {
        endpoint: "https://test-endpoint.com/" + Date.now(),
        p256dh: "test-p256dh",
        auth: "test-auth",
        subscriptionStatus: "active",
        userAgent: "Test Agent",
        lastUsed: new Date().toISOString(),
        preferences: {
          categories: [],
          allArticles: true,
        },
        metadata: {
          browser: "Test",
          os: "Test",
          subscriptionDate: new Date().toISOString(),
        },
      };

      const createResponse = await fetch(`${baseUrl}/api/push-subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: testSubscription }),
      });

      tests.push({
        name: "Criar subscription de teste",
        status: createResponse.status,
        success: createResponse.ok,
        url: `${baseUrl}/api/push-subscriptions`,
        data: createResponse.ok
          ? "Subscription criada com sucesso"
          : await createResponse.text(),
      });

      // Se criou com sucesso, tentar deletar
      if (createResponse.ok) {
        const createdData = await createResponse.json();
        const deleteResponse = await fetch(
          `${baseUrl}/api/push-subscriptions/${createdData.data.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        tests.push({
          name: "Deletar subscription de teste",
          status: deleteResponse.status,
          success: deleteResponse.ok,
          url: `${baseUrl}/api/push-subscriptions/${createdData.data.id}`,
          data: deleteResponse.ok
            ? "Subscription deletada com sucesso"
            : await deleteResponse.text(),
        });
      }
    }

    return NextResponse.json({
      success: tests.every((test) => test.success),
      message: "Testes de conexão com Strapi concluídos",
      tests,
      config: {
        baseUrl,
        hasToken: !!token,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erro ao testar conexão com Strapi",
      error: error instanceof Error ? error.message : "Erro desconhecido",
      tests,
    });
  }
}
