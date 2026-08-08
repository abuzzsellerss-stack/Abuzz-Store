'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { CheckCircle2, XCircle, Clock, Loader2, ArrowRight, ShoppingBag } from 'lucide-react';
import { trackMetaEvent } from '../../../components/MetaPixel';
import { createShiprocketOrder } from '../../../lib/shiprocket';

function VerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const orderId = searchParams.get('order_id') || searchParams.get('orderId');

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'SUCCESS' | 'PENDING' | 'FAILED' | 'ERROR'>('PENDING');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setStatus('ERROR');
      setErrorMsg('No order ID returned from Cashfree.');
      return;
    }

    async function verifyPayment() {
      try {
        setLoading(true);
        const res = await fetch('/api/cashfree/verify-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        if (data.success && data.status === 'SUCCESS') {
          setStatus('SUCCESS');
          setPaymentDetails(data.payment);

          // Clear cart upon verified purchase
          clearCart();

          // Fire Meta Pixel Purchase event
          const amount = data.payment?.payment_amount || 0;
          trackMetaEvent('Purchase', {
            value: amount,
            currency: 'INR',
            order_id: orderId,
            payment_method: 'Cashfree PG',
          });

          // Attempt Shiprocket auto-creation if saved locally
          try {
            const savedOrders = localStorage.getItem('abuzz_orders');
            if (savedOrders) {
              const orders = JSON.parse(savedOrders);
              const orderRecord = orders.find((o: any) => o.id === orderId);
              if (orderRecord) {
                createShiprocketOrder(orderRecord).catch(err =>
                  console.log('Shiprocket sync deferred:', err)
                );
              }
            }
          } catch (e) {
            console.log('Local order lookup note:', e);
          }

        } else if (data.status === 'PENDING') {
          setStatus('PENDING');
        } else {
          setStatus('FAILED');
          setErrorMsg(data.error || 'Payment verification failed or was declined.');
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setStatus('ERROR');
        setErrorMsg('Network error while verifying payment status.');
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [orderId, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold">Verifying Cashfree Payment...</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Please wait while we confirm your transaction securely with Cashfree.
        </p>
      </div>
    );
  }

  if (status === 'SUCCESS') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-12">
        <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500" />
          
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4 stroke-[1.5]" />

          <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your transaction has been verified. Thank you for shopping with Abuzz Store.
          </p>

          <div className="my-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-mono font-bold text-foreground">{orderId}</span>
            </div>
            {paymentDetails?.cf_payment_id && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-foreground">{paymentDetails.cf_payment_id}</span>
              </div>
            )}
            {paymentDetails?.payment_amount && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ₹{parseFloat(paymentDetails.payment_amount).toLocaleString('en-IN')}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Gateway:</span>
              <span className="font-semibold text-foreground">Cashfree PG India</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/profile"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              <ShoppingBag className="h-4 w-4" /> View My Orders
            </Link>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-border text-foreground hover:bg-muted/50 transition text-sm font-medium"
            >
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'PENDING') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-12">
        <div className="max-w-md w-full bg-card border border-amber-500/30 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-amber-500" />
          
          <Clock className="h-16 w-16 text-amber-500 mx-auto mb-4 stroke-[1.5] animate-pulse" />

          <h2 className="text-2xl font-bold text-foreground">Payment Processing...</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Cashfree is processing your payment authorization. Your order status will update shortly.
          </p>

          <div className="my-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs font-mono text-muted-foreground">
            Order ID: {orderId}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Refresh Status
            </button>
            <Link
              href="/profile"
              className="block w-full text-sm text-muted-foreground hover:text-foreground transition"
            >
              Check Orders in Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-12">
      <div className="max-w-md w-full bg-card border border-destructive/30 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-2 bg-destructive" />
        
        <XCircle className="h-16 w-16 text-destructive mx-auto mb-4 stroke-[1.5]" />

        <h2 className="text-2xl font-bold text-foreground">Payment Failed</h2>
        <p className="text-sm text-muted-foreground mt-2">
          {errorMsg || 'Your transaction could not be completed.'}
        </p>

        <div className="my-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-xs font-mono text-destructive">
          Order ID: {orderId || 'N/A'}
        </div>

        <div className="space-y-3">
          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Try Checkout Again
          </Link>
          <Link
            href="/"
            className="block w-full text-sm text-muted-foreground hover:text-foreground transition"
          >
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CashfreeVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}
