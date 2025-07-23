"use client";
import React, { useState } from "react";
import { Menu, Brain } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Category } from "@/types/strapi";

const services = [
  {
    title: "Consultoria Tech",
    href: "/servicos/consultoria-tech",
    description: "Consultoria especializada em implementação de tecnologia",
  },
  {
    title: "Desenvolvimento",
    href: "/servicos/desenvolvimento",
    description: "Desenvolvimento de soluções personalizadas",
  },
  {
    title: "Treinamentos",
    href: "/servicos/treinamentos",
    description: "Cursos e workshops sobre tecnologia",
  },
];

export const MobileMenu = ({ categories }: { categories: Category[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] space-y-0">
        <SheetHeader>
          <SheetTitle className="flex items-center ">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <span className="text-lg font-bold">Ferres</span>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-2 space-y-4 px-4">
          <div className="space-y-2">
            <Link
              href="/"
              className="block text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
          </div>

          <div className="space-y-2">
            <Link
              href="/articles"
              className="block text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Artigos
            </Link>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Categorias</h3>
            <div className="ml-4 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.documentId}
                  href={`/categories/${category.slug}`}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Serviços</h3>
            <div className="ml-4 space-y-2">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Link
              href="/about"
              className="block text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
          </div>

          <div className="space-y-2">
            <Link
              href="/contato"
              className="block text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
