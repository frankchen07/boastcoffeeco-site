import type { MetadataRoute } from "next";
import { getProducts, MOCK_PRODUCTS } from "@/lib/shopify";

const BASE_URL = "https://www.boastcoffee.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/book-event`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/catering`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/visit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/wholesale`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/wholesale/apply`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/office-programs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/office-programs/apply`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/accessibility`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const products = await getProducts(50);
    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${BASE_URL}/shop/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    const mockRoutes: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((p) => ({
      url: `${BASE_URL}/shop/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...mockRoutes];
  }
}
