import { getArticlePagination } from "@/actions/articles";
import { Newsletter } from "@/components/ui/newsletter";
import { SubHeader } from "@/components/home/sub-header";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default async function HomePage() {
  const articles = await getArticlePagination(12, 1);

  // Transformar os artigos para o formato do HoverEffect
  const hoverItems = articles.map((article: any) => ({
    title: article.title,
    description: article.excerpt || "Clique para ler mais...",
    link: `/articles/${article.slug}`,
    image: article.cover?.url ? `${article.cover.url}` : undefined,
    category: article.category?.name,
    date: new Date(article.createdAt).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-40" />

      {/* SubHeader Antigo */}
      <SubHeader />

      {/* Articles Section */}
      <section id="articles" className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Últimas Notícias
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fique por dentro das novidades mais importantes sobre IA e
              tecnologia
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-muted-foreground">
                Em breve teremos conteúdo interessante para você!
              </p>
            </div>
          ) : (
            <HoverEffect items={hoverItems} />
          )}
        </div>
      </section>

      <div className="relative z-10">
        <Newsletter />
      </div>
    </div>
  );
}
