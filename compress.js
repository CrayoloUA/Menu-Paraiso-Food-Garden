const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const NEGOCIOS_DIR = path.join(__dirname, 'assets', 'negocios');
const MAX_SIZE_KB = 300;
const MAX_WIDTH = 1000;
const QUALITY = 75;

async function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
      continue;
    }
    if (!/\.(jpg|jpeg|png)$/i.test(entry.name)) continue;

    const stats = fs.statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);

    if (sizeKB <= MAX_SIZE_KB) {
      console.log(`  OK     ${path.relative(NEGOCIOS_DIR, fullPath)} (${sizeKB} KB)`);
      continue;
    }

    const isPng = /\.png$/i.test(entry.name);
    const tmpPath = fullPath + '.tmp';
    const pipeline = sharp(fullPath).resize({ width: MAX_WIDTH, withoutEnlargement: true });
    await (isPng ? pipeline.png({ compressionLevel: 9 }) : pipeline.jpeg({ quality: QUALITY })).toFile(tmpPath);

    fs.renameSync(tmpPath, fullPath);
    const after = Math.round(fs.statSync(fullPath).size / 1024);
    console.log(`  FIXED  ${path.relative(NEGOCIOS_DIR, fullPath)}: ${sizeKB} KB → ${after} KB (−${sizeKB - after} KB)`);
  }
}

console.log('Comprimiendo imágenes de menú...\n');
processDir(NEGOCIOS_DIR)
  .then(() => console.log('\nListo.'))
  .catch(err => { console.error(err); process.exit(1); });
