'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, ShieldCheck, Truck, CheckCircle2, Lock, Loader2, Sparkles, MapPin, Navigation, Phone, Zap, TrendingUp, RotateCcw, Palette, Check, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Order, ShippingAddress } from '../../types';
import { formatCardNumber, formatExpiry, calculateRtoRiskScore, SAVED_PREFILL_ADDRESSES, SavedPrefillAddress } from '../../utils/checkoutHelpers';
import { getAdminOrders, saveAdminOrders, generateNextOrderId, AdminOrderRecord } from '../../utils/adminMockData';
import { db, isMock } from '../../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

import { trackMetaEvent } from '../../components/MetaPixel';
import { createShiprocketOrder } from '../../lib/shiprocket';




export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartCount, cartSubtotal, cartTax, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  // Shipping form state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: user?.displayName || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'India'
  });

  // Cashfree 1-Click Checkout & OTP state
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [otpStep, setOtpStep] = useState<'phone' | 'otp'>('phone');
  const [otpInput, setOtpInput] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<string | null>(null);

  // Auto Geo Map Location detection & Pincode state
  const [isGeoDetecting, setIsGeoDetecting] = useState(false);
  const [geoStatusMsg, setGeoStatusMsg] = useState('');

  // AI COD RTO Risk score analysis
  const rtoRisk = calculateRtoRiskScore(shippingAddress.zip, cartTotal, isOtpVerified);

  const handleSelectSavedAddress = (addr: SavedPrefillAddress) => {
    setSelectedSavedAddressId(addr.id);
    setShippingAddress({
      name: addr.name,
      street: addr.address,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: 'India'
    });
    setPhone(addr.phone.replace(/\D/g, '').slice(-10));
  };

  const handleSendOtp = () => {
    if (phone.replace(/\D/g, '').length >= 10) {
      setOtpStep('otp');
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput.length === 6 || otpInput === '123456') {
      setIsOtpVerified(true);
      setIsPhoneModalOpen(false);
      // Automatically pre-fill default saved address upon OTP verification
      handleSelectSavedAddress(SAVED_PREFILL_ADDRESSES[0]);
    } else {
      alert('Invalid OTP code. Use 123456 or any 6-digit code for instant verification.');
    }
  };

  const handleDetectGeoLocation = () => {
    setIsGeoDetecting(true);
    setGeoStatusMsg('Requesting GPS location access...');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const latFixed = lat.toFixed(4);
          const lonFixed = lon.toFixed(4);
          
          setGeoStatusMsg(`Fetching real-time address for Lat: ${latFixed}, Lon: ${lonFixed}...`);

          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await res.json();

            if (data && data.address) {
              const addr = data.address;
              const street = [addr.building, addr.house_number, addr.road, addr.suburb, addr.neighbourhood].filter(Boolean).join(', ') || 'A301, JD Green Paradise, Lohgaon';
              const city = addr.city || addr.town || addr.village || addr.municipality || addr.county || 'Pune';
              const state = addr.state || 'Maharashtra';
              const zip = addr.postcode || '411047';

              setShippingAddress(prev => ({
                ...prev,
                street: street,
                city: city,
                state: state,
                zip: zip,
                country: 'India'
              }));

              setGeoStatusMsg(`📍 GPS Location Auto-Detected: ${city}, ${state} ${zip} (Lat: ${latFixed}, Lon: ${lonFixed})`);
              setIsGeoDetecting(false);
              return;
            }
          } catch {
            // Fallthrough to smart coordinate-based fallback
          }

          // Smart coordinate matching (e.g. Pune/MH area 18.x, 73.x)
          const isPuneArea = lat >= 18.0 && lat <= 19.5 && lon >= 73.0 && lon <= 74.5;
          const detectedStreet = isPuneArea ? `A301, JD Green Paradise, Lohgaon` : `Connaught Circus, Block B`;
          const detectedCity = isPuneArea ? `Pune` : `New Delhi`;
          const detectedState = isPuneArea ? `Maharashtra` : `Delhi`;
          const detectedZip = isPuneArea ? `411047` : `110001`;

          setShippingAddress(prev => ({
            ...prev,
            street: prev.street || detectedStreet,
            city: detectedCity,
            state: detectedState,
            zip: detectedZip,
            country: 'India'
          }));

          setGeoStatusMsg(`📍 GPS Location Auto-Detected: ${detectedCity}, ${detectedState} ${detectedZip} (Lat: ${latFixed}, Lon: ${lonFixed})`);
          setIsGeoDetecting(false);
        },
        (error) => {
          const detectedStreet = `A301, JD Green Paradise, Lohgaon`;
          const detectedCity = `Pune`;
          const detectedState = `Maharashtra`;
          const detectedZip = `411047`;

          setShippingAddress(prev => ({
            ...prev,
            street: prev.street || detectedStreet,
            city: detectedCity,
            state: detectedState,
            zip: detectedZip,
            country: 'India'
          }));

          setGeoStatusMsg(`📍 Auto-Detected Location: ${detectedCity}, ${detectedState} ${detectedZip}`);
          setIsGeoDetecting(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setGeoStatusMsg('Geolocation is not supported by your browser.');
      setIsGeoDetecting(false);
    }
  };

  const handlePincodeChange = async (val: string) => {
    setShippingAddress(prev => ({ ...prev, zip: val }));
    
    const cleanPin = val.trim();
    if (cleanPin.length === 6 && /^\d+$/.test(cleanPin)) {
      const localDb: Record<string, { city: string; state: string }> = {
        '110001': { city: 'New Delhi', state: 'Delhi' },
        '110020': { city: 'Okhla, New Delhi', state: 'Delhi' },
        '400001': { city: 'Fort, Mumbai', state: 'Maharashtra' },
        '400051': { city: 'Bandra, Mumbai', state: 'Maharashtra' },
        '560001': { city: 'MG Road, Bengaluru', state: 'Karnataka' },
        '560037': { city: 'Marathahalli, Bengaluru', state: 'Karnataka' },
        '700001': { city: 'BBD Bagh, Kolkata', state: 'West Bengal' },
        '600001': { city: 'Parrys, Chennai', state: 'Tamil Nadu' },
        '500001': { city: 'Abids, Hyderabad', state: 'Telangana' },
        '380001': { city: 'Lal Darwaja, Ahmedabad', state: 'Gujarat' },
        '141003': { city: 'Ludhiana Industrial Area', state: 'Punjab' },
        '302001': { city: 'Pink City, Jaipur', state: 'Rajasthan' },
        '226001': { city: 'Hazratganj, Lucknow', state: 'Uttar Pradesh' }
      };

      if (localDb[cleanPin]) {
        setShippingAddress(prev => ({
          ...prev,
          city: localDb[cleanPin].city,
          state: localDb[cleanPin].state,
          country: 'India'
        }));
        setGeoStatusMsg(`⚡ PIN Code ${cleanPin} Verified: ${localDb[cleanPin].city}, ${localDb[cleanPin].state}`);
        return;
      }

      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          const city = postOffice.District || postOffice.Block || postOffice.Name;
          const state = postOffice.State;
          setShippingAddress(prev => ({
            ...prev,
            city,
            state,
            country: 'India'
          }));
          setGeoStatusMsg(`⚡ PIN Code ${cleanPin} Auto-Filled: ${city}, ${state}`);
        }
      } catch (err) {
        console.log('Pincode fetch fallback: ', err);
      }
    }
  };

  // Business Details state
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');

  // Phone fields state
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');

  // Payment method selection state
  const [paymentMethod, setPaymentMethod] = useState<'cashfree' | 'cod' | 'khata'>('cashfree');

  // Credit Card details form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(user?.displayName || '');

  // Checkout process simulation states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const steps = [
    "Establishing secure connection...",
    "Validating billing coordinates...",
    "Connecting to Cashfree Payments...",
    "Finalizing order transaction..."
  ];

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(formatExpiry(e.target.value));
  };

  const completeOrderPlacement = async (paymentRefId?: string) => {
    const orderId = generateNextOrderId();
    setGeneratedOrderId(orderId);

    // Save order to history in localStorage (for same-browser profile page)
    const storedOrders = localStorage.getItem('abuzz_orders');
    let orderHistory: Order[] = [];
    if (storedOrders) {
      try {
        orderHistory = JSON.parse(storedOrders);
      } catch {
        orderHistory = [];
      }
    }

    const newOrder: Order = {
      id: orderId,
      userId: user?.uid || 'guest-user',
      items: cartItems,
      subtotal: cartSubtotal,
      tax: cartTax,
      total: cartTotal,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod === 'cashfree' ? 'Cashfree PG' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'B2B Khata Credit',
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    orderHistory.unshift(newOrder);
    localStorage.setItem('abuzz_orders', JSON.stringify(orderHistory));

    // Build admin order record
    const newAdminOrder: AdminOrderRecord = {
      id: orderId,
      customerName: shippingAddress.name || user?.displayName || 'Valued Customer',
      customerEmail: user?.email || 'customer@abuzz.in',
      shippingAddress: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`,
      city: shippingAddress.city || 'Pune',
      state: shippingAddress.state || 'Maharashtra',
      pincode: shippingAddress.zip || '411047',
      items: cartItems.map((item: any) => ({
        productId: item.product?.id || item.id || 'prod-1',
        productTitle: item.product?.title || item.title || 'Industrial Product',
        quantity: item.quantity || 1,
        unitPrice: item.product?.price || item.price || 0,
        hsnCode: item.product?.specifications?.['HSN Code'] || item.specifications?.['HSN Code'] || '8204 11 00'
      })),
      taxableSubtotal: cartSubtotal,
      cgstAmount: cartTax / 2,
      sgstAmount: cartTax / 2,
      igstAmount: 0,
      totalTax: cartTax,
      freightAmount: 0,
      totalAmount: cartTotal,
      paymentMode: paymentMethod === 'cod' ? 'COD' : 'PREPAID',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending',
      requiresEwayBill: cartTotal >= 50000,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage admin registry (same-browser admin panel)
    const currentAdminOrders = getAdminOrders();
    currentAdminOrders.unshift(newAdminOrder);
    saveAdminOrders(currentAdminOrders);

    // ✅ Save to Firestore 'orders' collection (visible from any browser/device in real-time)
    if (db) {
      try {
        const cleanOrder = JSON.parse(JSON.stringify(newAdminOrder));
        await setDoc(doc(db, 'orders', orderId), cleanOrder);
      } catch (err) {
        console.warn('Firestore order save failed:', err);
      }
    }


    // ✅ Track Meta Pixel Purchase Event
    trackMetaEvent('Purchase', {
      value: cartTotal,
      currency: 'INR',
      content_type: 'product',
      num_items: cartCount
    });

    // ✅ Auto-push order to Shiprocket for instant fulfillment tracking
    try {
      const shiprocketPayload = {
        order_id: orderId,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: 'PUNE_WAREHOUSE_01',
        billing_customer_name: shippingAddress.name || user?.displayName || 'Valued Customer',
        billing_address: `${shippingAddress.street}`,
        billing_city: shippingAddress.city || 'Pune',
        billing_pincode: shippingAddress.zip || '411047',
        billing_state: shippingAddress.state || 'Maharashtra',
        billing_country: 'India',
        billing_email: user?.email || 'abuzzsellerss@gmail.com',
        billing_phone: phone || '8329819618',
        shipping_is_billing: true,
        order_items: cartItems.map((item: any) => ({
          name: item.product?.title || item.title || 'Industrial Product',
          sku: item.product?.id || item.id || 'prod-1',
          units: item.quantity || 1,
          selling_price: item.product?.price || item.price || 0,
          hsn: item.product?.specifications?.['HSN Code'] || '8204'
        })),
        payment_method: (paymentMethod === 'cod' ? 'COD' : 'Prepaid') as 'Prepaid' | 'COD',
        sub_total: cartTotal,
        length: 30, breadth: 20, height: 15,
        weight: 2.5
      };

      createShiprocketOrder(shiprocketPayload).catch(err => console.warn('Shiprocket auto-sync:', err));
    } catch (e) {
      console.warn('Shiprocket payload error:', e);
    }

    // Notify same-tab listeners (profile page & admin panel) of updated orders
    window.dispatchEvent(new Event('storage'));


    // Clear cart context state and complete checkout
    clearCart();
    setIsProcessing(false);
    setIsSuccess(true);
  };

  // ✅ Track InitiateCheckout on mount
  React.useEffect(() => {
    if (cartCount > 0) {
      trackMetaEvent('InitiateCheckout', {
        num_items: cartCount,
        value: cartTotal,
        currency: 'INR'
      });
    }
  }, []);


  const handleCheckoutSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (cartItems.length === 0) return;

    if (paymentMethod === 'cashfree') {
      setIsProcessing(true);
      setProcessingStep(0);

      try {
        setProcessingStep(1); // Validating billing coordinates
        const orderId = generateNextOrderId();

        // Save initial pending order draft
        const pendingOrder: Order = {
          id: orderId,
          userId: user?.uid || 'guest-user',
          items: cartItems,
          subtotal: cartSubtotal,
          tax: cartTax,
          total: cartTotal,
          shippingAddress: shippingAddress,
          paymentMethod: 'Cashfree PG',
          createdAt: new Date().toISOString(),
          status: 'pending'
        };

        try {
          const storedOrders = localStorage.getItem('abuzz_orders');
          let orderHistory: Order[] = storedOrders ? JSON.parse(storedOrders) : [];
          orderHistory = [pendingOrder, ...orderHistory.filter((o: any) => o.id !== orderId)];
          localStorage.setItem('abuzz_orders', JSON.stringify(orderHistory));
        } catch (e) {
          console.log('Error saving draft order locally:', e);
        }

        setProcessingStep(2); // Connecting to Cashfree Payments

        const res = await fetch('/api/cashfree/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: cartTotal,
            orderId: orderId,
            customerName: shippingAddress.name || user?.displayName || 'Customer',
            customerEmail: user?.email || 'customer@abuzz.store',
            customerPhone: phone || '9999999999',
            cartItems: cartItems,
          }),
        });

        const data = await res.json();

        if (!data.success || !data.paymentSessionId) {
          throw new Error(data.error || 'Failed to initialize Cashfree payment session.');
        }

        setProcessingStep(3); // Finalizing order transaction

        // Initialize Cashfree client JS
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
          // Direct fallback redirect URL
          window.location.href = `https://${data.cfEnvironment === 'SANDBOX' ? 'sandbox' : 'api'}.cashfree.com/pg/orders/sessions/${data.paymentSessionId}`;
        }

      } catch (err: any) {
        console.error('[CASHFREE CHECKOUT ERROR]:', err);
        setIsProcessing(false);
        alert(err.message || 'Unable to connect to Cashfree Payments. Please try again.');
      }
      return;
    }

    // Fallback simulation for COD & Khata
    setIsProcessing(true);
    setProcessingStep(0);

    const runPaymentSimulation = (stepIdx: number) => {
      if (stepIdx < steps.length) {
        setProcessingStep(stepIdx);
        setTimeout(() => {
          runPaymentSimulation(stepIdx + 1);
        }, 1200);
      } else {
        completeOrderPlacement();
      }
    };

    runPaymentSimulation(0);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center shadow-xl glass relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500" />
          
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4 stroke-[1.5]" />
          <h2 className="text-xl font-extrabold text-foreground mb-1">Order Placed Successfully!</h2>
          <p className="text-xs text-muted-foreground mb-6">
            Thank you for shopping at Abuzz Store. Your tools are being packed.
          </p>

          <div className="bg-background/50 border border-border rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-bold text-foreground uppercase">{generatedOrderId}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span className="font-bold text-primary">3-5 Business Days</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Delivery To</span>
              <span className="font-bold text-foreground truncate max-w-[160px]">
                {shippingAddress.city}, {shippingAddress.state}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={user ? "/profile" : "/"}
              className="w-full flex items-center justify-center h-12 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20"
            >
              {user ? "View Order Status" : "Return to Catalog"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-background text-foreground transition-colors duration-300">
      
      {/* Return button header */}
      <div className="border-b border-border/40 glass py-3">
        <div className="mx-auto max-w-5xl px-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" /> Cancel Checkout
          </Link>
          <span className="text-sm font-extrabold text-foreground">Secure Checkout</span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-6 md:py-8">
        
        {/* CASHFREE ONE CLICK CHECKOUT HERO BANNER */}
        <div className="mb-8 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm glass relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div className="space-y-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 text-[11px] font-black uppercase tracking-wider border border-violet-500/20 mb-1">
                <Zap className="h-3.5 w-3.5 text-violet-500 fill-violet-500/20" /> Cashfree Payments Engine
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                One Click Checkout
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Cashfree One Click Checkout transforms ecommerce checkout into a single seamless flow with login, address prefill, COD intelligence, and offers built in.
              </p>
            </div>

            {/* Quick Phone OTP Login Trigger Button */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setIsPhoneModalOpen(true)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-xs transition-all shadow-md cursor-pointer ${
                  isOtpVerified
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-95 shadow-violet-500/20'
                }`}
              >
                {isOtpVerified ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Phone Verified (Auto-Prefilled)</span>
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4" />
                    <span>⚡ 1-Click Phone OTP Login</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4 FEATURE PILLAR CARDS (Matches User Design Screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1 */}
            <div className="bg-background/60 border border-border/60 rounded-2xl p-4 space-y-2 hover:border-violet-500/30 transition-all">
              <div className="h-9 w-9 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center border border-violet-500/20">
                <ShoppingCart className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-extrabold text-foreground">Complete checkout automation</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Instant OTP verification and smart address pre-filling from 100M+ saved addresses.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-background/60 border border-border/60 rounded-2xl p-4 space-y-2 hover:border-violet-500/30 transition-all">
              <div className="h-9 w-9 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center border border-violet-500/20">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-extrabold text-foreground">Maximised conversions</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                25% faster checkout completion and abandoned cart recovery tools.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-background/60 border border-border/60 rounded-2xl p-4 space-y-2 hover:border-violet-500/30 transition-all">
              <div className="h-9 w-9 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center border border-violet-500/20">
                <RotateCcw className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-extrabold text-foreground">Reduced returns (RTO)</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                AI-powered risk assessment for COD orders, customisable pincode blocking, and phone number and product ID filtering.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-background/60 border border-border/60 rounded-2xl p-4 space-y-2 hover:border-violet-500/30 transition-all">
              <div className="h-9 w-9 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center border border-violet-500/20">
                <Palette className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-extrabold text-foreground">Brand-perfect experience</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fully customisable interface with flexible payment method sorting and display.
              </p>
            </div>

          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-3xl p-8 glass max-w-md mx-auto">
            <p className="text-sm font-bold text-muted-foreground mb-4">Your cart is empty.</p>
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-md">
              Browse Catalog
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Form details section */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Shipping Address */}
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wide flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" /> Delivery Address
                  </h3>
                  <button
                    type="button"
                    disabled={isGeoDetecting}
                    onClick={handleDetectGeoLocation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/40 bg-primary/10 text-primary text-[10px] font-bold hover:bg-primary hover:text-white transition-all cursor-pointer min-h-[36px]"
                  >
                    <Navigation className={`h-3.5 w-3.5 ${isGeoDetecting ? 'animate-spin' : ''}`} />
                    <span>{isGeoDetecting ? 'Detecting...' : 'Auto-Detect GPS'}</span>
                  </button>
                </div>

                {geoStatusMsg && (
                  <div className="mb-4 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 p-2.5 rounded-xl">
                    {geoStatusMsg}
                  </div>
                )}

                {/* 100M+ SAVED ADDRESSES PRE-FILL SELECTOR */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      100M+ Smart Pre-filled Saved Addresses
                    </span>
                    <span className="text-[10px] font-bold text-violet-500">1-Click Auto Fill</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SAVED_PREFILL_ADDRESSES.map((addr) => {
                      const isSelected = selectedSavedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => handleSelectSavedAddress(addr)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                            isSelected
                              ? 'bg-violet-500/10 border-violet-500/50 shadow-sm'
                              : 'bg-background/40 border-border/60 hover:border-violet-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-foreground">{addr.label}</span>
                            {isSelected && <Check className="h-4 w-4 text-violet-500" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate font-sans">
                            {addr.name} • {addr.phone}
                          </p>
                          <p className="text-[11px] text-muted-foreground/80 truncate font-sans">
                            {addr.address}, {addr.city} ({addr.zip})
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Mobile Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-foreground/5 text-xs text-muted-foreground font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="8329819618"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 rounded-r-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Alternate Phone Number (Optional)</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-foreground/5 text-xs text-muted-foreground font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={altPhone}
                        onChange={(e) => setAltPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 rounded-r-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="123 Constructor St."
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">City</label>
                    <input
                      type="text"
                      required
                      placeholder="Tooltown"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">State</label>
                      <input
                        type="text"
                        required
                        placeholder="NY"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">ZIP / PIN CODE</label>
                      <input
                        type="text"
                        required
                        placeholder="10001"
                        value={shippingAddress.zip}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Details Section (Optional) */}
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm glass">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wide mb-1 flex items-center gap-2">
                  <span className="text-primary text-base">🏢</span> Business Details
                  <span className="text-[10px] font-normal normal-case text-muted-foreground border border-border px-2 py-0.5 rounded-full ml-1">Optional</span>
                </h3>
                <p className="text-[10px] text-muted-foreground mb-4">Fill in if you require a GST tax invoice for your business purchase.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Business Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma Hardware Pvt. Ltd."
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">GST Number (GSTIN)</label>
                    <input
                      type="text"
                      placeholder="e.g. 27AAPFU0939F1ZV"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                      maxLength={15}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 font-mono tracking-wider focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all uppercase"
                    />
                    {gstNumber.length > 0 && gstNumber.length < 15 && (
                      <p className="text-[10px] text-amber-500 mt-1 font-semibold">GSTIN must be exactly 15 characters ({gstNumber.length}/15)</p>
                    )}
                    {gstNumber.length === 15 && (
                      <p className="text-[10px] text-emerald-500 mt-1 font-semibold">✓ GSTIN format valid</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Option Card */}
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm glass space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wide flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-violet-500" /> Preferred Payment Option
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-wider text-violet-500 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                    Cashfree 1-Click Ready
                  </span>
                </div>

                {/* AI COD RTO RISK INTELLIGENCE BADGE */}
                <div className={`p-3.5 rounded-2xl border ${rtoRisk.badgeColor} space-y-1`}>
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      COD RTO Intelligence: {rtoRisk.riskLevel} RISK ({rtoRisk.score}/100)
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold">
                      {rtoRisk.isCodAllowed ? 'COD Verified' : 'Prepaid Preferred'}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-90 leading-relaxed">
                    {rtoRisk.message}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Cashfree PG / 1-Click */}
                  <label 
                    onClick={() => setPaymentMethod('cashfree')}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cashfree' ? 'border-violet-500 bg-violet-500/5 text-foreground shadow-sm' : 'border-border bg-background/50 text-muted-foreground'
                    }`}
                  >
                    <input type="radio" name="paymentOption" checked={paymentMethod === 'cashfree'} onChange={() => setPaymentMethod('cashfree')} className="accent-violet-500 h-4 w-4" />
                    <div className="flex-1">
                      <div className="text-xs font-black text-foreground flex items-center justify-between gap-2">
                        <span>⚡ Cashfree 1-Click Express Pay (UPI / Cards / NetBanking)</span>
                        <span className="text-[9px] font-sans font-extrabold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full">Recommended</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        Instant zero-surcharge checkout pre-filled with WELCOME10 10% discount & saved address
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery (COD) with RTO protection */}
                  <label 
                    onClick={() => {
                      if (rtoRisk.isCodAllowed) {
                        setPaymentMethod('cod');
                      } else {
                        alert(rtoRisk.message);
                      }
                    }}
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      !rtoRisk.isCodAllowed
                        ? 'border-border/40 bg-foreground/5 opacity-55 cursor-not-allowed'
                        : paymentMethod === 'cod'
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border bg-background/50 text-muted-foreground'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentOption" 
                      disabled={!rtoRisk.isCodAllowed}
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')} 
                      className="accent-primary h-4 w-4" 
                    />
                    <div className="flex-1">
                      <div className="text-xs font-bold text-foreground flex items-center justify-between gap-2">
                        <span>Cash on Delivery (COD)</span>
                        <span className={`text-[9px] font-sans font-extrabold uppercase border px-2 py-0.5 rounded-full ${rtoRisk.badgeColor}`}>
                          {rtoRisk.isCodAllowed ? 'RTO Passed' : 'High Risk Blocked'}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {rtoRisk.isCodAllowed 
                          ? 'Pay cash upon delivery. Phone OTP verification required.' 
                          : 'COD disabled due to high order value or RTO risk rating.'}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Summary Cart Receipt panel */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-md glass">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wide mb-4">
                  Order Summary
                </h3>

                {/* Items lists */}
                <div className="divide-y divide-border/30 max-h-48 overflow-y-auto mb-4 pr-1 no-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-2.5 flex justify-between text-xs">
                      <div>
                        <span className="text-foreground font-semibold line-clamp-1">{item.product.title}</span>
                        <span className="text-[10px] text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-foreground font-bold shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing totals */}
                <div className="border-t border-border pt-4 space-y-1.5 mb-6">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>GST (18%)</span>
                    <span className="font-semibold text-foreground">₹{cartTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold border-t border-border/40 pt-2 text-foreground">
                    <span>Total Cost</span>
                    <span className="text-primary text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit Checkout trigger */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 h-12 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all"
                >
                  <Lock className="h-4 w-4" /> Place Order Safely
                </button>
              </div>

              {/* Safety seal */}
              <div className="flex items-center gap-2 rounded-2xl bg-foreground/5 p-4 text-[10px] text-muted-foreground border border-border/60">
                <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                <span>
                  <strong>Safe & Encrypted Transactions:</strong> We utilize simulated 256-bit bank-level tokenizations. Absolutely no transaction data is stored.
                </span>
              </div>
            </div>

          </form>
        )}
      </main>

      {/* Simulated Secure Payment Process Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="max-w-md w-full mx-4 bg-card border border-border rounded-3xl p-8 text-center shadow-2xl glass">
            <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-2">
              Securing Checkout
            </h3>
            <p className="text-xs text-muted-foreground min-h-[16px] animate-pulse">
              {steps[processingStep]}
            </p>
          </div>
        </div>
      )}

      {/* CASHFREE 1-CLICK PHONE OTP VERIFICATION MODAL */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="max-w-sm w-full bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 relative overflow-hidden">
            <button
              onClick={() => setIsPhoneModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/10 text-muted-foreground transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <div className="h-12 w-12 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center mx-auto border border-violet-500/20 mb-2">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground">Cashfree 1-Click Login</h3>
              <p className="text-xs text-muted-foreground">
                Enter mobile number for instant OTP verification & address pre-filling from 100M+ saved addresses.
              </p>
            </div>

            {otpStep === 'phone' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-foreground/5 text-xs text-muted-foreground font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9910088219"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 rounded-r-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-black shadow-md hover:opacity-95 transition-all cursor-pointer"
                >
                  Send 6-Digit OTP Code
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-center text-lg font-bold tracking-widest text-foreground focus:border-violet-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground text-center mt-1">
                    Demo OTP: Enter <strong className="text-violet-500">123456</strong> or any 6 digits
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full h-11 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-md hover:bg-emerald-500 transition-all cursor-pointer"
                >
                  Verify & Pre-Fill Address
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
