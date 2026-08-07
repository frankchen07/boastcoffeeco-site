import { test } from '@playwright/test';

test('Inspect mobile header structure', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Get header HTML
  const headerHtml = await page.locator('header').innerHTML();
  console.log('Header HTML:');
  console.log(headerHtml.substring(0, 800));

  // List all buttons and their attributes
  const buttons = await page.locator('header button').all();
  console.log(`\nFound ${buttons.length} buttons:`);
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const html = await btn.innerHTML();
    const ariaLabel = await btn.getAttribute('aria-label');
    console.log(`Button ${i}: aria-label="${ariaLabel}"`);
    console.log(`  HTML: ${html.substring(0, 150)}`);
  }

  // Check for nav elements
  const navs = await page.locator('nav').all();
  console.log(`\nFound ${navs.length} nav elements`);
});
