import { describe, it, expect } from 'vitest';
import { calculatePgSurcharge } from '../utils/adminMockData';

// Helper validator to simulate server-side payload validation for Conversions API (CAPI)
function validateMetaCapiPayload(payloadStr: string): { isValid: boolean; error?: string } {
  try {
    const payload = JSON.parse(payloadStr);
    if (!payload.currency) {
      return { isValid: false, error: 'Missing required field: currency' };
    }
    if (payload.currency !== 'INR' && payload.currency !== 'USD') {
      return { isValid: false, error: 'Invalid currency code' };
    }
    if (payload.value === undefined || typeof payload.value !== 'number' || payload.value <= 0) {
      return { isValid: false, error: 'Value must be a positive number' };
    }
    return { isValid: true };
  } catch (e) {
    return { isValid: false, error: 'Payload is not valid JSON' };
  }
}

describe('Integrations & APIs Logic', () => {

  describe('calculatePgSurcharge()', () => {
    it('should compute Razorpay PG 2.0% transaction surcharge correctly', () => {
      // 2% of ₹5,000 is ₹100
      const surcharge = calculatePgSurcharge(5000, 2.0);
      expect(surcharge).toBe(100.00);
    });

    it('should compute Cashfree PG 1.8% transaction surcharge correctly', () => {
      // 1.8% of ₹10,000 is ₹180
      const surcharge = calculatePgSurcharge(10000, 1.8);
      expect(surcharge).toBe(180.00);
    });

    it('should return 0.00 for Bank Direct Wire (0% surcharge)', () => {
      const surcharge = calculatePgSurcharge(7500, 0);
      expect(surcharge).toBe(0.00);
    });

    it('should handle decimal rates and floating roundings correctly', () => {
      // 1.85% of ₹1,249 is 23.1065 -> rounds to 23.11
      const surcharge = calculatePgSurcharge(1249, 1.85);
      expect(surcharge).toBe(23.11);
    });
  });

  describe('validateMetaCapiPayload() - Meta CAPI Payload Schema Verification', () => {
    it('should pass validation for a correct Purchase conversion event payload', () => {
      const payload = JSON.stringify({
        content_ids: ['DEW-DCD-777'],
        value: 7999,
        currency: 'INR',
        transaction_id: 'tx_55416'
      });
      const result = validateMetaCapiPayload(payload);
      expect(result.isValid).toBe(true);
    });

    it('should fail validation if currency field is missing or invalid', () => {
      const payloadMissing = JSON.stringify({
        content_ids: ['DEW-DCD-777'],
        value: 7999
      });
      const result1 = validateMetaCapiPayload(payloadMissing);
      expect(result1.isValid).toBe(false);
      expect(result1.error).toContain('Missing required field');

      const payloadBad = JSON.stringify({
        content_ids: ['DEW-DCD-777'],
        value: 7999,
        currency: 'EUR' // Unlisted in validator
      });
      const result2 = validateMetaCapiPayload(payloadBad);
      expect(result2.isValid).toBe(false);
      expect(result2.error).toContain('Invalid currency code');
    });

    it('should fail validation if value is negative or non-numeric', () => {
      const payloadNeg = JSON.stringify({
        content_ids: ['DEW-DCD-777'],
        value: -500,
        currency: 'INR'
      });
      const result1 = validateMetaCapiPayload(payloadNeg);
      expect(result1.isValid).toBe(false);
      expect(result1.error).toContain('Value must be a positive number');
    });
  });

  describe('validateGoogleTagPayload() - Google Analytics/Ads Tag Verification', () => {
    
    function validateGoogleTagPayload(payloadStr: string): { isValid: boolean; error?: string } {
      try {
        const payload = JSON.parse(payloadStr);
        if (!payload.send_to) {
          return { isValid: false, error: 'Missing required field: send_to' };
        }
        if (!payload.send_to.startsWith('AW-') && !payload.send_to.startsWith('G-')) {
          return { isValid: false, error: 'Tag ID must start with AW- or G-' };
        }
        return { isValid: true };
      } catch (e) {
        return { isValid: false, error: 'Payload is not valid JSON' };
      }
    }

    it('should validate a correct Google Ads Conversion purchase tag', () => {
      const payload = JSON.stringify({
        send_to: 'AW-98726154/aw_conv_purchase_101',
        transaction_id: 'aw_tx_90112',
        value: 7999,
        currency: 'INR'
      });
      const result = validateGoogleTagPayload(payload);
      expect(result.isValid).toBe(true);
    });

    it('should fail validation if send_to parameter is missing', () => {
      const payload = JSON.stringify({
        transaction_id: 'aw_tx_90112',
        value: 7999
      });
      const result = validateGoogleTagPayload(payload);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Missing required field');
    });

    it('should fail validation if Tag prefix is invalid', () => {
      const payload = JSON.stringify({
        send_to: 'UA-12345-1/purchase', // UA- is deprecated Universal Analytics prefix
        value: 1200
      });
      const result = validateGoogleTagPayload(payload);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Tag ID must start with AW- or G-');
    });
  });

});
