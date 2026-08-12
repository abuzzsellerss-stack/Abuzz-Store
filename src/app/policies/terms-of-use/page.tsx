'use client';

import React, { useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { MobileBottomNav } from '../../../components/MobileBottomNav';
import { CartDrawer } from '../../../components/CartDrawer';

export default function TermsOfUsePage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-background text-foreground transition-colors duration-300">
      <Header onCartToggle={() => setCartOpen(true)} />
      
      <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary mb-6 min-h-[44px]">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-md glass">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Terms of Use
            </h1>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-6 font-sans leading-relaxed">
            <p className="text-foreground font-semibold">
              Last Updated: July 15, 2026
            </p>
            <p>
              Welcome to Abuzz Store. By accessing or navigating this online platform, you agree to comply with and be bound by the following Terms of Use.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Account Responsibilities</h3>
            <p>
              When creating a profile on Abuzz Store (via email/password or Google Login), you are responsible for maintaining the confidentiality of credentials. You agree to accept liability for all cart purchases, reviews submitted, and settings changes saved under your account.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Intellectual Property Rights</h3>
            <p>
              All logo visuals, component styles, taxonomy arrangements, copy summaries, and icons displayed on this PWA platform are protected by copyrights and trademark guidelines owned by Abuzz Store Private Limited or partner brand entities.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Acceptable Platform Use</h3>
            <p>
              You agree not to scrape product prices, overload database instances with script agents, inject script overlays, attempt login overrides, or manipulate checkout tax arrays. Violation of platform integrity will result in instant account block and law enforcement reporting.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">4. User Content Permissions</h3>
            <p>
              By posting comments, product ratings, or support query files, you grant Abuzz Store a non-exclusive, royalty-free, perpetual license to display, translate, and moderate these reviews.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">5. Service Availability</h3>
            <p>
              While we optimize our Progressive Web App (PWA) to operate offline and sync cache cleanly, we do not guarantee uninterrupted server availability. We reserve rights to modify catalogs, alter categories, and block services without prior notification.
            </p>
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
