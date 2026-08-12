'use client';

import React, { useState } from 'react';
import { ArrowLeft, Award } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { MobileBottomNav } from '../../../components/MobileBottomNav';
import { CartDrawer } from '../../../components/CartDrawer';

export default function BisStandardPage() {
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
              <Award className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Know Your BIS Standard
            </h1>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-6 font-sans leading-relaxed">
            <p className="text-foreground font-semibold">
              Bureau of Indian Standards (BIS) Quality Guidelines
            </p>
            <p>
              At Abuzz Store, compliance with national quality benchmarks is absolute. The Bureau of Indian Standards (BIS) is the National Standards Body of India, responsible for the harmonious development of activities of standardization, marking, and quality certification of goods.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">1. The ISI Certification Mark</h3>
            <p>
              The ISI mark is a conformity marking for industrial products in India. The mark certifies that a product conforms to an Indian Standard (IS) developed by BIS. For construction materials like cement, structural steel, and wiring cables, purchasing ISI certified items is mandatory by law to guarantee building stability.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Crucial Standard Codes for Hardware</h3>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>IS 1489 (Part 1 & 2):</strong> Standard parameters for Portland Pozzolana Cement (PPC).
              </li>
              <li>
                <strong>IS 694:</strong> Quality guidelines for PVC insulated copper cables and electrical wires up to 1100V.
              </li>
              <li>
                <strong>IS 2925:</strong> Safety parameters for industrial protective helmets (Safety Helmets).
              </li>
              <li>
                <strong>IS 15298:</strong> Performance requirements for safety footwear (PPE shoes).
              </li>
            </ul>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">3. How to Verify BIS Certifications</h3>
            <p>
              Every certified product carries a unique License Number (CM/L-xxxxxxxxxx) alongside the ISI logo. Customers can verify license status directly on the BIS Care Mobile Application or the official BIS online portal by inputting the license number to cross-examine validity.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">4. Our Commitment</h3>
            <p>
              Abuzz Store coordinates audits with manufacturers to verify that products listed under compulsory certification schemes hold active, verified BIS licenses. We refuse stock list entry for uncertified or substandard industrial supplies.
            </p>
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
