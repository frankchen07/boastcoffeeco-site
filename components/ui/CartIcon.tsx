"use client";

import { useCart } from "@/lib/cart-context";

export default function CartIcon() {
  const { openCart, itemCount } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
      className="relative p-2 text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] transition-colors"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-brand-accent)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
