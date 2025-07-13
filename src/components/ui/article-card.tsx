import Link from "next/link";
import { StrapiImage } from "@/components/ui/strapi-image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { processTags } from "@/lib/utils";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    createdAt: string;
    cover?: {
      url: string;
      alternativeText?: string;
    };
    author?: {
      name: string;
    };
    category?: {
      name: string;
    };
    tags?: any;
  };
  showTags?: boolean;
}

export function ArticleCard({ article, showTags = false }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <article className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
      {/* Article Image */}
      {article.cover && (
        <div className="relative h-48 overflow-hidden">
          <StrapiImage
            src={article.cover.url}
            alt={article.cover.alternativeText || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {article.category.name}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Article Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-2">
          <Link
            href={`/articles/${article.slug}`}
            className="text-white drop-shadow-lg hover:underline transition-colors group-hover:text-primary"
            style={{ textShadow: "0 2px 16px rgba(80,80,255,0.25)" }}
          >
            {article.title}
          </Link>
        </h3>

        {article.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {truncateText(article.excerpt, 120)}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          {article.author && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{article.author.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>

        {/* Tags */}
        {showTags &&
          (() => {
            const tags = processTags(article.tags);
            return (
              tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.slice(0, 2).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )
            );
          })()}

        {/* Read More Button */}
        <Link
          href={`/articles/${article.slug}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm group/link hover:underline"
        >
          Ler mais
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
