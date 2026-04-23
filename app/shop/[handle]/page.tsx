import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, formatPrice, MOCK_PRODUCTS } from "@/lib/shopify";
import AddToCartButton from "@/components/sections/AddToCartButton";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  try {
    const product = await getProduct(handle);
    if (!product) return { title: "Product not found" };
    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    const mock = MOCK_PRODUCTS.find((p) => p.handle === handle);
    return mock ? { title: mock.title, description: mock.description } : { title: "Product" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;

  let product;
  try {
    product = await getProduct(handle);
    if (!product) {
      // fall back to mock
      product = MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
    }
  } catch {
    product = MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }

  if (!product) notFound();

  return (
    <div className="bg-[var(--color-brand-cream)]">
      <div className="container-md py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="aspect-square bg-[var(--color-brand-surface)] rounded overflow-hidden">
            {product.image ? (
              <Image
                src={product.image.url}
                alt={product.image.altText ?? product.title}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-[var(--color-brand-border)]"
                >
                  <path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
                </svg>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-3">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-[var(--color-brand-dark)]">
                {formatPrice(product.price, product.currencyCode)}
              </p>
            </div>

            <p className="text-[var(--color-brand-muted)] leading-relaxed">
              {product.description}
            </p>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
