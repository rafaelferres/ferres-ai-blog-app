"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function HomeClient() {
  return (
    <div className="text-center mt-12">
      <button
        className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-300 font-medium border border-border hover:border-primary/50"
        onClick={() => {
          // Aqui você pode adicionar a lógica de loading
          console.log("Carregando mais artigos...");
        }}
      >
        <span className="group-hover:hidden">Carregar mais artigos</span>
        <span className="hidden group-hover:flex items-center gap-2">
          <LoadingSpinner size="sm" variant="minimal" />
          Carregando...
        </span>
      </button>
    </div>
  );
}
