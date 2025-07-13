"use client";

import { useState, useEffect } from "react";
import { X, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AutoPushNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vapidPublicKey, setVapidPublicKey] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se deve mostrar a solicitação
    checkShouldShowNotification();
    loadVapidKey();
  }, []);

  const checkShouldShowNotification = () => {
    if (typeof window === "undefined") return;

    // Verificar suporte
    const isSupported = "serviceWorker" in navigator && "PushManager" in window;
    if (!isSupported) return;

    // Verificar se já foi perguntado antes
    const hasAsked = localStorage.getItem("push-notification-asked");
    if (hasAsked === "true") return;

    // Verificar se já tem permissão
    if (Notification.permission === "granted") {
      localStorage.setItem("push-notification-asked", "true");
      return;
    }

    // Verificar se foi negado
    if (Notification.permission === "denied") {
      localStorage.setItem("push-notification-asked", "true");
      return;
    }

    // Aguardar um pouco antes de mostrar (para não ser muito intrusivo)
    setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 3 segundos após carregar a página
  };

  const loadVapidKey = async () => {
    try {
      const response = await fetch("/api/push-notifications/vapid-key");
      const data = await response.json();

      if (data.success) {
        setVapidPublicKey(data.vapidPublicKey);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar VAPID key:", error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const handleAccept = async () => {
    if (!vapidPublicKey) {
      console.error("VAPID key não carregada");
      return;
    }

    setIsLoading(true);

    try {
      // Solicitar permissão
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        // Registrar service worker
        const swPath =
          process.env.NODE_ENV === "development" ? "/sw-dev.js" : "/sw.js";
        const registration = await navigator.serviceWorker.register(swPath);
        await registration.update();
        await navigator.serviceWorker.ready;

        // Criar subscription
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        // Enviar subscription para o servidor
        const response = await fetch("/api/push-notifications/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription: subscription.toJSON() }),
        });

        const data = await response.json();

        if (data.success) {
          console.log("✅ Notificações ativadas com sucesso!");

          // Mostrar notificação de confirmação
          new Notification("🎉 Notificações ativadas!", {
            body: "Você receberá notificações quando novos artigos forem publicados.",
            icon: "/icon-192x192.fw.png",
          });
        }
      }
    } catch (error) {
      console.error("❌ Erro ao ativar notificações:", error);
    } finally {
      setIsLoading(false);
      setIsVisible(false);
      localStorage.setItem("push-notification-asked", "true");
    }
  };

  const handleDecline = () => {
    setIsVisible(false);
    localStorage.setItem("push-notification-asked", "true");
  };

  const handleClose = () => {
    setIsVisible(false);
    // Não marcar como perguntado, vai aparecer novamente na próxima visita
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm">Notificações</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-sm hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Quer receber notificações quando publicarmos novos artigos?
        </p>

        <div className="flex gap-2">
          <Button
            onClick={handleAccept}
            disabled={isLoading}
            size="sm"
            className="flex-1"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-2" />
                Ativando...
              </>
            ) : (
              <>
                <Bell className="h-3 w-3 mr-1" />
                Sim, quero
              </>
            )}
          </Button>

          <Button
            onClick={handleDecline}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <BellOff className="h-3 w-3 mr-1" />
            Não, obrigado
          </Button>
        </div>
      </div>
    </div>
  );
}
