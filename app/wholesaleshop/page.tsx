import { Suspense } from "react";
import type { Metadata } from "next";
import ProductGrid from "@/components/sections/ProductGrid";
import { getProducts } from "@/lib/shopify-wholesale";
import { MOCK_PRODUCTS } from "@/lib/shopify-client";
import { useWholesaleCart } from "@/lib/wholesale-cart-context";
import type { NormalizedProduct } from "@/lib/types";

export const revalidate = 3600; // ISR: revalidate hourly

export const metadata: Metadata = {
  title: "Wholesale",
  description: "Wholesale ordering for Boast Coffee Co. partners.",
  robots: { index: false, follow: false },
};

async function getAllProducts(): Promise<NormalizedProduct[]> {
  try {
    const products = await getProducts(12);
    return products.length > 0 ? products : MOCK_PRODUCTS;
  } catch {
    return MOCK_PRODUCTS;
  }
}

export default async function WholesaleShopPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-[var(--color-brand-cream)]">
      {/* Page header */}
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
            Wholesale Ordering
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Wholesale Shop
          </h1>
          <p className="mt-4 text-lg text-[var(--color-brand-muted)] max-w-lg">
            Bulk sizes and wholesale pricing for our partner accounts.
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
          <ProductGrid
            products={products}
            columns={3}
            useCartHook={useWholesaleCart}
            shopBasePath="/wholesaleshop"
          />
        </Suspense>
      </div>
    </div>
  );
}
