const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const content = fs.readFileSync(seedPath, 'utf8');

const lines = content.split('\n');

const mockProducts = [];
const realProducts = [];

let cur = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const idM = line.match(/"id":\s*"([^"]+)"/);
  if (idM) cur.id = idM[1];

  const titleM = line.match(/"title":\s*"([^"]+)"/);
  if (titleM) cur.title = titleM[1];

  const catM = line.match(/"category":\s*"([^"]+)"/);
  if (catM) cur.category = catM[1];

  const imgM = line.match(/"imageUrl":\s*"([^"]+)"/);
  if (imgM) {
    cur.imageUrl = imgM[1];

    if (cur.imageUrl.startsWith('http') || cur.imageUrl.includes('unsplash')) {
      mockProducts.push({ ...cur });
    } else {
      realProducts.push({ ...cur });
    }
    cur = {};
  }
}

const report = {
  totalCount: mockProducts.length + realProducts.length,
  realCount: realProducts.length,
  mockCount: mockProducts.length,
  mockProductsList: mockProducts
};

fs.writeFileSync(
  path.join(__dirname, 'image_report.json'),
  JSON.stringify(report, null, 2),
  'utf8'
);

console.log(`REPORT: Total: ${report.totalCount} | Real Photos: ${report.realCount} | Mock/Unsplash Photos: ${report.mockCount}`);
