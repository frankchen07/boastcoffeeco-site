import { createHmac, timingSafeEqual } from "crypto";

export const WHOLESALE_AUTH_COOKIE = "wholesale_auth";

function sign(password: string): string {
  return createHmac("sha256", password).update("wholesaleshop-access").digest("hex");
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.WHOLESALE_SHOP_PASSWORD;
  return Boolean(expected) && input === expected;
}

export function cookieValueForPassword(password: string): string {
  return sign(password);
}

export function isValidCookie(value: string | undefined): boolean {
  const expected = process.env.WHOLESALE_SHOP_PASSWORD;
  if (!expected || !value) return false;

  const expectedValue = Buffer.from(sign(expected));
  const actualValue = Buffer.from(value);
  if (expectedValue.length !== actualValue.length) return false;

  return timingSafeEqual(expectedValue, actualValue);
}
