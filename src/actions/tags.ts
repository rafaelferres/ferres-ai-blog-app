"use server";

import { strapiClient } from "@/lib/strapi";
import { Tag, StrapiData } from "@/types/strapi";

/**
 * Busca todas as tags
 */
export async function getTags(params?: any) {
  try {
    const response = await strapiClient.collection("tags").find({
      populate: ["posts"],
      sort: ["name:asc"],
      ...params,
    });

    return response;
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    throw new Error("Falha ao carregar tags");
  }
}

/**
 * Busca uma tag específica por slug
 */
export async function getTagBySlug(
  slug: string
): Promise<StrapiData<Tag> | null> {
  try {
    const response = await strapiClient.collection("tags").find({
      filters: { slug: { $eq: slug } },
      populate: ["posts"],
    });

    if (response.data && response.data.length > 0) {
      return response.data[0] as unknown as StrapiData<Tag>;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar tag por slug:", error);
    throw new Error("Falha ao carregar tag");
  }
}

/**
 * Busca uma tag específica por documentId
 */
export async function getTagById(
  documentId: string
): Promise<StrapiData<Tag> | null> {
  try {
    const response = await strapiClient.collection("tags").findOne(documentId, {
      populate: ["posts"],
    });

    return response as unknown as StrapiData<Tag>;
  } catch (error) {
    console.error("Erro ao buscar tag por documentId:", error);
    return null;
  }
}

/**
 * Busca tags com contagem de posts
 */
export async function getTagsWithPostCount(): Promise<
  Array<StrapiData<Tag> & { postCount: number }>
> {
  try {
    const response = await strapiClient.collection("tags").find({
      populate: ["posts"],
      sort: ["name:asc"],
    });

    const tags = (response.data || []) as unknown as StrapiData<Tag>[];

    return tags.map((tag) => ({
      ...tag,
      postCount: (tag as any).posts?.data?.length || 0,
    }));
  } catch (error) {
    console.error("Erro ao buscar tags com contagem:", error);
    return [];
  }
}

/**
 * Busca tags populares (com mais posts)
 */
export async function getPopularTags(
  limit: number = 10
): Promise<Array<StrapiData<Tag> & { postCount: number }>> {
  try {
    const response = await strapiClient.collection("tags").find({
      populate: ["posts"],
      sort: ["name:asc"],
    });

    const tags = (response.data || []) as unknown as StrapiData<Tag>[];

    const tagsWithCount = tags.map((tag) => ({
      ...tag,
      postCount: (tag as any).posts?.data?.length || 0,
    }));

    // Ordena por número de posts (decrescente) e limita o resultado
    return tagsWithCount
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, limit);
  } catch (error) {
    console.error("Erro ao buscar tags populares:", error);
    return [];
  }
}
