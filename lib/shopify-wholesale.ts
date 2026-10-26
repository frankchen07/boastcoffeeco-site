import "server-only";
import { createShopifyClient } from "./shopify-client";
import { SHOPIFY_ACCOUNT_URL } from "./shopify";

export { SHOPIFY_ACCOUNT_URL };

const client = createShopifyClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontToken: process.env.SHOPIFY_WHOLESALE_STOREFRONT_PRIVATE_TOKEN,
  isPrivateToken: true,
});

export const {
  getProducts,
  getProduct,
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
  getCart,
} = client;
