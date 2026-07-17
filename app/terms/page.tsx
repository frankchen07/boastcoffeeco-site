import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing use of the Boast Coffee Co. website.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing or using boastcoffee.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.",
  },
  {
    heading: "Use of This Site",
    body: "This site is provided for personal, non-commercial use. You agree not to scrape, reproduce, or redistribute content without permission, and not to use the site for any unlawful or unauthorized purpose.",
  },
  {
    heading: "Products and Pricing",
    body: "Product descriptions and prices are subject to change without notice. We do not guarantee that all items shown are available or that descriptions are error-free. We reserve the right to limit quantities or discontinue products at any time.",
  },
  {
    heading: "Orders and Payments",
    body: "All transactions are processed through Shopify. Shopify's terms of service and privacy policy govern the checkout and payment process. Placement of an order does not constitute acceptance; we reserve the right to cancel or refuse any order.",
  },
  {
    heading: "Intellectual Property",
    body: "All content on this site — including text, photography, logos, and branding — is owned by Boast Coffee Co. or its licensors. You may not reproduce, distribute, or create derivative works without our prior written permission.",
  },
  {
    heading: "Disclaimer of Warranties",
    body: "This site is provided on an \"as is\" basis without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.",
  },
  {
    heading: "Limitation of Liability",
    body: "To the fullest extent permitted by law, Boast Coffee Co. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use this site or its content.",
  },
  {
    heading: "Governing Law",
    body: "These terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes arising under these terms shall be resolved in the courts of Santa Clara County, California.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these terms at any time. Changes take effect upon posting. Your continued use of the site after any update constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Terms of Service
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
