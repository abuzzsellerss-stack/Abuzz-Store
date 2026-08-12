'use client';

import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { MobileBottomNav } from '../../../components/MobileBottomNav';
import { CartDrawer } from '../../../components/CartDrawer';

export default function TermsOfSalePage() {
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
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Terms of Sale
            </h1>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-6 font-sans leading-relaxed">
            <p className="text-foreground font-semibold">
              Last Updated: July 15, 2026
            </p>
            <p>
              These Terms of Sale govern all purchase transactions completed on the Abuzz Store online web platform. By placing an order, you agree to these legal conditions.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">1. GST & Pricing</h3>
            <p>
              All prices listed on the site are in Indian Rupees (INR). Prices are subject to changes according to manufacturer updates. Unless stated otherwise, prices do not include GST. An 18% GST calculation is applied upon checkout and items listed on the invoice.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">2. Shipping & Freight</h3>
            <p>
              Free delivery applies to standard tool orders exceeding ₹1,000. Heavy construction loads (such as bulk cement or steel rods) may require customized freight logistics charges, which will be estimated upon shipment scheduling. Delivery periods are estimations and may vary based on structural delays.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Return and Replacement Guidelines</h3>
            <p>
              Items in unused condition can be returned within 7 days of shipment receipt. We offer replacements or complete check refunds if products are returned in original box packing. Note that custom structural cuts or special building components are non-returnable.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">4. Manufacturer Warranties</h3>
            <p>
              All power tools and equipment hold standard original warranties backed by manufacturers (such as DeWalt, Makita, Bosch). We assist customers in filing claims with authorized brand service stations in India.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">5. Order Cancellations</h3>
            <p>
              Orders can be cancelled before dispatch without cancellation fees. Dispatched items will incur return logistics fees.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">6. Dispute Settlement</h3>
            <p>
              Any disputes arising from purchase transactions are subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
