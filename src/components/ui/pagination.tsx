"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Reset loading state when page changes
  useEffect(() => {
    setIsLoading(false);
  }, [currentPage]);

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `/articles?${params.toString()}`;
  };

  const goToPage = (page: number) => {
    if (page === currentPage || isLoading) return;

    setIsLoading(true);
    router.push(createPageURL(page));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Primeira página
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          disabled={isLoading}
          className="px-3 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          1
        </button>
      );

      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-3 py-2 text-sm text-muted-foreground">
            ...
          </span>
        );
      }
    }

    // Páginas visíveis
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          disabled={isLoading}
          className={`px-3 py-2 text-sm rounded-lg border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent ${
            i === currentPage
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border hover:bg-muted"
          }`}
        >
          {i}
        </button>
      );
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-3 py-2 text-sm text-muted-foreground">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          disabled={isLoading}
          className="px-3 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoadingSpinner size="sm" variant="minimal" />
          Carregando próxima página...
        </div>
      )}

      {/* Pagination controls */}
      <div
        className={`flex items-center gap-2 transition-opacity duration-300 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      >
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={!hasPreviousPage || isLoading}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        <div className="flex items-center gap-1">{renderPageNumbers()}</div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={!hasNextPage || isLoading}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
        >
          Próxima
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
