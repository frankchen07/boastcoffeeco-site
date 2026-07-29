import type { Metadata } from "next";
import WholesaleForm from "@/components/sections/WholesaleForm";

export const metadata: Metadata = {
  title: "Wholesale",
  description: "Apply for a Boast Coffee Co. wholesale account.",
};

export default function WholesalePage() {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      {/* Page header */}
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Wholesale
          </h1>
        </div>
      </div>

      <div className="container-md py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-display font-bold text-[var(--color-brand-dark)] mb-8">
              Apply for a Wholesale Account
            </h2>
            <WholesaleForm />
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
                How It Works
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                We supply cafes, restaurants, offices, and retailers with wholesale-sized coffee,
                nitro, and espresso concentrate. Submit an application and we&apos;ll review it —
                once approved, you&apos;ll get an email invite to set up your wholesale account
                login.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
                Already Approved?
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                Use the Account link in the header or footer to log in and shop your wholesale
                catalog.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
                Questions?
              </p>
              <a
                href="mailto:hello@boastcoffee.com"
                className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] transition-colors font-medium"
              >
                hello@boastcoffee.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
