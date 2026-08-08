'use client';

import React, { useState } from 'react';
import { PaymentGatewayConfig, MetaPixelConfig, TrackingEventLog, calculatePgSurcharge, GoogleMarketingConfig, SocialChannelConfig, SocialMessageLog, getSocialLinks, saveSocialLinks, SocialMediaLinks, WebhookEndpointConfig, WebhookLogEntry, getWebhooks, saveWebhooks } from '../../utils/adminMockData';
import { CreditCard, Cpu, ShieldAlert, Sparkles, Check, Send, AlertTriangle, Layers, Save, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle, Share2, Truck, Box, PackageCheck, Search, Loader2, Webhook, Copy, Radio, Terminal, ExternalLink } from 'lucide-react';
import { getShiprocketToken, createShiprocketOrder, generateShiprocketAWB, trackShiprocketOrder } from '../../lib/shiprocket';

interface AdminIntegrationsTabProps {
  gateways: PaymentGatewayConfig[];
  onSaveGateways: (updatedGateways: PaymentGatewayConfig[]) => void;
  metaConfig: MetaPixelConfig;
  onSaveMetaConfig: (updatedConfig: MetaPixelConfig) => void;
  googleConfig: GoogleMarketingConfig;
  onSaveGoogleConfig: (updatedConfig: GoogleMarketingConfig) => void;
  socialChannels: SocialChannelConfig[];
  onSaveSocialChannels: (updatedConfig: SocialChannelConfig[]) => void;
  socialMessages: SocialMessageLog[];
  onSaveSocialMessages: (updatedLogs: SocialMessageLog[]) => void;
  trackingLogs: TrackingEventLog[];
  onSaveTrackingLogs: (updatedLogs: TrackingEventLog[]) => void;
  userRole?: string;
}

export const AdminIntegrationsTab: React.FC<AdminIntegrationsTabProps> = ({
  gateways,
  onSaveGateways,
  metaConfig,
  onSaveMetaConfig,
  googleConfig,
  onSaveGoogleConfig,
  socialChannels,
  onSaveSocialChannels,
  socialMessages,
  onSaveSocialMessages,
  trackingLogs,
  onSaveTrackingLogs,
  userRole
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'gateways' | 'meta' | 'google' | 'social' | 'shiprocket' | 'webhooks'>('gateways');
  const [successMsg, setSuccessMsg] = useState('');
  const isReadOnly = userRole === 'employee';

  // Webhook Manager states
  const [webhooksList, setWebhooksList] = useState<WebhookEndpointConfig[]>(() => getWebhooks());
  const [webhookLogs, setWebhookLogs] = useState<WebhookLogEntry[]>([
    {
      id: 'wh-log-101',
      webhookId: 'wh-shiprocket-1',
      provider: 'Shiprocket',
      event: 'order.shipped',
      payloadSnippet: '{"order_id": "ABUZZ-ORD-1094", "awb": "SR9284719284", "current_status": "Shipped"}',
      httpStatus: 200,
      timestamp: new Date().toISOString()
    },
    {
      id: 'wh-log-102',
      webhookId: 'wh-shiprocket-1',
      provider: 'Shiprocket',
      event: 'order.out_for_delivery',
      payloadSnippet: '{"order_id": "ABUZZ-ORD-1094", "awb": "SR9284719284", "current_status": "Out for Delivery"}',
      httpStatus: 200,
      timestamp: new Date(Date.now() - 1800000).toISOString()
    }
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testingWebhookId, setTestingWebhookId] = useState<string | null>(null);

  const handleToggleWebhook = (id: string) => {
    if (isReadOnly) return;
    const updated = webhooksList.map(w => w.id === id ? { ...w, isEnabled: !w.isEnabled } : w);
    setWebhooksList(updated);
    saveWebhooks(updated);
  };

  const handleSimulateWebhookEvent = async (webhook: WebhookEndpointConfig, eventName: string) => {
    setTestingWebhookId(webhook.id);
    try {
      const mockPayload = {
        order_id: 'ABUZZ-ORD-1094',
        awb: 'SR9284719284',
        current_status: eventName.replace('order.', '').toUpperCase(),
        courier_name: 'Blue Dart Express',
        etd: '2026-08-04',
        scans: [
          { current_status: eventName, location: 'Pune MIDC Hub', date: new Date().toISOString() }
        ]
      };

      const res = await fetch(webhook.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-shiprocket-token': webhook.secretToken
        },
        body: JSON.stringify(mockPayload)
      });

      const data = await res.json();
      const newLog: WebhookLogEntry = {
        id: `wh-log-${Math.floor(1000 + Math.random() * 9000)}`,
        webhookId: webhook.id,
        provider: webhook.provider,
        event: eventName,
        payloadSnippet: JSON.stringify(mockPayload),
        httpStatus: res.status,
        timestamp: new Date().toISOString()
      };

      setWebhookLogs(prev => [newLog, ...prev]);
      setSuccessMsg(`Webhook Event [${eventName}] dispatched to ${webhook.endpointUrl}! (HTTP ${res.status})`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setSuccessMsg(`Webhook Error: ${err.message}`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } finally {
      setTestingWebhookId(null);
    }
  };

  // Shiprocket API States
  const [srEmail, setSrEmail] = useState('abuzzsellerss@gmail.com');
  const [srPassword, setSrPassword] = useState('Shiprocket@2026');
  const [srPickupLoc, setSrPickupLoc] = useState('PUNE_WAREHOUSE_01');
  const [srTestingToken, setSrTestingToken] = useState(false);
  const [srTokenStatus, setSrTokenStatus] = useState<string | null>(null);

  // Shiprocket Quick AWB Dispatch Tester states
  const [srTestOrderId, setSrTestOrderId] = useState('ABUZZ-ORD-1094');
  const [srTestWeight, setSrTestWeight] = useState(2.5);
  const [srDispatching, setSrDispatching] = useState(false);
  const [srDispatchResult, setSrDispatchResult] = useState<any>(null);

  // Shiprocket Live AWB Tracking states
  const [srTrackAwb, setSrTrackAwb] = useState('SR9284719284');
  const [srTrackingData, setSrTrackingData] = useState<any>(null);
  const [srTrackingLoading, setSrTrackingLoading] = useState(false);

  const handleTestShiprocketAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSrTestingToken(true);
    setSrTokenStatus(null);
    try {
      const token = await getShiprocketToken();
      if (token) {
        setSrTokenStatus(`Connected & Authorized! Active Bearer Token acquired (${token.slice(0, 15)}...)`);
      } else {
        setSrTokenStatus('Failed to acquire token. Please verify email & password.');
      }
    } catch (err: any) {
      setSrTokenStatus(`Error connecting to Shiprocket: ${err.message}`);
    } finally {
      setSrTestingToken(false);
    }
  };

  const handleTestShiprocketDispatch = async () => {
    setSrDispatching(true);
    setSrDispatchResult(null);
    try {
      const orderPayload = {
        order_id: srTestOrderId,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: srPickupLoc,
        billing_customer_name: 'Manish Yadav',
        billing_address: 'Plot 45, MIDC Industrial Area',
        billing_city: 'Pune',
        billing_pincode: '411019',
        billing_state: 'Maharashtra',
        billing_country: 'India',
        billing_email: 'manishyadav991@gmail.com',
        billing_phone: '9876543210',
        shipping_is_billing: true,
        order_items: [
          { name: 'DeWalt Cordless Impact Drill 18V', sku: 'AZ-DEW-18V', units: 1, selling_price: 7999, hsn: '8467' }
        ],
        payment_method: 'Prepaid' as const,
        sub_total: 7999,
        length: 30, breadth: 20, height: 15,
        weight: srTestWeight
      };

      const created = await createShiprocketOrder(orderPayload);
      const awb = await generateShiprocketAWB(created.shipment_id || 1004523);
      setSrDispatchResult({ created, awb });
      setSrTrackAwb(awb?.response?.data?.awb_code || created.awb_code || 'SR9284719284');
    } catch (err: any) {
      setSrDispatchResult({ error: err.message || 'Failed to dispatch shipment' });
    } finally {
      setSrDispatching(false);
    }
  };

  const handleTrackShiprocketAwb = async () => {
    if (!srTrackAwb) return;
    setSrTrackingLoading(true);
    setSrTrackingData(null);
    try {
      const data = await trackShiprocketOrder(srTrackAwb);
      setSrTrackingData(data?.tracking_data || data);
    } catch (err: any) {
      setSrTrackingData({ error: err.message || 'Failed to fetch tracking telemetry' });
    } finally {
      setSrTrackingLoading(false);
    }
  };

  // Selected Payment Gateway for settings form
  const safeGateways = Array.isArray(gateways) ? gateways : [];
  const [selectedGatewayId, setSelectedGatewayId] = useState(safeGateways[0]?.id || 'razorpay');
  const activeGateway = safeGateways.find(g => g.id === selectedGatewayId) || safeGateways[0];

  // Forms states with safe fallbacks
  const [apiKeyId, setApiKeyId] = useState(activeGateway?.apiKeyId || '');
  const [apiSecret, setApiSecret] = useState(activeGateway?.apiSecret || '');
  const [webhookUrl, setWebhookUrl] = useState(activeGateway?.webhookUrl || '');
  const [surchargePercent, setSurchargePercent] = useState(activeGateway?.surchargePercent || 0);
  const [settlementDays, setSettlementDays] = useState(activeGateway?.settlementDays || 0);

  // Meta configs states
  const [pixelId, setPixelId] = useState(metaConfig?.pixelId || '');
  const [adAccountId, setAdAccountId] = useState(metaConfig?.adAccountId || 'act_982736154091');
  const [businessManagerId, setBusinessManagerId] = useState(metaConfig?.businessManagerId || 'bm_1029384756');
  const [capiToken, setCapiToken] = useState(metaConfig?.capiToken || '');
  const [testEventCode, setTestEventCode] = useState(metaConfig?.testEventCode || '');
  const [isMetaActive, setIsMetaActive] = useState(metaConfig?.isActive || false);

  // Social configs states
  const safeSocialChannels = Array.isArray(socialChannels) ? socialChannels : [];
  const [waNumber, setWaNumber] = useState(safeSocialChannels.find(c => c.id === 'whatsapp')?.phoneNumber || '');
  const [waToken, setWaToken] = useState(safeSocialChannels.find(c => c.id === 'whatsapp')?.accessToken || '');
  const [fbPageToken, setFbPageToken] = useState(safeSocialChannels.find(c => c.id === 'messenger')?.accessToken || '');
  const [igPageId, setIgPageId] = useState(safeSocialChannels.find(c => c.id === 'instagram')?.instaPageId || '');
  const [isWaActive, setIsWaActive] = useState(safeSocialChannels.find(c => c.id === 'whatsapp')?.isEnabled || false);
  const [isFbActive, setIsFbActive] = useState(safeSocialChannels.find(c => c.id === 'messenger')?.isEnabled || false);
  const [isIgActive, setIsIgActive] = useState(safeSocialChannels.find(c => c.id === 'instagram')?.isEnabled || false);

  // Google configs states
  const [googleTagId, setGoogleTagId] = useState(googleConfig?.tagId || '');
  const [googleLabel, setGoogleLabel] = useState(googleConfig?.conversionLabel || '');
  const [googleRemarketing, setGoogleRemarketing] = useState(googleConfig?.remarketingEnabled || false);
  const [isGoogleActive, setIsGoogleActive] = useState(googleConfig?.isActive || false);

  // PG tester states
  const [testAmount, setTestAmount] = useState(5000);

  // Reset PG inputs when selected gateway or activeGateway changes
  React.useEffect(() => {
    if (activeGateway) {
      setApiKeyId(activeGateway.apiKeyId || '');
      setApiSecret(activeGateway.apiSecret || '');
      setWebhookUrl(activeGateway.webhookUrl || '');
      setSurchargePercent(activeGateway.surchargePercent || 0);
      setSettlementDays(activeGateway.settlementDays || 0);
    }
  }, [selectedGatewayId, activeGateway]);

  const handleSaveGatewaySettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = safeGateways.map(g => 
      g.id === selectedGatewayId 
        ? { ...g, apiKeyId, apiSecret, webhookUrl, surchargePercent, settlementDays } 
        : g
    );
    onSaveGateways(updated);
    setSuccessMsg(`${activeGateway?.name || 'Gateway'} configurations updated successfully!`);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Social Links state
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>(() => getSocialLinks());

  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;
    saveSocialLinks(socialLinks);
    setSuccessMsg('Website Social Media Links updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleToggleGateway = (id: string, prop: 'isActive' | 'isSandbox') => {
    const updated = gateways.map(g => 
      g.id === id ? { ...g, [prop]: !g[prop] } : g
    );
    onSaveGateways(updated);
  };

  const handleSaveMetaSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: MetaPixelConfig = {
      pixelId,
      adAccountId,
      businessManagerId,
      capiToken,
      testEventCode,
      isActive: isMetaActive
    };
    onSaveMetaConfig(updated);
    setSuccessMsg('Meta Pixel, Ad Account & CAPI configurations updated successfully!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleSaveGoogleSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GoogleMarketingConfig = {
      tagId: googleTagId,
      conversionLabel: googleLabel,
      remarketingEnabled: googleRemarketing,
      isActive: isGoogleActive
    };
    onSaveGoogleConfig(updated);
    setSuccessMsg('Google Marketing configuration updated successfully!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleSaveSocialSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SocialChannelConfig[] = [
      { id: 'whatsapp', name: 'WhatsApp Business API', isEnabled: isWaActive, phoneNumber: waNumber, accessToken: waToken },
      { id: 'messenger', name: 'Facebook Messenger API', isEnabled: isFbActive, accessToken: fbPageToken },
      { id: 'instagram', name: 'Instagram Shop Sync', isEnabled: isIgActive, instaPageId: igPageId }
    ];
    onSaveSocialChannels(updated);
    setSuccessMsg('Social Channel configurations updated successfully!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleSimulateSocialMessage = (sender: string, channel: 'WhatsApp' | 'Messenger' | 'Instagram', text: string) => {
    const isChannelEnabled = 
      channel === 'WhatsApp' ? isWaActive :
      channel === 'Messenger' ? isFbActive :
      isIgActive;
      
    if (!isChannelEnabled) {
      setSuccessMsg(`Error: ${channel} integration is currently disabled.`);
      setTimeout(() => setSuccessMsg(''), 2500);
      return;
    }

    const newMessage: SocialMessageLog = {
      id: `soc_${Math.floor(100000 + Math.random() * 900000)}`,
      sender,
      channel,
      messageText: text,
      timestamp: new Date().toISOString()
    };

    onSaveSocialMessages([newMessage, ...socialMessages]);
    setSuccessMsg(`Simulated incoming ${channel} inquiry dispatched!`);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Simulate Google tag conversion events dispatch
  const handleSimulateGoogleEvent = (eventName: string, channel: 'Google Tag (Gtag)' | 'Google Ads') => {
    if (!isGoogleActive) {
      setSuccessMsg('Error: Google tracking is currently disabled.');
      setTimeout(() => setSuccessMsg(''), 2500);
      return;
    }

    let payload = {};
    const matchQuality = 95;
    
    if (eventName === 'page_view') {
      payload = { send_to: googleTagId, page_path: '/products/dewalt-cordless-drill', page_title: 'DeWalt Cordless Drill' };
    } else if (eventName === 'add_to_cart') {
      payload = { send_to: googleTagId, items: [{ item_id: 'DEW-DCD-777', item_name: 'DeWalt Cordless Drill', price: 7999, quantity: 1 }] };
    } else if (eventName === 'purchase') {
      payload = { send_to: `${googleTagId}/${googleLabel}`, transaction_id: `aw_tx_${Math.floor(10000 + Math.random() * 90000)}`, value: 7999, currency: 'INR' };
    }

    const newEvent: TrackingEventLog = {
      id: `gtag_${Math.floor(10000000 + Math.random() * 90000000)}`,
      eventName,
      timestamp: new Date().toISOString(),
      channel,
      matchQuality,
      payload: JSON.stringify(payload)
    };

    onSaveTrackingLogs([newEvent, ...trackingLogs]);
    setSuccessMsg(`Simulated Google Tag ${eventName} event dispatched successfully!`);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  // Simulate FB tracking conversion events dispatch
  const handleSimulateMetaEvent = (eventName: string, channel: 'Browser Pixel' | 'Conversions API') => {
    if (!isMetaActive) {
      setSuccessMsg('Error: Meta tracking is currently disabled.');
      setTimeout(() => setSuccessMsg(''), 2500);
      return;
    }

    let payload = {};
    const matchQuality = channel === 'Conversions API' ? 98 : 91;
    
    if (eventName === 'PageView') {
      payload = { url: 'https://abuzz.com/products/dewalt-cordless-drill', userAgent: 'Mozilla/5.0 (Windows NT 10.0)' };
    } else if (eventName === 'AddToCart') {
      payload = { content_name: 'DeWalt Cordless Drill', value: 7999, currency: 'INR', content_type: 'product' };
    } else if (eventName === 'Purchase') {
      payload = { content_ids: ['DEW-DCD-777'], value: 7999, currency: 'INR', transaction_id: `tx_${Math.floor(10000 + Math.random() * 90000)}` };
    }

    const newEvent: TrackingEventLog = {
      id: `evt_${Math.floor(10000000 + Math.random() * 90000000)}`,
      eventName,
      timestamp: new Date().toISOString(),
      channel,
      matchQuality,
      payload: JSON.stringify(payload)
    };

    onSaveTrackingLogs([newEvent, ...trackingLogs]);
    setSuccessMsg(`Simulated Meta ${eventName} dispatched over ${channel}!`);
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const simulatedSurcharge = calculatePgSurcharge(testAmount, surchargePercent);
  const totalChargeWithFee = testAmount + simulatedSurcharge;

  return (
    <div className="space-y-6 text-xs text-foreground font-sans relative">
      
      {isReadOnly && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center gap-2 font-sans text-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
          <div>
            <strong>Read-only Workspace Access</strong>
            <p className="text-[10px] text-amber-500/80 mt-0.5">Your employee account permits reading configurations only. Admin permissions are required to modify API configurations.</p>
          </div>
        </div>
      )}
      
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-4 inset-x-6 z-50 p-3 rounded-xl bg-primary text-white text-center font-bold flex items-center justify-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-3">
          <Sparkles className="h-4.5 w-4.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-foreground tracking-tight">API & Integrations Console</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Configure transaction gateways credentials, adjust merchant surcharges, and audit Conversion API tracking logs.</p>
      </div>

      {/* Sub-tab selection row */}
      <div className="flex border-b border-border/40 pb-px">
        <button
          onClick={() => setActiveSubTab('gateways')}
          className={`px-6 py-3 font-bold border-b-2 transition-all cursor-pointer text-xs ${
            activeSubTab === 'gateways' ? 'border-primary text-primary font-black' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Payment Gateways (Razorpay / Cashfree)
        </button>
        <button
          onClick={() => setActiveSubTab('meta')}
          className={`px-6 py-3 font-bold border-b-2 transition-all cursor-pointer text-xs ${
            activeSubTab === 'meta' ? 'border-primary text-primary font-black' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Facebook Pixel & CAPI Conversions
        </button>
        <button
          onClick={() => setActiveSubTab('google')}
          className={`px-6 py-3 font-bold border-b-2 transition-all cursor-pointer text-xs ${
            activeSubTab === 'google' ? 'border-primary text-primary font-black' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Google Tag & Ads Tracking
        </button>
        <button
          onClick={() => setActiveSubTab('social')}
          className={`px-6 py-3 font-bold border-b-2 transition-all cursor-pointer text-xs ${
            activeSubTab === 'social' ? 'border-primary text-primary font-black' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Social Media Feeds
        </button>
        <button
          onClick={() => setActiveSubTab('shiprocket')}
          className={`px-6 py-3 font-bold border-b-2 transition-all cursor-pointer text-xs ${
            activeSubTab === 'shiprocket' ? 'border-primary text-primary font-black' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          🚚 Shiprocket Shipping API
        </button>
        <button
          onClick={() => setActiveSubTab('webhooks')}
          className={`px-6 py-3 font-bold border-b-2 transition-all cursor-pointer text-xs ${
            activeSubTab === 'webhooks' ? 'border-primary text-primary font-black' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          ⚡ Real-Time Webhooks
        </button>
      </div>

      {/* Tab Panel contents switcher */}
      {activeSubTab === 'gateways' ? (
        
        /* Payment Gateways View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Gateways directory list */}
          <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="h-4.5 w-4.5 text-primary" /> Gateway Providers
            </h3>

            <div className="space-y-3">
              {gateways.map((g) => {
                const isSelected = selectedGatewayId === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGatewayId(g.id)}
                    className={`w-full p-4 rounded-2xl border transition-all flex flex-col gap-2.5 cursor-pointer ${
                      isSelected 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                        : 'border-border/60 hover:bg-foreground/5 bg-background/25'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-foreground">{g.name}</span>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                        g.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-foreground/10 text-muted-foreground'
                      }`}>
                        {g.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                      <span>Surcharge: {g.surchargePercent}%</span>
                      <span>Settlement: T+{g.settlementDays}</span>
                    </div>

                    <div className="flex justify-between border-t border-border/20 pt-2 text-[9px] font-sans">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleToggleGateway(g.id, 'isActive'); }}
                        className="text-primary font-bold hover:underline"
                      >
                        {g.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleToggleGateway(g.id, 'isSandbox'); }}
                        className="text-muted-foreground font-bold hover:underline"
                      >
                        {g.isSandbox ? 'Live Mode' : 'Sandbox Mode'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Config form & PG surcharge simulator */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Config Form */}
            <form onSubmit={handleSaveGatewaySettings} className="bg-card border border-border rounded-3xl p-6 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
                {activeGateway.name} Credentials Settings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">API Key ID / Username</label>
                  <input
                    type="text"
                    required
                    value={apiKeyId}
                    onChange={(e) => setApiKeyId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">API Secret / Password</label>
                  <input
                    type="text"
                    required
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Webhook URL Endpoint</label>
                  <input
                    type="url"
                    required
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono text-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Gateway Transaction Surcharge (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={surchargePercent}
                    onChange={(e) => setSurchargePercent(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Settlement Cycle delay (Days)</label>
                  <input
                    type="number"
                    required
                    value={settlementDays}
                    onChange={(e) => setSettlementDays(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-border/40 pt-4">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  {activeGateway.isSandbox ? (
                    <>
                      <AlertTriangle className="h-4 w-4" />
                      <span>Sandbox test credentials active. No live transactions processed.</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-emerald-500">Live operational credentials active.</span>
                    </>
                  )}
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all cursor-pointer min-h-[44px]"
                >
                  <Save className="h-4.5 w-4.5" /> Save Gateways API Config
                </button>
              </div>

            </form>

            {/* Surcharge Simulator */}
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
                Transaction Surcharge Margin Calculator
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="sm:col-span-1">
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Simulate Order Value (₹)</label>
                  <input
                    type="number"
                    value={testAmount}
                    onChange={(e) => setTestAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5"
                  />
                </div>
                
                <div className="sm:col-span-2 p-4 rounded-2xl bg-foreground/5 border border-border/40 flex flex-col sm:flex-row justify-between gap-4 font-sans text-xs">
                  <div>
                    <span className="text-muted-foreground block">PG Merchant Surcharge ({surchargePercent}%)</span>
                    <strong className="text-red-500 font-black text-sm block mt-0.5">₹{simulatedSurcharge.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Estimated Net Settlement Payout</span>
                    <strong className="text-emerald-500 font-black text-sm block mt-0.5">₹{testAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Total charged with fees</span>
                    <strong className="text-primary font-black text-sm block mt-0.5">₹{totalChargeWithFee.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      ) : activeSubTab === 'meta' ? (
        
        /* Facebook Marketing view */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          
          {/* Settings Config */}
          <div className="lg:col-span-1 space-y-6">
            <form onSubmit={handleSaveMetaSettings} className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="h-4.5 w-4.5 text-primary" /> Meta Pixel & CAPI Settings
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Meta Pixel ID</label>
                  <input
                    type="text"
                    required
                    disabled={isReadOnly}
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    placeholder="e.g. 877261159822345"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Facebook Ad Account ID (act_XXXXXX)</label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={adAccountId}
                    onChange={(e) => setAdAccountId(e.target.value)}
                    placeholder="act_982736154091"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Meta Business Manager ID</label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={businessManagerId}
                    onChange={(e) => setBusinessManagerId(e.target.value)}
                    placeholder="bm_1029384756"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Conversions API Token (CAPI)</label>
                  <textarea
                    required
                    disabled={isReadOnly}
                    value={capiToken}
                    onChange={(e) => setCapiToken(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 min-h-[90px] font-mono resize-none leading-relaxed text-[10px] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Test Event Code (Facebook Helper)</label>
                  <input
                    type="text"
                    required
                    disabled={isReadOnly}
                    value={testEventCode}
                    onChange={(e) => setTestEventCode(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono disabled:opacity-50"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tracking status:</span>
                  <button
                    type="button"
                    disabled={isReadOnly}
                    onClick={() => setIsMetaActive(!isMetaActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      isMetaActive ? 'bg-primary' : 'bg-foreground/15'
                    } ${isReadOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isMetaActive ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {!isReadOnly && (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary text-white font-bold transition-all min-h-[44px] cursor-pointer"
                  >
                    Save Meta Configuration
                  </button>
                )}
              </div>

            </form>

            {/* Test dispatch actions */}
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
                Simulate Conversion Events
              </h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Manually fire mock e-commerce pixels to Facebook Conversions API and verify event triggers logs.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleSimulateMetaEvent('PageView', 'Browser Pixel')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Dispatches PageView Event</span>
                  <span className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-sans uppercase">Browser Pixel</span>
                </button>
                <button
                  onClick={() => handleSimulateMetaEvent('AddToCart', 'Browser Pixel')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Dispatches AddToCart Event</span>
                  <span className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-sans uppercase">Browser Pixel</span>
                </button>
                <button
                  onClick={() => handleSimulateMetaEvent('Purchase', 'Conversions API')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary font-bold transition-colors cursor-pointer min-h-[44px] border border-primary/20"
                >
                  <span>Dispatches Purchase Event</span>
                  <span className="text-[9px] text-white bg-primary px-2 py-0.5 rounded-full font-sans uppercase">Meta CAPI</span>
                </button>
              </div>
            </div>

          </div>

          {/* Audit events list */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-primary" /> Live Meta Conversion Events Audit Log
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-foreground/5 text-muted-foreground border-b border-border/40 font-bold uppercase tracking-wider">
                    <th className="p-3">Event Name</th>
                    <th className="p-3">Transport Stream</th>
                    <th className="p-3 text-center">Match Quality</th>
                    <th className="p-3">Event Parameters Payload</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 font-sans">
                  {trackingLogs.filter(l => l.channel.includes('Pixel') || l.channel.includes('CAPI')).map((log) => (
                    <tr key={log.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3">
                        <strong className="text-foreground font-bold">{log.eventName}</strong>
                        <span className="block text-[8px] text-muted-foreground font-mono mt-0.5">ID: {log.id}</span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[8px] ${
                          log.channel === 'Conversions API' ? 'bg-primary/20 text-primary' : 'bg-foreground/10 text-muted-foreground'
                        }`}>
                          {log.channel}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`font-bold text-[10px] ${
                          log.matchQuality >= 95 ? 'text-emerald-500' : 'text-amber-500'
                        }`}>
                          {log.matchQuality}%
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[9px] max-w-[200px] truncate" title={log.payload}>
                        {log.payload}
                      </td>
                      <td className="p-3 text-muted-foreground text-[10px] font-mono">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      ) : activeSubTab === 'google' ? (
        
        /* Google Marketing sub-panel view */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          
          {/* Settings Config */}
          <div className="lg:col-span-1 space-y-6">
            <form onSubmit={handleSaveGoogleSettings} className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="h-4.5 w-4.5 text-primary" /> Google Tag & Ads Tracking Config
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Google Tag ID (G- / AW-)</label>
                  <input
                    type="text"
                    required
                    disabled={isReadOnly}
                    value={googleTagId}
                    onChange={(e) => setGoogleTagId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono disabled:opacity-50"
                    placeholder="e.g. AW-98726154"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Google Ads Conversion Label</label>
                  <input
                    type="text"
                    required
                    disabled={isReadOnly}
                    value={googleLabel}
                    onChange={(e) => setGoogleLabel(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 font-mono disabled:opacity-50"
                    placeholder="e.g. aw_conv_purchase_101"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Remarketing tags:</span>
                  <button
                    type="button"
                    disabled={isReadOnly}
                    onClick={() => setGoogleRemarketing(!googleRemarketing)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      googleRemarketing ? 'bg-primary' : 'bg-foreground/15'
                    } ${isReadOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      googleRemarketing ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tracking status:</span>
                  <button
                    type="button"
                    disabled={isReadOnly}
                    onClick={() => setIsGoogleActive(!isGoogleActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      isGoogleActive ? 'bg-primary' : 'bg-foreground/15'
                    } ${isReadOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isGoogleActive ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {!isReadOnly && (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary text-white font-bold transition-all min-h-[44px] cursor-pointer"
                  >
                    Save Google Configuration
                  </button>
                )}
              </div>

            </form>

            {/* Test dispatch actions */}
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
                Simulate Google Tag Dispatches
              </h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Fire mock global site tags (gtag) or ads conversions directly to verify telemetry outputs.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleSimulateGoogleEvent('page_view', 'Google Tag (Gtag)')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Dispatches page_view (Gtag)</span>
                  <span className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-sans uppercase">Gtag</span>
                </button>
                <button
                  onClick={() => handleSimulateGoogleEvent('add_to_cart', 'Google Tag (Gtag)')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Dispatches add_to_cart (Gtag)</span>
                  <span className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-sans uppercase">Gtag</span>
                </button>
                <button
                  onClick={() => handleSimulateGoogleEvent('purchase', 'Google Ads')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary font-bold transition-colors cursor-pointer min-h-[44px] border border-primary/20"
                >
                  <span>Dispatches purchase event</span>
                  <span className="text-[9px] text-white bg-primary px-2 py-0.5 rounded-full font-sans uppercase">Google Ads</span>
                </button>
              </div>
            </div>

          </div>

          {/* Audit events list */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-primary" /> Live Google Conversion Events Audit Log
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-foreground/5 text-muted-foreground border-b border-border/40 font-bold uppercase tracking-wider">
                    <th className="p-3">Event Name</th>
                    <th className="p-3">Transport Stream</th>
                    <th className="p-3 text-center">Match Quality</th>
                    <th className="p-3">Event Parameters Payload</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 font-sans">
                  {trackingLogs.filter(l => l.channel.includes('Gtag') || l.channel.includes('Google')).map((log) => (
                    <tr key={log.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3">
                        <strong className="text-foreground font-bold">{log.eventName}</strong>
                        <span className="block text-[8px] text-muted-foreground font-mono mt-0.5">ID: {log.id}</span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[8px] ${
                          log.channel === 'Google Ads' ? 'bg-primary/20 text-primary' : 'bg-foreground/10 text-muted-foreground'
                        }`}>
                          {log.channel}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`font-bold text-[10px] ${
                          log.matchQuality >= 95 ? 'text-emerald-500' : 'text-amber-500'
                        }`}>
                          {log.matchQuality}%
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[9px] max-w-[200px] truncate" title={log.payload}>
                        {log.payload}
                      </td>
                      <td className="p-3 text-muted-foreground text-[10px] font-mono">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      ) : activeSubTab === 'social' ? (
        
        /* Social Media sub-panel view */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
          
          {/* Settings Config */}
          <div className="lg:col-span-1 space-y-6">
            <form onSubmit={handleSaveSocialSettings} className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="h-4.5 w-4.5 text-primary" /> Social Channels Integrations
              </h3>

              <div className="space-y-4">
                {/* WhatsApp */}
                <div className="border-b border-border/40 pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">WhatsApp Business API</span>
                    <button
                      type="button"
                      disabled={isReadOnly}
                      onClick={() => setIsWaActive(!isWaActive)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        isWaActive ? 'bg-primary' : 'bg-foreground/15'
                      } ${isReadOnly ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                        isWaActive ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-0.5">WhatsApp Phone Number</label>
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background/50 px-2.5 py-1.5 font-mono text-[10px] disabled:opacity-50"
                      placeholder="+91 99999 88888"
                    />
                  </div>
                </div>

                {/* Facebook Messenger */}
                <div className="border-b border-border/40 pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">Messenger API</span>
                    <button
                      type="button"
                      disabled={isReadOnly}
                      onClick={() => setIsFbActive(!isFbActive)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        isFbActive ? 'bg-primary' : 'bg-foreground/15'
                      } ${isReadOnly ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                        isFbActive ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Instagram Shop Sync */}
                <div className="pb-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">Instagram Shop Feed</span>
                    <button
                      type="button"
                      disabled={isReadOnly}
                      onClick={() => setIsIgActive(!isIgActive)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        isIgActive ? 'bg-primary' : 'bg-foreground/15'
                      } ${isReadOnly ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                        isIgActive ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-muted-foreground uppercase mb-0.5">Instagram Username handle</label>
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={igPageId}
                      onChange={(e) => setIgPageId(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background/50 px-2.5 py-1.5 font-mono text-[10px] disabled:opacity-50"
                      placeholder="abuzz_hardware"
                    />
                  </div>
                </div>
              </div>

              {!isReadOnly && (
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary text-white font-bold transition-all min-h-[44px] cursor-pointer shadow-md shadow-primary/20"
                >
                  <Save className="h-4 w-4" /> Save Social Settings
                </button>
              )}
            </form>

            {/* Website Social Links & Handles Form */}
            <form onSubmit={handleSaveSocialLinks} className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="h-4.5 w-4.5 text-primary" /> Storefront Social Links & Handles
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <Facebook className="h-3 w-3 text-blue-600" /> Facebook
                  </label>
                  <input
                    type="url"
                    disabled={isReadOnly}
                    value={socialLinks.facebook}
                    onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <Twitter className="h-3 w-3 text-sky-500" /> Twitter / X
                  </label>
                  <input
                    type="url"
                    disabled={isReadOnly}
                    value={socialLinks.twitter}
                    onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <Instagram className="h-3 w-3 text-pink-500" /> Instagram
                  </label>
                  <input
                    type="url"
                    disabled={isReadOnly}
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <Linkedin className="h-3 w-3 text-blue-700" /> LinkedIn
                  </label>
                  <input
                    type="url"
                    disabled={isReadOnly}
                    value={socialLinks.linkedin}
                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <Youtube className="h-3 w-3 text-rose-600" /> YouTube
                  </label>
                  <input
                    type="url"
                    disabled={isReadOnly}
                    value={socialLinks.youtube}
                    onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 text-emerald-500" /> WhatsApp
                  </label>
                  <input
                    type="url"
                    disabled={isReadOnly}
                    value={socialLinks.whatsapp}
                    onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none min-h-[38px] disabled:opacity-50"
                  />
                </div>

                {!isReadOnly && (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary text-white font-bold transition-all min-h-[44px] cursor-pointer shadow-md shadow-primary/20"
                  >
                    <Save className="h-4 w-4" /> Save Storefront Links
                  </button>
                )}
              </div>
            </form>

            {/* Simulated Live message trigger */}
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
                Simulate Customer Chats
              </h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Trigger mock inbound developer inquiries to check live social channels routing.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleSimulateSocialMessage('L&T Procurement (Amritsar)', 'WhatsApp', 'Need immediate shipment of 300 DeWalt drills. Please counter price!')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Inquiry on WhatsApp</span>
                  <span className="text-[9px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-sans uppercase">WhatsApp</span>
                </button>
                <button
                  onClick={() => handleSimulateSocialMessage('Shree Fasteners (Indore)', 'Instagram', 'Can you dispatch samples for Grade 8.8 hex bolts?')}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-foreground/5 font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Inquiry on Instagram</span>
                  <span className="text-[9px] text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-full font-sans uppercase">Instagram</span>
                </button>
              </div>
            </div>

          </div>

          {/* Messages feed */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-primary" /> Live Social Messages Stream
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-foreground/5 text-muted-foreground border-b border-border/40 font-bold uppercase tracking-wider">
                    <th className="p-3">Sender Contact</th>
                    <th className="p-3">Integration Channel</th>
                    <th className="p-3">Incoming Message Content Inquiry</th>
                    <th className="p-3">Received Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 font-sans">
                  {socialMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3">
                        <strong className="text-foreground font-bold">{msg.sender}</strong>
                        <span className="block text-[8px] text-muted-foreground font-mono mt-0.5">ID: {msg.id}</span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[8px] ${
                          msg.channel === 'WhatsApp' ? 'bg-emerald-500/20 text-emerald-500' :
                          msg.channel === 'Instagram' ? 'bg-pink-500/20 text-pink-500' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {msg.channel}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-foreground text-[10.5px] max-w-[300px] leading-relaxed">
                        "{msg.messageText}"
                      </td>
                      <td className="p-3 text-muted-foreground text-[10px] font-mono">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      ) : activeSubTab === 'shiprocket' ? (
        /* Shiprocket Shipping & Fulfillment View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1: API Configuration & Live Status */}
          <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="h-4.5 w-4.5 text-primary" /> Shiprocket Credentials
              </h3>
              <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                v1 External API
              </span>
            </div>

            <form onSubmit={handleTestShiprocketAuth} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Shiprocket Account Email
                </label>
                <input
                  type="email"
                  value={srEmail}
                  onChange={(e) => setSrEmail(e.target.value)}
                  placeholder="abuzzsellerss@gmail.com"
                  required
                  className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground font-mono focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Shiprocket API Password
                </label>
                <input
                  type="password"
                  value={srPassword}
                  onChange={(e) => setSrPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground font-mono focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Default Pickup Warehouse ID
                </label>
                <input
                  type="text"
                  value={srPickupLoc}
                  onChange={(e) => setSrPickupLoc(e.target.value)}
                  placeholder="PUNE_WAREHOUSE_01"
                  className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground font-mono focus:border-primary outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={srTestingToken}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md shadow-primary/20 cursor-pointer"
              >
                {srTestingToken ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Save Credentials & Test API
                  </>
                )}
              </button>
            </form>

            {srTokenStatus && (
              <div className={`p-3.5 rounded-2xl text-xs font-medium border leading-relaxed ${
                srTokenStatus.includes('Connected') 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                  : 'bg-destructive/10 border-destructive/20 text-destructive'
              }`}>
                {srTokenStatus}
              </div>
            )}

            <div className="border-t border-border/40 pt-3 space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Supported Courier Aggregators
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded-lg bg-foreground/5 text-[9.5px] font-bold">Blue Dart Express</span>
                <span className="px-2 py-1 rounded-lg bg-foreground/5 text-[9.5px] font-bold">Delhivery Surface</span>
                <span className="px-2 py-1 rounded-lg bg-foreground/5 text-[9.5px] font-bold">DTDC Air</span>
                <span className="px-2 py-1 rounded-lg bg-foreground/5 text-[9.5px] font-bold">Xpressbees</span>
                <span className="px-2 py-1 rounded-lg bg-foreground/5 text-[9.5px] font-bold">Shadowfax</span>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Quick Dispatch & Live Tracking Telemetry */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shiprocket Quick Dispatch Tester */}
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Box className="h-4.5 w-4.5 text-primary" /> Shiprocket Adhoc Dispatch Tester
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">POST /orders/create/adhoc</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Store Order Reference ID
                  </label>
                  <input
                    type="text"
                    value={srTestOrderId}
                    onChange={(e) => setSrTestOrderId(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-xs text-foreground font-mono focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Package Gross Weight (KG)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={srTestWeight}
                    onChange={(e) => setSrTestWeight(parseFloat(e.target.value) || 1)}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-xs text-foreground font-mono focus:border-primary outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleTestShiprocketDispatch}
                disabled={srDispatching}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {srDispatching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <PackageCheck className="h-4 w-4" /> Push Order to Shiprocket & Generate AWB
                  </>
                )}
              </button>

              {srDispatchResult && (
                <div className="p-4 rounded-2xl bg-foreground/5 border border-border/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-primary tracking-wider block">
                    Shiprocket API Dispatch Result:
                  </span>
                  <pre className="text-[10.5px] font-mono text-muted-foreground bg-background p-3 rounded-xl overflow-x-auto max-h-40 border border-border/60">
                    {JSON.stringify(srDispatchResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Live AWB Tracking Telemetry Box */}
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="h-4.5 w-4.5 text-primary" /> Live AWB Tracking Telemetry
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">GET /courier/track/awb/</span>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter AWB Code (e.g. SR9284719284)..."
                  value={srTrackAwb}
                  onChange={(e) => setSrTrackAwb(e.target.value)}
                  className="flex-1 rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-xs text-foreground font-mono focus:border-primary outline-none"
                />
                <button
                  onClick={handleTrackShiprocketAwb}
                  disabled={srTrackingLoading}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-md shadow-primary/20"
                >
                  {srTrackingLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Track Shipment'}
                </button>
              </div>

              {srTrackingData && (
                <div className="p-4 rounded-2xl bg-background border border-border space-y-3">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="text-xs font-bold text-foreground">AWB: {srTrackAwb}</span>
                    <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase">
                      Status: Active Tracking
                    </span>
                  </div>

                  {srTrackingData.shipment_track && Array.isArray(srTrackingData.shipment_track) ? (
                    <div className="space-y-3 pt-1">
                      {srTrackingData.shipment_track.map((step: any, idx: number) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className={`h-3 w-3 rounded-full mt-0.5 shrink-0 ${idx === 0 ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-muted-foreground/40'}`} />
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-foreground block">{step.current_status}</span>
                            <span className="text-[10px] text-muted-foreground block">{step.activity} • <strong className="text-foreground">{step.location}</strong></span>
                            <span className="text-[9px] text-muted-foreground font-mono block">{new Date(step.date).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <pre className="text-[10.5px] font-mono text-muted-foreground bg-foreground/5 p-3 rounded-xl overflow-x-auto">
                      {JSON.stringify(srTrackingData, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      ) : (
        /* Real-Time Webhooks Manager View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Webhook Endpoints Directory */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Webhook className="h-4.5 w-4.5 text-primary" /> Webhook Endpoints
                </h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase">
                  HTTPS Active
                </span>
              </div>

              <div className="space-y-3">
                {webhooksList.map((wh) => (
                  <div key={wh.id} className="p-4 rounded-2xl bg-background/50 border border-border/80 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <strong className="text-foreground text-xs block">{wh.name}</strong>
                        <span className="text-[9px] font-bold uppercase text-primary mt-0.5 block">{wh.provider} Webhook</span>
                      </div>
                      <button
                        onClick={() => handleToggleWebhook(wh.id)}
                        disabled={isReadOnly}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                          wh.isEnabled ? 'bg-primary' : 'bg-foreground/15'
                        }`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                          wh.isEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {/* Endpoint URL with Copy Button */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-muted-foreground uppercase">Endpoint Callback URL</label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          readOnly
                          value={wh.endpointUrl}
                          className="flex-1 rounded-xl border border-border bg-background px-3 py-1.5 text-[10px] text-foreground font-mono"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(wh.endpointUrl);
                            setCopiedId(wh.id + '-url');
                            setTimeout(() => setCopiedId(null), 2000);
                          }}
                          className="p-1.5 rounded-xl border border-border bg-card hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                          title="Copy Endpoint URL"
                        >
                          {copiedId === wh.id + '-url' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Secret Token */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-bold text-muted-foreground uppercase">Security Token Secret</label>
                      <div className="flex gap-1.5">
                        <input
                          type="password"
                          readOnly
                          value={wh.secretToken}
                          className="flex-1 rounded-xl border border-border bg-background px-3 py-1.5 text-[10px] text-foreground font-mono"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(wh.secretToken);
                            setCopiedId(wh.id + '-secret');
                            setTimeout(() => setCopiedId(null), 2000);
                          }}
                          className="p-1.5 rounded-xl border border-border bg-card hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                          title="Copy Secret Token"
                        >
                          {copiedId === wh.id + '-secret' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Subscribed events list */}
                    <div className="space-y-1 pt-1 border-t border-border/40">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase block">Subscribed Milestones:</span>
                      <div className="flex flex-wrap gap-1">
                        {wh.subscribedEvents.map((evt, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[8.5px] font-mono font-bold">
                            {evt}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Simulation Action Buttons */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleSimulateWebhookEvent(wh, wh.subscribedEvents[0] || 'order.shipped')}
                        disabled={testingWebhookId === wh.id}
                        className="w-full py-2 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-primary/20"
                      >
                        {testingWebhookId === wh.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <>
                            <Radio className="h-3.5 w-3.5" /> Dispatch Test Event Payload
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Webhook Audit Log & Live Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm glass space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="h-4.5 w-4.5 text-primary" /> Live Webhook Delivery Logs
                </h3>
                <span className="text-[10px] text-muted-foreground font-mono">POST /api/webhooks/*</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border/60 bg-foreground/5 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-3">Event & Provider</th>
                      <th className="p-3">Payload Snippet</th>
                      <th className="p-3 text-center">HTTP Status</th>
                      <th className="p-3 text-right">Received Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 font-sans">
                    {webhookLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-foreground/5 transition-colors">
                        <td className="p-3">
                          <strong className="text-foreground block">{log.event}</strong>
                          <span className="text-[9px] font-bold uppercase text-primary block">{log.provider}</span>
                        </td>
                        <td className="p-3">
                          <code className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-1 rounded block max-w-xs truncate">
                            {log.payloadSnippet}
                          </code>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold font-mono text-[9px] ${
                            log.httpStatus === 200 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}>
                            HTTP {log.httpStatus}
                          </span>
                        </td>
                        <td className="p-3 text-right text-muted-foreground font-mono text-[10px]">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AdminIntegrationsTab;
