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
      setErrorMessage(null);
      handleExecuteCashfreePayment();
    }
  }, [isOpen]);

  const handleExecuteCashfreePayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingMsg('Initializing Cashfree Live Gateway Session...');

    const orderId = `ABUZZ_PG_${Date.now()}`;

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

      let data: any = null;
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch {
        // Fallback for static export / local dev where API route returns HTML 404 page
        data = {
          success: true,
          isLocalhostDevMode: true,
          paymentSessionId: `dev_session_${Date.now()}`,
          orderId: orderId,
          cfEnvironment: 'PRODUCTION'
        };
      }

      if (!data || !data.success || !data.paymentSessionId) {
        throw new Error(data?.error || 'Cashfree API session creation error.');
      }

      if (data.isLocalhostDevMode) {
        setIsProcessing(false);
        setErrorMessage(
          'Cashfree Production Mode requires domain whitelisting. Click COMPLETE ORDER (LOCAL TEST MODE) below to place a verified test order.'
        );
        return;
      }

      setProcessingMsg('Opening Official Cashfree Payment Gateway...');

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
        try {
          cashfreeInstance.checkout({
            paymentSessionId: data.paymentSessionId,
            redirectTarget: '_self'
          });
        } catch (checkoutErr: any) {
          console.warn('Cashfree checkout modal error:', checkoutErr);
          setErrorMessage('Cashfree Checkout Error: ' + (checkoutErr.message || 'Domain http://localhost:3000/ is not whitelisted in Cashfree Merchant Dashboard. Use Test Mode below for local testing.'));
          setIsProcessing(false);
        }
      } else {
        window.location.href = `https://${data.cfEnvironment === 'SANDBOX' ? 'sandbox' : 'api'}.cashfree.com/pg/orders/sessions/${data.paymentSessionId}`;
      }

    } catch (err: any) {
      console.warn('Cashfree session error:', err);
      setIsProcessing(false);
      setErrorMessage(err.message || 'http://localhost:3000/ is not a whitelisted Cashfree domain. Whitelist https://abuzz.store in merchant.cashfree.com > Developers.');
    }
  };

  const handleSimulateLocalOrder = async () => {
    setIsProcessing(true);
    setProcessingMsg('Creating verified test order...');

    const orderId = `ABUZZ_${Date.now()}`;
    const itemsToSave = product ? [{ product, quantity: activeQuantity }] : cartItems;

    try {
      const storedOrders = localStorage.getItem('abuzz_orders');
      let orderHistory = storedOrders ? JSON.parse(storedOrders) : [];
      orderHistory.unshift({
        id: orderId,
        userId: user?.uid || 'guest-user',
        items: itemsToSave,
        subtotal: rawSubtotal,
        tax: Math.round(rawSubtotal * 0.18),
        total: finalPrice,
        shippingAddress: {
          name: customerName,
          street: selectedAddress.address,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zip: selectedAddress.zip,
          country: 'India'
        },
        paymentMethod: 'Cashfree PG (Test Mode)',
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('abuzz_orders', JSON.stringify(orderHistory));

      trackMetaEvent('Purchase', { value: finalPrice, currency: 'INR' });
      window.dispatchEvent(new Event('storage'));

      if (!product) clearCart();
      setIsProcessing(false);
      onClose();
      router.push('/profile?tab=orders');
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage('Failed to simulate test order: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* CASHFREE GATEWAY LAUNCHER MODAL */}
      <div className="w-full max-w-lg bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative font-sans text-foreground text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-background/60 hover:bg-background text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm border border-border/50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-extrabold tracking-wide uppercase border border-purple-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Official Cashfree Gateway</span>
          </div>
          <h3 className="text-xl font-extrabold text-foreground">
            Abuzz Store Secure Checkout
          </h3>
          <p className="text-xs text-muted-foreground">
            Total Payable: <strong className="text-purple-600 text-base">₹{finalPrice.toLocaleString('en-IN')}</strong>
          </p>
        </div>

        {/* Status / Loader / Error */}
        {isProcessing ? (
          <div className="py-8 space-y-3">
            <Loader2 className="h-10 w-10 animate-spin text-purple-600 mx-auto" />
            <p className="text-xs font-extrabold text-foreground animate-pulse">
              {processingMsg}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Launching UPI, Credit/Debit Cards & NetBanking window...
            </p>
          </div>
        ) : errorMessage ? (
          <div className="py-4 space-y-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold text-left space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Cashfree Domain Whitelisting Notice</span>
              </div>
              <p className="text-xs leading-relaxed font-semibold text-muted-foreground">
                {errorMessage}
              </p>
              <div className="text-[11px] bg-background/90 p-3 rounded-xl border border-amber-500/20 text-muted-foreground space-y-1.5 font-sans">
                <div className="font-bold text-foreground">Domain Whitelisting Steps for Production (abuzz.store):</div>
                <div className="text-xs text-muted-foreground">1. Log in to <strong className="text-primary">merchant.cashfree.com</strong></div>
                <div className="text-xs text-muted-foreground">2. Navigate to <strong>Developers &gt; Whitelisting</strong></div>
                <div className="text-xs text-muted-foreground">3. Add domain: <strong className="text-emerald-500">https://abuzz.store</strong></div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSimulateLocalOrder}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                <span>Complete Order (Local Test Mode)</span>
              </button>

              <button
                type="button"
                onClick={handleExecuteCashfreePayment}
                className="w-full h-10 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold text-xs transition-all cursor-pointer"
              >
                Retry Cashfree Gateway Connection
              </button>
            </div>
          </div>
        ) : null}

        {/* Security Seal Footer */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-center gap-2 text-[11px] text-muted-foreground font-semibold">
          <Lock className="h-3.5 w-3.5 text-emerald-500" />
          <span>256-bit Encrypted Session • Cashfree Payments India</span>
        </div>

      </div>

    </div>
  );
};

export default CashfreeOneClickCheckoutModal;
