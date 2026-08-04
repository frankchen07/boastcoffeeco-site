import { createShopifyClient, MOCK_PRODUCTS, formatPrice } from "./shopify-client";

export const SHOPIFY_ACCOUNT_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`
  : null;

const client = createShopifyClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  country: "US",
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

export { MOCK_PRODUCTS, formatPrice };
