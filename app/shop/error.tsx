"use client";

import { Button, LinkButton } from "@/components/ui/Button";

export default function ShopError({ retry }: { retry: () => void }) {
  return (
    <div className="bg-[var(--color-brand-cream)]">
      <div className="container-md py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)]">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-4 text-[var(--color-brand-muted)]">
          Our shop is having trouble right now. Please try again in a moment.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button onClick={() => retry()}>Try again</Button>
          <LinkButton href="/" variant="ghost">
            Back to home
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
