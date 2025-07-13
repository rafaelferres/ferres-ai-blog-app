"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, Loader2 } from "lucide-react";

interface ArticleFiltersProps {
  categories: Array<any>;
}

export function ArticleFilters({ categories }: ArticleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [isSearching, setIsSearching] = useState(false);

  const updateURL = (newSearch: string, newCategory: string) => {
    const params = new URLSearchParams();

    if (newSearch) params.set("search", newSearch);
    if (newCategory) params.set("category", newCategory);

    // Reset para primeira página quando aplicar filtros
    params.delete("page");

    const url = params.toString() ? `?${params.toString()}` : "";

    setIsSearching(true);
    startTransition(() => {
      router.push(`/articles${url}`);
      // Simula um pequeno delay para mostrar a animação
      setTimeout(() => setIsSearching(false), 500);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(search, category);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    updateURL(search, newCategory);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
        <div className="relative">
          {isPending || isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-4 h-4 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          )}
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={search}
            onChange={handleSearchChange}
            disabled={isPending || isSearching}
            className={`w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
              isPending || isSearching
                ? "opacity-70 cursor-not-allowed"
                : "hover:border-primary/50"
            }`}
          />
        </div>
      </form>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <Filter
          className={`w-4 h-4 transition-colors duration-200 ${
            isPending || isSearching
              ? "text-primary animate-pulse"
              : "text-muted-foreground"
          }`}
        />
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          disabled={isPending || isSearching}
          className={`px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
            isPending || isSearching
              ? "opacity-70 cursor-not-allowed"
              : "hover:border-primary/50"
          }`}
        >
          <option value="">Todas as categorias</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
