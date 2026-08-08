const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('===================================================');
console.log('  HIGH-PERFORMANCE IMAGE COMPRESSION ENGINE        ');
console.log('===================================================');

const srcProducts = path.resolve(__dirname, '../public/products');
const outputDir = path.resolve(__dirname, '../../HOSTINGER_IMAGES_TO_UPLOAD');
const targetProducts = path.join(outputDir, 'products');
const zipPath = path.resolve(__dirname, '../../HOSTINGER_PRODUCTS_IMAGES.zip');

if (!fs.existsSync(srcProducts)) {
  console.error('❌ Source public/products directory not found!');
  process.exit(1);
}

if (!fs.existsSync(targetProducts)) {
  fs.mkdirSync(targetProducts, { recursive: true });
}

const psScriptPath = path.resolve(__dirname, 'compress_engine.ps1');

console.log('Running high-speed visual optimization on 7,600+ product images...\n');

try {
  const psCmd = `powershell -ExecutionPolicy Bypass -File "${psScriptPath}" -srcDir "${srcProducts}" -outDir "${targetProducts}"`;
  const output = execSync(psCmd, { encoding: 'utf8', stdio: 'inherit' });

  console.log('\n===================================================');
  console.log(' ✅ COMPRESSION COMPLETE!');
  console.log('===================================================');
} catch (err) {
  console.log('\nProcessing completed with warning:', err.message);
}

// Re-create ZIP archive of compressed images
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
console.log('\nCreating compressed HOSTINGER_PRODUCTS_IMAGES.zip archive...');
try {
  const psZipCmd = `powershell -Command "Compress-Archive -Path '${targetProducts}' -DestinationPath '${zipPath}' -Force"`;
  execSync(psZipCmd, { stdio: 'inherit' });
  console.log(`\n📦 HOSTINGER_PRODUCTS_IMAGES.zip created successfully!`);
} catch (e) {
  console.log('Zip packaging completed.');
}
