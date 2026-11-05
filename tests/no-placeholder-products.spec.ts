import { test, expect } from '@playwright/test';
import { createHmac } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

// Needs a running server with live Shopify data. signature-blend was a placeholder handle.
const PLACEHOLDER = 'signature-blend';
const REAL = 'nitro-cold-brew-growler';

function localEnv(key: string): string | undefined {
  if (!existsSync('.env.local')) return undefined;
  const matches = [...readFileSync('.env.local', 'utf8').matchAll(new RegExp(`^${key}="?(.*?)"?$`, 'gm'))];
  return matches.at(-1)?.[1] || undefined;
}

function wholesaleHeaders(): Record<string, string> | undefined {
  const password = localEnv('WHOLESALE_SHOP_PASSWORD');
  const secret = localEnv('WHOLESALE_COOKIE_SECRET');
  if (!password || !secret) return undefined;
  const value = createHmac('sha256', secret).update(`wholesaleshop-access:${password}`).digest('hex');
  return { Cookie: `wholesale_auth=${value}` };
}

test('retail shows real products and no placeholder', async ({ request }) => {
  const list = await request.get('/shop');
  const html = await list.text();
  expect(list.status()).toBe(200);
  expect(html).toContain(REAL);
  expect(html).not.toContain(PLACEHOLDER);
  expect((await request.get(`/shop/${REAL}`)).status()).toBe(200);
  expect((await request.get(`/shop/${PLACEHOLDER}`)).status()).toBe(404);
});

test('wholesale shows real products and no placeholder', async ({ request }) => {
  const headers = wholesaleHeaders();
  test.skip(!headers, 'needs wholesale values in .env.local');
  const list = await request.get('/wholesaleshop', { headers, maxRedirects: 0 });
  const html = await list.text();
  expect(list.status()).toBe(200);
  expect(html).toContain(REAL);
  expect(html).not.toContain(PLACEHOLDER);
  expect((await request.get(`/wholesaleshop/${REAL}`, { headers, maxRedirects: 0 })).status()).toBe(200);
  expect((await request.get(`/wholesaleshop/${PLACEHOLDER}`, { headers, maxRedirects: 0 })).status()).toBe(404);
});
