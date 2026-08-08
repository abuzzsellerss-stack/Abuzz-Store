const fs = require('fs');
const path = require('path');

const srcBase = 'C:\\Users\\manis\\Downloads\\Laxmi Sales\\Product\\New folder';
const targetTemp = path.join(__dirname, '..', 'temp_products');
const targetPublic = path.join(__dirname, '..', 'public', 'products');

if (!fs.existsSync(srcBase)) {
  console.error(`Source path ${srcBase} does not exist!`);
  process.exit(1);
}

if (!fs.existsSync(targetTemp)) {
  fs.mkdirSync(targetTemp, { recursive: true });
}

if (!fs.existsSync(targetPublic)) {
  fs.mkdirSync(targetPublic, { recursive: true });
}

let totalCopied = 0;

function processDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
        // Copy to temp_products and public/products
        const tempDest = path.join(targetTemp, entry.name);
        const publicDest = path.join(targetPublic, entry.name);

        try {
          fs.copyFileSync(fullPath, tempDest);
          fs.copyFileSync(fullPath, publicDest);
          totalCopied++;
        } catch (e) {
          console.error(`Error copying ${entry.name}:`, e.message);
        }

        // Also if folder name contains a product SKU prefix (e.g., ABBPS10), create standardized filenames
        const parentFolder = path.basename(dirPath);
        const skuMatch = parentFolder.match(/^([A-Za-z0-9\-\.]+)/);
        if (skuMatch) {
          const skuCode = skuMatch[1];
          const stdName = `${skuCode}_${entry.name}`;
          try {
            fs.copyFileSync(fullPath, path.join(targetTemp, stdName));
            fs.copyFileSync(fullPath, path.join(targetPublic, stdName));
          } catch (e) {
            // Ignore
          }
        }
      }
    }
  }
}

console.log(`Starting image import from: ${srcBase}`);
processDir(srcBase);
console.log(`Successfully imported ${totalCopied} product images into temp_products and public/products!`);
