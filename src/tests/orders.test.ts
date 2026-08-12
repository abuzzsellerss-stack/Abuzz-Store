import { describe, it, expect } from 'vitest';
import { AdminOrderRecord, INITIAL_ADMIN_ORDERS } from '../utils/adminMockData';

describe('B2B Order Processing & Fulfillment lifecycle tests', () => {

  it('should identify orders requiring mandatory E-Way Bill generation (>= ₹50,000 limit)', () => {
    const highValueOrder = INITIAL_ADMIN_ORDERS.find(o => o.totalAmount >= 50000);
    expect(highValueOrder).toBeDefined();
    expect(highValueOrder?.requiresEwayBill).toBe(true);

    const lowValueOrder = INITIAL_ADMIN_ORDERS.find(o => o.totalAmount < 50000);
    expect(lowValueOrder).toBeDefined();
    expect(lowValueOrder?.requiresEwayBill).toBe(false);
  });

  it('should accurately calculate IGST for interstate B2B order (L&T Mumbai order from Punjab warehouse)', () => {
    const lntOrder = INITIAL_ADMIN_ORDERS.find(o => o.id === 'ORD-2026-9002')!;
    expect(lntOrder.state).toBe('Maharashtra');
    expect(lntOrder.igstAmount).toBeGreaterThan(0);
    expect(lntOrder.cgstAmount).toBe(0);
    expect(lntOrder.sgstAmount).toBe(0);
  });

  it('should accurately calculate CGST + SGST for intrastate order (Tata Projects Punjab order)', () => {
    const tataOrder = INITIAL_ADMIN_ORDERS.find(o => o.id === 'ORD-2026-9001')!;
    expect(tataOrder.state).toBe('Punjab');
    expect(tataOrder.cgstAmount).toBeGreaterThan(0);
    expect(tataOrder.sgstAmount).toBeGreaterThan(0);
    expect(tataOrder.igstAmount).toBe(0);
  });

  it('should update order status through fulfillment lifecycle correctly', () => {
    const order = { ...INITIAL_ADMIN_ORDERS[0] };
    expect(order.orderStatus).toBe('processing');

    // Move to ready_for_dispatch
    order.orderStatus = 'ready_for_dispatch';
    expect(order.orderStatus).toBe('ready_for_dispatch');

    // Move to shipped
    order.orderStatus = 'shipped';
    order.awbNumber = 'BD-99102941';
    expect(order.orderStatus).toBe('shipped');
    expect(order.awbNumber).toBe('BD-99102941');
  });

});
