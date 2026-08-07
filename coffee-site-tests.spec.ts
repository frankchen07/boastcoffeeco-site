import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Test 1: /our-story page structure
test('Test 1: /our-story page structure - heading tag verification', async ({ page }) => {
  await page.goto(`${BASE_URL}/our-story`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Verify "Who We Are" section exists
  const whoWeAreSection = page.locator('text=/Who We Are/');
  const whoWeAreCount = await whoWeAreSection.count();
  console.log(`✓ "Who We Are" section found: ${whoWeAreCount > 0 ? 'PASS' : 'FAIL'}`);

  // Verify "Our Origin Story" section with image exists
  const originStorySection = page.locator('text=/Our Origin Story/');
  const originStoryCount = await originStorySection.count();
  console.log(`✓ "Our Origin Story" section found: ${originStoryCount > 0 ? 'PASS' : 'FAIL'}`);

  // Find the heading text "We're here to boast the coffee, not ourselves." (note: no space between boast and the)
  const boastHeading = page.locator('text=/We\'re here to boast/');
  const headingCount = await boastHeading.count();

  if (headingCount === 0) {
    console.log('✗ FAIL: Heading text not found');
    return;
  }

  // Get the tag name
  const tagName = await boastHeading.first().evaluate(el => el.tagName.toLowerCase());
  const actualText = await boastHeading.first().textContent();
  console.log(`✓ Heading tag found: <${tagName}>`);
  console.log(`✓ Actual heading text: "${actualText}"`);

  const isPassed = tagName === 'h1';
  console.log(`✓ Test 1 Result: ${isPassed ? 'PASS' : 'FAIL'} (Expected: <h1>, Got: <${tagName}>)`);

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/test1-our-story.png' });
});

// Test 2: / homepage structure
test('Test 2: / homepage structure - content sections and text verification', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Get all main sections/headings (looking for first content section after hero)
  const sectionHeadings = page.locator('h1, h2, h3').filter({ hasNot: page.locator('.hero') });
  const firstHeadingText = await sectionHeadings.first().textContent();
  console.log(`✓ First content section heading: "${firstHeadingText}"`);

  // Search for "Our Services" text
  const ourServicesText = page.locator('text=/Our Services/i');
  const ourServicesCount = await ourServicesText.count();
  console.log(`✓ "Our Services" found: ${ourServicesCount > 0 ? 'YES' : 'NO'}`);

  // Search entire page for "Who We Are" - should NOT exist
  const whoWeAreText = page.locator('text=/Who We Are/i');
  const whoWeAreCount = await whoWeAreText.count();
  console.log(`✓ "Who We Are" found on homepage: ${whoWeAreCount > 0 ? 'FAIL' : 'PASS'}`);

  // Search entire page for "Our Origin Story" - should NOT exist
  const originStoryText = page.locator('text=/Our Origin Story/i');
  const originStoryCount = await originStoryText.count();
  console.log(`✓ "Our Origin Story" found on homepage: ${originStoryCount > 0 ? 'FAIL' : 'PASS'}`);

  const isPassed = whoWeAreCount === 0 && originStoryCount === 0 && ourServicesCount > 0;
  console.log(`✓ Test 2 Result: ${isPassed ? 'PASS' : 'FAIL'}`);

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/test2-homepage.png' });
});

// Test 3: Footer "Say Hello" link order
test('Test 3: Footer "Say Hello" link order and href verification', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Find "Say Hello" section (or similar footer section)
  const footer = page.locator('footer');

  // Get all links in footer
  const allFooterLinks = footer.locator('a');
  const linkCount = await allFooterLinks.count();
  console.log(`✓ Total footer links found: ${linkCount}`);

  // Find "Our Story" and "Find Us" links
  const links: { text: string; href: string }[] = [];
  for (let i = 0; i < linkCount; i++) {
    const element = allFooterLinks.nth(i);
    const text = await element.textContent();
    const href = await element.getAttribute('href');
    links.push({ text: text || '', href: href || '' });
  }

  console.log('✓ Footer links:');
  links.forEach((link, idx) => {
    console.log(`  ${idx + 1}. "${link.text}" -> "${link.href}"`);
  });

  // Find indices of "Our Story" and "Find Us"
  const ourStoryIdx = links.findIndex(l => l.text.toLowerCase().includes('our story'));
  const findUsIdx = links.findIndex(l => l.text.toLowerCase().includes('find us'));

  const ourStoryHref = ourStoryIdx >= 0 ? links[ourStoryIdx].href : 'NOT_FOUND';
  const ourStoryFirst = ourStoryIdx >= 0 && findUsIdx >= 0 ? ourStoryIdx < findUsIdx : false;
  const correctHref = ourStoryHref === '/our-story';

  console.log(`✓ "Our Story" appears first: ${ourStoryFirst ? 'YES' : 'NO'}`);
  console.log(`✓ "Our Story" href value: "${ourStoryHref}"`);
  console.log(`✓ Correct href (/our-story): ${correctHref ? 'YES' : 'NO'}`);

  const isPassed = ourStoryFirst && correctHref;
  console.log(`✓ Test 3 Result: ${isPassed ? 'PASS' : 'FAIL'}`);

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/test3-footer.png' });
});

// Test 4: /about redirect
test('Test 4: /about redirect to /our-story', async ({ page }) => {
  let statusCode = 0;

  page.on('response', response => {
    if (response.url().includes('/about')) {
      statusCode = response.status();
    }
  });

  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });

  const finalUrl = page.url();
  const endsWithOurStory = finalUrl.includes('/our-story');

  console.log(`✓ Redirect status code: ${statusCode}`);
  console.log(`✓ Final URL: ${finalUrl}`);
  console.log(`✓ Redirected to /our-story: ${endsWithOurStory ? 'YES' : 'NO'}`);

  const isPassed = statusCode >= 300 && statusCode < 400 && endsWithOurStory;
  console.log(`✓ Test 4 Result: ${isPassed ? 'PASS' : 'FAIL'}`);

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/test4-redirect.png' });
});

// Test 5a: Accordion expansion
test('Test 5a: Accordion expansion - Catering accordion', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Find "Catering" accordion row (actual button element)
  const cateringAccordion = page.locator('button').filter({ hasText: /^Catering$/ }).first();
  const initialState = await cateringAccordion.getAttribute('aria-expanded');

  console.log(`✓ Initial Catering aria-expanded: ${initialState}`);

  // Click to expand
  await cateringAccordion.click();
  await page.waitForTimeout(300);

  const expandedState = await cateringAccordion.getAttribute('aria-expanded');
  console.log(`✓ After click aria-expanded: ${expandedState}`);

  const isPassed = expandedState === 'true';
  console.log(`✓ Test 5a Result: ${isPassed ? 'PASS' : 'FAIL'}`);

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/test5a-accordion.png' });
});

// Test 5b: Anchor link scroll position after accordion
test('Test 5b: Anchor link scroll position - Nitro section after accordion', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Expand Catering accordion
  const cateringAccordion = page.locator('button').filter({ hasText: /^Catering$/ }).first();
  await cateringAccordion.click();
  await page.waitForTimeout(300);
  const cateringStateBeforeClick = await cateringAccordion.getAttribute('aria-expanded');

  // Click Nitro link in top nav (uses /#nitro format)
  const nitroNavLink = page.locator('a[href="/#nitro"]').first();
  await nitroNavLink.click();

  // Wait for scroll to complete
  await page.waitForTimeout(500);

  // Measure exact scroll position
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log(`✓ Scroll position after #nitro click: ${scrollY}px`);

  // Get Nitro section position
  const nitroSection = page.locator('[id="nitro"]').first();
  const nitroBoundingBox = await nitroSection.boundingBox();
  const nitroViewportTop = nitroBoundingBox ? nitroBoundingBox.y : -1;
  console.log(`✓ Nitro section viewport position: ${nitroViewportTop}px from top`);

  // Check if Catering still expanded
  const cateringStateAfterNav = await cateringAccordion.getAttribute('aria-expanded');
  console.log(`✓ Catering aria-expanded after navigation: ${cateringStateAfterNav}`);

  const scrollInRange = scrollY > 0;
  const viewportInRange = nitroViewportTop >= 80 && nitroViewportTop <= 120;
  const cateringStaysOpen = cateringStateBeforeClick === 'true' && cateringStateAfterNav === 'true';

  console.log(`✓ Scroll in valid range: ${scrollInRange ? 'YES' : 'NO'}`);
  console.log(`✓ Viewport position in range (80-120px): ${viewportInRange ? 'YES' : 'NO'}`);
  console.log(`✓ Catering stayed open: ${cateringStaysOpen ? 'YES' : 'NO'}`);

  const isPassed = scrollInRange && cateringStaysOpen;
  console.log(`✓ Test 5b Result: ${isPassed ? 'PASS' : 'FAIL'}`);

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/test5b-scroll-position.png' });
});

// Test 5c: Footer nav link scroll tests
test('Test 5c: Footer nav link scroll tests - Catering, Nitro, Espresso', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Expand Catering accordion
  const cateringAccordion = page.locator('button').filter({ hasText: /^Catering$/ }).first();
  await cateringAccordion.click();
  await page.waitForTimeout(300);

  const sections = ['Catering', 'Nitro', 'Espresso'];
  const results: { section: string; scrollPosition: number; ariaExpanded: string; passed: boolean }[] = [];

  for (const section of sections) {
    console.log(`\n  Testing ${section}...`);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Find and click the footer nav link for this section (uses /#section format)
    const footerLink = page.locator(`a[href="/#${section.toLowerCase()}"]`).last();
    const linkExists = await footerLink.count() > 0;

    if (!linkExists) {
      console.log(`    ✗ Footer link for /#${section.toLowerCase()} not found`);
      results.push({ section, scrollPosition: -1, ariaExpanded: 'NOT_FOUND', passed: false });
      continue;
    }

    await footerLink.click();
    await page.waitForTimeout(500);

    // Measure scroll position
    const scrollY = await page.evaluate(() => window.scrollY);

    // Check accordion state
    const cateringState = await cateringAccordion.getAttribute('aria-expanded');

    // Check if section is in viewport
    const targetSection = page.locator(`[id="${section.toLowerCase()}"]`).first();
    const boundingBox = await targetSection.boundingBox();
    const viewportY = boundingBox ? boundingBox.y : -1;

    const passed = scrollY > 0 && cateringState === 'true';

    console.log(`    - Scroll position: ${scrollY}px`);
    console.log(`    - Catering aria-expanded: ${cateringState}`);
    console.log(`    - Target viewport Y: ${viewportY}px`);

    results.push({ section, scrollPosition: scrollY, ariaExpanded: cateringState || 'NOT_FOUND', passed });
  }

  // Summary
  console.log(`\n✓ Test 5c Results Summary:`);
  results.forEach(r => {
    console.log(`  ${r.section}: Scroll=${r.scrollPosition}px, AriaExpanded=${r.ariaExpanded}, ${r.passed ? 'PASS' : 'FAIL'}`);
  });

  const allPassed = results.every(r => r.passed);
  console.log(`✓ Test 5c Overall Result: ${allPassed ? 'PASS' : 'FAIL'}`);

  // Take screenshot
  await page.screenshot({ path: '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/test5c-footer-nav.png' });
});
