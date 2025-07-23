import Link from "next/link";
import { ArrowLeft, Users, MessageSquare, Heart, Star } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-20" />

      {/* Breadcrumb */}
      <div className="border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Users className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Junte-se à Nossa Comunidade
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conecte-se com outros leitores apaixonados por tecnologia,
            compartilhe conhecimento e participe de discussões enriquecedoras.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Discussões Ativas
            </h3>
            <p className="text-muted-foreground">
              Participe de conversas sobre os temas mais relevantes da
              tecnologia
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Networking
            </h3>
            <p className="text-muted-foreground">
              Conecte-se com profissionais e entusiastas da área
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Star className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Conteúdo Exclusivo
            </h3>
            <p className="text-muted-foreground">
              Acesso antecipado a artigos e recursos especiais
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-card border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground mb-6">
            A comunidade é gratuita e você pode começar a participar agora
            mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://discord.gg/sKSxQWEVV5"
              target="_blank"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Entrar no Discord
            </Link>
            <Link
              href="https://www.instagram.com/ferres.io"
              target="_blank"
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Seguir no Instagram
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
          <div>
            <div className="text-2xl font-bold text-primary mb-1">1000+</div>
            <div className="text-sm text-muted-foreground">Membros</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Discussões</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">200+</div>
            <div className="text-sm text-muted-foreground">Artigos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Suporte</div>
          </div>
        </div>
      </div>
    </div>
  );
}
