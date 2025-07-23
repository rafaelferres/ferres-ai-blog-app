import Image from "next/image";
import Link from "next/link";
import { getArticleByCategory, getPopularArticles } from "@/actions/articles";
import moment from "moment-timezone";
import { Calendar, User } from "lucide-react";
import { SubHeaderClient } from "./sub-header-client";

// Helper function to format date based on age
const formatDate = (dateString: string) => {
  const articleDate = moment.tz(dateString, "America/Sao_Paulo");
  const now = moment.tz("America/Sao_Paulo");
  const daysDiff = now.diff(articleDate, "days");

  if (daysDiff < 10) {
    if (daysDiff === 0) {
      return "hoje";
    } else if (daysDiff === 1) {
      return "1 dia atrás";
    } else {
      return `${daysDiff} dias atrás`;
    }
  } else {
    return articleDate.format("DD/MM/YYYY");
  }
};

export const SubHeader = async () => {
  try {
    const articles = await getArticleByCategory("AI", 4, 1);
    const popularArticles = await getPopularArticles(5);

    if (!articles || articles.length === 0) {
      return null;
    }

    return (
      <section className="bg-muted-foreground/5 py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Card Principal - Elon Musk */}
            <div className="lg:col-span-2 relative rounded-lg overflow-hidden shadow-lg bg-card group cursor-pointer h-[200px] lg:h-auto border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <Link href={`/articles/${articles[0].slug}`}>
                <Image
                  src={`${articles[0].cover.url}`}
                  alt="Post-it notes"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                {articles[0].category && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {articles[0].category.name}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 z-10">
                  <div className="mb-2 sm:mb-4">
                    <SubHeaderClient
                      title={articles[0].title}
                      className="text-base sm:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg group-hover:underline group-hover:text-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-4">
                    {articles[0].author && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{articles[0].author.name}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(articles[0].createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Coluna Centro - Cards de Notícias */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {articles.slice(1).map((card, idx) => (
                <div
                  key={idx}
                  className="relative rounded-lg overflow-hidden shadow-md h-[200px] sm:flex-1 flex flex-col justify-end bg-card group cursor-pointer sm:min-h-[180px] border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
                >
                  <Link href={`/articles/${card.slug}`}>
                    <Image
                      src={`${card.cover.url}`}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    {card.category && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {card.category.name}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 p-3 sm:p-4 z-10">
                      <div className="mb-2">
                        <SubHeaderClient
                          title={card.title}
                          className="text-sm sm:text-sm font-bold text-white leading-tight drop-shadow-lg group-hover:underline group-hover:text-primary transition-colors"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-4">
                        {card.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{card.author.name}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(card.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Coluna Direita - Top Headlines */}
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Top Headlines
                </h2>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {popularArticles.length}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {popularArticles.map((headline, idx) => (
                  <Link
                    key={idx}
                    href={`/articles/${headline.slug}`}
                    className="group block p-4 rounded-lg bg-muted/20 hover:bg-muted/40 border border-transparent hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                          {headline.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(headline.createdAt)}</span>
                          {headline.category && (
                            <>
                              <span>•</span>
                              <span className="text-primary">
                                {headline.category.name}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("❌ Erro no SubHeader:", error);
    return (
      <section className="bg-muted-foreground/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-500">
              Erro ao carregar notícias
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Verifique a conexão com o Strapi
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Configure as variáveis de ambiente (.env.local)
            </p>
          </div>
        </div>
      </section>
    );
  }
};
