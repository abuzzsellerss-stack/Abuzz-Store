const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '..', 'public', 'products');
const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');

if (!fs.existsSync(productsDir)) {
  console.error('public/products directory does not exist!');
  process.exit(1);
}

const allImageFiles = fs.readdirSync(productsDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext);
});

console.log(`Found ${allImageFiles.length} image files in public/products.`);

let seedContent = fs.readFileSync(seedPath, 'utf8');

// Match products array in seed.ts
const productsMatch = seedContent.match(/export const MOCK_PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
if (!productsMatch) {
  console.error('Could not find MOCK_PRODUCTS array in seed.ts!');
  process.exit(1);
}

let products;
try {
  products = JSON.parse(productsMatch[1]);
} catch (e) {
  console.error('Failed to parse MOCK_PRODUCTS JSON:', e.message);
  process.exit(1);
}

let updatedCount = 0;

for (const prod of products) {
  const id = prod.id;
  const sku = prod.specifications?.['SKU Code'] || id;

  // Search for matching images for this product ID / SKU
  // Patterns: ${id}_main.jpg, ${id}_1.jpg, ${id}_img1.jpg, ${id}.jpg, or filenames starting with ${id} or ${sku}
  const matchingFiles = allImageFiles.filter(file => {
    const nameUpper = file.toUpperCase();
    const idUpper = id.toUpperCase();
    const skuUpper = sku.toUpperCase();
    return nameUpper.startsWith(idUpper) || nameUpper.startsWith(skuUpper) || nameUpper.includes(idUpper);
  });

  if (matchingFiles.length > 0) {
    // Sort to prioritize _main or _img1 or _1
    matchingFiles.sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      if (aLower.includes('main') || aLower.includes('img1') || aLower.includes('_1.')) return -1;
      if (bLower.includes('main') || bLower.includes('img1') || bLower.includes('_1.')) return 1;
      return a.localeCompare(b);
    });

    const mainImage = `/products/${matchingFiles[0]}`;
    const gallery = matchingFiles.slice(0, 8).map(f => `/products/${f}`);

    if (prod.imageUrl !== mainImage) {
      prod.imageUrl = mainImage;
      prod.galleryImages = gallery;
      updatedCount++;
    }
  }
}

console.log(`Updated images for ${updatedCount} products in MOCK_PRODUCTS.`);

const newArrayJson = JSON.stringify(products, null, 2);
const newSeedContent = seedContent.replace(
  /export const MOCK_PRODUCTS: Product\[\] = \[[\s\S]*?\];/,
  `export const MOCK_PRODUCTS: Product[] = ${newArrayJson};`
);

fs.writeFileSync(seedPath, newSeedContent, 'utf8');
console.log('Successfully updated seed.ts with real product image URLs!');
