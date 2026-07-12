"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/shopify";

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, removeItem, updateItem } = useCart();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<Element | null>(null);

  // Save pre-open focus target; restore it on close
  useEffect(() => {
    if (isOpen) {
      returnFocusRef.current = document.activeElement;
      closeButtonRef.current?.focus();
    } else if (returnFocusRef.current instanceof HTMLElement) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [isOpen]);

  // Focus trap + Escape
  useEffect(() => {
    if (!isOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { closeCart(); return; }
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        drawer!.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[var(--color-brand-cream)] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-brand-border)]">
          <h2 className="font-display text-lg font-semibold text-[var(--color-brand-dark)]">
            Your Cart
          </h2>
          <button
            ref={closeButtonRef}
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 text-[var(--color-brand-muted)] hover:text-[var(--color-brand-dark)] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p className="text-[var(--color-brand-muted)] text-sm">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="text-sm font-medium text-[var(--color-brand-accent)] hover:underline"
              >
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  {/* Product image */}
                  <div className="w-16 h-16 bg-[var(--color-brand-surface)] rounded overflow-hidden flex-shrink-0">
                    {line.image ? (
                      <Image
                        src={line.image.url}
                        alt={line.image.altText ?? line.productTitle}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-brand-muted)] text-xs">
                        No img
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-brand-dark)] truncate">
                      {line.productTitle}
                    </p>
                    {line.variantTitle !== "Default Title" && (
                      <p className="text-xs text-[var(--color-brand-muted)]">{line.variantTitle}</p>
                    )}
                    <p className="text-sm text-[var(--color-brand-dark)] mt-1">
                      {formatPrice(line.price, line.currencyCode)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[var(--color-brand-border)] rounded">
                        <button
                          onClick={() => updateItem(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          className="px-2.5 py-1 text-[var(--color-brand-muted)] hover:text-[var(--color-brand-dark)] disabled:opacity-50"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-2 py-1 text-sm font-medium text-[var(--color-brand-dark)] min-w-[2rem] text-center">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="px-2.5 py-1 text-[var(--color-brand-muted)] hover:text-[var(--color-brand-dark)] disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="text-xs text-[var(--color-brand-muted)] hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <div className="px-6 py-5 border-t border-[var(--color-brand-border)] space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-brand-muted)]">Subtotal</span>
              <span className="font-semibold text-[var(--color-brand-dark)]">
                {formatPrice(cart.subtotal, cart.currencyCode)}
              </span>
            </div>
            <p className="text-xs text-[var(--color-brand-muted)]">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              className="block w-full bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] text-center text-sm font-semibold py-3.5 rounded hover:bg-[var(--color-brand-accent)] transition-colors"
            >
              Checkout
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
