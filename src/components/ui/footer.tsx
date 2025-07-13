"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Category } from "@/types/strapi";
import { useToast } from "./toast";

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  const { showToast, ToastContainer } = useToast();

  const handleNewsletterSubscribe = () => {
    showToast(
      "Newsletter ainda está desativada. Estamos trabalhando para disponibilizá-la em breve!",
      "error"
    );
  };

  return (
    <>
      <footer className="bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  Ferres
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tecnologia, inovação e desenvolvimento em um só lugar. Artigos,
                tutoriais e insights sobre o mundo da programação.
              </p>
            </div>

            {/* Links Rápidos */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Links Rápidos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Artigos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Comunidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categorias */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Categorias
              </h3>
              <ul className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.documentId}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Newsletter
              </h3>
              <p className="text-sm text-muted-foreground">
                Receba os melhores artigos diretamente no seu e-mail.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleNewsletterSubscribe}
                  className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>© 2025 Ferres. Feito com</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>usando Next.js e Tailwind CSS.</span>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacidade
                </a>
                <a
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termos
                </a>
                <a
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
}
