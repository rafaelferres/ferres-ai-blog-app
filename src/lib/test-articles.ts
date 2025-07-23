import { getArticlesPaginated, getCategories, getArticles } from "@/actions";

async function testArticleFunctions() {
  console.log("Testing article functions...");

  try {
    // Test basic getArticles first
    console.log("Testing basic getArticles...");
    const basicArticles = await getArticles();
    console.log("Basic articles:", basicArticles.length);

    // Test getCategories
    console.log("Testing getCategories...");
    const categories = await getCategories();
    console.log("Categories:", categories.length);

    // Test getArticlesPaginated without filters
    console.log("Testing getArticlesPaginated without filters...");
    const result1 = await getArticlesPaginated(9, 1);
    console.log("Articles (no filters):", result1.data.length);
    console.log("Meta:", result1.meta);

    // Test getArticlesPaginated with search
    console.log("Testing getArticlesPaginated with search...");
    const result2 = await getArticlesPaginated(9, 1, "test");
    console.log("Articles (with search):", result2.data.length);

    // Test getArticlesPaginated with category
    if (categories.length > 0) {
      console.log("Testing getArticlesPaginated with category...");
      const result3 = await getArticlesPaginated(
        9,
        1,
        undefined,
        categories[0].slug
      );
      console.log("Articles (with category):", result3.data.length);
    }

    console.log("All tests completed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testArticleFunctions();
