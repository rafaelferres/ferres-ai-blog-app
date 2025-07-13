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
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
