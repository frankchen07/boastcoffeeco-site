import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)]">
      <div className="container-md py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold mb-3">Boast Coffee Co.</p>
            <p className="text-sm text-[var(--color-brand-muted)] leading-relaxed max-w-xs">
              Small-batch specialty coffee, roasted and brewed with intention in every cup.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/catering", label: "Catering" },
                { href: "/nitro", label: "Nitro" },
                { href: "/spro", label: "Espresso" },
                { href: "/visit", label: "Visit" },
                { href: "/shop", label: "Shop" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-brand-surface)] hover:text-[var(--color-brand-accent)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] mb-4">
              Say Hello
            </p>
            <ul className="space-y-2">
              {[
                { href: "/visit", label: "Find Us" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-brand-surface)] hover:text-[var(--color-brand-accent)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.instagram.com/boastcoffee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Boast Coffee on Instagram"
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-brand-surface)] hover:text-[var(--color-brand-accent)] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-brand-muted)]/20 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--color-brand-muted)]">
          <p>&copy; {new Date().getFullYear()} Boast Coffee Co. All rights reserved.</p>
          <p>Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
