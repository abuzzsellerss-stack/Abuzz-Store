'use client';

import React, { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  Landmark, 
  Sparkles, 
  X, 
  FileText,
  DollarSign,
  RotateCcw
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { AdminOrderRecord } from '../../utils/adminMockData';

interface TransactionRecord {
  id: string;
  orderId: string;
  customerName: string;
  method: 'Razorpay (UPI/Card)' | 'PhonePe (UPI QR)' | 'Bank Wire (NEFT/RTGS)' | 'Cash on Delivery';
  utrNumber: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'completed' | 'pending' | 'refunded' | 'failed';
  date: string;
}

interface AdminPaymentsTabProps {
  orders: AdminOrderRecord[];
  userRole?: string;
}

export const AdminPaymentsTab: React.FC<AdminPaymentsTabProps> = ({ orders, userRole }) => {
  const isReadOnly = userRole === 'employee';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMethodFilter, setSelectedMethodFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [toastMsg, setToastMsg] = useState('');

  // Persistent Reset State initialized from localStorage (Defaults to TRUE = All Data Zero)
  const [isResetZero, setIsResetZero] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('abuzz_payments_is_reset');
      if (saved === null) return true;
      return saved === 'true';
    }
    return true;
  });

  // Payout Modal States
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('0');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank (A/C: ****4821 - IFSC: HDFC0001234)');
  const [isSubmittingPayout, setIsSubmittingPayout] = useState(false);

  const handleResetPaymentsData = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('abuzz_payments_is_reset', 'true');
    }
    setIsResetZero(true);
    setToastMsg('All Payments, Collections & Payout metrics reset to ZERO!');
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleRestorePaymentsBaseline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('abuzz_payments_is_reset', 'false');
    }
    setIsResetZero(false);
    setToastMsg('Sample demo payment transactions re-loaded.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Initial Mock Transactions Ledger Data
  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: 'TXN-894101',
      orderId: 'ORD-1001',
      customerName: 'Larsen & Toubro Infrastructure',
      method: 'Razorpay (UPI/Card)',
      utrNumber: 'RZP_PAY_90412841',
      amount: 54495,
      fee: 1089.90,
      netAmount: 53405.10,
      status: 'completed',
      date: '2026-07-31 10:45 AM'
    },
    {
      id: 'TXN-894102',
      orderId: 'ORD-1002',
      customerName: 'Tata Projects Ltd',
      method: 'Bank Wire (NEFT/RTGS)',
      utrNumber: 'UTR_HDFC_89419201',
      amount: 35000,
      fee: 0,
      netAmount: 35000.00,
      status: 'completed',
      date: '2026-07-30 04:15 PM'
    },
    {
      id: 'TXN-894103',
      orderId: 'ORD-1003',
      customerName: 'Godrej Construction Corp',
      method: 'PhonePe (UPI QR)',
      utrNumber: 'PPE_UPI_77192841',
      amount: 18500,
      fee: 0,
      netAmount: 18500.00,
      status: 'completed',
      date: '2026-07-30 11:20 AM'
    },
    {
      id: 'TXN-894104',
      orderId: 'ORD-1004',
      customerName: 'Reliable Electricals',
      method: 'Cash on Delivery',
      utrNumber: 'COD_BLUEDART_9912',
      amount: 22000,
      fee: 250.00,
      netAmount: 21750.00,
      status: 'pending',
      date: '2026-07-29 02:30 PM'
    },
    {
      id: 'TXN-894105',
      orderId: 'ORD-1005',
      customerName: 'Shapoorji Engineering',
      method: 'Razorpay (UPI/Card)',
      utrNumber: 'RZP_PAY_88192039',
      amount: 14500,
      fee: 290.00,
      netAmount: 14210.00,
      status: 'completed',
      date: '2026-07-28 06:10 PM'
    },
    {
      id: 'TXN-894106',
      orderId: 'ORD-1006',
      customerName: 'Kirloskar Pneumatic Co',
      method: 'Razorpay (UPI/Card)',
      utrNumber: 'RZP_REF_00918231',
      amount: 4500,
      fee: 0,
      netAmount: -4500.00,
      status: 'refunded',
      date: '2026-07-27 01:15 PM'
    }
  ]);

  // Derived Financial Summary Numbers (Zeroed out when isResetZero is true)
  const activeTxns = isResetZero ? [] : transactions;

  const totalProcessed = activeTxns
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const onlinePrepaid = activeTxns
    .filter(t => t.status === 'completed' && (t.method.includes('Razorpay') || t.method.includes('PhonePe')))
    .reduce((sum, t) => sum + t.amount, 0);

  const codRemittancePending = activeTxns
    .filter(t => t.method === 'Cash on Delivery' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const bankWireTotal = activeTxns
    .filter(t => t.status === 'completed' && t.method.includes('Bank Wire'))
    .reduce((sum, t) => sum + t.amount, 0);

  const availablePayoutBalance = isResetZero ? 0 : 482100;

  // Filtered Transactions
  const filteredTransactions = activeTxns.filter(t => {
    const matchesSearch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.utrNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMethod = selectedMethodFilter === 'all' || t.method === selectedMethodFilter;
    const matchesStatus = selectedStatusFilter === 'all' || t.status === selectedStatusFilter;

    return matchesSearch && matchesMethod && matchesStatus;
  });

  // Handle Bank Payout Submission
  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    setIsSubmittingPayout(true);
    setTimeout(() => {
      setIsSubmittingPayout(false);
      setIsPayoutModalOpen(false);
      setToastMsg(`Payout request of ₹${Number(payoutAmount).toLocaleString('en-IN')} to ${selectedBank.split(' ')[0]} initiated! (Ref UTR: PAY_${Date.now().toString().slice(-8)})`);
      setTimeout(() => setToastMsg(''), 5000);
    }, 1200);
  };

  // Download Excel Financial Ledger
  const handleDownloadLedgerExcel = () => {
    const rows = filteredTransactions.map(t => ({
      'Transaction ID': t.id,
      'Order Reference': t.orderId,
      'Customer Name': t.customerName,
      'Payment Gateway / Mode': t.method,
      'Bank UTR / Ref Number': t.utrNumber,
      'Gross Amount (INR)': t.amount,
      'Gateway Fee (INR)': t.fee,
      'Net Settled (INR)': t.netAmount,
      'Payment Status': t.status.toUpperCase(),
      'Transaction Timestamp': t.date
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [
      { wch: 16 }, { wch: 16 }, { wch: 32 }, { wch: 24 }, 
      { wch: 24 }, { wch: 18 }, { wch: 16 }, { wch: 18 }, 
      { wch: 16 }, { wch: 22 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Payment Ledger');
    XLSX.writeFile(wb, `Abuzz_Payment_Ledger_${new Date().toISOString().slice(0, 10)}.xlsx`);

    setToastMsg('Payment transactions ledger downloaded (.xlsx)!');
    setTimeout(() => setToastMsg(''), 3500);
  };

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 inset-x-6 z-50 p-3 rounded-xl bg-primary text-white text-center font-bold flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3 max-w-lg mx-auto">
          <Sparkles className="h-4.5 w-4.5 animate-spin" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" /> Payments & Payout Settlements
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 font-sans">
            Monitor real-time payment gateway collections, COD courier remittances, and request instant bank payouts.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleResetPaymentsData}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold cursor-pointer"
            title="Reset payment metrics to ZERO"
          >
            <RotateCcw className="h-4 w-4" /> Reset Payments to ZERO
          </button>

          {isResetZero && (
            <button
              onClick={handleRestorePaymentsBaseline}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" /> Restore Baseline Data
            </button>
          )}

          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Landmark className="h-4 w-4" /> Request Bank Payout
          </button>
        </div>
      </div>

      {/* Top Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue Processed */}
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-black uppercase text-muted-foreground tracking-wider">Total Revenue Processed</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <CreditCard className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-foreground tracking-tight">₹{totalProcessed.toLocaleString('en-IN')}</div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5" /> +14.2% vs last month
            </div>
          </div>
        </div>

        {/* Online Prepaid (UPI & Cards) */}
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-black uppercase text-muted-foreground tracking-wider">Online Prepaid (UPI/Cards)</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-foreground tracking-tight">₹{onlinePrepaid.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-muted-foreground font-semibold mt-1">Razorpay & PhonePe Gateways</div>
          </div>
        </div>

        {/* COD Courier Pending */}
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-black uppercase text-muted-foreground tracking-wider">COD Courier Pending</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-amber-500 tracking-tight">₹{codRemittancePending.toLocaleString('en-IN')}</div>
            <div className="text-[10px] text-muted-foreground font-semibold mt-1">Blue Dart & Delhivery Remittance</div>
          </div>
        </div>

        {/* Available Payout Balance */}
        <div className="bg-card border border-emerald-500/30 rounded-3xl p-5 shadow-sm bg-gradient-to-br from-emerald-500/10 to-transparent relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">Available for Payout</span>
            <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md">
              <Landmark className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">₹{availablePayoutBalance.toLocaleString('en-IN')}</div>
            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="text-[10px] text-emerald-500 underline font-bold mt-1 hover:opacity-80 cursor-pointer block"
            >
              Transfer to HDFC Bank (T+1) →
            </button>
          </div>
        </div>

      </div>

      {/* Payment Gateways Status Strip */}
      <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">Connected Payment Gateways & Banking Hubs</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs">
                RZP
              </div>
              <div>
                <div className="font-extrabold text-foreground">Razorpay PG</div>
                <div className="text-[10px] text-muted-foreground">Cards / NetBanking / UPI</div>
              </div>
            </div>
            <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Active</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-xs">
                Pe
              </div>
              <div>
                <div className="font-extrabold text-foreground">PhonePe QR</div>
                <div className="text-[10px] text-muted-foreground">Instant UPI Dynamic QR</div>
              </div>
            </div>
            <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Active</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-slate-800 text-white font-black flex items-center justify-center text-xs">
                NEFT
              </div>
              <div>
                <div className="font-extrabold text-foreground">Bank Wire Recons</div>
                <div className="text-[10px] text-muted-foreground">Direct Offline Bank UTR</div>
              </div>
            </div>
            <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">Verified</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center text-xs">
                COD
              </div>
              <div>
                <div className="font-extrabold text-foreground">Cash on Delivery</div>
                <div className="text-[10px] text-muted-foreground">Courier COD Remittance</div>
              </div>
            </div>
            <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">T+3 Cycle</span>
          </div>

        </div>
      </div>

      {/* Transactions Ledger Table */}
      <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-foreground tracking-tight">Financial Transactions Ledger</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Audit individual transaction records, payment gateway fees, UTR references, and settlement statuses.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search TXN ID, Order ID, UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2 pl-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none min-h-[38px] w-52"
              />
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Method Filter */}
            <select
              value={selectedMethodFilter}
              onChange={(e) => setSelectedMethodFilter(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-none min-h-[38px] cursor-pointer"
            >
              <option value="all">All Gateways & Modes</option>
              <option value="Razorpay (UPI/Card)">Razorpay (UPI/Card)</option>
              <option value="PhonePe (UPI QR)">PhonePe (UPI QR)</option>
              <option value="Bank Wire (NEFT/RTGS)">Bank Wire (NEFT/RTGS)</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-none min-h-[38px] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed / Settled</option>
              <option value="pending">Pending Remittance</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
            </select>

            {/* Download Excel */}
            <button
              onClick={handleDownloadLedgerExcel}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 text-xs font-bold text-foreground transition-all cursor-pointer min-h-[38px]"
              title="Download Excel Ledger"
            >
              <Download className="h-4 w-4 text-primary" /> Export Excel
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold">
                <th className="p-3">TXN Reference</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer / Buyer</th>
                <th className="p-3">Payment Gateway / Mode</th>
                <th className="p-3">Bank UTR / Ref</th>
                <th className="p-3 text-right">Gross Amount</th>
                <th className="p-3 text-right">Gateway Fee</th>
                <th className="p-3 text-right">Net Settled</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-foreground/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-foreground">{t.id}</td>
                    <td className="p-3 font-bold text-primary">{t.orderId}</td>
                    <td className="p-3 font-bold text-foreground">{t.customerName}</td>
                    <td className="p-3 text-muted-foreground font-medium">{t.method}</td>
                    <td className="p-3 font-mono text-[11px] text-muted-foreground">{t.utrNumber}</td>
                    <td className="p-3 text-right font-black text-foreground">₹{t.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-semibold text-rose-500">₹{t.fee.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                      ₹{t.netAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-center">
                      {t.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold text-[10px] border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" /> Settled
                        </span>
                      )}
                      {t.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-[10px] border border-amber-500/20">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                      {t.status === 'refunded' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-extrabold text-[10px] border border-rose-500/20">
                          <AlertCircle className="h-3 w-3" /> Refunded
                        </span>
                      )}
                      {t.status === 'failed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-500 font-extrabold text-[10px] border border-slate-500/20">
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right text-muted-foreground text-[10.5px] whitespace-nowrap">{t.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-muted-foreground font-semibold">
                    No payment transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* REQUEST BANK PAYOUT MODAL */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl glass space-y-5 relative">
            
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-extrabold uppercase text-foreground">Initiate Bank Payout</h3>
              </div>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-foreground/10 text-muted-foreground transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4">
              <div>
                <label className="block text-[10.5px] font-extrabold uppercase text-muted-foreground mb-1">
                  Destination Bank Account
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-bold text-foreground focus:border-primary focus:outline-none min-h-[42px] cursor-pointer"
                >
                  <option value="HDFC Bank (A/C: ****4821 - IFSC: HDFC0001234)">HDFC Bank (A/C: ****4821 - IFSC: HDFC0001234)</option>
                  <option value="ICICI Bank (A/C: ****9012 - IFSC: ICIC0009988)">ICICI Bank (A/C: ****9012 - IFSC: ICIC0009988)</option>
                  <option value="State Bank of India (A/C: ****3344 - IFSC: SBIN0005511)">State Bank of India (A/C: ****3344 - IFSC: SBIN0005511)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10.5px] font-extrabold uppercase text-muted-foreground mb-1">
                  Payout Amount (INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-muted-foreground">₹</span>
                  <input
                    type="number"
                    max={availablePayoutBalance}
                    min="100"
                    required
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-7 pr-3 py-2 text-xs font-black text-foreground focus:border-primary focus:outline-none min-h-[42px]"
                  />
                </div>
                <span className="text-[10px] text-emerald-500 font-bold mt-1 block">
                  Available Balance: ₹{availablePayoutBalance.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-foreground/5 border border-border/50 text-[10.5px] text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Settlement Cycle:</span>
                  <strong className="text-foreground">T+1 Instant IMPS/NEFT</strong>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <strong className="text-emerald-500">₹0 (Free Vendor Settlement)</strong>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="flex-1 rounded-xl border border-border py-2.5 text-xs font-bold text-muted-foreground hover:bg-foreground/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPayout}
                  className="flex-1 rounded-xl bg-emerald-600 text-white py-2.5 text-xs font-extrabold shadow-md hover:bg-emerald-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isSubmittingPayout ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <Landmark className="h-4 w-4" /> Confirm Payout
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPaymentsTab;
