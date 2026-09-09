import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Wholesale",
  description:
    "Boast Wholesale — organic, small-batch roasted coffee beans, nitro kegs, and espresso concentrate for cafés, restaurants, and resellers.",
};

const products = [
  {
    title: "Coffee Beans",
    description:
      "Organic, small-batch, and roasted in-house at wholesale prices. Traceable, consistent, and ready for espresso or drip.",
  },
  {
    title: "Nitro Kegs",
    description:
      "A fresh, ready-made nitro cold brew that complements what you're already pouring — no new equipment, no dedicated brew process. Tap it and pour.",
  },
  {
    title: "Espresso Concentrate",
    description:
      "Pull iced drinks off the espresso line entirely, so there's no bottleneck on the machine during a rush. Serve more drinks while retaining quality and consistency.",
  },
];

export default function WholesalePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[70dvh] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex items-center px-6 md:px-10 lg:pl-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))] lg:pr-16 py-24">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
              For Cafés, Restaurants &amp; Resellers
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Great coffee. No extra headache.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed mb-10">
              Organic, small-batch beans, nitro kegs, and espresso concentrate — roasted and prepped
              in-house, ready for service.
            </p>
            <div className="flex flex-wrap gap-4">
              <LinkButton href="/wholesale/apply" size="lg">
                Get In Touch
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="relative h-72 lg:h-auto lg:w-[44%] shrink-0">
          <Image
            src="/bcc-buckets-1.jpg"
            alt="Boast Coffee wholesale coffee buckets"
            fill
            className="object-cover object-center opacity-75"
            sizes="(max-width: 1024px) 100vw, 44vw"
            priority
          />
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
              Built to slot into your menu, not replace it.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-14">
            {products.map(({ title, description }) => (
              <div
                key={title}
                className="border-t-2 border-[var(--color-brand-accent)] pt-8"
              >
                <h3 className="text-xl font-display font-bold text-[var(--color-brand-dark)] mb-3">
                  {title}
                </h3>
                <p className="text-[var(--color-brand-muted)] leading-relaxed text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md text-center">
          <p className="text-xl md:text-2xl font-display font-bold text-[var(--color-brand-muted)] mb-8 max-w-2xl mx-auto">
            No new equipment or training. Just better coffee.
          </p>
          <LinkButton href="/wholesale/apply" size="lg">
            Get In Touch
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
