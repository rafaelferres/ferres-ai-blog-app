import { NextResponse } from "next/server";
import { strapiPushService } from "@/lib/strapi-push-notifications";

export async function GET() {
  try {
    const stats = await strapiPushService.getStats();

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
