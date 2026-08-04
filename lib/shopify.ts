import { createShopifyClient, MOCK_PRODUCTS, formatPrice } from "./shopify-client";

export const SHOPIFY_ACCOUNT_URL = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN}/account`
  : null;

const client = createShopifyClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
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
