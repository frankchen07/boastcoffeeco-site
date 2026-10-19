import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { SHOPIFY_CACHE_TAG } from "@/lib/shopify-client";

// Shopify webhook (products/*, collections/update) → bust cached Storefront data
export async function POST(request: Request) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  const hmac = request.headers.get("x-shopify-hmac-sha256");
  const body = await request.text();

  if (!secret || !hmac) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expected = createHmac("sha256", secret).update(body, "utf8").digest();
  const received = Buffer.from(hmac, "base64");
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(SHOPIFY_CACHE_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
