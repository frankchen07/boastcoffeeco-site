"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";
import type { NormalizedProduct } from "@/lib/types";

function findVariant(product: NormalizedProduct, selected: Record<string, string>) {
  return (
    product.variants.find((variant) =>
      variant.selectedOptions.every((opt) => selected[opt.name] === opt.value)
    ) ?? product.variants[0]
  );
}

export default function AddToCartButton({ product }: { product: NormalizedProduct }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const first = product.variants[0];
    return Object.fromEntries(
      (first?.selectedOptions ?? []).map((opt) => [opt.name, opt.value])
    );
  });

  const variant = useMemo(
    () => findVariant(product, selectedOptions),
    [product, selectedOptions]
  );

  const [sellingPlanId, setSellingPlanId] = useState<string | null>(null);

  const sellingPlans = variant?.sellingPlans ?? [];
  const selectedPlan = sellingPlans.find((plan) => plan.id === sellingPlanId) ?? null;

  async function handleAdd() {
    if (!variant?.availableForSale) return;
    setAdding(true);
    try {
      await addItem(variant.id, 1, selectedPlan?.id);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {product.options.map((option) => (
        <div key={option.name}>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-muted)] mb-2">
            {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
                  }
                  className={`px-3.5 py-2 text-sm rounded border transition-colors ${
                    isSelected
                      ? "border-[var(--color-brand-dark)] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)]"
                      : "border-[var(--color-brand-border)] text-[var(--color-brand-dark)] hover:border-[var(--color-brand-muted)]"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {sellingPlans.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-muted)] mb-2">
            Purchase Options
          </p>
          <div className="flex flex-col gap-2">
            <label
              className={`flex items-center justify-between px-4 py-3 rounded border cursor-pointer transition-colors ${
                sellingPlanId === null
                  ? "border-[var(--color-brand-dark)]"
                  : "border-[var(--color-brand-border)]"
              }`}
            >
              <span className="flex items-center gap-2 text-sm text-[var(--color-brand-dark)]">
                <input
                  type="radio"
                  name="purchase-option"
                  checked={sellingPlanId === null}
                  onChange={() => setSellingPlanId(null)}
                />
                One-time purchase
              </span>
              <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
                {variant && formatPrice(variant.price, product.currencyCode)}
              </span>
            </label>
            {sellingPlans.map((plan) => (
              <label
                key={plan.id}
                className={`flex items-center justify-between px-4 py-3 rounded border cursor-pointer transition-colors ${
                  sellingPlanId === plan.id
                    ? "border-[var(--color-brand-dark)]"
                    : "border-[var(--color-brand-border)]"
                }`}
              >
                <span className="flex items-center gap-2 text-sm text-[var(--color-brand-dark)]">
                  <input
                    type="radio"
                    name="purchase-option"
                    checked={sellingPlanId === plan.id}
                    onChange={() => setSellingPlanId(plan.id)}
                  />
                  {plan.name}
                </span>
                <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
                  {formatPrice(plan.price, product.currencyCode)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={!variant?.availableForSale || adding}
        className="w-full bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] text-sm font-semibold py-4 rounded hover:bg-[var(--color-brand-accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {adding
          ? "Adding to Cart…"
          : variant?.availableForSale
          ? "Add to Cart"
          : "Sold Out"}
      </button>
    </div>
  );
}
