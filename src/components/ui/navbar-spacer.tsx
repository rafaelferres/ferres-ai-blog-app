"use client";

import { useEffect, useState } from "react";

interface NavbarSpacerProps {
  children: React.ReactNode;
}

export function NavbarSpacer({ children }: NavbarSpacerProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Mobile: pt-20 sempre (header é h-20 em ambos os estados)
  // Desktop: pt-16 normal, pt-20 scrolled
  const paddingClass = isMobile ? "pt-20" : isScrolled ? "pt-20" : "pt-16";

  return <div className={paddingClass}>{children}</div>;
}
