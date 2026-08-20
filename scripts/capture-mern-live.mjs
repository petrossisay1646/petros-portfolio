import { chromium } from 'playwright';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureMern() {
  console.log('Capturing live screenshot of https://mern-todo-pro.vercel.app ...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  try {
    await page.goto('https://mern-todo-pro.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    const pngPath = path.resolve(__dirname, '../public/projects/mern-todo-pro.png');
    const webpPath = path.resolve(__dirname, '../public/projects/mern-todo-pro.webp');

    await page.screenshot({ path: pngPath });
    console.log(`Saved PNG to: ${pngPath}`);

    await sharp(pngPath)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(webpPath);
    console.log(`Saved optimized WebP to: ${webpPath}`);
  } catch (err) {
    console.error('Failed capturing live site, fallback remains:', err.message);
  } finally {
    await browser.close();
  }
}

captureMern();
