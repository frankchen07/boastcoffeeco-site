import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Office Programs",
  description:
    "Boast Office Programs — nitro coffee and tea kegs, kombucha, and coffee beans, delivered and serviced for Bay Area offices. Never run out of great coffee again.",
};

const products = [
  {
    title: "Nitro Cold Brew Kegs",
    description:
      "We brew our own cold brew with organic, small-batch roasted, single origin beans, and charge it with nitro. We deliver, install, and swap the keg before it ever runs low — one less thing on your office manager's plate.",
  },
  {
    title: "Nitro Tea Kegs",
    description:
      "The same nitro treatment for our loose-leaf tea. Nitro creates a creamy, cascading tea without any milk. A break-room upgrade that isn't just for coffee drinkers.",
  },
  {
    title: "Marin Kombucha",
    description:
      "We also serve our favorite local kombucha on tap, for the afternoon slump that isn't about caffeine. Your gut will thank you.",
  },
  {
    title: "Coffee Beans",
    description:
      "We source, roast, and deliver bags of our organic single origin beans for the espresso machine or drip pot you already have — no compromise on quality, no new equipment needed.",
  },
];

export default function OfficeProgramsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[70dvh] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex items-center px-6 md:px-10 lg:pl-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))] lg:pr-16 py-24">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-4">
              For Bay Area Offices
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Work powered
              <br />
              by Boast
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed mb-10">
              We stock your office with nitro coffee & tea, craft kombucha, and single origin beans — then service it for you. No more crappy burnt brews.
            </p>
            <div className="flex flex-wrap gap-4">
              <LinkButton href="/office-programs/apply" size="lg">
                Get Set Up
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="relative h-72 lg:h-auto lg:w-[44%] shrink-0">
          <Image
            src="/bcc-kegs.jpg"
            alt="Boast nitro kegs for office programs"
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
              No more cardboard box coffee. Get Boast.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-14">
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
            Quality craft coffee, serviced like clockwork. That&apos;s an upgrade your team will taste.
          </p>
          <LinkButton href="/office-programs/apply" size="lg">
            Get Set Up
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
