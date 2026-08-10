import type { Metadata } from "next";
import Image from "next/image";
import storyContent from "@/content/our-story.json";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Boast Coffee Co. started in 2017 with a simple idea: coffee done well should be something worth telling people about.",
};

const {
  heroHeadingLines,
  heroBody,
  originHeading,
  originParagraphs,
  originImage,
  originImageAlt,
} = storyContent;

export default function OurStoryPage() {
  return (
    <div>
      <section className="py-20 bg-[var(--color-brand-surface)]">
        <div className="container-md">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
              {heroHeadingLines[0]}
              <br />
              {heroHeadingLines[1]}
            </h1>
            <p className="text-lg text-[var(--color-brand-muted)] leading-relaxed">
              {heroBody}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-brand-cream)]">
        <div className="container-md">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-[var(--color-brand-dark)] mb-6">
                {originHeading}
              </h2>
              <div className="space-y-5 text-[var(--color-brand-muted)] leading-relaxed text-lg">
                {originParagraphs.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={i === originParagraphs.length - 1 ? "font-bold" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={originImage}
                alt={originImageAlt}
                fill
                className="object-cover object-center opacity-65"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
