"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import CartIcon from "@/components/ui/CartIcon";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/catering", label: "Catering" },
  { href: "/nitro", label: "Nitro" },
  { href: "/spro", label: "Espresso" },
  { href: "/visit", label: "Visit" },
  { href: "/shop", label: "Shop" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!menuOpen) {
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;

    const nav = navRef.current;
    if (!nav) return;

    const focusable = Array.from(
      nav.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    focusable[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { setMenuOpen(false); return; }
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-brand-cream)] border-b border-[var(--color-brand-border)]">
      <div className="container-md flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" aria-label="Boast Coffee Co.">
          <Image
            src="/logo.png"
            alt="Boast Coffee Co."
            height={40}
            width={160}
            priority
            className="h-10 w-auto"
            style={{ width: "auto" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[var(--color-brand-muted)] hover:text-[var(--color-brand-dark)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <CartIcon />
          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            className="md:hidden p-2 -mr-2 text-[var(--color-brand-dark)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          ref={navRef}
          className="md:hidden border-t border-[var(--color-brand-border)] bg-[var(--color-brand-cream)]"
        >
          <div className="container-md py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-base font-medium text-[var(--color-brand-dark)] hover:text-[var(--color-brand-accent)] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
