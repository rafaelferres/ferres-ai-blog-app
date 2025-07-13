"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function AddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Detectar se é iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // Detectar se é Android Chrome
    const isAndroidChrome =
      /Android/.test(navigator.userAgent) && /Chrome/.test(navigator.userAgent);

    // Listener para o evento beforeinstallprompt (Android Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    // Listener para detectar quando o app foi instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    if (isAndroidChrome) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.addEventListener("appinstalled", handleAppInstalled);
    }

    // Para iOS, mostrar instruções depois de um tempo
    if (isIOS) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      if (isAndroidChrome) {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
        window.removeEventListener("appinstalled", handleAppInstalled);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android Chrome
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        setShowPrompt(false);
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Não mostrar novamente por 7 dias
    localStorage.setItem("a2hs-dismissed", Date.now().toString());
  };

  // Verificar se foi dismissed recentemente
  useEffect(() => {
    const dismissed = localStorage.getItem("a2hs-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const now = Date.now();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (now - dismissedTime < sevenDays) {
        setShowPrompt(false);
        return;
      }
    }
  }, []);

  // Não mostrar se já instalado
  if (isInstalled || !showPrompt) {
    return null;
  }

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg animate-fade-in">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground">
                Adicionar à tela inicial
              </h4>
              <p className="text-xs text-muted-foreground">
                {isIOS
                  ? "Toque no botão de compartilhar e selecione 'Adicionar à Tela de Início'"
                  : "Instale o app para acesso rápido e offline"}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isIOS && deferredPrompt && (
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Instalar App
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Agora não
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
