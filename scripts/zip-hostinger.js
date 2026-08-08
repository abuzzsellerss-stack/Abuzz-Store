const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outDir = path.join(__dirname, '..', 'out');
const zipFile = path.join(__dirname, '..', 'hostinger-upload-abuzz.zip');

console.log('====================================================');
console.log('Packaging Hostinger Static Export ZIP');
console.log('====================================================');

if (!fs.existsSync(outDir)) {
  console.error('Error: "out" folder does not exist. Run "npm run build" first.');
  process.exit(1);
}

try {
  // Use PowerShell Compress-Archive on Windows
  if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
  }

  console.log('Compressing "out" directory into hostinger-upload-abuzz.zip...');
  const powershellCmd = `powershell -Command "Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipFile}' -Force"`;
  execSync(powershellCmd, { stdio: 'inherit' });

  console.log('\n====================================================');
  console.log('SUCCESS! Created Hostinger upload archive:');
  console.log(zipFile);
  console.log('====================================================\n');
} catch (err) {
  console.error('Failed to create zip archive:', err);
}
