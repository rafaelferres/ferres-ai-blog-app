"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function TestPushPage() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);

      // Check if we already have a subscription
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((sub) => {
          setSubscription(sub);
        });
      });
    }
  }, []);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setStatus(`Permissão: ${permission}`);
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      // Get VAPID key
      const vapidResponse = await fetch("/api/push-notifications/vapid-key");
      const { publicKey } = await vapidResponse.json();

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      // Subscribe to notifications
      await fetch("/api/push-notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
          userAgent: navigator.userAgent,
        }),
      });

      setSubscription(subscription);
      setStatus("Inscrito com sucesso!");
    } catch (error) {
      setStatus(`Erro: ${error}`);
    }
  };

  const sendTestNotification = async () => {
    try {
      setStatus("Enviando notificação de teste...");

      // Test with custom notification using the test endpoint
      const response = await fetch("/api/test-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Artigo de Teste das Notificações!",
          slug: "teste-notificacao",
          categories: ["Tecnologia"],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus(`Notificação enviada! ${JSON.stringify(result)}`);
      } else {
        const errorResult = await response.json();
        setStatus(
          `Erro ao enviar: ${response.status} ${response.statusText} - ${errorResult.message}`
        );
      }
    } catch (error) {
      setStatus(`Erro: ${error}`);
    }
  };

  const sendDirectNotification = async () => {
    try {
      setStatus("Enviando notificação direta...");

      // Check if service worker is available
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;

        // Check if we have an active service worker
        if (registration.active) {
          // Create a manual push event
          const payload = {
            title: "🔔 Notificação de Teste Direta",
            body: "Esta é uma notificação de teste enviada diretamente pelo service worker!",
            icon: "/icon-192x192.fw.png",
            badge: "/icon-192x192.fw.png",
            data: {
              url: "/articles/teste-notificacao",
              articleTitle: "Artigo de Teste",
            },
          };

          // Use the service worker to show notification
          await registration.showNotification(payload.title, {
            body: payload.body,
            icon: payload.icon,
            badge: payload.badge,
            data: payload.data,
            requireInteraction: true,
          });

          setStatus("Notificação direta enviada com sucesso!");
        } else {
          setStatus("Service Worker não está ativo");
        }
      } else {
        setStatus("Service Worker não suportado");
      }
    } catch (error) {
      setStatus(`Erro: ${error}`);
    }
  };

  if (!isSupported) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Push Notifications não são suportadas
        </h1>
        <p>Seu navegador não suporta Push Notifications.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teste de Push Notifications</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <p className="text-gray-600">{status}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Permissão</h2>
          <p>Permissão atual: {Notification.permission}</p>
          <Button onClick={requestPermission} className="mt-2">
            Solicitar Permissão
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Inscrição</h2>
          <p>Status: {subscription ? "Inscrito" : "Não inscrito"}</p>
          {!subscription && (
            <Button onClick={subscribe} className="mt-2">
              Inscrever-se
            </Button>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Testes</h2>
          <div className="space-x-2">
            <Button
              onClick={sendTestNotification}
              disabled={!subscription}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Enviar Notificação de Teste
            </Button>
            <Button
              onClick={sendDirectNotification}
              disabled={Notification.permission !== "granted"}
              className="bg-green-500 hover:bg-green-600"
            >
              Enviar Notificação Direta
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Instruções</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Primeiro, solicite permissão para notificações</li>
            <li>Depois, inscreva-se para receber notificações</li>
            <li>Teste a notificação direta (mostra via service worker)</li>
            <li>
              Teste a notificação de teste (envia via backend - deve ser
              personalizada)
            </li>
            <li>
              Se ainda aparecer notificação genérica, faça hard refresh
              (Ctrl+Shift+R)
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
