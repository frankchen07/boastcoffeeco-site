import type { Metadata } from "next";
import Link from "next/link";
import BusinessInquiryForm from "@/components/sections/BusinessInquiryForm";
import officeProgramsContent from "@/content/office-programs.json";
import formsContent from "@/content/forms.json";

export const metadata: Metadata = {
  title: "Apply — Office Programs",
  description: "Set up recurring coffee, tea, and kombucha service for your office.",
};

export default function OfficeProgramsApplyPage() {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      {/* Page header */}
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <Link
            href="/office-programs"
            className="text-sm text-[var(--color-brand-muted)] hover:text-[var(--color-brand-dark)] transition-colors mb-4 inline-block"
          >
            &larr; Office Programs
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Office Programs
          </h1>
        </div>
      </div>

      <div className="container-md py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-display font-bold text-[var(--color-brand-dark)] mb-8">
              Get Set Up
            </h2>
            <BusinessInquiryForm
              idPrefix="op"
              apiEndpoint="/api/office-programs"
              businessNameLabel="Company Name"
              itemOptions={formsContent.officeProgramItems}
              showTaxId={false}
              successMessage="Application sent! We'll review it and follow up soon."
            />
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
                How It Works
              </p>
              <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed">
                {officeProgramsContent.intro}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
