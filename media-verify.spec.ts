import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('Media Verification', async ({ page }) => {
  // Test 1: Homepage truck image
  await page.goto(`${BASE_URL}/`);
  await page.waitForLoadState('networkidle');

  const truckImg = page.locator('img[src*="truck"]').first();
  const truckVisible = await truckImg.isVisible().catch(() => false);
  const truckSrc = await truckImg.getAttribute('src').catch(() => 'NOT_FOUND');
  console.log(`1. Homepage bcc-truck.jpg: ${truckVisible ? 'PASS' : 'FAIL'} (src: ${truckSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/1-homepage-final.png' });

  // Test 2: Shop buckets image
  await page.goto(`${BASE_URL}/shop`);
  await page.waitForLoadState('networkidle');

  const bucketsImg = page.locator('img[src*="buckets"]').first();
  const bucketsVisible = await bucketsImg.isVisible().catch(() => false);
  const bucketsSrc = await bucketsImg.getAttribute('src').catch(() => 'NOT_FOUND');
  console.log(`2. Shop bcc-buckets-1.jpg: ${bucketsVisible ? 'PASS' : 'FAIL'} (src: ${bucketsSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/2-shop-final.png' });

  // Test 3: Our Story bags image
  await page.goto(`${BASE_URL}/our-story`);
  await page.waitForLoadState('networkidle');

  const bagsImg = page.locator('img[src*="bags"]').first();
  const bagsVisible = await bagsImg.isVisible().catch(() => false);
  const bagsSrc = await bagsImg.getAttribute('src').catch(() => 'NOT_FOUND');
  console.log(`3. Our Story bcc-bags-1.jpg: ${bagsVisible ? 'PASS' : 'FAIL'} (src: ${bagsSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/3-story-final.png' });

  // Test 4: Visit video
  await page.goto(`${BASE_URL}/visit`);
  await page.waitForLoadState('networkidle');

  const video = page.locator('video').first();
  const videoVisible = await video.isVisible().catch(() => false);
  const source = video.locator('source').first();
  const videoSrc = await source.getAttribute('src').catch(() => 'NOT_FOUND');
  console.log(`4. Visit bcc-timelapse-outside.mp4: ${videoVisible ? 'PASS' : 'FAIL'} (src: ${videoSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/4-visit-final.png' });
});
