import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Boast Coffee Co.'s commitment to digital accessibility for all users.",
};

const sections = [
  {
    heading: "Our Commitment",
    body: "Boast Coffee Co. is committed to ensuring digital accessibility for people with disabilities. We continually work to improve the user experience for everyone and apply relevant accessibility standards.",
  },
  {
    heading: "Standard",
    body: "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities.",
  },
  {
    heading: "Known Gaps",
    body: "We are aware that some areas of this website may not yet fully meet the standard. We are actively working to identify and address accessibility issues as they are discovered.",
  },
  {
    heading: "Feedback",
    body: "If you experience any difficulty accessing content on this website, or if you have suggestions on how we can improve accessibility, please reach out. We aim to respond within 2 business days.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Accessibility Statement
          </h1>
        </div>
      </div>

      <div className="container-md py-16">
        <div className="max-w-2xl space-y-10">
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
                {heading}
              </h2>
              <p className="text-[var(--color-brand-dark)] leading-relaxed">{body}</p>
            </div>
          ))}

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
              Contact Us
            </h2>
            <a
              href="mailto:hello@boastcoffee.com"
              className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] transition-colors font-medium underline underline-offset-4"
            >
              hello@boastcoffee.com
            </a>
          </div>

          <p className="text-xs text-[var(--color-brand-muted)] pt-4 border-t border-[var(--color-brand-border)]">
            Last updated: July 2026
          </p>
        </div>
      </div>
    </div>
  );
}
