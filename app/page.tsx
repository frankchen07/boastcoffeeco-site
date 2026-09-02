import Image from "next/image";
import Hero from "@/components/sections/Hero";
import { LinkButton } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        eyebrow="Organic Small-Batch Specialty Coffee"
        headline="Coffee worth boasting about."
        subhead="Sourced from the world's best growing regions. Small-batch roasted & brewed with intention, and delivered to where you are."
        primaryCta={{ label: "Shop Coffee", href: "/shop" }}
        dark
        videoSrc="/bcc-roastery.mov"
      />

      {/* We're here to boast */}
      <section id="about" className="py-20 bg-[var(--color-brand-surface)] scroll-mt-20">
        <div className="container-md">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
              We&apos;re here to boast
              <br />
              the coffee, not ourselves.
            </h2>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              Boast started with a simple idea: coffee done well should be something worth telling
              people about. Every bean we roast and serve is our answer to that. The name isn&apos;t
              about ego. &ldquo;Boast&rdquo; is about letting the coffee do the talking — preserving
              what makes each bean exceptional and putting it front and center, every time.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
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
                  In 2017, we started small-batch roasting specialty beans in San Jose and serving nitro cold brew on tap in kegs for offices and corporate venues. Demand grew, so we added on-site coffee carts alongside of our smooth cold brew, and started running catering events. In the past two years, we've taken it further with our custom solar-powered espresso van, bringing a full service craft coffee bar directly to events.
                </p>
                <p className="font-bold">
                  That&apos;s still what Boast is: great coffee worth telling people about, wherever you need it.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/bcc-bags-1.jpg"
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

      {/* Our Values */}
      <section className="py-20 bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-[var(--color-brand-border)] leading-relaxed">
              The four things we never compromise on, from the espresso bar to the front counter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Communication",
                description:
                  "We keep our team and customers in the loop, and we listen as much as we talk.",
              },
              {
                title: "Connection",
                description:
                  "Every cup starts with a smile and a warm welcome — because a great coffee experience is a human one.",
              },
              {
                title: "Consistency",
                description:
                  "Uncompromising consistency you'd expect from a Michelin-star restaurant — every cup, every time.",
              },
              {
                title: "Cleanliness",
                description: "A clean bar is a better bar — for our team, and for you.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="border-t-2 border-[var(--color-brand-accent)] pt-8">
                <h3 className="text-xl font-display font-bold mb-3">
                  {title}
                </h3>
                <p className="text-[var(--color-brand-border)] leading-relaxed text-sm">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
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
            <LinkButton href="/book-event" variant="secondary" size="lg">
              Book an Event
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
