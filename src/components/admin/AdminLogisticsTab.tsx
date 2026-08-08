'use client';

import React, { useState } from 'react';
import { PinCodeServiceability } from '../../utils/adminMockData';
import { Truck, ShieldAlert, PhoneCall, CheckCircle2, Search, XCircle } from 'lucide-react';

interface AdminLogisticsTabProps {
  pincodes: PinCodeServiceability[];
  onSavePincodes: (updatedPincodes: PinCodeServiceability[]) => void;
  userRole?: string;
}

export const AdminLogisticsTab: React.FC<AdminLogisticsTabProps> = ({ pincodes, onSavePincodes, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simulated RTO Audit orders
  const [rtoOrders, setRtoOrders] = useState<any[]>([]);

  const filteredPincodes = pincodes.filter(p => 
    p.pincode.includes(searchTerm) || 
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCod = (pincodeStr: string) => {
    const updated = pincodes.map(p => 
      p.pincode === pincodeStr ? { ...p, codEnabled: !p.codEnabled } : p
    );
    onSavePincodes(updated);
  };

  const handleRtoAction = (orderId: string, newStatus: string) => {
    setRtoOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
  };

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Logistics, ODA & COD RTO Risk Controls</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Control regional delivery surcharges, toggle ODA classes, and mitigate COD risk.</p>
      </div>

      {/* Grid: Pin Code Master & RTO Risk Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pincode Matrix */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
            <Truck className="h-4.5 w-4.5 text-primary" /> Pin-Code Serviceability Registry
          </h3>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search pincode or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/50 pl-9 pr-4 py-2 text-xs"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold">
                  <th className="p-3">PIN Code</th>
                  <th className="p-3">City / State</th>
                  <th className="p-3 text-center">Carrier Aggregator</th>
                  <th className="p-3 text-center">Surcharge</th>
                  <th className="p-3 text-center">COD Cash</th>
                  <th className="p-3 text-center">ODA / Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredPincodes.length > 0 ? (
                  filteredPincodes.map((p) => (
                    <tr key={p.pincode} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3 font-mono font-bold text-foreground">{p.pincode}</td>
                      <td className="p-3">
                        <span className="font-semibold text-foreground block">{p.city}</span>
                        <span className="text-[10px] text-muted-foreground block">{p.state}</span>
                      </td>
                      <td className="p-3 text-center font-bold">{p.carrier}</td>
                      <td className="p-3 text-center font-semibold text-foreground">
                        {p.surcharge > 0 ? `₹${p.surcharge}` : 'Free'}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleCod(p.pincode)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                            p.codEnabled 
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                              : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}
                        >
                          {p.codEnabled ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          p.rtoRiskScore === 'high' ? 'bg-red-500/10 text-red-500 font-extrabold' :
                          p.rtoRiskScore === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-foreground/5 text-muted-foreground'
                        }`}>
                          {p.isOdaZone ? 'ODA Zone' : `${p.rtoRiskScore} Risk`}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground text-xs font-medium">
                      No pincodes configured in serviceability registry.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* COD RTO Risk Engine */}
        <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="h-4.5 w-4.5 text-red-500 stroke-[2]" /> COD RTO Risk Engine
          </h3>
          
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Mitigate return losses by auditing orders placed with COD where the customer has high past delivery cancellation records.
          </p>

          <div className="space-y-4">
            {rtoOrders.length > 0 ? (
              rtoOrders.map((o) => (
                <div 
                  key={o.id} 
                  className={`p-4 rounded-2xl border text-xs flex flex-col gap-2.5 relative ${
                    o.status === 'auto_approved' ? 'bg-emerald-500/5 border-emerald-500/20' :
                    o.status === 'rejected' ? 'bg-red-500/5 border-red-500/20' :
                    o.rtoRate >= 20 ? 'bg-red-500/10 border-red-500/20' : 'bg-amber-500/10 border-amber-500/20'
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-foreground block">{o.customerName}</strong>
                      <span className="text-[10px] text-muted-foreground">Order ID: {o.id} ({o.city}, PIN {o.pincode})</span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      o.rtoRate >= 20 ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      {o.rtoRate}% RTO Rate
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-muted-foreground">Consignment Value:</span>
                    <span className="text-foreground font-extrabold">₹{o.amount.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Status and Action Buttons */}
                  <div className="border-t border-border/20 pt-2.5 flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">
                      Status: <strong className="text-foreground">{o.status.replace('_', ' ')}</strong>
                    </span>
                    
                    {o.status === 'flagged_review' && (
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => handleRtoAction(o.id, 'verified_call')}
                          className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors flex items-center gap-1 font-bold text-[9px] cursor-pointer"
                          title="Simulate verification call"
                        >
                          <PhoneCall className="h-3 w-3" /> Call
                        </button>
                        <button
                          onClick={() => handleRtoAction(o.id, 'auto_approved')}
                          className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 font-bold text-[9px] cursor-pointer"
                          title="Approve dispatch"
                        >
                          <CheckCircle2 className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={() => handleRtoAction(o.id, 'rejected')}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors flex items-center gap-1 font-bold text-[9px] cursor-pointer"
                          title="Cancel order"
                        >
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground text-xs font-medium border border-dashed border-border rounded-2xl">
                No orders flagged for RTO review.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Shiprocket Automated Fulfillment & Courier Allocation Card */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm glass space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Truck className="h-4.5 w-4.5 text-primary" /> Shiprocket API & Courier Dispatch Engine
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Automated AWB generation, courier allocation (Blue Dart, Delhivery, Shadowfax), and tracking timeline sync.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold text-[10px] uppercase border border-emerald-500/20">
            ✓ Shiprocket API Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-background/50 border border-border p-4 rounded-2xl space-y-1">
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase">Pickup Warehouse Pincode</span>
            <div className="text-sm font-black text-foreground font-mono">411033 (Chinchwad, Pune)</div>
            <span className="text-[10px] text-emerald-500 font-bold block">HQ Dispatch Center</span>
          </div>

          <div className="bg-background/50 border border-border p-4 rounded-2xl space-y-1">
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase">Supported Courier Partners</span>
            <div className="text-xs font-bold text-foreground">Blue Dart, Delhivery, Shadowfax, XpressBees, DTDC</div>
            <span className="text-[10px] text-primary font-bold block">Smart Lowest-Rate Routing</span>
          </div>

          <div className="bg-background/50 border border-border p-4 rounded-2xl space-y-1">
            <span className="text-[9px] font-extrabold text-muted-foreground uppercase">Shiprocket Auth Email</span>
            <div className="text-xs font-bold text-foreground font-mono">abuzzsellerss@gmail.com</div>
            <span className="text-[10px] text-muted-foreground block">Linked in .env.local</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminLogisticsTab;
