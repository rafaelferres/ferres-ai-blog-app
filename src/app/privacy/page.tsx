import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-muted-foreground">
            Como coletamos, usamos e protegemos suas informações
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Última atualização: 12 de julho de 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Informações que Coletamos
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Coletamos informações que você nos fornece diretamente, como
                quando você:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Se inscreve em nossa newsletter</li>
                <li>Entra em contato conosco</li>
                <li>Interage com nosso conteúdo</li>
                <li>Participa de comentários ou discussões</li>
              </ul>
              <p>
                Também coletamos automaticamente certas informações quando você
                usa nosso site, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Endereço IP</li>
                <li>Tipo de navegador e dispositivo</li>
                <li>Páginas visitadas</li>
                <li>Tempo gasto no site</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Como Usamos suas Informações
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>Usamos as informações coletadas para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Enviar newsletters e comunicações relevantes</li>
                <li>Responder às suas perguntas e solicitações</li>
                <li>Analisar o uso do site para melhorar a experiência</li>
                <li>Detectar e prevenir fraudes ou atividades maliciosas</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Compartilhamento de Informações
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações
                pessoais com terceiros, exceto nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Para proteger nossos direitos e segurança</li>
                <li>
                  Com provedores de serviços que nos ajudam a operar o site
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Cookies e Tecnologias Similares
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Usamos cookies e tecnologias similares para melhorar sua
                experiência em nosso site. Para mais informações sobre como
                usamos cookies, consulte nossa{" "}
                <Link href="/cookies" className="text-primary hover:underline">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Segurança
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais
                adequadas para proteger suas informações pessoais contra acesso
                não autorizado, alteração, divulgação ou destruição.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Seus Direitos
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>Você tem o direito de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar a exclusão de suas informações</li>
                <li>Opor-se ao processamento de suas informações</li>
                <li>Solicitar a portabilidade de dados</li>
                <li>Retirar seu consentimento a qualquer momento</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Retenção de Dados
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Mantemos suas informações pessoais apenas pelo tempo necessário
                para cumprir os propósitos descritos nesta política, a menos que
                um período de retenção mais longo seja exigido ou permitido por
                lei.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Alterações nesta Política
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Podemos atualizar esta política de privacidade periodicamente.
                Notificaremos sobre mudanças significativas publicando a nova
                política em nosso site e atualizando a data de última
                atualização.
              </p>
            </div>
          </section>
        </div>

        {/* Back to top */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
