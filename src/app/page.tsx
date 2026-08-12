'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { isMock } from '../lib/firebase';
import { Header } from '../components/Header';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { FilterSidebar } from '../components/FilterSidebar';
import { CartDrawer } from '../components/CartDrawer';
import { ProductCard } from '../components/ProductCard';
import { MOCK_PRODUCTS, seedDatabase } from '../utils/seed';
import { getAdminProducts } from '../utils/adminMockData';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Wrench, Hammer, Shield, Nut, Filter, RefreshCw, Star, Info, Layers, Droplet, Zap, ShoppingCart, ZoomIn, X, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (products && Array.isArray(products)) {
      for (const p of products) {
        if (p && p.category) {
          counts[p.category] = (counts[p.category] || 0) + 1;
        }
      }
    }
    return counts;
  }, [products]);
  
  // Quick View in-place cursor hover magnification zoom states
  const [quickViewZoomPos, setQuickViewZoomPos] = useState({ x: 50, y: 50 });
  const [isQuickViewHovered, setIsQuickViewHovered] = useState(false);
  const [quickViewShareCopied, setQuickViewShareCopied] = useState(false);

  const handleQuickViewMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setQuickViewZoomPos({ x, y });
  };

  const handleQuickViewTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((touch.clientX - left) / width) * 100));
      const y = Math.max(0, Math.min(100, ((touch.clientY - top) / height) * 100));
      setQuickViewZoomPos({ x, y });
    }
  };
  
  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState('popularity');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(24);

  // Layout UI states
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [quickViewActiveImg, setQuickViewActiveImg] = useState<string>('');

  // Load catalog on first run
  useEffect(() => {
    const refreshCatalog = () => {
      const catalog = getAdminProducts(MOCK_PRODUCTS);
      setProducts(catalog);
    };

    refreshCatalog();
    window.addEventListener('storage', refreshCatalog);

    return () => {
      window.removeEventListener('storage', refreshCatalog);
    };
  }, []);

  // Filter and Sort logic
  useEffect(() => {
    let result = (products || []).filter(p => p && p.isActive !== false);

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) => 
          (p.title && p.title.toLowerCase().includes(q)) || 
          (p.description && p.description.toLowerCase().includes(q)) || 
          (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.searchKeywords && Array.isArray(p.searchKeywords) && p.searchKeywords.some(kw => kw && kw.toLowerCase().includes(q))) ||
          (p.seo?.metaKeywords && Array.isArray(p.seo.metaKeywords) && p.seo.metaKeywords.some(kw => kw && kw.toLowerCase().includes(q)))
      );
    }

    // 2. Category Filter
    if (selectedCategory) {
      result = result.filter((p) => p && p.category === selectedCategory);
      if (selectedSubcategory) {
        result = result.filter((p) => p && p.subcategory === selectedSubcategory);
      }
    }

    // 3. Price Range Filter
    if (selectedPriceRange) {
      switch (selectedPriceRange) {
        case 'under_499':
          result = result.filter((p) => p && (p.price ?? 0) < 499);
          break;
        case '499_1999':
          result = result.filter((p) => p && (p.price ?? 0) >= 499 && (p.price ?? 0) <= 1999);
          break;
        case '2000_4999':
          result = result.filter((p) => p && (p.price ?? 0) >= 2000 && (p.price ?? 0) <= 4999);
          break;
        case 'over_5000':
          result = result.filter((p) => p && (p.price ?? 0) > 5000);
          break;
        default:
          break;
      }
    }

    // 4. Availability Filter
    if (inStockOnly) {
      result = result.filter((p) => p && (p.stockStatus === 'in_stock' || p.stockStatus === 'low_stock'));
    }

    // 5. Sorting
    switch (selectedSort) {
      case 'popularity':
        result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case 'price_asc':
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setVisibleCount(24);
  }, [products, searchQuery, selectedCategory, selectedSubcategory, selectedPriceRange, selectedSort, inStockOnly]);

  const categoriesList = [
    { name: 'Hand Tools', icon: Wrench, color: 'from-orange-500 to-amber-500', desc: 'Wrenches, spanners, planes, hammers' },
    { name: 'Power Tools & Accessories', icon: Hammer, color: 'from-blue-500 to-cyan-500', desc: 'Drills, circular saws, sanders' },
    { name: 'Safety Gears & PPE', icon: Shield, color: 'from-rose-500 to-pink-500', desc: 'Helmets, safety goggles, anti-cut gloves' },
    { name: 'Building Materials', icon: Layers, color: 'from-emerald-500 to-teal-500', desc: 'Cement, AAC blocks, waterproofing' },
    { name: 'Fasteners & Hardware', icon: Nut, color: 'from-purple-500 to-indigo-500', desc: 'Screws, hex bolts, anchors, wall plugs' },
    { name: 'Plumbing Supplies', icon: Droplet, color: 'from-sky-500 to-blue-500', desc: 'CPVC pipes, brass fittings, check valves' },
    { name: 'Electrical Infrastructure', icon: Zap, color: 'from-amber-500 to-yellow-500', desc: 'Copper wires, modular switches, MCBs' }
  ];

  return (
    <div className="min-h-screen pb-28 md:pb-12 bg-background text-foreground transition-colors duration-300">
      
      <Header 
        onCartToggle={() => setCartOpen(true)}
        onSearchChange={(val) => setSearchQuery(val)}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory(null);
        }}
        onSubcategorySelect={(sub) => setSelectedSubcategory(sub)}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Promotional Announcement Ticker */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-primary text-white p-3 px-4 sm:px-6 shadow-md flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-black">
              LIMITED TIME OFFER
            </span>
            <span>🎉 Grand Opening Special: Get <strong>10% OFF</strong> on Your First Order + <strong>FREE SHIPPING</strong>!</span>
          </div>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText('WELCOME10');
              alert('Coupon code WELCOME10 copied to clipboard! Apply at checkout for 10% OFF.');
            }}
            className="flex items-center gap-1.5 bg-white text-orange-600 hover:bg-slate-100 text-[11px] font-black px-3 py-1 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Use Code: WELCOME10</span>
          </button>
        </div>

        {/* Hero Promotional Offer Banner */}
        {selectedCategory === null && !searchQuery && (
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 text-white p-6 sm:p-10 mb-8 shadow-2xl min-h-[300px] flex items-center">
            {/* Background Generated Banner Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/banners/opening_offer.png"
                alt="Grand Opening Offer - 10% OFF + Free Shipping"
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />
            </div>

            <div className="relative z-20 flex flex-col justify-center max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full">
                  ⚡ New Customer Welcome Offer
                </span>
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider bg-emerald-400/15 border border-emerald-400/30 px-3 py-1 rounded-full">
                  🚚 Free Express Delivery
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 font-sans leading-tight">
                GET <span className="text-primary underline decoration-amber-400 decoration-4">10% OFF</span> YOUR FIRST HARDWARE ORDER
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed font-sans">
                Welcome to Abuzz Store! Enjoy an extra 10% instant discount on top of wholesale prices + 100% Free Shipping on your purchase of power tools, safety gear & hardware supplies.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('WELCOME10');
                    alert('Coupon WELCOME10 copied! Apply at checkout.');
                  }}
                  className="flex items-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-xs font-black shadow-lg shadow-primary/30 hover:bg-primary/95 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Claim 10% Offer (Code: WELCOME10)</span>
                </button>

                <button 
                  onClick={() => setSelectedCategory('Power Tools & Accessories')}
                  className="rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur text-white px-5 py-3 text-xs font-bold hover:bg-slate-800 transition-all min-h-[44px]"
                >
                  Explore Catalog
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Categories Visual Grid Bar */}
        {!selectedCategory && !searchQuery && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-black uppercase tracking-wider text-foreground">
                  Featured B2B Categories
                </h2>
                <p className="text-xs text-muted-foreground">Select an industrial hardware category to filter live inventory</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {categoriesList.map((cat) => {
                const Icon = cat.icon;
                const count = categoryCounts[cat.name] || 0;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className="group relative flex flex-col items-center justify-center p-3.5 rounded-2xl border border-border/80 bg-card hover:border-primary/60 hover-scale shadow-xs text-center transition-all cursor-pointer"
                  >
                    <div className={`rounded-2xl bg-gradient-to-br ${cat.color} p-3 text-white mb-2 shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xs font-black text-foreground line-clamp-1 leading-tight">{cat.name}</h3>
                    <span className="text-[9.5px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">
                      {count} items
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Toolbar & Catalog header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-extrabold text-foreground tracking-tight">
              {selectedCategory ? selectedCategory : 'All Hardware & Tools'}
            </h2>
            <span className="text-xs text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} items
            </span>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-foreground/5 transition-all md:hidden cursor-pointer"
          >
            <Filter className="h-4 w-4 text-primary" />
            <span>Filters</span>
          </button>
        </div>

        {/* Catalog Content Grid Layout */}
        <div className="flex gap-8">
          
          {/* Filters Sidebar (Desktop) / Backdrop Modal (Mobile) */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setSelectedSubcategory(null);
            }}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={setSelectedSubcategory}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={(range) => setSelectedPriceRange(range)}
            selectedSort={selectedSort}
            onSortChange={(sort) => setSelectedSort(sort)}
            inStockOnly={inStockOnly}
            onInStockOnlyChange={(val) => setInStockOnly(val)}
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-3xl bg-card/20 px-4">
                <Info className="h-12 w-12 text-muted-foreground/30 mb-3 stroke-[1.5]" />
                <h3 className="text-sm font-bold text-foreground">No products match your filters</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
                  Try typing a different search query, resetting categories, or showing out of stock items.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedSubcategory(null);
                    setSelectedPriceRange(null);
                    setInStockOnly(false);
                    setSelectedSort('popularity');
                  }}
                  className="mt-4 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={(p) => {
                        setQuickViewProduct(p);
                        setQuickViewQty(1);
                        setQuickViewActiveImg(p.imageUrl);
                      }}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 24)}
                      className="px-6 py-3 rounded-2xl bg-card border border-border text-foreground hover:bg-primary hover:text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Load More Products (Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length})
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* QUICK VIEW INTERACTIVE PRODUCT MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-card border border-border rounded-3xl p-6 shadow-2xl glass space-y-6 relative overflow-hidden">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 text-muted-foreground transition-colors cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              
              {/* Product Multi-Angle Images Gallery Column */}
              <div className="space-y-3">
                <div 
                  onMouseMove={handleQuickViewMouseMove}
                  onMouseEnter={() => setIsQuickViewHovered(true)}
                  onMouseLeave={() => setIsQuickViewHovered(false)}
                  onTouchStart={(e) => {
                    setIsQuickViewHovered(true);
                    handleQuickViewTouchMove(e);
                  }}
                  onTouchMove={handleQuickViewTouchMove}
                  onTouchEnd={() => setIsQuickViewHovered(false)}
                  onTouchCancel={() => setIsQuickViewHovered(false)}
                  className="aspect-square w-full rounded-2xl overflow-hidden border border-border bg-slate-900/60 relative cursor-crosshair select-none touch-none"
                >
                  <Image
                    src={quickViewActiveImg || quickViewProduct.imageUrl}
                    alt={quickViewProduct.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-150 ease-out"
                    style={{
                      transformOrigin: `${quickViewZoomPos.x}% ${quickViewZoomPos.y}%`,
                      transform: isQuickViewHovered ? 'scale(2.5)' : 'scale(1)'
                    }}
                  />
                  
                  {/* Floating Top-Right Overlay Actions (Wishlist Heart & Share) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (quickViewProduct) toggleWishlist(quickViewProduct);
                      }}
                      className={`flex items-center justify-center h-9 w-9 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-lg border ${
                        quickViewProduct && isInWishlist(quickViewProduct.id)
                          ? 'bg-rose-500 text-white border-rose-500 scale-105'
                          : 'bg-slate-950/70 hover:bg-slate-900 text-white border-white/20 hover:scale-105'
                      }`}
                      title={quickViewProduct && isInWishlist(quickViewProduct.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={`h-4 w-4 ${quickViewProduct && isInWishlist(quickViewProduct.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!quickViewProduct) return;
                        const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${quickViewProduct.id}` : `https://abuzz.store/product/${quickViewProduct.id}`;
                        const shareData = {
                          title: `${quickViewProduct.title} - Abuzz Store`,
                          text: `Check out ${quickViewProduct.title} on Abuzz Store! Price: ₹${quickViewProduct.price.toLocaleString('en-IN')}`,
                          url: shareUrl,
                        };

                        if (typeof navigator !== 'undefined' && navigator.share) {
                          try {
                            await navigator.share(shareData);
                            return;
                          } catch (err) {}
                        }

                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          try {
                            await navigator.clipboard.writeText(shareUrl);
                            setQuickViewShareCopied(true);
                            setTimeout(() => setQuickViewShareCopied(false), 2000);
                          } catch (err) {}
                        }
                      }}
                      className="relative flex items-center justify-center h-9 w-9 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
                      title="Share product link"
                    >
                      <Share2 className="h-4 w-4" />
                      {quickViewShareCopied && (
                        <span className="absolute -left-20 top-1 bg-slate-900 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xl border border-white/20 whitespace-nowrap animate-in fade-in">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Floating Hover / Touch Badge */}
                  <div className={`absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md text-white text-[10.5px] font-extrabold px-3 py-1.5 rounded-full border border-white/20 shadow-lg transition-opacity duration-200 pointer-events-none ${isQuickViewHovered ? 'opacity-0' : 'opacity-100'}`}>
                    <ZoomIn className="h-4 w-4 text-primary" />
                    <span>Drag Finger or Hover to Zoom</span>
                  </div>
                </div>

                {/* Thumbnails row */}
                {quickViewProduct.galleryImages && quickViewProduct.galleryImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {quickViewProduct.galleryImages.map((gImg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuickViewActiveImg(gImg)}
                        className={`h-14 w-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          quickViewActiveImg === gImg ? 'border-primary scale-105 shadow-md' : 'border-border opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={gImg} alt="Thumbnail angle" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Specifications & Quick Checkout Column */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase text-primary tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                      {quickViewProduct.category}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground">
                      SKU: {quickViewProduct.id}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-foreground tracking-tight leading-snug mb-2">
                    {quickViewProduct.title}
                  </h2>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current mr-1" />
                      <span>{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold">({quickViewProduct.reviewsCount} customer reviews)</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {quickViewProduct.description}
                  </p>

                  {/* Technical Specs Preview Pill */}
                  <div className="grid grid-cols-2 gap-2 text-[10.5px] p-3 rounded-2xl bg-foreground/5 border border-border/50 mb-4">
                    <div><strong className="text-muted-foreground uppercase font-bold">Material:</strong> <span className="text-foreground font-semibold">{quickViewProduct.specifications?.['Material'] || 'Industrial Steel'}</span></div>
                    <div><strong className="text-muted-foreground uppercase font-bold">Warranty:</strong> <span className="text-foreground font-semibold">{quickViewProduct.specifications?.['Warranty'] || '6 Months'}</span></div>
                    <div><strong className="text-muted-foreground uppercase font-bold">HSN Code:</strong> <span className="text-foreground font-semibold">{quickViewProduct.specifications?.['HSN Code'] || '8205'}</span></div>
                    <div><strong className="text-muted-foreground uppercase font-bold">GST Rate:</strong> <span className="text-emerald-500 font-bold">{quickViewProduct.specifications?.['GST Tax Rate'] || '18% (CGST + SGST)'}</span></div>
                  </div>

                  {/* Price */}
                  <div className="border-t border-border/40 pt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-foreground">
                      ₹{(quickViewProduct.price * quickViewQty).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold">
                      (₹{quickViewProduct.price.toLocaleString('en-IN')} / unit incl. GST)
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper & Add To Cart Button */}
                <div className="space-y-3 border-t border-border/40 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Order Quantity:</span>
                    <div className="flex items-center gap-2 bg-foreground/5 border border-border p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                        className="h-8 w-8 rounded-lg bg-background text-foreground font-bold hover:bg-foreground/10 transition-colors cursor-pointer flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-black text-sm">{quickViewQty}</span>
                      <button
                        type="button"
                        onClick={() => setQuickViewQty(quickViewQty + 1)}
                        className="h-8 w-8 rounded-lg bg-background text-foreground font-bold hover:bg-foreground/10 transition-colors cursor-pointer flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (quickViewProduct) {
                          addToCart(quickViewProduct, quickViewQty);
                          setQuickViewProduct(null);
                          setCartOpen(true);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary text-white py-3 text-xs font-extrabold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all cursor-pointer min-h-[44px]"
                    >
                      <ShoppingCart className="h-4 w-4" /> Add To Shopping Cart
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Sliding Cart Drawer Panel */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />

      {/* Sticky Bottom Navigation Bar (Mobile Devices Only) */}
      <MobileBottomNav 
        onCartToggle={() => setCartOpen(true)}
        onCategoriesClick={() => setMobileFiltersOpen(true)}
      />

    </div>
  );
}
