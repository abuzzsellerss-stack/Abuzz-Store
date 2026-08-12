'use client';

import React, { useState } from 'react';
import { ArrowLeft, Landmark, Heart, Building, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CartDrawer } from '../../components/CartDrawer';

export default function AboutPage() {
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
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
                About Abuzz Store
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Empowering Indian builders, industries, and DIY creators.</p>
            </div>
          </div>

          {/* Intro Story */}
          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4 font-sans leading-relaxed">
            <p className="text-sm text-foreground/90 font-medium">
              Abuzz Store was founded with a singular focus: resolving supply-chain complexities in the Indian construction and tooling industry.
            </p>
            <p>
              Before Abuzz, contractors and builders had to visit dozens of unorganized market stalls to compare tool pricing, verify standard ISI certifications, and source genuine accessories. We centralized this ecosystem into a Progressive Web App (PWA) that allows users to source materials directly from construction sites.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="p-5 rounded-2xl bg-slate-500/5 border border-border/40 space-y-2">
              <Heart className="h-5 w-5 text-primary" />
              <h4 className="text-xs font-bold text-foreground uppercase">100% Genuine</h4>
              <p className="text-[11px] text-muted-foreground leading-normal">
                Direct partnerships with elite global brands (DeWalt, Bosch, Makita, Astral) ensure authentic warranties.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-500/5 border border-border/40 space-y-2">
              <Building className="h-5 w-5 text-primary" />
              <h4 className="text-xs font-bold text-foreground uppercase">Fulfillment Hubs</h4>
              <p className="text-[11px] text-muted-foreground leading-normal">
                State-of-the-art warehouses located in major metropolitan areas coordinate fast deliveries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-500/5 border border-border/40 space-y-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h4 className="text-xs font-bold text-foreground uppercase">Quality Audits</h4>
              <p className="text-[11px] text-muted-foreground leading-normal">
                Batch validation verifies that mandatory materials conform strictly to Bureau of Indian Standards parameters.
              </p>
            </div>
          </div>

          {/* Corporate Stats */}
          <div className="border-t border-border pt-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Our Scale</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-black text-foreground">15,000+</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">Orders Completed</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-foreground">150+</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">Partner Brands</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-foreground">12+</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">Fulfillment Centers</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
