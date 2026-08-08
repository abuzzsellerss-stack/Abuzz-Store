const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const publicDir = path.join(__dirname, '..', 'public', 'products');

const seedContent = fs.readFileSync(seedPath, 'utf8');

// Get all files in public/products
const publicFiles = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];

// Group files by SKU prefix
const skuImagesMap = {};
for (const file of publicFiles) {
  const match = file.match(/^([A-Za-z0-9\-\_\.]+)_img(\d+)/i) || file.match(/^([A-Za-z0-9\-\_\.]+)\./i);
  if (match) {
    const sku = match[1].toUpperCase();
    if (!skuImagesMap[sku]) skuImagesMap[sku] = [];
    skuImagesMap[sku].push(`/products/${file}`);
  }
}

// Sort images for each SKU so _img1 comes first
for (const sku of Object.keys(skuImagesMap)) {
  skuImagesMap[sku].sort((a, b) => {
    const aNum = parseInt((a.match(/img(\d+)/i) || [])[1] || '0', 10);
    const bNum = parseInt((b.match(/img(\d+)/i) || [])[1] || '0', 10);
    return aNum - bNum;
  });
}

// Parse JSON part of seed.ts
const startIdx = seedContent.indexOf('export const MOCK_PRODUCTS: Product[] = [');
const arrayStart = seedContent.indexOf('[', startIdx);
const arrayEnd = seedContent.lastIndexOf('];');

const header = seedContent.substring(0, arrayStart);
const jsonText = seedContent.substring(arrayStart, arrayEnd + 1);
const footer = seedContent.substring(arrayEnd + 1);

let products = JSON.parse(jsonText);
let updatedCount = 0;

for (const p of products) {
  const skuUpper = p.id.toUpperCase();
  const availableImages = skuImagesMap[skuUpper];

  if (availableImages && availableImages.length > 0) {
    p.imageUrl = availableImages[0];
    p.galleryImages = availableImages;
    updatedCount++;
  }
}

const updatedSeedContent = header + JSON.stringify(products, null, 2) + footer;
fs.writeFileSync(seedPath, updatedSeedContent, 'utf8');

console.log(`Successfully saved and synced master seed catalog for ${updatedCount} products into seed.ts!`);
