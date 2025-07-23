import { strapi } from "@strapi/client";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const strapiToken = process.env.STRAPI_API_TOKEN;

if (!strapiToken) {
  console.warn("STRAPI_API_TOKEN não está definido nas variáveis de ambiente");
}

export const strapiClient = strapi({
  baseURL: `${strapiUrl}/api`,
  auth: strapiToken,
});

export default strapiClient;
