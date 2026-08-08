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

    // Register PWA Service Worker for images with immediate update check
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister();
          }
        });
      } else {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            reg.update().catch(() => {});
          })
          .catch((err) => {
            console.warn('PWA Service Worker registration notice:', err);
          });
      }
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
