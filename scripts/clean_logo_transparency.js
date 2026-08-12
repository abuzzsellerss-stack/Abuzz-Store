const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const logoFiles = [
  path.join(__dirname, '../public/abuzz-tool-eagle-logo.png'),
  path.join(__dirname, '../public/logo.png')
];

async function processLogo(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  console.log(`Processing logo: ${filePath}`);
  
  // Load image, convert to raw RGBA buffer
  const image = sharp(filePath);
  const metadata = await image.metadata();
  console.log(`Dimensions: ${metadata.width}x${metadata.height}, Channels: ${metadata.channels}, Format: ${metadata.format}`);

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  let transparentCount = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    
    // Near-white or light background pixels (R > 210, G > 210, B > 210)
    if (r > 210 && g > 210 && b > 210) {
      pixels[i + 3] = 0; // Set Alpha to 0 (completely transparent)
      transparentCount++;
    }
  }

  console.log(`Cleared ${transparentCount} background pixels out of ${info.width * info.height} total pixels.`);

  // Save back as clean PNG with full alpha channel
  await sharp(Buffer.from(pixels), {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png({ compressionLevel: 9 })
  .toFile(filePath + '.tmp');

  fs.renameSync(filePath + '.tmp', filePath);
  console.log(`✓ Clean transparent PNG saved to ${filePath}`);
}

async function run() {
  for (const f of logoFiles) {
    await processLogo(f);
  }
  console.log('🎉 All logo files processed with 100% true alpha transparency!');
}

run().catch(err => {
  console.error('Error processing logos:', err);
  process.exit(1);
});
