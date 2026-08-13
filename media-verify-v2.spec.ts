import { test } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('Media Verification - All 4 Elements', async ({ page }) => {
  // Test 1: Homepage truck image (in Catering section)
  await page.goto(`${BASE_URL}/`);
  await page.waitForLoadState('networkidle');

  // Scroll to find the truck image
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll('*')).find(el =>
      el.textContent?.includes('Solar-powered sustainability')
    );
    if (heading) heading.scrollIntoView();
  });

  await page.waitForTimeout(500);

  // Find all images on the page
  const allImgs = await page.locator('img').all();
  let truckFound = false;
  let truckSrc = 'NOT_FOUND';

  for (const img of allImgs) {
    const src = await img.getAttribute('src');
    const alt = await img.getAttribute('alt');
    if (src?.includes('truck') || alt?.includes('truck')) {
      truckFound = await img.isVisible().catch(() => false);
      truckSrc = src || 'EMPTY_SRC';
      console.log(`✓ Found truck image: src="${src}", alt="${alt}", visible=${truckFound}`);
      break;
    }
  }

  console.log(`1. Homepage bcc-truck.jpg: ${truckFound ? 'PASS' : 'FAIL'} (${truckSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/1-homepage-v2.png', fullPage: true });

  // Test 2: Shop buckets image
  await page.goto(`${BASE_URL}/shop`);
  await page.waitForLoadState('networkidle');
  const bucketsImg = page.locator('img[alt*="buckets"], img[src*="buckets"]').first();
  const bucketsVisible = await bucketsImg.isVisible().catch(() => false);
  const bucketsSrc = await bucketsImg.getAttribute('src').catch(() => 'NOT_FOUND');
  console.log(`2. Shop bcc-buckets-1.jpg: ${bucketsVisible ? 'PASS' : 'FAIL'} (${bucketsSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/2-shop-v2.png', fullPage: true });

  // Test 3: Our Story bags image
  await page.goto(`${BASE_URL}/our-story`);
  await page.waitForLoadState('networkidle');
  const bagsImg = page.locator('img[alt*="bags"], img[src*="bags"]').first();
  const bagsVisible = await bagsImg.isVisible().catch(() => false);
  const bagsSrc = await bagsImg.getAttribute('src').catch(() => 'NOT_FOUND');
  console.log(`3. Our Story bcc-bags-1.jpg: ${bagsVisible ? 'PASS' : 'FAIL'} (${bagsSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/3-story-v2.png', fullPage: true });

  // Test 4: Visit video
  await page.goto(`${BASE_URL}/visit`);
  await page.waitForLoadState('networkidle');
  const video = page.locator('video').first();
  const videoVisible = await video.isVisible().catch(() => false);
  const source = video.locator('source').first();
  const videoSrc = await source.getAttribute('src').catch(() => 'NOT_FOUND');
  console.log(`4. Visit bcc-timelapse-outside.mp4: ${videoVisible ? 'PASS' : 'FAIL'} (${videoSrc})`);
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/4-visit-v2.png', fullPage: true });
});
