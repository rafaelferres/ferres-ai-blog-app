"use client";

import { useState, useEffect } from "react";
import { X, Bell, BellOff } from "lucide-react";
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

export default function SendPulseNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendPulseLoaded, setSendPulseLoaded] = useState(false);

  useEffect(() => {
    // Verificar se o SendPulse foi carregado
    const checkSendPulseLoaded = () => {
      if (window.sendpulse_webpush) {
        setSendPulseLoaded(true);
        window.sendpulse_webpush.init();

        // Verificar se já está inscrito
        window.sendpulse_webpush.isSubscribed();

        // Verificar se deve mostrar a solicitação
        checkShouldShowNotification();
      } else {
        // Tentar novamente em 500ms
        setTimeout(checkSendPulseLoaded, 500);
      }
    };

    checkSendPulseLoaded();
  }, []);

  const checkShouldShowNotification = () => {
    if (typeof window === "undefined") return;

    // Verificar suporte a notificações
    if (!("Notification" in window)) return;

    // Verificar se já foi perguntado antes
    const hasAsked = localStorage.getItem("sendpulse-notification-asked");
    if (hasAsked === "true") return;

    // Verificar se já tem permissão
    if (Notification.permission === "granted") {
      localStorage.setItem("sendpulse-notification-asked", "true");
      return;
    }

    // Verificar se foi negado
    if (Notification.permission === "denied") {
      localStorage.setItem("sendpulse-notification-asked", "true");
      return;
    }

    // Verificar se já está inscrito
    if (window.sendpulse_webpush?.isSubscribed()) {
      localStorage.setItem("sendpulse-notification-asked", "true");
      return;
    }

    // Aguardar um pouco antes de mostrar (para não ser muito intrusivo)
    setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 3 segundos após carregar a página
  };

  const handleAccept = async () => {
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
      setIsVisible(false);
      localStorage.setItem("sendpulse-notification-asked", "true");
    }
  };

  const handleDecline = () => {
    setIsVisible(false);
    localStorage.setItem("sendpulse-notification-asked", "true");
  };

  const handleClose = () => {
    setIsVisible(false);
    // Não marcar como perguntado, vai aparecer novamente na próxima visita
  };

  if (!isVisible || !sendPulseLoaded) return null;

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
