import { test, expect } from '@playwright/test';
import { createHmac } from 'node:crypto';

// Run against a server started with SHOPIFY_WEBHOOK_SECRET=test
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const ENDPOINT = `${BASE_URL}/api/revalidate/shopify`;
const BODY = JSON.stringify({ id: 123, title: 'Test Product' });

const sign = (body: string, secret: string) =>
  createHmac('sha256', secret).update(body, 'utf8').digest('base64');

test('rejects webhook without HMAC header', async ({ request }) => {
  const res = await request.post(ENDPOINT, { data: BODY, headers: { 'Content-Type': 'application/json' } });
  expect(res.status()).toBe(401);
});

test('rejects webhook signed with wrong secret', async ({ request }) => {
  const res = await request.post(ENDPOINT, {
    data: BODY,
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Hmac-Sha256': sign(BODY, 'wrong') },
  });
  expect(res.status()).toBe(401);
});

test('accepts correctly signed webhook and revalidates', async ({ request }) => {
  const res = await request.post(ENDPOINT, {
    data: BODY,
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Hmac-Sha256': sign(BODY, 'test') },
  });
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ revalidated: true });
});
