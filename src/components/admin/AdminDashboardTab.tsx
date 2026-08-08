'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ReceiptIndianRupee, 
  FileWarning, 
  AlertCircle,
  CheckCircle,
  Truck,
  ArrowRight,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { Vendor, RfqNegotiation, CorporateCreditProfile, AdminOrderRecord } from '../../utils/adminMockData';
import { Product } from '../../types';

interface AdminDashboardTabProps {
  vendors: Vendor[];
  rfqs: RfqNegotiation[];
  credits: CorporateCreditProfile[];
  orders?: AdminOrderRecord[];
  products?: Product[];
  onTabChange: (tab: string) => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({ vendors = [], rfqs = [], credits = [], orders = [], products = [], onTabChange }) => {
  const validOrders = orders.filter(o => o.orderStatus !== 'cancelled');

  const grossSales = validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const marketplaceCommissions = validOrders.reduce((sum, o) => sum + ((o.taxableSubtotal || 0) * 0.075), 0);
  const tcsCollected = validOrders.reduce((sum, o) => sum + ((o.taxableSubtotal || 0) * 0.01), 0);
  const activeDispatches = validOrders.filter(o => o.orderStatus === 'shipped' || o.orderStatus === 'ready_for_dispatch').length;
  
  const pendingVendors = vendors.filter(v => v.status === 'pending');
  const pendingRfqs = rfqs.filter(r => r.status === 'pending_review');
  const blockedCredits = credits.filter(c => c.status === 'blocked');
  const lowStockCount = products.filter(p => p.stockStatus === 'low_stock').length;

  // CSV Report Exporter Helper
  const handleExportCsvReport = () => {
    const headers = ['Order ID', 'Customer Name', 'Company', 'GSTIN', 'Order Date', 'Subtotal Excl Tax', 'CGST', 'SGST', 'IGST', 'Freight', 'Total Amount', 'Status'];
    const rows = orders.map(o => [
      o.id,
      `"${o.customerName || ''}"`,
      `"${o.companyName || ''}"`,
      o.gstin || '',
      o.createdAt || '',
      o.taxableSubtotal || 0,
      o.cgstAmount || 0,
      o.sgstAmount || 0,
      o.igstAmount || 0,
      o.freightAmount || 0,
      o.totalAmount || 0,
      o.orderStatus || 'pending'
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `abuzz_sales_gst_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compute category sales distribution
  const categorySalesMap: Record<string, number> = {};
  validOrders.forEach(o => {
    o.items?.forEach(item => {
      const prod = products.find(p => p.id === item.productId || p.title === item.productTitle);
      const cat = prod?.category || 'Hand Tools';
      categorySalesMap[cat] = (categorySalesMap[cat] || 0) + (item.quantity * item.unitPrice);
    });
  });

  const totalCatSales = Object.values(categorySalesMap).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* Tab Title & CSV Export Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">Admin Overview Control Panel</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time indicators, revenue distribution, and compliance reports.</p>
        </div>

        <button
          onClick={handleExportCsvReport}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition-all cursor-pointer shrink-0"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Export Sales & Tax Report (CSV)</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Gross Sales */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 select-none pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Gross Sales (MTD)</span>
              <h3 className="text-lg font-black text-foreground mt-1">₹{grossSales.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <ReceiptIndianRupee className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
            <TrendingUp className="h-3 w-3" />
            <span>Live order volume</span>
          </div>
        </div>

        {/* Marketplace Commission */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 select-none pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Market Commissions</span>
              <h3 className="text-lg font-black text-foreground mt-1">₹{marketplaceCommissions.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            </div>
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground">
            TCS (1%) Collected: <strong className="text-foreground font-semibold">₹{tcsCollected.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 select-none pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Pending Tasks</span>
              <h3 className="text-lg font-black text-foreground mt-1">{pendingVendors.length + pendingRfqs.length} Action Items</h3>
            </div>
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground flex gap-3">
            <span>Vendors: <strong className="text-amber-500 font-bold">{pendingVendors.length}</strong></span>
            <span>RFQs: <strong className="text-primary font-bold">{pendingRfqs.length}</strong></span>
          </div>
        </div>

        {/* Active Logistics */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-xs glass relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 select-none pointer-events-none" />
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Shipments</span>
              <h3 className="text-lg font-black text-foreground mt-1">{activeDispatches} Dispatches</h3>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-500">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground">
            Low-Stock SKUs: <strong className="text-red-500 font-bold">{lowStockCount} items</strong>
          </div>
        </div>

      </div>

      {/* Main Grid: Compliance Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Compliance Alerts */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-md glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
            <FileWarning className="h-4.5 w-4.5 text-amber-500 stroke-[2]" /> compliance & audit warnings
          </h3>
          
          <div className="space-y-3">
            
            {/* E-way bill warning if high-value order exists */}
            {validOrders.some(o => o.requiresEwayBill && o.orderStatus === 'processing') ? (
              <div className="flex gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-foreground uppercase tracking-wider text-[10px]">E-Way Bill Action Mandate (₹50k+ limit)</h4>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    Pending high-value B2B orders match GST threshold limit. Generate IRN and E-Way bill manifest before dispatch.
                  </p>
                  <button 
                    onClick={() => onTabChange('orders')}
                    className="text-[10px] font-black text-primary hover:underline mt-2 flex items-center gap-1 cursor-pointer"
                  >
                    Go to Orders Tab <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* Blocked corporate credit */}
            {blockedCredits.length > 0 ? (
              <div className="flex gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-foreground uppercase tracking-wider text-[10px]">Corporate Khata Credit Lockouts</h4>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    {blockedCredits.length} account(s) locked due to overdue balances. All new checkout operations are blocked pending RTGS reconciliation.
                  </p>
                  <button 
                    onClick={() => onTabChange('credit')}
                    className="text-[10px] font-black text-primary hover:underline mt-2 flex items-center gap-1 cursor-pointer"
                  >
                    Go to B2B Credit Ledger <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* System Clear State */}
            {!validOrders.some(o => o.requiresEwayBill && o.orderStatus === 'processing') && blockedCredits.length === 0 && (
              <div className="flex gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-foreground uppercase tracking-wider text-[10px]">All Operational Systems Clear</h4>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    No active compliance warnings or credit lockouts. Automated audit trails will monitor incoming B2B orders and RFQ submissions.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Visual Charts / Sales Summary */}
        <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-6 shadow-md glass flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-4">
              Category Sales Share
            </h3>

            {/* Dynamic CSS bars chart */}
            <div className="space-y-4 font-sans text-xs">
              {totalCatSales > 0 ? (
                Object.entries(categorySalesMap).map(([cat, amt]) => {
                  const pct = Math.round((amt / totalCatSales) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-muted-foreground mb-1 text-[10px] font-bold">
                        <span>{cat.toUpperCase()}</span>
                        <span className="text-foreground">₹{amt.toLocaleString('en-IN')} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-foreground/5 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground text-xs font-medium">
                  No sales recorded yet. Category distribution will update as orders are processed.
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border/40 pt-4 mt-6 text-[10px] text-muted-foreground leading-relaxed">
            💡 <strong>TCS Deduction Tip:</strong> Section 52 requires the operator to deduct 1% of the net taxable sales values before vendor settlement payouts.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardTab;
