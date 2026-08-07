"use client";

import { useEffect, useState } from "react";

interface CollapsibleSectionProps {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

export function CollapsibleSection({ id, label, className = "", children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    // Next.js Link does same-page hash navigation via history.pushState, which
    // (per spec) never fires "hashchange" — only real navigations, direct
    // location.hash assignment, or back/forward do. Poll briefly after any
    // link click so header/footer nav still opens us, however long Next.js's
    // router takes to actually update the hash. Scoped to <a> clicks (not our
    // own toggle <button>) so manually collapsing while the hash still
    // matches doesn't get immediately overridden back open.
    const onLinkClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("a")) return;
      let attempts = 0;
      const poll = () => {
        syncFromHash();
        attempts += 1;
        if (attempts < 10) setTimeout(poll, 50);
      };
      poll();
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    document.addEventListener("click", onLinkClick);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
      document.removeEventListener("click", onLinkClick);
    };
  }, [id]);

  return (
    <section id={id} className={`scroll-mt-16 border-t border-[var(--color-brand-border)] ${className}`}>
      <div className="container-md">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center gap-4 py-8 text-left group"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 text-[var(--color-brand-accent)] transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-accent)] transition-colors">
            {label}
          </span>
        </button>
      </div>
      {open && children}
    </section>
  );
}
