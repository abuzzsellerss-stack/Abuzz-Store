'use client';

import React from 'react';
import { X, Wrench, Hammer, Nut, Shield, ArrowUpDown, Filter, DollarSign, Layers, Droplet, Zap, ChevronRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../constants/categories';

interface FilterSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedSubcategory: string | null;
  onSubcategoryChange: (subcategory: string | null) => void;
  selectedPriceRange: string | null;
  onPriceRangeChange: (range: string | null) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (val: boolean) => void;
  isOpen: boolean; // For mobile sheet overlay state
  onClose: () => void; // For mobile sheet close handler
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedSort,
  onSortChange,
  inStockOnly,
  onInStockOnlyChange,
  isOpen,
  onClose
}) => {
  const categoryIcons: Record<string, React.ComponentType<any>> = {
    'Hand Tools': Wrench,
    'Power Tools & Accessories': Hammer,
    'Safety Gears & PPE': Shield,
    'Building Materials': Layers,
    'Fasteners & Hardware': Nut,
    'Plumbing Supplies': Droplet,
    'Electrical Infrastructure': Zap
  };

  const priceRanges = [
    { label: 'All Prices', val: null },
    { label: 'Under ₹499', val: 'under_499' },
    { label: '₹499 to ₹1,999', val: '499_1999' },
    { label: '₹2,000 to ₹4,999', val: '2000_4999' },
    { label: 'Over ₹5,000', val: 'over_5000' },
  ];

  const sortOptions = [
    { label: 'Popularity (Featured)', val: 'popularity' },
    { label: 'Price: Low to High', val: 'price_asc' },
    { label: 'Price: High to Low', val: 'price_desc' },
    { label: 'Customer Rating', val: 'rating' },
  ];

  const sidebarContent = (
    <div className="flex flex-col gap-6 p-4 md:p-0 h-full">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 md:hidden">
        <h3 className="text-base font-extrabold flex items-center gap-1.5 text-foreground">
          <Filter className="h-4 w-4 text-primary" /> Filter & Sort
        </h3>
        <button 
          onClick={onClose}
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-foreground/5 text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Sorting Options */}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
          <ArrowUpDown className="h-3.5 w-3.5 text-primary" /> Sort Catalog
        </h4>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.val}
              onClick={() => onSortChange(opt.val)}
              className={`w-full text-left rounded-xl px-3 py-2 text-sm font-semibold transition-all min-h-[44px] ${
                selectedSort === opt.val
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground hover:bg-foreground/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories filter */}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
          <Filter className="h-3.5 w-3.5 text-primary" /> Categories
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => {
              onCategoryChange(null);
              onSubcategoryChange(null);
            }}
            className={`w-full text-left rounded-xl px-3 py-2 text-sm font-semibold transition-all min-h-[44px] ${
              selectedCategory === null
                ? 'bg-primary text-white shadow-md shadow-primary/10'
                : 'text-foreground hover:bg-foreground/5'
            }`}
          >
            All Catalog
          </button>
          {CATEGORIES_DATA.map((cat) => {
            const Icon = categoryIcons[cat.name] || Wrench;
            const isSelected = selectedCategory === cat.name;
            return (
              <div key={cat.name} className="space-y-1">
                <button
                  onClick={() => {
                    onCategoryChange(cat.name);
                    onSubcategoryChange(null);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-all min-h-[44px] ${
                    isSelected
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{cat.name}</span>
                  </div>
                  {isSelected && <ChevronRight className="h-3.5 w-3.5 text-primary" />}
                </button>
                
                {/* Render subcategories if selected */}
                {isSelected && (
                  <div className="pl-6 pr-2 py-1 space-y-1 border-l border-primary/20 ml-5 animate-in slide-in-from-top-2 duration-200">
                    {cat.subcategories.map((sub) => {
                      const isSubSelected = selectedSubcategory === sub.name;
                      return (
                        <button
                          key={sub.name}
                          onClick={() => onSubcategoryChange(isSubSelected ? null : sub.name)}
                          className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                            isSubSelected
                              ? 'bg-primary text-white font-extrabold shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                          }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Filtering */}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5 text-primary" /> Price Range
        </h4>
        <div className="space-y-1">
          {priceRanges.map((range) => {
            const isSelected = selectedPriceRange === range.val;
            return (
              <button
                key={range.label}
                onClick={() => onPriceRangeChange(range.val)}
                className={`w-full text-left rounded-xl px-3 py-2 text-sm font-semibold transition-all min-h-[44px] ${
                  isSelected
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-foreground hover:bg-foreground/5'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="border-t border-border/40 pt-4 mt-2">
        <label className="flex items-center gap-3 cursor-pointer min-h-[44px] select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
            className="h-5 w-5 rounded border-border text-primary focus:ring-primary bg-background cursor-pointer accent-primary"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">In Stock Only</span>
            <span className="text-[10px] text-muted-foreground">Excludes out of stock items</span>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (inline, always visible on md+) */}
      <aside className="hidden md:block w-64 shrink-0 rounded-2xl border border-border bg-card p-5 shadow-sm sticky top-24 self-start h-[calc(100vh-140px)] overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (overlay slide-up sheet on mobile) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
          />
          {/* Drawer content panel */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl border-t border-border bg-card shadow-2xl overflow-y-auto z-10 transition-transform duration-300 transform translate-y-0 pb-16">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
export default FilterSidebar;
