import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function TermsPage() {
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
            Termos de Uso
          </h1>
          <p className="text-xl text-muted-foreground">
            Condições para uso do nosso site e serviços
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Última atualização: 12 de julho de 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Aceitação dos Termos
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Ao acessar e usar o site Ferres, você concorda em cumprir e
                estar vinculado a estes Termos de Uso. Se você não concordar com
                qualquer parte destes termos, não deve usar nosso site.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Descrição do Serviço
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                O Ferres é um blog de tecnologia que fornece notícias, artigos e
                conteúdo educativo sobre inteligência artificial,
                desenvolvimento de software e inovações tecnológicas.
              </p>
              <p>Nossos serviços incluem:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Artigos e notícias sobre tecnologia</li>
                <li>Newsletter com atualizações</li>
                <li>Comunidade para discussões</li>
                <li>Recursos educacionais</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Uso Permitido
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>Você pode usar nosso site para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ler e compartilhar nosso conteúdo</li>
                <li>Participar de discussões de forma respeitosa</li>
                <li>Se inscrever em nossa newsletter</li>
                <li>Entrar em contato conosco</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Uso Proibido
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>Você não pode usar nosso site para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Publicar conteúdo ilegal, difamatório ou ofensivo</li>
                <li>Violar direitos autorais ou propriedade intelectual</li>
                <li>Distribuir malware ou vírus</li>
                <li>Fazer spam ou enviar comunicações não solicitadas</li>
                <li>Tentar hackear ou comprometer a segurança do site</li>
                <li>Usar o site para fins comerciais sem autorização</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Propriedade Intelectual
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Todo o conteúdo do site Ferres, incluindo textos, imagens, logos
                e design, é protegido por direitos autorais e outras leis de
                propriedade intelectual.
              </p>
              <p>Você pode compartilhar nossos artigos, desde que:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantenha a atribuição ao Ferres</li>
                <li>Inclua um link para o artigo original</li>
                <li>Não modifique o conteúdo sem permissão</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Contas de Usuário
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Se você criar uma conta em nosso site, você é responsável por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Manter a confidencialidade de sua senha</li>
                <li>Todas as atividades realizadas em sua conta</li>
                <li>Notificar-nos imediatamente sobre uso não autorizado</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Disclaimers
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                O conteúdo do Ferres é fornecido para fins informativos e
                educacionais. Não garantimos a precisão, completude ou
                atualidade de todas as informações.
              </p>
              <p>
                Você usa o site por sua própria conta e risco. Não somos
                responsáveis por qualquer dano decorrente do uso do site.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Links para Sites Externos
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Nosso site pode conter links para sites de terceiros. Não somos
                responsáveis pelo conteúdo ou práticas de privacidade desses
                sites.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. Modificações dos Termos
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Reservamos o direito de modificar estes termos a qualquer
                momento. As mudanças entrarão em vigor imediatamente após a
                publicação no site.
              </p>
              <p>
                É sua responsabilidade verificar periodicamente estes termos
                para estar ciente de quaisquer alterações.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              10. Rescisão
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Podemos suspender ou encerrar seu acesso ao site a qualquer
                momento, sem aviso prévio, por violação destes termos ou por
                qualquer outro motivo, a nosso exclusivo critério.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              11. Lei Aplicável
            </h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Estes termos são regidos pelas leis brasileiras. Qualquer
                disputa será resolvida nos tribunais competentes do Brasil.
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
