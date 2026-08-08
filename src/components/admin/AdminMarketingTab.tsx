'use client';

import React, { useState } from 'react';
import { Coupon, validateAndApplyCoupon, getSocialLinks, saveSocialLinks, SocialMediaLinks, INITIAL_SOCIAL_LINKS } from '../../utils/adminMockData';
import { Ticket, Plus, Check, X, Megaphone, Sparkles, HelpCircle, Share2, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle, Save } from 'lucide-react';

interface AdminMarketingTabProps {
  coupons: Coupon[];
  onSaveCoupons: (updatedCoupons: Coupon[]) => void;
  userRole?: string;
}

export const AdminMarketingTab: React.FC<AdminMarketingTabProps> = ({ coupons, onSaveCoupons, userRole }) => {
  const isReadOnly = userRole === 'employee';
  // Coupon creation states
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'percentage' | 'flat'>('percentage');
  const [newValue, setNewValue] = useState(10);
  const [newMinOrder, setNewMinOrder] = useState(1000);
  const [newMaxLimit, setNewMaxLimit] = useState(500);
  const [newStart, setNewStart] = useState(new Date().toISOString().split('T')[0]);
  const [newEnd, setNewEnd] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  // Alert/Banner settings
  const [bannerText, setBannerText] = useState('Grand Opening Special Offer: Claim 10% Off + Free Shipping on First Order! Use Code: WELCOME10');
  const [isBannerActive, setIsBannerActive] = useState(true);
  const [bannerSuccess, setBannerSuccess] = useState(false);

  // Social Media Links States
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>(() => getSocialLinks());
  const [socialSuccess, setSocialSuccess] = useState(false);

  // Tester states
  const [testSubtotal, setTestSubtotal] = useState(5000);
  const [testCode, setTestCode] = useState('WELCOME10');
  const [toastMsg, setToastMsg] = useState('');

  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    saveSocialLinks(socialLinks);
    setSocialSuccess(true);
    setToastMsg('Social media links updated successfully across website footer!');
    setTimeout(() => {
      setSocialSuccess(false);
      setToastMsg('');
    }, 4000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const codeUpper = newCode.trim().toUpperCase();
    if (coupons.some(c => c.code === codeUpper)) {
      setToastMsg(`Error: Coupon code "${codeUpper}" already exists.`);
      setTimeout(() => setToastMsg(''), 3000);
      return;
    }

    const newCoupon: Coupon = {
      code: codeUpper,
      discountType: newType,
      value: newValue,
      minOrderValue: newMinOrder,
      maxDiscountLimit: newType === 'percentage' ? newMaxLimit : undefined,
      startDate: newStart,
      endDate: newEnd,
      isActive: true,
      usageCount: 0
    };

    onSaveCoupons([newCoupon, ...coupons]);
    setToastMsg(`Promo Code ${codeUpper} created successfully!`);
    setTimeout(() => setToastMsg(''), 3000);
    
    // Reset Form
    setNewCode('');
    setNewValue(10);
    setNewMinOrder(1000);
    setNewMaxLimit(500);
  };

  const handleToggleCoupon = (code: string) => {
    const updated = coupons.map(c => 
      c.code === code ? { ...c, isActive: !c.isActive } : c
    );
    onSaveCoupons(updated);
  };

  const handleSaveBanner = () => {
    setBannerSuccess(true);
    setTimeout(() => setBannerSuccess(false), 2000);
  };

  // Run real-time simulation logic
  const testResult = validateAndApplyCoupon(testCode, testSubtotal, coupons);

  return (
    <div className="space-y-6 text-xs text-foreground font-sans relative">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <Ticket className="h-5 w-5 shrink-0 animate-pulse text-amber-500" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to manage coupons.</p>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 inset-x-6 z-50 p-3 rounded-xl bg-primary text-white text-center font-bold flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3">
          <Sparkles className="h-4.5 w-4.5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">Marketing Campaigns & Coupons</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Publish header notifications, customize B2B promo codes, and audit discount margins.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Banner Alert Panel & Coupon Simulator Console */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Header Banner Campaigns */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone className="h-4.5 w-4.5 text-primary" /> Site-wide Alert Banner
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Banner Alert Message</label>
                <textarea
                  disabled={isReadOnly}
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 min-h-[70px] resize-none disabled:opacity-50"
                  placeholder="Enter campaign message..."
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Banner active state:</span>
                <button
                  type="button"
                  disabled={isReadOnly}
                  onClick={() => setIsBannerActive(!isBannerActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isBannerActive ? 'bg-primary' : 'bg-foreground/15'
                  } ${isReadOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isBannerActive ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {!isReadOnly && (
                <button
                  type="button"
                  onClick={handleSaveBanner}
                  className="w-full flex items-center justify-center h-10 rounded-xl bg-primary text-white font-bold transition-all text-[11px] cursor-pointer"
                >
                  {bannerSuccess ? 'Campaign Alerts Published!' : 'Publish Banner Alerts'}
                </button>
              )}
            </div>
          </div>

          {/* Social Media Links Management Card */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="h-4.5 w-4.5 text-primary" /> Social Media Links & Handles
              </h3>
              <span className="text-[10px] text-muted-foreground font-semibold">Website Footer Links</span>
            </div>

            <form onSubmit={handleSaveSocialLinks} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1.5">
                  <Facebook className="h-3.5 w-3.5 text-blue-600" /> Facebook Profile URL
                </label>
                <input
                  type="url"
                  disabled={isReadOnly}
                  placeholder="https://facebook.com/abuzzstore"
                  value={socialLinks.facebook}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1.5">
                  <Twitter className="h-3.5 w-3.5 text-sky-500" /> Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  disabled={isReadOnly}
                  placeholder="https://twitter.com/abuzzstore"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1.5">
                  <Instagram className="h-3.5 w-3.5 text-pink-500" /> Instagram Profile URL
                </label>
                <input
                  type="url"
                  disabled={isReadOnly}
                  placeholder="https://instagram.com/abuzz.store"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1.5">
                  <Linkedin className="h-3.5 w-3.5 text-blue-700" /> LinkedIn Company Page URL
                </label>
                <input
                  type="url"
                  disabled={isReadOnly}
                  placeholder="https://linkedin.com/company/abuzz-store"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1.5">
                  <Youtube className="h-3.5 w-3.5 text-rose-600" /> YouTube Channel URL
                </label>
                <input
                  type="url"
                  disabled={isReadOnly}
                  placeholder="https://youtube.com/@abuzzstore"
                  value={socialLinks.youtube}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-500" /> WhatsApp Hotline URL
                </label>
                <input
                  type="url"
                  disabled={isReadOnly}
                  placeholder="https://wa.me/918329819618"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                />
              </div>

              {!isReadOnly && (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-white font-bold transition-all text-xs cursor-pointer shadow-md shadow-primary/20"
                >
                  {socialSuccess ? (
                    <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Links Saved!</span>
                  ) : (
                    <span className="flex items-center gap-1.5"><Save className="h-4 w-4" /> Save Social Media Links</span>
                  )}
                </button>
              )}
            </form>
          </div>

          {/* Coupon Simulation Tester Console */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Ticket className="h-4.5 w-4.5 text-primary" /> Promo Tester Console
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Test Order Subtotal (₹)</label>
                <input
                  type="number"
                  value={testSubtotal}
                  onChange={(e) => setTestSubtotal(Number(e.target.value))}
                  className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Test Coupon Code</label>
                <input
                  type="text"
                  value={testCode}
                  onChange={(e) => setTestCode(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono font-bold text-primary"
                />
              </div>

              {/* Simulation Result */}
              <div className="p-3.5 rounded-2xl bg-foreground/5 border border-border/60 space-y-2">
                <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">Validation Audit Result</span>
                
                {testResult.isValid ? (
                  <div className="space-y-1.5">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold uppercase tracking-wider text-[9px]">Coupon Applied</span>
                    <div className="flex justify-between">
                      <span>Deducted Discount</span>
                      <span className="font-bold text-primary">₹{testResult.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between border-t border-border/40 pt-1 text-[11px] font-bold">
                      <span>Final Est. Price</span>
                      <span className="text-foreground">₹{testResult.finalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="inline-block px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-bold uppercase tracking-wider text-[9px]">Blocked</span>
                    <div className="text-red-500 font-semibold leading-relaxed text-[10px]">{testResult.error}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Coupons List & Creation form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Create Coupon Form */}
          {!isReadOnly && (
            <form onSubmit={handleCreateCoupon} className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="h-4.5 w-4.5 text-primary" /> Create Promo Discount Rule
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MONSOON15"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Discount Mode</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 min-h-[44px]"
                  >
                    <option value="percentage">Percentage (%) Discount</option>
                    <option value="flat">Flat Value (₹) Discount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    required
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Max Savings Cap (₹)</label>
                  <input
                    type="number"
                    required
                    value={newMaxLimit}
                    onChange={(e) => setNewMaxLimit(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 col-span-1 sm:col-span-2 md:col-span-1">
                  <div>
                    <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newStart}
                      onChange={(e) => setNewStart(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-2 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={newEnd}
                      onChange={(e) => setNewEnd(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-2 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-border/40">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all cursor-pointer min-h-[44px]"
                >
                  <Plus className="h-4.5 w-4.5" /> Save Coupon Rule
                </button>
              </div>
            </form>
          )}

          {/* Active Coupons Table */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
              Coupons Slabs Registry
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-foreground/5 text-muted-foreground border-b border-border/40 font-bold">
                    <th className="p-3">Coupon Code</th>
                    <th className="p-3">Rule Definition</th>
                    <th className="p-3 text-right">Min Order</th>
                    <th className="p-3 text-right">Max Savings Cap</th>
                    <th className="p-3 text-center">Uses</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 font-sans">
                  {coupons.map((c) => {
                    const isExpired = new Date().toISOString().split('T')[0] > c.endDate;
                    return (
                      <tr key={c.code} className="hover:bg-foreground/5 transition-colors">
                        <td className="p-3 font-mono font-bold text-foreground">
                          {c.code}
                          {isExpired && (
                            <span className="block text-[8px] font-bold text-red-500 font-sans mt-0.5">EXPIRED</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-foreground">
                            {c.discountType === 'percentage' ? `${c.value}% Off` : `₹${c.value.toLocaleString('en-IN')} Flat Off`}
                          </span>
                          <span className="block text-[9px] text-muted-foreground mt-0.5">Ends: {c.endDate}</span>
                        </td>
                        <td className="p-3 text-right font-bold text-foreground">₹{c.minOrderValue.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-right font-bold text-foreground">
                          {c.maxDiscountLimit !== undefined ? `₹${c.maxDiscountLimit.toLocaleString('en-IN')}` : '-'}
                        </td>
                        <td className="p-3 text-center font-bold text-muted-foreground">{c.usageCount}</td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            disabled={isReadOnly}
                            onClick={() => !isReadOnly && handleToggleCoupon(c.code)}
                            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase transition-all ${
                              isReadOnly ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
                            } ${
                              c.isActive && !isExpired 
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                : 'bg-foreground/10 text-muted-foreground border border-border'
                            }`}
                          >
                            {c.isActive && !isExpired ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminMarketingTab;
