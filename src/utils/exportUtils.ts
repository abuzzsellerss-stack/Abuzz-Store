import { AdminOrderRecord } from './adminMockData';

/**
 * Trigger download of text/csv content as a file in the browser
 */
function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export Admin Order Records to CSV format
 */
export function exportOrdersToCSV(orders: AdminOrderRecord[], filename = 'abuzz_orders_report.csv') {
  if (!orders || orders.length === 0) {
    alert('No order data available to export.');
    return;
  }

  const headers = [
    'Order ID',
    'Customer Name',
    'Customer Email',
    'Customer Phone',
    'Order Date',
    'Order Status',
    'Payment Method',
    'Payment Status',
    'GSTIN',
    'Subtotal (INR)',
    'Tax (INR)',
    'Discount (INR)',
    'Total Amount (INR)',
    'Items Count',
    'Shipping Address'
  ];

  const rows = orders.map(order => [
    `"${order.id || ''}"`,
    `"${(order.customerName || '').replace(/"/g, '""')}"`,
    `"${(order.customerEmail || '').replace(/"/g, '""')}"`,
    `"${(order.customerPhone || '').replace(/"/g, '""')}"`,
    `"${order.createdAt || ''}"`,
    `"${order.orderStatus || ''}"`,
    `"${order.paymentMode || ''}"`,
    `"${order.paymentStatus || ''}"`,
    `"${order.gstin || 'N/A'}"`,
    order.taxableSubtotal || 0,
    order.totalTax || 0,
    order.discount || 0,
    order.totalAmount || 0,
    order.items ? order.items.length : 0,
    `"${(order.shippingAddress || '').replace(/"/g, '""')}"`
  ]);

  const csvString = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadCSV(csvString, filename);
}

/**
 * Export GST Tax Report to CSV
 */
export function exportGstReportToCSV(orders: AdminOrderRecord[], filename = 'abuzz_gst_tax_report.csv') {
  if (!orders || orders.length === 0) {
    alert('No order data available for GST report.');
    return;
  }

  const headers = [
    'Invoice Number',
    'Order Date',
    'Customer / Entity',
    'Customer GSTIN',
    'Taxable Value (INR)',
    'CGST (9%)',
    'SGST (9%)',
    'IGST (18%)',
    'Total GST Tax (INR)',
    'Gross Invoice Total (INR)'
  ];

  const rows = orders.map(order => {
    const taxableVal = (order.taxableSubtotal || 0) - (order.discount || 0);
    const tax = order.totalTax || 0;
    // Simple logic: if customer GSTIN starts with non-27 or states differ, split into CGST/SGST vs IGST
    const isInterState = order.gstin && !order.gstin.startsWith('27');
    const cgst = isInterState ? 0 : (tax / 2);
    const sgst = isInterState ? 0 : (tax / 2);
    const igst = isInterState ? tax : 0;

    return [
      `"INV-${order.id || ''}"`,
      `"${order.createdAt || ''}"`,
      `"${(order.customerName || '').replace(/"/g, '""')}"`,
      `"${order.gstin || 'B2C Retail'}"`,
      taxableVal.toFixed(2),
      cgst.toFixed(2),
      sgst.toFixed(2),
      igst.toFixed(2),
      tax.toFixed(2),
      (order.totalAmount || 0).toFixed(2)
    ];
  });

  const csvString = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadCSV(csvString, filename);
}

/**
 * Export Products to Meta Commerce Manager Feed CSV Format
 */
export function exportMetaCatalogToCSV(products: any[], filename = 'meta_commerce_catalog_feed.csv') {
  if (!products || products.length === 0) {
    alert('No product data available to export for Meta Commerce Manager.');
    return;
  }

  const headers = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'link',
    'image_link',
    'brand',
    'google_product_category'
  ];

  const rows = products.filter(p => p.isActive !== false).map(product => {
    const id = product.id || '';
    const title = (product.title || '').replace(/"/g, '""');
    const description = (product.description || product.title || '').replace(/"/g, '""');
    const availability = product.stockStatus === 'out_of_stock' ? 'out of stock' : 'in stock';
    const condition = 'new';
    const price = `${product.price || 0} INR`;
    const link = `https://abuzz.store/product/${product.id}`;

    let rawImg = product.imageUrl || '';
    rawImg = rawImg.replace(/https:\/\/abuzz\.store\/images\/products\//g, 'https://cdn.abuzz.store/products/');
    rawImg = rawImg.replace(/\/images\/products\//g, 'https://cdn.abuzz.store/products/');
    rawImg = rawImg.replace(/\/products\//g, 'https://cdn.abuzz.store/products/');
    if (!rawImg.startsWith('http')) {
      rawImg = `https://cdn.abuzz.store/products/${rawImg}`;
    }
    if (rawImg.toLowerCase().endsWith('.png')) {
      rawImg = rawImg.replace(/\.png$/i, '.jpg');
    }

    const brand = (product.specifications?.['Brand'] || 'Abuzz').replace(/"/g, '""');
    const googleCategory = `Hardware > Tools > ${product.category || 'Hand Tools'}`;

    return [
      `"${id}"`,
      `"${title}"`,
      `"${description}"`,
      `"${availability}"`,
      `"${condition}"`,
      `"${price}"`,
      `"${link}"`,
      `"${rawImg}"`,
      `"${brand}"`,
      `"${googleCategory}"`
    ];
  });

  const csvString = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadCSV(csvString, filename);
}

