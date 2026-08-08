'use client';

import React, { useState } from 'react';
import { Vendor, calculateVendorDeductions } from '../../utils/adminMockData';
import { Users, FileCheck2, Calculator, Check, X, ShieldAlert } from 'lucide-react';

interface AdminVendorsTabProps {
  vendors: Vendor[];
  onSaveVendors: (updatedVendors: Vendor[]) => void;
  userRole?: string;
}

export const AdminVendorsTab: React.FC<AdminVendorsTabProps> = ({ vendors, onSaveVendors, userRole }) => {
  const isReadOnly = userRole === 'employee';
  // Payout Calculator States
  const [calcSaleAmount, setCalcSaleAmount] = useState(100000);
  const [calcCommRate, setCalcCommRate] = useState(7.5);
  const [calcPgRate, setCalcPgRate] = useState(2.0);

  // Perform payout calculations
  const deductions = calculateVendorDeductions(calcSaleAmount, calcCommRate, calcPgRate);

  const handleUpdateStatus = (vendorId: string, newStatus: 'active' | 'rejected') => {
    const updated = vendors.map(v => 
      v.id === vendorId ? { ...v, status: newStatus } : v
    );
    onSaveVendors(updated);
  };

  const pendingVendors = vendors.filter(v => v.status === 'pending');

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to verify vendors.</p>
          </div>
        </div>
      )}
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Vendor Onboarding & Marketplace Ledgers</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Approve manufacturers, review compliance certificates, and calculate commission payout rates.</p>
      </div>

      {/* Grid: Onboarding Directory & Commission Settlements Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Onboarding Directory */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Users className="h-4.5 w-4.5 text-primary" /> Vendor Directory & approvals
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold">
                  <th className="p-3">Vendor / Region</th>
                  <th className="p-3">GSTIN / Legal Tax PAN</th>
                  <th className="p-3 text-center">Commission</th>
                  <th className="p-3 text-center">Verification docs</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {vendors.length > 0 ? (
                  vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3">
                        <span className="font-semibold text-foreground block">{v.name}</span>
                        <span className="text-[10px] text-muted-foreground block">{v.originState} • Cycle: {v.settlementCycle}</span>
                      </td>
                      <td className="p-3 font-mono">
                        <span className="font-bold block">{v.gstin}</span>
                        <span className="text-[10px] text-muted-foreground block">PAN: {v.pan}</span>
                      </td>
                      <td className="p-3 text-center font-bold text-foreground">
                        {v.commissionRate}%
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1 items-center justify-start text-[9px] font-bold">
                          <span className={`px-1.5 py-0.5 rounded ${v.documents.gstinCert ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>GST</span>
                          <span className={`px-1.5 py-0.5 rounded ${v.documents.panCard ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>PAN</span>
                          <span className={`px-1.5 py-0.5 rounded ${v.documents.cancelledCheque ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>CHEQUE</span>
                          <span className={`px-1.5 py-0.5 rounded ${v.documents.msmeCert ? 'bg-emerald-500/10 text-emerald-500' : 'bg-foreground/5 text-muted-foreground'}`}>MSME</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        {v.status === 'pending' ? (
                          isReadOnly ? (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              Pending Review
                            </span>
                          ) : (
                            <div className="flex gap-1.5 justify-center">
                              <button
                                onClick={() => handleUpdateStatus(v.id, 'active')}
                                className="p-1 rounded bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                                title="Approve credentials"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(v.id, 'rejected')}
                                className="p-1 rounded bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors cursor-pointer"
                                title="Reject documents"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )
                        ) : (
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            v.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}>
                            {v.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground text-xs font-medium">
                      No vendors onboarded yet. New vendor applications will appear here for verification.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payout Settlements Ledger */}
        <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="h-4.5 w-4.5 text-primary" /> Settlement Payout Ledger
          </h3>

          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Verify transaction payout totals after taking commission fees, gateway fees, and legal Section 52 TCS tax withholdings.
          </p>

          <div className="space-y-4">
            
            {/* Input Sales Value */}
            <div>
              <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Gross Sales Amount (₹)</label>
              <input
                type="number"
                value={calcSaleAmount}
                onChange={(e) => setCalcSaleAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            {/* Commissions Rates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Commission Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={calcCommRate}
                  onChange={(e) => setCalcCommRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-center"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">PG Gateway Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={calcPgRate}
                  onChange={(e) => setCalcPgRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-center"
                />
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-border/40 pt-4 space-y-2 text-xs font-semibold">
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marketplace Commission ({calcCommRate}%)</span>
                <span className="text-foreground">-₹{deductions.marketplaceCommission.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Gateway Charge ({calcPgRate}%)</span>
                <span className="text-foreground">-₹{deductions.pgFee.toLocaleString('en-IN')}</span>
              </div>

              {/* 1% TCS */}
              <div className="flex justify-between text-amber-500 font-bold bg-amber-500/5 p-2 rounded-xl border border-amber-500/10">
                <span className="flex items-center gap-1"><ShieldAlert className="h-3.5 w-3.5" /> 1% TCS Section 52</span>
                <span>-₹{deductions.tcsDeduction.toLocaleString('en-IN')}</span>
              </div>

              <hr className="border-border/30 my-2" />

              <div className="flex justify-between font-extrabold">
                <span className="text-muted-foreground">Total Deductions</span>
                <span className="text-red-500">-₹{deductions.totalDeductions.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-sm font-black border-t border-border pt-2 text-foreground">
                <span>Net Payable Settlement</span>
                <span className="text-primary text-base">₹{deductions.netPayout.toLocaleString('en-IN')}</span>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminVendorsTab;
