// Lossless PNG recompression for public/assets (dev-only, sharp).
// Usage: npm run optimize-images
import { renameSync, statSync, unlinkSync } from 'node:fs';
import sharp from 'sharp';

const FILES = ['dash-empty.png', 'dash-wave.png'];
let saved = 0;

for (const file of FILES) {
  const path = `public/assets/${file}`;
  const before = statSync(path).size;
  const tmp = `public/assets/.tmp-${file}`;
  await sharp(path).png({ compressionLevel: 9, effort: 10 }).toFile(tmp);
  const after = statSync(tmp).size;
  if (after < before) {
    renameSync(tmp, path);
    saved += before - after;
    console.log(`${file}: ${before} -> ${after} bytes (kept)`);
  } else {
    unlinkSync(tmp);
    console.log(`${file}: ${before} bytes unchanged (already optimal)`);
  }
}
console.log(`Total saved: ${saved} bytes`);
