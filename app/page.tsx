import Image from "next/image";
import Hero from "@/components/sections/Hero";
import { LinkButton } from "@/components/ui/Button";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

const cateringServices = [
  {
    title: "Espresso Bar",
    description:
      "Full espresso setup from our solar-powered van or espresso cart. Lattes, cappuccinos, cortados — made to order on-site. No generator, no fumes, no noise.",
  },
  {
    title: "Nitro Cold Brew On Tap",
    description:
      "We bring the nitro kegs to you. Full tap service. It's the conversation starter at every event we've done.",
  },
  {
    title: "Iced Espresso & Cold Drinks",
    description:
      "Made with our Kyoto cold brew concentrate. It's the same smooth, low-acid profile as our nitro cold brew, in a form that scales for any size event.",
  },
];

const nitroKegFeatures = [
  {
    title: "Full Service",
    description:
      "We serve offices, cafés, pop-ups, and venues across the Bay. If you want nitro on tap, we deliver, setup, and service the kegs.",
  },
  {
    title: "Consistent Quality",
    description:
      "We always seal our kegs with nitrogen and store at 38F, preserving flavor and extending shelf life far beyond a standard cold brew setup. What you pour on day one tastes like day one.",
  },
  {
    title: "The Pour",
    description:
      "The nitrogen creates a creamy head of foam that's both visual and textural. Our guests always remember it.",
  },
];

const nitroProcessFeatures = [
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
      "Charged with nitrogen gas for a silky, cascading pour with a natural creaminess. No added sugar or additives.",
  },
];

const sproWhyFeatures = [
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
    title: "Drinks all week.",
    description:
      "Sealed and refrigerated, our concentrate holds its quality far longer than brewed espresso. Open it Monday, finish it Friday.",
  },
];

const sproProcessFeatures = [
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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="Small-Batch Specialty Coffee"
        headline="Coffee worth boasting about."
        subhead="Sourced from the world's best growing regions. Roasted & brewed with intention, and delivered to where you are."
        primaryCta={{ label: "Shop Coffee", href: "/shop" }}
        dark
      />

      {/* Our Services */}
      <section id="services" className="scroll-mt-16 pt-20 pb-4 bg-[var(--color-brand-surface)]">
        <div className="container-md">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
              Our Services
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              We run catering events, provide full-service nitro kegs, and make espresso concentrate for busy cafés.
            </p>
          </div>
        </div>
      </section>

      {/* Catering */}
      <CollapsibleSection id="catering" label="Catering" className="bg-[var(--color-brand-surface)]">
        <div className="container-md pb-14">
          <div className="mb-14 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)]">
              We bring the whole coffee bar to you.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {cateringServices.map(({ title, description }) => (
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

        <div className="relative py-36 overflow-hidden">
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
              <p className="text-lg text-[var(--color-brand-surface)] leading-relaxed mb-8">
                Our espresso van runs on solar, which means we can set up anywhere without the noise,
                exhaust, or logistics of a generator. Park it in a parking lot, a field, or a rooftop
                terrace. Clean power. Clean coffee. It travels wherever the event takes us.
              </p>
              <LinkButton href="/book-event" size="lg">
                Book Your Event
              </LinkButton>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Nitro */}
      <CollapsibleSection id="nitro" label="Nitro" className="bg-[var(--color-brand-surface)]">
        <div className="container-md pb-20">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
              Most places can&apos;t find a reliable partner for tap-ready nitro cold brew.
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              We&apos;ve built exactly that service. This is nitro cold brew as a first-class experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-14">
            {nitroProcessFeatures.map(({ icon, title, description }) => (
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

          <div className="grid md:grid-cols-3 gap-10 mb-14">
            {nitroKegFeatures.map(({ title, description }) => (
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

          <LinkButton href="/wholesale" size="lg">
            Request a Keg
          </LinkButton>
        </div>
      </CollapsibleSection>

      {/* Espresso */}
      <CollapsibleSection id="espresso" label="Espresso Concentrate" className="bg-[var(--color-brand-surface)]">
        <div className="container-md pb-20">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-4">
              Every iced espresso is a hot drink you&apos;re not making — more shots, more waiting. Our concentrate changes that.
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              Espresso concentrate opens up a format that most people never get access to outside a café.
              Use it over ice for a quick Americano, steam milk into it for a latte, or batch it for events
              and pop-ups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-14">
            {sproProcessFeatures.map(({ icon, title, description }) => (
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

          <div className="grid md:grid-cols-3 gap-10 mb-14">
            {sproWhyFeatures.map(({ title, description }) => (
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

          <LinkButton href="/wholesale" size="lg">
            Get In Touch
          </LinkButton>
        </div>
      </CollapsibleSection>

      <div className="h-10 bg-[var(--color-brand-surface)]" aria-hidden="true" />
    </>
  );
}
