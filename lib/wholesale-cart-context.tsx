"use client";

import { createCartContext } from "./cart-context";
import * as wholesaleClient from "./shopify-wholesale";

export const { CartProvider: WholesaleCartProvider, useCart: useWholesaleCart } =
  createCartContext("boast_wholesale_cart_id", wholesaleClient);
