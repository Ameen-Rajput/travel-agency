import playwright from 'playwright';

(async () => {
  const browser = await playwright.chromium.launch();

  // Test different viewport sizes
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'laptop', width: 1440, height: 900 },
    { name: 'desktop', width: 1920, height: 1080 },
    { name: '4k', width: 2560, height: 1440 }
  ];

  for (const viewport of viewports) {
    console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });

    const page = await context.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    // Wait for content to load
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: `screenshot-${viewport.name}.png`,
      fullPage: true
    });

    // Get computed styles of key elements
    const styles = await page.evaluate(() => {
      const hero = document.querySelector('.hero-title');
      const container = document.querySelector('.container');

      return {
        heroFontSize: hero ? window.getComputedStyle(hero).fontSize : 'not found',
        containerMaxWidth: container ? window.getComputedStyle(container).maxWidth : 'not found',
        containerPadding: container ? window.getComputedStyle(container).padding : 'not found'
      };
    });

    console.log(`  Hero title font-size: ${styles.heroFontSize}`);
    console.log(`  Container max-width: ${styles.containerMaxWidth}`);
    console.log(`  Container padding: ${styles.containerPadding}`);
    console.log('');

    await context.close();
  }

  await browser.close();
  console.log('Screenshots saved!');
})();
