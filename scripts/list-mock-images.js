const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const seedContent = fs.readFileSync(seedPath, 'utf8');

const productsLines = seedContent.split('\n');

const mockImageProducts = [];
const localImageProducts = [];

let currentId = '';
let currentTitle = '';
let currentCategory = '';

for (const line of productsLines) {
  const idMatch = line.match(/"id":\s*"([^"]+)"/);
  if (idMatch) currentId = idMatch[1];

  const titleMatch = line.match(/"title":\s*"([^"]+)"/);
  if (titleMatch) currentTitle = titleMatch[1];

  const catMatch = line.match(/"category":\s*"([^"]+)"/);
  if (catMatch) currentCategory = catMatch[1];

  const imgMatch = line.match(/"imageUrl":\s*"([^"]+)"/);
  if (imgMatch) {
    const url = imgMatch[1];
    if (url.startsWith('http') || url.includes('unsplash') || url.includes('placeholder')) {
      mockImageProducts.push({ id: currentId, title: currentTitle, category: currentCategory, imageUrl: url });
    } else {
      localImageProducts.push({ id: currentId, title: currentTitle, category: currentCategory, imageUrl: url });
    }
  }
}

console.log('=== SUMMARY ===');
console.log(`Total Products: ${mockImageProducts.length + localImageProducts.length}`);
console.log(`Products with Real Local Images (/products/...): ${localImageProducts.length}`);
console.log(`Products with Unsplash Fallback Mock Images: ${mockImageProducts.length}`);

fs.writeFileSync(
  path.join(__dirname, 'mock_image_products.json'),
  JSON.stringify(mockImageProducts, null, 2),
  'utf8'
);
