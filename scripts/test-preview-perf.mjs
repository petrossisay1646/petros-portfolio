import { preview } from 'vite';
import { chromium } from 'playwright';

async function testPerf() {
  console.log('Starting local production preview server...');
  const server = await preview({ preview: { port: 4173 } });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const start = performance.now();
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  const duration = performance.now() - start;

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint');
    const fp = paint.find(p => p.name === 'first-paint');

    return {
      DOMContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      CompleteLoad: Math.round(nav.loadEventEnd),
      FirstPaint: fp ? Math.round(fp.startTime) : null,
      FirstContentfulPaint: fcp ? Math.round(fcp.startTime) : null,
      ResourceCount: performance.getEntriesByType('resource').length,
    };
  });

  console.log('--- Production Performance Results ---');
  console.table(metrics);
  console.log(`Total Load + Network Idle Duration: ${Math.round(duration)}ms`);

  await browser.close();
  server.httpServer.close();
}

testPerf();
