'use client';

import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CartDrawer } from '../../components/CartDrawer';

export default function ContactPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
                Contact Abuzz Store
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Get in touch with our helpdesk and logistics teams.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Column 1: Contact Details */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary">Support Desks</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col text-left font-sans text-xs">
                    <span className="font-bold text-foreground">Support Hotline</span>
                    <a href="tel:+918329819618" className="text-muted-foreground mt-0.5 hover:text-primary font-semibold transition-colors">+91-8329819618</a>
                    <span className="text-[9px] text-muted-foreground">Mon - Sat, 9:00 AM to 6:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col text-left font-sans text-xs">
                    <span className="font-bold text-foreground">Email Support</span>
                    <a href="mailto:support@abuzz.store" className="text-muted-foreground mt-0.5 hover:text-primary font-semibold transition-colors">support@abuzz.store</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col text-left font-sans text-xs">
                    <span className="font-bold text-foreground">Corporate Headquarters and Warehouse</span>
                    <span className="text-muted-foreground mt-0.5 leading-relaxed">
                      S.NO13/1 Walhekarwadi Rd. ,<br />
                      Chinchwad, Pune,<br />
                      Maharashtra 411033, India.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Message Form */}
            <div className="p-6 rounded-2xl bg-slate-500/5 border border-border/40">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Message Description</label>
                  <textarea 
                    rows={4} 
                    required 
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none font-sans"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary text-white text-xs font-bold py-3 shadow-md hover:bg-primary/95 transition-all min-h-[44px]"
                >
                  Submit Inquiry
                </button>

                {submitted && (
                  <div className="text-[10px] text-emerald-500 font-bold text-center mt-2 animate-pulse">
                    Thank you! We will get back to you shortly.
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />
    </div>
  );
}
