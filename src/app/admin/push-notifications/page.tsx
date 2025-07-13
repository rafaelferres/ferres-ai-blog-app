"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Stats {
  total: number;
  active: number;
  inactive: number;
  invalid: number;
}

export default function PushNotificationsAdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCleaningUp, setIsCleaningUp] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/push-notifications/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!confirm("Deseja remover subscriptions inválidas e antigas?")) {
      return;
    }

    try {
      setIsCleaningUp(true);
      const response = await fetch("/api/push-notifications/cleanup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || ""}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `✅ Limpeza concluída! ${data.data.removed} subscriptions removidas.`
        );
        loadStats(); // Recarregar estatísticas
      } else {
        alert(`❌ Erro na limpeza: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro na limpeza:", error);
      alert("❌ Erro na limpeza. Verifique o console.");
    } finally {
      setIsCleaningUp(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      const response = await fetch("/api/webhook/strapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            process.env.NEXT_PUBLIC_STRAPI_WEBHOOK_SECRET || ""
          }`,
        },
        body: JSON.stringify({
          event: "entry.publish",
          model: "article",
          entry: {
            id: 999,
            title: "🧪 Teste de Notificação",
            slug: "teste-notificacao-admin",
            cover: { url: "/og-image.fw.png" },
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Notificação de teste enviada!");
      } else {
        alert(`❌ Erro no teste: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro no teste:", error);
      alert("❌ Erro no teste. Verifique o console.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Carregando estatísticas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            🔔 Push Notifications Admin
          </h1>
          <p className="text-muted-foreground">
            Gerencie e monitore as push notifications do blog
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-1">Total</h3>
            <div className="text-2xl font-bold">{stats?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              Subscriptions totais
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-1 text-green-600">Ativas</h3>
            <div className="text-2xl font-bold text-green-600">
              {stats?.active || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Recebendo notificações
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-1 text-yellow-600">
              Inativas
            </h3>
            <div className="text-2xl font-bold text-yellow-600">
              {stats?.inactive || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Pausadas pelos usuários
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-1 text-red-600">Inválidas</h3>
            <div className="text-2xl font-bold text-red-600">
              {stats?.invalid || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Subscriptions quebradas
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">
              🧹 Limpeza Automática
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Remove subscriptions inválidas e antigas (mais de 30 dias sem uso)
            </p>
            <Button
              onClick={handleCleanup}
              disabled={isCleaningUp}
              variant="outline"
              className="w-full"
            >
              {isCleaningUp ? "🔄 Limpando..." : "🧹 Executar Limpeza"}
            </Button>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">
              🧪 Teste de Notificação
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Envia uma notificação de teste para todos os usuários ativos
            </p>
            <Button onClick={handleTestNotification} className="w-full">
              📱 Enviar Teste
            </Button>
          </div>
        </div>

        {/* Informações */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">
            📊 Integração com Strapi
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            As subscriptions são armazenadas no Strapi como uma collection
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">APIs Disponíveis:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>
                  <code>GET /api/push-notifications/stats</code> - Estatísticas
                </li>
                <li>
                  <code>POST /api/push-notifications/cleanup</code> - Limpeza
                  (requer auth)
                </li>
                <li>
                  <code>GET /api/push-notifications/vapid-key</code> - Chave
                  pública
                </li>
                <li>
                  <code>POST /api/push-notifications/subscribe</code> - Nova
                  subscription
                </li>
                <li>
                  <code>POST /api/push-notifications/unsubscribe</code> -
                  Remover subscription
                </li>
                <li>
                  <code>POST /api/webhook/strapi</code> - Webhook do Strapi
                  (requer auth)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Collection no Strapi:</h4>
              <p className="text-sm text-muted-foreground">
                As subscriptions são salvas na collection{" "}
                <code>push-subscription</code>
                com campos para endpoint, chaves, status, preferências e
                metadados.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recursos Implementados:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✅ Persistência permanente no Strapi</li>
                <li>✅ Segmentação por categorias</li>
                <li>✅ Limpeza automática de subscriptions inválidas</li>
                <li>✅ Tracking de uso e metadados</li>
                <li>✅ Status management (ativo/inativo/inválido)</li>
                <li>✅ Analytics e estatísticas</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={loadStats} variant="outline" size="sm">
            🔄 Atualizar Estatísticas
          </Button>
        </div>
      </div>
    </div>
  );
}
