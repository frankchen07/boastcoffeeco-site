import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Boast Coffee Co. started in 2017 with a simple idea: coffee done well should be something worth telling people about.",
};

export default function OurStoryPage() {
  return (
    <div>
      <section className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
              We&apos;re here to boast
              <br />
              the coffee, not ourselves.
            </h1>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              Boast started with a simple idea: coffee done well should be something worth telling
              people about. Every bean we roast and serve is our answer to that. The name isn&apos;t
              about ego. &ldquo;Boast&rdquo; is about letting the coffee do the talking — preserving
              what makes each bean exceptional and putting it front and center, every time.
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
}
