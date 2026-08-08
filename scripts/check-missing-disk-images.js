const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const publicDir = path.join(__dirname, '..', 'public', 'products');
const seedContent = fs.readFileSync(seedPath, 'utf8');

const lines = seedContent.split('\n');

const missingImageProducts = [];
const validImageProducts = [];

let curId = '';
let curTitle = '';
let curCategory = '';

for (const line of lines) {
  const idM = line.match(/"id":\s*"([^"]+)"/);
  if (idM) curId = idM[1];

  const titleM = line.match(/"title":\s*"([^"]+)"/);
  if (titleM) curTitle = titleM[1];

  const catM = line.match(/"category":\s*"([^"]+)"/);
  if (catM) curCategory = catM[1];

  const imgM = line.match(/"imageUrl":\s*"([^"]+)"/);
  if (imgM) {
    const imgUrl = imgM[1];
    const fileName = path.basename(imgUrl);
    const diskPath = path.join(publicDir, fileName);

    const exists = fs.existsSync(diskPath);

    if (!exists || imgUrl.startsWith('http') || imgUrl.includes('unsplash')) {
      missingImageProducts.push({
        id: curId,
        title: curTitle,
        category: curCategory,
        imageUrl: imgUrl
      });
    } else {
      validImageProducts.push({
        id: curId,
        title: curTitle,
        category: curCategory,
        imageUrl: imgUrl
      });
    }

    curId = '';
    curTitle = '';
    curCategory = '';
  }
}

const output = {
  totalCatalogProducts: missingImageProducts.length + validImageProducts.length,
  productsWithValidLocalImages: validImageProducts.length,
  productsWithMissingOrMockImages: missingImageProducts.length,
  missingOrMockList: missingImageProducts
};

fs.writeFileSync(
  path.join(__dirname, 'missing_images_report.json'),
  JSON.stringify(output, null, 2),
  'utf8'
);

console.log(`TOTAL: ${output.totalCatalogProducts} | VALID DISK PHOTOS: ${output.productsWithValidLocalImages} | MISSING/MOCK PHOTOS: ${output.productsWithMissingOrMockImages}`);
