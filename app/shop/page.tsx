import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import ProductGrid from "@/components/sections/ProductGrid";
import { LinkButton } from "@/components/ui/Button";
import { getProducts, MOCK_PRODUCTS } from "@/lib/shopify";
import type { NormalizedProduct } from "@/lib/types";

export const revalidate = 3600; // ISR: revalidate hourly

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full lineup of specialty coffees and nitro cold brew.",
};

async function getAllProducts(): Promise<NormalizedProduct[]> {
  try {
    const products = await getProducts(12);
    return products.length > 0 ? products : MOCK_PRODUCTS;
  } catch {
    return MOCK_PRODUCTS;
  }
}

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-[var(--color-brand-cream)]">
      {/* Page header */}
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
            Our Products
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Shop
          </h1>
          <p className="mt-4 text-lg text-[var(--color-brand-muted)] max-w-lg">
            Small-batch espresso roasts, nitro cold brew, and our loved Kyoto-brewed espresso concentrate. 
          </p>
        </div>
      </div>

      {/* Product grid */}
      <div className="container-md py-16">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-[var(--color-brand-surface)] rounded animate-pulse"
                />
              ))}
            </div>
          }
        >
          <ProductGrid products={products} columns={3} />
        </Suspense>
      </div>

      {/* B2B CTA */}
      <section className="relative py-20 border-t border-[var(--color-brand-border)] overflow-hidden">
        <Image
          src="/boast-coffee-buckets-1.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[var(--color-brand-surface)]/88" />
        <div className="relative container-md text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
            Need more than a bag?
          </h2>
          <p className="text-[var(--color-brand-muted)] mb-8 max-w-md mx-auto">
            We also offer wholesale espresso concentrate designed for high-volume iced espresso service, nitro keg service, and full coffee catering
            for events. Get in touch and we&apos;ll figure out what works.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <LinkButton href="/contact" size="lg">
              Get in Touch
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
