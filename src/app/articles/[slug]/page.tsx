import {
  getArticleBySlugAddView,
  getRelatedArticles,
  getPopularArticles,
} from "@/actions/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { marked } from "marked";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ArticleSidebar } from "@/components/ui/article-sidebar";
import { processTags } from "@/lib/utils";

// Configurar marked para segurança
marked.setOptions({
  breaks: true,
  gfm: true,
});

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlugAddView(slug);

  if (!article) {
    notFound();
  }

  // Buscar artigos relacionados e populares do Strapi
  const [relatedArticles, popularArticles] = await Promise.all([
    getRelatedArticles(article.id, article.category?.id),
    getPopularArticles(5),
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-20" />

      {/* Breadcrumb */}
      <div className="border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <div className="flex-1 lg:pr-8">
            {/* Category */}
            {article.category && (
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {article.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author.name}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.createdAt)}</span>
              </div>

              {(() => {
                const tags = processTags(article.tags);
                return (
                  tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <div className="flex gap-2">
                        {tags.slice(0, 3).map((tag: string, index: number) => (
                          <span key={index} className="text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                );
              })()}
            </div>

            {/* Featured Image */}
            {article.cover && (
              <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={`${article.cover.url}`}
                  alt={article.cover.alternativeText || article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div>
              {article.blocks && (
                <article className="prose prose-lg w-full max-w-full prose-headings:text-muted-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-th:text-muted-foreground prose-td:text-muted-foreground prose-strong:text-muted-foreground prose-a:text-primary prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h2:text-3xl prose-h2:font-semibold prose-h2:mb-4 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-3 prose-h4:text-xl prose-h4:font-medium prose-h4:mb-2 prose-p:text-lg prose-p:leading-loose prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-2 prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-img:rounded-lg prose-img:shadow-md prose-hr:border-border prose-hr:my-8">
                  {article.blocks.map((block: any, index: number) => {
                    switch (block.__component) {
                      case "shared.rich-text":
                        return (
                          <div
                            key={index}
                            className="mb-6"
                            dangerouslySetInnerHTML={{
                              __html: marked(block.body),
                            }}
                          />
                        );

                      case "shared.media":
                        return (
                          <div key={index} className="my-8">
                            <div className="relative w-full h-96 rounded-xl overflow-hidden">
                              <Image
                                src={`${block.file.url}`}
                                alt={
                                  block.file.alternativeText ||
                                  "Imagem do artigo"
                                }
                                fill
                                className="object-cover"
                              />
                            </div>
                            {block.file.caption && (
                              <p className="text-sm text-muted-foreground text-center mt-2">
                                {block.file.caption}
                              </p>
                            )}
                          </div>
                        );

                      case "shared.quote":
                        return (
                          <blockquote
                            key={index}
                            className="border-l-4 border-primary bg-muted/50 p-6 rounded-r-lg my-8"
                          >
                            <p className="text-lg italic text-foreground mb-2">
                              &ldquo;{block.body}&rdquo;
                            </p>
                            {block.author && (
                              <cite className="text-sm text-muted-foreground">
                                — {block.author}
                              </cite>
                            )}
                          </blockquote>
                        );

                      case "shared.code-block":
                        return (
                          <div key={index} className="my-6">
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                              <code className="text-sm">{block.code}</code>
                            </pre>
                            {block.caption && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {block.caption}
                              </p>
                            )}
                          </div>
                        );

                      default:
                        return null;
                    }
                  })}
                </article>
              )}
            </div>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  {article.author && article.author.avatar && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={article.author.avatar.url}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    {article.author && (
                      <p className="font-medium text-foreground">
                        {article.author.name}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Publicado em {formatDate(article.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Ver mais artigos
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="sticky top-8">
              <ArticleSidebar
                relatedArticles={relatedArticles}
                popularArticles={popularArticles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
