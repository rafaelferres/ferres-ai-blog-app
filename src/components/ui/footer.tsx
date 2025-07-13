import Link from "next/link";
import { Github, Linkedin, Heart, Instagram } from "lucide-react";
import { Category } from "@/types/strapi";
import { IconBrandTiktok } from "@tabler/icons-react";

interface FooterProps {
  categories: Category[];
}

export function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  FA
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">Ferres</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Blog sobre tecnologia e desenvolvimento. Compartilhando
              conhecimento e experiências.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/rafaelferres"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/ferres.ia/"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rafael-ferres/"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@ferres.ia"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <IconBrandTiktok className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navegação */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Navegação
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Notícias
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Comunidade
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre
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
              {categories.map((category) => (
                <li key={category.documentId}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>© 2024 Ferres. Feito com</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>usando Next.js e Tailwind CSS.</span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Termos
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
