import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para processar tags do Strapi
export function processTags(tags: any): string[] {
  if (!tags) return [];

  // Se já é um array de strings (dados mockados ou campo JSON do Strapi)
  if (Array.isArray(tags)) {
    return tags.filter((tag) => typeof tag === "string");
  }

  // Se é uma string JSON do Strapi que precisa ser parseada
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed)
        ? parsed.filter((tag) => typeof tag === "string")
        : [];
    } catch {
      // Se não conseguir parsear como JSON, trata como string única
      return [tags];
    }
  }

  return [];
}
