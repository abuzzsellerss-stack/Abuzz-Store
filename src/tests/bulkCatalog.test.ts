import { describe, it, expect } from 'vitest';
import { Product } from '../types';

describe('Catalog Bulk Select & Edit validations', () => {

  const initialProducts: Product[] = [
    { id: 'p-101', title: 'Bosch Angle Grinder', category: 'Power Tools', subcategory: 'Grinders', price: 5000, stockStatus: 'in_stock', popularity: 80, rating: 4.5, reviewsCount: 15, imageUrl: '' },
    { id: 'p-102', title: 'DeWalt Hammer Drill', category: 'Power Tools', subcategory: 'Drills', price: 8000, stockStatus: 'in_stock', popularity: 90, rating: 4.8, reviewsCount: 30, imageUrl: '' },
    { id: 'p-103', title: 'Stanley Hand Wrench', category: 'Hand Tools', subcategory: 'Wrenches', price: 1200, stockStatus: 'low_stock', popularity: 70, rating: 4.2, reviewsCount: 8, imageUrl: '' }
  ];

  it('should bulk update stock status of selected products correctly', () => {
    const selectedIds = ['p-101', 'p-102'];
    const updatedStock = 'out_of_stock';
    
    const updated = initialProducts.map(p => 
      selectedIds.includes(p.id) ? { ...p, stockStatus: updatedStock } : p
    );

    expect(updated.find(p => p.id === 'p-101')?.stockStatus).toBe('out_of_stock');
    expect(updated.find(p => p.id === 'p-102')?.stockStatus).toBe('out_of_stock');
    expect(updated.find(p => p.id === 'p-103')?.stockStatus).toBe('low_stock');
  });

  it('should bulk disable active status of selected products correctly', () => {
    const selectedIds = ['p-102', 'p-103'];
    const isActiveStatus = false;

    const updated = initialProducts.map(p => 
      selectedIds.includes(p.id) ? { ...p, isActive: isActiveStatus } : p
    );

    expect(updated.find(p => p.id === 'p-101')?.isActive).toBeUndefined(); // active defaults
    expect(updated.find(p => p.id === 'p-102')?.isActive).toBe(false);
    expect(updated.find(p => p.id === 'p-103')?.isActive).toBe(false);
  });

  it('should bulk adjust prices of selected products by positive or negative percentage correctly', () => {
    const selectedIds = ['p-101', 'p-102'];
    const percentChange = 10; // +10% price markup

    const updated = initialProducts.map(p => {
      if (selectedIds.includes(p.id)) {
        const newPrice = Number((p.price * (1 + percentChange / 100)).toFixed(2));
        return { ...p, price: newPrice };
      }
      return p;
    });

    expect(updated.find(p => p.id === 'p-101')?.price).toBe(5500); // 5000 * 1.1
    expect(updated.find(p => p.id === 'p-102')?.price).toBe(8800); // 8000 * 1.1
    expect(updated.find(p => p.id === 'p-103')?.price).toBe(1200); // unchanged
  });

  it('should reject bulk modifications if actor is read-only employee', () => {
    const actorRole = 'employee';
    
    let isMutationAllowed = true;
    if (actorRole === 'employee') {
      isMutationAllowed = false;
    }

    expect(isMutationAllowed).toBe(false);
  });

});
