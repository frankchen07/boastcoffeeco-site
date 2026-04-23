import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import { LinkButton } from "@/components/ui/Button";
import { getProducts, MOCK_PRODUCTS } from "@/lib/shopify";
import type { NormalizedProduct } from "@/lib/types";

async function getFeaturedProducts(): Promise<NormalizedProduct[]> {
  try {
    const products = await getProducts(3);
    return products.length > 0 ? products : MOCK_PRODUCTS.slice(0, 3);
  } catch {
    // Shopify not configured yet — use mock data
    return MOCK_PRODUCTS.slice(0, 3);
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="Small-Batch Specialty Coffee"
        headline="Coffee worth boasting about."
        subhead="Sourced from the world's best growing regions. Roasted & brewed with intention, and delivered to where you are."
        primaryCta={{ label: "Shop Coffee", href: "/shop" }}
        dark
      />

      {/* Featured Products */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-2">
                Bestsellers
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)]">
                Shop
              </h2>
            </div>
            <LinkButton href="/shop" variant="ghost" size="sm">
              View all products →
            </LinkButton>
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[var(--color-brand-surface)] rounded animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <ProductGrid products={featured} columns={3} />
          </Suspense>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
              Coffee is our craft.
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-8">
              Boast started with a simple idea: coffee done well should be something worth telling people
              about. Every bean we roast and serve is our answer to that.
            </p>
            <LinkButton href="/about" variant="secondary">
              Our Story
            </LinkButton>
          </div>
        </div>
      </section>

    </>
  );
}
