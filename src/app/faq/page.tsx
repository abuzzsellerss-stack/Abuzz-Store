'use client';

import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CartDrawer } from '../../components/CartDrawer';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "Does Abuzz Store deliver heavy building materials like cement and steel rods?",
      a: "Yes. We deliver heavy structural materials directly to construction sites in our service regions. While small tool orders are sent via standard courier, bulk items are dispatched on specialized flatbed freight trucks. Freight estimations are shared upon booking confirmation."
    },
    {
      q: "Can I place orders offline using the PWA app?",
      a: "Our Progressive Web App (PWA) caches product listings, specifications, and cart details locally so you can browse the store and add items to your kit while on jobsites with poor connectivity. Once your network restores, your cart items sync and you can complete checkout online."
    },
    {
      q: "How can I obtain a business GST invoice for tax input credits?",
      a: "During the checkout process, click on 'Add GSTIN' in the billing details form. Provide your company legal name and 15-digit GSTIN. The generated invoice will automatically include your GST details to claim inputs."
    },
    {
      q: "Are the prices listed inclusive of GST?",
      a: "No. The catalog prices are base tool values. A standard 18% GST (Goods and Services Tax) is calculated and added to the subtotal in your cart drawer and checkout sheets."
    },
    {
      q: "What is your return policy for tools and equipment?",
      a: "We offer a 7-day return policy for standard hand tools, safety gear, and unopened supplies. Items must be returned in their original packaging box. Specialized structural cuts of cables, CPVC pipes, or opened chemical compounds are not eligible for returns."
    },
    {
      q: "How do I claim a brand warranty on power tools?",
      a: "Every brand tool purchased (Bosch, DeWalt, Makita) comes with an official manufacturer warranty card and a GST invoice from Abuzz Store. You can take the tool and invoice to any authorized brand service center in India for repair or replacement."
    }
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-background text-foreground transition-colors duration-300">
      <Header onCartToggle={() => setCartOpen(true)} />
      
      <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary mb-6 min-h-[44px]">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-md glass">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className="border border-border rounded-2xl overflow-hidden bg-background/40 hover:bg-background/80 transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-foreground transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-primary shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed font-sans border-t border-border/30 animate-in fade-in slide-in-from-top-1 duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
