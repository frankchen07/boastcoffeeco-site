import type { MetadataRoute } from "next";
import { getProducts, MOCK_PRODUCTS } from "@/lib/shopify";

const BASE_URL = "https://www.boastcoffee.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/nitro`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
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
