const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outDir = path.join(__dirname, '..', 'out');
const deployDir = path.join(__dirname, '..', 'deploy');
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir, { recursive: true });
}

const zipFile = path.join(deployDir, 'abuzz-hostinger-upload.zip');

console.log('====================================================');
console.log('Packaging Hostinger Static Export ZIP');
console.log('====================================================');

if (!fs.existsSync(outDir)) {
  console.error('Error: "out" folder does not exist. Run "npm run build" first.');
  process.exit(1);
}

try {
  try {
    if (fs.existsSync(zipFile)) {
      fs.unlinkSync(zipFile);
    }
  } catch (e) {
    console.warn('Zip file update notice:', e.message);
  }

  console.log('Compressing "out" directory into deploy/abuzz-hostinger-upload.zip...');
  const tarCmd = `tar -a -c -f "${zipFile.replace(/\\/g, '/')}" --exclude=products --exclude=banners -C "${outDir.replace(/\\/g, '/')}" .`;
  execSync(tarCmd, { stdio: 'inherit' });

  console.log('\n====================================================');
  console.log('SUCCESS! Created Hostinger upload archive:');
  console.log(zipFile);
  console.log('====================================================\n');
} catch (err) {
  console.error('Failed to create zip archive:', err.message);
}
