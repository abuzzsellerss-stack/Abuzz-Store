'use client';

import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AdminOrderRecord } from '../utils/adminMockData';

interface GSTInvoiceModalProps {
  order: AdminOrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GSTInvoiceModal({ order, isOpen, onClose }: GSTInvoiceModalProps) {
  if (!isOpen || !order) return null;

  const invoiceNumber = `INV-${order.id.replace('#', '')}`;
  const invoiceDate = order.createdAt || new Date().toLocaleDateString('en-IN');
  const companyName = "Abuzz Sellers";
  const companyGstin = "27ALMPY1073G1ZP";
  const companyAddress = "S.NO13/1 Walhekarwadi Rd. , Chinchwad, Pune, Maharashtra 411033, India";
  const companyEmail = "support@abuzz.store | Phone: +91-8329819618";

  const subtotal = order.taxableSubtotal || order.totalAmount || 0;
  const discount = 0;
  const taxableValue = subtotal - discount;
  const totalTax = order.totalTax || 0;
  const isInterstate = order.gstin ? !order.gstin.startsWith('27') : false;
  
  const cgst = isInterstate ? 0 : totalTax / 2;
  const sgst = isInterstate ? 0 : totalTax / 2;
  const igst = isInterstate ? totalTax : 0;
  const grandTotal = order.totalAmount || (taxableValue + totalTax);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      
      {/* Container Box */}
      <div className="relative max-w-3xl w-full bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8 print:shadow-none print:m-0 print:w-full print:max-w-none print:rounded-none">
        
        {/* Top Control Bar (Hidden during printing) */}
        <div className="flex items-center justify-between bg-slate-900 text-white px-6 py-4 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">GST Tax Invoice Viewer</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-all shadow-md"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* INVOICE SHEET (A4 Print Layout Target) */}
        <div className="p-8 sm:p-10 font-sans print:p-6" id="printable-gst-invoice">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between border-b-2 border-slate-900 pb-6 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-black tracking-tight text-amber-600">ABUZZ</span>
                <span className="text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded uppercase">STORE</span>
              </div>
              <h2 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-1">{companyName}</h2>
              <p className="text-[11px] text-slate-600 max-w-xs leading-relaxed">{companyAddress}</p>
              <p className="text-[11px] text-slate-600 font-semibold mt-1">GSTIN: <span className="font-bold text-slate-900">{companyGstin}</span></p>
              <p className="text-[10px] text-slate-500">{companyEmail}</p>
            </div>

            <div className="sm:text-right flex flex-col justify-between">
              <div>
                <span className="inline-block bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded mb-2">
                  TAX INVOICE
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">Invoice No: {invoiceNumber}</h3>
                <p className="text-xs text-slate-600 mt-0.5">Date: {invoiceDate}</p>
                <p className="text-xs text-slate-600">Place of Supply: {isInterstate ? 'Inter-State IGST' : 'Maharashtra (27)'}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Payment Method</span>
                <span className="text-xs font-extrabold text-emerald-700 uppercase">{order.paymentMode || 'Online Prepaid'} ({order.paymentStatus || 'PAID'})</span>
              </div>
            </div>
          </div>

          {/* Billed To / Shipped To Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block mb-1">Customer / Billed To</span>
              <h4 className="font-extrabold text-slate-900 text-sm">{order.customerName}</h4>
              <p className="text-slate-700 font-medium">{order.customerEmail}</p>
              {order.gstin && (
                <div className="mt-2 inline-block bg-slate-100 border border-slate-300 px-2.5 py-1 rounded font-bold text-slate-800 text-[11px]">
                  GSTIN: {order.gstin}
                </div>
              )}
            </div>

            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block mb-1">Shipping Address</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {order.shippingAddress || 'Standard Delivery Address'}
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3 font-bold">#</th>
                  <th className="py-2.5 px-3 font-bold">Item Description</th>
                  <th className="py-2.5 px-3 font-bold text-center">HSN Code</th>
                  <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                  <th className="py-2.5 px-3 font-bold text-right">Unit Rate (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{item.productTitle}</td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">{item.hsnCode || '8204 11 00'}</td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900">{item.quantity}</td>
                      <td className="py-3 px-3 text-right font-medium text-slate-700">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3 px-3 font-bold text-slate-500">1</td>
                    <td className="py-3 px-3 font-semibold text-slate-900">Industrial Tools & Hardware Supplies Package</td>
                    <td className="py-3 px-3 text-center font-mono text-slate-600">8204 11 00</td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900">1</td>
                    <td className="py-3 px-3 text-right font-medium text-slate-700">₹{taxableValue.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">₹{taxableValue.toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Tax Calculation Totals Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            
            {/* Left: GST Declaration & Signatory */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-700 uppercase">Declaration:</span>
                <p className="text-[10px] text-slate-600 leading-normal">
                  We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.
                </p>
              </div>

              <div className="pt-6 text-center sm:text-left">
                <div className="h-10 text-[10px] font-bold text-slate-400 italic flex items-end">
                  [ Authorized Signature ]
                </div>
                <span className="text-[11px] font-extrabold uppercase text-slate-800 block">For Abuzz Sellers</span>
                <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Authorized Signatory</span>
              </div>
            </div>

            {/* Right: Calculations Summary */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Subtotal (Gross Value):</span>
                <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-100 text-emerald-700">
                  <span className="font-medium">Promotional Discount:</span>
                  <span className="font-bold">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-slate-100 font-bold bg-slate-50 px-2 rounded">
                <span className="text-slate-800">Taxable Value:</span>
                <span className="text-slate-900">₹{taxableValue.toLocaleString('en-IN')}</span>
              </div>

              {!isInterstate ? (
                <>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>CGST (9%):</span>
                    <span className="font-semibold text-slate-800">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>SGST (9%):</span>
                    <span className="font-semibold text-slate-800">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between py-1 text-slate-600">
                  <span>IGST (18%):</span>
                  <span className="font-semibold text-slate-800">₹{igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="flex justify-between py-3 border-t-2 border-slate-900 font-black text-sm text-slate-900 mt-2 bg-amber-500/10 px-3 rounded-xl border border-amber-500/30">
                <span className="uppercase tracking-wider">Total Amount Payable:</span>
                <span className="text-amber-700 text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500 font-medium">
            Thank you for your business with Abuzz Store! | This is a computer-generated tax invoice.
          </div>

        </div>

      </div>

    </div>
  );
}
