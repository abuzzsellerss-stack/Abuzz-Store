const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'src', 'app', 'admin', 'page.tsx');
if (fs.existsSync(target)) {
  fs.unlinkSync(target);
  console.log('Successfully removed redundant src/app/admin/page.tsx!');
} else {
  console.log('File src/app/admin/page.tsx already removed.');
}
