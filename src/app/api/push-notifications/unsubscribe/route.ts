import { NextRequest, NextResponse } from "next/server";
import { removeSubscription } from "@/lib/push-notifications";

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

    // Remover a subscription
    const removed = removeSubscription(endpoint);

    if (removed) {
      console.log("✅ Subscription removida:", endpoint);
      return NextResponse.json({
        success: true,
        message: "Subscription removida com sucesso",
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        { error: "Subscription não encontrada" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("❌ Erro ao remover subscription:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao remover subscription",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
