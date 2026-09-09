import { LinkButton } from "@/components/ui/Button";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

interface HeroProps {
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  eyebrow?: string;
  dark?: boolean;
  videoSrc?: string;
}

export default function Hero({
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  eyebrow,
  dark = false,
  videoSrc,
}: HeroProps) {
  return (
    <section
      className={`relative min-h-[85dvh] flex items-center overflow-hidden ${
        dark
          ? "bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)]"
          : "bg-[var(--color-brand-surface)] text-[var(--color-brand-dark)]"
      }`}
    >
      {videoSrc && (
        <>
          <BackgroundVideo
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/60" />
        </>
      )}
      <div className="container-md relative z-10 py-24 md:py-32">
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
