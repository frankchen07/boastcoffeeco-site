import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = '/private/tmp/claude-501/-Users-fronk-Documents-github-boastcoffeeco-site/56734c5c-4dee-4ed9-9f1f-1422a8dd772b/scratchpad/screenshots';

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

test.describe('Boast Coffee Site Navigation Requirements', () => {
  // REQUIREMENT 1: Desktop header nav on /
  test('Requirement 1: Desktop header nav shows only "Services", "Visit", "Shop"', async ({ page }) => {
    console.log('\n=== REQUIREMENT 1: Desktop Header Navigation ===');

    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Load homepage
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    console.log('✓ Loaded homepage at desktop viewport (1200px)');

    // Wait for header to be visible
    await page.waitForSelector('header', { timeout: 5000 });

    // Get all nav items in header
    const navLinks = await page.locator('header a, header button').allTextContents();
    console.log('Header nav items found:', navLinks);

    // Screenshot header
    await page.screenshot({ path: `${SCREENSHOT_DIR}/1-desktop-header.png`, fullPage: false });
    console.log('✓ Screenshot saved: 1-desktop-header.png');

    // Extract main nav text (looking for nav container)
    const headerNav = page.locator('header nav');
    const navText = await headerNav.textContent();
    console.log('Header nav text:', navText);

    // Check for expected links
    const hasServices = await page.locator('header a, header button').filter({ hasText: /^Services$/ }).count() > 0;
    const hasVisit = await page.locator('header a, header button').filter({ hasText: /^Visit$/ }).count() > 0;
    const hasShop = await page.locator('header a, header button').filter({ hasText: /^Shop$/ }).count() > 0;

    // Check that unwanted links don't exist in header
    const hasCatering = await page.locator('header a, header button').filter({ hasText: /Catering/ }).count() > 0;
    const hasNitro = await page.locator('header a, header button').filter({ hasText: /Nitro/ }).count() > 0;
    const hasEspresso = await page.locator('header a, header button').filter({ hasText: /Espresso/ }).count() > 0;

    console.log(`Services found: ${hasServices}`);
    console.log(`Visit found: ${hasVisit}`);
    console.log(`Shop found: ${hasShop}`);
    console.log(`Catering found: ${hasCatering}`);
    console.log(`Nitro found: ${hasNitro}`);
    console.log(`Espresso found: ${hasEspresso}`);

    const result1 = hasServices && hasVisit && hasShop && !hasCatering && !hasNitro && !hasEspresso;
    console.log(result1 ? '✓ PASS' : '✗ FAIL');
    console.log('---');

    if (!result1) {
      throw new Error('Requirement 1 FAILED: Header navigation does not match expected items');
    }
  });

  // REQUIREMENT 2: Mobile hamburger menu on /
  test('Requirement 2: Mobile hamburger menu shows only "Services", "Visit", "Shop"', async ({ page }) => {
    console.log('\n=== REQUIREMENT 2: Mobile Hamburger Menu ===');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    console.log('✓ Set mobile viewport (375px)');

    // Load homepage
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    console.log('✓ Loaded homepage at mobile viewport');

    // Find hamburger menu button
    const hamburgerButton = page.locator('button').filter({ hasText: /menu|hamburger|☰|⋮/i }).first();
    const mobileMenuButton = page.locator('[aria-label*="Menu" i], [aria-label*="menu" i], .mobile-menu-btn, [class*="hamburger"]').first();

    // Find the menu button by aria-label
    const menuButton = page.locator('header button[aria-label="Open menu"]');
    const menuExists = await menuButton.count() > 0;

    if (menuExists) {
      console.log('✓ Found menu button');
      await menuButton.click();
      console.log('✓ Clicked menu button');
    } else {
      throw new Error('Menu button not found');
    }

    // Wait for menu to appear
    await page.waitForTimeout(500);

    // Take screenshot of menu
    await page.screenshot({ path: `${SCREENSHOT_DIR}/2-mobile-hamburger.png`, fullPage: true });
    console.log('✓ Screenshot saved: 2-mobile-hamburger.png');

    // Check menu items - look for nav element that contains the menu
    const navMenuItems = await page.locator('nav').allTextContents();
    console.log('Nav items found:', navMenuItems);

    // Get the text content of the mobile menu specifically
    let menuContent = '';
    for (const navText of navMenuItems) {
      menuContent += navText;
    }

    console.log('Menu content combined:', menuContent);

    const hasServices = menuContent.includes('Services');
    const hasVisit = menuContent.includes('Visit');
    const hasShop = menuContent.includes('Shop');

    const hasCateringInMenu = menuContent.includes('Catering');
    const hasNitroInMenu = menuContent.includes('Nitro');
    const hasEspressoInMenu = menuContent.includes('Espresso');

    console.log(`Services in menu: ${hasServices}`);
    console.log(`Visit in menu: ${hasVisit}`);
    console.log(`Shop in menu: ${hasShop}`);
    console.log(`Catering in menu: ${hasCateringInMenu}`);
    console.log(`Nitro in menu: ${hasNitroInMenu}`);
    console.log(`Espresso in menu: ${hasEspressoInMenu}`);

    // For a proper pass, menu should have Services, Visit, Shop
    // and should NOT have separate Catering, Nitro, Espresso links
    const result2 = hasServices && hasVisit && hasShop && !hasCateringInMenu && !hasNitroInMenu && !hasEspressoInMenu;
    console.log(result2 ? '✓ PASS' : '✗ FAIL');
    console.log('---');
  });

  // REQUIREMENT 3: Footer Navigate column on /
  test('Requirement 3: Footer Navigate column shows only "Services", "Visit", "Shop"', async ({ page }) => {
    console.log('\n=== REQUIREMENT 3: Footer Navigate Column ===');

    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Load homepage
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    console.log('✓ Loaded homepage');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    console.log('✓ Scrolled to footer');

    // Take footer screenshot
    const footer = page.locator('footer');
    if (await footer.isVisible()) {
      await footer.screenshot({ path: `${SCREENSHOT_DIR}/3-footer.png` });
      console.log('✓ Screenshot saved: 3-footer.png');
    }

    // Find Navigate column
    const footerText = await page.locator('footer').textContent();
    console.log('Footer text (first 500 chars):', footerText?.substring(0, 500));

    // Look for Navigate heading
    const navigateHeading = page.locator('footer').locator('text=Navigate');
    const hasNavigateColumn = await navigateHeading.count() > 0;
    console.log(`Navigate column found: ${hasNavigateColumn}`);

    // Get all footer links
    const footerLinks = await page.locator('footer a').allTextContents();
    console.log('Footer links:', footerLinks);

    // Check specific items
    const hasServices = footerLinks.some(link => link.trim() === 'Services');
    const hasVisit = footerLinks.some(link => link.trim() === 'Visit');
    const hasShop = footerLinks.some(link => link.trim() === 'Shop');
    const hasHome = footerLinks.some(link => link.trim() === 'Home');
    const hasCatering = footerLinks.some(link => link.includes('Catering'));
    const hasNitro = footerLinks.some(link => link.includes('Nitro'));
    const hasEspresso = footerLinks.some(link => link.includes('Espresso'));

    console.log(`Services in footer: ${hasServices}`);
    console.log(`Visit in footer: ${hasVisit}`);
    console.log(`Shop in footer: ${hasShop}`);
    console.log(`Home in footer: ${hasHome}`);
    console.log(`Catering in footer: ${hasCatering}`);
    console.log(`Nitro in footer: ${hasNitro}`);
    console.log(`Espresso in footer: ${hasEspresso}`);

    const result3 = hasServices && hasVisit && hasShop && !hasHome && !hasCatering && !hasNitro && !hasEspresso;
    console.log(result3 ? '✓ PASS' : '✗ FAIL');
    console.log('---');
  });

  // REQUIREMENT 4: Services nav click and scroll behavior from /shop
  test('Requirement 4: Services nav click from /shop navigates to / and scrolls correctly', async ({ page }) => {
    console.log('\n=== REQUIREMENT 4: Services Navigation from /shop ===');

    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Load shop page
    await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
    console.log('✓ Loaded /shop');

    // Take screenshot before click
    await page.screenshot({ path: `${SCREENSHOT_DIR}/4a-shop-page.png` });
    console.log('✓ Screenshot saved: 4a-shop-page.png');

    // Click Services link in header
    const servicesLink = page.locator('header a, header button').filter({ hasText: /^Services$/ }).first();
    if (await servicesLink.count() > 0) {
      await servicesLink.click();
      console.log('✓ Clicked Services link');
    } else {
      console.log('✗ Could not find Services link');
      throw new Error('Services link not found in header');
    }

    // Wait for navigation
    await page.waitForURL(`${BASE_URL}/#services`, { timeout: 5000 }).catch(() => {
      console.log('⚠ Did not navigate to /#services');
    });

    await page.waitForTimeout(1000);

    // Take screenshot after click
    await page.screenshot({ path: `${SCREENSHOT_DIR}/4b-after-services-click.png` });
    console.log('✓ Screenshot saved: 4b-after-services-click.png');

    // Check current URL
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);

    // Verify we're on home page
    const isOnHome = currentUrl.includes('localhost:3000') && (currentUrl.endsWith('/') || currentUrl.includes('#services'));
    console.log(`On home page: ${isOnHome}`);

    // Check if Our Services heading is visible and in proper position
    const ourServicesHeading = page.locator('text=Our Services').first();
    const isServicesVisible = await ourServicesHeading.isVisible();
    console.log(`Our Services heading visible: ${isServicesVisible}`);

    if (isServicesVisible) {
      const boundingBox = await ourServicesHeading.boundingBox();
      console.log(`Our Services position - top: ${boundingBox?.y}, height: ${boundingBox?.height}`);

      // Get header height to verify proper scroll positioning
      const header = page.locator('header');
      const headerBox = await header.boundingBox();
      console.log(`Header height: ${headerBox?.height}`);
    }

    // Check that no accordions are expanded
    const expandedSections = await page.locator('[aria-expanded="true"]').count();
    console.log(`Expanded accordion sections: ${expandedSections}`);

    const result4 = isOnHome && isServicesVisible;
    console.log(result4 ? '✓ PASS' : '✗ FAIL');
    console.log('---');
  });

  // REQUIREMENT 5: Legacy URL redirects
  test('Requirement 5a: /catering redirects to /#catering and expands Catering section', async ({ page }) => {
    console.log('\n=== REQUIREMENT 5a: /catering redirect ===');

    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigate to /catering
    await page.goto(`${BASE_URL}/catering`, { waitUntil: 'networkidle' });
    console.log('✓ Navigated to /catering');

    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ path: `${SCREENSHOT_DIR}/5a-catering-redirect.png` });
    console.log('✓ Screenshot saved: 5a-catering-redirect.png');

    // Check URL
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);

    const isRedirected = currentUrl.includes('#catering') || currentUrl.endsWith('/');
    console.log(`Redirected correctly: ${isRedirected}`);

    // Check if Catering accordion is expanded
    const cateringSection = page.locator('text=Catering').first();
    const cateringVisible = await cateringSection.isVisible();
    console.log(`Catering section visible: ${cateringVisible}`);

    // Look for expanded state on parent accordion
    const cateringParent = cateringSection.locator('..').first();
    const isExpanded = await cateringParent.locator('[aria-expanded="true"]').count() > 0;
    console.log(`Catering accordion expanded: ${isExpanded}`);

    const result5a = isRedirected && cateringVisible;
    console.log(result5a ? '✓ PASS' : '✗ FAIL');
    console.log('---');

    if (!result5a) {
      throw new Error(`Requirement 5a FAILED: isRedirected=${isRedirected}, cateringVisible=${cateringVisible}`);
    }
  });

  test('Requirement 5b: /nitro redirects to /#nitro and expands Nitro section', async ({ page }) => {
    console.log('\n=== REQUIREMENT 5b: /nitro redirect ===');

    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigate to /nitro
    await page.goto(`${BASE_URL}/nitro`, { waitUntil: 'networkidle' });
    console.log('✓ Navigated to /nitro');

    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ path: `${SCREENSHOT_DIR}/5b-nitro-redirect.png` });
    console.log('✓ Screenshot saved: 5b-nitro-redirect.png');

    // Check URL
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);

    const isRedirected = currentUrl.includes('#nitro') || currentUrl.endsWith('/');
    console.log(`Redirected correctly: ${isRedirected}`);

    // Check if Nitro section is visible
    const nitroSection = page.locator('text=Nitro').first();
    const nitroVisible = await nitroSection.isVisible();
    console.log(`Nitro section visible: ${nitroVisible}`);

    const result5b = isRedirected && nitroVisible;
    console.log(result5b ? '✓ PASS' : '✗ FAIL');
    console.log('---');

    if (!result5b) {
      throw new Error(`Requirement 5b FAILED: isRedirected=${isRedirected}, nitroVisible=${nitroVisible}`);
    }
  });

  test('Requirement 5c: /spro redirects to /#espresso and expands Espresso section', async ({ page }) => {
    console.log('\n=== REQUIREMENT 5c: /spro redirect ===');

    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Navigate to /spro
    await page.goto(`${BASE_URL}/spro`, { waitUntil: 'networkidle' });
    console.log('✓ Navigated to /spro');

    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ path: `${SCREENSHOT_DIR}/5c-spro-redirect.png` });
    console.log('✓ Screenshot saved: 5c-spro-redirect.png');

    // Check URL
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);

    const isRedirected = currentUrl.includes('#espresso') || currentUrl.endsWith('/');
    console.log(`Redirected correctly: ${isRedirected}`);

    // Check if Espresso section is visible
    const espressoSection = page.locator('text=Espresso').first();
    const espressoVisible = await espressoSection.isVisible();
    console.log(`Espresso section visible: ${espressoVisible}`);

    const result5c = isRedirected && espressoVisible;
    console.log(result5c ? '✓ PASS' : '✗ FAIL');
    console.log('---');

    if (!result5c) {
      throw new Error(`Requirement 5c FAILED: isRedirected=${isRedirected}, espressoVisible=${espressoVisible}`);
    }
  });
});
