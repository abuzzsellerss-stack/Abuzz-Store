const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const publicDir = path.join(__dirname, '..', 'public', 'products');
const artifactPath = 'C:\\Users\\manis\\.gemini\\antigravity-ide\\brain\\0ac075c6-4b2d-469c-afed-66f59317154a\\catalog_image_report.md';

const seedContent = fs.readFileSync(seedPath, 'utf8');
const lines = seedContent.split('\n');

const mockList = [];
const realList = [];

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
      mockList.push({ id: curId, title: curTitle, category: curCategory, imageUrl: imgUrl });
    } else {
      realList.push({ id: curId, title: curTitle, category: curCategory, imageUrl: imgUrl });
    }

    curId = '';
    curTitle = '';
    curCategory = '';
  }
}

let md = `# Product Catalog Image Audit Report\n\n`;
md += `**Total Catalog Products**: ${mockList.length + realList.length}\n`;
md += `**Products with Verified Real Photos**: ${realList.length}\n`;
md += `**Products with Fallback/Mock Images**: ${mockList.length}\n\n`;

md += `## Products Updated with Mock / Fallback Images (${mockList.length})\n\n`;
md += `| # | SKU / Product ID | Product Title | Category | Current Image URL |\n`;
md += `|---|---|---|---|---|\n`;

if (mockList.length === 0) {
  md += `| - | None | All products have real catalog images! | - | - |\n`;
} else {
  mockList.forEach((item, idx) => {
    md += `| ${idx + 1} | \`${item.id}\` | ${item.title} | ${item.category} | \`${item.imageUrl}\` |\n`;
  });
}

md += `\n## Sample Verified Real Photo Products (${Math.min(10, realList.length)})\n\n`;
md += `| SKU | Product Title | Local Image Path |\n`;
md += `|---|---|---|\n`;
realList.slice(0, 10).forEach(item => {
  md += `| \`${item.id}\` | ${item.title} | \`${item.imageUrl}\` |\n`;
});

fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
fs.writeFileSync(artifactPath, md, 'utf8');

console.log('Markdown report generated successfully!');
