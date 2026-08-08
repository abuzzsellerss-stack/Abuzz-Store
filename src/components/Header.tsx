'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { AbuzzLogo } from './AbuzzLogo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { MOCK_PRODUCTS } from '../utils/seed';
import { getAdminProducts } from '../utils/adminMockData';
import { Product } from '../types';
import { ShoppingCart, Heart, User, LogOut, Search, Hammer, Shield, ShieldCheck, Nut, Wrench, Menu, Sun, Moon, Layers, Droplet, Zap, ArrowRight, Truck } from 'lucide-react';
import { CATEGORIES_DATA } from '../constants/categories';
import { trackMetaEvent } from './MetaPixel';


interface HeaderProps {
  onCartToggle?: () => void;
  onSearchChange?: (val: string) => void;
  onCategorySelect?: (cat: string | null) => void;
  onSubcategorySelect?: (sub: string | null) => void;
  selectedCategory?: string | null;
  selectedSubcategory?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  onCartToggle = () => {},
  onSearchChange,
  onCategorySelect,
  onSubcategorySelect,
  selectedCategory,
  selectedSubcategory
}) => {
  const router = useRouter();
  const { user, signOutUser } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchVal, setSearchVal] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // default dark
  const [allProducts, setAllProducts] = useState<Product[]>(() => getAdminProducts(MOCK_PRODUCTS));

  const searchContainerRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const refreshProducts = () => setAllProducts(getAdminProducts(MOCK_PRODUCTS));
    refreshProducts();
    window.addEventListener('storage', refreshProducts);
    window.addEventListener('focus', refreshProducts);
    return () => {
      window.removeEventListener('storage', refreshProducts);
      window.removeEventListener('focus', refreshProducts);
    };
  }, []);

  // Filter live matching products for instant autocomplete search overlay
  const matchingSearchResults: Product[] = searchVal.trim().length >= 2
    ? allProducts.filter(p => p.isActive !== false && (
        p.title.toLowerCase().includes(searchVal.toLowerCase()) || 
        p.category.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchVal.toLowerCase()) ||
        (p.searchKeywords && p.searchKeywords.some(kw => kw.toLowerCase().includes(searchVal.toLowerCase())))
      )).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categoryIcons: Record<string, React.ComponentType<any>> = {
    'Hand Tools': Wrench,
    'Power Tools & Accessories': Hammer,
    'Safety Gears & PPE': Shield,
    'Building Materials': Layers,
    'Fasteners & Hardware': Nut,
    'Plumbing Supplies': Droplet,
    'Electrical Infrastructure': Zap
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (searchVal.trim()) {
      trackMetaEvent('Search', { search_string: searchVal.trim() });
    }
    if (onSearchChange) {
      onSearchChange(searchVal);
    }
  };


  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      htmlElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border glass transition-colors duration-300">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 py-1.5 gap-2">
        
        {/* Branding / Logo */}
        <Link href="/" className="flex items-center gap-1.5 hover:opacity-95 transition-opacity shrink-0" onClick={() => onCategorySelect?.(null)}>
          <AbuzzLogo size="md" layout="horizontal" />
        </Link>

        {/* Responsive Search Bar & Instant Autocomplete Dropdown */}
        <form 
          ref={searchContainerRef}
          onSubmit={handleSearchSubmit} 
          className="flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-4 items-center relative"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search tools, hardware..."
              value={searchVal}
              onFocus={() => setIsSearchFocused(true)}
              onChange={handleSearchInputChange}
              className="w-full rounded-full border border-border bg-background/60 pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
            <Search className="absolute left-3 top-2.5 sm:top-3 h-3.5 sm:h-4 w-3.5 sm:w-4 text-muted-foreground" />
          </div>

          {/* Autocomplete Predictive Live Results Modal */}
          {isSearchFocused && searchVal.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-card p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-border/50 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Matching Products ({matchingSearchResults.length})
                </span>
                <span className="text-[9px] text-primary font-bold">Live Search</span>
              </div>

              {matchingSearchResults.length > 0 ? (
                <div className="space-y-1">
                  {matchingSearchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setIsSearchFocused(false);
                        router.push(`/product/${prod.id}`);
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-foreground/5 transition-colors cursor-pointer"
                    >
                      <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-border bg-slate-100 dark:bg-slate-800">
                        <img src={prod.imageUrl} alt={prod.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-foreground truncate">{prod.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-primary">₹{prod.price.toLocaleString('en-IN')}</span>
                          <span className="text-[9px] text-muted-foreground uppercase">{prod.category}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-muted-foreground font-semibold">
                  No matching products found for "{searchVal}"
                </div>
              )}
            </div>
          )}
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Light/Dark Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-500" /> : <Moon className="h-4 sm:h-5 w-4 sm:w-5" />}
          </button>

          {/* Track Order Icon Button (Hidden on small mobile, visible sm+) */}
          <Link
            href="/track-order"
            className="hidden sm:flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
            title="Track Order Status"
          >
            <Truck className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
          </Link>

          {/* Wishlist Icon Button (Hidden on small mobile, accessible via Mobile Bottom Nav & Profile) */}
          <Link
            href="/profile?tab=wishlist"
            className="hidden sm:flex relative items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
            title="View Wishlist"
          >
            <Heart className="h-4 sm:h-5 w-4 sm:w-5 text-rose-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-rose-500 text-[9px] sm:text-[10px] font-bold text-white ring-2 ring-background">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Trigger Button (Desktop & general) */}
          <button
            onClick={onCartToggle}
            className="relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
          >
            <ShoppingCart className="h-4 sm:h-5 w-4 sm:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[9px] sm:text-[10px] font-bold text-white ring-2 ring-background animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full border border-border p-1 pr-2 sm:pr-3 hover:bg-foreground/5 text-foreground transition-all cursor-pointer"
                >
                  <div className="relative h-7 w-7 overflow-hidden rounded-full shrink-0">
                    <Image
                      src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                      alt={user.displayName || 'User'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="hidden text-xs font-semibold sm:inline max-w-[80px] truncate">
                    {user.displayName}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-border bg-card p-1 shadow-lg ring-1 ring-black/5 z-50">
                    <Link 
                      href="/profile" 
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-foreground/5"
                    >
                      <User className="h-4 w-4" /> Account Profile
                    </Link>
                    {(user?.role === 'admin' || user?.role === 'employee') && (
                      <Link 
                        href="/admin" 
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary hover:bg-primary/5 font-semibold"
                      >
                        <Hammer className="h-4 w-4 text-primary" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        signOutUser();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/5 text-left"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/95 transition-all shadow-md shadow-primary/20"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Category Navbar (Desktop only) */}
      <nav className="hidden border-t border-border/40 bg-background/30 md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center gap-6">
            <button
              onClick={() => onCategorySelect?.(null)}
              className={`text-xs font-semibold tracking-wide uppercase transition-colors hover:text-primary ${
                selectedCategory === null ? 'text-primary border-b-2 border-primary h-full mt-[2px] px-1' : 'text-muted-foreground'
              }`}
            >
              All Catalog
            </button>
            {CATEGORIES_DATA.map((cat) => {
              const Icon = categoryIcons[cat.name] || Wrench;
              const isSelected = selectedCategory === cat.name;
              return (
                <div key={cat.name} className="group relative h-full flex items-center">
                  <button
                    onClick={() => {
                      onCategorySelect?.(cat.name);
                      onSubcategorySelect?.(null);
                    }}
                    className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase transition-colors hover:text-primary h-full ${
                      isSelected ? 'text-primary border-b-2 border-primary mt-[2px] px-1' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.name}
                  </button>
                  
                  {/* Mega Menu Dropdown */}
                  <div className="absolute top-10 left-0 hidden group-hover:block w-72 rounded-b-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-3">
                      {cat.name} Sub-Categories
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => {
                            onCategorySelect?.(cat.name);
                            onSubcategorySelect?.(sub.name);
                          }}
                          className="flex flex-col items-start rounded-lg p-2 text-left hover:bg-foreground/5 transition-all w-full"
                        >
                          <span className="text-xs font-bold text-foreground hover:text-primary">
                            {sub.name}
                          </span>
                          <span className="text-[9px] text-muted-foreground line-clamp-1 mt-0.5">
                            {sub.items.join(', ')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};
