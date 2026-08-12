'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { 
  getHsnCodes, saveHsnCodes, HsnCodeMaster,
  getVendors, saveVendors, Vendor,
  getRfqs, saveRfqs, RfqNegotiation,
  getPincodes, savePincodes, PinCodeServiceability,
  getCreditProfiles, saveCreditProfiles, CorporateCreditProfile,
  getBankRecons, saveBankRecons, OfflineBankReconciliation,
  getAdminProducts, saveAdminProducts,
  getCoupons, saveCoupons, Coupon,
  getGateways, saveGateways, PaymentGatewayConfig,
  getMetaConfig, saveMetaConfig, MetaPixelConfig,
  getTrackingLogs, saveTrackingLogs, TrackingEventLog,
  getGoogleConfig, saveGoogleConfig, GoogleMarketingConfig,
  getSocialChannels, saveSocialChannels, SocialChannelConfig,
  getSocialMessages, saveSocialMessages, SocialMessageLog,
  getUserLogins, saveUserLogins, UserLoginRecord,
  getAdminOrders, saveAdminOrders, sanitizeOrderRecord, AdminOrderRecord
} from '../../utils/adminMockData';
import { MOCK_PRODUCTS } from '../../utils/seed';
import { Product } from '../../types';
import { db, isMock } from '../../lib/firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminDashboardTab } from '../../components/admin/AdminDashboardTab';
import { AdminOrdersTab } from '../../components/admin/AdminOrdersTab';
import { AdminCatalogTab } from '../../components/admin/AdminCatalogTab';
import { AdminPaymentsTab } from '../../components/admin/AdminPaymentsTab';
import { AdminTaxationTab } from '../../components/admin/AdminTaxationTab';
import { AdminVendorsTab } from '../../components/admin/AdminVendorsTab';
import { AdminLogisticsTab } from '../../components/admin/AdminLogisticsTab';
import { AdminShiprocketPanelTab } from '../../components/admin/AdminShiprocketPanelTab';
import { AdminRFQTab } from '../../components/admin/AdminRFQTab';
import { AdminCreditTab } from '../../components/admin/AdminCreditTab';
import { AdminMarketingTab } from '../../components/admin/AdminMarketingTab';
import { AdminIntegrationsTab } from '../../components/admin/AdminIntegrationsTab';
import { AdminCustomersTab } from '../../components/admin/AdminCustomersTab';
import { ToolLoadingAnimation } from '../../components/ToolLoadingAnimation';
import { Loader2, ShieldAlert, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const VALID_TABS = [
  'dashboard',
  'orders',
  'catalog',
  'payments',
  'taxation',
  'vendors',
  'logistics',
  'shiprocket',
  'rfqs',
  'credit',
  'marketing',
  'integrations',
  'customers'
];

export function AdminContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { user, loading, signInWithEmail } = useAuth();
  
  // Extract route tab from /admin/[tab] or ?tab=[tab]
  const slug = params?.slug;
  const slugTab = Array.isArray(slug) && slug.length > 0 ? slug[0] : (typeof slug === 'string' ? slug : null);
  const queryTab = searchParams?.get('tab');
  const derivedTab = (slugTab && VALID_TABS.includes(slugTab)) 
    ? slugTab 
    : (queryTab && VALID_TABS.includes(queryTab)) 
      ? queryTab 
      : 'dashboard';

  // Tab Routing state
  const [activeTab, setActiveTab] = useState(derivedTab);
  const [isSimulatingLogin, setIsSimulatingLogin] = useState(false);

  // Synchronize state when URL changes (e.g. browser back/forward or navigation)
  useEffect(() => {
    if (derivedTab !== activeTab) {
      setActiveTab(derivedTab);
    }
  }, [derivedTab]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/admin/${newTab}`);
  };

  // Administrative State Matrices with lazy initializers to prevent undefined initial renders
  const [products, setProducts] = useState<Product[]>(() => getAdminProducts(MOCK_PRODUCTS));
  const [hsnCodes, setHsnCodes] = useState<HsnCodeMaster[]>(() => getHsnCodes());
  const [vendors, setVendors] = useState<Vendor[]>(() => getVendors());
  const [rfqs, setRfqs] = useState<RfqNegotiation[]>(() => getRfqs());
  const [pincodes, setPincodes] = useState<PinCodeServiceability[]>(() => getPincodes());
  const [credits, setCredits] = useState<CorporateCreditProfile[]>(() => getCreditProfiles());
  const [recons, setRecons] = useState<OfflineBankReconciliation[]>(() => getBankRecons());
  const [coupons, setCoupons] = useState<Coupon[]>(() => getCoupons());
  const [gateways, setGateways] = useState<PaymentGatewayConfig[]>(() => getGateways());
  const [metaConfig, setMetaConfig] = useState<MetaPixelConfig>(() => getMetaConfig());
  const [googleConfig, setGoogleConfig] = useState<GoogleMarketingConfig>(() => getGoogleConfig());
  const [trackingLogs, setTrackingLogs] = useState<TrackingEventLog[]>(() => getTrackingLogs());
  const [socialChannels, setSocialChannels] = useState<SocialChannelConfig[]>(() => getSocialChannels());
  const [socialMessages, setSocialMessages] = useState<SocialMessageLog[]>(() => getSocialMessages());
  const [userLogins, setUserLogins] = useState<UserLoginRecord[]>(() => getUserLogins());
  const [orders, setOrders] = useState<AdminOrderRecord[]>(() => getAdminOrders());
  const [isSimulatingEmployee, setIsSimulatingEmployee] = useState(false);

  // Authentication inputs states
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load & merge orders from Firestore + localStorage
  const refreshOrders = useCallback(async () => {
    const localOrders = getAdminOrders();
    if (db) {
      try {
        const snap = await getDocs(collection(db, 'orders'));
        const firestoreOrders: AdminOrderRecord[] = snap.docs.map(d => sanitizeOrderRecord({ ...d.data(), id: d.data().id || d.id }));
        // Merge: Firestore orders take priority, then add any local-only ones
        const merged = [...firestoreOrders];
        for (const lo of localOrders) {
          if (!merged.some(fo => fo.id === lo.id)) merged.push(lo);
        }
        merged.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        const sanitizedMerged = merged.map(sanitizeOrderRecord);
        setOrders(sanitizedMerged);
        saveAdminOrders(sanitizedMerged);
        return;
      } catch (err) {
        console.warn("Firestore orders sync fallback:", err);
      }
    }
    setOrders(localOrders);
  }, []);

  // Real-time live order listener (instantly updates admin panel when any customer places an order)
  useEffect(() => {
    let unsub: () => void = () => {};
    if (db) {
      try {
        unsub = onSnapshot(collection(db, 'orders'), (snap) => {
          const firestoreOrders: AdminOrderRecord[] = snap.docs.map(d => sanitizeOrderRecord({
            ...d.data(),
            id: d.data().id || d.id
          }));

          const localOrders = getAdminOrders();
          const merged = [...firestoreOrders];
          for (const lo of localOrders) {
            if (!merged.some(fo => fo.id === lo.id)) merged.push(lo);
          }
          merged.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

          const sanitizedMerged = merged.map(sanitizeOrderRecord);
          setOrders(sanitizedMerged);
          saveAdminOrders(sanitizedMerged);
        }, (err) => {
          console.warn("Firestore real-time listener error:", err);
          refreshOrders();
        });
      } catch (err) {
        console.warn("Firestore onSnapshot setup error:", err);
        refreshOrders();
      }
    }
    return () => unsub();
  }, [refreshOrders]);

  // Load state matrices from Local Storage on mount & listen for order updates

  useEffect(() => {
    const refreshData = () => {
      setProducts(getAdminProducts(MOCK_PRODUCTS));
      setHsnCodes(getHsnCodes());
      setVendors(getVendors());
      setRfqs(getRfqs());
      setPincodes(getPincodes());
      setCredits(getCreditProfiles());
      setRecons(getBankRecons());
      setCoupons(getCoupons());
      setGateways(getGateways());
      setMetaConfig(getMetaConfig());
      setGoogleConfig(getGoogleConfig());
      setTrackingLogs(getTrackingLogs());
      setSocialChannels(getSocialChannels());
      setSocialMessages(getSocialMessages());
      setUserLogins(getUserLogins());
      refreshOrders();
    };

    refreshData();
    window.addEventListener('storage', refreshData);

    return () => {
      window.removeEventListener('storage', refreshData);
    };
  }, [refreshOrders]);

  // Setters with persistent Local Storage triggers
  const handleSaveProducts = (updated: Product[]) => {
    setProducts(updated);
    saveAdminProducts(updated, MOCK_PRODUCTS);
  };

  const handleSaveOrders = (updated: AdminOrderRecord[]) => {
    setOrders(updated);
    saveAdminOrders(updated);
  };

  const handleSaveHsnCodes = (updated: HsnCodeMaster[]) => {
    setHsnCodes(updated);
    saveHsnCodes(updated);
  };

  const handleSaveVendors = (updated: Vendor[]) => {
    setVendors(updated);
    saveVendors(updated);
  };

  const handleSaveRfqs = (updated: RfqNegotiation[]) => {
    setRfqs(updated);
    saveRfqs(updated);
  };

  const handleSavePincodes = (updated: PinCodeServiceability[]) => {
    setPincodes(updated);
    savePincodes(updated);
  };

  const handleSaveCredits = (updated: CorporateCreditProfile[]) => {
    setCredits(updated);
    saveCreditProfiles(updated);
  };

  const handleSaveRecons = (updated: OfflineBankReconciliation[]) => {
    setRecons(updated);
    saveBankRecons(updated);
  };

  const handleSaveCoupons = (updated: Coupon[]) => {
    setCoupons(updated);
    saveCoupons(updated);
  };

  const handleSaveGateways = (updated: PaymentGatewayConfig[]) => {
    setGateways(updated);
    saveGateways(updated);
  };

  const handleSaveMetaConfig = (updated: MetaPixelConfig) => {
    setMetaConfig(updated);
    saveMetaConfig(updated);
  };

  const handleSaveGoogleConfig = (updated: GoogleMarketingConfig) => {
    setGoogleConfig(updated);
    saveGoogleConfig(updated);
  };

  const handleSaveTrackingLogs = (updated: TrackingEventLog[]) => {
    setTrackingLogs(updated);
    saveTrackingLogs(updated);
  };

  const handleSaveSocialChannels = (updated: SocialChannelConfig[]) => {
    setSocialChannels(updated);
    saveSocialChannels(updated);
  };

  const handleSaveSocialMessages = (updated: SocialMessageLog[]) => {
    setSocialMessages(updated);
    saveSocialMessages(updated);
  };

  const handleSaveUserLogins = (updated: UserLoginRecord[]) => {
    setUserLogins(updated);
    saveUserLogins(updated);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      await signInWithEmail(emailInput.trim(), passInput);
    } catch (err: any) {
      setLoginError(err.message || 'Invalid administrator credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return <ToolLoadingAnimation size="fullscreen" message="Loading Abuzz Admin Workspace..." />;
  }

  // Access Control Security Check
  const isAuthorizedAdmin = isSimulatingLogin || user?.role === 'admin' || user?.role === 'employee';

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 text-foreground">
        <div className="max-w-md w-full bg-card border border-border/80 rounded-2xl p-6 shadow-xl glass space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h1 className="text-lg font-black tracking-tight text-foreground uppercase">
              Administrator Portal
            </h1>
            <p className="text-xs text-muted-foreground">
              Please authenticate as an Admin to manage Abuzz Store operations.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Admin Email
              </label>
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="manishyadav991@gmail.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Password
              </label>
              <input 
                type="password" 
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <KeyRound className="h-4 w-4" /> Sign In as Admin
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render workspace content based on active tab
  const renderWorkspace = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AdminDashboardTab 
            vendors={vendors} 
            rfqs={rfqs} 
            credits={credits} 
            orders={orders}
            products={products}
            onTabChange={handleTabChange} 
          />
        );
      case 'orders':
        return (
          <AdminOrdersTab
            orders={orders}
            onSaveOrders={handleSaveOrders}
            userRole={user?.role}
          />
        );
      case 'catalog':
        return (
          <AdminCatalogTab 
            products={products} 
            onSaveProducts={handleSaveProducts}
            userRole={user?.role}
          />
        );
      case 'payments':
        return (
          <AdminPaymentsTab
            orders={orders}
            userRole={user?.role}
          />
        );
      case 'taxation':
        return (
          <AdminTaxationTab 
            hsnCodes={hsnCodes} 
            onSaveHsnCodes={handleSaveHsnCodes} 
            userRole={user?.role}
          />
        );
      case 'vendors':
        return (
          <AdminVendorsTab 
            vendors={vendors} 
            onSaveVendors={handleSaveVendors} 
            userRole={user?.role}
          />
        );
      case 'logistics':
        return (
          <AdminLogisticsTab 
            pincodes={pincodes} 
            onSavePincodes={handleSavePincodes} 
            userRole={user?.role}
          />
        );
      case 'shiprocket':
        return (
          <AdminShiprocketPanelTab
            orders={orders}
            onSaveOrders={handleSaveOrders}
            userRole={user?.role}
          />
        );
      case 'rfqs':
        return (
          <AdminRFQTab 
            rfqs={rfqs} 
            onSaveRfqs={handleSaveRfqs} 
            userRole={user?.role}
          />
        );
      case 'credit':
        return (
          <AdminCreditTab 
            credits={credits} 
            onSaveCredits={handleSaveCredits} 
            recons={recons} 
            onSaveRecons={handleSaveRecons} 
            userRole={user?.role}
          />
        );
      case 'marketing':
        return (
          <AdminMarketingTab
            coupons={coupons}
            onSaveCoupons={handleSaveCoupons}
            userRole={user?.role}
          />
        );
      case 'integrations':
        return (
          <AdminIntegrationsTab
            gateways={gateways}
            onSaveGateways={handleSaveGateways}
            metaConfig={metaConfig}
            onSaveMetaConfig={handleSaveMetaConfig}
            googleConfig={googleConfig}
            onSaveGoogleConfig={handleSaveGoogleConfig}
            socialChannels={socialChannels}
            onSaveSocialChannels={handleSaveSocialChannels}
            socialMessages={socialMessages}
            onSaveSocialMessages={handleSaveSocialMessages}
            trackingLogs={trackingLogs}
            onSaveTrackingLogs={handleSaveTrackingLogs}
            userRole={user?.role}
          />
        );
      case 'customers':
        return (
          <AdminCustomersTab
            userLogins={userLogins}
            onSaveUserLogins={handleSaveUserLogins}
            userRole={user?.role}
          />
        );
      default:
        return (
          <AdminDashboardTab 
            vendors={vendors} 
            rfqs={rfqs} 
            credits={credits} 
            orders={orders}
            products={products}
            onTabChange={handleTabChange} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-300">
      
      {/* Admin Sidebar Navigation */}
      <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Workspace Panels Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderWorkspace()}
        </div>
      </main>

    </div>
  );
}
