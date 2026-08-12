'use client';

import React, { useState } from 'react';
import { UserLoginRecord, EmployeePermissions } from '../../utils/adminMockData';
import { Users, ShieldAlert, Ban, CheckCircle, Search, Clock, Monitor, UserPlus, ShieldCheck, Key, Settings, Edit3, X, Save, AlertCircle, Trash2 } from 'lucide-react';

interface AdminCustomersTabProps {
  userLogins: UserLoginRecord[];
  onSaveUserLogins: (updated: UserLoginRecord[]) => void;
  userRole?: string;
}

const DEFAULT_PERMISSIONS: EmployeePermissions = {
  manageCatalog: true,
  manageOrders: true,
  manageRfqs: false,
  manageVendors: false,
  manageLogistics: true,
  manageTaxation: false,
  manageMarketing: false,
  manageFinancials: false,
  manageCustomers: false,
};

export const AdminCustomersTab: React.FC<AdminCustomersTabProps> = ({
  userLogins,
  onSaveUserLogins,
  userRole
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'employee' | 'user'>('all');
  const isReadOnly = userRole === 'employee';

  // Modal States
  const [editingUser, setEditingUser] = useState<UserLoginRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Add / Edit
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDept, setFormDept] = useState('');
  const [formRole, setFormRole] = useState<'admin' | 'employee' | 'user'>('employee');
  const [formPerms, setFormPerms] = useState<EmployeePermissions>(DEFAULT_PERMISSIONS);
  const [formError, setFormError] = useState('');

  const handleToggleStatus = (uid: string, currentStatus: 'active' | 'suspended') => {
    if (isReadOnly) return;
    const nextStatus: 'active' | 'suspended' = currentStatus === 'active' ? 'suspended' : 'active';
    const updated = userLogins.map(u => 
      u.uid === uid ? { ...u, status: nextStatus } : u
    );
    onSaveUserLogins(updated);
  };

  const handleDeleteUser = (uid: string) => {
    if (isReadOnly) return;
    const target = userLogins.find(u => u.uid === uid);
    if (target?.email === 'manishyadav991@gmail.com') {
      alert("Cannot delete the primary Super Admin account.");
      return;
    }
    if (confirm(`Are you sure you want to delete account "${target?.displayName || uid}"? This action cannot be undone.`)) {
      const updated = userLogins.filter(u => u.uid !== uid);
      onSaveUserLogins(updated);
    }
  };

  const openAddModal = () => {
    setFormName('');
    setFormEmail('');
    setFormDept('Operations');
    setFormRole('employee');
    setFormPerms({
      manageCatalog: true,
      manageOrders: true,
      manageRfqs: true,
      manageVendors: false,
      manageLogistics: true,
      manageTaxation: false,
      manageMarketing: false,
      manageFinancials: false,
      manageCustomers: false,
    });
    setFormError('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (user: UserLoginRecord) => {
    setEditingUser(user);
    setFormName(user.displayName);
    setFormEmail(user.email);
    setFormDept(user.department || 'General');
    setFormRole(user.role);
    setFormPerms(user.permissions || DEFAULT_PERMISSIONS);
    setFormError('');
  };

  const handleSaveAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formName || !formEmail) {
      setFormError("Staff Name and Email Address are required.");
      return;
    }

    const newRecord: UserLoginRecord = {
      uid: 'u-emp-' + Date.now().toString(36),
      email: formEmail.trim(),
      displayName: formName.trim(),
      role: formRole,
      department: formDept.trim() || 'Operations',
      permissions: formRole === 'admin' ? {
        manageCatalog: true,
        manageOrders: true,
        manageRfqs: true,
        manageVendors: true,
        manageLogistics: true,
        manageTaxation: true,
        manageMarketing: true,
        manageFinancials: true,
        manageCustomers: true,
      } : formPerms,
      lastLogin: new Date().toISOString(),
      ipAddress: '103.112.44.' + Math.floor(Math.random() * 200 + 10),
      device: 'Authorized Desktop Client',
      status: 'active'
    };

    onSaveUserLogins([newRecord, ...userLogins]);
    setIsAddModalOpen(false);
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated = userLogins.map(u => {
      if (u.uid === editingUser.uid) {
        return {
          ...u,
          displayName: formName.trim(),
          email: formEmail.trim(),
          role: formRole,
          department: formDept.trim(),
          permissions: formRole === 'admin' ? {
            manageCatalog: true,
            manageOrders: true,
            manageRfqs: true,
            manageVendors: true,
            manageLogistics: true,
            manageTaxation: true,
            manageMarketing: true,
            manageFinancials: true,
            manageCustomers: true,
          } : formPerms
        };
      }
      return u;
    });

    onSaveUserLogins(updated);
    setEditingUser(null);
  };

  const handlePermToggle = (key: keyof EmployeePermissions) => {
    setFormPerms(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredLogins = userLogins.filter(u => {
    const matchesSearch = u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (roleFilter === 'all') return matchesSearch;
    return matchesSearch && u.role === roleFilter;
  });

  const staffCount = userLogins.filter(u => u.role === 'admin' || u.role === 'employee').length;

  return (
    <div className="space-y-6 text-xs text-foreground font-sans">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your account permits reading configurations only. Super Admin privileges are required to modify employee permissions.</p>
          </div>
        </div>
      )}

      {/* Header & Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" /> Admin & Employee Access Control
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Grant work-specific workspace permissions to employees and manage staff roles.
          </p>
        </div>

        {!isReadOnly && (
          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:opacity-90 transition-all self-start sm:self-auto cursor-pointer"
          >
            <UserPlus className="h-4 w-4" /> Grant Staff Access
          </button>
        )}
      </div>

      {/* Stats Quick Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Super Admins</span>
            <span className="text-lg font-black text-foreground">{userLogins.filter(u => u.role === 'admin').length} Active</span>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center font-bold">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Staff & Employees</span>
            <span className="text-lg font-black text-foreground">{userLogins.filter(u => u.role === 'employee').length} Accounts</span>
          </div>
        </div>

        <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center font-bold">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Total Directory</span>
            <span className="text-lg font-black text-foreground">{userLogins.length} Users</span>
          </div>
        </div>
      </div>

      {/* Search & Role Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by staff name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-card border border-border/80 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              roleFilter === 'all' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              roleFilter === 'admin' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Admins
          </button>
          <button
            onClick={() => setRoleFilter('employee')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              roleFilter === 'employee' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Employees
          </button>
          <button
            onClick={() => setRoleFilter('user')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
              roleFilter === 'user' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Customers
          </button>
        </div>
      </div>

      {/* Directory Grid Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold uppercase tracking-wider">
                <th className="p-4">Staff Member & Email</th>
                <th className="p-4">Role & Department</th>
                <th className="p-4">Granted Work Permissions</th>
                <th className="p-4"><Clock className="h-3.5 w-3.5 inline mr-1" />Last Active</th>
                <th className="p-4 text-center font-bold">Status</th>
                <th className="p-4 text-center font-bold">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-sans">
              {filteredLogins.map((user) => (
                <tr key={user.uid} className="hover:bg-foreground/5 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-foreground block text-xs">{user.displayName}</span>
                    <span className="text-[10px] text-muted-foreground font-mono mt-0.5">{user.email}</span>
                  </td>
                  
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mb-1 ${
                      user.role === 'admin' ? 'bg-primary/20 text-primary border border-primary/30' :
                      user.role === 'employee' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' :
                      'bg-foreground/10 text-muted-foreground'
                    }`}>
                      {user.role === 'admin' ? 'Super Admin' : user.role === 'employee' ? 'Staff Employee' : 'Corporate Customer'}
                    </span>
                    {user.department && (
                      <span className="block text-[10px] text-muted-foreground font-medium">
                        {user.department}
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20">
                        <CheckCircle className="h-3 w-3" /> Full Administrator Access
                      </span>
                    ) : user.permissions ? (
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {user.permissions.manageCatalog && <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[9px] font-bold">Catalog</span>}
                        {user.permissions.manageOrders && <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-bold">Orders</span>}
                        {user.permissions.manageRfqs && <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 text-[9px] font-bold">RFQs</span>}
                        {user.permissions.manageVendors && <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-bold">Vendors</span>}
                        {user.permissions.manageLogistics && <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 text-[9px] font-bold">Logistics</span>}
                        {user.permissions.manageTaxation && <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 text-[9px] font-bold">GST/Tax</span>}
                        {user.permissions.manageMarketing && <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-500 text-[9px] font-bold">Marketing</span>}
                        {user.permissions.manageFinancials && <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-500 text-[9px] font-bold">Financials</span>}
                        {user.permissions.manageCustomers && <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[9px] font-bold">Users</span>}
                        {!Object.values(user.permissions).some(Boolean) && (
                          <span className="text-[9px] text-muted-foreground italic">No modules granted</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[9px] text-muted-foreground italic">Standard Buyer Account</span>
                    )}
                  </td>

                  <td className="p-4 text-muted-foreground font-mono text-[10px]">
                    {new Date(user.lastLogin).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>

                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      user.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {!isReadOnly && (
                        <button
                          onClick={() => openEditModal(user)}
                          className="px-2.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                          title="Configure Access Permissions"
                        >
                          <Settings className="h-3.5 w-3.5" /> Edit Access
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleStatus(user.uid, user.status)}
                        disabled={isReadOnly || user.role === 'admin'}
                        className={`px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 text-[10px] transition-all cursor-pointer ${
                          user.status === 'active'
                            ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {user.status === 'active' ? (
                          <>
                            <Ban className="h-3.5 w-3.5" /> Suspend
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3.5 w-3.5" /> Activate
                          </>
                        )}
                      </button>

                      {!isReadOnly && (
                        <button
                          onClick={() => handleDeleteUser(user.uid)}
                          disabled={user.email === 'manishyadav991@gmail.com'}
                          className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Delete Account Entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLogins.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground text-xs leading-relaxed font-sans">
                    No staff or customer login records found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Grant / Add New Staff Access */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" /> Grant Staff Account Access
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddEmployee} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Staff Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="ramesh@abuzzstore.com"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Department / Work Group
                  </label>
                  <input
                    type="text"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    placeholder="e.g. Inventory, Billing, Sales"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Account Role Slabs
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  >
                    <option value="employee">Staff Employee (Custom Access)</option>
                    <option value="admin">Super Admin (Full Workspace Access)</option>
                    <option value="user">Corporate Customer</option>
                  </select>
                </div>
              </div>

              {/* Work Modules Permissions Grid */}
              {formRole === 'employee' && (
                <div className="space-y-2 border-t border-border/60 pt-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                    Specific Module Access Controls
                  </span>
                  <p className="text-[10px] text-muted-foreground">Select the exact operational areas this staff member is authorized to manage:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageCatalog)} 
                        onChange={() => handlePermToggle('manageCatalog')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">📦 Product Catalog & Pricing</span>
                        <span className="text-[9px] text-muted-foreground">Products, Stock levels, Prices</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageOrders)} 
                        onChange={() => handlePermToggle('manageOrders')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">🛒 Order Fulfillment</span>
                        <span className="text-[9px] text-muted-foreground">Process orders & dispatch</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageRfqs)} 
                        onChange={() => handlePermToggle('manageRfqs')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">🤝 B2B RFQs & Quotes</span>
                        <span className="text-[9px] text-muted-foreground">Negotiations & custom pricing</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageVendors)} 
                        onChange={() => handlePermToggle('manageVendors')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">🏭 Vendor Suppliers</span>
                        <span className="text-[9px] text-muted-foreground">Approve suppliers & POs</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageLogistics)} 
                        onChange={() => handlePermToggle('manageLogistics')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">🚚 Logistics & Delivery</span>
                        <span className="text-[9px] text-muted-foreground">Shipping partners & Pincodes</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageTaxation)} 
                        onChange={() => handlePermToggle('manageTaxation')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">🏷️ GST & HSN Codes</span>
                        <span className="text-[9px] text-muted-foreground">Tax slabs & HSN Master</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageMarketing)} 
                        onChange={() => handlePermToggle('manageMarketing')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">📢 Marketing & Coupons</span>
                        <span className="text-[9px] text-muted-foreground">Discount coupons & Pixels</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageFinancials)} 
                        onChange={() => handlePermToggle('manageFinancials')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <div>
                        <span className="font-bold text-foreground text-xs block">💳 Payments & Financials</span>
                        <span className="text-[9px] text-muted-foreground">Bank Recons & Gateways</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-foreground hover:bg-foreground/5 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save & Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Existing User Access Permissions */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" /> Edit Access & Role: {editingUser.displayName}
              </h3>
              <button 
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Staff Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Role Category
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary outline-none"
                  >
                    <option value="employee">Staff Employee (Custom Access)</option>
                    <option value="admin">Super Admin (Full Access)</option>
                    <option value="user">Corporate Customer</option>
                  </select>
                </div>
              </div>

              {formRole === 'employee' && (
                <div className="space-y-2 border-t border-border/60 pt-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                    Granted Specific Modules
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageCatalog)} 
                        onChange={() => handlePermToggle('manageCatalog')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">📦 Product Catalog</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageOrders)} 
                        onChange={() => handlePermToggle('manageOrders')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">🛒 Order Fulfillment</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageRfqs)} 
                        onChange={() => handlePermToggle('manageRfqs')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">🤝 B2B RFQs & Quotes</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageVendors)} 
                        onChange={() => handlePermToggle('manageVendors')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">🏭 Vendor Suppliers</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageLogistics)} 
                        onChange={() => handlePermToggle('manageLogistics')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">🚚 Logistics & Pincodes</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageTaxation)} 
                        onChange={() => handlePermToggle('manageTaxation')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">🏷️ GST & HSN Codes</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageMarketing)} 
                        onChange={() => handlePermToggle('manageMarketing')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">📢 Marketing & Coupons</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border/60 hover:border-primary/50 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Boolean(formPerms.manageFinancials)} 
                        onChange={() => handlePermToggle('manageFinancials')}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-bold text-foreground text-xs">💳 Payments & Financials</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-border text-foreground hover:bg-foreground/5 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Save Permission Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCustomersTab;
