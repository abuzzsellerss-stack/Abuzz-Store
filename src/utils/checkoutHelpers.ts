export interface CartItemMath {
  price: number;
  quantity: number;
}

/**
 * Calculates subtotal, 8% sales tax, and total.
 * Returns values rounded to 2 decimal places.
 */
export function calculateCartTotals(items: CartItemMath[]) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;
  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}

/**
 * Formats a raw digit string into groups of 4 separated by spaces.
 */
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = cleaned.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length > 0) {
    return parts.join(' ');
  } else {
    return cleaned;
  }
}

/**
 * Formats expiration digit inputs into MM/YY format.
 */
export function formatExpiry(value: string): string {
  const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
}

export interface SavedPrefillAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

export const SAVED_PREFILL_ADDRESSES: SavedPrefillAddress[] = [
  {
    id: 'addr-home',
    label: 'Home / Primary',
    name: 'Manish Yadav',
    phone: '+91 99100 88219',
    address: 'Plot 42, Sector 18, Industrial Area',
    city: 'Gurugram',
    state: 'Haryana',
    zip: '122015',
    isDefault: true
  },
  {
    id: 'addr-warehouse',
    label: 'B2B Warehouse & Site',
    name: 'Abuzz Wholesale Depot',
    phone: '+91 98112 44920',
    address: 'Phase-III, Okhla Industrial Estate',
    city: 'New Delhi',
    state: 'Delhi',
    zip: '110020'
  }
];

export interface RtoRiskAnalysis {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number; // 0 to 100
  badgeColor: string;
  message: string;
  isCodAllowed: boolean;
}

/**
 * Cashfree COD Intelligence & AI RTO Risk Assessment Engine
 */
export function calculateRtoRiskScore(pincode: string, orderTotal: number, isPhoneVerified: boolean): RtoRiskAnalysis {
  let score = 15; // Base low risk score

  // Check pincode length
  if (!pincode || pincode.length !== 6) {
    return {
      riskLevel: 'HIGH',
      score: 85,
      badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      message: 'Invalid Pincode: Verified phone OTP required for COD.',
      isCodAllowed: false
    };
  }

  // High total order amount increases RTO risk on COD
  if (orderTotal >= 15000) {
    score += 45;
  } else if (orderTotal >= 8000) {
    score += 25;
  }

  // Verified Phone OTP lowers RTO risk by 30 points
  if (isPhoneVerified) {
    score = Math.max(5, score - 30);
  } else {
    score += 20;
  }

  if (score >= 60 || orderTotal >= 20000) {
    return {
      riskLevel: 'HIGH',
      score,
      badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      message: 'High RTO Risk: COD unavailable for orders over ₹20,000. Please pay via Cashfree 1-Click Pay or UPI.',
      isCodAllowed: false
    };
  }

  if (score >= 35) {
    return {
      riskLevel: 'MEDIUM',
      score,
      badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      message: 'Moderate COD Risk: Instant Phone OTP verification active for COD dispatch.',
      isCodAllowed: true
    };
  }

  return {
    riskLevel: 'LOW',
    score,
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    message: 'Verified Low RTO Risk: Express COD shipping enabled with automated address pre-fill.',
    isCodAllowed: true
  };
}

