"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface MenuItem {
  title: string;
  href?: string;
  description?: string;
  children?: MenuItem[];
}

interface ResizableMenuProps {
  items: MenuItem[];
  className?: string;
}

export function ResizableMenu({ items, className }: ResizableMenuProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [menuDimensions, setMenuDimensions] = useState({ height: 0, width: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && activeItem !== null) {
      const content = contentRef.current;
      setMenuDimensions({
        height: content.scrollHeight,
        width: Math.max(450, content.scrollWidth),
      });
    }
  }, [activeItem]);

  const handleMouseEnter = (index: number) => {
    if (items[index].children) {
      setActiveItem(index);
    }
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <div className={cn("relative", className)}>
      <nav className="flex items-center space-x-2">
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
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                {item.title}
              </Link>
            ) : (
              <button className="flex cursor-pointer items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
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

            <AnimatePresence>
              {activeItem === index && item.children && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    height: menuDimensions.height || "auto",
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  style={{
                    minWidth: "420px",
                    maxWidth: "600px",
                    width: menuDimensions.width || "auto",
                  }}
                >
                  <div ref={contentRef} className="p-6">
                    <div className="grid grid-cols-2 gap-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href || "#"}
                          className="group block p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-primary/20"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors capitalize">
                                {child.title}
                              </h4>
                              {child.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
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
      </nav>
    </div>
  );
}
