import { createHmac, timingSafeEqual } from "crypto";

export const WHOLESALE_AUTH_COOKIE = "wholesale_auth";

// Keyed by a separate secret so a leaked cookie can't be used to guess the password offline.
function sign(password: string, secret: string): string {
  return createHmac("sha256", secret).update(`wholesaleshop-access:${password}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.WHOLESALE_SHOP_PASSWORD;
  return Boolean(expected) && safeEqual(input, expected!);
}

export function cookieValueForPassword(password: string): string {
  const secret = process.env.WHOLESALE_COOKIE_SECRET;
  if (!secret) throw new Error("WHOLESALE_COOKIE_SECRET is not set");
  return sign(password, secret);
}

export function isValidCookie(value: string | undefined): boolean {
  const expected = process.env.WHOLESALE_SHOP_PASSWORD;
  const secret = process.env.WHOLESALE_COOKIE_SECRET;
  if (!expected || !secret || !value) return false;

  return safeEqual(sign(expected, secret), value);
}
