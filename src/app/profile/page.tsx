'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, User, LogOut, Package, Shield, Calendar, CreditCard, ChevronRight, Heart, FileText, Truck, Check, X, Printer, ShoppingCart, Trash2 } from 'lucide-react';
import { Order, Product } from '../../types';

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, loading, signOutUser, updateUserDisplayName } = useAuth();
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');
  const [displayName, setDisplayName] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Selected Order for Shipment Tracking & GST Invoice Modals
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'wishlist') {
      setActiveTab('wishlist');
    }
  }, [searchParams]);

  // Always read the latest orders from localStorage
  const loadOrders = useCallback((uid: string, displayName: string) => {
    const storedOrders = localStorage.getItem('abuzz_orders');
    if (storedOrders !== null) {
      try {
        const parsed: Order[] = JSON.parse(storedOrders);
        setOrders(parsed);
        return;
      } catch {
        // fall through to mock
      }
    }
    // Only seed mock data if nothing real exists
    const mockOrderHistory: Order[] = [
      {
        id: 'ORD-98721',
        userId: uid,
        items: [
          {
            product: {
              id: 'prod-1',
              title: 'DeWalt 20V MAX Cordless Drill Combo Kit',
              category: 'Power Tools',
              subcategory: 'Drills',
              price: 12499,
              stockStatus: 'in_stock',
              description: 'High-performance cordless drill kit...',
              specifications: { 'Voltage': '20V', 'Speed': '2000 RPM' },
              imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600',
              popularity: 95,
              rating: 4.8,
              reviewsCount: 124
            },
            quantity: 1
          }
        ],
        subtotal: 10592,
        tax: 1907,
        total: 12499,
        shippingAddress: {
          name: displayName || 'Valued Customer',
          street: '128 Builder Lane, Tech Park',
          city: 'New Delhi',
          state: 'Delhi',
          zip: '110001',
          country: 'India'
        },
        paymentMethod: 'UPI / Net Banking',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'shipped'
      }
    ];
    localStorage.setItem('abuzz_orders', JSON.stringify(mockOrderHistory));
    setOrders(mockOrderHistory);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
    if (user) {
      setDisplayName(user.displayName || '');
      loadOrders(user.uid, user.displayName || '');
    }
  }, [user, loading, router, pathname, loadOrders]);

  useEffect(() => {
    const handleStorage = () => {
      if (user) loadOrders(user.uid, user.displayName || '');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [user, loadOrders]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName) return;
    
    try {
      await updateUserDisplayName(displayName);
      setUpdateSuccess(true);
      setIsEditing(false);
      setTimeout(() => setUpdateSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to update profile name:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-xs text-muted-foreground font-semibold">Verifying user account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-background text-foreground transition-colors duration-300">
      
      {/* Return home button header */}
      <div className="border-b border-border/40 glass py-3">
        <div className="mx-auto max-w-5xl px-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Store
          </Link>
          <span className="text-sm font-extrabold text-foreground">Account Dashboard</span>
          <div className="w-16"></div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: User profile details box */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-md text-center glass relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-primary" />
              
              <div className="relative h-20 w-20 overflow-hidden rounded-full mx-auto mb-4 border-2 border-primary shadow-md">
                <Image
                  src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                  alt={user.displayName || 'Profile'}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-3">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full text-center rounded-xl border border-border bg-background/50 px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-white text-[11px] font-bold rounded-lg py-1.5 hover:bg-primary/95"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsEditing(false); setDisplayName(user.displayName || ''); }}
                      className="flex-1 border border-border text-[11px] font-bold rounded-lg py-1.5 text-muted-foreground hover:bg-foreground/5"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-base font-extrabold text-foreground">{user.displayName}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{user.email}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-bold text-primary hover:underline min-h-[44px]"
                  >
                    Edit Profile Name
                  </button>
                </div>
              )}

              {updateSuccess && (
                <div className="mt-2 text-[10px] text-emerald-500 font-bold">Profile updated successfully!</div>
              )}

              <hr className="border-border/40 my-4" />

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500/5 text-xs font-bold py-2.5 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>

                {(user?.role === 'admin' || user?.role === 'employee') && (
                  <Link
                    href="/admin"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold py-2.5 transition-colors mt-1"
                  >
                    <Shield className="h-4 w-4 text-primary" /> Admin Access Panel
                  </Link>
                )}
              </div>
            </div>

            {/* Account benefits */}
            <div className="bg-card border border-border rounded-3xl p-5 shadow-md glass">
              <h4 className="text-xs font-extrabold text-foreground uppercase mb-3 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" /> Abuzz B2B Benefits
              </h4>
              <ul className="text-xs space-y-2 text-muted-foreground font-sans">
                <li>• Free shipping on orders above ₹1,000</li>
                <li>• Instant GST tax invoices download</li>
                <li>• Live multi-stage courier tracking</li>
                <li>• Extended warranty on tools</li>
              </ul>
            </div>
          </div>

          {/* Column 2 & 3: Main Tabs (Orders & Wishlist) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                <Package className="h-4 w-4" />
                <span>Orders History ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  activeTab === 'wishlist'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                <Heart className="h-4 w-4 fill-current text-rose-500" />
                <span>Wishlist / Saved ({wishlistCount})</span>
              </button>
            </div>

            {/* TAB 1: ORDERS HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="border border-dashed border-border rounded-3xl p-12 text-center bg-card/20">
                    <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-foreground">No purchase history found</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Once you place an order, your items, courier tracking, and GST invoices will appear here.
                    </p>
                    <Link
                      href="/"
                      className="inline-block mt-4 rounded-xl bg-primary text-white px-5 py-2.5 text-xs font-bold shadow-md hover:bg-primary/95"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id}
                        className="bg-card border border-border rounded-3xl p-5 shadow-sm glass overflow-hidden"
                      >
                        {/* Order summary header */}
                        <div className="flex flex-wrap items-center justify-between border-b border-border/40 pb-3 mb-4 gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-foreground uppercase">
                              {order.id}
                            </span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                              order.status === 'shipped' ? 'bg-blue-500/10 text-blue-500' :
                              order.status === 'processing' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'
                            }`}>
                              {order.status || 'pending'}
                            </span>
                            <span className="text-sm font-extrabold text-foreground">
                              ₹{(order.total || 0).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order items lists */}
                        <div className="space-y-2 mb-4">
                          {(order.items || []).map((item, idx) => (
                            <div key={item.product?.id || idx} className="flex justify-between items-center text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">[{item.quantity || 1}x]</span>
                                <span className="text-foreground font-semibold line-clamp-1">{item.product?.title || 'Industrial Product'}</span>
                              </div>
                              <span className="text-foreground font-bold shrink-0">
                                ₹{((item.product?.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Actions (Track Shipment & GST Invoice) */}
                        <div className="border-t border-border/40 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="text-[10px] text-muted-foreground">
                            Paid via <strong className="text-foreground">{order.paymentMethod}</strong>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedTrackingOrder(order)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-blue-500/30 text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              <Truck className="h-3.5 w-3.5" />
                              <span>Track Order</span>
                            </button>

                            <button
                              onClick={() => setSelectedInvoiceOrder(order)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              <span>GST Invoice</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WISHLIST / SAVED ITEMS */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                {wishlist.length === 0 ? (
                  <div className="border border-dashed border-border rounded-3xl p-12 text-center bg-card/20">
                    <Heart className="h-12 w-12 text-rose-500/30 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-foreground">Your Wishlist is Empty</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tap the heart icon on any product to save it here for later.
                    </p>
                    <Link
                      href="/"
                      className="inline-block mt-4 rounded-xl bg-primary text-white px-5 py-2.5 text-xs font-bold shadow-md hover:bg-primary/95"
                    >
                      Explore Catalog
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-card border border-border rounded-2xl p-4 shadow-sm glass flex gap-3 items-center justify-between"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img src={prod.imageUrl} alt={prod.title} className="h-full w-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${prod.id}`} className="text-xs font-bold text-foreground hover:text-primary line-clamp-1">
                            {prod.title}
                          </Link>
                          <div className="text-xs font-black text-primary mt-1">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            onClick={() => addToCart(prod, 1)}
                            className="p-2 rounded-xl bg-primary text-white hover:bg-primary/95 transition-colors cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFromWishlist(prod.id)}
                            className="p-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </main>

      {/* TRACKING STEPPER MODAL */}
      {selectedTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-6 relative">
            
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Shipment Tracking</h3>
                <p className="text-[10px] text-muted-foreground">Order ID: {selectedTrackingOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedTrackingOrder(null)}
                className="p-1.5 rounded-full hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Timeline Stepper */}
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {[
                { title: 'Order Placed & Confirmed', date: 'Date: Immediate', done: true },
                { title: 'Packed at Warehouse', date: 'Quality verified', done: true },
                { title: 'Shipped via Express Delivery', date: 'Tracking ID: ABZ-892401', done: selectedTrackingOrder.status === 'shipped' || selectedTrackingOrder.status === 'delivered' },
                { title: 'Out for Delivery / Delivered', date: 'Recipient signature', done: selectedTrackingOrder.status === 'delivered' }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative z-10">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                    step.done ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-card text-muted-foreground border-border'
                  }`}>
                    {step.done ? <Check className="h-4 w-4" /> : idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{step.title}</div>
                    <div className="text-[10px] text-muted-foreground">{step.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-500 space-y-1">
              <div className="font-bold">Carrier Partner: BlueDart Express</div>
              <div className="text-[10px] text-muted-foreground">Estimated Delivery: 2 Business Days</div>
            </div>

            <button
              onClick={() => setSelectedTrackingOrder(null)}
              className="w-full rounded-xl bg-primary text-white font-bold text-xs py-3 shadow-md hover:bg-primary/95"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* PRINTABLE GST INVOICE MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
            
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">ABUZZ SELLERS</h2>
                <p className="text-[11px] text-slate-600 font-bold">GSTIN: 27ALMPY1073G1ZP</p>
                <p className="text-[10px] text-slate-500">A301, JD Green Paradise, Lohgaon, Pune 411047</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black bg-slate-100 text-slate-800 px-3 py-1 rounded-full uppercase">
                  Tax Invoice
                </span>
                <p className="text-xs font-bold mt-2 text-slate-800">{selectedInvoiceOrder.id}</p>
                <p className="text-[10px] text-slate-500">{new Date(selectedInvoiceOrder.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
            </div>

            {/* Billed To / Shipped To */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <h4 className="font-bold uppercase text-[10px] text-slate-500 mb-1">Billed To (Customer):</h4>
                <p className="font-bold text-slate-900">{selectedInvoiceOrder.shippingAddress.name}</p>
                <p className="text-slate-600">{selectedInvoiceOrder.shippingAddress.street}</p>
                <p className="text-slate-600">{selectedInvoiceOrder.shippingAddress.city}, {selectedInvoiceOrder.shippingAddress.state} - {selectedInvoiceOrder.shippingAddress.zip}</p>
              </div>
              <div>
                <h4 className="font-bold uppercase text-[10px] text-slate-500 mb-1">Payment & Logistics:</h4>
                <p className="text-slate-700">Mode: <strong>{selectedInvoiceOrder.paymentMethod}</strong></p>
                <p className="text-slate-700">Status: <strong className="uppercase text-emerald-600">{selectedInvoiceOrder.status}</strong></p>
              </div>
            </div>

            {/* Invoice Line Items */}
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-[10px] uppercase font-bold text-slate-500">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">GST (18%)</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedInvoiceOrder.items.map((item) => {
                  const basePrice = Math.round(item.product.price / 1.18);
                  const gstVal = item.product.price - basePrice;
                  return (
                    <tr key={item.product.id}>
                      <td className="py-3 font-semibold text-slate-900">{item.product.title}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">₹{basePrice.toLocaleString('en-IN')}</td>
                      <td className="py-3 text-right">₹{(gstVal * item.quantity).toLocaleString('en-IN')}</td>
                      <td className="py-3 text-right font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Totals Breakdown */}
            <div className="border-t border-slate-200 pt-4 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal (Excl. Tax):</span>
                  <span>₹{selectedInvoiceOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>CGST (9%) + SGST (9%):</span>
                  <span>₹{selectedInvoiceOrder.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-300 pt-2">
                  <span>Invoice Total:</span>
                  <span>₹{selectedInvoiceOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Print & Close Toolbar */}
            <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white font-bold text-xs py-3 hover:bg-slate-800 cursor-pointer"
              >
                <Printer className="h-4 w-4" /> Print Tax Invoice
              </button>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs py-3 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

