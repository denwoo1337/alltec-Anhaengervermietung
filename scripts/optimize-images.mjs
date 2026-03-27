import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const PROJECT_ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

async function convertToWebP(inputPath, outputPath) {
  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
  console.log(`✓ ${inputPath.split(/[\\/]/).slice(-2).join('/')}`);
}

// 1. Gallery images in public/galerie/
const galerieDir = join(PROJECT_ROOT, 'public', 'galerie');
const galerieFiles = await readdir(galerieDir);
for (const file of galerieFiles) {
  if (extname(file).toLowerCase() === '.jpg') {
    const input = join(galerieDir, file);
    const output = join(galerieDir, basename(file, extname(file)) + '.webp');
    await convertToWebP(input, output);
  }
}

// 2. Brand asset images in brand_assets/ (project root)
const brandDir = join(PROJECT_ROOT, 'brand_assets');
const brandFiles = [
  'Ford_mit_Anhänger.jpg',
  'Autoanhänger_mit_G-Klasse.jpg',
  '3000kg_Autoanhänger.jpg',
  '750kg_Planenanhänger.jpg',
  '750kg_Motorrad.jpg',
];
for (const file of brandFiles) {
  const input = join(brandDir, file);
  const output = join(brandDir, basename(file, extname(file)) + '.webp');
  await convertToWebP(input, output);
}

console.log('\nDone! WebP files created alongside originals.');
