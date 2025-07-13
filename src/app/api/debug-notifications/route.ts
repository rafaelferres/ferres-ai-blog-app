import { NextResponse } from "next/server";
import { strapiPushService } from "@/lib/strapi-push-notifications";

export async function GET() {
  try {
    // Buscar todas as subscriptions ativas
    const activeSubscriptions =
      await strapiPushService.getActiveSubscriptions();

    // Buscar estatísticas
    const stats = await strapiPushService.getStats();

    return NextResponse.json({
      success: true,
      debug: {
        activeSubscriptions: activeSubscriptions.map((sub) => ({
          id: sub.id,
          documentId: sub.documentId,
          endpoint: sub.endpoint.substring(0, 50) + "...",
          userAgent: sub.userAgent,
          subscriptionStatus: sub.subscriptionStatus,
          lastUsed: sub.lastUsed,
          createdAt: sub.createdAt,
          preferences: sub.preferences,
        })),
        stats,
        totalActiveSubscriptions: activeSubscriptions.length,
        vapidConfigured: !!(
          process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY
        ),
        strapiConfigured: !!(
          process.env.NEXT_PUBLIC_STRAPI_URL && process.env.STRAPI_API_TOKEN
        ),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro no debug:", error);
    return NextResponse.json(
      {
        error: "Erro ao buscar dados de debug",
        message: error instanceof Error ? error.message : "Erro desconhecido",
        debug: {
          vapidConfigured: !!(
            process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY
          ),
          strapiConfigured: !!(
            process.env.NEXT_PUBLIC_STRAPI_URL && process.env.STRAPI_API_TOKEN
          ),
        },
      },
      { status: 500 }
    );
  }
}
