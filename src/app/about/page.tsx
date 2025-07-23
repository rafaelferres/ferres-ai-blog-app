import Link from "next/link";
import { ArrowLeft, Code, Users, Target } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AboutPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sobre o Ferres
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Seu portal de informações sobre tecnologia e desenvolvimento.
          </p>
        </div>

        {/* Mission */}
        <div className="prose prose-lg max-w-none text-muted-foreground mb-12">
          <p className="text-lg leading-relaxed">
            O <strong className="text-primary">Ferres</strong> é um blog
            dedicado a compartilhar conhecimento sobre as mais recentes
            inovações em tecnologia, com foco especial em desenvolvimento de
            software e tendências do mercado tech.
          </p>
          <p className="text-lg leading-relaxed">
            Nossa missão é democratizar o acesso à informação de qualidade sobre
            tecnologia, oferecendo conteúdo relevante tanto para iniciantes
            quanto para profissionais experientes da área.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Code className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Conteúdo Técnico
            </h3>
            <p className="text-muted-foreground">
              Artigos aprofundados sobre desenvolvimento, ferramentas e boas
              práticas
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Comunidade
            </h3>
            <p className="text-muted-foreground">
              Espaço para conectar desenvolvedores e entusiastas da tecnologia
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Inovação
            </h3>
            <p className="text-muted-foreground">
              Cobertura das últimas tendências e inovações em tecnologia
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-card border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Junte-se à nossa comunidade
          </h2>
          <p className="text-muted-foreground mb-6">
            Receba atualizações sobre os últimos artigos e participe das
            discussões.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/community"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Participar da Comunidade
            </Link>
            <Link
              href="/articles"
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Ver Artigos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
