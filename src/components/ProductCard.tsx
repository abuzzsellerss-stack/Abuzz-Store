'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, Star, Check, Heart, Eye, Plus, Minus, ShieldCheck, Share2 } from 'lucide-react';
import { trackMetaEvent } from './MetaPixel';

import { formatImageUrl } from '../utils/imageHelper';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const router = useRouter();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeImg, setActiveImg] = useState(() => formatImageUrl(product.imageUrl));
  const [added, setAdded] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const isFavorite = isInWishlist(product.id);

  // Check if item is already in cart
  const cartItem = cartItems.find(item => item.product.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const galleryList = (product.galleryImages && product.galleryImages.length > 0)
    ? product.galleryImages.map(img => formatImageUrl(img))
    : [formatImageUrl(product.imageUrl)];

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    trackMetaEvent('AddToCart', {
      content_name: product.title,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'INR'
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };



  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, qtyInCart + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, qtyInCart - 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const handleShareProduct = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.id}` : `https://abuzz.store/product/${product.id}`;
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
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy share link:', err);
      }
    }
  };

  const getStockBadge = () => {
    switch (product.stockStatus) {
      case 'in_stock':
        return <span className="bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20">In Stock</span>;
      case 'low_stock':
        return <span className="bg-amber-500/10 text-amber-500 dark:text-amber-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/20 animate-pulse">Low Stock</span>;
      case 'out_of_stock':
        return <span className="bg-rose-500/10 text-rose-500 dark:text-rose-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-rose-500/20">Out of Stock</span>;
      default:
        return null;
    }
  };

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card hover-glow hover-scale glow-card cursor-pointer p-3.5 shadow-sm transition-all duration-300 block"
    >
      
      {/* Product Category, Stock & BIS Badges */}
      <div className="flex items-center justify-between gap-1 mb-2.5 z-10">
        <span className="text-[10px] font-black uppercase tracking-wider text-primary truncate max-w-[130px]">
          {product.subcategory}
        </span>
        {getStockBadge()}
      </div>

      {/* Main Image Viewport & Hover Overlay Actions */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900/60 mb-3 border border-border/40">
        <Image
          src={formatImageUrl(activeImg || product.imageUrl)}
          alt={product.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e: any) => {
            const target = e.target;
            if (target && target.src && !target.src.includes('ABBPS10_img1.jpg')) {
              setActiveImg('https://cdn.abuzz.store/products/ABBPS10_img1.jpg');
            }
          }}
        />


        {/* Floating Quick Action Overlay Buttons (Favorite Heart, Quick View & Share) */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-20">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`flex items-center justify-center h-8 w-8 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-md ${
              isFavorite 
                ? 'bg-rose-500 text-white scale-110' 
                : 'bg-background/80 text-foreground hover:bg-rose-500 hover:text-white'
            }`}
            title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleQuickViewClick}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
            title="Quick view product details"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleShareProduct}
            className="relative flex items-center justify-center h-8 w-8 rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
            title="Share product link"
          >
            <Share2 className="h-4 w-4" />
            {shareCopied && (
              <span className="absolute -top-7 right-0 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-in fade-in">
                Copied!
              </span>
            )}
          </button>
        </div>



        {/* Multi-Angle Gallery Hover Thumbnails Bar */}
        {galleryList.length > 1 && (
          <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1 bg-slate-950/75 backdrop-blur-md p-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            {galleryList.slice(0, 4).map((gImg, gIdx) => (
              <button
                key={gIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg(gImg);
                }}
                className={`h-5 w-5 rounded-md overflow-hidden border transition-all ${
                  activeImg === gImg ? 'border-primary scale-110 ring-1 ring-primary' : 'border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={gImg} alt="Thumbnail angle" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="flex items-center text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
          <Star className="h-3 w-3 fill-current mr-1" />
          <span className="text-[11px] font-black">{product.rating}</span>
        </div>
        <span className="text-[10.5px] text-muted-foreground font-semibold">({product.reviewsCount} reviews)</span>
      </div>

      {/* Title */}
      <h3 className="text-xs sm:text-sm font-extrabold text-foreground tracking-tight line-clamp-2 min-h-[38px] mb-2 leading-snug group-hover:text-primary transition-colors">
        {product.title}
      </h3>

      {/* Footer Info & Interactive Cart Button */}
      <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-border/50">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Wholesale Rate</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-foreground">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[9.5px] text-emerald-500 font-bold uppercase">Incl. GST</span>
          </div>
        </div>

        {/* Interactive Add to Cart OR Quantity Stepper Counter */}
        {qtyInCart > 0 ? (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 bg-primary/10 border border-primary/30 p-1 rounded-xl shadow-sm"
          >
            <button
              type="button"
              onClick={handleDecrement}
              className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold hover:bg-primary/95 transition-colors cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-black text-foreground">{qtyInCart}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold hover:bg-primary/95 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={product.stockStatus === 'out_of_stock'}
            className={`flex items-center justify-center gap-1.5 h-10 px-3.5 rounded-xl font-bold text-xs transition-all duration-300 shadow-md ${
              product.stockStatus === 'out_of_stock'
                ? 'bg-muted border border-border text-muted-foreground cursor-not-allowed'
                : added
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-primary text-white hover:bg-primary/95 hover:scale-105 shadow-primary/20 cursor-pointer'
            }`}
            title="Add to cart"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add</span>
              </>
            )}
          </button>
        )}
      </div>

    </Link>
  );
};
export default ProductCard;
