const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const oldNext = path.join(outDir, '_next');
const newNext = path.join(outDir, 'next_assets');

if (fs.existsSync(oldNext)) {
  console.log('Renaming _next -> next_assets ...');
  if (fs.existsSync(newNext)) {
    fs.rmSync(newNext, { recursive: true, force: true });
  }
  fs.renameSync(oldNext, newNext);
} else {
  console.log('_next directory not found in out/, proceeding with replacement.');
}

function replaceInDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceInDirectory(fullPath);
    } else if (/\.(html|js|css|json|txt|xml|map)$/i.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('_next/')) {
        content = content.replaceAll('/_next/', '/next_assets/').replaceAll('_next/', 'next_assets/');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

console.log('Replacing /_next/ with /next_assets/ across all generated files...');
replaceInDirectory(outDir);
console.log('Fix completed successfully!');
