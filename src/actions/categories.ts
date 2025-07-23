"use server";

import { strapiClient } from "@/lib/strapi";
import { unstable_noStore as noStore } from "next/cache";

/**
 * Busca todas as categorias
 */
export async function getCategories() {
  noStore();

  try {
    const { data } = await strapiClient.collection("categories").find({
      sort: ["name:asc"],
    });

    return data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Falha ao carregar categorias");
  }
}

/**
 * Busca uma categoria específica por slug
 */
export async function getCategoryBySlug(slug: string) {
  noStore();

  try {
    const { data } = await strapiClient.collection("categories").find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
    });

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("Erro ao buscar categoria por slug:", error);
    return null;
  }
}
