import { NextRequest, NextResponse } from "next/server";
import { cleanupOldSubscriptions } from "@/lib/strapi-push-notifications";

export async function POST(request: NextRequest) {
  try {
    // Verificar se o request tem o header de autorização correto
    const authHeader = request.headers.get("authorization");
    const expectedToken = process.env.CRON_SECRET;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Executar limpeza
    await cleanupOldSubscriptions();

    return NextResponse.json({
      success: true,
      message: "Limpeza executada com sucesso",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro na limpeza automática:", error);
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
    message: "Limpeza automática de push subscriptions inválidas",
    endpoint: "/api/push-notifications/cleanup",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_CRON_SECRET",
    },
    description:
      "Remove subscriptions inválidas ou antigas (mais de 30 dias sem uso)",
    schedule: "Recomendado: diário ou semanal",
  });
}
