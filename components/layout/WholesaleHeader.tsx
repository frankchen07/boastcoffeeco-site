import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/components/ui/CartIcon";
import { useWholesaleCart } from "@/lib/wholesale-cart-context";

export default function WholesaleHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-brand-cream)] border-b border-[var(--color-brand-border)]">
      <div className="container-md flex items-center justify-between h-16">
        <Link href="/wholesaleshop" aria-label="Boast Coffee Co. Wholesale" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Boast Coffee Co."
            height={40}
            width={160}
            priority
            className="h-10 w-auto"
            style={{ width: "auto" }}
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-muted)] border-l border-[var(--color-brand-border)] pl-3">
            Wholesale
          </span>
        </Link>

        <CartIcon useCartHook={useWholesaleCart} />
      </div>
    </header>
  );
}
