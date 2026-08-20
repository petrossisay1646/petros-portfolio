import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targets = [
  {
    url: 'https://ace-meklit.netlify.app/',
    filename: 'ace-meklit.png',
  },
  {
    url: 'https://melodic-hummingbird-fdca26.netlify.app/',
    filename: 'apple-website.png',
  },
  {
    url: 'https://frolicking-entremet-b5f6f4.netlify.app/',
    filename: 'puppy-lovers.png',
  },
  {
    url: 'https://beamish-pavlova-feadd8.netlify.app/',
    filename: 'portfolio-v1.png',
  },
  {
    url: 'https://petros-portfolio-one.vercel.app/',
    filename: 'portfolio-v2.png',
  }
];

const outDir = path.resolve(__dirname, '../public/projects');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  for (const item of targets) {
    const page = await context.newPage();
    console.log(`Navigating to ${item.url}...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle', timeout: 30000 });
      // wait a bit for any animations
      await page.waitForTimeout(2000);
      const dest = path.join(outDir, item.filename);
      await page.screenshot({ path: dest });
      console.log(`Saved: ${dest}`);
    } catch (err) {
      console.error(`Failed capturing ${item.url}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Finished capturing all screenshots!');
}

run();
