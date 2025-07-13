"use client";

import { Button } from "@/components/ui/button";

export default function ResetNotificationButton() {
  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("push-notification-asked");
      alert(
        "✅ Preferência resetada! Recarregue a página para testar novamente."
      );
    }
  };

  return (
    <Button onClick={handleReset} variant="outline" size="sm">
      🔄 Resetar Teste
    </Button>
  );
}
