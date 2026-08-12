const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const downloadsDir = 'C:\\Users\\manis\\Downloads';
let targetFile = 'C:\\Users\\manis\\Downloads\\full_errors_for_feed_upload-2026-08-03-030250.xlsx';

if (!fs.existsSync(targetFile)) {
  const files = fs.readdirSync(downloadsDir).filter(f => f.startsWith('full_errors_for_feed_upload') && f.endsWith('.xlsx'));
  if (files.length > 0) {
    files.sort((a, b) => fs.statSync(path.join(downloadsDir, b)).mtimeMs - fs.statSync(path.join(downloadsDir, a)).mtimeMs);
    targetFile = path.join(downloadsDir, files[0]);
  }
}

if (!fs.existsSync(targetFile)) {
  console.error('Meta error Excel file not found');
  process.exit(1);
}

console.log('Reading Meta Error Report:', targetFile);

const workbook = XLSX.readFile(targetFile);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const textContent = rows.map(r => r.join(' | ')).join('\n');
fs.writeFileSync(path.resolve(__dirname, '../public/meta_feed_errors.txt'), textContent, 'utf8');

console.log('Successfully written error report to public/meta_feed_errors.txt');
