const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const appServerDir = path.join(__dirname, '..', '.next', 'server', 'app');
const oldNext = path.join(outDir, '_next');
const newNext = path.join(outDir, 'next_assets');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function copyHtmlPages(srcDir, targetDir) {
  if (!fs.existsSync(srcDir)) return;
  const items = fs.readdirSync(srcDir);
  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      if (item.startsWith('_') || item.endsWith('.segments')) continue;
      copyHtmlPages(srcPath, path.join(targetDir, item));
    } else if (item.endsWith('.html')) {
      if (item.startsWith('_')) continue;
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      if (item === 'index.html') {
        fs.copyFileSync(srcPath, path.join(targetDir, 'index.html'));
      } else {
        const pageName = item.slice(0, -5);
        fs.copyFileSync(srcPath, path.join(targetDir, item));
        const subFolder = path.join(targetDir, pageName);
        if (!fs.existsSync(subFolder)) {
          fs.mkdirSync(subFolder, { recursive: true });
        }
        fs.copyFileSync(srcPath, path.join(subFolder, 'index.html'));
      }
    }
  }
}

if (fs.existsSync(appServerDir)) {
  console.log('Copying static HTML pages from .next/server/app into out/ ...');
  copyHtmlPages(appServerDir, outDir);
}

console.log('Static export assembly completed cleanly!');

