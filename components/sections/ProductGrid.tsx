"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";
import type { NormalizedProduct } from "@/lib/types";

interface ProductCardProps {
  product: NormalizedProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  async function handleAddToCart() {
    if (!product.availableForSale || !product.variantId) return;
    setAdding(true);
    try {
      await addItem(product.variantId);
    } finally {
      setAdding(false);
    }
  }

  return (
    <article className="group flex flex-col bg-[var(--color-brand-cream)] border border-[var(--color-brand-border)] rounded overflow-hidden hover:border-[var(--color-brand-muted)] transition-colors">
      {/* Image */}
      <Link href={`/shop/${product.handle}`} aria-hidden="true" tabIndex={-1} className="block aspect-square bg-[var(--color-brand-surface)] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image.url}
            alt=""
            width={600}
            height={600}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-[var(--color-brand-border)]"
            >
              <path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
            </svg>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex-1">
          <Link
            href={`/shop/${product.handle}`}
            className="font-display text-base font-semibold text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
          <p className="text-sm text-[var(--color-brand-muted)] mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-base font-semibold text-[var(--color-brand-dark)]">
            {formatPrice(product.price, product.currencyCode)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!product.availableForSale || adding}
            className="text-xs font-semibold px-4 py-2 rounded bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {adding ? "Adding…" : product.availableForSale ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </article>
  );
}

interface ProductGridProps {
  products: NormalizedProduct[];
  columns?: 2 | 3;
}

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--color-brand-muted)]">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        columns === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
