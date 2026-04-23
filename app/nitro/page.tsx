import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Nitro Cold Brew",
  description:
    "Boast Nitro Cold Brew — Bay Area keg service for offices, cafes, and events. One of the few operators doing it right. Pull the tap. Watch the cascade.",
};

const kegFeatures = [
  {
    title: "Bay Area Delivery",
    description:
      "We service offices, cafes, pop-ups, and venues across the Bay. If you want nitro on tap, we can make it happen.",
  },
  {
    title: "Freshness Lock",
    description:
      "Nitrogen seals the keg, preserving flavor and extending shelf life far beyond a standard cold brew setup. What you pour on day one tastes like day one.",
  },
  {
    title: "The Pour",
    description:
      "Pull the tap and watch it cascade. The nitrogen creates a creamy head of foam that's both visual and textural — guests always remember it.",
  },
];

const processFeatures = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "18-Hour Cold Steep",
    description:
      "Our cold brew steeps for a full 18 hours at low temperature, extracting maximum flavor with zero bitterness.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Nitrogen Infused",
    description:
      "Charged with nitrogen gas for a silky, cascading pour with a natural creaminess — no sugar, no additives.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    title: "Single-Origin Base",
    description:
      "Brewed from the same traceable, specialty-grade beans we use for our full roast lineup. No shortcuts.",
  },
];

export default function NitroPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[75dvh] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] flex items-center">
        <div className="container-md py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-5">
              Nitro Cold Brew · Bay Area Keg Service
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Tap-fresh.
              <br />
              Nitrogen smooth.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed mb-10 max-w-lg">
              We deliver nitro cold brew kegs to offices, cafes, and events across the Bay Area —
              one of the few operators doing it right. Pull the tap. Watch the cascade. Taste the
              difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <LinkButton href="/contact" size="lg">
                Request a Keg
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why Nitro Kegs */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
              The Keg Service
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
              Most places can&apos;t find a reliable partner for this.
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              Lots of offices and venues want nitro cold brew on tap. Finding a local operator who
              actually delivers, services the keg, and keeps the quality consistent? That&apos;s rarer.
              We&apos;ve built exactly that service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {kegFeatures.map(({ title, description }) => (
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

      {/* The Process */}
      <section id="the-process" className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
              For Those New to Nitro
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)]">
              How it&apos;s made
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {processFeatures.map(({ icon, title, description }) => (
              <div key={title} className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-lg bg-[var(--color-brand-cream)] flex items-center justify-center text-[var(--color-brand-accent)]">
                  {icon}
                </div>
                <h3 className="text-xl font-display font-bold text-[var(--color-brand-dark)]">
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

      {/* Taste notes */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
              The Taste
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-8">
              Less acid. More flavor.
              <br />
              <span className="text-[var(--color-brand-muted)]">No explanation needed.</span>
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              Cold brewing strips out the acidity and bitterness. What&apos;s left is concentrated,
              naturally smooth coffee. Nitrogen turns the texture velvety. Most people who try it
              for the first time ask where it&apos;s been their whole life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
