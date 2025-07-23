"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 px-0 md:h-8 md:w-8"
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  // Partículas/estrelas para efeito visual
  const particles = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-primary rounded-full opacity-0"
      initial={{ opacity: 0, scale: 0 }}
      animate={
        isHovered
          ? {
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 20],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 20],
            }
          : {
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
            }
      }
      transition={{
        duration: 0.8,
        delay: i * 0.1,
        repeat: isHovered ? Infinity : 0,
        repeatDelay: 1,
      }}
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ));

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Efeito de aura/glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Partículas/estrelas */}
      {particles}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="h-9 w-9 px-0 md:h-8 md:w-8 relative overflow-hidden hover:bg-primary/10 transition-colors duration-200 rounded-full"
      >
        {/* Background animado */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.6 }}
          style={{
            background: isDark
              ? "linear-gradient(45deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)"
              : "linear-gradient(45deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
          }}
        />

        {/* Container do ícone */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            rotate: isDark ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.5,
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -180, scale: 0.3 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 180, scale: 0.3 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <motion.div
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    repeat: isHovered ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                >
                  <Moon className="h-4 w-4 text-primary drop-shadow-sm" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 180, scale: 0.3 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -180, scale: 0.3 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <motion.div
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <Sun className="h-4 w-4 text-primary drop-shadow-sm" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Efeito de brilho deslizante */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 1,
          }}
          style={{
            transform: "skewX(-20deg)",
          }}
        />

        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
