'use client';

import React, { useState } from 'react';
import { RfqNegotiation, calculateGstSplit, INITIAL_HSN_CODES } from '../../utils/adminMockData';
import { FileSignature, Check, X, ShieldAlert, Sparkles, Download, Save, RefreshCw } from 'lucide-react';

interface AdminRFQTabProps {
  rfqs: RfqNegotiation[];
  onSaveRfqs: (updatedRfqs: RfqNegotiation[]) => void;
  userRole?: string;
}

export const AdminRFQTab: React.FC<AdminRFQTabProps> = ({ rfqs, onSaveRfqs, userRole }) => {
  const isReadOnly = userRole === 'employee';
  const [selectedRfqId, setSelectedRfqId] = useState<string | null>(rfqs[0]?.id || null);
  const [pdfNotification, setPdfNotification] = useState('');

  // Selected RFQ object
  const activeRfq = rfqs.find(r => r.id === selectedRfqId);

  // Negotiation fields
  const [offeredPrices, setOfferedPrices] = useState<Record<string, number>>({});
  const [freightSurcharge, setFreightSurcharge] = useState(0);
  const [creditDays, setCreditDays] = useState(30);

  // Reset fields when active RFQ changes
  React.useEffect(() => {
    if (activeRfq) {
      const prices: Record<string, number> = {};
      activeRfq.items.forEach(item => {
        prices[item.productId] = item.offeredPrice;
      });
      setOfferedPrices(prices);
      setFreightSurcharge(activeRfq.freightSurcharge);
      setCreditDays(activeRfq.creditDays);
    }
  }, [selectedRfqId]);

  // Handle counter pricing inputs
  const handlePriceCounter = (productId: string, val: number) => {
    setOfferedPrices(prev => ({ ...prev, [productId]: val }));
  };

  const handleSaveNegotiation = () => {
    if (!activeRfq) return;
    
    const updatedItems = activeRfq.items.map(item => ({
      ...item,
      offeredPrice: offeredPrices[item.productId] || item.offeredPrice
    }));

    const updated = rfqs.map(r => 
      r.id === activeRfq.id 
        ? { ...r, items: updatedItems, freightSurcharge, creditDays, status: 'counter_offered' as const } 
        : r
    );

    onSaveRfqs(updated);
    setPdfNotification('Counter-offer pricing saved successfully!');
    setTimeout(() => setPdfNotification(''), 2500);
  };

  const handleUpdateStatus = (rfqId: string, newStatus: any) => {
    const updated = rfqs.map(r => 
      r.id === rfqId ? { ...r, status: newStatus } : r
    );
    onSaveRfqs(updated);
  };

  const handleDownloadPdf = () => {
    if (!activeRfq) return;
    setPdfNotification(`Drafting official quote PDF: ${activeRfq.companyName}...`);
    setTimeout(() => {
      setPdfNotification(`Quotation PDF downloaded successfully for ${activeRfq.companyName}!`);
      setTimeout(() => setPdfNotification(''), 3000);
    }, 1500);
  };

  // Perform dynamic GST calculations on the counter offered prices
  let rfqSubtotal = 0;
  let rfqTax = 0;
  let stateAuditLog = { isInterstate: false, cgst: 0, sgst: 0, igst: 0 };

  if (activeRfq) {
    activeRfq.items.forEach(item => {
      const activePrice = offeredPrices[item.productId] || item.offeredPrice;
      rfqSubtotal += activePrice * item.quantity;
      
      // Determine interstate status based on Maharashtra warehouse origin vs customer GST state code
      const custStateCode = activeRfq.gstin.substring(0, 2);
      const isMH = custStateCode === '27';
      const shippingState = isMH ? 'Maharashtra' : 'Out of State';
      
      const categoryHsn = INITIAL_HSN_CODES.find(h => h.category.toLowerCase().includes('power') || h.category.toLowerCase().includes('cement'))?.code || '8467';
      const itemGst = calculateGstSplit(activePrice, item.quantity, categoryHsn, 'Maharashtra', shippingState);
      rfqTax += itemGst.totalTax;
      
      stateAuditLog.isInterstate = itemGst.isInterstate;
      stateAuditLog.cgst += itemGst.cgstAmount;
      stateAuditLog.sgst += itemGst.sgstAmount;
      stateAuditLog.igst += itemGst.igstAmount;
    });
  }

  const rfqGrandTotal = rfqSubtotal + rfqTax + freightSurcharge;

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to approve quotes.</p>
          </div>
        </div>
      )}
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">RFQ Negotiation Workspace</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Review corporate request submissions, negotiate pricing parameters, and draft quote sheets.</p>
      </div>

      {/* Main Grid: RFQ Queue List & Negotiation Workspace Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RFQ Queue List */}
        <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
            RFQ Inbox Queue
          </h3>

          <div className="space-y-3">
            {rfqs.length > 0 ? (
              rfqs.map((r) => {
                const isSelected = selectedRfqId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRfqId(r.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 cursor-pointer ${
                      isSelected 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                        : 'border-border/60 hover:bg-foreground/5 bg-background/25'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-foreground truncate max-w-[150px]">{r.companyName}</span>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        r.status === 'pending_review' ? 'bg-amber-500/10 text-amber-500' :
                        r.status === 'approved_by_client' ? 'bg-emerald-500/10 text-emerald-500' :
                        'bg-foreground/5 text-muted-foreground'
                      }`}>
                        {r.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[10px] text-muted-foreground flex justify-between font-mono">
                      <span>ID: {r.id.toUpperCase()}</span>
                      <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-muted-foreground text-xs font-medium border border-dashed border-border rounded-2xl">
                No RFQs in negotiation queue.
              </div>
            )}
          </div>
        </div>

        {/* Negotiation Console */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-sm glass relative min-h-[400px]">
          
          {pdfNotification && (
            <div className="absolute top-4 inset-x-6 z-20 p-3 rounded-xl bg-primary text-white text-center font-bold font-sans flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3">
              <Sparkles className="h-4.5 w-4.5 animate-pulse" />
              <span>{pdfNotification}</span>
            </div>
          )}

          {activeRfq ? (
            <div className="space-y-6">
              
              {/* Header Details */}
              <div className="border-b border-border/40 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-foreground">{activeRfq.companyName}</h3>
                  <span className="text-[10px] text-muted-foreground mt-0.5">GSTIN: {activeRfq.gstin} • Contact: {activeRfq.contactPerson}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadPdf}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 font-bold transition-all text-[10px] cursor-pointer"
                  >
                    <Download className="h-4 w-4" /> Download PDF Quote
                  </button>
                </div>
              </div>

              {/* Items List Table */}
              <div>
                <h4 className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider mb-2">Requested Catalog Items</h4>
                <div className="border border-border/40 rounded-2xl overflow-hidden">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-foreground/5 text-muted-foreground font-bold border-b border-border/40">
                        <th className="p-3">Item Name</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Target Price</th>
                        <th className="p-3 text-right">Counter Offer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20 font-sans">
                      {activeRfq.items.map((item) => (
                        <tr key={item.productId}>
                          <td className="p-3 font-semibold text-foreground">{item.productTitle}</td>
                          <td className="p-3 text-center font-bold text-foreground">{item.quantity}</td>
                          <td className="p-3 text-right font-bold text-muted-foreground">₹{item.targetPrice}</td>
                          <td className="p-3 text-right">
                            <input
                              type="number"
                              disabled={isReadOnly}
                              value={offeredPrices[item.productId] ?? item.offeredPrice}
                              onChange={(e) => handlePriceCounter(item.productId, Number(e.target.value))}
                              className="w-24 rounded-lg border border-border bg-background/80 px-2 py-1 text-right font-bold text-primary disabled:opacity-50"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Logistics, Freight and Credit parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Freight Transport Surcharge (₹)</label>
                  <input
                    type="number"
                    disabled={isReadOnly}
                    value={freightSurcharge}
                    onChange={(e) => setFreightSurcharge(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Corporate Credit Limit Terms (Days)</label>
                  <select
                    disabled={isReadOnly}
                    value={creditDays}
                    onChange={(e) => setCreditDays(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 min-h-[44px] disabled:opacity-50"
                  >
                    <option value={15}>Net 15 Days</option>
                    <option value={30}>Net 30 Days</option>
                    <option value={45}>Net 45 Days</option>
                    <option value={60}>Net 60 Days</option>
                  </select>
                </div>
              </div>

              {/* Real-time Taxes Split & Summary */}
              <div className="border-t border-border/40 pt-4 flex flex-col sm:flex-row justify-between gap-6">
                
                {/* GST Compliance breakdown */}
                <div className="p-4 rounded-2xl bg-foreground/5 border border-border/60 space-y-1.5 flex-1">
                  <strong className="block text-[9px] uppercase tracking-wider text-muted-foreground mb-2">Automated GST Audit Trail</strong>
                  <div className="flex justify-between">
                    <span>Taxation Type</span>
                    <span className="font-bold text-foreground">
                      {stateAuditLog.isInterstate ? 'Interstate (IGST)' : 'Intrastate (CGST+SGST)'}
                    </span>
                  </div>
                  {stateAuditLog.isInterstate ? (
                    <div className="flex justify-between">
                      <span>IGST Amount</span>
                      <span className="font-bold text-primary">₹{stateAuditLog.igst.toLocaleString('en-IN')}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>CGST Amount</span>
                        <span className="font-bold text-foreground">₹{stateAuditLog.cgst.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SGST Amount</span>
                        <span className="font-bold text-foreground">₹{stateAuditLog.sgst.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Pricing Totals */}
                <div className="space-y-1.5 w-full sm:w-60 font-sans">
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Offered Subtotal</span>
                    <span className="text-foreground">₹{rfqSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">GST Taxes</span>
                    <span className="text-foreground">₹{rfqTax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-muted-foreground">Freight Surcharges</span>
                    <span className="text-foreground">₹{freightSurcharge.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-black text-sm text-foreground">
                    <span>Gross Invoice Estimate</span>
                    <span className="text-primary text-base">₹{rfqGrandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              {!isReadOnly && (
                <div className="border-t border-border/40 pt-4 flex justify-end gap-3.5">
                  <button
                    onClick={() => handleUpdateStatus(activeRfq.id, 'rejected')}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/5 font-bold transition-all cursor-pointer min-h-[44px]"
                  >
                    <X className="h-4 w-4" /> Reject Submission
                  </button>
                  <button
                    onClick={handleSaveNegotiation}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 text-foreground font-bold transition-all cursor-pointer min-h-[44px]"
                  >
                    <Save className="h-4 w-4 text-primary" /> Save Counter Offer
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(activeRfq.id, 'approved_by_client')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all cursor-pointer min-h-[44px]"
                  >
                    <Check className="h-4.5 w-4.5" /> Approve Quote
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-12">
              <FileSignature className="h-12 w-12 text-muted-foreground/30 mb-2 stroke-[1.5]" />
              <p>No active RFQ selected. Please pick a company on the sidebar registry.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminRFQTab;
