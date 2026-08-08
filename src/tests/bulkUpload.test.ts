import { describe, it, expect } from 'vitest';
import { validateCatalogRow, ParsedCatalogRow } from '../utils/adminMockData';

describe('Bulk Upload Spreadsheet Validation Engine', () => {

  it('should validate a correct product row successfully', () => {
    const row: ParsedCatalogRow = {
      sku: 'MAK-HR-101',
      title: 'Makita Heavy Duty Rotary Hammer',
      category: 'Power Tools & Accessories',
      subcategory: 'Rotary Hammers',
      price: '11500',
      moq: '2',
      description: 'Professional grade rotary hammer drill',
      weight_kg: '3.5',
      hsn_code: '8467',
      is_serialized: 'TRUE'
    };

    const result = validateCatalogRow(row, 1);

    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
    expect(result.row.sku).toBe('MAK-HR-101');
    expect(result.row.price).toBe(11500);
    expect(result.row.moq).toBe(2);
    expect(result.row.category).toBe('Power Tools & Accessories');
    expect(result.row.is_serialized).toBe(true);
  });

  it('should fail validation if SKU is missing or contains invalid characters', () => {
    const rowMissingSku: ParsedCatalogRow = {
      title: 'Stanley Hammer',
      category: 'Hand Tools',
      price: '450'
    };
    const result1 = validateCatalogRow(rowMissingSku, 1);
    expect(result1.isValid).toBe(false);
    expect(result1.errors).toContain('SKU is required.');

    const rowInvalidSku: ParsedCatalogRow = {
      sku: 'STAN#HAMMER@10',
      title: 'Stanley Hammer',
      category: 'Hand Tools',
      price: '450'
    };
    const result2 = validateCatalogRow(rowInvalidSku, 2);
    expect(result2.isValid).toBe(false);
    expect(result2.errors[0]).toContain('invalid characters');
  });

  it('should fail validation if title or category is missing', () => {
    const rowMissingTitle: ParsedCatalogRow = {
      sku: 'STAN-101',
      category: 'Hand Tools',
      price: '450'
    };
    const result1 = validateCatalogRow(rowMissingTitle, 1);
    expect(result1.isValid).toBe(false);
    expect(result1.errors).toContain('Title is required.');

    const rowMissingCat: ParsedCatalogRow = {
      sku: 'STAN-101',
      title: 'Stanley Plier',
      price: '450'
    };
    const result2 = validateCatalogRow(rowMissingCat, 2);
    expect(result2.isValid).toBe(false);
    expect(result2.errors).toContain('Category is required.');
  });

  it('should fail validation if category does not match one of the 7 official store categories', () => {
    const rowBadCat: ParsedCatalogRow = {
      sku: 'STAN-101',
      title: 'Stanley Plier',
      category: 'Gardening Equipments',
      price: '450'
    };
    const result = validateCatalogRow(rowBadCat, 1);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toContain('Must match standard store categories');
  });

  it('should fail validation if price is negative or non-numeric', () => {
    const rowNegPrice: ParsedCatalogRow = {
      sku: 'STAN-101',
      title: 'Stanley Plier',
      category: 'Hand Tools',
      price: '-150'
    };
    const result1 = validateCatalogRow(rowNegPrice, 1);
    expect(result1.isValid).toBe(false);
    expect(result1.errors).toContain('Price cannot be negative.');

    const rowCharPrice: ParsedCatalogRow = {
      sku: 'STAN-101',
      title: 'Stanley Plier',
      category: 'Hand Tools',
      price: 'five hundred rupees'
    };
    const result2 = validateCatalogRow(rowCharPrice, 2);
    expect(result2.isValid).toBe(false);
    expect(result2.errors[0]).toContain('must be a numeric value');
  });

  it('should return warning message if HSN code is not found in master registry', () => {
    const rowUnlistedHsn: ParsedCatalogRow = {
      sku: 'STAN-101',
      title: 'Stanley Plier',
      category: 'Hand Tools',
      price: '450',
      hsn_code: '9999' // Not in registry
    };
    const result = validateCatalogRow(rowUnlistedHsn, 1);
    expect(result.isValid).toBe(true); // Still valid!
    expect(result.warnings[0]).toContain('not found in registry');
  });

});
