import { getCategories } from "@/actions/categories";
import { Category } from "@/types/strapi";
import { HeaderClient } from "./header-client";

export const Header = async () => {
  const categories = await getCategories();

  return <HeaderClient categories={categories as unknown as Category[]} />;
};
