import { getCategoryBySlug } from "@/actions/categories";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Ferres - Categoria não encontrada",
      description: "A categoria solicitada não foi encontrada.",
    };
  }

  return {
    title: `Ferres - ${category.name}`,
    description:
      category.description || `Artigos da categoria ${category.name}`,
    openGraph: {
      title: `Ferres - ${category.name}`,
      description:
        category.description || `Artigos da categoria ${category.name}`,
      images: [
        {
          url: "https://ferres.io/og-image.fw.png",
          width: 1200,
          height: 630,
          alt: `Ferres - ${category.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Ferres - ${category.name}`,
      description:
        category.description || `Artigos da categoria ${category.name}`,
      images: ["https://ferres.io/og-image.fw.png"],
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
