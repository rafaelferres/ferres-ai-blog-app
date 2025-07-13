import { NextResponse } from "next/server";
import { strapiPushService } from "@/lib/strapi-push-notifications";

export async function GET() {
  try {
    console.log("🧪 Testing notification system...");

    // Test 1: Get statistics
    let stats;
    try {
      stats = await strapiPushService.getStats();
      console.log("📊 Stats:", stats);
    } catch (error) {
      console.error("❌ Erro ao obter estatísticas:", (error as Error).message);
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao conectar com Strapi",
          message: (error as Error).message,
          suggestion:
            "Verifique se o Strapi está rodando e se a collection 'push-subscriptions' foi criada",
        },
        { status: 500 }
      );
    }

    // Test 2: Get active subscriptions
    let activeSubscriptions;
    try {
      activeSubscriptions = await strapiPushService.getActiveSubscriptions();
      console.log(`📱 Subscriptions ativas: ${activeSubscriptions.length}`);
    } catch (error) {
      console.error(
        "❌ Erro ao obter subscriptions:",
        (error as Error).message
      );
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao buscar subscriptions",
          message: (error as Error).message,
          suggestion:
            "Verifique se a collection 'push-subscriptions' existe no Strapi",
        },
        { status: 500 }
      );
    }

    // Test 3: Send test notification (if there are subscriptions)
    if (activeSubscriptions.length > 0) {
      try {
        const result = await strapiPushService.sendNotificationToAll(
          "🧪 Teste de Notificação",
          "Esta é uma notificação de teste para verificar se o sistema está funcionando!",
          { test: true }
        );

        console.log(
          `✅ Teste enviado: ${result.success} sucessos, ${result.failed} falhas`
        );

        return NextResponse.json({
          success: true,
          message: "Sistema de notificações funcionando!",
          stats,
          activeSubscriptions: activeSubscriptions.length,
          testResult: result,
        });
      } catch (error) {
        console.error("❌ Erro ao enviar teste:", (error as Error).message);
        return NextResponse.json(
          {
            success: false,
            error: "Erro ao enviar notificação de teste",
            message: (error as Error).message,
            stats,
            activeSubscriptions: activeSubscriptions.length,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({
        success: true,
        message: "Sistema conectado, mas sem subscriptions ativas",
        stats,
        activeSubscriptions: 0,
        suggestion:
          "Ative as notificações em um dispositivo para testar o envio",
      });
    }
  } catch (error) {
    console.error("❌ Erro geral:", (error as Error).message);
    return NextResponse.json(
      {
        success: false,
        error: "Erro geral no sistema",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
