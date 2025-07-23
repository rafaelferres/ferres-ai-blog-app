import { NextRequest, NextResponse } from "next/server";
import { resetWeeklyVisitCount } from "@/actions/articles";

export async function POST(request: NextRequest) {
  try {
    // Verificar se a requisição tem o token de autorização correto
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      console.error("CRON_SECRET não está definido");
      return NextResponse.json(
        { error: "Configuração do servidor incorreta" },
        { status: 500 }
      );
    }

    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
      console.error("Token de autorização inválido");
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    console.log("🔄 Iniciando reset semanal do visit_weekly_count...");

    // Executar o reset
    const result = await resetWeeklyVisitCount();

    if (result.success) {
      console.log("✅ Reset semanal concluído com sucesso!");
      return NextResponse.json({
        success: true,
        message: "Reset semanal do visit_weekly_count concluído",
        data: {
          totalArticles: result.totalArticles,
          successCount: result.successCount,
          errorCount: result.errorCount,
        },
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error("❌ Erro no reset semanal:", result.message);
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          error: result.error,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Erro inesperado no cron job:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro inesperado no cron job",
        error: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Método GET para testar a API route
export async function GET() {
  return NextResponse.json({
    message: "Cron job para reset semanal do visit_weekly_count",
    endpoint: "/api/cron/reset-weekly-visits",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_CRON_SECRET",
    },
    schedule: "Toda segunda-feira às 00:00 UTC",
  });
}
