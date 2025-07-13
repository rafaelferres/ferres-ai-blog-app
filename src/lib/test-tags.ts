// Arquivo de teste para verificar diferentes formatos de tags
import { processTags } from "./utils";

// Teste com diferentes formatos de tags
export function testTagsFormats() {
  console.log("=== Testando diferentes formatos de tags ===");

  // Formato mockado (array de strings)
  const mockTags = ["javascript", "react", "nextjs"];
  console.log("Mock tags:", processTags(mockTags));

  // Formato JSON string do Strapi
  const jsonTags = '["nodejs", "express", "mongodb"]';
  console.log("JSON string tags:", processTags(jsonTags));

  // Formato direto do Strapi (campo JSON já parseado)
  const strapiTags = ["typescript", "frontend", "backend"];
  console.log("Strapi tags:", processTags(strapiTags));

  // Array misto (filtra apenas strings)
  const mixedTags = ["python", 123, "django", null, "flask"];
  console.log("Mixed array:", processTags(mixedTags));

  // Formato inválido
  const invalidTags = null;
  console.log("Invalid tags:", processTags(invalidTags));

  // String única
  const singleTag = "python";
  console.log("Single tag:", processTags(singleTag));

  // JSON inválido
  const invalidJson = '["python", "django"';
  console.log("Invalid JSON:", processTags(invalidJson));
}
