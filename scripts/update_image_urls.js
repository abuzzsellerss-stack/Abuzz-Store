/**
 * update_image_urls.js
 * Replaces all local /products/ image paths with the Hostinger CDN URL.
 * Run: node scripts/update_image_urls.js
 */

const fs = require('fs');
const path = require('path');

const CDN_BASE = 'https://abuzz.store/images/products';
const OLD_PATTERN = /\/products\//g;
const NEW_PATTERN = CDN_BASE + '/';

// Files to update
const FILES_TO_UPDATE = [
  path.resolve(__dirname, '../src/utils/seed.ts'),
  path.resolve(__dirname, '../src/utils/adminMockData.ts'),
];

let totalReplacements = 0;

FILES_TO_UPDATE.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ Skipping (not found): ${filePath}`);
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  const updated = original.replace(OLD_PATTERN, NEW_PATTERN);

  const count = (original.match(OLD_PATTERN) || []).length;
  if (count === 0) {
    console.log(`✓ No changes needed: ${path.basename(filePath)}`);
    return;
  }

  fs.writeFileSync(filePath, updated, 'utf8');
  totalReplacements += count;
  console.log(`✅ Updated ${count} image URLs in: ${path.basename(filePath)}`);
});

console.log(`\n🎉 Done! Total replacements: ${totalReplacements}`);
console.log(`\nAll images now point to: ${CDN_BASE}/`);
console.log(`\nNext step: Upload your public/products/ folder to Hostinger at:`);
console.log(`  public_html/images/products/`);
