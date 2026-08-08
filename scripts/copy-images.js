const fs = require('fs');
const path = require('path');

const downloadFolder = 'C:\\Users\\manis\\Downloads\\Laxmi Sales\\Product\\New folder';
const tempDir = path.join(__dirname, '..', 'temp_products');
const destDir = path.join(__dirname, '..', 'public', 'products');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. If Laxmi Sales download folder exists, import all images
if (fs.existsSync(downloadFolder)) {
  function importFolder(dirPath) {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          importFolder(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
            try {
              fs.copyFileSync(fullPath, path.join(tempDir, entry.name));
              fs.copyFileSync(fullPath, path.join(destDir, entry.name));
            } catch (e) {}
          }
        }
      }
    } catch (e) {}
  }
  importFolder(downloadFolder);
}

// 2. Sync temp_products to public/products
console.log('Copying product images from temp_products to public/products...');
const files = fs.readdirSync(tempDir);
let count = 0;

for (const file of files) {
  const srcFile = path.join(tempDir, file);
  const destFile = path.join(destDir, file);

  if (fs.statSync(srcFile).isFile()) {
    fs.copyFileSync(srcFile, destFile);
    count++;
  }
}

console.log(`Successfully synced ${count} product images into public/products!`);
