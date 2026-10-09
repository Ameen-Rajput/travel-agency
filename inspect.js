import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://localhost:5173/...');
    await page.goto('http://localhost:5173/');
    
    // Wait for header to be visible
    await page.waitForSelector('header', { timeout: 5000 });
    
    const headerHtml = await page.$eval('header', el => el.outerHTML);
    console.log('--- HEADER HTML ---');
    console.log(headerHtml);
    
    const btnStyles = await page.$eval('header .btn-primary', el => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        width: style.width,
        height: style.height,
        flex: style.flex,
        flexGrow: style.flexGrow,
        flexShrink: style.flexShrink,
        flexBasis: style.flexBasis,
        position: style.position,
        padding: style.padding,
        margin: style.margin,
        boxSizing: style.boxSizing
      };
    });
    
    const btnBox = await page.$eval('header .btn-primary', el => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height, left: rect.left, top: rect.top };
    });
    
    console.log('--- BTN STYLES ---');
    console.log(JSON.stringify(btnStyles, null, 2));
    console.log('--- BTN BOUNDING BOX ---');
    console.log(JSON.stringify(btnBox, null, 2));

    const headerContentStyles = await page.$eval('.header-content', el => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        justifyContent: style.justifyContent,
        alignItems: style.alignItems,
        flexDirection: style.flexDirection,
        gap: style.gap,
        width: style.width
      };
    });
    console.log('--- HEADER-CONTENT STYLES ---');
    console.log(JSON.stringify(headerContentStyles, null, 2));

  } catch (error) {
    console.error('Error during inspection:', error);
  } finally {
    await browser.close();
  }
}

run();
