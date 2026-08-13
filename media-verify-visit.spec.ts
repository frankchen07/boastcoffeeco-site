import { test } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('Visit Page Video Verification', async ({ page }) => {
  await page.goto(`${BASE_URL}/visit`);
  await page.waitForLoadState('networkidle');

  // Check for video element
  const video = page.locator('video').first();
  const videoVisible = await video.isVisible().catch(() => false);

  // Get all sources in the video
  const sources = await video.locator('source').all();
  console.log(`Found ${sources.length} source elements in video`);

  const videoSources = [];
  for (const source of sources) {
    const src = await source.getAttribute('src');
    const type = await source.getAttribute('type');
    console.log(`✓ Source: src="${src}", type="${type}"`);
    videoSources.push({ src, type });
  }

  const hasValidSource = videoSources.some(s => s.src?.includes('timelapse'));
  console.log(`\n4. Visit bcc-timelapse-outside.mp4: ${videoVisible && hasValidSource ? 'PASS' : 'FAIL'}`);
  console.log(`   Video visible: ${videoVisible}, Has timelapse source: ${hasValidSource}`);

  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/4-visit-video.png', fullPage: true });
});
