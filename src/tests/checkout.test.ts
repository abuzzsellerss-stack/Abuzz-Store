import { describe, it, expect } from 'vitest';
import { calculateCartTotals, formatCardNumber, formatExpiry } from '../utils/checkoutHelpers';

describe('Checkout Operations & Cart Mathematics', () => {

  describe('calculateCartTotals()', () => {
    it('should return zeros when the shopping cart is completely empty', () => {
      const result = calculateCartTotals([]);
      expect(result.subtotal).toBe(0.00);
      expect(result.tax).toBe(0.00);
      expect(result.total).toBe(0.00);
    });

    it('should calculate accurate subtotal, 18% tax, and total values for a single item type', () => {
      const items = [{ price: 100.00, quantity: 2 }];
      const result = calculateCartTotals(items);
      expect(result.subtotal).toBe(200.00);
      expect(result.tax).toBe(36.00);
      expect(result.total).toBe(236.00);
    });

    it('should handle decimal values and rounding accurately', () => {
      const items = [
        { price: 159.00, quantity: 1 }, // DeWalt Drill
        { price: 10.99, quantity: 2 }    // Goggles
      ];
      // Subtotal = 159.00 + (10.99 * 2) = 159.00 + 21.98 = 180.98
      // Tax = 180.98 * 0.18 = 32.5764 -> 32.58
      // Total = 180.98 + 32.58 = 213.56
      const result = calculateCartTotals(items);
      expect(result.subtotal).toBe(180.98);
      expect(result.tax).toBe(32.58);
      expect(result.total).toBe(213.56);
    });
  });

  describe('formatCardNumber()', () => {
    it('should strip out any alphabetical characters from card inputs', () => {
      const formatted = formatCardNumber('4111abcd2222efgh3333');
      expect(formatted).toBe('4111 2222 3333');
    });

    it('should format a digits string into groups of four separated by a space', () => {
      const formatted = formatCardNumber('1234567812345678');
      expect(formatted).toBe('1234 5678 1234 5678');
    });

    it('should return a partially typed card number without trailing spaces if not matching group limit', () => {
      const formatted = formatCardNumber('123456');
      expect(formatted).toBe('1234 56');
    });
  });

  describe('formatExpiry()', () => {
    it('should format expiration digit entries into MM/YY strings', () => {
      const formatted = formatExpiry('1226');
      expect(formatted).toBe('12/26');
    });

    it('should handle short partially typed expiry dates', () => {
      const formatted = formatExpiry('1');
      expect(formatted).toBe('1');
    });
  });

});
