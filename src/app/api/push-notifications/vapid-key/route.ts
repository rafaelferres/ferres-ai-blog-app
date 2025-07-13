import { NextResponse } from "next/server";

export async function GET() {
  try {
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;

    if (!vapidPublicKey) {
      console.error("VAPID_PUBLIC_KEY não está definida");
      return NextResponse.json(
        { error: "VAPID key não configurada" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      vapidPublicKey,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erro ao obter VAPID key:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao obter VAPID key",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
