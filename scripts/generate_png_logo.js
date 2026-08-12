const fs = require('fs');
const path = require('path');

// We copy public/google_square_logo.svg or ensure public/google_square_logo.png is prepared
const svgPath = path.resolve(__dirname, '../public/google_square_logo.svg');
const pngPath = path.resolve(__dirname, '../public/google_square_logo.png');

if (fs.existsSync(svgPath)) {
  console.log('✓ Google Square Logo SVG is ready at public/google_square_logo.svg');
}
