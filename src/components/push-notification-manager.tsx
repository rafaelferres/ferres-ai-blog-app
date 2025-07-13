"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PushNotificationManagerProps {
  className?: string;
}

export default function PushNotificationManager({
  className,
}: PushNotificationManagerProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vapidPublicKey, setVapidPublicKey] = useState<string | null>(null);

  // Verificar suporte e carregar estados iniciais
  useEffect(() => {
    checkSupport();
    loadVapidKey();
  }, []);

  // Verificar suporte a service workers e push notifications
  const checkSupport = () => {
    if (typeof window !== "undefined") {
      const supported = "serviceWorker" in navigator && "PushManager" in window;
      setIsSupported(supported);

      if (supported) {
        setPermission(Notification.permission);
        checkSubscriptionStatus();
      }
    }
  };

  // Carregar VAPID key do servidor
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

  // Verificar se já está subscrito
  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      }
    } catch (error) {
      console.error("❌ Erro ao verificar subscription:", error);
    }
  };

  // Converter VAPID key para Uint8Array
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

  // Registrar service worker
  const registerServiceWorker = async () => {
    try {
      // Primeiro registrar o service worker principal
      const registration = await navigator.serviceWorker.register("/sw.js");

      // Importar o service worker de push notifications
      await registration.update();

      // Aguardar ativação
      await navigator.serviceWorker.ready;

      return registration;
    } catch (error) {
      console.error("❌ Erro ao registrar service worker:", error);
      throw error;
    }
  };

  // Solicitar permissão e criar subscription
  const subscribe = async () => {
    if (!vapidPublicKey) {
      alert("VAPID key não carregada. Tente novamente.");
      return;
    }

    setIsLoading(true);

    try {
      // Solicitar permissão
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission !== "granted") {
        alert("Permissão para notificações negada.");
        return;
      }

      // Registrar service worker
      const registration = await registerServiceWorker();

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
        body: JSON.stringify({ subscription }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubscribed(true);
        console.log("✅ Subscription criada com sucesso!");
        alert(
          "Notificações ativadas! Você receberá notificações de novos artigos."
        );
      } else {
        throw new Error(data.message || "Erro ao criar subscription");
      }
    } catch (error) {
      console.error("❌ Erro ao criar subscription:", error);
      alert("Erro ao ativar notificações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Remover subscription
  const unsubscribe = async () => {
    setIsLoading(true);

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          // Remover subscription do servidor
          await fetch("/api/push-notifications/unsubscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ endpoint: subscription.endpoint }),
          });

          // Remover subscription do browser
          await subscription.unsubscribe();
          setIsSubscribed(false);
          console.log("✅ Subscription removida com sucesso!");
          alert("Notificações desativadas.");
        }
      }
    } catch (error) {
      console.error("❌ Erro ao remover subscription:", error);
      alert("Erro ao desativar notificações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Não renderizar se não houver suporte
  if (!isSupported) {
    return null;
  }

  return (
    <div className={`push-notification-manager ${className}`}>
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
