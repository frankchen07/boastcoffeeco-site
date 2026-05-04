import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Boast Coffee Co. — specialty roaster, nitro keg service, and solar-powered catering van. Est. 2017, San Jose, CA.",
};

const values = [
  {
    title: "Speak with Quality",
    description:
      '"Boast" isn\'t ego. It\'s a promise. Every cup is designed to let the coffee\'s natural character speak for itself. Nothing is masked or compromised.',
  },
  {
    title: "Customers First",
    description:
      "We wouldn't be where we are without our customers. To serve worthy coffee is our ultimate form of hospitality.",
  },
  {
    title: "Coffee That Comes to You",
    description:
      "Nitro kegs for your office, an espresso bar for your event, and espresso concentrate for your café. We built Boast to go where coffee is needed most.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-[var(--color-brand-dark)] leading-[1.1] mb-6">
              We&apos;re here to boast
              <br />
              the coffee, not ourselves.
            </h1>
            <p className="text-xl text-[var(--color-brand-muted)] leading-relaxed">
              The name isn&apos;t about ego. &ldquo;Boast&rdquo; is about letting the coffee do the
              talking — preserving what makes each bean exceptional and putting it front and center,
              every time.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
                Our Origin Story
              </h2>
              <div className="space-y-5 text-[var(--color-brand-muted)] leading-relaxed text-lg">
                <p>
                  We started with a simple frustration: the Bay Area has always had great coffee culture but there was a
                  real gap in how craft coffee was delivered, especially off-premise.
                </p>
                <p>
                  So in 2017, we built something different. We sourced specialty beans, small-batch roasted them in
                  San Jose, and started doing nitro cold brew on tap in kegs for offices, venues, and events. Eventually, we expanded to catering using a solar-powered espresso van that brings
                  a full craft coffee bar directly to events.
                </p>
                <p className="font-bold">
                  That&apos;s still what Boast is: great coffee worth telling people about, wherever you need it.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/boast-coffee-bags-1.jpg"
                alt="Boast Coffee bags ready to ship"
                fill
                className="object-cover object-center opacity-65"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map(({ title, description }) => (
              <div
                key={title}
                className="border-t border-[var(--color-brand-muted)]/30 pt-8"
              >
                <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
                <p className="text-[var(--color-brand-surface)] leading-relaxed text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
            Ready to taste the difference?
          </h2>
          <p className="text-[var(--color-brand-muted)] mb-8 max-w-md mx-auto">
            Shop our coffee, book an event, or just say hello!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <LinkButton href="/shop" size="lg">
              Shop Coffee
            </LinkButton>
            <LinkButton href="/catering" variant="secondary" size="lg">
              Book an Event
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
