"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "@/components/sections/CartDrawer";
import { SHOPIFY_ACCOUNT_URL } from "@/lib/shopify";

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/wholesaleshop")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer accountUrl={SHOPIFY_ACCOUNT_URL} />
      <CartDrawer />
    </>
  );
}
