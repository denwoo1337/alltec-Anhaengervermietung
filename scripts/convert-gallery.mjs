// scripts/convert-gallery.mjs
// One-time script: converts HEIC images to JPEG and copies all gallery images to public/galerie/
import { readdir, readFile, writeFile, copyFile, mkdir } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import convert from 'heic-convert';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '../Galerie');
const DEST = join(__dirname, '../public/galerie');

function normalizeFilename(filename) {
  // Strip all known image extensions (handles double extensions like .JPG.jpeg)
  let base = filename.replace(/\.(heic|jpg|jpeg)/gi, '');
  base = base.toLowerCase().replace(/ /g, '_');
  return base + '.jpg';
}

async function main() {
  await mkdir(DEST, { recursive: true });
  const files = await readdir(SRC);

  for (const file of files) {
    const srcPath = join(SRC, file);
    const destName = normalizeFilename(file);
    const destPath = join(DEST, destName);
    const ext = extname(file).toLowerCase();

    if (ext === '.heic') {
      console.log(`Converting: ${file} → ${destName}`);
      const inputBuffer = await readFile(srcPath);
      const outputBuffer = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.92 });
      await writeFile(destPath, Buffer.from(outputBuffer));
    } else {
      console.log(`Copying:    ${file} → ${destName}`);
      await copyFile(srcPath, destPath);
    }
  }

  console.log(`\nDone. ${files.length} images → public/galerie/`);
  console.log('\nImage array for Gallery.tsx:');
  const sorted = files.map(normalizeFilename).sort();
  console.log(JSON.stringify(sorted.map(f => `/galerie/${f}`), null, 2));
}

main().catch(console.error);
