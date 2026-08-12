const fs = require('fs');
const path = require('path');

const seedPath = path.resolve(__dirname, '../src/utils/seed.ts');
const seedContent = fs.readFileSync(seedPath, 'utf8');

// Match JSON objects inside MOCK_PRODUCTS array
const products = [];

// Parse objects using regular expressions for robust extraction
const rawBlocks = seedContent.split(/{\s*"id":/);

// Helper function to sanitize invalid XML control characters
function sanitizeForXml(str) {
  if (!str) return '';
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '') // Remove invalid XML control chars
    .replace(/]]>/g, ']]&gt;'); // Prevent CDATA escape injection
}

for (let i = 1; i < rawBlocks.length; i++) {
  const block = rawBlocks[i];
  
  const idMatch = block.match(/^\s*"([^"]+)"/);
  const titleMatch = block.match(/"title":\s*"([^"]+)"/);
  const priceMatch = block.match(/"price":\s*(\d+)/);
  const descMatch = block.match(/"description":\s*"([^"]+)"/);
  const imgMatch = block.match(/"imageUrl":\s*"([^"]+)"/);
  const categoryMatch = block.match(/"category":\s*"([^"]+)"/);

  if (idMatch && titleMatch && priceMatch && imgMatch) {
    const id = idMatch[1];
    const title = sanitizeForXml(titleMatch[1]);
    const price = priceMatch[1];
    const description = descMatch ? sanitizeForXml(descMatch[1]) : `High quality ${title} from Abuzz Store.`;
    const imageUrl = imgMatch[1].startsWith('http') 
      ? imgMatch[1] 
      : `https://cdn.abuzz.store/products/${imgMatch[1].replace(/^\/?(products\/)?/, '')}`;
    const category = categoryMatch ? sanitizeForXml(categoryMatch[1]) : 'Industrial Hardware';

    products.push({ id, title, price, description, imageUrl, category });
  }
}

console.log(`✓ Parsed ${products.length} products for Meta Commerce Feed`);

const baseUrl = 'https://abuzz.store';

// Build XML Feed with CDATA wrappers for 100% XML validity
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Abuzz Store Product Catalogue</title>
    <link>${baseUrl}</link>
    <description>Official Abuzz Store Product Catalogue Feed for Meta Commerce Manager and Instagram Shop</description>\n`;

// Build CSV Feed
let csv = `id,title,description,availability,condition,price,link,image_link,brand,google_product_category\n`;

products.forEach(p => {
  const prodLink = `${baseUrl}/product/${p.id}`;
  const formattedPrice = `${parseFloat(p.price).toFixed(2)} INR`;
  
  xml += `    <item>
      <g:id><![CDATA[${p.id}]]></g:id>
      <g:title><![CDATA[${p.title}]]></g:title>
      <g:description><![CDATA[${p.description}]]></g:description>
      <g:link>${prodLink}</g:link>
      <g:image_link>${p.imageUrl}</g:image_link>
      <g:brand>LXMI</g:brand>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${formattedPrice}</g:price>
      <g:google_product_category>Business &amp; Industrial &gt; Industrial Supplies</g:google_product_category>
    </item>\n`;

  const csvDesc = `"${p.description.replace(/"/g, '""')}"`;
  const csvTitle = `"${p.title.replace(/"/g, '""')}"`;
  csv += `${p.id},${csvTitle},${csvDesc},in stock,new,${formattedPrice},${prodLink},${p.imageUrl},LXMI,"Business & Industrial > Industrial Supplies"\n`;
});

xml += `  </channel>\n</rss>`;

fs.writeFileSync(path.resolve(__dirname, '../public/facebook_feed.xml'), xml, 'utf8');
fs.writeFileSync(path.resolve(__dirname, '../public/catalog.csv'), csv, 'utf8');
console.log('✓ Successfully generated public/facebook_feed.xml and public/catalog.csv');
