// Tipos base do Strapi v5
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type StrapiData<T> = T & {
  documentId: string;
  id?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale?: string;
};

// Tipos para entidades específicas
export interface Post {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: {
    data: StrapiData<{
      url: string;
      alternativeText?: string;
      width: number;
      height: number;
    }> | null;
  };
  author?: {
    data: StrapiData<{
      name: string;
      email: string;
      avatar?: {
        url: string;
      };
    }> | null;
  };
  categories?: {
    data: StrapiData<{
      name: string;
      slug: string;
    }>[];
  };
  tags?: any;
}

export interface Category {
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  posts?: {
    data: StrapiData<Post>[];
  };
}

export interface Tag {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  posts?: {
    data: StrapiData<Post>[];
  };
}

export interface User {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: {
    url: string;
  };
}

// Tipos para parâmetros de consulta
export interface QueryParams {
  populate?: string | string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string | string[];
  publicationState?: "live" | "preview";
  locale?: string | string[];
}
