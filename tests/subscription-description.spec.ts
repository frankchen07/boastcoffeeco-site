import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
// Real product with Appstle selling plans (Monthly + 6 Month)
const PRODUCT = '/shop/keep-it-movin-house-blend-peru-mexico';

test('selling plan description shows only once that plan is selected', async ({ page }) => {
  await page.goto(`${BASE_URL}${PRODUCT}`);

  const monthly = page.getByRole('radio', { name: /Monthly Subscription/ });
  const description = page.locator('#selling-plan-description');

  await expect(description).toHaveCount(0);

  await monthly.check();
  await expect(description).toBeVisible();
  await expect(monthly).toHaveAttribute('aria-describedby', 'selling-plan-description');

  const text = (await description.textContent())?.trim() ?? '';
  expect(text.length).toBeGreaterThan(0);
  expect(text).not.toMatch(/[<>]/);

  await page.getByRole('radio', { name: /One-time purchase/ }).check();
  await expect(description).toHaveCount(0);
});
