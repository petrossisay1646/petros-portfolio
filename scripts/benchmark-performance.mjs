import { chromium } from 'playwright';

async function benchmark(url) {
  console.log(`Benchmarking: ${url}`);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const timingEvents = [];
  page.on('request', req => {
    timingEvents.push({ type: 'req', url: req.url(), time: Date.now() });
  });

  const start = performance.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  const loadDuration = performance.now() - start;

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint');
    const fp = paint.find(p => p.name === 'first-paint');

    return {
      DNS: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
      TCP: Math.round(nav.connectEnd - nav.connectStart),
      TTFB: Math.round(nav.responseStart - nav.requestStart),
      ResponseDuration: Math.round(nav.responseEnd - nav.responseStart),
      DOMInteractive: Math.round(nav.domInteractive),
      DOMContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      CompleteLoad: Math.round(nav.loadEventEnd),
      FirstPaint: fp ? Math.round(fp.startTime) : null,
      FirstContentfulPaint: fcp ? Math.round(fcp.startTime) : null,
      TotalResources: performance.getEntriesByType('resource').length,
    };
  });

  console.log('--- Performance Metrics ---');
  console.table(metrics);
  console.log(`Total NetworkIdle Duration: ${Math.round(loadDuration)}ms`);

  await browser.close();
}

benchmark('https://petros-portfolio-one.vercel.app');
