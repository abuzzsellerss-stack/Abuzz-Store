const fs = require('fs');
const path = require('path');

const srcHtaccess = path.resolve(__dirname, '../public/.htaccess');
const outHtaccess = path.resolve(__dirname, '../out/.htaccess');

if (fs.existsSync(srcHtaccess) && fs.existsSync(path.resolve(__dirname, '../out'))) {
  fs.copyFileSync(srcHtaccess, outHtaccess);
  console.log('  ✓ Successfully copied .htaccess into out/ folder for Hostinger');
}
