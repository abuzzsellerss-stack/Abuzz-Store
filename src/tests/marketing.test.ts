import { describe, it, expect } from 'vitest';
import { validateAndApplyCoupon, Coupon } from '../utils/adminMockData';

describe('Marketing & Coupon Valuation Logic', () => {

  const testCoupons: Coupon[] = [
    {
      code: 'DISCOUNT10',
      discountType: 'percentage',
      value: 10,
      minOrderValue: 2000,
      maxDiscountLimit: 300,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      isActive: true,
      usageCount: 0
    },
    {
      code: 'FLAT1000',
      discountType: 'flat',
      value: 1000,
      minOrderValue: 10000,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      isActive: true,
      usageCount: 0
    },
    {
      code: 'EXPIRED50',
      discountType: 'percentage',
      value: 50,
      minOrderValue: 1000,
      startDate: '2025-01-01',
      endDate: '2025-12-31', // Expired
      isActive: true,
      usageCount: 0
    },
    {
      code: 'INACTIVE15',
      discountType: 'percentage',
      value: 15,
      minOrderValue: 1000,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      isActive: false, // Inactive
      usageCount: 0
    }
  ];

  it('should successfully apply percentage discount', () => {
    // Subtotal: 2500, 10% is 250 (less than 300 cap limit)
    const result = validateAndApplyCoupon('DISCOUNT10', 2500, testCoupons);
    expect(result.isValid).toBe(true);
    expect(result.discountAmount).toBe(250);
    expect(result.finalPrice).toBe(2250);
  });

  it('should cap the percentage savings if it exceeds maxDiscountLimit', () => {
    // Subtotal: 6000, 10% is 600 -> capped at 300
    const result = validateAndApplyCoupon('DISCOUNT10', 6000, testCoupons);
    expect(result.isValid).toBe(true);
    expect(result.discountAmount).toBe(300);
    expect(result.finalPrice).toBe(5700);
  });

  it('should successfully apply flat discount cuts', () => {
    // Subtotal: 12000, Flat ₹1000 discount
    const result = validateAndApplyCoupon('FLAT1000', 12000, testCoupons);
    expect(result.isValid).toBe(true);
    expect(result.discountAmount).toBe(1000);
    expect(result.finalPrice).toBe(11000);
  });

  it('should block coupon application if subtotal is below minOrderValue', () => {
    // Subtotal: 1500 (below minOrderValue of 2000)
    const result = validateAndApplyCoupon('DISCOUNT10', 1500, testCoupons);
    expect(result.isValid).toBe(false);
    expect(result.discountAmount).toBe(0);
    expect(result.error).toContain('Minimum order value');
  });

  it('should block expired coupon codes', () => {
    const result = validateAndApplyCoupon('EXPIRED50', 2000, testCoupons);
    expect(result.isValid).toBe(false);
    expect(result.discountAmount).toBe(0);
    expect(result.error).toContain('expired');
  });

  it('should block inactive coupon codes', () => {
    const result = validateAndApplyCoupon('INACTIVE15', 2000, testCoupons);
    expect(result.isValid).toBe(false);
    expect(result.discountAmount).toBe(0);
    expect(result.error).toContain('inactive');
  });

  it('should block non-existent coupon codes', () => {
    const result = validateAndApplyCoupon('NONEXISTENT', 2000, testCoupons);
    expect(result.isValid).toBe(false);
    expect(result.discountAmount).toBe(0);
    expect(result.error).toContain('does not exist');
  });

});
