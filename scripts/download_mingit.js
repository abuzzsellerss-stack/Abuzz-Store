const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const url = 'https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/MinGit-2.48.1-64-bit.zip';
const zipPath = path.join(__dirname, 'git_portable.zip');
const destDir = path.join(__dirname, 'git_portable');

console.log('Downloading Portable MinGit (~30MB)...');

function download(fileUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(fileUrl, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlinkSync(outputPath);
      reject(err);
    });
  });
}

download(url, zipPath)
  .then(() => {
    console.log('Download complete. Extracting zip...');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    
    // Extract using tar (built into Windows 10/11)
    execSync(`tar -xf "${zipPath}" -C "${destDir}"`, { stdio: 'inherit' });
    fs.unlinkSync(zipPath);
    console.log('✓ Portable Git successfully installed in ./git_portable');
  })
  .catch((err) => {
    console.error('Error downloading MinGit:', err.message);
    process.exit(1);
  });
