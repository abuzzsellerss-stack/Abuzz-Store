'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  PackageSearch, 
  ReceiptIndianRupee, 
  Truck, 
  Users, 
  FileSignature, 
  CreditCard,
  ArrowLeft,
  Ticket,
  Cpu,
  Fingerprint,
  PackageCheck,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

import { AbuzzLogo } from '../AbuzzLogo';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', name: 'Order Processing', icon: PackageCheck },
    { id: 'catalog', name: 'Catalog Master', icon: PackageSearch },
    { id: 'payments', name: 'Payments & Payouts', icon: Wallet },
    { id: 'taxation', name: 'Taxation & HSN', icon: ReceiptIndianRupee },
    { id: 'vendors', name: 'Vendors Hub', icon: Users },
    { id: 'logistics', name: 'Logistics & RTO', icon: Truck },
    { id: 'shiprocket', name: 'Shiprocket Panel', icon: Truck },
    { id: 'rfqs', name: 'RFQs Workspace', icon: FileSignature },
    { id: 'credit', name: 'B2B Khata & Credits', icon: CreditCard },
    { id: 'marketing', name: 'Marketing & Coupons', icon: Ticket },
    { id: 'integrations', name: 'Integrations & APIs', icon: Cpu },
    { id: 'customers', name: 'Staff Access & Roles', icon: Fingerprint },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 bg-card border-b md:border-b-0 md:border-r border-border/60 p-5 flex flex-col gap-6 glass">
      {/* Back to store */}
      <div className="flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" /> Exit Admin Workspace
        </Link>
      </div>

      {/* Header title & Logo */}
      <div className="flex items-center gap-3 border-b border-border/40 pb-4">
        <AbuzzLogo size="sm" />
      </div>

      {/* Menu list */}
      <nav className="flex flex-row md:flex-col overflow-x-auto no-scrollbar gap-1.5 pb-2 md:pb-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center justify-between gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[44px] ${
                isActive 
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]' 
                  : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-primary'}`} />
                <span>{item.name}</span>
              </div>

              {item.id === 'orders' && (
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white text-primary' : 'bg-amber-500/20 text-amber-500'
                }`}>
                  Live
                </span>
              )}

              {item.id === 'catalog' && (
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white text-primary' : 'bg-blue-500/20 text-blue-500'
                }`}>
                  B2B
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Decorative footer */}
      <div className="hidden md:block mt-auto text-[9px] text-muted-foreground border-t border-border/40 pt-4">
        {user?.role === 'employee' && (
          <div className="mb-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold uppercase tracking-wider text-[8px] text-center">
            Role: Employee (Restricted)
          </div>
        )}
        <p>© 2026 Abuzz Technologies</p>
        <p className="mt-0.5">Compliant with GST & TCS Acts</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
