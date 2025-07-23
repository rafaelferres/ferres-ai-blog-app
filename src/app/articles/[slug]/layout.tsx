import { getArticleBySlug } from "@/actions/articles";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo solicitado não foi encontrado.",
    };
  }

  return {
    title: article.title,
    description: article.description || "Artigo do blog",
    openGraph: {
      title: article.title,
      description: article.description || "Artigo do blog",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author ? [article.author.name] : undefined,
      images: article.cover
        ? [
            {
              url: article.cover.url,
              width: article.cover.width,
              height: article.cover.height,
              alt: article.cover.alternativeText || article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || "Artigo do blog",
      images: article.cover ? [article.cover.url] : undefined,
    },
  };
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
