import { describe, it, expect } from 'vitest';
import { calculateGstSplit, calculateVendorDeductions, HsnCodeMaster } from '../utils/adminMockData';

describe('Admin Compliance & Settlement Calculations', () => {

  const testHsnRegistry: HsnCodeMaster[] = [
    { code: '8467', category: 'Power Tools & Accessories', cgst: 9, sgst: 9, igst: 18, description: 'Power tools slab' },
    { code: '2523', category: 'Building Materials', cgst: 14, sgst: 14, igst: 28, description: 'Cement slab' }
  ];

  describe('calculateGstSplit()', () => {
    it('should split GST into 9% CGST and 9% SGST for intrastate transactions (same origin/dest states)', () => {
      // Base: ₹10,000, Qty: 2, HSN: 8467. Total taxable: ₹20,000.
      // Intrastate: CGST: 9% of ₹20k = ₹1,800. SGST: 9% of ₹20k = ₹1,800.
      const result = calculateGstSplit(10000, 2, '8467', 'Punjab', 'Punjab', testHsnRegistry);
      
      expect(result.isInterstate).toBe(false);
      expect(result.cgstRate).toBe(9);
      expect(result.sgstRate).toBe(9);
      expect(result.igstRate).toBe(0);
      expect(result.cgstAmount).toBe(1800.00);
      expect(result.sgstAmount).toBe(1800.00);
      expect(result.igstAmount).toBe(0);
      expect(result.totalTax).toBe(3600.00);
    });

    it('should charge full 18% IGST and no CGST/SGST for interstate transactions (different states)', () => {
      // Base: ₹5,000, Qty: 1, HSN: 8467. Total taxable: ₹5,000.
      // Interstate: IGST: 18% of ₹5k = ₹900.
      const result = calculateGstSplit(5000, 1, '8467', 'Maharashtra', 'Punjab', testHsnRegistry);
      
      expect(result.isInterstate).toBe(true);
      expect(result.cgstRate).toBe(0);
      expect(result.sgstRate).toBe(0);
      expect(result.igstRate).toBe(18);
      expect(result.cgstAmount).toBe(0);
      expect(result.sgstAmount).toBe(0);
      expect(result.igstAmount).toBe(900.00);
      expect(result.totalTax).toBe(900.00);
    });

    it('should handle high tax slabs correctly (e.g. 28% cement slab)', () => {
      // Base: ₹400, Qty: 100, HSN: 2523. Total taxable: ₹40,000.
      // Intrastate 28% split: CGST 14% = ₹5,600, SGST 14% = ₹5,600.
      const result = calculateGstSplit(400, 100, '2523', 'Gujarat', 'Gujarat', testHsnRegistry);
      
      expect(result.isInterstate).toBe(false);
      expect(result.cgstRate).toBe(14);
      expect(result.sgstRate).toBe(14);
      expect(result.cgstAmount).toBe(5600.00);
      expect(result.sgstAmount).toBe(5600.00);
      expect(result.totalTax).toBe(11200.00);
    });

    it('should match case-insensitively for state comparison', () => {
      const result = calculateGstSplit(100, 1, '8467', '  punjab ', 'PUNJAB', testHsnRegistry);
      expect(result.isInterstate).toBe(false);
    });
  });

  describe('calculateVendorDeductions()', () => {
    it('should accurately subtract 7.5% marketplace commission, 2% PG fee, and 1% Section 52 TCS from gross sales', () => {
      // Gross: ₹1,00,000. Commission: ₹7,500. PG fee: ₹2,000. TCS (1%): ₹1,000.
      // Deductions: ₹10,500. Net payout: ₹89,500.
      const result = calculateVendorDeductions(100000, 7.5, 2.0);
      
      expect(result.marketplaceCommission).toBe(7500.00);
      expect(result.pgFee).toBe(2000.00);
      expect(result.tcsDeduction).toBe(1000.00);
      expect(result.totalDeductions).toBe(10500.00);
      expect(result.netPayout).toBe(89500.00);
    });

    it('should handle float numbers and rounding properly', () => {
      // Gross: ₹12,499. Commission: 6.5%. PG fee: 2%. TCS (1%)
      // Marketplace commission = 12499 * 0.065 = 812.435 -> rounds to 812.43 in JS binary floats
      // PG fee = 12499 * 0.02 = 249.98
      // TCS = 12499 * 0.01 = 124.99
      // Total deductions = 812.43 + 249.98 + 124.99 = 1187.40
      // Net payout = 12499 - 1187.40 = 11311.60
      const result = calculateVendorDeductions(12499, 6.5, 2.0);
      
      expect(result.marketplaceCommission).toBe(812.43);
      expect(result.pgFee).toBe(249.98);
      expect(result.tcsDeduction).toBe(124.99);
      expect(result.totalDeductions).toBe(1187.40);
      expect(result.netPayout).toBe(11311.60);
    });
  });

});
