"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
  getCart,
} from "./shopify";
import type { NormalizedCart } from "./types";

const CART_ID_KEY = "boast_cart_id";

interface CartContextValue {
  cart: NormalizedCart | null;
  isOpen: boolean;
  isLoading: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<NormalizedCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (!savedCartId) return;
    getCart(savedCartId)
      .then((c) => {
        if (c) setCart(c);
        else localStorage.removeItem(CART_ID_KEY);
      })
      .catch(() => localStorage.removeItem(CART_ID_KEY));
  }, []);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart?.id) return cart.id;
    const newCart = await createCart();
    setCart(newCart);
    localStorage.setItem(CART_ID_KEY, newCart.id);
    return newCart.id;
  }, [cart]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setIsLoading(true);
      try {
        const cartId = await ensureCart();
        const updated = await addToCart(cartId, [{ merchandiseId: variantId, quantity }]);
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
        const updated = await removeFromCart(cart.id, [lineId]);
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
        const updated = await updateCartLine(cart.id, lineId, quantity);
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

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
