import React from "react";
import { Loader2 } from "lucide-react";

interface SearchLoadingProps {
  isLoading: boolean;
  text?: string;
}

export function SearchLoading({
  isLoading,
  text = "Buscando artigos...",
}: SearchLoadingProps) {
  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        {/* Círculo de fundo com animação de pulso */}
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>

        {/* Ícone de loading rotativo */}
        <div className="relative bg-primary/10 rounded-full p-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      </div>

      {/* Texto com animação de fade */}
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-foreground animate-pulse">
          {text}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Aguarde um momento...
        </p>
      </div>

      {/* Barra de progresso animada */}
      <div className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-loading-bar"></div>
      </div>
    </div>
  );
}

export function SearchingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-muted rounded-lg p-6 space-y-4">
            <div className="h-48 bg-muted-foreground/20 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 bg-muted-foreground/20 rounded w-16"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
