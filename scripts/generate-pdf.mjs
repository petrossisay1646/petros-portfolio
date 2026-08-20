import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('Generating CV PDF from cv.html...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const cvPath = 'file:///' + path.resolve(__dirname, '../public/cv.html').replace(/\\/g, '/');
  await page.goto(cvPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const pdfPath = path.resolve(__dirname, '../public/cv.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  console.log(`Saved CV PDF to: ${pdfPath}`);
  await browser.close();
}

generatePDF();
