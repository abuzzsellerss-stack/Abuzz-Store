import { Product } from '../types';
import { MOCK_PRODUCTS } from './seed';
export { MOCK_PRODUCTS } from './seed';
import { formatImageUrl } from './imageHelper';

export interface AdminOrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  hsnCode?: string;
}

export interface AdminOrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  companyName?: string;
  gstin?: string;
  shippingAddress: string;
  city?: string;
  state?: string;
  pincode?: string;
  items: AdminOrderItem[];
  taxableSubtotal: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTax: number;
  freightAmount: number;
  discount?: number;
  totalAmount: number;
  paymentMode: 'PREPAID' | 'COD' | 'CREDIT_KHATA' | 'NEFT_RTGS';
  paymentStatus: 'paid' | 'pending' | 'partially_paid';
  orderStatus: 'pending' | 'processing' | 'ready_for_dispatch' | 'shipped' | 'delivered' | 'cancelled';
  carrier?: string;
  awbNumber?: string;
  ewayBillNumber?: string;
  requiresEwayBill?: boolean;
  serialNumbers?: string[];
  createdAt: string;
}


export interface HsnCodeMaster {
  code: string;
  category?: string;
  hsnCode?: string;
  cgst: number; // e.g. 9 for 9%
  sgst: number; // e.g. 9 for 9%
  igst: number; // e.g. 18 for 18%
  description: string;
}

export interface Vendor {
  id: string;
  name: string;
  originState: string; // e.g. "Punjab", "Gujarat"
  gstin: string;
  pan: string;
  status: 'active' | 'pending' | 'rejected';
  commissionRate: number; // e.g. 8 for 8%
  settlementCycle: 'T+3' | 'T+7' | 'T+15';
  documents: {
    gstinCert: boolean;
    panCard: boolean;
    cancelledCheque: boolean;
    msmeCert: boolean;
  };
}

export interface RfqNegotiation {
  id: string;
  companyName: string;
  gstin: string;
  contactPerson: string;
  email: string;
  phone: string;
  items: {
    productId: string;
    productTitle: string;
    quantity: number;
    targetPrice: number; // Customer requested unit price
    offeredPrice: number; // Admin counter-offered unit price
  }[];
  freightSurcharge: number;
  creditDays: number;
  status: 'pending_review' | 'counter_offered' | 'approved_by_client' | 'rejected' | 'converted_to_order';
  createdAt: string;
  validUntil: string;
}

export interface PinCodeServiceability {
  pincode: string;
  city: string;
  state: string;
  carrier: 'Blue Dart' | 'Delhivery' | 'Shadowfax' | 'Xpressbees';
  surcharge: number;
  codEnabled: boolean;
  rtoRiskScore: 'low' | 'medium' | 'high'; // high risk disables COD or flags verification
  isOdaZone: boolean; // Out of Delivery Area
}

export interface CorporateCreditProfile {
  id: string;
  companyName: string;
  creditLimit: number;
  outstandingBalance: number;
  availableCredit: number;
  netTermsDays: number;
  status: 'active' | 'suspended' | 'blocked';
  overdueAmount: number;
}

export interface OfflineBankReconciliation {
  id: string;
  utrNumber: string;
  amount: number;
  bankName: string;
  paymentDate: string;
  mappedCompanyId: string;
  mappedCompanyName: string;
  status: 'pending' | 'reconciled' | 'mismatched';
}

// ----------------------------------------------------
// Initial Mock Seeding Constants
// ----------------------------------------------------

export const INITIAL_HSN_CODES: HsnCodeMaster[] = [
  { code: '8201', category: 'Hand Tools', cgst: 9, sgst: 9, igst: 18, description: 'Spades, shovels, mattocks, picks, hoes, forks and rakes' },
  { code: '8203', category: 'Hand Tools', cgst: 9, sgst: 9, igst: 18, description: 'Files, rasps, pliers (including cutting pliers), pincers, tweezers' },
  { code: '8204', category: 'Hand Tools', cgst: 9, sgst: 9, igst: 18, description: 'Hand-operated spanners and wrenches (including torque meter wrenches)' },
  { code: '8467', category: 'Power Tools & Accessories', cgst: 9, sgst: 9, igst: 18, description: 'Tools for working in the hand, pneumatic, hydraulic or with self-contained motor' },
  { code: '3917', category: 'Plumbing Supplies', cgst: 9, sgst: 9, igst: 18, description: 'Tubes, pipes and hoses, and fittings thereof, of plastics (e.g. CPVC)' },
  { code: '7412', category: 'Plumbing Supplies', cgst: 9, sgst: 9, igst: 18, description: 'Copper, brass or bronze pipe or tube fittings (e.g. couplings, elbows)' },
  { code: '2523', category: 'Building Materials', cgst: 14, sgst: 14, igst: 28, description: 'Portland cement, aluminous cement, slag cement and similar hydraulic cements' },
  { code: '3824', category: 'Building Materials', cgst: 9, sgst: 9, igst: 18, description: 'Prepared binders for foundry moulds; chemical products (waterproofing chemicals)' },
  { code: '7318', category: 'Fasteners & Hardware', cgst: 9, sgst: 9, igst: 18, description: 'Screws, bolts, nuts, coach screws, screw hooks, rivets, cotters, washers of iron/steel' },
  { code: '8544', category: 'Electrical Infrastructure', cgst: 9, sgst: 9, igst: 18, description: 'Insulated copper or aluminium wire, cable and other insulated electric conductors' },
  { code: '6506', category: 'Safety Gears & PPE', cgst: 9, sgst: 9, igst: 18, description: 'Other headgear, whether or not lined or trimmed (safety helmets, glasses)' }
];

export const INITIAL_VENDORS: Vendor[] = [];

export const INITIAL_RFQS: RfqNegotiation[] = [];

export const INITIAL_PINCODES: PinCodeServiceability[] = [];

export const INITIAL_CREDIT_PROFILES: CorporateCreditProfile[] = [];

export const INITIAL_BANK_RECONS: OfflineBankReconciliation[] = [];

// Helper to interact with Local Storage safely on Next.js Client
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e: any) {
      console.warn(`[Storage Warning] Could not save ${key} to localStorage:`, e?.message);
      try {
        if (Array.isArray(value)) {
          // Store essential properties to save storage space
          const compact = value.map((item: any) => {
            if (item && typeof item === 'object' && item.id) {
              const { description, galleryImages, specifications, ...essential } = item;
              return essential;
            }
            return item;
          });
          localStorage.setItem(key, JSON.stringify(compact));
        }
      } catch {
        // Prevent unhandled QuotaExceededError from crashing UI
      }
    }
  }
};

// ----------------------------------------------------
// Local Storage API Getters and Setters with Auto-Purge of Legacy Demo Data
// ----------------------------------------------------

export const getHsnCodes = (): HsnCodeMaster[] => getStorageItem('abuzz_admin_hsn_codes', INITIAL_HSN_CODES);
export const saveHsnCodes = (codes: HsnCodeMaster[]) => setStorageItem('abuzz_admin_hsn_codes', codes);

export const getVendors = (): Vendor[] => {
  const items = getStorageItem('abuzz_admin_vendors', [] as Vendor[]);
  if (Array.isArray(items) && items.some(v => v.id?.startsWith('vend-') || v.name?.includes('Ludhiana'))) {
    setStorageItem('abuzz_admin_vendors', []);
    return [];
  }
  return items;
};
export const saveVendors = (vendors: Vendor[]) => setStorageItem('abuzz_admin_vendors', vendors);

export const getRfqs = (): RfqNegotiation[] => {
  const items = getStorageItem('abuzz_admin_rfqs', [] as RfqNegotiation[]);
  if (Array.isArray(items) && items.some(r => r.id?.startsWith('rfq-') || r.companyName?.includes('Larsen'))) {
    setStorageItem('abuzz_admin_rfqs', []);
    return [];
  }
  return items;
};
export const saveRfqs = (rfqs: RfqNegotiation[]) => setStorageItem('abuzz_admin_rfqs', rfqs);

export const getPincodes = (): PinCodeServiceability[] => {
  const items = getStorageItem('abuzz_admin_pincodes', [] as PinCodeServiceability[]);
  if (Array.isArray(items) && items.some(p => p.pincode === '110001' || p.city?.includes('Connaught'))) {
    setStorageItem('abuzz_admin_pincodes', []);
    return [];
  }
  return items;
};
export const savePincodes = (pincodes: PinCodeServiceability[]) => setStorageItem('abuzz_admin_pincodes', pincodes);

export const getCreditProfiles = (): CorporateCreditProfile[] => {
  const items = getStorageItem('abuzz_admin_credits', [] as CorporateCreditProfile[]);
  if (Array.isArray(items) && items.some(c => c.id?.startsWith('cred-') || c.companyName?.includes('Larsen'))) {
    setStorageItem('abuzz_admin_credits', []);
    return [];
  }
  return items;
};
export const saveCreditProfiles = (profiles: CorporateCreditProfile[]) => setStorageItem('abuzz_admin_credits', profiles);

export const getBankRecons = (): OfflineBankReconciliation[] => {
  const items = getStorageItem('abuzz_admin_recons', [] as OfflineBankReconciliation[]);
  if (Array.isArray(items) && items.some(b => b.id?.startsWith('recon-') || b.utrNumber?.includes('UTRI'))) {
    setStorageItem('abuzz_admin_recons', []);
    return [];
  }
  return items;
};
export const saveBankRecons = (recons: OfflineBankReconciliation[]) => setStorageItem('abuzz_admin_recons', recons);

export interface SocialMediaLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  whatsapp: string;
}

export const INITIAL_SOCIAL_LINKS: SocialMediaLinks = {
  facebook: 'https://facebook.com/abuzzstore',
  twitter: 'https://twitter.com/abuzzstore',
  instagram: 'https://instagram.com/abuzz.store',
  linkedin: 'https://linkedin.com/company/abuzz-store',
  youtube: 'https://youtube.com/@abuzzstore',
  whatsapp: 'https://wa.me/918329819618'
};

export const getSocialLinks = (): SocialMediaLinks => getStorageItem('abuzz_social_links', INITIAL_SOCIAL_LINKS);
export const saveSocialLinks = (links: SocialMediaLinks) => setStorageItem('abuzz_social_links', links);

export function generateMultilingualKeywords(product: {
  title: string;
  category: string;
  subcategory: string;
}): string[] {
  const keywords: string[] = [];
  const title = product.title || '';
  const titleLower = title.toLowerCase();

  const add = (kw: string) => {
    const trimmed = kw.trim();
    if (trimmed && !keywords.some(k => k.toLowerCase() === trimmed.toLowerCase())) {
      keywords.push(trimmed);
    }
  };

  // 1. Add core title
  add(title);

  // Extract size / measurement if present
  const sizeMatch = title.match(/(\d+(?:\.\d+)?\s*(?:-|\s)?(?:inch|in|mm|cm|m|kg|sq\s*mm|m|p)|14x250\s*mm)/i);
  const sizeStr = sizeMatch ? sizeMatch[0].trim() : '';

  // Known brands
  const brands = ['Suman', 'GTI', 'Bevellee', 'MK Super', 'Karam', 'Bosch', 'DeWalt', 'Makita', 'UltraTech', 'Birla', 'Tata Tiscon', 'Dr. Fixit', 'Fischer', 'Godrej', 'Supreme', 'Zoloto', 'Havells', 'Schneider', 'Anchor'];
  const foundBrand = brands.find(b => titleLower.includes(b.toLowerCase())) || '';

  // --- CARPENTER PLANE (RANDA) ---
  if (titleLower.includes('carpenter plane') || titleLower.includes('plane')) {
    add('Carpenter Plane');
    add('Hand Planer');
    add('Wood Planer');
    add('randa');
    add('lakdi randa');
    add('carpenter randa');
    add('लकड़ी रंदा');
    add('रंदा');

    if (foundBrand) {
      add(`${foundBrand} randa`);
      add(`${foundBrand} carpenter plane`);
    }

    if (sizeStr) {
      add(`randa ${sizeStr}`);
      add(`plane ${sizeStr}`);
      add(`रंदा ${sizeStr}`);
    }

    if (titleLower.includes('with blade') || titleLower.includes('blade')) {
      add('randa blade');
      add('randa patti');
      add('रंदा ब्लेड');
      add('रंदा पत्ती');
    }
  }

  // --- CHISEL (CHHIYNI) ---
  else if (titleLower.includes('chisel')) {
    if (titleLower.includes('demolition hammer') || titleLower.includes('flat chisel')) {
      add('Flat Chisel');
      add('Demolition Hammer Chisel');
      add('hammer chhiyni');
      add('flat chhenni');
      add('डिमोलिशन हैमर छैनी');
      add('फ्लैट छैनी');
    } else {
      add('Wood Chisel');
      add('Bevelled Edge Chisel');
      add('chhiyni');
      add('chhenni');
      add('lakdi chhiyni');
      add('लकड़ी छैनी');
      add('छैनी');

      if (foundBrand) {
        add(`${foundBrand} chisel`);
        add(`${foundBrand} chhiyni`);
      }

      if (sizeStr) {
        add(`chisel ${sizeStr}`);
        add(`chhiyni ${sizeStr}`);
        add(`छैनी ${sizeStr}`);
      }

      if (titleLower.includes('wooden handle')) {
        add('wooden handle chisel');
        add('lakdi hatha chhiyni');
        add('लकड़ी हत्था छैनी');
      } else if (titleLower.includes('pvc handle')) {
        add('pvc handle chisel');
        add('plastic handle chhiyni');
        add('प्लास्टिक हत्था छैनी');
      }
    }
  }

  // --- ALLEN KEY / HEX KEY ---
  else if (titleLower.includes('allen') || titleLower.includes('hex key')) {
    add('Allen Key Set');
    add('Hex Key Set');
    add('allen panna');
    add('hex key');
    add('एलेन की सेट');
    add('हेक्स की');
  }

  // --- SPANNER / WRENCH ---
  else if (titleLower.includes('spanner') || titleLower.includes('wrench')) {
    add('Spanner');
    add('Hand Wrench');
    add('panna');
    add('rinch');
    add('पाना');
    add('रिंच');
  }

  // --- PLIERS ---
  else if (titleLower.includes('plier') || titleLower.includes('pliers')) {
    add('Pliers');
    add('palaas');
    add('plass');
    add('प्लास');
  }

  // --- HAMMER ---
  else if (titleLower.includes('hammer') && !titleLower.includes('rotary hammer')) {
    add('Hammer');
    add('hathoda');
    add('हथौड़ा');
  }

  // --- SAW / BLADE ---
  else if (titleLower.includes('saw') || titleLower.includes('blade')) {
    add('Saw Blade');
    add('aari');
    add('आरी');
    add('ब्लेड');
  }

  // Fallback: extract title words
  title.split(/\s+/).forEach(word => {
    const clean = word.replace(/[^a-zA-Z0-9-]/g, '');
    if (clean.length > 2 && !['with', 'and', 'for', 'set', 'inch', 'from'].includes(clean.toLowerCase())) {
      add(clean);
    }
  });

  return keywords;
}

export const getAdminProducts = (defaultProducts: Product[]): Product[] => {
  const sanitizeList = (list: Product[]): Product[] => {
    if (!list || !Array.isArray(list)) return (defaultProducts || []).map(p => ({ ...p, imageUrl: formatImageUrl(p.imageUrl) }));
    return list.filter(Boolean).map(p => ({
      ...p,
      id: p.id || 'PROD_UNKNOWN',
      title: p.title || 'Hardware Product',
      category: p.category || 'Hand Tools',
      subcategory: p.subcategory || 'General Hardware',
      price: typeof p.price === 'number' ? p.price : 0,
      stockStatus: p.stockStatus || 'in_stock',
      popularity: typeof p.popularity === 'number' ? p.popularity : 50,
      rating: typeof p.rating === 'number' ? p.rating : 4.5,
      imageUrl: formatImageUrl(p.imageUrl || 'https://cdn.abuzz.store/products/ABBPS10_img1.jpg'),
      galleryImages: (p.galleryImages && Array.isArray(p.galleryImages) && p.galleryImages.length > 0)
        ? p.galleryImages.map(img => formatImageUrl(img))
        : [formatImageUrl(p.imageUrl || 'https://cdn.abuzz.store/products/ABBPS10_img1.jpg')]
    }));
  };

  if (typeof window === 'undefined') return sanitizeList(defaultProducts);

  try {
    // Purge legacy local storage cache if it contains outdated image paths
    const rawOverrides = localStorage.getItem('abuzz_catalog_overrides');
    if (rawOverrides && (rawOverrides.includes('/products/') || rawOverrides.includes('abuzz.store/images/'))) {
      localStorage.removeItem('abuzz_catalog_overrides');
    }

    const rawCustom = localStorage.getItem('abuzz_catalog_custom');
    if (rawCustom && (rawCustom.includes('/products/') || rawCustom.includes('abuzz.store/images/'))) {
      localStorage.removeItem('abuzz_catalog_custom');
    }

    const storedOverrides = localStorage.getItem('abuzz_catalog_overrides');
    const overrides: Record<string, Product> = storedOverrides ? JSON.parse(storedOverrides) : {};

    const storedDeleted = localStorage.getItem('abuzz_catalog_deleted');
    const deletedSet = new Set<string>(storedDeleted ? JSON.parse(storedDeleted) : []);

    const storedCustom = localStorage.getItem('abuzz_catalog_custom');
    const customList: Product[] = storedCustom ? JSON.parse(storedCustom) : [];

    const updatedDefaults = defaultProducts
      .filter(p => !deletedSet.has(p.id))
      .map(p => overrides[p.id] ? overrides[p.id] : p);

    const merged = [...customList, ...updatedDefaults];
    return sanitizeList(merged);
  } catch (e) {
    console.error('Error loading catalog overrides:', e);
    return sanitizeList(defaultProducts);
  }
};



export const saveAdminProducts = (products: Product[], baseDefaults: Product[] = MOCK_PRODUCTS) => {
  if (typeof window === 'undefined') return;

  const defaults = (baseDefaults && baseDefaults.length > 0) ? baseDefaults : MOCK_PRODUCTS;
  const defaultIds = new Set(defaults.map((p: Product) => p.id));
  const defaultMap = new Map(defaults.map((p: Product) => [p.id, p]));

  const customProducts: Product[] = [];
  const overrides: Record<string, Product> = {};
  const currentIds = new Set(products.map((p: Product) => p.id));
  const deletedProductIds = defaults.filter((p: Product) => !currentIds.has(p.id)).map((p: Product) => p.id);

  for (const p of products) {
    if (!defaultIds.has(p.id)) {
      customProducts.push(p);
    } else {
      const def = defaultMap.get(p.id);
      // If product differs from seed default, record as override
      if (def && JSON.stringify(p) !== JSON.stringify(def)) {
        overrides[p.id] = p;
      }
    }
  }

  try {
    // Purge legacy bloated keys
    localStorage.removeItem('abuzz_products_master');
    localStorage.removeItem('abuzz_catalog_modifications');
    localStorage.removeItem('abuzz_product_image_overrides');

    localStorage.setItem('abuzz_catalog_overrides', JSON.stringify(overrides));
    localStorage.setItem('abuzz_catalog_deleted', JSON.stringify(deletedProductIds));
    localStorage.setItem('abuzz_catalog_custom', JSON.stringify(customProducts));
  } catch (e) {
    console.warn('[Storage Warning] Error persisting catalog overrides:', e);
  }

  window.dispatchEvent(new Event('storage'));
};

// ----------------------------------------------------
// Compliance Calculations (Relies on Interstate logic)
// ----------------------------------------------------

export interface GstSplitResult {
  isInterstate: boolean;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  totalTax: number;
}

/**
 * Calculates CGST, SGST, and IGST components based on origin state and destination shipping state.
 */
export function calculateGstSplit(
  price: number,
  quantity: number,
  hsnCode: string,
  warehouseState: string,
  shippingState: string,
  hsnRegistry: HsnCodeMaster[] = INITIAL_HSN_CODES
): GstSplitResult {
  const match = hsnRegistry.find(item => item.code === hsnCode) || { cgst: 9, sgst: 9, igst: 18 };
  const subtotal = price * quantity;

  // Case-insensitive state comparison
  const isInterstate = warehouseState.trim().toLowerCase() !== shippingState.trim().toLowerCase();

  if (isInterstate) {
    const rate = match.igst;
    const igstAmount = Number(((subtotal * rate) / 100).toFixed(2));
    return {
      isInterstate: true,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount,
      cgstRate: 0,
      sgstRate: 0,
      igstRate: rate,
      totalTax: igstAmount
    };
  } else {
    const cgstRate = match.cgst;
    const sgstRate = match.sgst;
    const cgstAmount = Number(((subtotal * cgstRate) / 100).toFixed(2));
    const sgstAmount = Number(((subtotal * sgstRate) / 100).toFixed(2));
    return {
      isInterstate: false,
      cgstAmount,
      sgstAmount,
      igstAmount: 0,
      cgstRate,
      sgstRate,
      igstRate: 0,
      totalTax: Number((cgstAmount + sgstAmount).toFixed(2))
    };
  }
}

/**
 * Calculates standard commission deductions (Marketplace Fee + PG Fee + 1% TCS CGST Act Section 52)
 */
export function calculateVendorDeductions(
  saleAmount: number,
  commissionRate: number,
  pgFeeRate: number = 2.0 // standard 2% PG fee
) {
  const marketplaceCommission = Number(((saleAmount * commissionRate) / 100).toFixed(2));
  const pgFee = Number(((saleAmount * pgFeeRate) / 100).toFixed(2));
  const tcsDeduction = Number(((saleAmount * 1.0) / 100).toFixed(2)); // 1% TCS
  
  const totalDeductions = Number((marketplaceCommission + pgFee + tcsDeduction).toFixed(2));
  const netPayout = Number((saleAmount - totalDeductions).toFixed(2));

  return {
    marketplaceCommission,
    pgFee,
    tcsDeduction,
    totalDeductions,
    netPayout
  };
}

export interface ParsedCatalogRow {
  sku?: string;
  title?: string;
  category?: string;
  subcategory?: string;
  price?: number | string;
  moq?: number | string;
  description?: string;
  weight_kg?: number | string;
  hsn_code?: string;
  is_serialized?: boolean | string;
  [key: string]: any;
}

export interface CatalogRowValidationResult {
  row: ParsedCatalogRow;
  index: number;
  errors: string[];
  warnings: string[];
  isValid: boolean;
}

export const VALID_CATEGORIES = [
  'Power Tools & Accessories',
  'Hand Tools',
  'Safety Gears & PPE',
  'Building Materials',
  'Fasteners & Hardware',
  'Plumbing Supplies',
  'Electrical Infrastructure'
];

export function validateCatalogRow(row: ParsedCatalogRow, index: number): CatalogRowValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Support varying header naming conventions
  const sku = String(row.sku || row.SKU || row.Sku || '').trim();
  if (!sku) {
    errors.push('SKU is required.');
  } else if (!/^[A-Za-z0-9\-_]+$/.test(sku)) {
    errors.push(`SKU "${sku}" contains invalid characters. Only alphanumeric, dashes, and underscores allowed.`);
  }

  const title = String(row.title || row.Title || '').trim();
  if (!title) {
    errors.push('Title is required.');
  }

  const category = String(row.category || row.Category || '').trim();
  if (!category) {
    errors.push('Category is required.');
  } else if (!VALID_CATEGORIES.some(cat => cat.toLowerCase() === category.toLowerCase())) {
    errors.push(`Category "${category}" is invalid. Must match standard store categories.`);
  }

  const rawPrice = row.price !== undefined ? row.price : row.Price;
  const price = Number(rawPrice);
  if (rawPrice === undefined || String(rawPrice).trim() === '') {
    errors.push('Price is required.');
  } else if (isNaN(price)) {
    errors.push(`Price "${rawPrice}" must be a numeric value.`);
  } else if (price < 0) {
    errors.push('Price cannot be negative.');
  }

  const rawMoq = row.moq !== undefined ? row.moq : row.MOQ;
  const moq = rawMoq !== undefined && String(rawMoq).trim() !== '' ? Number(rawMoq) : 1;
  if (isNaN(moq)) {
    errors.push(`MOQ "${rawMoq}" must be a number.`);
  } else if (moq < 1) {
    errors.push('MOQ must be at least 1.');
  }

  const rawHsn = String(row.hsn_code || row.hsnCode || row.HSN || row.hsn || '').trim();
  if (rawHsn) {
    const matched = INITIAL_HSN_CODES.some(h => h.code === rawHsn);
    if (!matched) {
      warnings.push(`HSN Code "${rawHsn}" not found in registry. Generic 9% CGST / 9% SGST applies.`);
    }
  } else {
    warnings.push('No HSN Code specified. Defaulting to general slab.');
  }

  // Resolve matching category capitalization
  const matchedCategory = VALID_CATEGORIES.find(cat => cat.toLowerCase() === category.toLowerCase()) || category;

  return {
    row: {
      sku: sku || undefined,
      title: title || undefined,
      category: matchedCategory,
      subcategory: String(row.subcategory || row.Subcategory || '').trim() || 'General',
      price: isNaN(price) ? 0 : price,
      moq: isNaN(moq) ? 1 : moq,
      description: String(row.description || row.Description || '').trim() || 'Industrial grade quality.',
      weight_kg: Number(row.weight_kg || row.Weight || row.weight || 1.5) || 1.5,
      hsn_code: rawHsn || undefined,
      is_serialized: String(row.is_serialized || row.serialized || '').toLowerCase() === 'true'
    },
    index,
    errors,
    warnings,
    isValid: errors.length === 0
  };
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrderValue: number;
  maxDiscountLimit?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount: number;
}

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 0,
    maxDiscountLimit: 1000,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    usageCount: 28
  },
  {
    code: 'POWER10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 5000,
    maxDiscountLimit: 2000,
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    usageCount: 145
  },
  {
    code: 'B2BFLAT5000',
    discountType: 'flat',
    value: 5000,
    minOrderValue: 50000,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    usageCount: 42
  },
  {
    code: 'SAFETY20',
    discountType: 'percentage',
    value: 20,
    minOrderValue: 2000,
    maxDiscountLimit: 500,
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Expired
    isActive: true,
    usageCount: 88
  }
];

export function getCoupons(): Coupon[] {
  if (typeof window === 'undefined') return INITIAL_COUPONS;
  const stored = localStorage.getItem('abuzz_admin_coupons');
  if (!stored) {
    localStorage.setItem('abuzz_admin_coupons', JSON.stringify(INITIAL_COUPONS));
    return INITIAL_COUPONS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && !parsed.some((c: Coupon) => c.code === 'WELCOME10')) {
      const updated = [INITIAL_COUPONS[0], ...parsed];
      localStorage.setItem('abuzz_admin_coupons', JSON.stringify(updated));
      return updated;
    }
    return parsed;
  } catch {
    return INITIAL_COUPONS;
  }
}

export function saveCoupons(coupons: Coupon[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_coupons', JSON.stringify(coupons));
}

export interface CouponApplicationResult {
  isValid: boolean;
  error?: string;
  discountAmount: number;
  finalPrice: number;
}

export function validateAndApplyCoupon(
  code: string,
  subtotal: number,
  couponsList: Coupon[] = getCoupons()
): CouponApplicationResult {
  const cleanCode = code.trim().toUpperCase();
  const coupon = couponsList.find(c => c.code.toUpperCase() === cleanCode);

  if (!coupon) {
    return { isValid: false, error: 'Coupon code does not exist.', discountAmount: 0, finalPrice: subtotal };
  }

  if (!coupon.isActive) {
    return { isValid: false, error: 'Coupon code is currently inactive.', discountAmount: 0, finalPrice: subtotal };
  }

  const nowStr = new Date().toISOString().split('T')[0];
  if (nowStr < coupon.startDate) {
    return { isValid: false, error: 'Coupon promotion has not started yet.', discountAmount: 0, finalPrice: subtotal };
  }
  if (nowStr > coupon.endDate) {
    return { isValid: false, error: 'Coupon promotion has expired.', discountAmount: 0, finalPrice: subtotal };
  }

  if (subtotal < coupon.minOrderValue) {
    return { 
      isValid: false, 
      error: `Minimum order value of ₹${coupon.minOrderValue.toLocaleString('en-IN')} required to apply this coupon.`, 
      discountAmount: 0, 
      finalPrice: subtotal 
    };
  }

  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = (subtotal * coupon.value) / 100;
    if (coupon.maxDiscountLimit !== undefined && discountAmount > coupon.maxDiscountLimit) {
      discountAmount = coupon.maxDiscountLimit;
    }
  } else {
    discountAmount = coupon.value;
  }

  discountAmount = Number(discountAmount.toFixed(2));
  const finalPrice = Number(Math.max(0, subtotal - discountAmount).toFixed(2));

  return {
    isValid: true,
    discountAmount,
    finalPrice
  };
}

export interface PaymentGatewayConfig {
  id: string;
  name: string;
  apiKeyId: string;
  apiSecret: string;
  webhookUrl: string;
  surchargePercent: number;
  settlementDays: number;
  isActive: boolean;
  isSandbox: boolean;
}

export interface MetaPixelConfig {
  pixelId: string;
  adAccountId?: string;
  businessManagerId?: string;
  capiToken: string;
  testEventCode: string;
  isActive: boolean;
}

export interface TrackingEventLog {
  id: string;
  eventName: string;
  timestamp: string;
  channel: 'Browser Pixel' | 'Conversions API' | 'Google Tag (Gtag)' | 'Google Ads' | string;
  matchQuality: number;
  payload: string;
}

export const INITIAL_GATEWAYS: PaymentGatewayConfig[] = [
  {
    id: 'razorpay',
    name: 'Razorpay PG',
    apiKeyId: 'rzp_live_TK3CfjgQyB2eb6',
    apiSecret: 'KuYaKexra7erLcWI20I8dsJC',
    webhookUrl: 'https://api.abuzz.com/v1/payments/razorpay/webhook',
    surchargePercent: 2.0,
    settlementDays: 2,
    isActive: true,
    isSandbox: false
  },
  {
    id: 'cashfree',
    name: 'Cashfree Payments',
    apiKeyId: 'cf_live_abuzz6612',
    apiSecret: '••••••••••••••••••••',
    webhookUrl: 'https://api.abuzz.com/v1/payments/cashfree/webhook',
    surchargePercent: 1.8,
    settlementDays: 1,
    isActive: true,
    isSandbox: false
  },
  {
    id: 'bank_wire',
    name: 'Bank Direct Wire (NEFT/RTGS)',
    apiKeyId: 'IFSC_ICIC0000001',
    apiSecret: 'AC_908871625344',
    webhookUrl: 'https://api.abuzz.com/v1/payments/bank-wire/verify',
    surchargePercent: 0,
    settlementDays: 0,
    isActive: true,
    isSandbox: false
  }
];

export const INITIAL_META_CONFIG: MetaPixelConfig = {
  pixelId: '1632757315074398',
  adAccountId: 'act_982736154091',
  businessManagerId: 'bm_1029384756',
  capiToken: 'EAAGxx_meta_conversion_token_hash_value',
  testEventCode: 'TEST98726',
  isActive: true
};

export const INITIAL_TRACKING_LOGS: TrackingEventLog[] = [
  {
    id: 'evt_98726154',
    eventName: 'PageView',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    channel: 'Browser Pixel',
    matchQuality: 92,
    payload: JSON.stringify({ url: 'https://abuzz.comhttps://cdn.abuzz.store/products/angle-grinder', userAgent: 'Mozilla/5.0 (Windows NT 10.0)' })
  },
  {
    id: 'evt_98726155',
    eventName: 'AddToCart',
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    channel: 'Browser Pixel',
    matchQuality: 92,
    payload: JSON.stringify({ content_name: 'Bosch GWS Grinder', value: 6700, currency: 'INR' })
  },
  {
    id: 'evt_98726156',
    eventName: 'AddToCart',
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    channel: 'Conversions API',
    matchQuality: 98,
    payload: JSON.stringify({ content_name: 'Bosch GWS Grinder', value: 6700, currency: 'INR', user_data: { em: 'hash_sha256_em...', ph: 'hash_sha256_ph...' } })
  },
  {
    id: 'evt_98726157',
    eventName: 'Purchase',
    timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    channel: 'Conversions API',
    matchQuality: 99,
    payload: JSON.stringify({ content_ids: ['BOSCH-GWS-600'], value: 6700, currency: 'INR', transaction_id: 'tx_88716' })
  }
];

export function getGateways(): PaymentGatewayConfig[] {
  if (typeof window === 'undefined') return INITIAL_GATEWAYS;
  const stored = localStorage.getItem('abuzz_admin_gateways');
  if (!stored) {
    localStorage.setItem('abuzz_admin_gateways', JSON.stringify(INITIAL_GATEWAYS));
    return INITIAL_GATEWAYS;
  }
  return JSON.parse(stored);
}

export function saveGateways(gateways: PaymentGatewayConfig[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_gateways', JSON.stringify(gateways));
}

export function getMetaConfig(): MetaPixelConfig {
  if (typeof window === 'undefined') return INITIAL_META_CONFIG;
  const stored = localStorage.getItem('abuzz_admin_meta_config');
  if (!stored) {
    localStorage.setItem('abuzz_admin_meta_config', JSON.stringify(INITIAL_META_CONFIG));
    return INITIAL_META_CONFIG;
  }
  try {
    const parsed = JSON.parse(stored);
    let updated = false;
    if (!parsed.pixelId || parsed.pixelId === '877261159822345') {
      parsed.pixelId = '1632757315074398';
      updated = true;
    }
    if (parsed.isActive !== true) {
      parsed.isActive = true;
      updated = true;
    }
    if (updated) {
      localStorage.setItem('abuzz_admin_meta_config', JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return INITIAL_META_CONFIG;
  }
}


export function saveMetaConfig(config: MetaPixelConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_meta_config', JSON.stringify(config));
}

export function getTrackingLogs(): TrackingEventLog[] {
  if (typeof window === 'undefined') return INITIAL_TRACKING_LOGS;
  const stored = localStorage.getItem('abuzz_admin_tracking_logs');
  if (!stored) {
    localStorage.setItem('abuzz_admin_tracking_logs', JSON.stringify(INITIAL_TRACKING_LOGS));
    return INITIAL_TRACKING_LOGS;
  }
  return JSON.parse(stored);
}

export function saveTrackingLogs(logs: TrackingEventLog[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_tracking_logs', JSON.stringify(logs));
}

export function calculatePgSurcharge(amount: number, surchargePercent: number): number {
  if (surchargePercent <= 0) return 0;
  return Number(((amount * surchargePercent) / 100).toFixed(2));
}

export interface GoogleMarketingConfig {
  tagId: string;
  conversionLabel: string;
  remarketingEnabled: boolean;
  isActive: boolean;
}

export const INITIAL_GOOGLE_CONFIG: GoogleMarketingConfig = {
  tagId: 'AW-98726154',
  conversionLabel: 'aw_conv_purchase_101',
  remarketingEnabled: true,
  isActive: true
};

export function getGoogleConfig(): GoogleMarketingConfig {
  if (typeof window === 'undefined') return INITIAL_GOOGLE_CONFIG;
  const stored = localStorage.getItem('abuzz_admin_google_config');
  if (!stored) {
    localStorage.setItem('abuzz_admin_google_config', JSON.stringify(INITIAL_GOOGLE_CONFIG));
    return INITIAL_GOOGLE_CONFIG;
  }
  return JSON.parse(stored);
}

export function saveGoogleConfig(config: GoogleMarketingConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_google_config', JSON.stringify(config));
}

export interface SocialChannelConfig {
  id: string;
  name: string;
  isEnabled: boolean;
  phoneNumber?: string;
  accessToken?: string;
  instaPageId?: string;
}

export interface SocialMessageLog {
  id: string;
  sender: string;
  channel: 'WhatsApp' | 'Messenger' | 'Instagram';
  messageText: string;
  timestamp: string;
}

export const INITIAL_SOCIAL_CHANNELS: SocialChannelConfig[] = [
  { id: 'whatsapp', name: 'WhatsApp Business API', isEnabled: false, phoneNumber: '', accessToken: '' },
  { id: 'messenger', name: 'Facebook Messenger API', isEnabled: false, accessToken: '' },
  { id: 'instagram', name: 'Instagram Shop Sync', isEnabled: false, instaPageId: '' }
];

export const INITIAL_SOCIAL_MESSAGES: SocialMessageLog[] = [];

export function getSocialChannels(): SocialChannelConfig[] {
  if (typeof window === 'undefined') return INITIAL_SOCIAL_CHANNELS;
  const stored = localStorage.getItem('abuzz_admin_social_channels');
  if (!stored) {
    localStorage.setItem('abuzz_admin_social_channels', JSON.stringify(INITIAL_SOCIAL_CHANNELS));
    return INITIAL_SOCIAL_CHANNELS;
  }
  return JSON.parse(stored);
}

export function saveSocialChannels(channels: SocialChannelConfig[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_social_channels', JSON.stringify(channels));
}

export function getSocialMessages(): SocialMessageLog[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('abuzz_admin_social_messages');
  if (!stored) {
    localStorage.setItem('abuzz_admin_social_messages', JSON.stringify([]));
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.some(m => m.id?.startsWith('msg_') || m.sender?.includes('Larsen'))) {
      localStorage.setItem('abuzz_admin_social_messages', JSON.stringify([]));
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

export function saveSocialMessages(messages: SocialMessageLog[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_social_messages', JSON.stringify(messages));
}

export interface WebhookEndpointConfig {
  id: string;
  name: string;
  provider: 'Shiprocket' | 'Razorpay' | 'Cashfree' | 'Custom Carrier';
  endpointUrl: string;
  secretToken: string;
  isEnabled: boolean;
  subscribedEvents: string[];
  lastTriggered?: string;
  totalCalls: number;
}

export interface WebhookLogEntry {
  id: string;
  webhookId: string;
  provider: string;
  event: string;
  payloadSnippet: string;
  httpStatus: number;
  timestamp: string;
}

export const INITIAL_WEBHOOKS: WebhookEndpointConfig[] = [
  {
    id: 'wh-shiprocket-1',
    name: 'Shiprocket Order Milestone Webhook',
    provider: 'Shiprocket',
    endpointUrl: 'https://abuzz.store/api/webhooks/shiprocket',
    secretToken: 'abuzz_sr_wh_secret_2026',
    isEnabled: true,
    subscribedEvents: ['order.shipped', 'order.out_for_delivery', 'order.delivered', 'order.rto', 'order.ndr'],
    lastTriggered: new Date().toISOString(),
    totalCalls: 142
  },
  {
    id: 'wh-razorpay-1',
    name: 'Razorpay Instant Payment Notification',
    provider: 'Razorpay',
    endpointUrl: 'https://abuzz.store/api/webhooks/razorpay',
    secretToken: 'abuzz_rzp_wh_secret_2026',
    isEnabled: true,
    subscribedEvents: ['payment.captured', 'payment.failed', 'refund.created'],
    lastTriggered: new Date(Date.now() - 3600000).toISOString(),
    totalCalls: 389
  }
];

export function getWebhooks(): WebhookEndpointConfig[] {
  if (typeof window === 'undefined') return INITIAL_WEBHOOKS;
  const stored = localStorage.getItem('abuzz_admin_webhooks');
  if (!stored) {
    localStorage.setItem('abuzz_admin_webhooks', JSON.stringify(INITIAL_WEBHOOKS));
    return INITIAL_WEBHOOKS;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_WEBHOOKS;
  } catch {
    return INITIAL_WEBHOOKS;
  }
}

export function saveWebhooks(webhooks: WebhookEndpointConfig[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_webhooks', JSON.stringify(webhooks));
}

export interface EmployeePermissions {
  manageCatalog?: boolean;       // Products, Prices, Stock
  manageOrders?: boolean;        // Order Fulfillment, Status Updates
  manageRfqs?: boolean;          // B2B RFQs & Custom Quotations
  manageVendors?: boolean;       // Suppliers & Purchase Orders
  manageLogistics?: boolean;     // Shipping & Pincodes
  manageTaxation?: boolean;      // HSN, GST, TCS
  manageMarketing?: boolean;     // Coupons & Campaigns
  manageFinancials?: boolean;    // Bank Recons & Payments
  manageCustomers?: boolean;     // Customer Accounts & Staff Roles
}

export interface UserLoginRecord {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'employee' | 'user';
  department?: string;
  permissions?: EmployeePermissions;
  lastLogin: string;
  ipAddress: string;
  device: string;
  status: 'active' | 'suspended';
}

export const INITIAL_USER_LOGINS: UserLoginRecord[] = [
  {
    uid: 'u-admin-1',
    email: 'manishyadav991@gmail.com',
    displayName: 'Manish Yadav (Super Admin)',
    role: 'admin',
    department: 'Executive Operations',
    permissions: {
      manageCatalog: true,
      manageOrders: true,
      manageRfqs: true,
      manageVendors: true,
      manageLogistics: true,
      manageTaxation: true,
      manageMarketing: true,
      manageFinancials: true,
      manageCustomers: true,
    },
    lastLogin: '2026-08-02T10:45:00Z',
    ipAddress: '103.112.44.12',
    device: 'Chrome 127.0 (Windows 11)',
    status: 'active'
  },
  {
    uid: 'u-emp-1',
    email: 'warehouse.manager@abuzzstore.com',
    displayName: 'Rajesh Kumar (Warehouse Staff)',
    role: 'employee',
    department: 'Inventory & Fulfillment',
    permissions: {
      manageCatalog: true,
      manageOrders: true,
      manageLogistics: true,
    },
    lastLogin: '2026-08-02T09:15:00Z',
    ipAddress: '103.112.44.18',
    device: 'Chrome Mobile (Android 14)',
    status: 'active'
  },
  {
    uid: 'u-emp-2',
    email: 'b2b.sales@abuzzstore.com',
    displayName: 'Priya Sharma (Corporate Sales)',
    role: 'employee',
    department: 'B2B Sales & RFQ',
    permissions: {
      manageRfqs: true,
      manageVendors: true,
    },
    lastLogin: '2026-08-01T16:30:00Z',
    ipAddress: '122.160.22.84',
    device: 'Edge 126.0 (Windows 11)',
    status: 'active'
  }
];

export function getUserLogins(): UserLoginRecord[] {
  if (typeof window === 'undefined') return INITIAL_USER_LOGINS;
  const stored = localStorage.getItem('abuzz_admin_user_logins');
  if (!stored) {
    localStorage.setItem('abuzz_admin_user_logins', JSON.stringify(INITIAL_USER_LOGINS));
    return INITIAL_USER_LOGINS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('abuzz_admin_user_logins', JSON.stringify(INITIAL_USER_LOGINS));
      return INITIAL_USER_LOGINS;
    }
    return parsed;
  } catch {
    return INITIAL_USER_LOGINS;
  }
}

export function saveUserLogins(logins: UserLoginRecord[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_user_logins', JSON.stringify(logins));
}

export function sanitizeOrderRecord(raw: any): AdminOrderRecord {
  const items = Array.isArray(raw?.items) ? raw.items.map((i: any) => ({
    productId: i?.productId || i?.product?.id || 'prod-1',
    productTitle: i?.productTitle || i?.product?.title || i?.title || 'Industrial Tool Item',
    quantity: typeof i?.quantity === 'number' && !isNaN(i.quantity) ? i.quantity : 1,
    unitPrice: typeof i?.unitPrice === 'number' && !isNaN(i.unitPrice) ? i.unitPrice : (typeof i?.product?.price === 'number' ? i.product.price : 0),
    hsnCode: i?.hsnCode || i?.product?.specifications?.['HSN Code'] || '8467'
  })) : [];

  const calculatedTotal = typeof raw?.totalAmount === 'number' && !isNaN(raw.totalAmount)
    ? raw.totalAmount
    : (typeof raw?.total === 'number' && !isNaN(raw.total)
      ? raw.total
      : items.reduce((sum: number, item: any) => sum + (item.unitPrice * item.quantity), 0));

  const calculatedTax = typeof raw?.totalTax === 'number' && !isNaN(raw.totalTax)
    ? raw.totalTax
    : (typeof raw?.tax === 'number' && !isNaN(raw.tax)
      ? raw.tax
      : Math.round(calculatedTotal * 0.18));

  const calculatedSubtotal = typeof raw?.taxableSubtotal === 'number' && !isNaN(raw.taxableSubtotal)
    ? raw.taxableSubtotal
    : (typeof raw?.subtotal === 'number' && !isNaN(raw.subtotal)
      ? raw.subtotal
      : Math.max(0, calculatedTotal - calculatedTax));

  let orderStatus = (raw?.orderStatus || raw?.status || 'pending').toString().toLowerCase();
  if (!['pending', 'processing', 'ready_for_dispatch', 'shipped', 'delivered', 'cancelled'].includes(orderStatus)) {
    orderStatus = 'pending';
  }

  let paymentStatus = (raw?.paymentStatus || 'paid').toString().toLowerCase();
  if (!['paid', 'pending', 'partially_paid'].includes(paymentStatus)) {
    paymentStatus = 'paid';
  }

  let paymentMode = raw?.paymentMode || 'PREPAID';
  if (!['PREPAID', 'COD', 'CREDIT_KHATA', 'NEFT_RTGS'].includes(paymentMode)) {
    paymentMode = 'PREPAID';
  }

  const addr = raw?.shippingAddress;
  const addressStr = typeof addr === 'string'
    ? addr
    : (addr ? `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.zip || ''}`.trim() : 'Chinchwad, Pune');

  return {
    id: raw?.id || `OD-AS-${Date.now().toString().slice(-4)}`,
    customerName: raw?.customerName || (typeof addr === 'object' && addr?.name) || 'Valued Customer',
    customerEmail: raw?.customerEmail || 'customer@abuzz.store',
    customerPhone: raw?.customerPhone || '',
    companyName: raw?.companyName || raw?.customerName || 'B2B Client',
    gstin: raw?.gstin || '',
    shippingAddress: addressStr || 'Chinchwad, Pune',
    city: raw?.city || (typeof addr === 'object' && addr?.city) || 'Pune',
    state: raw?.state || (typeof addr === 'object' && addr?.state) || 'Maharashtra',
    pincode: raw?.pincode || (typeof addr === 'object' && addr?.zip) || '411019',
    items,
    taxableSubtotal: calculatedSubtotal >= 0 ? calculatedSubtotal : 0,
    cgstAmount: typeof raw?.cgstAmount === 'number' && !isNaN(raw.cgstAmount) ? raw.cgstAmount : Math.round(calculatedTax / 2),
    sgstAmount: typeof raw?.sgstAmount === 'number' && !isNaN(raw.sgstAmount) ? raw.sgstAmount : Math.round(calculatedTax / 2),
    igstAmount: typeof raw?.igstAmount === 'number' && !isNaN(raw.igstAmount) ? raw.igstAmount : 0,
    totalTax: calculatedTax >= 0 ? calculatedTax : 0,
    freightAmount: typeof raw?.freightAmount === 'number' && !isNaN(raw.freightAmount) ? raw.freightAmount : 0,
    discount: typeof raw?.discount === 'number' && !isNaN(raw.discount) ? raw.discount : 0,
    totalAmount: calculatedTotal >= 0 ? calculatedTotal : 0,
    paymentMode: paymentMode as any,
    paymentStatus: paymentStatus as any,
    orderStatus: orderStatus as any,
    carrier: raw?.carrier || 'Blue Dart',
    awbNumber: raw?.awbNumber,
    ewayBillNumber: raw?.ewayBillNumber,
    requiresEwayBill: typeof raw?.requiresEwayBill === 'boolean' ? raw.requiresEwayBill : calculatedTotal >= 50000,
    serialNumbers: Array.isArray(raw?.serialNumbers) ? raw.serialNumbers : [],
    createdAt: raw?.createdAt || new Date().toISOString()
  };
}

export const INITIAL_ADMIN_ORDERS: AdminOrderRecord[] = [
  sanitizeOrderRecord({
    id: 'ORD-2026-9001',
    customerName: 'Tata Projects',
    companyName: 'Tata Projects Ltd',
    customerEmail: 'procurement@tataprojects.com',
    customerPhone: '9876543210',
    shippingAddress: 'Ludhiana Industrial Area',
    city: 'Ludhiana',
    state: 'Punjab',
    pincode: '141003',
    createdAt: '2026-08-01T10:00:00.000Z',
    paymentMode: 'PREPAID',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    items: [
      {
        productId: 'bosch-gws-600',
        productTitle: 'Bosch Angle Grinder GWS 600',
        quantity: 10,
        unitPrice: 2400,
        hsnCode: '8467'
      }
    ],
    taxableSubtotal: 24000,
    cgstAmount: 2160,
    sgstAmount: 2160,
    igstAmount: 0,
    totalTax: 4320,
    freightAmount: 0,
    totalAmount: 28320,
    requiresEwayBill: false
  }),
  sanitizeOrderRecord({
    id: 'ORD-2026-9002',
    customerName: 'Larsen & Toubro',
    companyName: 'L&T Construction',
    customerEmail: 'purchase@lntecc.com',
    customerPhone: '9820012345',
    shippingAddress: 'Powai Campus, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400072',
    createdAt: '2026-08-02T11:30:00.000Z',
    paymentMode: 'PREPAID',
    paymentStatus: 'paid',
    orderStatus: 'pending',
    items: [
      {
        productId: 'dewalt-dwd024',
        productTitle: 'DeWalt Impact Drill 650W',
        quantity: 25,
        unitPrice: 3200,
        hsnCode: '8467'
      }
    ],
    taxableSubtotal: 80000,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 14400,
    totalTax: 14400,
    freightAmount: 0,
    totalAmount: 94400,
    requiresEwayBill: true
  }),
  sanitizeOrderRecord({
    id: 'OD-AS-01',
    customerName: 'Kavita Yadav',
    companyName: 'Kavita Yadav',
    customerEmail: 'yadavkavita2792@gmail.com',
    customerPhone: '8329819618',
    shippingAddress: 'Chinchwad, Pune',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411019',
    createdAt: '2026-08-02T13:53:00.000Z',
    paymentMode: 'PREPAID',
    paymentStatus: 'paid',
    orderStatus: 'pending',
    items: [
      {
        productId: '10mm-drill-chuck',
        productTitle: '10mm Drill Chuck',
        quantity: 1,
        unitPrice: 349,
        hsnCode: '8467'
      }
    ],
    taxableSubtotal: 349,
    cgstAmount: 13.96,
    sgstAmount: 13.96,
    igstAmount: 0,
    totalTax: 27.92,
    freightAmount: 0,
    totalAmount: 376.92,
    requiresEwayBill: false
  })
];

export function generateNextOrderId(): string {
  if (typeof window === 'undefined') return 'OD-AS-01';
  const current = parseInt(localStorage.getItem('abuzz_order_counter') || '0', 10) + 1;
  localStorage.setItem('abuzz_order_counter', current.toString());
  const padded = current.toString().padStart(2, '0');
  return `OD-AS-${padded}`;
}

export function clearAllOrdersData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('abuzz_admin_orders', JSON.stringify([]));
  localStorage.setItem('abuzz_orders', JSON.stringify([]));
  localStorage.setItem('abuzz_order_counter', '0');
  window.dispatchEvent(new Event('storage'));
}

export function getAdminOrders(): AdminOrderRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('abuzz_admin_orders');
  let adminOrders: AdminOrderRecord[] = [];

  if (stored !== null) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        adminOrders = parsed.map(sanitizeOrderRecord);
      }
    } catch {
      adminOrders = [];
    }
  }

  if (!adminOrders || adminOrders.length === 0) {
    adminOrders = [...INITIAL_ADMIN_ORDERS];
  } else {
    for (const initOrd of INITIAL_ADMIN_ORDERS) {
      if (!adminOrders.some(a => a.id === initOrd.id)) {
        adminOrders.push(initOrd);
      }
    }
  }

  // Auto-sync customer orders from 'abuzz_orders' into admin registry
  const customerOrdersStored = localStorage.getItem('abuzz_orders');
  if (customerOrdersStored) {
    try {
      const customerOrders = JSON.parse(customerOrdersStored);
      if (Array.isArray(customerOrders)) {
        let hasNew = false;
        for (const ord of customerOrders) {
          if (ord && ord.id && !adminOrders.some(a => a.id === ord.id)) {
            const sanitized = sanitizeOrderRecord(ord);
            adminOrders.unshift(sanitized);
            hasNew = true;
          }
        }

        if (hasNew) {
          localStorage.setItem('abuzz_admin_orders', JSON.stringify(adminOrders));
        }
      }
    } catch {
      // Ignore parse error
    }
  }

  return adminOrders.map(sanitizeOrderRecord);
}

export function saveAdminOrders(orders: AdminOrderRecord[]): void {
  if (typeof window === 'undefined') return;
  const sanitized = orders.map(sanitizeOrderRecord);
  localStorage.setItem('abuzz_admin_orders', JSON.stringify(sanitized));
}



