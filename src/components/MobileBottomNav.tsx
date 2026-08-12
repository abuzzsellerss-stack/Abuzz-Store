'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Home, Grid, ShoppingCart, User } from 'lucide-react';

interface MobileBottomNavProps {
  onCartToggle?: () => void;
  onCategoriesClick?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onCartToggle = () => {},
  onCategoriesClick
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user } = useAuth();

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push('/profile');
    } else {
      router.push('/auth');
    }
  };

  const isHomeActive = pathname === '/';
  const isProfileActive = pathname === '/profile' || pathname === '/auth';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-card/95 backdrop-blur-lg shadow-2xl py-2 md:hidden">
      <div className="flex items-center justify-around px-4">
        
        {/* Home Tab */}
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center gap-0.5 text-center min-h-[44px] min-w-[44px] ${
            isHomeActive ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium font-sans">Home</span>
        </Link>

        {/* Categories Tab */}
        <button
          onClick={onCategoriesClick}
          className="flex flex-col items-center justify-center gap-0.5 text-center min-h-[44px] min-w-[44px] text-muted-foreground hover:text-primary transition-colors"
        >
          <Grid className="h-5 w-5" />
          <span className="text-[10px] font-medium font-sans">Categories</span>
        </button>

        {/* Cart Tab */}
        <button
          onClick={onCartToggle}
          className="relative flex flex-col items-center justify-center gap-0.5 text-center min-h-[44px] min-w-[44px] text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white ring-1 ring-background">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium font-sans">Cart</span>
        </button>

        {/* Account Tab */}
        <button
          onClick={handleAccountClick}
          className={`flex flex-col items-center justify-center gap-0.5 text-center min-h-[44px] min-w-[44px] ${
            isProfileActive ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium font-sans">Account</span>
        </button>

      </div>
    </div>
  );
};
