import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/sections/ContactForm";
import { SHOPIFY_ACCOUNT_URL } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Boast Coffee Co. team.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      {/* Page header */}
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Contact
          </h1>
        </div>
      </div>

      <div className="container-md py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-display font-bold text-[var(--color-brand-dark)] mb-8">
              Book an Event
            </h2>
            <ContactForm />
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
                Email Us
              </p>
              <a
                href="mailto:hello@boastcoffee.com"
                className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] transition-colors font-medium"
              >
                hello@boastcoffee.com
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
                Wholesale
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                For nitro kegs, batch beans, large orders of espresso concentrate, and other
                wholesale inquiries, please{" "}
                {SHOPIFY_ACCOUNT_URL ? (
                  <a
                    href={SHOPIFY_ACCOUNT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] underline transition-colors"
                  >
                    login
                  </a>
                ) : (
                  "login"
                )}{" "}
                to our wholesale store or{" "}
                <Link
                  href="/wholesale"
                  className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] underline transition-colors"
                >
                  create an account
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
