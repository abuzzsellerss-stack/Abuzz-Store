'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MobileBottomNav } from '../../components/MobileBottomNav';
import { CartDrawer } from '../../components/CartDrawer';
import { Search, Truck, Package, CheckCircle2, Clock, MapPin, ArrowLeft, ShieldCheck, AlertCircle, Phone, ExternalLink } from 'lucide-react';
import { getAdminOrders, AdminOrderRecord } from '../../utils/adminMockData';

export default function TrackOrderPage() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [orderResult, setOrderResult] = useState<AdminOrderRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSearched(true);

    const cleanId = orderIdInput.trim().toUpperCase();
    const cleanPhone = phoneInput.trim();

    const allOrders = getAdminOrders();
    const match = allOrders.find(o => {
      const orderIdUpper = o.id ? o.id.toUpperCase() : '';
      const idMatch = Boolean(orderIdUpper) && (orderIdUpper === cleanId || orderIdUpper === `#${cleanId}` || cleanId.includes(orderIdUpper.replace('#', '')));
      const phoneMatch = !cleanPhone || (o.customerEmail?.toLowerCase().includes(cleanPhone.toLowerCase()) ?? false) || (o.customerName?.toLowerCase().includes(cleanPhone.toLowerCase()) ?? false);
      return idMatch && phoneMatch;
    });

    if (match) {
      setOrderResult(match);
    } else {
      setOrderResult(null);
      setErrorMsg(`No matching order found for "${orderIdInput}". Please verify your Order ID and Phone Number.`);
    }
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'ready_for_dispatch': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-background text-foreground transition-colors duration-300">
      
      {/* Header */}
      <Header onCartToggle={() => setCartOpen(true)} />

      <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        
        {/* Navigation Breadcrumbs */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Return to Storefront
          </Link>
        </div>

        {/* Page Title Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto mb-3">
            <Truck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight uppercase">
            Track Shipment Status
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enter your Order ID (e.g. OD-AS-01) and registered email or phone number to view live courier dispatch status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl glass max-w-2xl mx-auto mb-10">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
                  Order ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. OD-AS-01"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-xs font-bold text-foreground focus:border-primary focus:outline-none min-h-[46px]"
                  />
                  <Search className="absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="e.g. 9820012345"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-xs font-bold text-foreground focus:border-primary focus:outline-none min-h-[46px]"
                  />
                  <Phone className="absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wider hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 min-h-[48px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Truck className="h-4 w-4" /> Locate Shipment
            </button>
          </form>
        </div>

        {/* ERROR STATE */}
        {searched && errorMsg && (
          <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-3 shadow-md">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* RESULT STATE: ORDER FOUND */}
        {orderResult && (
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl glass space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-primary tracking-widest block mb-1">Live Order Status</span>
                <h2 className="text-xl font-black text-foreground">{orderResult.id}</h2>
                <p className="text-xs text-muted-foreground">Customer: <strong>{orderResult.customerName}</strong> ({orderResult.city}, {orderResult.state})</p>
              </div>

              <div className="text-left sm:text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                  orderResult.orderStatus === 'delivered' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                  orderResult.orderStatus === 'shipped' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                  'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                }`}>
                  {(orderResult.orderStatus || 'processing').replace(/_/g, ' ')}
                </span>
                <p className="text-[10px] text-muted-foreground mt-1">Placed on {orderResult.createdAt}</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-6">Delivery Progress Timeline</h3>
              
              <div className="grid grid-cols-5 gap-2 relative">
                
                {/* Stepper Steps */}
                {[
                  { step: 0, title: 'Order Placed', desc: 'Received' },
                  { step: 1, title: 'Processing', desc: 'Packing' },
                  { step: 2, title: 'Ready', desc: 'E-Way Manifest' },
                  { step: 3, title: 'Shipped', desc: 'In Transit' },
                  { step: 4, title: 'Delivered', desc: 'Handed Over' }
                ].map((s) => {
                  const currentIdx = getStepIndex(orderResult.orderStatus || 'processing');
                  const isDone = currentIdx >= s.step;
                  const isCurrent = currentIdx === s.step;

                  return (
                    <div key={s.step} className="flex flex-col items-center text-center space-y-2 z-10">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                        isDone 
                          ? 'bg-primary text-white border-primary shadow-md shadow-primary/30' 
                          : 'bg-card text-muted-foreground border-border'
                      } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                        {isDone ? <CheckCircle2 className="h-5 w-5" /> : s.step + 1}
                      </div>

                      <div className="space-y-0.5">
                        <span className={`text-[11px] font-extrabold block leading-tight ${isDone ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {s.title}
                        </span>
                        <span className="text-[9px] text-muted-foreground block">{s.desc}</span>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Courier Carrier & AWB Info Card */}
            {orderResult.awbNumber && (
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-blue-500 shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-foreground">Carrier: {orderResult.carrier || 'Blue Dart Logistics'}</h4>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">AWB Tracking Code: <strong className="text-foreground">{orderResult.awbNumber}</strong></p>
                  </div>
                </div>

                <a
                  href={`https://www.bluedart.com/tracking?awb=${orderResult.awbNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm"
                >
                  <span>Track on {orderResult.carrier || 'Courier'}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            {/* Order Items Summary */}
            <div className="border-t border-border pt-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Order Package Contents</h4>
              <div className="space-y-2">
                {orderResult.items && orderResult.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-3 rounded-xl bg-background/50 border border-border/50">
                    <span className="font-bold text-foreground">{it.productTitle} <span className="text-muted-foreground font-normal">(x{it.quantity})</span></span>
                    <span className="font-extrabold text-primary">₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav onCartToggle={() => setCartOpen(true)} />

      {/* Footer */}
      <Footer />

    </div>
  );
}
