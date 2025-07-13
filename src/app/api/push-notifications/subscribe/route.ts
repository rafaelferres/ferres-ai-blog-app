import { NextRequest, NextResponse } from "next/server";
import { saveSubscription, PushSubscription } from "@/lib/push-notifications";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscription } = body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: "Subscription inválida" },
        { status: 400 }
      );
    }

    // Obter User-Agent para identificar o dispositivo
    const userAgent = request.headers.get("user-agent") || "Unknown";

    // Salvar a subscription
    const savedSubscription = saveSubscription(
      subscription as PushSubscription,
      userAgent
    );

    console.log("✅ Nova subscription salva:", savedSubscription.id);

    return NextResponse.json({
      success: true,
      message: "Subscription criada com sucesso",
      subscriptionId: savedSubscription.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erro ao criar subscription:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao criar subscription",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
