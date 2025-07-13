import { NextRequest, NextResponse } from "next/server";
import { strapiPushService } from "@/lib/strapi-push-notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription, userAgent, userId } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Dados de subscription inválidos" },
        { status: 400 }
      );
    }

    // Verificar se já existe uma subscription com este endpoint
    const existingSubscription =
      await strapiPushService.findSubscriptionByEndpoint(subscription.endpoint);

    let result;
    if (existingSubscription) {
      // Atualizar subscription existente
      result = await strapiPushService.updateSubscription(
        existingSubscription.documentId,
        {
          userAgent,
          userId,
          subscriptionStatus: "active",
          lastUsed: new Date().toISOString(),
        }
      );
    } else {
      // Criar nova subscription
      result = await strapiPushService.createSubscription(
        subscription,
        userAgent,
        userId
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: existingSubscription
        ? "Subscription atualizada"
        : "Subscription criada",
    });
  } catch (error) {
    console.error("Erro ao salvar subscription:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
