import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.resolve(__dirname, '../public/projects');

async function optimize() {
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.png'));
  console.log(`Optimizing ${files.length} images...`);

  for (const file of files) {
    const inputPath = path.join(projectsDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(projectsDir, `${baseName}.webp`);

    const beforeStats = fs.statSync(inputPath);
    await sharp(inputPath)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const afterStats = fs.statSync(outputPath);
    const savings = ((1 - afterStats.size / beforeStats.size) * 100).toFixed(1);
    console.log(`✓ ${file} (${(beforeStats.size / 1024).toFixed(0)}KB) → ${baseName}.webp (${(afterStats.size / 1024).toFixed(0)}KB) [${savings}% smaller]`);
  }

  // Also optimize profile.jpg
  const profilePath = path.resolve(__dirname, '../public/profile.jpg');
  if (fs.existsSync(profilePath)) {
    const profileWebp = path.resolve(__dirname, '../public/profile.webp');
    await sharp(profilePath)
      .resize({ width: 400, height: 400, fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(profileWebp);
    console.log('✓ Optimized profile photo');
  }

  console.log('All images optimized successfully!');
}

optimize();
