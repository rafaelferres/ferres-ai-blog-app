"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Users, TrendingUp, ChevronRight } from "lucide-react";
import { useToast } from "./toast";

interface ArticleSidebarProps {
  relatedArticles: any[];
  popularArticles: any[];
}

export function ArticleSidebar({
  relatedArticles,
  popularArticles,
}: ArticleSidebarProps) {
  const { showToast, ToastContainer } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) {
      console.warn("getImageUrl: imageUrl is empty");
      return "/placeholder-image.jpg";
    }

    // Se for uma URL completa (http/https), usar diretamente
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    // Se começar com /api/, usar diretamente
    if (imageUrl.startsWith("/api/")) {
      return imageUrl;
    }

    // Se começar com /, usar diretamente (imagem local)
    if (imageUrl.startsWith("/")) {
      return imageUrl;
    }

    // Caso contrário, construir URL do Strapi
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const fullUrl = `${strapiUrl}${
      imageUrl.startsWith("/") ? "" : "/"
    }${imageUrl}`;

    console.log("getImageUrl: constructed URL:", fullUrl);
    return fullUrl;
  };

  const handleNewsletterSubscribe = () => {
    showToast(
      "Newsletter ainda está desativada. Estamos trabalhando para disponibilizá-la em breve!",
      "error"
    );
  };

  return (
    <>
      <div className="w-full lg:w-80 space-y-8">
        {/* Artigos Relacionados */}
        {relatedArticles.length > 0 && (
          <div className="bg-card rounded-xl p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Artigos Relacionados
              </h3>
            </div>
            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      {article.cover ? (
                        <Image
                          src={getImageUrl(article.cover.url)}
                          alt={article.cover.alternativeText || article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="80px"
                          quality={90}
                          priority={false}
                          onError={(e) => {
                            // Fallback para imagem padrão em caso de erro
                            const target = e.currentTarget;
                            target.src = "/placeholder-image.jpg"; // Você pode criar uma imagem padrão
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            📄
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Botão Comunidade */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Junte-se à Comunidade</h3>
          </div>
          <p className="text-white/90 mb-4 text-sm">
            Conecte-se com outros leitores, compartilhe ideias e participe de
            discussões sobre os temas que mais importam.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg hover:bg-white/90 transition-colors text-sm font-medium"
          >
            Participar agora
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Artigos Populares */}
        {popularArticles.length > 0 && (
          <div className="bg-card rounded-xl p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Artigos Populares
              </h3>
            </div>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        {article.category && (
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {article.category.name}
                          </span>
                        )}
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <div className="bg-muted/50 rounded-xl p-6 border">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Newsletter
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Receba os melhores artigos diretamente no seu e-mail.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleNewsletterSubscribe}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
