const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('===================================================');
console.log(' PREPARING HOSTINGER IMAGES UPLOAD FOLDER & ZIP    ');
console.log('===================================================');

const srcProducts = path.resolve(__dirname, '../public/products');
const outputDir = path.resolve(__dirname, '../../HOSTINGER_IMAGES_TO_UPLOAD');
const targetProducts = path.join(outputDir, 'products');
const zipPath = path.resolve(__dirname, '../../HOSTINGER_PRODUCTS_IMAGES.zip');

console.log('Source Products Directory:', srcProducts);
console.log('Target Upload Folder:', targetProducts);

if (!fs.existsSync(srcProducts)) {
  console.error('❌ Source public/products directory not found!');
  process.exit(1);
}

// 1. Create target folder
if (fs.existsSync(outputDir)) {
  console.log('Cleaning existing target directory...');
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(targetProducts, { recursive: true });

// 2. Copy all files
console.log('\nCopying product images...');
const files = fs.readdirSync(srcProducts);
let count = 0;
let totalSize = 0;

files.forEach(file => {
  const src = path.join(srcProducts, file);
  const dest = path.join(targetProducts, file);
  const stat = fs.statSync(src);
  if (stat.isFile()) {
    fs.copyFileSync(src, dest);
    count++;
    totalSize += stat.size;
  }
});

const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
console.log(`✓ Copied ${count} images (${sizeInMB} MB) into HOSTINGER_IMAGES_TO_UPLOAD/products/`);

// 3. Create zip file using PowerShell Compress-Archive for easy Hostinger hPanel upload
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log('\nCreating HOSTINGER_PRODUCTS_IMAGES.zip for 1-click Hostinger upload...');
try {
  const psCmd = `powershell -Command "Compress-Archive -Path '${targetProducts}' -DestinationPath '${zipPath}' -Force"`;
  execSync(psCmd, { stdio: 'inherit' });
  console.log(`\n===================================================`);
  console.log(` SUCCESS! Files prepared successfully:`);
  console.log(` 📁 Folder: HOSTINGER_IMAGES_TO_UPLOAD\\products (${count} images)`);
  console.log(` 📦 Zip:    HOSTINGER_PRODUCTS_IMAGES.zip`);
  console.log(`===================================================`);
} catch (err) {
  console.log(`\n✓ Folder ready at HOSTINGER_IMAGES_TO_UPLOAD\\products (Zip compression skipped or failed: ${err.message})`);
}
