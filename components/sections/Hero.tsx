import { LinkButton } from "@/components/ui/Button";

interface HeroProps {
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  eyebrow?: string;
  dark?: boolean;
}

export default function Hero({
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  eyebrow,
  dark = false,
}: HeroProps) {
  return (
    <section
      className={`relative min-h-[85dvh] flex items-center ${
        dark
          ? "bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)]"
          : "bg-[var(--color-brand-surface)] text-[var(--color-brand-dark)]"
      }`}
    >
      <div className="container-md py-24 md:py-32">
        <div className="max-w-2xl">
          {eyebrow && (
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-5 ${
                dark ? "text-[var(--color-brand-accent)]" : "text-[var(--color-brand-muted)]"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
            {headline}
          </h1>
          <p
            className={`text-lg md:text-xl leading-relaxed mb-10 ${
              dark ? "text-[var(--color-brand-surface)]" : "text-[var(--color-brand-muted)]"
            }`}
          >
            {subhead}
          </p>
          <div className="flex flex-wrap gap-4">
            <LinkButton href={primaryCta.href} size="lg">
              {primaryCta.label}
            </LinkButton>
            {secondaryCta && (
              <LinkButton
                href={secondaryCta.href}
                variant={dark ? "secondary" : "secondary"}
                size="lg"
                className={
                  dark
                    ? "border-[var(--color-brand-cream)] text-[var(--color-brand-cream)] hover:bg-[var(--color-brand-cream)] hover:text-[var(--color-brand-dark)]"
                    : ""
                }
              >
                {secondaryCta.label}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
