"use client";

import { Brain } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-20" />

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="animate-pulse">
            <Brain className="h-16 w-16 text-primary" />
          </div>
          <div className="absolute inset-0 animate-ping">
            <Brain className="h-16 w-16 text-primary/30" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold night-tech-text-gradient mb-2">
            Ferres
          </h1>
          <p className="text-muted-foreground text-sm">
            Carregando conteúdo...
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
