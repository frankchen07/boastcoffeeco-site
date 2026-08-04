import CartDrawer from "@/components/sections/CartDrawer";
import WholesaleHeader from "@/components/layout/WholesaleHeader";
import WholesaleFooter from "@/components/layout/WholesaleFooter";
import { WholesaleCartProvider, useWholesaleCart } from "@/lib/wholesale-cart-context";
import { SHOPIFY_ACCOUNT_URL } from "@/lib/shopify-wholesale";

export default function WholesaleShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <WholesaleCartProvider>
      <WholesaleHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <WholesaleFooter accountUrl={SHOPIFY_ACCOUNT_URL} />
      <CartDrawer useCartHook={useWholesaleCart} shopBasePath="/wholesaleshop" />
    </WholesaleCartProvider>
  );
}
