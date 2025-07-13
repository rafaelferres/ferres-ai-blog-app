import { NextRequest, NextResponse } from "next/server";
import { notifyNewArticle } from "@/lib/strapi-push-notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, categories = [] } = body;

    // Usar valores padrão se não fornecidos
    const articleTitle = title || "Artigo de Teste das Notificações!";
    const articleSlug = slug || "teste-notificacao";
    const articleCategories =
      categories.length > 0 ? categories : ["Tecnologia"];

    // Enviar notificação
    await notifyNewArticle(articleTitle, articleSlug, articleCategories);

    return NextResponse.json({
      success: true,
      message: "Notificação de teste enviada com sucesso",
      article: {
        title: articleTitle,
        slug: articleSlug,
        categories: articleCategories,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro no teste de notificação:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

// Método GET para documentação
export async function GET() {
  return NextResponse.json({
    message: "Endpoint de teste para notificações push",
    endpoint: "/api/test-notification",
    method: "POST",
    body: {
      title: "Título do artigo (opcional)",
      slug: "slug-do-artigo (opcional)",
      categories: ["categoria1", "categoria2"], // opcional
    },
    description:
      "Envia uma notificação de teste para todos os usuários inscritos",
    note: "Este endpoint é apenas para testes e não requer autenticação",
  });
}
