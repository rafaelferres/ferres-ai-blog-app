"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Extensão do Window para incluir SendPulse
declare global {
  interface Window {
    sendpulse_webpush?: {
      subscribe: () => void;
      unsubscribe: () => void;
      isSubscribed: () => boolean;
      getSubscriptionId: () => string | null;
      init: () => void;
    };
  }
}

interface SendPulseManagerProps {
  className?: string;
}

export default function SendPulseManager({ className }: SendPulseManagerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendPulseLoaded, setSendPulseLoaded] = useState(false);

  useEffect(() => {
    checkSupport();
    checkSendPulseLoaded();
  }, []);

  const checkSupport = () => {
    if (typeof window !== "undefined") {
      const supported = "Notification" in window;
      setIsSupported(supported);

      if (supported) {
        setPermission(Notification.permission);
      }
    }
  };

  const checkSendPulseLoaded = () => {
    if (window.sendpulse_webpush) {
      setSendPulseLoaded(true);
      window.sendpulse_webpush.init();

      // Verificar se já está inscrito
      const subscribed = window.sendpulse_webpush.isSubscribed();
      setIsSubscribed(subscribed);
    } else {
      // Tentar novamente em 500ms
      setTimeout(checkSendPulseLoaded, 500);
    }
  };

  const subscribe = async () => {
    if (!sendPulseLoaded || !window.sendpulse_webpush) {
      console.error("SendPulse não carregado ainda");
      return;
    }

    setIsLoading(true);

    try {
      // Inscrever usando SendPulse
      await window.sendpulse_webpush.subscribe();

      // Verificar se foi inscrito com sucesso
      const subscribed = window.sendpulse_webpush.isSubscribed();
      setIsSubscribed(subscribed);

      // Atualizar permissão
      setPermission(Notification.permission);

      if (subscribed) {
        console.log("✅ Notificações ativadas com sucesso!");

        // Mostrar notificação de confirmação se permitido
        if (Notification.permission === "granted") {
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
    }
  };

  const unsubscribe = async () => {
    if (!sendPulseLoaded || !window.sendpulse_webpush) {
      console.error("SendPulse não carregado ainda");
      return;
    }

    setIsLoading(true);

    try {
      // Desinscrever usando SendPulse
      await window.sendpulse_webpush.unsubscribe();

      // Verificar se foi desinscrito com sucesso
      const subscribed = window.sendpulse_webpush.isSubscribed();
      setIsSubscribed(subscribed);

      if (!subscribed) {
        console.log("✅ Notificações desativadas com sucesso!");
      }
    } catch (error) {
      console.error("❌ Erro ao desativar notificações:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Não renderizar se não houver suporte ou SendPulse não carregado
  if (!isSupported || !sendPulseLoaded) {
    return null;
  }

  return (
    <div className={`sendpulse-manager ${className || ""}`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">🔔 Notificações</span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              permission === "granted"
                ? "bg-green-100 text-green-800"
                : permission === "denied"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {permission === "granted"
              ? "Permitidas"
              : permission === "denied"
              ? "Negadas"
              : "Não solicitadas"}
          </span>
        </div>

        {permission === "granted" && (
          <Button
            onClick={isSubscribed ? unsubscribe : subscribe}
            disabled={isLoading}
            variant={isSubscribed ? "outline" : "default"}
            size="sm"
          >
            {isLoading
              ? "⏳ Processando..."
              : isSubscribed
              ? "Desativar"
              : "Ativar"}
          </Button>
        )}

        {permission === "default" && (
          <Button onClick={subscribe} disabled={isLoading} size="sm">
            {isLoading ? "⏳ Processando..." : "Ativar Notificações"}
          </Button>
        )}
      </div>
    </div>
  );
}
