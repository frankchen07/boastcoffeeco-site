import { test, expect } from '@playwright/test';

// Build and start the server with NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=shop.invalid so the fetch really fails,
// then run: SHOPIFY_DOWN=1 npx playwright test tests/shop-error-page.spec.ts
test('product page returns an error, not a 404, when Shopify fails', async ({ page }) => {
  test.skip(!process.env.SHOPIFY_DOWN, 'needs a server pointed at an unreachable store');

  const res = await page.goto('/shop/nitro-cold-brew-growler');
  const html = await page.content();

  expect(res?.status()).toBe(500);
  await expect(page.getByRole('heading', { level: 1, name: "We couldn't load this page" })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();
  expect(html).not.toMatch(/fetch failed|shop\.invalid|Shopify API error|Shopify GraphQL error/);
});
