import { strapiClient } from "@/lib/strapi";

async function testSearchFunctionality() {
  console.log("Testing search functionality...");

  try {
    // Test 1: Basic articles fetch
    console.log("Test 1: Basic articles fetch");
    const basicResponse = await strapiClient.collection("articles").find({
      populate: ["cover", "author", "category"],
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: 5,
        page: 1,
      },
    });
    console.log(
      "Basic fetch successful:",
      basicResponse.data.length,
      "articles"
    );

    // Test 2: Search with title filter
    console.log("Test 2: Search with title filter");
    const titleResponse = await strapiClient.collection("articles").find({
      filters: {
        title: { $containsi: "AGI" },
      },
      populate: ["cover", "author", "category"],
      sort: ["createdAt:desc"],
      pagination: {
        pageSize: 5,
        page: 1,
      },
    });
    console.log(
      "Title search successful:",
      titleResponse.data.length,
      "articles"
    );

    // Test 3: Check available fields in first article
    if (basicResponse.data.length > 0) {
      console.log("Test 3: Available fields in first article");
      console.log("Fields:", Object.keys(basicResponse.data[0]));
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testSearchFunctionality();
