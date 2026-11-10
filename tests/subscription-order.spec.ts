import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
// Real product with Appstle selling plans in short-term and long-term groups
const PRODUCT = '/shop/keep-it-movin-house-blend-peru-mexico';

test('selling plans list by group, then most frequent delivery first', async ({ page }) => {
  await page.goto(`${BASE_URL}${PRODUCT}`);

  const labels = await page
    .locator('label:has(input[name="purchase-option"])')
    .allTextContents();
  const order = labels.map((text) => {
    const t = text.toLowerCase();
    if (t.includes('one-time')) return 'one-time';
    const term = t.includes('6 month') ? 'long' : 'short';
    const freq = t.includes('biweekly') ? 'biweekly' : 'monthly';
    return `${term}-${freq}`;
  });

  expect(order).toEqual([
    'one-time',
    'short-biweekly',
    'short-monthly',
    'long-biweekly',
    'long-monthly',
  ]);
});
