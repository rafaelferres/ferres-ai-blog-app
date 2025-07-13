import { getArticlesPaginated } from "@/actions/articles";
import { getCategories } from "@/actions/categories";
import Link from "next/link";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Newsletter } from "@/components/ui/newsletter";
import { ArticleFilters } from "@/components/ui/article-filters";
import { Pagination } from "@/components/ui/pagination";
import { SearchingSkeleton } from "@/components/ui/search-loading";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

function ArticlesContent({
  articles,
  hoverItems,
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  search,
  category,
}: {
  articles: any[];
  hoverItems: any[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  search?: string;
  category?: string;
}) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          Nenhum notícia encontrada
        </h3>
        <p className="text-muted-foreground mb-6">
          {search || category
            ? "Tente ajustar os filtros ou termos de busca."
            : "Volte mais tarde para ver novas notícias."}
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ver todas as notícias
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <HoverEffect items={hoverItems} />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}) {
  const awaitedSearchParams = await searchParams;
  const page = parseInt(awaitedSearchParams.page || "1");
  const category = awaitedSearchParams.category;
  const search = awaitedSearchParams.search;

  const result = await getArticlesPaginated(9, page, search, category);
  const categories = await getCategories();

  const articles = result.data;
  const meta = result.meta as any;
  const pagination = meta.pagination || {};

  const totalPages = pagination.pageCount || 1;
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Notícias
            </h1>
            <p className="text-xl text-muted-foreground">
              As últimas notícias sobre tecnologia
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <ArticleFilters categories={categories} />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<SearchingSkeleton />}>
            <ArticlesContent
              articles={articles}
              hoverItems={hoverItems}
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              search={search}
              category={category}
            />
          </Suspense>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
