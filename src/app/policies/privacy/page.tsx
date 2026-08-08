'use client';

import React, { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../../components/Header';
import { MobileBottomNav } from '../../../components/MobileBottomNav';
import { CartDrawer } from '../../../components/CartDrawer';

export default function PrivacyPolicyPage() {
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
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Privacy Policy
            </h1>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-6 font-sans leading-relaxed">
            <p className="text-foreground font-semibold">
              Last Updated: July 15, 2026
            </p>
            <p>
              Abuzz Store Private Limited ("we", "our", or "Abuzz Store") values your privacy. This Privacy Policy details how we collect, handle, use, and share your personal data when you interact with our e-commerce PWA application located at <Link href="/" className="text-primary hover:underline">abuzz-store.com</Link> and our related fulfillment channels in India.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">1. Information We Collect</h3>
            <p>
              We collect information that you input directly into our platform, including name, delivery addresses, telephone numbers, billing details, and identity documents for specialized industrial order clearances. We also log browser details, device characteristics, IP addresses, and session activities.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">2. How We Use Your Data</h3>
            <p>
              Your data is processed to process transaction checkouts, manage shipping and logistics, issue tax invoices compliant with GST guidelines, verify payments, secure transactions against card fraud, and provide support. With your explicit consent, we may send you notifications regarding tool restocks and brand discounts.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">3. Share of Information</h3>
            <p>
              We share relevant parameters with trusted logistics partners (to deliver heavy cement and iron rods), payment gateway providers, customer support systems, and national authorities where necessary to clear industrial regulatory requirements. We do not sell user listings or details to third-party marketing companies.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">4. Data Security</h3>
            <p>
              We deploy SSL/TLS encryption for all client data transits and hold records inside secure Firestore environments. Payment card profiles are fully tokenized and handled under PCI-DSS parameters.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">5. Your Rights Under DPDPA</h3>
            <p>
              In compliance with the Digital Personal Data Protection (DPDP) Act of India, you retain rights to request access to your logs, edit profile inaccuracies, object to automated analytical workflows, and revoke consent.
            </p>

            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">6. Contact Privacy Team</h3>
            <p>
              If you have queries regarding details stored in your account, email us at <span className="text-primary">privacy@abuzz-store.com</span>.
            </p>
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
