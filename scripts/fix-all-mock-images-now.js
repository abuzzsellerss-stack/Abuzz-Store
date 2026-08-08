const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const publicDir = path.join(__dirname, '..', 'public', 'products');

const seedContent = fs.readFileSync(seedPath, 'utf8');

// Get all files in public/products
const publicFiles = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];

// Extract JSON part of MOCK_PRODUCTS
const startIdx = seedContent.indexOf('export const MOCK_PRODUCTS: Product[] = [');
const arrayStart = seedContent.indexOf('[', startIdx);
const arrayEnd = seedContent.lastIndexOf('];');

const header = seedContent.substring(0, arrayStart);
const jsonText = seedContent.substring(arrayStart, arrayEnd + 1);
const footer = seedContent.substring(arrayEnd + 1);

let products = JSON.parse(jsonText);

const mockImageProductsList = [];
let totalUpdated = 0;

// Helper to find matching files for a given SKU
function findImagesForSku(sku) {
  const cleanSku = sku.toUpperCase().trim();
  const matches = publicFiles.filter(f => {
    const nameUpper = f.toUpperCase();
    return nameUpper.startsWith(cleanSku + '_') || nameUpper.startsWith(cleanSku + '.') || nameUpper.includes(cleanSku);
  });

  matches.sort((a, b) => {
    const aL = a.toLowerCase();
    const bL = b.toLowerCase();
    if (aL.includes('main') || aL.includes('img1')) return -1;
    if (bL.includes('main') || bL.includes('img1')) return 1;
    return a.localeCompare(b);
  });

  return matches.map(f => `/products/${f}`);
}

// Global category fallbacks from available real photos in public/products
const categoryFallbackMap = {};
for (const file of publicFiles) {
  const sku = file.split('_')[0];
  if (sku && !categoryFallbackMap[sku]) {
    categoryFallbackMap[sku] = `/products/${file}`;
  }
}

for (const prod of products) {
  const isMock = !prod.imageUrl || prod.imageUrl.includes('unsplash') || prod.imageUrl.startsWith('http');
  const sku = prod.id;

  const foundImages = findImagesForSku(sku);

  if (foundImages.length > 0) {
    prod.imageUrl = foundImages[0];
    prod.galleryImages = foundImages.slice(0, 6);
    totalUpdated++;
  } else if (isMock) {
    // Record product that was using mock image
    mockImageProductsList.push({
      id: prod.id,
      title: prod.title,
      category: prod.category,
      oldUrl: prod.imageUrl
    });

    // Try fallback by category keyword matching
    const skuPrefix = sku.split('-')[0];
    const categoryMatch = publicFiles.find(f => f.toUpperCase().startsWith(skuPrefix));
    if (categoryMatch) {
      prod.imageUrl = `/products/${categoryMatch}`;
      prod.galleryImages = [`/products/${categoryMatch}`];
    }
  }
}

// Write back updated seed.ts
const updatedSeedContent = header + JSON.stringify(products, null, 2) + footer;
fs.writeFileSync(seedPath, updatedSeedContent, 'utf8');

console.log(`Successfully updated ${totalUpdated} products in seed.ts!`);
console.log(`Found ${mockImageProductsList.length} products that were using mock images.`);

// Create markdown report artifact
const artifactPath = 'C:\\Users\\manis\\.gemini\\antigravity-ide\\brain\\0ac075c6-4b2d-469c-afed-66f59317154a\\mock_products_list.md';
let md = `# List of Catalog Products Updated from Mock Images\n\n`;
md += `**Total Catalog Products**: ${products.length}\n`;
md += `**Products Updated from Stock Mock Images**: ${mockImageProductsList.length}\n\n`;

md += `### Products Using Fallback Mock Images (${mockImageProductsList.length} SKUs)\n\n`;
md += `| # | SKU Code | Product Title | Category |\n`;
md += `|---|---|---|---|\n`;

mockImageProductsList.forEach((p, idx) => {
  md += `| ${idx + 1} | \`${p.id}\` | ${p.title} | ${p.category} |\n`;
});

fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
fs.writeFileSync(artifactPath, md, 'utf8');
console.log('Created artifact report at:', artifactPath);
