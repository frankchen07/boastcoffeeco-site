import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Boast Coffee Co. collects, uses, and protects your personal information.",
  robots: { index: false, follow: false },
};

const sections = [
  {
    heading: "Introduction",
    body: "Boast Coffee Co. (“we,” “us,” or “our”) operates boastcoffee.com. This policy describes what personal information we collect, how we use it, and your rights under California law (CCPA). By using this site, you agree to the practices described here.",
  },
  {
    heading: "Information We Collect",
    body: "We collect information in three ways. (1) Contact form: when you submit a message, we receive your name, email address, and the contents of your message. This is delivered to our inbox and is not stored in a database. (2) Email list: if you subscribe to our marketing emails, we store your email address through Wix Email Marketing. (3) Shopping cart: your cart is stored locally in your browser (localStorage) and is never transmitted to our servers. We do not use cookies or analytics tracking.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information we collect to respond to your inquiries, send marketing emails about products and promotions (you can unsubscribe at any time), and process orders through Shopify. We do not use your information for automated decision-making or profiling.",
  },
  {
    heading: "Third-Party Service Providers",
    body: "We share data only with processors that help us operate the site: Resend (email delivery for contact form messages), Shopify (ecommerce platform — their Privacy Policy governs any checkout or payment data), and Wix Email Marketing (email list management). We do not sell, rent, or trade your personal information to any third party.",
  },
  {
    heading: "Data Retention",
    body: "Contact form messages are retained only as long as we keep them in our email inbox. Email list subscriptions are retained until you unsubscribe. Your shopping cart exists only in your browser's localStorage and is cleared when you clear your browser data.",
  },
  {
    heading: "Your California Privacy Rights",
    body: "If you are a California resident, you have the right to know what personal information we collect and how it is used, the right to request deletion of your personal information, and the right to opt out of the sale of your personal information. We do not sell personal information. To exercise your rights, contact us at the email below. We will respond within 45 days.",
  },
  {
    heading: "Children's Privacy",
    body: "This site is not directed at children under 13. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us so we can delete it.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Privacy Policy
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
