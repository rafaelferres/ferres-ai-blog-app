import Link from "next/link";
import { Home, Search, ArrowLeft, FileX } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-md">
          {/* 404 Icon */}
          <div className="flex justify-center">
            <div className="p-6 bg-primary/10 rounded-2xl">
              <FileX className="w-16 h-16 text-primary" />
            </div>
          </div>

          {/* 404 Text */}
          <div className="space-y-4">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Página não encontrada
            </h2>
            <p className="text-lg text-muted-foreground">
              Ops! A página que você está procurando não existe ou foi movida.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Voltar ao início
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
            >
              <Search className="w-4 h-4" />
              Ver artigos
            </Link>
          </div>

          {/* Help Text */}
          <div className="space-y-4 pt-8">
            <p className="text-sm text-muted-foreground">
              Se você acha que isso é um erro, entre em contato conosco:
            </p>
            <Link
              href="mailto:contato@ferresai.com"
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              contato@ferresai.com
            </Link>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-16 w-full max-w-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
            Talvez você esteja procurando:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/articles"
              className="p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors group"
            >
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                Artigos
              </h4>
              <p className="text-sm text-muted-foreground">
                Últimas notícias sobre tecnologia
              </p>
            </Link>
            <Link
              href="/community"
              className="p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors group"
            >
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                Comunidade
              </h4>
              <p className="text-sm text-muted-foreground">
                Conecte-se com outros leitores
              </p>
            </Link>
          </div>
        </div>

        {/* Navigation Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
