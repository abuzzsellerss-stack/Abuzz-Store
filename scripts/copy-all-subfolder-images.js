const fs = require('fs');
const path = require('path');

const srcFolder = 'C:\\Users\\manis\\Downloads\\Laxmi Sales\\Product\\New folder';
const destPublic = path.join(__dirname, '..', 'public', 'products');
const destTemp = path.join(__dirname, '..', 'temp_products');
const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');

if (!fs.existsSync(destPublic)) fs.mkdirSync(destPublic, { recursive: true });
if (!fs.existsSync(destTemp)) fs.mkdirSync(destTemp, { recursive: true });

if (!fs.existsSync(srcFolder)) {
  console.log(`Source folder ${srcFolder} not found. Skipping image copy step.`);
  process.exit(0);
}

const subfolders = fs.readdirSync(srcFolder, { withFileTypes: true });

// Map SKU -> Array of local public image paths
const skuImageMap = {};

function scanSubfolder(folderPath, sku) {
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      scanSubfolder(fullPath, sku);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
        if (!skuImageMap[sku]) skuImageMap[sku] = [];
        const index = skuImageMap[sku].length + 1;
        const newFileName = `${sku}_img${index}${ext}`;

        try {
          fs.copyFileSync(fullPath, path.join(destPublic, newFileName));
          fs.copyFileSync(fullPath, path.join(destTemp, newFileName));
          skuImageMap[sku].push(`/products/${newFileName}`);
        } catch (e) {
          console.error(`Error copying image for ${sku}:`, e.message);
        }
      }
    }
  }
}

for (const sub of subfolders) {
  if (sub.isDirectory()) {
    const name = sub.name;
    // Extract SKU code e.g. "AZ-TH-12", "AZ-TH-3.5", "AZ-FS", "ABBPS10"
    const match = name.match(/^([A-Za-z0-9\-\_\.\(\)]+)/);
    if (match) {
      const sku = match[1].trim();
      const folderPath = path.join(srcFolder, name);
      scanSubfolder(folderPath, sku);
    }
  }
}

console.log(`Copied images for ${Object.keys(skuImageMap).length} SKUs.`);

// Update seed.ts cleanly with exact matching images
const seedContent = fs.readFileSync(seedPath, 'utf8');
const startIdx = seedContent.indexOf('export const MOCK_PRODUCTS: Product[] = [');
const arrayStart = seedContent.indexOf('[', startIdx);
const arrayEnd = seedContent.lastIndexOf('];');

const header = seedContent.substring(0, arrayStart);
const jsonText = seedContent.substring(arrayStart, arrayEnd + 1);
const footer = seedContent.substring(arrayEnd + 1);

let products = JSON.parse(jsonText);
let updatedCount = 0;

for (const p of products) {
  const images = skuImageMap[p.id] || skuImageMap[p.specifications?.['SKU Code']];
  if (images && images.length > 0) {
    p.imageUrl = images[0];
    p.galleryImages = images;
    updatedCount++;
  }
}

const updatedSeedContent = header + JSON.stringify(products, null, 2) + footer;
fs.writeFileSync(seedPath, updatedSeedContent, 'utf8');

console.log(`Successfully updated seed.ts for ${updatedCount} products!`);
