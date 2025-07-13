import { NextRequest, NextResponse } from "next/server";
import { sendPushNotification } from "@/lib/push-notifications";

export async function POST(request: NextRequest) {
  try {
    // Verificar se a requisição tem o token de autorização correto
    const authHeader = request.headers.get("authorization");
    const webhookSecret = process.env.STRAPI_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("STRAPI_WEBHOOK_SECRET não está definido");
      return NextResponse.json(
        { error: "Configuração do servidor incorreta" },
        { status: 500 }
      );
    }

    if (!authHeader || authHeader !== `Bearer ${webhookSecret}`) {
      console.error("Token de autorização inválido para webhook");
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Parsear o corpo da requisição
    const body = await request.json();

    console.log("📡 Webhook recebido do Strapi:", {
      event: body.event,
      model: body.model,
      entry: body.entry?.title || body.entry?.id,
    });

    // Verificar se é um evento de publicação de artigo
    if (body.event === "entry.publish" && body.model === "article") {
      const article = body.entry;

      // Preparar dados da notificação
      const notificationData = {
        title: `📰 Novo artigo publicado!`,
        body: `${article.title} - Confira agora no blog!`,
        icon: "/icon-192x192.fw.png",
        badge: "/icon-192x192.fw.png",
        image: article.cover?.url || "/og-image.fw.png",
        tag: "new-article",
        data: {
          url: `/articles/${article.slug}`,
          articleId: article.id,
          timestamp: new Date().toISOString(),
        },
      };

      // Enviar push notification
      try {
        const result = await sendPushNotification(notificationData);
        console.log("✅ Push notification enviada com sucesso:", result);
      } catch (error) {
        console.error("❌ Erro ao enviar push notification:", error);
        // Não falhar o webhook por causa do erro de push notification
      }
    }

    // Responder com sucesso
    return NextResponse.json({
      success: true,
      message: "Webhook processado com sucesso",
      timestamp: new Date().toISOString(),
      event: body.event,
      processed: body.event === "entry.publish" && body.model === "article",
    });
  } catch (error) {
    console.error("❌ Erro no webhook do Strapi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar webhook",
        error: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
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
