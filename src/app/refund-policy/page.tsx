import React from 'react';
import { ShieldCheck, RefreshCw, Truck, Phone, Mail, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Return & Refund Policy | Abuzz Store',
  description: 'Official Return and Refund Policy for Abuzz Store. Learn about our 7-day hassle-free returns, replacement policy, and refund processing timelines.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-border pb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="h-4 w-4" /> Transparency & Protection
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Return & Refund Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last Updated: August 2026 | Applies to all orders placed on Abuzz Store (https://abuzz.store)
          </p>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
            <RefreshCw className="h-8 w-8 text-primary shrink-0" />
            <div>
              <h3 className="text-xs font-bold uppercase">7-Day Replacement</h3>
              <p className="text-[11px] text-muted-foreground">For defective or damaged items</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
            <Truck className="h-8 w-8 text-emerald-500 shrink-0" />
            <div>
              <h3 className="text-xs font-bold uppercase">Free Return Pickup</h3>
              <p className="text-[11px] text-muted-foreground">Arranged via Delhivery / Blue Dart</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-amber-500 shrink-0" />
            <div>
              <h3 className="text-xs font-bold uppercase">3–5 Day Refund</h3>
              <p className="text-[11px] text-muted-foreground">Direct to original payment method</p>
            </div>
          </div>
        </div>

        {/* Policy Body */}
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-foreground/90">
          
          <section className="bg-card p-6 rounded-2xl border border-border space-y-3">
            <h2 className="text-lg font-bold text-foreground">1. Return Eligibility & Window</h2>
            <p>
              At <strong>Abuzz Store</strong> (LXMI brand items and industrial tooling), customer satisfaction is our highest priority. You are eligible for a replacement or full refund within <strong>7 days of delivery</strong> under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>The item received is damaged, defective, or non-functional upon unboxing.</li>
              <li>The wrong product, size, or SKU was delivered compared to your order confirmation.</li>
              <li>The product has missing parts or accessories listed in the package contents.</li>
              <li>The item must be unused, in its original packaging, with all tags and invoice intact.</li>
            </ul>
          </section>

          <section className="bg-card p-6 rounded-2xl border border-border space-y-3">
            <h2 className="text-lg font-bold text-foreground">2. How to Request a Return or Replacement</h2>
            <p>Initiating a return is simple and requires no login or complex steps:</p>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>Contact our customer support team via email at <strong>support@abuzz.store</strong> or phone/WhatsApp at <strong>+91 98765 43210</strong>.</li>
              <li>Provide your Order ID (e.g. <code>OD-AS-01</code>) and a brief description along with photo/video proof of the damage or defect.</li>
              <li>Our team will inspect your request within 24 hours and generate a Reverse Pickup Airway Bill (AWB) via our courier partners (Delhivery / Blue Dart).</li>
              <li>Our courier executive will collect the return shipment directly from your delivery address at zero cost to you.</li>
            </ol>
          </section>

          <section className="bg-card p-6 rounded-2xl border border-border space-y-3">
            <h2 className="text-lg font-bold text-foreground">3. Refund Processing & Timelines</h2>
            <p>
              Once your returned item arrives at our warehouse and passes physical inspection (usually within 48 hours of pickup):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li><strong>Prepaid Orders (Razorpay / UPI / Credit Card / Net Banking):</strong> The refund will be credited directly back to the original source account within <strong>3 to 5 business days</strong>.</li>
              <li><strong>Cash on Delivery (COD) Orders:</strong> Refunds are processed via instant UPI transfer or direct NEFT bank transfer upon receiving account details.</li>
            </ul>
          </section>

          <section className="bg-card p-6 rounded-2xl border border-border space-y-3">
            <h2 className="text-lg font-bold text-foreground">4. Non-Returnable Items</h2>
            <p className="text-muted-foreground">
              Custom-built industrial machinery, consumable chemical bonding liquids once opened, or items damaged due to customer misuse or unauthorized physical alteration are non-returnable.
            </p>
          </section>

          <section className="bg-card p-6 rounded-2xl border border-border space-y-3">
            <h2 className="text-lg font-bold text-foreground">5. Customer Support Contact Information</h2>
            <p className="text-muted-foreground">If you have any questions regarding returns or refunds, please reach out to our team:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Mail className="h-4 w-4 text-primary" /> Email: support@abuzz.store
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <Phone className="h-4 w-4 text-primary" /> Phone: +91 83298 19618
              </div>
            </div>
          </section>

        </div>

        {/* Back Link */}
        <div className="pt-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
            ← Return to Abuzz Store Home
          </Link>
        </div>

      </div>
    </div>
  );
}
