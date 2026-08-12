const path = require('path');
const fs = require('fs');

// Try to use sharp for proper resizing
try {
  const sharp = require('sharp');
  const src = path.join(__dirname, '..', 'public', 'icons', 'icon-512x512.png');

  sharp(src)
    .resize(192, 192)
    .toFile(path.join(__dirname, '..', 'public', 'icons', 'icon-192x192.png'), (err, info) => {
      if (err) {
        console.error('sharp resize failed:', err.message);
      } else {
        console.log('icon-192x192.png created:', info);
      }
    });

  sharp(src)
    .resize(512, 512)
    .toFile(path.join(__dirname, '..', 'public', 'icons', 'icon-512x512.png') + '.tmp', (err, info) => {
      if (err) {
        console.error('sharp 512 resize failed:', err.message);
      } else {
        fs.renameSync(path.join(__dirname, '..', 'public', 'icons', 'icon-512x512.png') + '.tmp',
                      path.join(__dirname, '..', 'public', 'icons', 'icon-512x512.png'));
        console.log('icon-512x512.png resized:', info);
      }
    });
} catch (e) {
  console.log('sharp not available:', e.message);
  console.log('Icons copied as-is (will need manual resizing)');
}
