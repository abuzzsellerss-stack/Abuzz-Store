const fs = require('fs');
const path = require('path');

const FILES = [
  path.resolve(__dirname, '../src/utils/seed.ts'),
  path.resolve(__dirname, '../src/utils/adminMockData.ts'),
];

FILES.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/https:\/\/abuzz\.store\/images\/products\//g, 'https://cdn.abuzz.store/products/');
    content = content.replace(/https:\/\/abuzz\.store\/products\//g, 'https://cdn.abuzz.store/products/');
    content = content.replace(/\/images\/products\//g, 'https://cdn.abuzz.store/products/');
    content = content.replace(/"\/products\//g, '"https://cdn.abuzz.store/products/');
    content = content.replace(/https:\/\/cdn\.abuzz\.store\/products\/([^"]+)\.png/gi, 'https://cdn.abuzz.store/products/$1.jpg');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${path.basename(filePath)} to use cdn.abuzz.store/products/`);
  }
});
