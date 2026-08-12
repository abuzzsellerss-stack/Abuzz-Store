'use client';

import React, { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider, useCart } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import MetaPixel from './MetaPixel';
import { clearOldImageCaches } from '../utils/imageHelper';
import { CashfreeOneClickCheckoutModal } from './CashfreeOneClickCheckoutModal';

const GlobalOneClickCheckoutModalWrapper: React.FC = () => {
  const { isOneClickModalOpen, closeOneClickModal, oneClickProduct, oneClickQuantity } = useCart();
  if (!isOneClickModalOpen) return null;
  return (
    <CashfreeOneClickCheckoutModal
      isOpen={isOneClickModalOpen}
      onClose={closeOneClickModal}
      product={oneClickProduct}
      initialQuantity={oneClickQuantity}
    />
  );
};

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Automatically delete old image caches to prevent memory bloat and storage errors
    clearOldImageCaches().catch(() => {});

    // Force unregister all Service Workers to prevent stale JS bundle cache mismatches and hydration freezes
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      }).catch(() => {});
    }

    // Clear legacy CacheStorage items
    if (typeof window !== 'undefined' && 'caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      }).catch(() => {});
    }

    // Force dark mode class on document element for premium dark slate aesthetics by default
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement;
      if (!htmlElement.classList.contains('dark') && !htmlElement.classList.contains('light')) {
        htmlElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <MetaPixel />
          <GlobalOneClickCheckoutModalWrapper />
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};
export default ClientProviders;
