import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  WHOLESALE_AUTH_COOKIE,
  cookieValueForPassword,
  verifyPassword,
} from "@/lib/wholesale-auth";

export const metadata: Metadata = {
  title: "Wholesale Access",
  robots: { index: false, follow: false },
};

function safeNext(next: string): string {
  return next.startsWith("/wholesaleshop") ? next : "/wholesaleshop";
}

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/wholesaleshop"));

  if (!verifyPassword(password)) {
    redirect(`/wholesaleshop/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(WHOLESALE_AUTH_COOKIE, cookieValueForPassword(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/wholesaleshop",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect(next);
}

interface Props {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function WholesaleLoginPage({ searchParams }: Props) {
  const { error, next = "/wholesaleshop" } = await searchParams;

  return (
    <div className="bg-[var(--color-brand-cream)] min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-display font-bold text-[var(--color-brand-dark)] mb-2 text-center">
          Wholesale Access
        </h1>
        <p className="text-sm text-[var(--color-brand-muted)] text-center mb-8">
          Enter the password to view the wholesale catalog.
        </p>
        <form action={login} className="flex flex-col gap-4">
          <input type="hidden" name="next" value={safeNext(next)} />
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Password"
            className="w-full px-4 py-3 rounded border border-[var(--color-brand-border)] bg-white text-[var(--color-brand-dark)] focus:outline-none focus:border-[var(--color-brand-dark)]"
          />
          {error && (
            <p className="text-sm text-red-600">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full bg-[var(--color-brand-dark)] text-[var(--color-brand-cream)] text-sm font-semibold py-3.5 rounded hover:bg-[var(--color-brand-accent)] transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
