import { NextRequest, NextResponse } from "next/server";
import { notifyNewArticle } from "@/lib/strapi-push-notifications";

export async function POST(request: NextRequest) {
  try {
    // Verificar se o webhook tem o header de autorização correto
    const authHeader = request.headers.get("authorization");
    const webhookSecret = process.env.STRAPI_WEBHOOK_SECRET;

    if (
      !authHeader ||
      !webhookSecret ||
      authHeader !== `Bearer ${webhookSecret}`
    ) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { event, model, entry } = body;

    // Verificar se é um evento de publicação de artigo
    if (event === "entry.publish" && model === "article") {
      const article = entry;

      // Extrair informações do artigo
      const title = article.title || "Novo artigo";
      const slug = article.slug || "";
      const categories =
        article.categories?.map((cat: any) => cat.name || cat.slug) || [];

      // Enviar notificação
      await notifyNewArticle(title, slug, categories);

      return NextResponse.json({
        success: true,
        message: "Notificação enviada com sucesso",
        article: {
          title,
          slug,
          categories,
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Outros eventos podem ser tratados aqui
    return NextResponse.json({
      success: true,
      message: "Webhook recebido, mas nenhuma ação foi executada",
      event,
      model,
    });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

// Método GET para documentação da API
export async function GET() {
  return NextResponse.json({
    message: "Webhook para receber notificações do Strapi",
    endpoint: "/api/webhook/strapi",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_STRAPI_WEBHOOK_SECRET",
    },
    supportedEvents: ["entry.publish", "entry.update", "entry.delete"],
    models: ["article"],
    description:
      "Recebe notificações do Strapi e envia push notifications para usuários",
  });
}
