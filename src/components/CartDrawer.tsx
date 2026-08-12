'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    cartCount, 
    cartSubtotal, 
    cartTax, 
    cartTotal, 
    updateQuantity, 
    removeFromCart,
    clearCart,
    openOneClickModal
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Panel content */}
        <div className="w-screen max-w-md transform bg-card border-l border-border shadow-2xl transition-all duration-300">
          <div className="flex h-full flex-col justify-between p-6 pb-20 md:pb-6">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-extrabold flex items-center gap-2 text-foreground">
                <ShoppingCart className="h-5 w-5 text-primary" /> Shopping Cart
                {cartCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-foreground/5 text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4 stroke-[1.5]" />
                  <p className="text-sm font-bold text-foreground">Your cart is empty</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                    Browse our catalogs to add high-quality tools to your kit!
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.product.id}
                    className="flex gap-3 rounded-xl border border-border/60 bg-background/40 p-3 hover:border-border transition-all"
                  >
                    {/* Item Image */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-extrabold text-foreground line-clamp-1 pr-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                          {item.product.subcategory}
                        </span>
                      </div>

                      {/* Quantity Controller (Touch target height > 44px) */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex items-center justify-center h-8 w-8 text-foreground hover:bg-foreground/5 transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex items-center justify-center h-8 w-8 text-foreground hover:bg-foreground/5 transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-extrabold text-foreground">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Calculations & Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-border pt-4 mt-auto">
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>GST (18%)</span>
                    <span className="font-semibold text-foreground">₹{cartTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold border-t border-border/40 pt-2 text-foreground">
                    <span>Total Amount</span>
                    <span className="text-primary text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      openOneClickModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-black shadow-md shadow-violet-500/20 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>⚡ Cashfree 1-Click Checkout</span>
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full flex items-center justify-center h-10 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors cursor-pointer"
                  >
                    Clear Shopping Cart
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
export default CartDrawer;
