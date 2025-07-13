"use client";

import { ResizableNavbar } from "@/components/ui/resizable-navbar";
import { Category } from "@/types/strapi";

interface HeaderClientProps {
  categories: Category[];
}

export function HeaderClient({ categories }: HeaderClientProps) {
  const services = [
    {
      title: "Consultoria Tech",
      href: "/servicos/consultoria-tech",
      description:
        "Consultoria especializada em implementação de tecnologia para empresas",
    },
    {
      title: "Desenvolvimento",
      href: "/servicos/desenvolvimento",
      description: "Desenvolvimento de soluções personalizadas com tecnologia",
    },
    {
      title: "Treinamentos",
      href: "/servicos/treinamentos",
      description: "Cursos e workshops sobre tecnologia",
    },
  ];

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
      title: "Serviços",
      children: services,
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
