import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

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
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
            Say Hello
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Contact
          </h1>
        </div>
      </div>

      <div className="container-md py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-display font-bold text-[var(--color-brand-dark)] mb-2">
              Send us a message
            </h2>
            <p className="text-[var(--color-brand-muted)] text-sm mb-8">
              Questions about an order, wholesale inquiries, or just want to talk coffee — we&apos;re here.
            </p>
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
                Response Time
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                We reply to all messages within 1–2 business days. For urgent order issues,
                include your order number.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
                Follow Along
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/boastcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] transition-colors font-medium"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
