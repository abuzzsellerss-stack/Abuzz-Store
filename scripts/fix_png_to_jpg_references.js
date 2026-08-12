const fs = require('fs');
const path = require('path');

const seedPath = path.resolve(__dirname, '../src/utils/seed.ts');
const adminPath = path.resolve(__dirname, '../src/utils/adminMockData.ts');

[seedPath, adminPath].forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace .png extensions inside image URLs to .jpg
    const updated = content.replace(/\/images\/products\/([^"]+)\.png/gi, '/images/products/$1.jpg');
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Updated PNG references to JPG in ${path.basename(filePath)}`);
  }
});
