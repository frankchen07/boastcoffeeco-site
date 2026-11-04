import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

test('redirects old /shop-1 to /shop permanently', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/shop-1`, { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers().location).toBe('/shop');
});

const oldProductPages = [
  ['/product-page/keep-it-movin-blend', '/shop/keep-it-movin-house-blend-peru-mexico'],
  ['/product-page/level-up-adventure-10-pack', '/shop'],
];

for (const [path, destination] of oldProductPages) {
  test(`redirects old ${path} to ${destination} permanently`, async ({ request }) => {
    const res = await request.get(`${BASE_URL}${path}`, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toBe(destination);
  });
}

for (const path of ['/gift-card', '/loyalty']) {
  test(`leaves retired ${path} as a 404`, async ({ request }) => {
    const res = await request.get(`${BASE_URL}${path}`, { maxRedirects: 0 });
    expect(res.status()).toBe(404);
  });
}
