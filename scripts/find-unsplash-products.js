const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'src', 'utils', 'seed.ts');
const seedContent = fs.readFileSync(seedPath, 'utf8');

const lines = seedContent.split('\n');

const unsplashList = [];

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
      unsplashList.push({
        id: curId,
        title: curTitle,
        category: curCategory,
        url
      });
    }
    curId = '';
    curTitle = '';
    curCategory = '';
  }
}

console.log(`FOUND ${unsplashList.length} PRODUCTS WITH MOCK/UNSPLASH IMAGES:`);
unsplashList.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] ${p.title} (${p.category})`);
});
