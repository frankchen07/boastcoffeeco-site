"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { NormalizedProduct } from "@/lib/types";

export default function AddToCartButton({ product }: { product: NormalizedProduct }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  async function handleAdd() {
    if (!product.availableForSale || !product.variantId) return;
    setAdding(true);
    try {
      await addItem(product.variantId);
    } finally {
      setAdding(false);
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={!product.availableForSale || adding}
      className="w-full bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] text-sm font-semibold py-4 rounded hover:bg-[var(--color-brand-accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {adding
        ? "Adding to Cart…"
        : product.availableForSale
        ? "Add to Cart"
        : "Sold Out"}
    </button>
  );
}
