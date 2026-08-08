const fs = require('fs');
const path = require('path');

console.log('===================================================');
console.log('   ABUZZ STORE - PORTABLE PROJECT EXPORT SCRIPT    ');
console.log('===================================================');

const projectDir = path.resolve(__dirname, '..');
const exportTargetDir = path.resolve(__dirname, '../..', 'abuzz_store_portable_project');

console.log('Source Directory:', projectDir);
console.log('Export Target Directory:', exportTargetDir);

// Folders and files to exclude from portable export (build caches, node_modules, large zip files)
const EXCLUDE_SET = new Set([
  'node_modules',
  '.next',
  '.git',
  'out',
  'build',
  'temp_products',
  'hostinger-upload-abuzz.zip',
  'deploy.zip',
  'hostinger_deploy.zip',
  'clean_github_deploy',
  'github_clean_export',
  'HOSTINGER_IMAGES_TO_UPLOAD',
]);

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((child) => {
      if (EXCLUDE_SET.has(child) || child.endsWith('.zip')) {
        return;
      }
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Reset target directory
if (fs.existsSync(exportTargetDir)) {
  console.log('\nCleaning previous export directory...');
  fs.rmSync(exportTargetDir, { recursive: true, force: true });
}
fs.mkdirSync(exportTargetDir, { recursive: true });

// 2. Perform fresh copy
console.log('\nCopying clean portable project files...');
copyRecursiveSync(projectDir, exportTargetDir);

// 3. Generate README_PORTABLE_SETUP.md in the exported folder
const readmeContent = `# Abuzz Store - Portable Project Package

This folder contains the complete, self-contained source code for **Abuzz Store** (Next.js 16 + React 19 + Tailwind CSS v4 + Firebase + Cashfree Payment Gateway + Shiprocket).

---

## How to Run on Another Computer / System

### Prerequisites
- **Node.js**: v18.x, v20.x, or v22.x installed ([Download Node.js](https://nodejs.org/))
- **Git** (optional)

### Setup Steps
1. Copy this \`abuzz_store_portable_project\` folder to your new computer.
2. Open terminal/cmd inside this folder:
   \`\`\`bash
   cd abuzz_store_portable_project
   \`\`\`
3. Install project dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Start the local development server:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open your browser at **http://localhost:3000**

---

## Key Configurations Included
- \`.env.local\`: Includes Real Firebase, Cashfree Payment Gateway, and Shiprocket credentials.
- \`src/app/api/cashfree/create-order\`: Server order creation endpoint.
- \`src/app/api/cashfree/verify-order\`: Payment status verification endpoint.
- \`src/app/checkout/verify\`: Post-payment return verification page.
- \`public/sw.js\`: Optimized Service Worker.
`;

fs.writeFileSync(path.join(exportTargetDir, 'README_PORTABLE_SETUP.md'), readmeContent, 'utf8');

console.log('\n===================================================');
console.log(' SUCCESS! Portable project exported cleanly to:');
console.log(' ', exportTargetDir);
console.log('===================================================');
