'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '../../../utils/seed';
import { getAdminProducts } from '../../../utils/adminMockData';
import { Product } from '../../../types';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { db, isMock } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, ShoppingCart, Star, Check, ShieldAlert, Truck, RotateCcw, Plus, Minus, ZoomIn, Maximize2, X, Heart, Bell, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../../components/Header';
import { MobileBottomNav } from '../../../components/MobileBottomNav';
import { CartDrawer } from '../../../components/CartDrawer';
import { ProductCard } from '../../../components/ProductCard';
import { trackMetaEvent } from '../../../components/MetaPixel';
import { formatImageUrl } from '../../../utils/imageHelper';



interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export default function ProductDetailClient() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, openOneClickModal } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('8');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  
  // In-place cursor hover magnification zoom states
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((touch.clientX - left) / width) * 100));
      const y = Math.max(0, Math.min(100, ((touch.clientY - top) / height) * 100));
      setZoomPos({ x, y });
    }
  };

  const handleShareProduct = async () => {
    if (!product) return;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://abuzz.store/product/${product.id}`;
    const shareData = {
      title: `${product.title} - Abuzz Store`,
      text: `Check out ${product.title} on Abuzz Store! Price: ₹${product.price.toLocaleString('en-IN')}`,
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share blocked, fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy share link:', err);
      }
    }
  };

  const [restockEmail, setRestockEmail] = useState('');
  const [restockSubmitted, setRestockSubmitted] = useState(false);

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      name: 'Rohan Deshmukh',
      rating: 5,
      date: 'July 10, 2026',
      title: 'Absolutely worth the price!',
      comment: 'Very robust build quality. I have been using it on my construction jobsite for the past two weeks and it operates flawlessly. Delivery was exceptionally fast.',
      verified: true
    },
    {
      id: 'rev-2',
      name: 'Arjun Mehta',
      rating: 4,
      date: 'June 30, 2026',
      title: 'Highly reliable, good value',
      comment: 'Great value for money. Built standard conforms to BIS. The grip comfort is excellent, though it is slightly heavier than expected. Highly recommended.',
      verified: true
    },
    {
      id: 'rev-3',
      name: 'Sneha Patel',
      rating: 5,
      date: 'June 18, 2026',
      title: 'Premium Quality Supplies',
      comment: 'Matches the description perfectly. I checked the ISI CM/L certification number and it is verified active. Customer service helped with GST invoice setups.',
      verified: true
    }
  ]);

  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName || 'Anonymous Customer',
      rating: newRating,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: newTitle || 'Good Product',
      comment: newComment,
      verified: true
    };
    setReviews([newRev, ...reviews]);
    setNewName('');
    setNewTitle('');
    setNewComment('');
    setNewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 2500);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const catalog = getAdminProducts(MOCK_PRODUCTS);
      const safeDocId = (id as string).replace(/\//g, '_');

      // Step 1: Serve from local catalog IMMEDIATELY (no network wait)
      const localProduct = catalog.find(p => p.id === id || p.id === safeDocId);
      if (localProduct && localProduct.isActive !== false) {
        setProduct(localProduct);
        setLoading(false);
        // Step 2: Optionally enrich from Firestore in background (non-blocking)
        if (!isMock && db) {
          try {
            const docRef = doc(db, 'products', safeDocId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data() as Product;
              setProduct({
                ...data,
                id: docSnap.id,
                imageUrl: formatImageUrl(data.imageUrl),
                galleryImages: (data.galleryImages || []).map(img => formatImageUrl(img))
              });
            }
          } catch {
            // Firestore unreachable — local data already shown, no action needed
          }
        }
        return;
      }

      // Step 3: Product not in local catalog — try Firestore as fallback
      try {
        if (!isMock && db) {
          const docRef = doc(db, 'products', safeDocId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as Product;
            setProduct({
              ...data,
              id: docSnap.id,
              imageUrl: formatImageUrl(data.imageUrl),
              galleryImages: (data.galleryImages || []).map(img => formatImageUrl(img))
            });
          } else {
            setError("Product not found");
          }
        } else {

          setError("Product not found");
        }
      } catch (err: any) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {

      trackMetaEvent('ViewContent', {
        content_name: product.title,
        content_category: product.category,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price,
        currency: 'INR'
      });
    }
  }, [product]);

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    trackMetaEvent('AddToCart', {
      content_name: product.title,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price * quantity,
      currency: 'INR'
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    trackMetaEvent('AddToCart', {
      content_name: product.title,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price * quantity,
      currency: 'INR'
    });
    openOneClickModal(product, quantity);
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground font-semibold">Loading product specifications...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
        <ShieldAlert className="h-16 w-16 text-red-500 mb-4 stroke-[1.5]" />
        <h2 className="text-xl font-extrabold text-foreground mb-1">Product Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
          {error || "The requested item is currently unavailable in our catalogs."}
        </p>
        <Link 
          href="/" 
          className="rounded-xl bg-primary text-white px-6 py-3 text-xs font-bold shadow-md hover:bg-primary/95 transition-all"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const jsonLd = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.imageUrl,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.specifications?.['Brand'] || 'Abuzz',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stockStatus !== 'out_of_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://abuzz.store/product/${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.8,
      reviewCount: product.reviewsCount || 24,
    },
  } : null;

  return (
    <div className="min-h-screen pb-28 md:pb-12 bg-background text-foreground transition-colors duration-300">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      {/* Top Header Navigation */}
      <Header 
        onCartToggle={() => setCartOpen(true)}
      />

      <main className="mx-auto max-w-5xl px-4 py-6 md:py-10">
        
        {/* Navigation breadcrumbs and back button */}
        <div className="flex flex-col gap-4 mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary min-h-[44px] self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back to listings
          </button>
          
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Link href="/" className="hover:text-primary">Catalog</Link>
            <span>/</span>
            <span className="hover:text-primary">{product.category}</span>
            <span>/</span>
            <span className="text-foreground font-extrabold line-clamp-1">{product.subcategory}</span>
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-card border border-border rounded-3xl p-4 sm:p-8 shadow-md glass mb-10">
          
          {/* Column Left: Image Container */}
          <div className="flex flex-col gap-4">
            <div 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={(e) => {
                setIsHovered(true);
                handleTouchMove(e);
              }}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setIsHovered(false)}
              onTouchCancel={() => setIsHovered(false)}
              className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-border/60 cursor-crosshair shadow-sm select-none touch-none"
            >
              <Image
                src={formatImageUrl(selectedImage || product.imageUrl)}
                alt={product.title}
                fill
                unoptimized
                priority
                className="object-cover transition-transform duration-150 ease-out"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isHovered ? 'scale(2.5)' : 'scale(1)'
                }}
                onError={(e: any) => {
                  const target = e.target;
                  if (target && target.src && !target.src.includes('ABBPS10_img1.jpg')) {
                    setSelectedImage('https://cdn.abuzz.store/products/ABBPS10_img1.jpg');
                  }
                }}
              />


              {/* Floating Top-Right Overlay Actions (Wishlist Heart & Share Send) */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product) toggleWishlist(product);
                  }}
                  className={`flex items-center justify-center h-10 w-10 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-lg border ${
                    product && isInWishlist(product.id)
                      ? 'bg-rose-500 text-white border-rose-500 scale-105'
                      : 'bg-slate-950/70 hover:bg-slate-900 text-white border-white/20 hover:scale-105'
                  }`}
                  title={product && isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`h-5 w-5 ${product && isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareProduct();
                  }}
                  className="relative flex items-center justify-center h-10 w-10 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
                  title="Share product link"
                >
                  <Share2 className="h-5 w-5" />
                  {shareCopied && (
                    <span className="absolute -left-20 top-1.5 bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xl border border-white/20 whitespace-nowrap animate-in fade-in">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Floating Hover / Touch Badge */}
              <div className={`absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md text-white text-[10.5px] font-extrabold px-3 py-1.5 rounded-full border border-white/20 shadow-lg transition-opacity duration-200 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                <ZoomIn className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Drag Finger or Hover to Zoom</span>
                <span className="sm:hidden">Touch to Zoom</span>
              </div>
            </div>

            {/* Gallery Thumbnail Carousel */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {product.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative h-16 w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      (selectedImage || product.imageUrl) === imgUrl
                        ? 'border-primary ring-2 ring-primary/20 scale-105'
                        : 'border-border opacity-70 hover:opacity-100'
                    }`}
                    title={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={formatImageUrl(imgUrl)}
                      alt={`${product.title} photo ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column Right: Info Pane */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Badges & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                  product.stockStatus === 'in_stock' 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : product.stockStatus === 'low_stock' 
                    ? 'bg-amber-500/10 text-amber-500' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {product.stockStatus === 'in_stock' ? 'In Stock' : product.stockStatus === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                </span>
                
                <div className="flex items-center gap-1">
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-3">
                {product.title}
              </h1>
              
              <div className="text-2xl sm:text-3xl font-black text-primary mb-5">
                ₹{product.price.toLocaleString('en-IN')}
              </div>

              {/* Description */}
              <div className="border-t border-border/40 pt-4 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
                <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>

              {/* Shoe Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="border-t border-border/40 pt-4 mb-5">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select Shoe Size (UK / IND)</h4>
                    <span className="text-[10px] text-primary font-extrabold uppercase bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                      Selected: Size {selectedSize}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`h-11 w-12 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center border-2 ${
                          selectedSize === sz
                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105'
                            : 'bg-background text-foreground border-border hover:border-primary/50'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions Panel */}
            <div className="border-t border-border/40 pt-6 space-y-4">
              {product.stockStatus !== 'out_of_stock' ? (
                <div className="space-y-3">
                  
                  {/* ADD TO CART Container with Quantity Controls */}
                  <div className="flex items-center gap-2 border border-pink-200 dark:border-pink-900/50 rounded-2xl bg-pink-100/70 dark:bg-pink-950/40 p-1 min-h-[52px] shadow-sm">
                    {/* ADD TO CART Main Label */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 text-pink-900 dark:text-pink-100 font-extrabold text-xs tracking-widest uppercase py-3 px-4 hover:opacity-90 transition-all cursor-pointer"
                    >
                      {added ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-500" />
                          <span>ADDED TO CART</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          <span>ADD TO CART</span>
                        </>
                      )}
                    </button>

                    {/* Quantity Control Side Container */}
                    <div className="flex items-center gap-1 border-l border-pink-200 dark:border-pink-900/60 pl-2 pr-1 shrink-0 bg-white/60 dark:bg-slate-900/60 rounded-xl py-1">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 text-foreground transition-colors disabled:opacity-30 cursor-pointer"
                        disabled={quantity <= 1}
                        title="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-xs font-black text-foreground w-5 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* BUY IT NOW Full-Width Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-pink-200 hover:bg-pink-300/90 text-pink-950 font-black text-xs uppercase tracking-widest min-h-[52px] transition-all shadow-md cursor-pointer border border-pink-300/50"
                  >
                    <span>BUY IT NOW</span>
                  </button>

                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold text-xs">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span>Temporarily Sold Out</span>
                    </div>
                    <button
                      onClick={() => product && toggleWishlist(product)}
                      className="text-[11px] underline font-extrabold hover:opacity-80"
                    >
                      {product && isInWishlist(product.id) ? 'In Wishlist' : '+ Add to Wishlist'}
                    </button>
                  </div>

                  {restockSubmitted ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold text-center">
                      ✓ We will email you the moment stock arrives!
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (restockEmail) setRestockSubmitted(true);
                      }}
                      className="flex items-center gap-2"
                    >
                      <input 
                        type="email" 
                        required
                        placeholder="Enter email for restock alert..."
                        value={restockEmail}
                        onChange={(e) => setRestockEmail(e.target.value)}
                        className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-primary text-white text-xs font-bold px-4 py-2.5 hover:bg-primary/95 min-h-[44px]"
                      >
                        Notify Me
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Technical Trust badging layout */}
              <div className="grid grid-cols-3 gap-2 border-t border-border/30 pt-4 text-center">
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-500/5">
                  <Truck className="h-5 w-5 text-primary mb-1" />
                  <span className="text-[9px] font-bold text-foreground">Free Delivery</span>
                  <span className="text-[8px] text-muted-foreground mt-0.5">Orders over ₹1,000</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-500/5">
                  <RotateCcw className="h-5 w-5 text-primary mb-1" />
                  <span className="text-[9px] font-bold text-foreground">7-Day Returns</span>
                  <span className="text-[8px] text-muted-foreground mt-0.5">Easy returns box</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-500/5">
                  <Star className="h-5 w-5 text-primary mb-1" />
                  <span className="text-[9px] font-bold text-foreground">100% Genuine</span>
                  <span className="text-[8px] text-muted-foreground mt-0.5">Brand warranty</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-md glass">
          <h3 className="text-base font-extrabold text-foreground uppercase tracking-wider mb-4 border-b border-border pb-3">
            Technical Specifications
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <tbody>
                {Object.entries(product.specifications).map(([key, val], index) => (
                  <tr 
                    key={key}
                    className={`border-b border-border/35 last:border-0 ${
                      index % 2 === 0 ? 'bg-foreground/2' : 'bg-transparent'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-muted-foreground w-1/3 text-xs uppercase tracking-wider">{key}</td>
                    <td className="py-3 px-4 font-medium text-foreground">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews & Ratings Section */}
        <div className="mt-8 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-md glass">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-4 mb-6 gap-4">
            <div>
              <h3 className="text-base font-extrabold text-foreground uppercase tracking-wider">
                Customer Reviews
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">Real feedback from verified purchasers</p>
            </div>
            
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="rounded-xl border border-primary text-primary text-xs font-bold px-4 py-2.5 hover:bg-primary/5 transition-all min-h-[44px]"
            >
              {showReviewForm ? 'Close Form' : 'Write a Review'}
            </button>
          </div>

          {/* Overall Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-border/30 pb-6 mb-6">
            <div className="flex flex-col items-center justify-center p-4 bg-slate-500/5 rounded-2xl text-center">
              <span className="text-4xl font-black text-foreground">{product.rating}</span>
              <div className="flex items-center gap-0.5 my-1.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4.5 w-4.5 ${
                      i < Math.round(product.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                {reviews.length} Customer Ratings
              </span>
            </div>

            {/* Distribution bars */}
            <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
              {[
                { stars: 5, pct: 75 },
                { stars: 4, pct: 18 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 2 },
                { stars: 1, pct: 1 }
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-8 text-right font-bold text-muted-foreground shrink-0">{row.stars} Star</span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${row.pct}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-muted-foreground text-right shrink-0">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-8 p-5 rounded-2xl bg-slate-500/5 border border-border/40 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-foreground">Share Your Experience</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Review Title</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Excellent build quality!"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-2">Overall Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                      title={`${star} Star Rating`}
                    >
                      <Star 
                        className={`h-6 w-6 transition-colors ${
                          star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-slate-300 dark:text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Review</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Explain quality, build parameters, shipping comfort..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none font-sans"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl bg-primary text-white text-xs font-bold px-6 py-3 shadow-md hover:bg-primary/95 transition-all min-h-[44px]"
              >
                Submit Review
              </button>

              {reviewSubmitted && (
                <div className="text-[10px] text-emerald-500 font-bold text-center mt-2">
                  Thank you! Your verified purchase review has been published.
                </div>
              )}
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="p-5 rounded-2xl bg-background/40 border border-border/40 space-y-2.5 hover:bg-background/60 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{rev.name}</span>
                    {rev.verified && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-md">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-foreground ml-1.5">{rev.title}</span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-sans">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related / Recommended Products Section */}
        {product && (
          <div className="mt-12 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-md glass">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div>
                <h3 className="text-base font-extrabold text-foreground uppercase tracking-wider">
                  Related Products
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Top-rated items in {product.category}</p>
              </div>
              <Link
                href="/"
                className="text-xs font-extrabold text-primary hover:underline"
              >
                View Full Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getAdminProducts(MOCK_PRODUCTS).filter(p => p.category === product.category && p.id !== product.id && p.isActive !== false)
                .slice(0, 4)
                .map((relProd) => (
                  <ProductCard key={relProd.id} product={relProd} />
                ))}
            </div>
          </div>
        )}

      </main>

      {/* Sliding Cart Drawer Panel */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />

      {/* Sticky Bottom Navigation Bar */}
      <MobileBottomNav 
        onCartToggle={() => setCartOpen(true)}
      />

    </div>
  );
}
