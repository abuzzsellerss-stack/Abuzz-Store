'use client';

import React, { useState } from 'react';
import { ArrowLeft, Map } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CartDrawer } from '../../components/CartDrawer';
import { CATEGORIES_DATA } from '../../constants/categories';

export default function SitemapPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-background text-foreground transition-colors duration-300">
      <Header onCartToggle={() => setCartOpen(true)} />
      
      <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary mb-6 min-h-[44px]">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-md glass space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border pb-6">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Map className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
                Store Sitemap
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Navigate Abuzz Store departments and documentation.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Core Portals */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Core Pages</h3>
              <ul className="space-y-2 text-xs font-semibold text-muted-foreground font-sans">
                <li><Link href="/" className="hover:text-foreground">Home Catalog</Link></li>
                <li><Link href="/auth" className="hover:text-foreground">Sign In / Sign Up</Link></li>
                <li><Link href="/profile" className="hover:text-foreground">Customer Dashboard</Link></li>
                <li><Link href="/checkout" className="hover:text-foreground">Secure Checkout</Link></li>
                <li><Link href="/faq" className="hover:text-foreground">FAQ Support</Link></li>
              </ul>
            </div>

            {/* Column 2: Categories Taxonomy */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Departments</h3>
              <ul className="space-y-2 text-xs font-semibold text-muted-foreground font-sans">
                {CATEGORIES_DATA.map((cat) => (
                  <li key={cat.name}>
                    <span className="text-foreground font-bold">{cat.name}</span>
                    <ul className="pl-3 mt-1.5 space-y-1 text-[10px] text-muted-foreground">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <span className="hover:text-primary">• {sub.name}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Policy Documentation */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Policies & Info</h3>
              <ul className="space-y-2 text-xs font-semibold text-muted-foreground font-sans">
                <li><Link href="/policies/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/policies/terms-of-sale" className="hover:text-foreground">Terms of Sale</Link></li>
                <li><Link href="/policies/terms-of-use" className="hover:text-foreground">Terms of Use</Link></li>
                <li><Link href="/policies/report-abuse" className="hover:text-foreground">Report Abuse & Takedown</Link></li>
                <li><Link href="/policies/bis-standard" className="hover:text-foreground">Know Your BIS Standard</Link></li>
                <li><Link href="/policies/bis-certification" className="hover:text-foreground">Compulsory BIS Products</Link></li>
                <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
              </ul>
            </div>

          </div>

        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
