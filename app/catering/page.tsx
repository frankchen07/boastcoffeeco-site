import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Boast Coffee Catering — a solar-powered espresso van, nitro cold brew on tap, and Kyoto concentrate iced espresso. Full-service specialty coffee for Bay Area events.",
};

const services = [
  {
    title: "Espresso Bar",
    description:
      "Full espresso setup from our solar-powered van. Lattes, cappuccinos, cortados — made to order on-site. No generator, no fumes, no noise.",
  },
  {
    title: "Nitro Cold Brew On Tap",
    description:
      "We bring the keg to you. Pull the tap, watch it cascade. It's the conversation starter at every event we've done.",
  },
  {
    title: "Iced Espresso & Cold Drinks",
    description:
      "Made with our Kyoto cold brew concentrate — the same smooth, low-acid profile as our nitro, in a form that scales for any size event.",
  },
];

const eventTypes = [
  "Corporate Events",
  "Weddings",
  "Farmers Markets",
  "Pop-Ups",
  "Brand Activations",
  "Private Parties",
];

export default function CateringPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[70dvh] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] flex items-center">
        <div className="container-md py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-accent)] mb-5">
              Coffee Catering · Bay Area
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              We bring the whole
              <br />
              coffee bar to you.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed mb-10 max-w-xl">
              A solar-powered espresso van. Nitro cold brew on tap. Craft iced espresso made from
              Kyoto cold brew concentrate. Boast Catering is a full-service specialty coffee
              experience — for corporate events, weddings, markets, and pop-ups.
            </p>
            <LinkButton href="/contact" size="lg">
              Book Your Event
            </LinkButton>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)]">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map(({ title, description }) => (
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

      {/* The Van */}
      <section className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
              The Van
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
              Solar-powered. Zero compromise.
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              Our espresso van runs on solar — meaning we can set up anywhere without the noise,
              exhaust, or logistics of a generator. Park it in a parking lot, a field, or a rooftop
              terrace. Clean power. Clean coffee. It travels wherever the event takes us.
            </p>
          </div>
          {/* Van image placeholder */}
          <div className="mt-10 h-72 rounded-xl bg-[var(--color-brand-border)] flex items-center justify-center">
            <p className="text-sm text-[var(--color-brand-muted)]">Van photo coming soon</p>
          </div>
        </div>
      </section>

      {/* Events strip */}
      <section className="py-14 bg-[var(--color-brand-dark)]">
        <div className="container-md">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-6 text-center">
            We&apos;ve done it all
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {eventTypes.map((type) => (
              <span
                key={type}
                className="text-sm font-medium text-[var(--color-brand-surface)]"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale callout */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
              Wholesale
            </p>
            <h2 className="text-3xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
              Running a cafe or bar program?
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-8">
              We produce a Kyoto cold brew espresso concentrate designed for high-volume iced
              espresso service. Smoother, less acidic, and pull-ready — no shot-pulling required.
              Available for wholesale.
            </p>
            <LinkButton href="/contact" variant="secondary" size="lg">
              Ask About Wholesale
            </LinkButton>
          </div>
        </div>
      </section>

      {/* CTA close */}
      <section className="py-20 bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)]">
        <div className="container-md text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Let&apos;s plan your event.
          </h2>
          <p className="text-[var(--color-brand-surface)] mb-8 max-w-md mx-auto leading-relaxed">
            Tell us what you&apos;re planning — we&apos;ll figure out the rest.
          </p>
          <LinkButton href="/contact" size="lg">
            Get in Touch
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
