"use server";

import * as wholesale from "./shopify-wholesale";
import { hasWholesaleSession } from "./wholesale-auth";
import type { NormalizedCart } from "./types";

// Server Actions are public POST endpoints, so each one re-checks the session.
async function requireWholesaleSession() {
  if (!(await hasWholesaleSession())) throw new Error("Unauthorized");
}

export async function createCart(): Promise<NormalizedCart> {
  await requireWholesaleSession();
  return wholesale.createCart();
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number; sellingPlanId?: string }[]
): Promise<NormalizedCart> {
  await requireWholesaleSession();
  return wholesale.addToCart(cartId, lines);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<NormalizedCart> {
  await requireWholesaleSession();
  return wholesale.removeFromCart(cartId, lineIds);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<NormalizedCart> {
  await requireWholesaleSession();
  return wholesale.updateCartLine(cartId, lineId, quantity);
}

export async function getCart(cartId: string): Promise<NormalizedCart | null> {
  await requireWholesaleSession();
  return wholesale.getCart(cartId);
}
