import { createShopifyClient } from "./shopify-client";
import { SHOPIFY_ACCOUNT_URL } from "./shopify";

export { SHOPIFY_ACCOUNT_URL };

const client = createShopifyClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontToken: process.env.SHOPIFY_WHOLESALE_STOREFRONT_ACCESS_TOKEN,
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
