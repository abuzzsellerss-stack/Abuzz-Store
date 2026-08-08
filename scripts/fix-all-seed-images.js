const fs = require('fs');
const path = require('path');

const laxmiFolder = 'C:\\Users\\manis\\Downloads\\Laxmi Sales\\Product\\New folder';
const publicProductsDir = path.join(__dirname, '..', 'public', 'products');
const tempProductsDir = path.join(__dirname, '..', 'temp_products');
const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');

if (!fs.existsSync(publicProductsDir)) {
  fs.mkdirSync(publicProductsDir, { recursive: true });
}
if (!fs.existsSync(tempProductsDir)) {
  fs.mkdirSync(tempProductsDir, { recursive: true });
}

console.log('1. Processing Laxmi Sales download subfolders...');
const subfolders = fs.readdirSync(laxmiFolder, { withFileTypes: true });

// Map SKU prefix -> Array of image paths
const skuImageMap = {};

for (const sub of subfolders) {
  if (sub.isDirectory()) {
    const folderName = sub.name;
    // Extract SKU code e.g. "AZ-FS", "ABBPS10", "AZ-KCG-10P"
    const match = folderName.match(/^([A-Za-z0-9\-\_\(\)\.]+)/);
    if (match) {
      const sku = match[1].trim();
      const folderPath = path.join(laxmiFolder, folderName);
      const files = fs.readdirSync(folderPath);

      const images = files.filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext);
      });

      if (!skuImageMap[sku]) skuImageMap[sku] = [];

      for (let i = 0; i < images.length; i++) {
        const imgName = images[i];
        const srcFile = path.join(folderPath, imgName);
        const newFileName = `${sku}_img${i + 1}${path.extname(imgName).toLowerCase()}`;
        const mainFileName = i === 0 ? `${sku}_main${path.extname(imgName).toLowerCase()}` : null;

        try {
          fs.copyFileSync(srcFile, path.join(tempProductsDir, newFileName));
          fs.copyFileSync(srcFile, path.join(publicProductsDir, newFileName));
          skuImageMap[sku].push(`/products/${newFileName}`);

          if (mainFileName) {
            fs.copyFileSync(srcFile, path.join(tempProductsDir, mainFileName));
            fs.copyFileSync(srcFile, path.join(publicProductsDir, mainFileName));
            skuImageMap[sku].unshift(`/products/${mainFileName}`);
          }
        } catch (e) {
          console.error(`Failed to copy ${imgName}:`, e.message);
        }
      }
    }
  }
}

console.log(`Mapped image files for ${Object.keys(skuImageMap).length} SKUs.`);

console.log('2. Updating src/utils/seed.ts line by line...');
let seedLines = fs.readFileSync(seedPath, 'utf8').split('\n');
let currentProduct = null;
let updatedProductsCount = 0;

for (let i = 0; i < seedLines.length; i++) {
  const line = seedLines[i];

  // Track product ID
  const idMatch = line.match(/"id":\s*"([^"]+)"/);
  if (idMatch) {
    currentProduct = idMatch[1];
  }

  // If line contains imageUrl
  if (currentProduct && line.includes('"imageUrl":')) {
    const images = skuImageMap[currentProduct];
    if (images && images.length > 0) {
      const bestImage = images[0];
      seedLines[i] = line.replace(/"imageUrl":\s*"[^"]+"/, `"imageUrl": "${bestImage}"`);
      updatedProductsCount++;
    }
  }

  // If line contains galleryImages
  if (currentProduct && line.includes('"galleryImages":')) {
    const images = skuImageMap[currentProduct];
    if (images && images.length > 0) {
      // Find end of galleryImages array
      let j = i + 1;
      while (j < seedLines.length && !seedLines[j].includes(']')) {
        j++;
      }
      const galleryFormatted = images.map(img => `      "${img}"`).join(',\n');
      seedLines.splice(i + 1, j - i - 1, galleryFormatted);
    }
  }
}

fs.writeFileSync(seedPath, seedLines.join('\n'), 'utf8');
console.log(`Successfully updated real photo URLs for ${updatedProductsCount} products in seed.ts!`);
