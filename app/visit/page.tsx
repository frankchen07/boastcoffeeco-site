import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Find Boast Coffee Co. in Mountain View, CA. We're parked next to MidWife & the Baker, Wed–Sat. Espresso, nitro cold brew, and Kyoto concentrate on tap.",
};

const hours = [
  { day: "Wednesday", time: "8 am – 12 pm" },
  { day: "Thursday", time: "8 am – 12 pm" },
  { day: "Friday", time: "8 am – 1 pm" },
  { day: "Saturday", time: "8 am – 1 pm" },
];

export default function VisitPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[55dvh] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex items-center px-6 md:px-10 lg:pl-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))] lg:pr-16 py-24">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Come grab a cup! ☕️
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed max-w-lg">
              We&apos;re parked next to the Midwife &amp; the Baker 🥐 in Mountain View.
            </p>
          </div>
        </div>
        <div className="relative h-72 lg:h-auto lg:w-[44%] shrink-0">
          <Image
            src="/boast-coffee-mv.jpg"
            alt="Boast Coffee latte in Mountain View"
            fill
            className="object-cover object-bottom opacity-75"
            sizes="(max-width: 1024px) 100vw, 44vw"
            priority
          />
        </div>
      </section>

      {/* Hours */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="max-w-sm mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-10 text-center">
              Hours
            </h2>
            <dl className="divide-y divide-[var(--color-brand-border)]">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex justify-between py-4">
                  <dt className="font-medium text-[var(--color-brand-dark)]">{day}</dt>
                  <dd className="text-[var(--color-brand-muted)]">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md">

          <div className="rounded-xl overflow-hidden h-72 md:h-96">
            <iframe
              src="https://maps.google.com/maps?q=MidWife+%26+the+Baker+Mountain+View+CA&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Boast Coffee Co. location — next to MidWife & the Baker, Mountain View"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
