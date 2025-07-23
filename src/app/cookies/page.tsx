import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function CookiesPage() {
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
            Política de Cookies
          </h1>
          <p className="text-xl text-muted-foreground">
            Como usamos cookies para melhorar sua experiência
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Última atualização: 12 de julho de 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. O que são Cookies?
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Cookies são pequenos arquivos de texto que são colocados no seu
                dispositivo quando você visita nosso site. Eles são amplamente
                utilizados para fazer os sites funcionarem de forma mais
                eficiente e fornecer informações aos proprietários do site.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Como Usamos Cookies
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>Usamos cookies para vários propósitos, incluindo:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lembrar suas preferências e configurações</li>
                <li>Melhorar a funcionalidade do site</li>
                <li>Analisar como nosso site é usado</li>
                <li>Personalizar conteúdo e anúncios</li>
                <li>Fornecer recursos de mídia social</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Tipos de Cookies que Usamos
            </h2>
            <div className="text-muted-foreground space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cookies Essenciais
                </h3>
                <p>
                  Estes cookies são necessários para o funcionamento básico do
                  site. Eles permitem que você navegue pelo site e use recursos
                  essenciais como áreas seguras. Estes cookies não coletam
                  informações sobre você que possam ser usadas para marketing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cookies de Performance
                </h3>
                <p>
                  Estes cookies coletam informações sobre como os visitantes
                  usam nosso site, como quais páginas são visitadas com mais
                  frequência. Todas as informações são agregadas e anônimas. Se
                  você não permitir estes cookies, não saberemos quando você
                  visitou nosso site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cookies de Funcionalidade
                </h3>
                <p>
                  Estes cookies permitem que o site se lembre de escolhas que
                  você faz (como seu nome de usuário, idioma ou região) e
                  forneça recursos aprimorados e mais pessoais.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cookies de Direcionamento
                </h3>
                <p>
                  Estes cookies podem ser definidos através do nosso site por
                  nossos parceiros de publicidade. Eles podem ser usados por
                  essas empresas para construir um perfil de seus interesses e
                  mostrar anúncios relevantes em outros sites.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Cookies de Terceiros
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Além de nossos próprios cookies, também usamos vários cookies de
                terceiros para relatar estatísticas de uso do site e oferecer
                anúncios no site e através dele.
              </p>
              <p>Os principais serviços de terceiros que usamos incluem:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> Para análise de tráfego do
                  site
                </li>
                <li>
                  <strong>Google Fonts:</strong> Para carregamento de fontes
                </li>
                <li>
                  <strong>Social Media:</strong> Para funcionalidades de
                  compartilhamento
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Gerenciamento de Cookies
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                A maioria dos navegadores permite que você controle cookies
                através de suas configurações. Você pode:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ver quais cookies você tem e excluí-los individualmente</li>
                <li>Bloquear cookies de terceiros</li>
                <li>Bloquear cookies de sites específicos</li>
                <li>Bloquear todos os cookies</li>
                <li>Excluir todos os cookies quando fechar o navegador</li>
              </ul>
              <p>
                <strong>Nota:</strong> Se você desabilitar cookies, algumas
                funcionalidades do nosso site podem não funcionar corretamente.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Como Excluir Cookies
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Você pode excluir cookies a qualquer momento através das
                configurações do seu navegador:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Chrome</h4>
                  <p className="text-sm">
                    Configurações → Privacidade e segurança → Cookies
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">
                    Firefox
                  </h4>
                  <p className="text-sm">
                    Opções → Privacidade e Segurança → Cookies
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Safari</h4>
                  <p className="text-sm">
                    Preferências → Privacidade → Cookies
                  </p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Edge</h4>
                  <p className="text-sm">
                    Configurações → Cookies e permissões de site
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Consentimento
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Ao continuar a usar nosso site, você consente com o uso de
                cookies de acordo com esta política. Se você não concordar com o
                uso de cookies, você deve ajustar as configurações do seu
                navegador adequadamente ou parar de usar nosso site.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Atualizações desta Política
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Podemos atualizar esta política de cookies periodicamente para
                refletir mudanças em nossos cookies ou por outras razões
                operacionais, legais ou regulamentares.
              </p>
              <p>
                Recomendamos que você visite esta página regularmente para se
                manter informado sobre nosso uso de cookies.
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
