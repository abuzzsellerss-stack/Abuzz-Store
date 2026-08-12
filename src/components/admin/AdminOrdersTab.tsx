'use client';

import React, { useState } from 'react';
import { AdminOrderRecord, AdminOrderItem, clearAllOrdersData, generateNextOrderId, getAdminProducts } from '../../utils/adminMockData';
import { MOCK_PRODUCTS } from '../../utils/seed';
import { 
  PackageCheck, Search, Filter, ShieldAlert, Truck, 
  FileText, CheckCircle2, Clock, AlertCircle, 
  ArrowRight, X, ChevronRight, Eye, Sparkles, Receipt, Plus, UserPlus, Download, Trash2
} from 'lucide-react';
import { exportOrdersToCSV } from '../../utils/exportUtils';
import { GSTInvoiceModal } from '../GSTInvoiceModal';

interface AdminOrdersTabProps {
  orders: AdminOrderRecord[];
  onSaveOrders: (updatedOrders: AdminOrderRecord[]) => void;
  userRole?: string;
}

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({
  orders,
  onSaveOrders,
  userRole
}) => {
  const isReadOnly = userRole === 'employee';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderRecord | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<AdminOrderRecord | null>(null);
  const [labelModalOrder, setLabelModalOrder] = useState<AdminOrderRecord | null>(null);
  const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form fields for Create Manual Order
  const [manualCustomer, setManualCustomer] = useState('');
  const [manualCompany, setManualCompany] = useState('');
  const [manualGstin, setManualGstin] = useState('');
  const [manualCity, setManualCity] = useState('');
  const [manualState, setManualState] = useState('');
  const [selectedProdId, setSelectedProdId] = useState(MOCK_PRODUCTS[0]?.id || '');
  const [manualQty, setManualQty] = useState(1);

  // Editing state for AWB / Carrier
  const [editingAwbId, setEditingAwbId] = useState<string | null>(null);
  const [carrierInput, setCarrierInput] = useState<string>('Blue Dart');
  const [awbInput, setAwbInput] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: AdminOrderRecord['orderStatus']) => {
    if (isReadOnly) return;
    const updated = orders.map(o => 
      o.id === orderId ? { ...o, orderStatus: nextStatus } : o
    );
    onSaveOrders(updated);
    showToast(`Order ${orderId} status updated to ${nextStatus.toUpperCase().replace(/_/g, ' ')}`);
  };

  const handleSaveAwbTracking = (orderId: string) => {
    if (isReadOnly) return;
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          carrier: carrierInput,
          awbNumber: awbInput || `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`,
          orderStatus: o.orderStatus === 'pending' || o.orderStatus === 'processing' ? 'shipped' as const : o.orderStatus
        };
      }
      return o;
    });
    onSaveOrders(updated);
    setEditingAwbId(null);
    showToast(`AWB Tracking details saved for order ${orderId}`);
  };

  const handleGenerateEwayBill = (orderId: string) => {
    if (isReadOnly) return;
    const ewayNumber = `EWB-2026-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const updated = orders.map(o => 
      o.id === orderId ? { ...o, ewayBillNumber: ewayNumber, orderStatus: o.orderStatus === 'pending' ? 'ready_for_dispatch' as const : o.orderStatus } : o
    );
    onSaveOrders(updated);
    showToast(`E-Way Bill ${ewayNumber} generated for ${orderId}`);
  };

  // Filter orders
  const filteredOrders = orders.filter(o => {
    if (!o) return false;
    const searchLower = (searchTerm || '').toLowerCase();
    const matchesSearch = 
      (o.id || '').toLowerCase().includes(searchLower) ||
      (o.customerName || '').toLowerCase().includes(searchLower) ||
      (o.companyName && o.companyName.toLowerCase().includes(searchLower)) ||
      (o.gstin && o.gstin.toLowerCase().includes(searchLower)) ||
      (o.awbNumber && o.awbNumber.toLowerCase().includes(searchLower));
    
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o?.totalAmount || 0), 0);
  const pendingCount = orders.filter(o => o?.orderStatus === 'pending').length;
  const processingCount = orders.filter(o => o?.orderStatus === 'processing').length;
  const readyDispatchCount = orders.filter(o => o?.orderStatus === 'ready_for_dispatch').length;
  const shippedCount = orders.filter(o => o?.orderStatus === 'shipped').length;

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to update order statuses.</p>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 inset-x-6 z-50 p-3 rounded-xl bg-primary text-white text-center font-bold flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3 max-w-md mx-auto">
          <Sparkles className="h-4.5 w-4.5 animate-spin" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Page Title & Create Manual Order Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">B2B Order Processing & Fulfillment</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage customer orders, E-Way bills, tax invoices, and carrier dispatch manifests.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportOrdersToCSV(orders)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border bg-card hover:bg-foreground/5 text-foreground font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Download className="h-4 w-4 text-emerald-500" />
            <span>Export Orders CSV</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all order records from local storage?')) {
                clearAllOrdersData();
                onSaveOrders([]);
                showToast('All order records have been cleared!');
              }
            }}
            disabled={isReadOnly || orders.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0 disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4 text-red-400" />
            <span>Clear All Data</span>
          </button>

          <button
            onClick={() => setCreateOrderModalOpen(true)}
            disabled={isReadOnly}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/95 transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            <span>Create Manual Order</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-card border border-border rounded-2xl p-4 glass">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Orders Value</span>
          <h3 className="text-lg font-black text-foreground mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
          <span className="text-[10px] text-muted-foreground mt-1 block">{orders.length} total orders recorded</span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 glass">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">Pending / Processing</span>
          <h3 className="text-lg font-black text-amber-500 mt-1">{pendingCount + processingCount} Orders</h3>
          <span className="text-[10px] text-muted-foreground mt-1 block">Awaiting pick & packing</span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 glass">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Ready for Dispatch</span>
          <h3 className="text-lg font-black text-primary mt-1">{readyDispatchCount} Orders</h3>
          <span className="text-[10px] text-muted-foreground mt-1 block">E-Way bill manifests ready</span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 glass">
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">Shipped / In Transit</span>
          <h3 className="text-lg font-black text-emerald-500 mt-1">{shippedCount} Orders</h3>
          <span className="text-[10px] text-muted-foreground mt-1 block">Active carrier AWB tracking</span>
        </div>

      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        {/* Status Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Pending' },
            { id: 'processing', label: 'Processing' },
            { id: 'ready_for_dispatch', label: 'Ready for Dispatch' },
            { id: 'shipped', label: 'Shipped' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Order ID, Company, GSTIN, AWB..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/50 pl-9 pr-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
          />
        </div>

      </div>

      {/* Orders Directory Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Order Details</th>
                <th className="p-4">Buyer Company & GSTIN</th>
                <th className="p-4 text-right">Taxable Subtotal</th>
                <th className="p-4 text-right">Total Invoice</th>
                <th className="p-4 text-center">Payment Mode</th>
                <th className="p-4 text-center">Order Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-sans">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-foreground/5 transition-colors">
                  
                  {/* Order ID & Date */}
                  <td className="p-4">
                    <span className="font-bold text-foreground block text-xs">{order.id}</span>
                    <span className="text-[10px] text-muted-foreground block font-mono mt-0.5">
                      {new Date(order.createdAt || Date.now()).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] text-muted-foreground block mt-1">
                      {(order.items || []).length} SKUs ({(order.items || []).reduce((acc: number, i: AdminOrderItem) => acc + (i.quantity || 0), 0)} items)
                    </span>
                  </td>

                  {/* Buyer & GSTIN */}
                  <td className="p-4">
                    <strong className="text-foreground block font-semibold">{order.companyName || order.customerName || 'Valued Customer'}</strong>
                    {order.gstin && (
                      <span className="text-[10px] text-primary font-mono block mt-0.5">GSTIN: {order.gstin}</span>
                    )}
                    <span className="text-[10px] text-muted-foreground block truncate max-w-[200px] mt-0.5">
                      {order.city || 'Pune'}, {order.state || 'Maharashtra'} ({order.pincode || '411019'})
                    </span>
                  </td>

                  {/* Subtotal */}
                  <td className="p-4 text-right font-bold text-foreground">
                    ₹{(order.taxableSubtotal ?? 0).toLocaleString('en-IN')}
                  </td>

                  {/* Total Amount */}
                  <td className="p-4 text-right">
                    <span className="font-black text-primary text-sm block">₹{(order.totalAmount ?? 0).toLocaleString('en-IN')}</span>
                    {order.requiresEwayBill && (
                      <span className={`inline-block text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded mt-1 ${
                        order.ewayBillNumber ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        {order.ewayBillNumber ? 'E-Way Bill Ready' : 'Mandatory EWB > ₹50k'}
                      </span>
                    )}
                  </td>

                  {/* Payment Mode */}
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      order.paymentMode === 'PREPAID' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      order.paymentMode === 'CREDIT_KHATA' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                      order.paymentMode === 'NEFT_RTGS' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {(order.paymentMode || 'PREPAID').replace(/_/g, ' ')}
                    </span>
                    <span className="block text-[9px] text-muted-foreground mt-1 capitalize font-medium">
                      Status: {order.paymentStatus || 'paid'}
                    </span>
                  </td>

                  {/* Order Status Switcher */}
                  <td className="p-4 text-center">
                    <select
                      value={order.orderStatus}
                      disabled={isReadOnly}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as AdminOrderRecord['orderStatus'])}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase border cursor-pointer ${
                        order.orderStatus === 'delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        order.orderStatus === 'shipped' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        order.orderStatus === 'ready_for_dispatch' ? 'bg-primary/10 text-primary border-primary/20' :
                        order.orderStatus === 'processing' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        order.orderStatus === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                        'bg-foreground/5 text-muted-foreground border-border'
                      }`}
                    >
                      <option value="pending" className="bg-slate-900 text-slate-100 font-semibold">PENDING</option>
                      <option value="processing" className="bg-slate-900 text-slate-100 font-semibold">PROCESSING</option>
                      <option value="ready_for_dispatch" className="bg-slate-900 text-slate-100 font-semibold">READY FOR DISPATCH</option>
                      <option value="shipped" className="bg-slate-900 text-slate-100 font-semibold">SHIPPED</option>
                      <option value="delivered" className="bg-slate-900 text-slate-100 font-semibold">DELIVERED</option>
                      <option value="cancelled" className="bg-slate-900 text-slate-100 font-semibold">CANCELLED</option>
                    </select>

                    {order.awbNumber && (
                      <span className="block text-[9px] font-mono text-muted-foreground mt-1">
                        {order.carrier}: {order.awbNumber}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center space-y-1">
                    <button
                      onClick={() => setInvoiceModalOrder(order)}
                      className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-bold text-[9px] flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer w-full"
                    >
                      <Receipt className="h-3 w-3" /> Tax Invoice
                    </button>

                    {order.requiresEwayBill && !order.ewayBillNumber && !isReadOnly && (
                      <button
                        onClick={() => handleGenerateEwayBill(order.id)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 font-bold text-[9px] flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer w-full"
                      >
                        <FileText className="h-3 w-3" /> Gen E-Way Bill
                      </button>
                    )}

                    {!order.awbNumber && !isReadOnly && (
                      <button
                        onClick={() => {
                          setEditingAwbId(order.id);
                          setCarrierInput(order.carrier || 'Blue Dart');
                          setAwbInput(order.awbNumber || '');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 font-bold text-[9px] flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer w-full"
                      >
                        <Truck className="h-3 w-3" /> Assign AWB
                      </button>
                    )}

                    <button
                      onClick={() => setLabelModalOrder(order)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 font-bold text-[9px] flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer w-full"
                    >
                      <PackageCheck className="h-3 w-3" /> Shipping Label
                    </button>
                  </td>

                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground text-xs leading-relaxed font-sans">
                    No matching customer orders found in the registry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Assign AWB Tracking Code */}
      {editingAwbId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-4 font-sans animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Truck className="h-4.5 w-4.5 text-primary" /> Assign Carrier AWB Tracking
              </h3>
              <button 
                onClick={() => setEditingAwbId(null)}
                className="p-1 rounded-full hover:bg-foreground/5 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Select Logistics Carrier</label>
                <select
                  value={carrierInput}
                  onChange={(e) => setCarrierInput(e.target.value as any)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="Blue Dart">Blue Dart Express</option>
                  <option value="Delhivery">Delhivery Surface/Air</option>
                  <option value="Shadowfax">Shadowfax Local</option>
                  <option value="Xpressbees">Xpressbees Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">AWB / Consignment Tracking Number</label>
                <input
                  type="text"
                  placeholder="e.g. BD-88492019"
                  value={awbInput}
                  onChange={(e) => setAwbInput(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none font-mono"
                />
                <p className="text-[9px] text-muted-foreground mt-1">Leave empty to auto-generate a mock tracking ID.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-border/40 pt-4">
              <button
                onClick={() => setEditingAwbId(null)}
                className="px-4 py-2 rounded-xl border border-border bg-background/40 hover:bg-foreground/5 text-xs font-bold text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveAwbTracking(editingAwbId)}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20"
              >
                Save & Update Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: GST Tax Invoice Preview */}
      {invoiceModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 font-sans animate-in fade-in zoom-in-95 my-8">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-border/50 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">TAX INVOICE / RECIPIENT COPY</span>
                <h3 className="text-lg font-black text-foreground mt-0.5">{invoiceModalOrder.id}</h3>
                <span className="text-[10px] text-muted-foreground font-mono">Date: {new Date(invoiceModalOrder.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              <button 
                onClick={() => setInvoiceModalOrder(null)}
                className="p-1 rounded-full hover:bg-foreground/5 text-muted-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* B2B GSTIN Header grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-foreground/5 border border-border/40 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Supplier / B2B Seller</span>
                <strong className="text-foreground block text-sm">Abuzz Store Technologies India Pvt Ltd</strong>
                <span className="text-[10px] text-muted-foreground block">GSTIN: 03AAAAA0000A1Z5</span>
                <span className="text-[10px] text-muted-foreground block">State: Punjab (State Code: 03)</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Billed To / Buyer Customer</span>
                <strong className="text-foreground block text-sm">{invoiceModalOrder.companyName || invoiceModalOrder.customerName}</strong>
                {invoiceModalOrder.gstin && (
                  <span className="text-[10px] text-primary font-mono block font-bold">GSTIN: {invoiceModalOrder.gstin}</span>
                )}
                <span className="text-[10px] text-muted-foreground block">Address: {invoiceModalOrder.shippingAddress}, {invoiceModalOrder.city}, {invoiceModalOrder.state} ({invoiceModalOrder.pincode})</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold text-[10px]">
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-center">HSN</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Price</th>
                    <th className="p-2.5 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {invoiceModalOrder.items.map((item: AdminOrderItem, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium text-foreground">{item.productTitle}</td>
                      <td className="p-2.5 text-center font-mono text-primary font-bold">{item.hsnCode}</td>
                      <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                      <td className="p-2.5 text-right">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-bold">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tax Computation Summary */}
            <div className="border-t border-border/40 pt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxable Subtotal</span>
                <span className="text-foreground font-bold">₹{(invoiceModalOrder.taxableSubtotal ?? 0).toLocaleString('en-IN')}</span>
              </div>

              {(invoiceModalOrder.igstAmount || 0) > 0 ? (
                <div className="flex justify-between text-primary">
                  <span>Interstate IGST (18%)</span>
                  <span className="font-bold">₹{(invoiceModalOrder.igstAmount ?? 0).toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>Intrastate CGST (9%)</span>
                    <span className="font-bold">₹{(invoiceModalOrder.cgstAmount ?? 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intrastate SGST (9%)</span>
                    <span className="font-bold">₹{(invoiceModalOrder.sgstAmount ?? 0).toLocaleString('en-IN')}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Freight & Shipping Handling</span>
                <span className="text-foreground font-bold">₹{(invoiceModalOrder.freightAmount ?? 0).toLocaleString('en-IN')}</span>
              </div>

              {invoiceModalOrder.ewayBillNumber && (
                <div className="flex justify-between text-emerald-500 font-mono text-[11px] bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                  <span>E-Way Bill Docket Ref:</span>
                  <span className="font-extrabold">{invoiceModalOrder.ewayBillNumber}</span>
                </div>
              )}

              <div className="border-t border-border pt-3 flex justify-between font-black text-sm">
                <span className="text-foreground uppercase">Grand Total (Inclusive of Taxes)</span>
                <span className="text-primary text-base">₹{(invoiceModalOrder.totalAmount ?? 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 border-t border-border/40 pt-4">
              <button
                onClick={() => setInvoiceModalOrder(null)}
                className="px-4 py-2 rounded-xl border border-border bg-background/40 hover:bg-foreground/5 text-xs font-bold text-foreground cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="h-4 w-4" /> Print Tax Invoice
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CREATE MANUAL ORDER MODAL */}
      {createOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative">
            
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Create Manual B2B Order</h3>
              </div>
              <button 
                onClick={() => setCreateOrderModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const liveProducts = getAdminProducts(MOCK_PRODUCTS);
                const selProd = liveProducts.find(p => p.id === selectedProdId) || liveProducts[0];
                const itemTotal = selProd.price * manualQty;
                const baseVal = Math.round(itemTotal / 1.18);
                const taxVal = itemTotal - baseVal;

                const newOrd: AdminOrderRecord = {
                  id: generateNextOrderId(),
                  customerName: manualCustomer || 'Manual Client',
                  customerEmail: 'manual@client.com',
                  companyName: manualCompany || 'Direct Wholesale Client',
                  gstin: manualGstin || '27AAACB9999F1Z0',
                  createdAt: new Date().toISOString(),
                  items: [
                    {
                      productId: selProd.id,
                      productTitle: selProd.title,
                      quantity: manualQty,
                      unitPrice: selProd.price,
                      hsnCode: '8467'
                    }
                  ],
                  taxableSubtotal: baseVal,
                  cgstAmount: Math.round(taxVal / 2),
                  sgstAmount: Math.round(taxVal / 2),
                  igstAmount: 0,
                  totalTax: taxVal,
                  freightAmount: 0,
                  totalAmount: itemTotal,
                  paymentMode: 'NEFT_RTGS',
                  paymentStatus: 'paid',
                  orderStatus: 'processing',
                  city: manualCity || 'Mumbai',
                  state: manualState || 'Maharashtra',
                  shippingAddress: 'Direct Order Manifest',
                  pincode: '400001',
                  requiresEwayBill: false
                };

                onSaveOrders([newOrd, ...orders]);
                setCreateOrderModalOpen(false);
                setManualCustomer('');
                setManualCompany('');
                setManualGstin('');
                showToast(`Manual Order ${newOrd.id} generated successfully!`);
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Shah"
                    value={manualCustomer}
                    onChange={(e) => setManualCustomer(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Hardware Pvt Ltd"
                    value={manualCompany}
                    onChange={(e) => setManualCompany(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">GSTIN</label>
                  <input
                    type="text"
                    placeholder="27AAACB1234F1Z5"
                    value={manualGstin}
                    onChange={(e) => setManualGstin(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">City</label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">State</label>
                  <input
                    type="text"
                    placeholder="Maharashtra"
                    value={manualState}
                    onChange={(e) => setManualState(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Select Catalog Item *</label>
                <select
                  value={selectedProdId}
                  onChange={(e) => setSelectedProdId(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  {getAdminProducts(MOCK_PRODUCTS).map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.title} — ₹{prod.price.toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={manualQty}
                  onChange={(e) => setManualQty(parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="border-t border-border pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setCreateOrderModalOpen(false)}
                  className="flex-1 rounded-xl border border-border py-2.5 font-bold text-xs hover:bg-foreground/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary text-white py-2.5 font-bold text-xs shadow-md hover:bg-primary/95"
                >
                  Generate Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GST Tax Invoice Printable Modal */}
      <GSTInvoiceModal 
        order={invoiceModalOrder} 
        isOpen={!!invoiceModalOrder} 
        onClose={() => setInvoiceModalOrder(null)} 
      />

      {/* PRINTABLE WAREHOUSE SHIPPING LABEL & PACKING SLIP MODAL */}
      {labelModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-xl w-full bg-white text-slate-900 rounded-3xl p-6 shadow-2xl space-y-5 font-sans my-8 border border-slate-200">
            
            {/* Shipping Label Top Header */}
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-3">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 block">ABUZZ STORE WAREHOUSE DISPATCH</span>
                <h3 className="text-xl font-black text-slate-900">SHIPPING LABEL & MANIFEST</h3>
              </div>
              <button 
                onClick={() => setLabelModalOrder(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Carrier & AWB Barcode Box */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-900 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-black uppercase text-slate-500 block">LOGISTICS CARRIER PARTNER</span>
                <strong className="text-lg font-black text-slate-900 block">{labelModalOrder.carrier || 'Blue Dart Express'}</strong>
                <span className="text-[10px] font-bold text-slate-600">Mode: Surface / Air Express</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black uppercase text-slate-500 block">AWB CONSIGNMENT TRACKING NO.</span>
                <strong className="text-base font-black font-mono text-blue-600 block">{labelModalOrder.awbNumber || `AWB-${labelModalOrder.id.replace('ORD-', '')}`}</strong>
                <div className="bg-slate-900 text-white text-[8px] font-mono font-bold px-2 py-0.5 rounded mt-1 inline-block">
                  ||||||||||||||||||||||||||||||
                </div>
              </div>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs border border-slate-200 p-4 rounded-2xl bg-slate-50/50">
              <div>
                <span className="text-[9px] font-black uppercase text-slate-400 block mb-1">SHIP FROM (ORIGIN WAREHOUSE):</span>
                <strong className="font-extrabold text-slate-900 block">Abuzz Store Fulfillment Center</strong>
                <span className="text-slate-600 block text-[11px]">Plot 45, MIDC Industrial Estate</span>
                <span className="text-slate-600 block text-[11px]">Chinchwad, Pune - 411019, MH</span>
                <span className="text-slate-600 font-mono text-[10px] block mt-1">GSTIN: 03AAAAA0000A1Z5</span>
              </div>

              <div>
                <span className="text-[9px] font-black uppercase text-slate-400 block mb-1">SHIP TO (DELIVERY ADDRESS):</span>
                <strong className="font-extrabold text-slate-900 block text-sm">{labelModalOrder.companyName || labelModalOrder.customerName}</strong>
                <span className="text-slate-800 font-medium block text-[11px] mt-0.5">{labelModalOrder.shippingAddress}</span>
                <span className="text-slate-800 font-bold block text-[11px]">{labelModalOrder.city}, {labelModalOrder.state} - {labelModalOrder.pincode}</span>
                {labelModalOrder.gstin && (
                  <span className="text-blue-600 font-mono font-bold text-[10px] block mt-1">BUYER GSTIN: {labelModalOrder.gstin}</span>
                )}
              </div>
            </div>

            {/* Package Contents Table */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-2">PACKAGE CONTENTS / PICKLIST</span>
              <table className="w-full text-left border-collapse text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 text-[10px]">
                    <th className="p-2">Item Description</th>
                    <th className="p-2 text-center">HSN Code</th>
                    <th className="p-2 text-center">Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-sans">
                  {labelModalOrder.items.map((item: AdminOrderItem, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2 font-bold text-slate-900">{item.productTitle}</td>
                      <td className="p-2 text-center font-mono font-semibold">{item.hsnCode}</td>
                      <td className="p-2 text-center font-extrabold">{item.quantity} units</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                onClick={() => setLabelModalOrder(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="h-4 w-4" /> Print Shipping Label
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrdersTab;
