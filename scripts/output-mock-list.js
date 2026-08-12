const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const targetMd = path.join(__dirname, '..', 'src', 'utils', 'mock_products_list.md');

const seedContent = fs.readFileSync(seedPath, 'utf8');
const lines = seedContent.split('\n');

const unsplashList = [];
const localList = [];

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
    const url = imgM[1];
    if (url.includes('unsplash') || url.startsWith('http')) {
      unsplashList.push({ id: curId, title: curTitle, category: curCategory });
    } else {
      localList.push({ id: curId, title: curTitle, category: curCategory });
    }
    curId = '';
    curTitle = '';
    curCategory = '';
  }
}

let md = `# Products List Updated with Mock / Stock Fallback Images\n\n`;
md += `**Total Catalog Products**: ${unsplashList.length + localList.length}\n`;
md += `**Products with Real Catalog Photos**: ${localList.length}\n`;
md += `**Products Using Unsplash / Stock Mock Images**: ${unsplashList.length}\n\n`;

md += `### Products Using Mock / Stock Fallback Images (${unsplashList.length} Items)\n\n`;
md += `| # | SKU / Product ID | Product Title | Category |\n`;
md += `|---|---|---|---|\n`;

unsplashList.forEach((p, idx) => {
  md += `| ${idx + 1} | \`${p.id}\` | ${p.title} | ${p.category} |\n`;
});

fs.writeFileSync(targetMd, md, 'utf8');
console.log(`Exported mock list to ${targetMd}`);
