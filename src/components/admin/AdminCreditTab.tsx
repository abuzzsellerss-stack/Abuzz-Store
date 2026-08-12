'use client';

import React, { useState } from 'react';
import { CorporateCreditProfile, OfflineBankReconciliation } from '../../utils/adminMockData';
import { CreditCard, CheckCircle2, ShieldAlert, BadgeIndianRupee, Sparkles, RefreshCw } from 'lucide-react';

interface AdminCreditTabProps {
  credits: CorporateCreditProfile[];
  onSaveCredits: (updatedCredits: CorporateCreditProfile[]) => void;
  recons: OfflineBankReconciliation[];
  onSaveRecons: (updatedRecons: OfflineBankReconciliation[]) => void;
  userRole?: string;
}

export const AdminCreditTab: React.FC<AdminCreditTabProps> = ({
  credits,
  onSaveCredits,
  recons,
  onSaveRecons,
  userRole
}) => {
  const isReadOnly = userRole === 'employee';
  const [successMsg, setSuccessMsg] = useState('');

  const toggleStatus = (id: string, currentStatus: 'active' | 'suspended' | 'blocked') => {
    let nextStatus: 'active' | 'suspended' | 'blocked' = 'active';
    if (currentStatus === 'active') nextStatus = 'suspended';
    else if (currentStatus === 'suspended') nextStatus = 'blocked';
    
    const updated = credits.map(c => 
      c.id === id ? { ...c, status: nextStatus } : c
    );
    onSaveCredits(updated);
  };

  const handleReconcileUTR = (reconId: string, utrNumber: string, amount: number, companyId: string) => {
    // 1. Mark UTR as reconciled
    const updatedRecons = recons.map(r => 
      r.id === reconId ? { ...r, status: 'reconciled' as const } : r
    );
    onSaveRecons(updatedRecons);

    // 2. Adjust corporate credit ledger values
    const updatedCredits = credits.map(c => {
      if (c.id === companyId) {
        const nextOutstanding = Math.max(0, c.outstandingBalance - amount);
        const nextAvailable = c.creditLimit - nextOutstanding;
        const nextOverdue = Math.max(0, c.overdueAmount - amount);
        const nextStatus = nextOverdue === 0 ? 'active' as const : c.status;
        
        return {
          ...c,
          outstandingBalance: Number(nextOutstanding.toFixed(2)),
          availableCredit: Number(nextAvailable.toFixed(2)),
          overdueAmount: Number(nextOverdue.toFixed(2)),
          status: nextStatus
        };
      }
      return c;
    });
    
    onSaveCredits(updatedCredits);
    
    setSuccessMsg(`UTR ${utrNumber} successfully reconciled! Account limits adjusted.`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to reconcile payments.</p>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-4 inset-x-6 z-50 p-3 rounded-xl bg-primary text-white text-center font-bold flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3">
          <Sparkles className="h-4.5 w-4.5 animate-spin" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Corporate Credits & Bank Reconciliations</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Track credit cycles (Khata), freeze accounts, and match offline bank transfers to invoices.</p>
      </div>

      {/* Grid: Credit limits & UTR reconciles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Credit Directory */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="h-4.5 w-4.5 text-primary" /> Corporate Credit Limits Registry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold">
                  <th className="p-3">Buyer Company</th>
                  <th className="p-3 text-right">Sanctioned Limit</th>
                  <th className="p-3 text-right">Outstanding</th>
                  <th className="p-3 text-right">Available Credit</th>
                  <th className="p-3 text-center">Overdue</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 font-sans">
                {credits.length > 0 ? (
                  credits.map((c) => (
                    <tr key={c.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3">
                        <span className="font-semibold text-foreground block">{c.companyName}</span>
                        <span className="text-[10px] text-muted-foreground block">Repayment Terms: Net {c.netTermsDays} Days</span>
                      </td>
                      <td className="p-3 text-right font-bold text-foreground">
                        ₹{c.creditLimit.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-bold text-red-500">
                        ₹{c.outstandingBalance.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-bold text-emerald-500">
                        ₹{c.availableCredit.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-center font-bold text-foreground">
                        {c.overdueAmount > 0 ? (
                          <span className="text-red-500 font-extrabold">₹{c.overdueAmount.toLocaleString('en-IN')}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => !isReadOnly && toggleStatus(c.id, c.status)}
                          disabled={isReadOnly}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isReadOnly ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                          } ${
                            c.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            c.status === 'suspended' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}
                        >
                          {c.status}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground text-xs font-medium">
                      No corporate credit limits configured.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Offline NEFT/RTGS Bank Recons */}
        <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
            <BadgeIndianRupee className="h-4.5 w-4.5 text-primary" /> Bank UTR Reconciles
          </h3>
          
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Audit manual bank wire transfers (NEFT / RTGS / IMPS) using matching UTR reference codes, updating account balances instantly.
          </p>

          <div className="space-y-4">
            {recons.length > 0 ? (
              recons.map((r) => (
                <div 
                  key={r.id} 
                  className={`p-4 rounded-2xl border text-xs flex flex-col gap-2.5 ${
                    r.status === 'reconciled' 
                      ? 'bg-emerald-500/5 border-emerald-500/20 opacity-70' 
                      : 'bg-amber-500/10 border-amber-500/20'
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-foreground block">{r.mappedCompanyName}</strong>
                      <span className="text-[9px] text-muted-foreground font-mono">UTR: {r.utrNumber}</span>
                    </div>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                      r.status === 'reconciled' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      {r.status}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="flex justify-between items-center text-[10px] bg-foreground/5 p-2 rounded-xl border border-border/40">
                    <span className="text-muted-foreground">Transfer amount:</span>
                    <span className="text-foreground font-black text-sm">₹{r.amount.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Action Reconcile button */}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[9px] text-muted-foreground font-mono">Date: {new Date(r.paymentDate).toLocaleDateString()}</span>
                    
                    {r.status === 'pending' && !isReadOnly && (
                      <button
                        onClick={() => handleReconcileUTR(r.id, r.utrNumber, r.amount, r.mappedCompanyId)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center gap-1 font-bold text-[9px] cursor-pointer"
                      >
                        <RefreshCw className="h-3 w-3" /> Reconcile
                      </button>
                    )}
                  </div>

                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground text-xs font-medium border border-dashed border-border rounded-2xl">
                No bank UTR transfers pending reconciliation.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminCreditTab;
