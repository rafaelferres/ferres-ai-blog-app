import { NextRequest, NextResponse } from "next/server";
import { strapiPushService } from "@/lib/strapi-push-notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint é obrigatório" },
        { status: 400 }
      );
    }

    const removed = await strapiPushService.removeSubscription(endpoint);

    if (!removed) {
      return NextResponse.json(
        { error: "Subscription não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscription removida com sucesso",
    });
  } catch (error) {
    console.error("Erro ao remover subscription:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
