'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  isOneClickModalOpen: boolean;
  oneClickProduct: Product | null;
  oneClickQuantity: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openOneClickModal: (product?: Product, quantity?: number) => void;
  closeOneClickModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cashfree One Click Checkout modal state
  const [isOneClickModalOpen, setIsOneClickModalOpen] = useState(false);
  const [oneClickProduct, setOneClickProduct] = useState<Product | null>(null);
  const [oneClickQuantity, setOneClickQuantity] = useState(1);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('abuzz_cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch {
        localStorage.removeItem('abuzz_cart');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('abuzz_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const openOneClickModal = (product?: Product, quantity = 1) => {
    if (product) {
      setOneClickProduct(product);
      setOneClickQuantity(quantity);
      addToCart(product, quantity);
    }
    setIsOneClickModalOpen(true);
  };

  const closeOneClickModal = () => {
    setIsOneClickModalOpen(false);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTax = cartSubtotal * 0.18; // 18% GST
  const cartTotal = cartSubtotal + cartTax;

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartSubtotal,
      cartTax,
      cartTotal,
      isOneClickModalOpen,
      oneClickProduct,
      oneClickQuantity,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openOneClickModal,
      closeOneClickModal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
