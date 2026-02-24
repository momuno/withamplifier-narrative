/**
 * Scroll Capture Verification Script
 * Tests the BlackBoxSection scroll-captured cinematic experience
 */

import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000/test-blackbox';

async function verifyScrollCapture() {
  console.log('🔍 Starting scroll capture verification...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  
  const observations = {
    pageLoaded: false,
    initialState: null,
    scrollCaptureTriggered: false,
    headlineFadeIn: false,
    progressIndicatorVisible: false,
    scrollHintVisible: false,
    bodyLocked: false,
    textReveals: [],
    releaseWorked: false,
    errors: []
  };

  try {
    // 1. Load the page
    console.log('📄 Loading page...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    observations.pageLoaded = true;
    console.log('✓ Page loaded successfully\n');

    // 2. Check initial state
    console.log('🔍 Checking initial state...');
    const initialSection = await page.$('section[data-section="problem"]');
    if (initialSection) {
      observations.initialState = await initialSection.getAttribute('data-capture-state');
      console.log(`✓ Initial capture state: "${observations.initialState}"\n`);
    }

    // 3. Scroll down to trigger the BlackBoxSection
    console.log('📜 Scrolling down to trigger section...');
    
    // First, scroll smoothly to approach the section
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    });
    await page.waitForTimeout(500);

    // Check approach state
    let currentState = await page.$eval(
      'section[data-section="problem"]',
      el => el.getAttribute('data-capture-state')
    ).catch(() => null);
    console.log(`  State after initial scroll: "${currentState}"`);

    // Continue scrolling to trigger capture
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);

    // 4. Check if scroll was captured
    currentState = await page.$eval(
      'section[data-section="problem"]',
      el => el.getAttribute('data-capture-state')
    ).catch(() => null);
    
    observations.scrollCaptureTriggered = currentState === 'captured';
    console.log(`✓ Capture state after scrolling: "${currentState}"`);
    console.log(`  Scroll capture triggered: ${observations.scrollCaptureTriggered}\n`);

    // 5. Check if body is locked
    const bodyStyles = await page.evaluate(() => ({
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top
    }));
    observations.bodyLocked = bodyStyles.overflow === 'hidden' && bodyStyles.position === 'fixed';
    console.log(`🔒 Body scroll locked: ${observations.bodyLocked}`);
    console.log(`  Body styles: overflow="${bodyStyles.overflow}", position="${bodyStyles.position}", top="${bodyStyles.top}"\n`);

    // 6. Check headline visibility and fade-in
    console.log('📝 Checking headline...');
    const headlineInfo = await page.evaluate(() => {
      const headline = document.querySelector('section[data-section="problem"] h2');
      if (!headline) return null;
      const style = window.getComputedStyle(headline);
      return {
        text: headline.textContent,
        opacity: parseFloat(style.opacity),
        transform: style.transform,
        visible: parseFloat(style.opacity) > 0.1
      };
    });
    
    if (headlineInfo) {
      observations.headlineFadeIn = headlineInfo.visible;
      console.log(`✓ Headline: "${headlineInfo.text}"`);
      console.log(`  Opacity: ${headlineInfo.opacity}`);
      console.log(`  Visible: ${headlineInfo.visible}\n`);
    }

    // 7. Check progress indicator
    console.log('📊 Checking progress indicator...');
    const progressInfo = await page.evaluate(() => {
      const progress = document.querySelector('section[data-section="problem"] > div.absolute.bottom-0');
      if (!progress) return { found: false };
      const style = window.getComputedStyle(progress);
      return {
        found: true,
        opacity: parseFloat(style.opacity),
        width: style.width,
        visible: parseFloat(style.opacity) > 0
      };
    });
    
    observations.progressIndicatorVisible = progressInfo.found && progressInfo.visible;
    console.log(`  Progress indicator found: ${progressInfo.found}`);
    console.log(`  Opacity: ${progressInfo.opacity || 'N/A'}`);
    console.log(`  Visible: ${observations.progressIndicatorVisible}\n`);

    // 8. Check "Scroll to reveal" hint
    console.log('💡 Checking scroll hint...');
    const scrollHint = await page.evaluate(() => {
      const hints = document.querySelectorAll('section[data-section="problem"] .absolute');
      for (const hint of hints) {
        if (hint.textContent?.includes('Scroll to reveal')) {
          const style = window.getComputedStyle(hint);
          return {
            found: true,
            text: hint.textContent.trim(),
            opacity: parseFloat(style.opacity),
            visible: parseFloat(style.opacity) > 0.1
          };
        }
      }
      return { found: false };
    });
    
    observations.scrollHintVisible = scrollHint.found && scrollHint.visible;
    console.log(`  Scroll hint found: ${scrollHint.found}`);
    if (scrollHint.found) {
      console.log(`  Text: "${scrollHint.text}"`);
      console.log(`  Opacity: ${scrollHint.opacity}`);
      console.log(`  Visible: ${observations.scrollHintVisible}`);
    }
    console.log('');

    // 9. Simulate scroll within captured section to reveal text
    console.log('🎬 Simulating scroll to reveal content...');
    
    // Send wheel events to progress through the content
    for (let i = 0; i < 20; i++) {
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(500);

    // Check text reveal progress
    const textRevealInfo = await page.evaluate(() => {
      const paragraphs = document.querySelectorAll('section[data-section="problem"] p');
      return Array.from(paragraphs).map(p => {
        const style = window.getComputedStyle(p);
        return {
          text: p.textContent?.substring(0, 50) + '...',
          opacity: parseFloat(style.opacity)
        };
      });
    });
    
    observations.textReveals = textRevealInfo;
    console.log('  Text reveal states:');
    textRevealInfo.forEach((t, i) => {
      console.log(`    [${i}] opacity: ${t.opacity.toFixed(2)} - "${t.text}"`);
    });
    console.log('');

    // 10. Continue scrolling to complete and release
    console.log('🏁 Completing scroll sequence...');
    for (let i = 0; i < 30; i++) {
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(30);
    }
    await page.waitForTimeout(500);

    // Check final state
    const finalState = await page.$eval(
      'section[data-section="problem"]',
      el => el.getAttribute('data-capture-state')
    ).catch(() => null);
    
    observations.releaseWorked = finalState === 'releasing' || finalState === 'settled';
    console.log(`  Final state: "${finalState}"`);
    console.log(`  Release worked: ${observations.releaseWorked}\n`);

    // Take screenshots at key moments
    await page.screenshot({ path: '/tmp/blackbox-final-state.png' });
    console.log('📸 Screenshot saved to /tmp/blackbox-final-state.png\n');

  } catch (error) {
    observations.errors.push(error.message);
    console.error('❌ Error:', error.message);
  }

  await browser.close();

  // Summary
  console.log('═══════════════════════════════════════════════════');
  console.log('                VERIFICATION SUMMARY                 ');
  console.log('═══════════════════════════════════════════════════\n');
  
  const checks = [
    ['Page loads correctly', observations.pageLoaded],
    ['Scroll capture triggers', observations.scrollCaptureTriggered],
    ['Body scroll locks when captured', observations.bodyLocked],
    ['Headline fades in', observations.headlineFadeIn],
    ['Progress indicator appears', observations.progressIndicatorVisible],
    ['Scroll hint visible', observations.scrollHintVisible],
    ['Release mechanism works', observations.releaseWorked],
  ];

  checks.forEach(([name, passed]) => {
    const icon = passed ? '✅' : '❌';
    console.log(`${icon} ${name}`);
  });

  console.log('\n═══════════════════════════════════════════════════\n');
  
  const passedCount = checks.filter(([, p]) => p).length;
  const totalCount = checks.length;
  
  if (passedCount === totalCount) {
    console.log(`🎉 All ${totalCount} checks passed! Scroll capture is working correctly.`);
  } else {
    console.log(`⚠️  ${passedCount}/${totalCount} checks passed. Review failures above.`);
  }
  
  return observations;
}

verifyScrollCapture().catch(console.error);
