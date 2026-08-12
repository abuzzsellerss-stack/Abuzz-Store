'use client';

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { MobileBottomNav } from '../../../components/MobileBottomNav';
import { CartDrawer } from '../../../components/CartDrawer';

export default function BisCertificationPage() {
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
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Products Under Compulsory BIS Certification
            </h1>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-6 font-sans leading-relaxed">
            <p className="text-foreground font-semibold">
              Legal Quality Mandates for Industrial and Construction Supplies
            </p>
            <p>
              Under the BIS Act, the Central Government of India mandates compulsory certification for specific product categories in the interest of public health, safety, and infrastructure security. These items cannot be manufactured, imported, or sold in Indian markets without a valid ISI mark.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Compulsory Certified Categories at Abuzz Store</h3>
            <p>
              Many products distributed across our catalog fall under this mandatory certification regime. We ensure full compliance for the following segments:
            </p>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-2xl bg-slate-500/5 border border-border/40">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">1. Cement & Concrete Bindings</h4>
                <p className="text-xs leading-normal">
                  All Ordinary Portland Cement (OPC Grade 33, 43, 53) and Portland Pozzolana Cement (PPC) are legally bound to hold ISI certifications under standard IS 269 and IS 1489.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-500/5 border border-border/40">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">2. Electrical Cables & House Wires</h4>
                <p className="text-xs leading-normal">
                  PVC insulated electrical cables and flexible copper household lines (IS 694) are strictly audited. Non-certified wires pose high fire hazards and are banned from our listings.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-500/5 border border-border/40">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">3. Personal Protective Equipment (PPE)</h4>
                <p className="text-xs leading-normal">
                  Safety shoes (IS 15298), protective eyewear, respiratory masks, and construction safety helmets (IS 2925) must carry the ISI certification mark.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-500/5 border border-border/40">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide mb-1">4. Steel Rebars & Structural Sections</h4>
                <p className="text-xs leading-normal">
                  High-strength deformed steel bars (TMT bars) used for concrete reinforcement are legally required to comply with IS 1786.
                </p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">How Abuzz Store Guarantees Compliance</h3>
            <p>
              When onboarding industrial manufacturing partners, our quality control team demands a valid Copy of license (CoL) containing active ISI certification schedules. Regular warehouse audits verify standard markings on all material batches.
            </p>
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
