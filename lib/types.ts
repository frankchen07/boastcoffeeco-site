export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  variants: { edges: { node: ShopifyProductVariant }[] };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoneyV2;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoneyV2;
    totalAmount: ShopifyMoneyV2;
  };
  lines: { edges: { node: CartLine }[] };
}

// Normalized types for component use
export interface NormalizedProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  price: string;
  currencyCode: string;
  variantId: string;
  availableForSale: boolean;
}

export interface NormalizedCartLine {
  id: string;
  quantity: number;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  handle: string;
  image: ShopifyImage | null;
}

export interface NormalizedCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: string;
  total: string;
  currencyCode: string;
  lines: NormalizedCartLine[];
}
