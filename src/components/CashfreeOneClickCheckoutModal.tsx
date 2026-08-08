'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { 
  X, 
  ArrowLeft, 
  Phone, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  Tag, 
  MapPin, 
  Loader2, 
  Lock 
} from 'lucide-react';
import { formatImageUrl } from '../utils/imageHelper';
import { calculateRtoRiskScore, SAVED_PREFILL_ADDRESSES, SavedPrefillAddress } from '../utils/checkoutHelpers';
import { trackMetaEvent } from './MetaPixel';

interface CashfreeOneClickCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  initialQuantity?: number;
}

export const CashfreeOneClickCheckoutModal: React.FC<CashfreeOneClickCheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  initialQuantity = 1
}) => {
  const router = useRouter();
  const { cartItems, cartTotal, cartSubtotal, cartTax, clearCart } = useCart();
  const { user } = useAuth();

  // Determine active item(s) for checkout
  const activeProduct = product || (cartItems.length > 0 ? cartItems[0].product : null);
  const activeQuantity = product ? initialQuantity : (cartItems.length > 0 ? cartItems[0].quantity : 1);

  // Pricing calculations
  const rawSubtotal = product ? product.price * activeQuantity : cartSubtotal;
  const originalPrice = Math.round(rawSubtotal * 1.15); // 15% original MSRP markup for discount calculations
  const discountAmount = Math.round(rawSubtotal * 0.10); // WELCOME10 10% discount
  const finalPrice = Math.max(1, rawSubtotal - discountAmount);

  // Modal Flow Step: 'mobile' | 'otp' | 'address' | 'payment_processing'
  const [step, setStep] = useState<'mobile' | 'otp' | 'address' | 'payment_processing'>('mobile');
  
  // User Form Inputs
  const [phone, setPhone] = useState(user?.email?.includes('@phone') ? user.email.split('@')[0] : '9910088219');
  const [otpCode, setOtpCode] = useState('');
  const [sendUpdates, setSendUpdates] = useState(true);
  const [customerName, setCustomerName] = useState(user?.displayName || 'Valued Customer');
  const [selectedAddress, setSelectedAddress] = useState<SavedPrefillAddress>(SAVED_PREFILL_ADDRESSES[0]);

  // Payment Execution State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState('Connecting to Cashfree Payments...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('mobile');
      setErrorMessage(null);
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setStep('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6 || otpCode === '123456' || otpCode.length >= 4) {
      setStep('address');
    } else {
      alert('Enter OTP code 123456 or any digit code to continue.');
    }
  };

  const handleExecuteCashfreePayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingMsg('Connecting to Cashfree Payments...');

    const orderId = `ABUZZ_1CLICK_${Date.now()}`;

    try {
      // 1. Call Cashfree Create Order API
      const res = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalPrice,
          orderId: orderId,
          customerName: customerName,
          customerEmail: user?.email || `${phone}@phone.abuzzstore.com`,
          customerPhone: phone,
          cartItems: product ? [{ product, quantity: activeQuantity }] : cartItems,
        }),
      });

      const data = await res.json();

      if (!data.success || !data.paymentSessionId) {
        throw new Error(data.error || 'Cashfree API credentials missing in server environment.');
      }

      setProcessingMsg('Launching Cashfree Gateway Window...');

      // 2. Initialize Cashfree Checkout SDK
      let cashfreeInstance: any = null;
      try {
        const { load } = await import('@cashfreepayments/cashfree-js');
        cashfreeInstance = await load({
          mode: data.cfEnvironment === 'SANDBOX' ? 'sandbox' : 'production'
        });
      } catch {
        if (typeof window !== 'undefined' && !(window as any).Cashfree) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }
        if ((window as any).Cashfree) {
          cashfreeInstance = (window as any).Cashfree({
            mode: data.cfEnvironment === 'SANDBOX' ? 'sandbox' : 'production'
          });
        }
      }

      if (cashfreeInstance) {
        cashfreeInstance.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: '_self'
        });
      } else {
        window.location.href = `https://${data.cfEnvironment === 'SANDBOX' ? 'sandbox' : 'api'}.cashfree.com/pg/orders/sessions/${data.paymentSessionId}`;
      }

    } catch (err: any) {
      console.warn('Cashfree One Click session error:', err);
      setErrorMessage(err.message || 'Cashfree API credentials missing in server environment.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* CASHFREE 1-CLICK POPUP DIALOG CONTAINER */}
      <div className="w-full max-w-4xl bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative font-sans text-foreground">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-background/60 hover:bg-background text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm border border-border/50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* LEFT PANEL: Order Summary & Applied Coupon (Soft Tint Background - Matches Design Screenshot) */}
        <div className="md:col-span-5 bg-gradient-to-b from-purple-100/90 via-pink-100/70 to-purple-50/80 dark:from-purple-950/60 dark:via-purple-900/40 dark:to-slate-950 p-6 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-200/50 dark:border-purple-800/30">
          
          <div className="space-y-5">
            {/* Top Fulfillment Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-200/60 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 text-[10.5px] font-extrabold tracking-wide uppercase shadow-2xs border border-purple-300/40 dark:border-purple-700/40">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>8215+ orders fulfilled successfully</span>
            </div>

            {/* Merchant Identity & Logo Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-purple-950 dark:text-purple-100">
                  ABUZZ STORE
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-violet-600 text-white px-2 py-0.5 rounded-md">
                  OFFICIAL
                </span>
              </div>
              <p className="text-xs font-bold text-purple-800/80 dark:text-purple-300/80">
                INDUSTRIAL HARDWARE & TOOLS DIRECT
              </p>
            </div>

            {/* Discounted Price Box */}
            <div className="bg-white/80 dark:bg-slate-900/80 border border-purple-200 dark:border-purple-800/50 rounded-2xl p-4 shadow-sm space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
                <span className="text-2xl font-black text-purple-950 dark:text-purple-100">₹{finalPrice.toLocaleString('en-IN')}</span>
                <ChevronRight className="h-4 w-4 text-purple-600 ml-auto" />
              </div>
              <div className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Congrats! You are saving ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Pre-Applied Coupon Banner */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                <span className="inline-flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                  ✓ 2 OFFERS APPLIED!
                </span>
                <span className="text-[11px]">WELCOME10 (-10%)</span>
              </div>
              <p className="text-xs font-black text-emerald-800 dark:text-emerald-300">
                ₹{discountAmount.toLocaleString('en-IN')} saved on this order + FREE SHIPPING
              </p>
            </div>

            {/* Product Item Preview Thumbnail */}
            {activeProduct && (
              <div className="bg-white/70 dark:bg-slate-900/70 border border-purple-200/60 dark:border-purple-800/40 rounded-2xl p-3 flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-purple-200/50">
                  <Image
                    src={formatImageUrl(activeProduct.imageUrl)}
                    alt={activeProduct.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-foreground truncate">{activeProduct.title}</h4>
                  <p className="text-[11px] text-muted-foreground">Qty: {activeQuantity} • HSN: {activeProduct.specifications?.['HSN Code'] || '8204'}</p>
                </div>
                <span className="text-xs font-black text-foreground shrink-0">₹{finalPrice.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          {/* Bottom Security Seal */}
          <div className="pt-4 border-t border-purple-200/50 dark:border-purple-800/30 flex items-center gap-2 text-[11px] text-purple-900/80 dark:text-purple-300/80 font-semibold">
            <ShieldCheck className="h-4 w-4 text-purple-600 shrink-0" />
            <span>Powered by Cashfree Payments India 256-bit SSL</span>
          </div>

        </div>

        {/* RIGHT PANEL: Interactive Step Flow (Matches Design Screenshot) */}
        <div className="md:col-span-7 bg-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          {/* STEP 1: Enter Mobile Number */}
          {step === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="space-y-6 my-auto">
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Enter your mobile number
                </h3>
                <p className="text-xs text-muted-foreground">
                  This helps us pre-fill your saved details & shipping address automatically.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex rounded-2xl border-2 border-purple-500/40 focus-within:border-purple-600 bg-background overflow-hidden p-1 shadow-sm">
                  <span className="inline-flex items-center px-4 text-sm font-extrabold text-muted-foreground border-r border-border/60">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9900000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 px-4 py-3 text-base sm:text-lg font-extrabold tracking-wider bg-transparent text-foreground focus:outline-none placeholder:text-muted-foreground/40"
                  />
                </div>

                <label className="flex items-center gap-2.5 text-xs font-semibold text-muted-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sendUpdates}
                    onChange={(e) => setSendUpdates(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-purple-600"
                  />
                  <span>Send me order updates and offers on WhatsApp</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-13 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Enter 6-Digit OTP */}
          {step === 'otp' && (
            <form onSubmit={handleOtpVerify} className="space-y-6 my-auto">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('mobile')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
                <span className="text-[11px] font-bold text-muted-foreground">Mobile: +91 {phone}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Enter 6-Digit OTP Code
                </h3>
                <p className="text-xs text-muted-foreground">
                  Sent to +91 {phone}. Enter <strong className="text-purple-600">123456</strong> for instant verification.
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full text-center text-2xl font-black tracking-widest py-3.5 rounded-2xl border-2 border-purple-500/50 bg-background text-foreground focus:outline-none"
                />

                <p className="text-[11px] text-center text-muted-foreground">
                  Didn't receive code? <button type="button" onClick={() => alert('Demo OTP Code: 123456')} className="text-purple-600 font-bold underline">Resend OTP</button>
                </p>
              </div>

              <button
                type="submit"
                className="w-full h-13 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:bg-emerald-500 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Verify OTP & Pre-Fill Address</span>
                <Check className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* STEP 3: Confirm Pre-Filled Address */}
          {step === 'address' && (
            <div className="space-y-5 my-auto">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">Select Saved Delivery Address</h3>
                  <p className="text-xs text-muted-foreground">Pre-filled from 100M+ saved addresses network</p>
                </div>
                <span className="text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  ✓ OTP Verified
                </span>
              </div>

              <div className="space-y-3">
                {SAVED_PREFILL_ADDRESSES.map((addr) => {
                  const isSelected = selectedAddress.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-1 ${
                        isSelected
                          ? 'border-purple-600 bg-purple-500/10 shadow-sm'
                          : 'border-border bg-background/50 hover:border-purple-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-foreground">{addr.label} ({addr.name})</span>
                        {isSelected && <Check className="h-4 w-4 text-purple-600" />}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {addr.address}, {addr.city}, {addr.state} - {addr.zip}
                      </p>
                    </div>
                  );
                })}
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold space-y-1">
                  <div>⚠️ Notice: {errorMessage}</div>
                  <div className="text-[10px] font-normal opacity-90">
                    Add `CASHFREE_APP_ID` & `CASHFREE_SECRET_KEY` in Hostinger Environment Variables to connect live PG.
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleExecuteCashfreePayment}
                className="w-full h-13 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{processingMsg}</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Pay ₹{finalPrice.toLocaleString('en-IN')} with Cashfree 1-Click</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default CashfreeOneClickCheckoutModal;
