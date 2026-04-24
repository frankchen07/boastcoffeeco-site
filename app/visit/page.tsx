import type { Metadata } from "next";

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
      <section className="min-h-[55dvh] bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] flex items-center">
        <div className="container-md py-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Come grab a cup! ☕️
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-brand-surface)] leading-relaxed max-w-lg">
              We&apos;re parked next to Midwife &amp; the Baker 🥐 in Mountain View. 
            </p>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-10">
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
            <div className="h-72 md:h-full min-h-64 rounded-xl bg-[var(--color-brand-border)] flex items-center justify-center">
              <p className="text-sm text-[var(--color-brand-muted)]">Truck photo coming soon</p>
            </div>
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
