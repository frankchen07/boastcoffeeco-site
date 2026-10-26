"use client";

import { createCartContext } from "./cart-context";
import * as wholesaleCart from "./wholesale-cart-actions";

export const { CartProvider: WholesaleCartProvider, useCart: useWholesaleCart } =
  createCartContext("boast_wholesale_cart_id", wholesaleCart);
