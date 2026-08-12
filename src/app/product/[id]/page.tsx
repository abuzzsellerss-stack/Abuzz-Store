import React from 'react';
import ProductDetailClient from './ProductDetailClient';
import { MOCK_PRODUCTS } from '../../../utils/seed';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
