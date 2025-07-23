"use server";

import { strapiClient } from "@/lib/strapi";
import { User, StrapiData } from "@/types/strapi";
import { unstable_noStore as noStore } from "next/cache";

/**
 * Busca todos os usuários/autores
 */
export async function getUsers(params?: any) {
  noStore();

  try {
    const response = await strapiClient.collection("users").find({
      populate: ["avatar"],
      sort: ["username:asc"],
      ...params,
    });

    return response;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw new Error("Falha ao carregar usuários");
  }
}

/**
 * Busca todos os autores
 */
export async function getAuthors(params?: any) {
  noStore();

  try {
    const response = await strapiClient.collection("authors").find({
      populate: ["avatar"],
      sort: ["name:asc"],
      ...params,
    });

    return response;
  } catch (error) {
    console.error("Erro ao buscar autores:", error);
    throw new Error("Falha ao carregar autores");
  }
}

/**
 * Busca um usuário específico por documentId
 */
export async function getUserById(
  documentId: string
): Promise<StrapiData<User> | null> {
  noStore();

  try {
    const response = await strapiClient
      .collection("users")
      .findOne(documentId, {
        populate: ["avatar"],
      });

    return response as unknown as StrapiData<User>;
  } catch (error) {
    console.error("Erro ao buscar usuário por documentId:", error);
    return null;
  }
}

/**
 * Busca um autor específico por documentId
 */
export async function getAuthorById(
  documentId: string
): Promise<StrapiData<User> | null> {
  noStore();

  try {
    const response = await strapiClient
      .collection("authors")
      .findOne(documentId, {
        populate: ["avatar"],
      });

    return response as unknown as StrapiData<User>;
  } catch (error) {
    console.error("Erro ao buscar autor por documentId:", error);
    return null;
  }
}

/**
 * Busca um usuário específico por username
 */
export async function getUserByUsername(
  username: string
): Promise<StrapiData<User> | null> {
  noStore();

  try {
    const response = await strapiClient.collection("users").find({
      filters: { username: { $eq: username } },
      populate: ["avatar"],
    });

    if (response.data && response.data.length > 0) {
      return response.data[0] as unknown as StrapiData<User>;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar usuário por username:", error);
    return null;
  }
}

/**
 * Busca um autor específico por name
 */
export async function getAuthorByName(
  name: string
): Promise<StrapiData<User> | null> {
  noStore();

  try {
    const response = await strapiClient.collection("authors").find({
      filters: { name: { $eq: name } },
      populate: ["avatar"],
    });

    if (response.data && response.data.length > 0) {
      return response.data[0] as unknown as StrapiData<User>;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar autor por name:", error);
    return null;
  }
}

/**
 * Busca um usuário específico por email
 */
export async function getUserByEmail(
  email: string
): Promise<StrapiData<User> | null> {
  noStore();

  try {
    const response = await strapiClient.collection("users").find({
      filters: { email: { $eq: email } },
      populate: ["avatar"],
    });

    if (response.data && response.data.length > 0) {
      return response.data[0] as unknown as StrapiData<User>;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    return null;
  }
}
