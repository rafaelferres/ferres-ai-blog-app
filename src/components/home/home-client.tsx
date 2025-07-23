"use client";

import { useState, useTransition } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getArticlesPaginated } from "@/actions/articles";

interface HomeClientProps {
  initialArticles: any[];
  initialMeta: any;
}

export function HomeClient({ initialArticles, initialMeta }: HomeClientProps) {
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [meta, setMeta] = useState(initialMeta);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const transformArticles = (articles: any[]) => {
    return articles.map((article) => ({
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
  };

  const loadMoreArticles = async () => {
    const nextPage = currentPage + 1;

    startTransition(async () => {
      try {
        const { data, meta: newMeta } = await getArticlesPaginated(9, nextPage);

        if (data && data.length > 0) {
          setArticles((prev) => [...prev, ...data]);
          setMeta(newMeta);
          setCurrentPage(nextPage);
        }
      } catch (error) {
        console.error("Error loading more articles:", error);
      }
    });
  };

  const hasMoreArticles = meta?.pagination?.page < meta?.pagination?.pageCount;

  const hoverItems = transformArticles(articles);

  return (
    <div className="space-y-8">
      <HoverEffect items={hoverItems} />

      {hasMoreArticles && (
        <div className="flex justify-center">
          <Button
            onClick={loadMoreArticles}
            disabled={isPending}
            variant="outline"
            className="px-8 py-3 text-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {isPending ? (
              <>
                <LoadingSpinner className="mr-2 h-4 w-4" />
                Carregando...
              </>
            ) : (
              "Carregar mais notícias"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
