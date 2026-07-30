import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Book an Event",
  description: "Book an event with the Boast Coffee Co. team.",
};

export default function BookEventPage() {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      {/* Page header */}
      <div className="bg-[var(--color-brand-surface)] border-b border-[var(--color-brand-border)]">
        <div className="container-md py-14">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--color-brand-dark)]">
            Book an Event
          </h1>
        </div>
      </div>

      <div className="container-md py-16">
        <div className="max-w-xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
