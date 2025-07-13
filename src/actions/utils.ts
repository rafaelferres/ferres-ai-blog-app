"use server";

import { strapiClient } from "@/lib/strapi";

/**
 * Função utilitária para buscar dados de qualquer coleção
 */
export async function fetchCollection<T>(
  collection: string,
  params?: any
): Promise<{ data: T[]; meta: Record<string, unknown> }> {
  try {
    const response = await strapiClient.collection(collection).find(params);
    return response as { data: T[]; meta: Record<string, unknown> };
  } catch (error) {
    console.error(`Erro ao buscar ${collection}:`, error);
    throw new Error(`Falha ao carregar ${collection}`);
  }
}

/**
 * Função utilitária para buscar um item específico por documentId
 */
export async function fetchItemById<T>(
  collection: string,
  documentId: string,
  params?: any
): Promise<T | null> {
  try {
    const response = await strapiClient
      .collection(collection)
      .findOne(documentId, params);
    return response as T;
  } catch (error) {
    console.error(`Erro ao buscar ${collection} por documentId:`, error);
    return null;
  }
}

/**
 * Função utilitária para buscar itens por filtro
 */
export async function fetchItemsByFilter<T>(
  collection: string,
  filter: Record<string, unknown>,
  params?: any
): Promise<T[]> {
  try {
    const response = await strapiClient.collection(collection).find({
      filters: filter,
      ...params,
    });

    return (response.data || []) as T[];
  } catch (error) {
    console.error(`Erro ao buscar ${collection} por filtro:`, error);
    return [];
  }
}

/**
 * Função utilitária para buscar um item por slug
 */
export async function fetchItemBySlug<T>(
  collection: string,
  slug: string,
  params?: any
): Promise<T | null> {
  try {
    const response = await strapiClient.collection(collection).find({
      filters: { slug: { $eq: slug } },
      ...params,
    });

    const items = response.data as T[];
    return items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error(`Erro ao buscar ${collection} por slug:`, error);
    return null;
  }
}

/**
 * Função utilitária para buscar dados com paginação
 */
export async function fetchWithPagination<T>(
  collection: string,
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<{ data: T[]; meta: { pagination: Record<string, unknown> } }> {
  try {
    const response = await strapiClient.collection(collection).find({
      pagination: { page, pageSize },
      ...params,
    });

    return response as unknown as {
      data: T[];
      meta: { pagination: Record<string, unknown> };
    };
  } catch (error) {
    console.error(`Erro ao buscar ${collection} com paginação:`, error);
    throw new Error(`Falha ao carregar ${collection}`);
  }
}

/**
 * Função utilitária para buscar dados com ordenação
 */
export async function fetchWithSorting<T>(
  collection: string,
  sort: string | string[],
  params?: any
): Promise<T[]> {
  try {
    const response = await strapiClient.collection(collection).find({
      sort,
      ...params,
    });

    return (response.data || []) as T[];
  } catch (error) {
    console.error(`Erro ao buscar ${collection} com ordenação:`, error);
    return [];
  }
}

/**
 * Função utilitária para buscar dados com população de relacionamentos
 */
export async function fetchWithPopulate<T>(
  collection: string,
  populate: string | string[] | Record<string, unknown>,
  params?: any
): Promise<T[]> {
  try {
    const response = await strapiClient.collection(collection).find({
      populate,
      ...params,
    });

    return (response.data || []) as T[];
  } catch (error) {
    console.error(`Erro ao buscar ${collection} com população:`, error);
    return [];
  }
}
