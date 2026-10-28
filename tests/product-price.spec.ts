import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
// Real product with size options and Appstle selling plans
const PRODUCT = '/shop/keep-it-movin-house-blend-peru-mexico';

// The title block used to show minVariantPrice, which isn't the price of any selected option.
test('product title block shows no price; option rows do', async ({ page }) => {
  await page.goto(`${BASE_URL}${PRODUCT}`);

  const titleBlock = page.locator('h1').locator('..');
  await expect(titleBlock).not.toContainText('$');

  const oneTime = page.locator('label', { has: page.getByRole('radio', { name: /One-time purchase/ }) });
  await expect(oneTime).toContainText(/\$\d/);

  const before = await oneTime.innerText();
  await page.getByRole('button', { name: /16 ounces/ }).click();
  await expect(oneTime).not.toHaveText(before);
});

test('product without selling plans still shows its price', async ({ page }) => {
  await page.goto(`${BASE_URL}/shop/nitro-cold-brew-growler`);

  await expect(page.getByRole('radio')).toHaveCount(0);
  await expect(page.getByText(/^\$\d+\.\d\d$/)).toBeVisible();
});
