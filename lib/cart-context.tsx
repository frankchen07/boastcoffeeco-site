"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ShopifyClient } from "./shopify-client";
import * as retailClient from "./shopify";
import type { NormalizedCart } from "./types";

export interface CartContextValue {
  cart: NormalizedCart | null;
  isOpen: boolean;
  isLoading: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number, sellingPlanId?: string) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
}

export function createCartContext(storageKey: string, client: ShopifyClient) {
  const CartContext = createContext<CartContextValue | null>(null);

  function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<NormalizedCart | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Restore cart from localStorage on mount
    useEffect(() => {
      const savedCartId = localStorage.getItem(storageKey);
      if (!savedCartId) return;
      client
        .getCart(savedCartId)
        .then((c) => {
          if (c) setCart(c);
          else localStorage.removeItem(storageKey);
        })
        .catch(() => localStorage.removeItem(storageKey));
    }, []);

    const ensureCart = useCallback(async (): Promise<string> => {
      if (cart?.id) return cart.id;
      const newCart = await client.createCart();
      setCart(newCart);
      localStorage.setItem(storageKey, newCart.id);
      return newCart.id;
    }, [cart]);

    const addItem = useCallback(
      async (variantId: string, quantity = 1, sellingPlanId?: string) => {
        setIsLoading(true);
        try {
          const cartId = await ensureCart();
          const updated = await client.addToCart(cartId, [
            { merchandiseId: variantId, quantity, sellingPlanId },
          ]);
          setCart(updated);
          setIsOpen(true);
        } finally {
          setIsLoading(false);
        }
      },
      [ensureCart]
    );

    const removeItem = useCallback(
      async (lineId: string) => {
        if (!cart?.id) return;
        setIsLoading(true);
        try {
          const updated = await client.removeFromCart(cart.id, [lineId]);
          setCart(updated);
        } finally {
          setIsLoading(false);
        }
      },
      [cart]
    );

    const updateItem = useCallback(
      async (lineId: string, quantity: number) => {
        if (!cart?.id) return;
        if (quantity <= 0) return removeItem(lineId);
        setIsLoading(true);
        try {
          const updated = await client.updateCartLine(cart.id, lineId, quantity);
          setCart(updated);
        } finally {
          setIsLoading(false);
        }
      },
      [cart, removeItem]
    );

    return (
      <CartContext.Provider
        value={{
          cart,
          isOpen,
          isLoading,
          itemCount: cart?.totalQuantity ?? 0,
          openCart: () => setIsOpen(true),
          closeCart: () => setIsOpen(false),
          addItem,
          removeItem,
          updateItem,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
  }

  return { CartProvider, useCart };
}

export const { CartProvider, useCart } = createCartContext("boast_cart_id", retailClient);
