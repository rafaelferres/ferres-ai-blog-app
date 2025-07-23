"use client";

import { ResizableNavbar } from "@/components/ui/resizable-navbar";
import { Category } from "@/types/strapi";

interface HeaderClientProps {
  categories: Category[];
}

export function HeaderClient({ categories }: HeaderClientProps) {
  const menuItems = [
    {
      title: "Início",
      href: "/",
    },
    {
      title: "Notícias",
      href: "/articles",
    },
    {
      title: "Categorias",
      children: categories.map((category) => ({
        title: category.name,
        href: `/categories/${category.slug}`,
        description: category.description,
      })),
    },
    {
      title: "Media JSON Generator",
      href: "/media-json-gen",
    },
    {
      title: "Comunidade",
      href: "/community",
    },
    {
      title: "Sobre",
      href: "/about",
    },
  ];

  return <ResizableNavbar items={menuItems} />;
}
