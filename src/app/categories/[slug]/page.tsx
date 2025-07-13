import { getArticlesPaginated } from "@/actions/articles";
import { getCategoryBySlug } from "@/actions/categories";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Newsletter } from "@/components/ui/newsletter";
import { Pagination } from "@/components/ui/pagination";
import { SearchingSkeleton } from "@/components/ui/search-loading";
import { Suspense } from "react";
import { ChevronLeft, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

function CategoryArticlesContent({
  articles,
  hoverItems,
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  categoryName,
}: {
  articles: any[];
  hoverItems: any[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  categoryName: string;
}) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          Nenhum artigo encontrado
        </h3>
        <p className="text-muted-foreground mb-6">
          Ainda não há artigos na categoria &quot;{categoryName}&quot;.
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ver todos os artigos
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

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;
  const page = parseInt(awaitedSearchParams.page || "1");

  // Buscar a categoria pelo slug
  const category = await getCategoryBySlug(awaitedParams.slug);

  // Se a categoria não existir, retornar 404
  if (!category) {
    notFound();
  }

  // Buscar artigos da categoria
  const result = await getArticlesPaginated(
    9,
    page,
    undefined,
    awaitedParams.slug
  );
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
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link
                href="/articles"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Artigos
              </Link>
              <span>/</span>
              <span>{category.name}</span>
            </nav>

            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {category.name}
              </h1>
            </div>

            {category.description && (
              <p className="text-xl text-muted-foreground mb-4">
                {category.description}
              </p>
            )}

            {/* Articles count */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                {pagination.total || 0} artigo
                {pagination.total !== 1 ? "s" : ""}
              </span>
              {pagination.total > 0 && (
                <>
                  <span>•</span>
                  <span>
                    Página {page} de {totalPages}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<SearchingSkeleton />}>
            <CategoryArticlesContent
              articles={articles}
              hoverItems={hoverItems}
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              categoryName={category.name}
            />
          </Suspense>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
