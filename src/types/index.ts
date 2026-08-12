export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  price: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  description: string;
  specifications: Record<string, string>;
  imageUrl: string;
  galleryImages?: string[];
  sizes?: string[];
  popularity: number; // For popularity sorting
  rating: number;
  reviewsCount: number;
  isActive?: boolean;
  seo?: ProductSEO;
  searchKeywords?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: string;
  role?: 'admin' | 'employee' | 'user';
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
