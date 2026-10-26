import { createHmac } from 'node:crypto';
import { test, expect } from '@playwright/test';
import { cookieValueForPassword, isValidCookie, verifyPassword } from '../lib/wholesale-auth';

const PASSWORD = 'synthetic-passphrase';

test.beforeEach(() => {
  process.env.WHOLESALE_SHOP_PASSWORD = PASSWORD;
  process.env.WHOLESALE_COOKIE_SECRET = 'synthetic-cookie-secret';
});

test('issued cookie validates', () => {
  expect(verifyPassword(PASSWORD)).toBe(true);
  expect(isValidCookie(cookieValueForPassword(PASSWORD))).toBe(true);
});

test('wrong password is rejected', () => {
  expect(verifyPassword('wrong')).toBe(false);
  expect(verifyPassword('')).toBe(false);
});

test('cookie cannot be forged from the password alone', () => {
  const passwordOnly = createHmac('sha256', PASSWORD).update('wholesaleshop-access').digest('hex');
  expect(isValidCookie(passwordOnly)).toBe(false);
});

test('rotating the password or the secret revokes cookies', () => {
  const cookie = cookieValueForPassword(PASSWORD);
  process.env.WHOLESALE_SHOP_PASSWORD = 'rotated-passphrase';
  expect(isValidCookie(cookie)).toBe(false);
  process.env.WHOLESALE_SHOP_PASSWORD = PASSWORD;
  process.env.WHOLESALE_COOKIE_SECRET = 'rotated-secret';
  expect(isValidCookie(cookie)).toBe(false);
});

test('missing cookie secret fails closed and loudly', () => {
  const cookie = cookieValueForPassword(PASSWORD);
  delete process.env.WHOLESALE_COOKIE_SECRET;
  expect(isValidCookie(cookie)).toBe(false);
  expect(() => cookieValueForPassword(PASSWORD)).toThrow(/WHOLESALE_COOKIE_SECRET/);
});
