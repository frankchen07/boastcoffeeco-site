import type {
  ShopifyProduct,
  ShopifyProductVariant,
  Cart,
  NormalizedProduct,
  NormalizedVariant,
  NormalizedCart,
  NormalizedCartLine,
} from "./types";

const SHOPIFY_ENDPOINT = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2026-04/graphql.json`
  : null;

const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const SHOPIFY_ACCOUNT_URL = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN}/account`
  : null;

// ─── GraphQL Fragments ───────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage { url altText width height }
    images(first: 5) { edges { node { url altText width height } } }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    options { name values }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          sellingPlanAllocations(first: 10) {
            edges {
              node {
                sellingPlan { id name description recurringDeliveries }
                priceAdjustments { price { amount currencyCode } }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          sellingPlanAllocation {
            sellingPlan { name }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                title
                handle
                featuredImage { url altText width height }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── Fetch Helper ─────────────────────────────────────────────────────────────

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!SHOPIFY_ENDPOINT || !STOREFRONT_TOKEN) {
    throw new Error(
      "Shopify credentials not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env"
    );
  }

  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0].message}`);
  }

  return json.data as T;
}

// ─── Normalizers ──────────────────────────────────────────────────────────────

function normalizeVariant(variant: ShopifyProductVariant): NormalizedVariant {
  return {
    id: variant.id,
    title: variant.title,
    availableForSale: variant.availableForSale,
    price: variant.price.amount,
    compareAtPrice: variant.compareAtPrice?.amount ?? null,
    selectedOptions: variant.selectedOptions,
    sellingPlans: variant.sellingPlanAllocations.edges.map(({ node }) => ({
      id: node.sellingPlan.id,
      name: node.sellingPlan.name,
      description: node.sellingPlan.description,
      price: node.priceAdjustments[0]?.price.amount ?? variant.price.amount,
    })),
  };
}

function normalizeProduct(product: ShopifyProduct): NormalizedProduct {
  const variants = product.variants.edges.map(({ node }) => normalizeVariant(node));
  const firstVariant = variants[0];
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    image: product.featuredImage ?? null,
    price: product.priceRange.minVariantPrice.amount,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    variantId: firstVariant?.id ?? "",
    availableForSale: firstVariant?.availableForSale ?? false,
    options: product.options,
    variants,
  };
}

function normalizeCart(cart: Cart): NormalizedCart {
  const lines: NormalizedCartLine[] = cart.lines.edges.map(({ node }) => ({
    id: node.id,
    quantity: node.quantity,
    variantId: node.merchandise.id,
    productTitle: node.merchandise.product.title,
    variantTitle: node.merchandise.title,
    sellingPlanName: node.sellingPlanAllocation?.sellingPlan.name ?? null,
    price: node.merchandise.price.amount,
    currencyCode: node.merchandise.price.currencyCode,
    handle: node.merchandise.product.handle,
    image: node.merchandise.product.featuredImage ?? null,
  }));

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: cart.cost.subtotalAmount.amount,
    total: cart.cost.totalAmount.amount,
    currencyCode: cart.cost.totalAmount.currencyCode,
    lines,
  };
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(first = 12): Promise<NormalizedProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
    `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        edges { node { ...ProductFields } }
      }
    }
    `,
    { first }
  );
  return data.products.edges.map(({ node }) => normalizeProduct(node));
}

export async function getProduct(handle: string): Promise<NormalizedProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
    `,
    { handle }
  );
  return data.productByHandle ? normalizeProduct(data.productByHandle) : null;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart(): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartCreate {
      cartCreate { cart { ...CartFields } }
    }
    `
  );
  return normalizeCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number; sellingPlanId?: string }[]
): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
    }
    `,
    { cartId, lines }
  );
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } }
    }
    `,
    { cartId, lineIds }
  );
  return normalizeCart(data.cartLinesRemove.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<NormalizedCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
    }
    `,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<NormalizedCart | null> {
  const data = await shopifyFetch<{ cart: Cart | null }>(
    `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    `,
    { cartId }
  );
  return data.cart ? normalizeCart(data.cart) : null;
}

// ─── Mock data for development (no Shopify store yet) ─────────────────────────

function mockVariant(id: string, price: string): NormalizedVariant {
  return {
    id,
    title: "Default Title",
    availableForSale: true,
    price,
    compareAtPrice: null,
    selectedOptions: [],
    sellingPlans: [],
  };
}

export const MOCK_PRODUCTS: NormalizedProduct[] = [
  {
    id: "mock-1",
    handle: "signature-blend",
    title: "Signature Blend",
    description: "Our flagship medium roast from Guatemala. Rich, balanced, smooth.",
    descriptionHtml:
      "<p>Our flagship medium roast from Guatemala. Rich, balanced, smooth.</p>",
    image: null,
    price: "18.00",
    currencyCode: "USD",
    variantId: "mock-variant-1",
    availableForSale: true,
    options: [],
    variants: [mockVariant("mock-variant-1", "18.00")],
  },
  {
    id: "mock-2",
    handle: "single-origin-ethiopia",
    title: "Single Origin Ethiopia",
    description: "Bright and fruity with notes of blueberry and citrus.",
    descriptionHtml: "<p>Bright and fruity with notes of blueberry and citrus.</p>",
    image: null,
    price: "22.00",
    currencyCode: "USD",
    variantId: "mock-variant-2",
    availableForSale: true,
    options: [],
    variants: [mockVariant("mock-variant-2", "22.00")],
  },
  {
    id: "mock-3",
    handle: "nitro-cold-brew-can",
    title: "Espresso Concentrate 25oz",
    description: "Velvety smooth concentrate brewed Kyoto-style.",
    descriptionHtml: "<p>Velvety smooth concentrate brewed Kyoto-style.</p>",
    image: null,
    price: "6.00",
    currencyCode: "USD",
    variantId: "mock-variant-3",
    availableForSale: true,
    options: [],
    variants: [mockVariant("mock-variant-3", "6.00")],
  },
];

export function formatPrice(amount: string, currencyCode = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
