import type { Metadata } from "next";
import Image from "next/image";
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
      "We bring the keg to you. Full tap service. It's the conversation starter at every event we've done.",
  },
  {
    title: "Iced Espresso & Cold Drinks",
    description:
      "Made with our Kyoto cold brew concentrate. It's the same smooth, low-acid profile as our nitro cold brew, in a form that scales for any size event.",
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
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              We bring the whole
              <br />
              coffee bar to you.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed mb-10 max-w-xl">
              We are a full-service specialty coffee
              experience for events, parties, and pop-ups.
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)]">
              No more cardboard box coffee. Get Boast.
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
      <section className="relative py-28 overflow-hidden">
        <Image
          src="/boast-coffee-truck.jpg"
          alt="Boast Coffee solar-powered van"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30" />
        <div className="container-md relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-cream)] mb-6">
              Solar-powered sustainability.
            </h2>
            <p className="text-lg text-[var(--color-brand-surface)] leading-relaxed">
              Our espresso van runs on solar, which means we can set up anywhere without the noise,
              exhaust, or logistics of a generator. Park it in a parking lot, a field, or a rooftop
              terrace. Clean power. Clean coffee. It travels wherever the event takes us.
            </p>
          </div>
        </div>
      </section>

      {/* Wholesale callout */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
              See what others have to say!
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed mb-8">
              We've consistently delivered at corporate events, private parties, mobile catering at special events, and pop-ups.
            </p>
            <LinkButton href="https://www.yelp.com/biz/boast-coffee-san-jose-2?osq=boast+coffee">
              Read our Reviews
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
