'use client';

import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { MobileBottomNav } from '../../../components/MobileBottomNav';
import { CartDrawer } from '../../../components/CartDrawer';

export default function ReportAbusePage() {
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
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Abuse & Takedown Policy
            </h1>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-6 font-sans leading-relaxed">
            <p className="text-foreground font-semibold">
              Last Updated: July 15, 2026
            </p>
            <p>
              Abuzz Store holds zero tolerance for counterfeit merchandise, intellectual property violations, or listing misinformation. We review and act upon all genuine abuse reports.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Counterfeit & Brand Protection</h3>
            <p>
              We guarantee that all tools, cement, infrastructure cables, and valves seeded in our stock catalog are 100% genuine and sourced directly from brands or their certified regional distributors. If you believe a product listed violates trademark parameters, please report it immediately.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Submission Requirements</h3>
            <p>
              To file a formal takedown request, submit a notice containing:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3 text-xs">
              <li>Exact URL link of the item listing.</li>
              <li>Identification of the copyrighted work or trademark allegedly violated.</li>
              <li>Your business coordinates and legal power-of-attorney files if filing on behalf of a brand.</li>
              <li>A declaration stating that the report is filed in good faith.</li>
            </ul>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Action & Timelines</h3>
            <p>
              Upon receiving a valid report, our trust team immediately isolates the disputed listing from the catalog and conducts a structural audit. Actions, including removal or validation edits, are finalized within 48-72 business hours.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">4. File a Report</h3>
            <p>
              Email legal notices directly to <span className="text-primary font-semibold">trust@abuzz-store.com</span>.
            </p>
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
