"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown, Menu, X, Brain } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface MenuItem {
  title: string;
  href?: string;
  description?: string;
  children?: MenuItem[];
}

interface ResizableNavbarProps {
  items: MenuItem[];
  className?: string;
}

export function ResizableNavbar({ items, className }: ResizableNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (items[index].children && !isMobile) {
      setActiveItem(index);
    }
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <motion.div
      initial={{ width: "100%" }}
      animate={{
        width: isScrolled ? "fit-content" : "100%",
        maxWidth: isScrolled ? "700px" : "100%",
        top: isScrolled ? "8px" : "0px",
      }}
      transition={{
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      }}
      className={cn(
        "fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300",
        className
      )}
    >
      <motion.div
        animate={{
          borderRadius: isScrolled ? "9999px" : "0px",
          padding: isScrolled ? "8px 16px" : "0px",
        }}
        transition={{
          duration: 0.3,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
        className={cn(
          "transition-all duration-300",
          isScrolled
            ? "bg-card/95 backdrop-blur-sm border border-border shadow-lg"
            : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
        )}
      >
        {/* Desktop Navigation */}
        <div
          className={cn(
            "transition-all duration-300",
            !isScrolled && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          )}
        >
          <nav
            className={cn(
              "hidden md:flex items-center justify-between space-x-2",
              !isScrolled && "h-16"
            )}
          >
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <Link href="/" className="flex items-center mr-6">
                <Brain
                  className={cn(
                    "text-primary mr-2 transition-all duration-300",
                    isScrolled ? "h-6 w-6" : "h-8 w-8"
                  )}
                />
                <span
                  className={cn(
                    "font-bold night-tech-text-gradient transition-all duration-300",
                    isScrolled ? "text-base" : "text-xl"
                  )}
                >
                  Ferres
                </span>
              </Link>

              {/* Navigation Items */}
              {items.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200",
                        isScrolled && "px-2 py-1"
                      )}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        "flex cursor-pointer items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200",
                        isScrolled && "px-2 py-1"
                      )}
                    >
                      {item.title}
                      {item.children && (
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 transition-transform duration-200",
                            activeItem === index && "rotate-180"
                          )}
                        />
                      )}
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeItem === index && item.children && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl overflow-hidden z-50"
                        style={{
                          minWidth: isScrolled ? "400px" : "500px",
                          maxWidth: isScrolled ? "600px" : "800px",
                        }}
                      >
                        <div
                          className={cn(
                            "transition-all duration-300",
                            isScrolled ? "p-4" : "p-6"
                          )}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.href || "#"}
                                className={cn(
                                  "group block rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-primary/20",
                                  isScrolled ? "p-2" : "p-3"
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-1">
                                    <h4
                                      className={cn(
                                        "font-semibold text-foreground group-hover:text-primary transition-colors capitalize",
                                        isScrolled ? "text-xs" : "text-sm"
                                      )}
                                    >
                                      {child.title}
                                    </h4>
                                    {child.description && (
                                      <p
                                        className={cn(
                                          "text-muted-foreground mt-1 line-clamp-2 leading-relaxed",
                                          isScrolled ? "text-xs" : "text-xs"
                                        )}
                                      >
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300",
            isScrolled ? "px-4" : "px-6"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between space-x-4",
              isScrolled ? "py-0" : "h-20"
            )}
          >
            <Link href="/" className="flex items-center">
              <Brain
                className={cn(
                  "text-primary mr-3 transition-all duration-300",
                  isScrolled ? "h-6 w-6" : "h-8 w-8"
                )}
              />
              <span
                className={cn(
                  "font-bold night-tech-text-gradient transition-all duration-300",
                  isScrolled ? "text-lg" : "text-xl"
                )}
              >
                Ferres
              </span>
            </Link>
            <div className="flex items-center space-x-3">
              <div>
                <ThemeToggle />
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg hover:bg-muted/50 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 mx-2 bg-card border border-border rounded-lg shadow-2xl overflow-hidden z-50 md:hidden"
            >
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="block px-4 py-4 rounded-lg text-base font-medium text-foreground hover:bg-muted/70 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <div>
                          <div className="px-4 py-4 text-base font-semibold text-foreground border-b border-border/30 mb-3">
                            {item.title}
                          </div>
                          {item.children && (
                            <div className="space-y-2 mb-4">
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.href || "#"}
                                  className="block px-4 py-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors ml-2"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
