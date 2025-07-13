"use server";

import { strapiClient } from "@/lib/strapi";
import { unstable_noStore as noStore } from "next/cache";

export async function getArticles() {
  noStore();

  try {
    const { data } = await strapiClient.collection("articles").find({
      populate: ["cover", "author", "category"],
    });

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export const getArticleByCategory = async (
  category: string,
  pageSize: number = 1,
  page: number = 1
) => {
  noStore();

  try {
    const { data } = await strapiClient.collection("articles").find({
      filters: { category: { name: { $eq: category } } },
      populate: ["cover", "author", "category"],
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: pageSize,
        page: page,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return [];
  }
};

export const getArticlePagination = async (pageSize: number, page: number) => {
  noStore();

  try {
    const { data } = await strapiClient.collection("articles").find({
      populate: ["cover", "author", "category"],
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: pageSize,
        page: page,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const getArticlesPaginated = async (
  pageSize: number = 9,
  page: number = 1,
  search?: string,
  category?: string
) => {
  noStore();

  try {
    const filters: any = {};

    // Adicionar filtro de busca
    if (search && search.trim()) {
      filters.title = { $containsi: search };
    }

    // Adicionar filtro de categoria
    if (category && category.trim()) {
      filters.category = {
        slug: { $eq: category },
      };
    }

    const queryParams: any = {
      populate: ["cover", "author", "category"],
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: pageSize,
        page: page,
      },
    };

    // Adicionar filtros apenas se existirem
    if (Object.keys(filters).length > 0) {
      queryParams.filters = filters;
    }

    const response = await strapiClient
      .collection("articles")
      .find(queryParams);

    return {
      data: response.data || [],
      meta: response.meta || {},
    };
  } catch (error) {
    console.error("Error fetching articles with filters:", error);

    // Fallback: tentar buscar sem filtros se der erro
    if (search || category) {
      console.warn("Retrying without filters...");
      try {
        const response = await strapiClient.collection("articles").find({
          populate: ["cover", "author", "category"],
          sort: ["createdAt:desc"],
          pagination: {
            pageSize: pageSize,
            page: page,
          },
        });

        return {
          data: response.data || [],
          meta: response.meta || {},
        };
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
      }
    }

    return {
      data: [],
      meta: {},
    };
  }
};

export const getArticleBySlug = async (slug: string) => {
  noStore();

  try {
    const { data } = await strapiClient.collection("articles").find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["cover", "author", "category", "blocks"],
    });

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
};

export const getRelatedArticles = async (
  articleId: string,
  categoryId?: string,
  limit: number = 3
) => {
  noStore();

  try {
    const filters: any = {
      id: {
        $ne: articleId,
      },
    };

    if (categoryId) {
      filters.category = {
        id: {
          $eq: categoryId,
        },
      };
    }

    const { data } = await strapiClient.collection("articles").find({
      filters,
      populate: ["cover", "author", "category"],
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: limit,
        page: 1,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
};

export const getPopularArticles = async (limit: number = 5) => {
  noStore();

  try {
    // Tenta primeiro com visit_count, se falhar usa apenas createdAt
    let data;
    try {
      const response = await strapiClient.collection("articles").find({
        populate: ["cover", "author", "category"],
        sort: ["visit_weekly_count:desc", "createdAt:desc"],
        pagination: {
          pageSize: limit,
          page: 1,
        },
      });
      data = response.data;
    } catch {
      console.warn(
        "visit_weekly_count field not available, falling back to createdAt sort"
      );
      // Fallback para ordenação apenas por data se visit_weekly_count não existir
      const response = await strapiClient.collection("articles").find({
        populate: ["cover", "author", "category"],
        sort: ["createdAt:desc"],
        pagination: {
          pageSize: limit,
          page: 1,
        },
      });
      data = response.data;
    }

    return data;
  } catch (error) {
    console.error("Error fetching popular articles:", error);
    return [];
  }
};

export const getRecentArticles = async (limit: number = 5) => {
  noStore();

  try {
    const { data } = await strapiClient.collection("articles").find({
      populate: ["cover", "author", "category"],
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: limit,
        page: 1,
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching recent articles:", error);
    return [];
  }
};
