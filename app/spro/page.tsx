import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Espresso Concentrate",
  description:
    "Boast Espresso Concentrate — single-origin, cold-extracted espresso in ready-to-use form. Pull café-quality drinks at home, in the office, or at scale.",
};

const whyFeatures = [
  {
    title: "Higher throughput. No new machines.",
    description:
      "Every iced drink that waits for the espresso machine slows down the line. Our concentrate pulls it out of the equation — same quality, higher throughput, more happy customers.",
  },
  {
    title: "Consistent shot quality. Every time.",
    description:
      "Cold-extracting to espresso concentration makes it so every drink tastes the same. No dialing in. No variation between baristas, beans, or temperature changes.",
  },
  {
    title: "Stays Fresh",
    description:
      "Sealed and refrigerated, our concentrate holds its quality far longer than brewed espresso. Open it Monday, finish it Friday.",
  },
];

const processFeatures = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 010 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    title: "Single-Origin Base",
    description:
      "Same traceable, specialty-grade beans we roast for the full lineup. We know where every bag comes from.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Cold Extraction",
    description:
      "We extract cold and slow, pulling maximum flavor without the bitterness that heat introduces. The result is smooth, rounded, and complex.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    title: "Concentrated Craft",
    description:
      "Packed at high strength so you control the dilution. Use it straight for a bold hit, or stretch it for lattes, cocktails, and batch service.",
  },
];

export default function SproPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[75dvh] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex items-center px-6 md:px-10 lg:pl-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))] lg:pr-16 py-24">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Espresso, Bottled.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed mb-10">
              Single-origin espresso concentrate, cold-extracted and ready to use. No machine. No wait.
            </p>
            <div className="flex flex-wrap gap-4">
              <LinkButton href="/contact" size="lg">
                Get In Touch
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="relative h-72 lg:h-auto lg:w-[44%] shrink-0">
          <Image
            src="/boast-coffee-bags-1.jpg"
            alt="Boast espresso concentrate bags"
            fill
            className="object-cover object-center opacity-75"
            sizes="(max-width: 1024px) 100vw, 44vw"
            priority
          />
        </div>
      </section>

      {/* Why Espresso Concentrate */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
              Most espresso is locked behind a machine that costs thousands and constant fiddling to figure out.
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              We did the extraction for you. What&apos;s in the bag is ready to go — just the spro, nothing else.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {whyFeatures.map(({ title, description }) => (
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)]">
              Our Process
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

      {/* Callout */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-8">
              Boasted without the machine.
              <br />
              <span className="text-[var(--color-brand-muted)]">That&apos;s the whole idea.</span>
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              Espresso concentrate opens up a format that most people never get access to outside a café.
              Use it over ice for a quick Americano, steam milk into it for a latte, or batch it for events
              and pop-ups.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
