"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "./toast";

export function NotificationToggle() {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    checkNotificationSupport();
  }, []);

  const ensureServiceWorkerRegistered = async () => {
    try {
      // Tentar obter o service worker já registrado
      const registration = await navigator.serviceWorker.ready;
      console.log("🔧 Service worker já registrado");
      return registration;
    } catch {
      // Se não estiver registrado, registrar agora
      console.log("🔧 Registrando service worker...");
      const registration = await navigator.serviceWorker.register("/sw.js");
      await registration.update();
      await navigator.serviceWorker.ready;
      console.log("✅ Service worker registrado com sucesso");
      return registration;
    }
  };

  const checkNotificationSupport = async () => {
    if (typeof window === "undefined") return;

    console.log("🔍 Verificando suporte a notificações...");

    // Verificar se push notifications são suportadas
    if (!("serviceWorker" in navigator)) {
      console.error("❌ Service Worker não suportado");
      setError("Service Worker não suportado");
      return;
    }

    if (!("PushManager" in window)) {
      console.error("❌ Push Manager não suportado");
      setError("Push notifications não suportadas");
      return;
    }

    console.log("✅ Suporte confirmado");
    setIsSupported(true);
    setError(null);

    // Verificar status atual
    try {
      const permission = Notification.permission;
      console.log("🔐 Permissão atual:", permission);

      if (permission === "granted") {
        console.log("🔄 Verificando service worker...");
        try {
          const registration = await ensureServiceWorkerRegistered();
          console.log("✅ Service worker ready");

          const subscription = await registration.pushManager.getSubscription();
          console.log("📡 Subscription atual:", !!subscription);
          setIsEnabled(!!subscription);
        } catch {
          console.log("⚠️ Erro ao verificar service worker");
          setIsEnabled(false);
        }
      }
    } catch (error) {
      console.error("❌ Erro ao verificar subscription:", error);
      setError("Erro ao verificar estado das notificações");
    }
  };

  const toggleNotifications = async () => {
    if (!isSupported) {
      showToast("Notificações não são suportadas neste navegador", "error");
      return;
    }

    console.log("🔄 Alternando notificações...");
    setLoading(true);
    setError(null);

    try {
      if (isEnabled) {
        console.log("❌ Desativando notificações...");
        await unsubscribeFromNotifications();
      } else {
        console.log("✅ Ativando notificações...");
        await subscribeToNotifications();
      }
    } catch (error) {
      console.error("❌ Erro ao alterar notificações:", error);
      setError(error instanceof Error ? error.message : "Erro desconhecido");
      showToast("Erro ao alterar configuração de notificações", "error");
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNotifications = async () => {
    try {
      console.log("1️⃣ Solicitando permissão...");

      // Solicitar permissão
      const permission = await Notification.requestPermission();
      console.log("🔐 Permissão obtida:", permission);

      if (permission !== "granted") {
        throw new Error("Permissão para notificações negada");
      }

      console.log("2️⃣ Obtendo chave VAPID...");

      // Obter chave VAPID
      const vapidResponse = await fetch("/api/push-notifications/vapid-key");
      console.log("📡 Response VAPID:", vapidResponse.status);

      if (!vapidResponse.ok) {
        throw new Error(`Erro ao obter chave VAPID: ${vapidResponse.status}`);
      }

      const vapidData = await vapidResponse.json();
      console.log("🔑 Chave VAPID obtida:", !!vapidData.publicKey);

      console.log("3️⃣ Registrando service worker...");

      // Garantir que o service worker está registrado
      const registration = await ensureServiceWorkerRegistered();

      console.log("4️⃣ Criando subscription...");

      // Criar subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidData.publicKey,
      });

      console.log("📱 Subscription criada:", !!subscription);

      console.log("5️⃣ Salvando no servidor...");

      // Enviar para o servidor
      const response = await fetch("/api/push-notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
          userAgent: navigator.userAgent,
        }),
      });

      console.log("💾 Response servidor:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("❌ Erro do servidor:", errorData);
        throw new Error(`Erro ao salvar subscription: ${response.status}`);
      }

      console.log("✅ Notificações ativadas com sucesso!");
      setIsEnabled(true);
      showToast("Notificações ativadas com sucesso! 🔔", "success");
    } catch (error) {
      console.error("❌ Erro detalhado:", error);
      throw error;
    }
  };

  const unsubscribeFromNotifications = async () => {
    try {
      console.log("1️⃣ Obtendo subscription atual...");

      // Garantir que o service worker está registrado
      const registration = await ensureServiceWorkerRegistered();

      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        console.log("2️⃣ Cancelando subscription no navegador...");

        // Cancelar subscription no navegador
        await subscription.unsubscribe();
        console.log("✅ Subscription cancelada no navegador");

        console.log("3️⃣ Removendo do servidor...");

        // Remover do servidor
        const response = await fetch("/api/push-notifications/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
          }),
        });

        console.log("💾 Response servidor:", response.status);

        if (!response.ok) {
          console.warn("⚠️ Erro ao remover do servidor, mas continuando...");
        }
      }

      console.log("✅ Notificações desativadas com sucesso!");
      setIsEnabled(false);
      showToast("Notificações desativadas", "success");
    } catch (error) {
      console.error("❌ Erro ao desativar:", error);
      throw error;
    }
  };

  if (!isSupported && !error) {
    return null; // Ainda verificando ou não há suporte
  }

  // Se há erro, mostrar botão com estado de erro
  if (error) {
    return (
      <button
        onClick={checkNotificationSupport}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
        title={`Erro: ${error} (clique para tentar novamente)`}
      >
        <AlertCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Erro nas Notificações</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleNotifications}
      disabled={loading}
      className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${
          isEnabled
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border"
        }
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      title={isEnabled ? "Desativar notificações" : "Ativar notificações"}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isEnabled ? (
        <Bell className="w-4 h-4" />
      ) : (
        <BellOff className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {loading
          ? "Processando..."
          : isEnabled
          ? "Notificações Ativadas"
          : "Ativar Notificações"}
      </span>
    </button>
  );
}
