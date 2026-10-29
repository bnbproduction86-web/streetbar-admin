// ============================================================
// StreetBar Admin Panel - Comprehensive Mock Data Layer
// All text in Bahasa Indonesia where applicable. Prices in IDR.
// ============================================================

// --------------- Types ---------------

export interface AdminMenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'non-coffee' | 'pastry' | 'promo';
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  isPopular?: boolean;
  calories?: number;
  prepTime?: string;
  defaultTemp?: 'hot' | 'iced';
  hasTempChoice?: boolean;
  stockQuantity: number;
  isAvailable: boolean;
  costPrice: number;
  supplier: string;
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  manager: string;
  isActive: boolean;
  openHour: string;
  closeHour: string;
  type: 'hub' | 'commissary' | 'warehouse';
}

export interface CartUnit {
  id: string;
  code: string;
  baristaName: string;
  baristaTitle: string;
  phone: string;
  rating: number;
  totalOrders: number;
  lat: number;
  lng: number;
  battery: number;
  speedKmh: number;
  status: 'active' | 'idle' | 'offline' | 'maintenance';
  cupsRemaining: number;
  locationName: string;
  lastMaintenance: string;
  nextMaintenance: string;
  assignedOutlet: string;
}

export interface PromoVoucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrder: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface MediaPromo {
  id: string;
  title: string;
  type: 'banner' | 'story' | 'push_notification';
  imageUrl: string;
  targetUrl: string;
  placement: 'home_banner' | 'splash' | 'in_app';
  startDate: string;
  endDate: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'ewallet' | 'bank_transfer' | 'qris' | 'cod';
  provider: string;
  apiKey: string;
  isActive: boolean;
  fee: number;
  icon: string;
}

export interface MapsConfig {
  provider: string;
  apiKey: string;
  isActive: boolean;
  quotaUsed: number;
  quotaLimit: number;
}

export interface TransactionItem {
  name: string;
  qty: number;
  price: number;
}

export interface Transaction {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  items: TransactionItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  outletId: string;
  cartUnitId: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  activeCartUnits: number;
  newCustomers: number;
  returningCustomers: number;
}

export interface StockItem {
  menuItemId: string;
  menuItemName: string;
  outletId: string;
  outletName: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastRestocked: string;
  status: 'ok' | 'low' | 'out';
}

// --------------- Mock Data ---------------

// ===== MENU ITEMS =====
export const menuItems: AdminMenuItem[] = [
  {
    id: 'menu-001',
    name: 'StreetBar Signature Gold Latte',
    category: 'coffee',
    description: 'Latte premium dengan sentuhan gold leaf dan susu pilihan, racikan khas StreetBar.',
    price: 15000,
    image: '/images/menu/gold-latte.jpg',
    badge: 'Best Seller',
    isPopular: true,
    calories: 180,
    prepTime: '4 menit',
    defaultTemp: 'hot',
    hasTempChoice: true,
    stockQuantity: 320,
    isAvailable: true,
    costPrice: 5200,
    supplier: 'PT Kopi Nusantara Abadi',
  },
  {
    id: 'menu-002',
    name: 'Velvet Aren Espresso',
    category: 'coffee',
    description: 'Espresso bold dipadu gula aren premium dari Sulawesi, creamy dan aromatic.',
    price: 12000,
    image: '/images/menu/velvet-aren.jpg',
    isPopular: true,
    calories: 150,
    prepTime: '3 menit',
    defaultTemp: 'hot',
    hasTempChoice: true,
    stockQuantity: 280,
    isAvailable: true,
    costPrice: 4100,
    supplier: 'PT Kopi Nusantara Abadi',
  },
  {
    id: 'menu-003',
    name: 'Citrus Gold Cold Brew',
    category: 'coffee',
    description: 'Cold brew 18 jam dengan infusi citrus segar dan madu gold, menyegarkan sepanjang hari.',
    price: 14000,
    image: '/images/menu/citrus-cold-brew.jpg',
    badge: 'New',
    isPopular: false,
    calories: 120,
    prepTime: '2 menit',
    defaultTemp: 'iced',
    hasTempChoice: false,
    stockQuantity: 150,
    isAvailable: true,
    costPrice: 4800,
    supplier: 'PT Kopi Nusantara Abadi',
  },
  {
    id: 'menu-004',
    name: 'Oatside Royal Street Latte',
    category: 'coffee',
    description: 'Kolaborasi eksklusif dengan Oatside, oat milk latte creamy dengan hint vanilla.',
    price: 18000,
    image: '/images/menu/oatside-latte.jpg',
    badge: 'Kolaborasi',
    isPopular: true,
    calories: 200,
    prepTime: '4 menit',
    defaultTemp: 'iced',
    hasTempChoice: true,
    stockQuantity: 200,
    isAvailable: true,
    costPrice: 6800,
    supplier: 'PT Oatside Indonesia',
  },
  {
    id: 'menu-005',
    name: 'Mont Blanc Velvet Shake',
    category: 'non-coffee',
    description: 'Milkshake premium terinspirasi Mont Blanc, perpaduan chestnut dan whipped cream.',
    price: 17000,
    image: '/images/menu/mont-blanc.jpg',
    isPopular: false,
    calories: 350,
    prepTime: '5 menit',
    defaultTemp: 'iced',
    hasTempChoice: false,
    stockQuantity: 90,
    isAvailable: true,
    costPrice: 6200,
    supplier: 'CV Dairy Fresh Supply',
  },
  {
    id: 'menu-006',
    name: 'Single Origin Americano',
    category: 'coffee',
    description: 'Biji kopi single origin dari Aceh Gayo, diseduh sempurna untuk rasa bersih dan kuat.',
    price: 10000,
    image: '/images/menu/americano.jpg',
    isPopular: true,
    calories: 15,
    prepTime: '3 menit',
    defaultTemp: 'hot',
    hasTempChoice: true,
    stockQuantity: 400,
    isAvailable: true,
    costPrice: 3200,
    supplier: 'PT Kopi Nusantara Abadi',
  },
  {
    id: 'menu-007',
    name: 'Royal Belgian Dark Chocolate',
    category: 'non-coffee',
    description: 'Cokelat Belgia premium, dilelehkan sempurna dengan susu full cream dan sedikit sea salt.',
    price: 14000,
    image: '/images/menu/dark-choco.jpg',
    badge: 'Favorit',
    isPopular: true,
    calories: 280,
    prepTime: '4 menit',
    defaultTemp: 'hot',
    hasTempChoice: true,
    stockQuantity: 220,
    isAvailable: true,
    costPrice: 5000,
    supplier: 'CV Dairy Fresh Supply',
  },
  {
    id: 'menu-008',
    name: 'Kyoto Gold Matcha Latte',
    category: 'non-coffee',
    description: 'Matcha ceremonial grade dari Uji, Kyoto, dipadu susu segar dan gold honey.',
    price: 15000,
    image: '/images/menu/matcha-latte.jpg',
    isPopular: true,
    calories: 220,
    prepTime: '4 menit',
    defaultTemp: 'iced',
    hasTempChoice: true,
    stockQuantity: 180,
    isAvailable: true,
    costPrice: 5500,
    supplier: 'PT Matcha House Indonesia',
  },
  {
    id: 'menu-009',
    name: 'Royal Bergamot Milk Tea',
    category: 'non-coffee',
    description: 'Earl Grey premium dengan bergamot asli, disajikan dengan susu dan boba brown sugar.',
    price: 13000,
    image: '/images/menu/bergamot-tea.jpg',
    isPopular: false,
    calories: 250,
    prepTime: '4 menit',
    defaultTemp: 'iced',
    hasTempChoice: true,
    stockQuantity: 160,
    isAvailable: true,
    costPrice: 4500,
    supplier: 'PT Matcha House Indonesia',
  },
  {
    id: 'menu-010',
    name: 'French Golden Butter Croissant',
    category: 'pastry',
    description: 'Croissant renyah berlapis mentega Prancis premium, dipanggang segar setiap hari.',
    price: 16000,
    image: '/images/menu/croissant.jpg',
    badge: 'Fresh Daily',
    isPopular: true,
    calories: 320,
    prepTime: '3 menit',
    defaultTemp: 'hot',
    hasTempChoice: false,
    stockQuantity: 60,
    isAvailable: true,
    costPrice: 5800,
    supplier: 'Boulangerie Artisan Jakarta',
  },
  {
    id: 'menu-011',
    name: 'Artisan Glazed Cinnamon Roll',
    category: 'pastry',
    description: 'Cinnamon roll artisan dengan glaze cream cheese dan taburan kayu manis Ceylon.',
    price: 15000,
    image: '/images/menu/cinnamon-roll.jpg',
    isPopular: false,
    calories: 380,
    prepTime: '3 menit',
    defaultTemp: 'hot',
    hasTempChoice: false,
    stockQuantity: 45,
    isAvailable: true,
    costPrice: 5400,
    supplier: 'Boulangerie Artisan Jakarta',
  },
];

// ===== OUTLETS =====
export const outlets: Outlet[] = [
  {
    id: 'outlet-001',
    name: 'Hub Sudirman',
    address: 'Jl. Jend. Sudirman Kav. 52-53, Senayan, Jakarta Selatan 12190',
    lat: -6.2263,
    lng: 106.8019,
    phone: '021-5278800',
    manager: 'Raka Prasetya',
    isActive: true,
    openHour: '06:00',
    closeHour: '22:00',
    type: 'hub',
  },
  {
    id: 'outlet-002',
    name: 'Commissary Kemang',
    address: 'Jl. Kemang Raya No. 18, Bangka, Jakarta Selatan 12730',
    lat: -6.2615,
    lng: 106.8132,
    phone: '021-7198234',
    manager: 'Dinda Maharani',
    isActive: true,
    openHour: '05:00',
    closeHour: '23:00',
    type: 'commissary',
  },
  {
    id: 'outlet-003',
    name: 'Gudang Cikarang',
    address: 'Kawasan Industri Jababeka II, Blok JJ No. 7, Cikarang, Bekasi 17530',
    lat: -6.3105,
    lng: 107.1476,
    phone: '021-89831456',
    manager: 'Budi Santoso',
    isActive: true,
    openHour: '07:00',
    closeHour: '17:00',
    type: 'warehouse',
  },
];

// ===== CART UNITS =====
export const cartUnits: CartUnit[] = [
  {
    id: 'cart-001',
    code: 'SB-CART-01',
    baristaName: 'Arief Wicaksono',
    baristaTitle: 'Senior Barista',
    phone: '0812-9876-5432',
    rating: 4.9,
    totalOrders: 1847,
    lat: -6.2088,
    lng: 106.8456,
    battery: 87,
    speedKmh: 12,
    status: 'active',
    cupsRemaining: 42,
    locationName: 'Menteng, Jakarta Pusat',
    lastMaintenance: '2026-10-15',
    nextMaintenance: '2026-11-15',
    assignedOutlet: 'outlet-001',
  },
  {
    id: 'cart-002',
    code: 'SB-CART-02',
    baristaName: 'Dewi Lestari',
    baristaTitle: 'Head Barista',
    phone: '0813-7654-3210',
    rating: 4.8,
    totalOrders: 2103,
    lat: -6.2244,
    lng: 106.8098,
    battery: 63,
    speedKmh: 0,
    status: 'idle',
    cupsRemaining: 28,
    locationName: 'Sudirman, Jakarta Selatan',
    lastMaintenance: '2026-10-10',
    nextMaintenance: '2026-11-10',
    assignedOutlet: 'outlet-001',
  },
  {
    id: 'cart-003',
    code: 'SB-CART-03',
    baristaName: 'Fajar Nugroho',
    baristaTitle: 'Barista',
    phone: '0857-1234-9876',
    rating: 4.7,
    totalOrders: 956,
    lat: -6.2615,
    lng: 106.8105,
    battery: 95,
    speedKmh: 8,
    status: 'active',
    cupsRemaining: 55,
    locationName: 'Kemang, Jakarta Selatan',
    lastMaintenance: '2026-10-20',
    nextMaintenance: '2026-11-20',
    assignedOutlet: 'outlet-002',
  },
  {
    id: 'cart-004',
    code: 'SB-CART-04',
    baristaName: 'Sari Rahmawati',
    baristaTitle: 'Barista',
    phone: '0878-5566-7788',
    rating: 4.6,
    totalOrders: 723,
    lat: -6.1751,
    lng: 106.8650,
    battery: 22,
    speedKmh: 0,
    status: 'offline',
    cupsRemaining: 10,
    locationName: 'Kelapa Gading, Jakarta Utara',
    lastMaintenance: '2026-09-28',
    nextMaintenance: '2026-10-28',
    assignedOutlet: 'outlet-002',
  },
];

// ===== PROMO VOUCHERS =====
export const promoVouchers: PromoVoucher[] = [
  {
    id: 'promo-001',
    code: 'STREETBAR50',
    title: 'Diskon 50% Pengguna Baru',
    description: 'Potongan 50% untuk pembelian pertama di StreetBar, maks. Rp25.000.',
    discountType: 'percent',
    discountValue: 50,
    maxDiscount: 25000,
    minOrder: 20000,
    validFrom: '2026-10-01',
    validTo: '2026-12-31',
    usageLimit: 5000,
    usedCount: 2347,
    isActive: true,
  },
  {
    id: 'promo-002',
    code: 'FREEONGKIR',
    title: 'Gratis Ongkir',
    description: 'Gratis biaya pengiriman untuk semua pesanan minimum Rp30.000.',
    discountType: 'fixed',
    discountValue: 10000,
    minOrder: 30000,
    validFrom: '2026-10-01',
    validTo: '2026-11-30',
    usageLimit: 10000,
    usedCount: 6812,
    isActive: true,
  },
  {
    id: 'promo-003',
    code: 'STREETVIP',
    title: 'VIP Member Eksklusif',
    description: 'Diskon 20% khusus member VIP StreetBar untuk semua menu.',
    discountType: 'percent',
    discountValue: 20,
    maxDiscount: 30000,
    minOrder: 0,
    validFrom: '2026-09-01',
    validTo: '2027-03-01',
    usageLimit: 2000,
    usedCount: 489,
    isActive: true,
  },
  {
    id: 'promo-004',
    code: 'PAYDAY25',
    title: 'Promo Gajian 25K',
    description: 'Potongan Rp25.000 spesial akhir bulan, berlaku untuk pembelian min. Rp50.000.',
    discountType: 'fixed',
    discountValue: 25000,
    minOrder: 50000,
    validFrom: '2026-10-25',
    validTo: '2026-10-31',
    usageLimit: 3000,
    usedCount: 1120,
    isActive: true,
  },
  {
    id: 'promo-005',
    code: 'WEEKEND15',
    title: 'Weekend Vibes 15%',
    description: 'Diskon 15% setiap akhir pekan untuk semua minuman, maks. Rp15.000.',
    discountType: 'percent',
    discountValue: 15,
    maxDiscount: 15000,
    minOrder: 15000,
    validFrom: '2026-10-01',
    validTo: '2026-12-31',
    usageLimit: 8000,
    usedCount: 3215,
    isActive: true,
  },
];

// ===== MEDIA PROMOS =====
export const mediaPromos: MediaPromo[] = [
  {
    id: 'media-001',
    title: 'Banner Utama - Gold Latte Launch',
    type: 'banner',
    imageUrl: '/images/promo/gold-latte-banner.jpg',
    targetUrl: '/menu/menu-001',
    placement: 'home_banner',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    isActive: true,
    impressions: 45820,
    clicks: 3654,
  },
  {
    id: 'media-002',
    title: 'Story - Promo Gajian Oktober',
    type: 'story',
    imageUrl: '/images/promo/payday-story.jpg',
    targetUrl: '/promo/PAYDAY25',
    placement: 'in_app',
    startDate: '2026-10-25',
    endDate: '2026-10-31',
    isActive: true,
    impressions: 12340,
    clicks: 1876,
  },
  {
    id: 'media-003',
    title: 'Banner Splash - Oatside Kolaborasi',
    type: 'banner',
    imageUrl: '/images/promo/oatside-splash.jpg',
    targetUrl: '/menu/menu-004',
    placement: 'splash',
    startDate: '2026-10-15',
    endDate: '2026-12-15',
    isActive: true,
    impressions: 31500,
    clicks: 4210,
  },
  {
    id: 'media-004',
    title: 'Push Notif - Weekend Vibes',
    type: 'push_notification',
    imageUrl: '/images/promo/weekend-push.jpg',
    targetUrl: '/promo/WEEKEND15',
    placement: 'in_app',
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    isActive: false,
    impressions: 78200,
    clicks: 9150,
  },
];

// ===== PAYMENT METHODS =====
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'pay-001',
    name: 'GoPay',
    type: 'ewallet',
    provider: 'Gojek / GoTo Financial',
    apiKey: 'gp_live_****************************a7f3',
    isActive: true,
    fee: 1.5,
    icon: 'gopay',
  },
  {
    id: 'pay-002',
    name: 'OVO',
    type: 'ewallet',
    provider: 'PT Visionet Internasional',
    apiKey: 'ovo_prod_****************************b2e1',
    isActive: true,
    fee: 1.5,
    icon: 'ovo',
  },
  {
    id: 'pay-003',
    name: 'DANA',
    type: 'ewallet',
    provider: 'PT Espay Debit Indonesia Koe',
    apiKey: 'dana_live_****************************c9d4',
    isActive: true,
    fee: 1.5,
    icon: 'dana',
  },
  {
    id: 'pay-004',
    name: 'QRIS BCA',
    type: 'qris',
    provider: 'Bank Central Asia',
    apiKey: 'qris_bca_****************************e5f8',
    isActive: true,
    fee: 0.7,
    icon: 'qris',
  },
  {
    id: 'pay-005',
    name: 'Bank Transfer BCA',
    type: 'bank_transfer',
    provider: 'Bank Central Asia',
    apiKey: 'bca_va_****************************d1a6',
    isActive: true,
    fee: 0.5,
    icon: 'bca',
  },
];

// ===== MAPS CONFIG =====
export const mapsConfig: MapsConfig = {
  provider: 'Google Maps Platform',
  apiKey: 'AIzaSy************************************xQ7w',
  isActive: true,
  quotaUsed: 18432,
  quotaLimit: 50000,
};

// ===== TRANSACTIONS =====
export const transactions: Transaction[] = [
  {
    id: 'txn-001',
    orderNumber: 'ORD-20261028-0001',
    date: '2026-10-28T08:15:00',
    customerName: 'Andi Saputra',
    items: [
      { name: 'StreetBar Signature Gold Latte', qty: 2, price: 15000 },
      { name: 'French Golden Butter Croissant', qty: 1, price: 16000 },
    ],
    subtotal: 46000,
    discount: 0,
    total: 46000,
    paymentMethod: 'GoPay',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-001',
  },
  {
    id: 'txn-002',
    orderNumber: 'ORD-20261028-0002',
    date: '2026-10-28T08:42:00',
    customerName: 'Siti Nurhaliza',
    items: [
      { name: 'Oatside Royal Street Latte', qty: 1, price: 18000 },
      { name: 'Artisan Glazed Cinnamon Roll', qty: 1, price: 15000 },
    ],
    subtotal: 33000,
    discount: 6600,
    total: 26400,
    paymentMethod: 'OVO',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-002',
  },
  {
    id: 'txn-003',
    orderNumber: 'ORD-20261028-0003',
    date: '2026-10-28T09:05:00',
    customerName: 'Budi Hartono',
    items: [
      { name: 'Single Origin Americano', qty: 3, price: 10000 },
    ],
    subtotal: 30000,
    discount: 0,
    total: 30000,
    paymentMethod: 'QRIS BCA',
    status: 'completed',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
  {
    id: 'txn-004',
    orderNumber: 'ORD-20261028-0004',
    date: '2026-10-28T09:30:00',
    customerName: 'Maya Indahsari',
    items: [
      { name: 'Kyoto Gold Matcha Latte', qty: 1, price: 15000 },
      { name: 'Royal Belgian Dark Chocolate', qty: 1, price: 14000 },
    ],
    subtotal: 29000,
    discount: 4350,
    total: 24650,
    paymentMethod: 'DANA',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-001',
  },
  {
    id: 'txn-005',
    orderNumber: 'ORD-20261028-0005',
    date: '2026-10-28T10:12:00',
    customerName: 'Rizky Firmansyah',
    items: [
      { name: 'Velvet Aren Espresso', qty: 2, price: 12000 },
      { name: 'Citrus Gold Cold Brew', qty: 1, price: 14000 },
    ],
    subtotal: 38000,
    discount: 0,
    total: 38000,
    paymentMethod: 'GoPay',
    status: 'completed',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
  {
    id: 'txn-006',
    orderNumber: 'ORD-20261028-0006',
    date: '2026-10-28T10:45:00',
    customerName: 'Putri Rahayu',
    items: [
      { name: 'Mont Blanc Velvet Shake', qty: 1, price: 17000 },
    ],
    subtotal: 17000,
    discount: 0,
    total: 17000,
    paymentMethod: 'OVO',
    status: 'pending',
    outletId: 'outlet-001',
    cartUnitId: 'cart-002',
  },
  {
    id: 'txn-007',
    orderNumber: 'ORD-20261028-0007',
    date: '2026-10-28T11:00:00',
    customerName: 'Hendri Kusuma',
    items: [
      { name: 'StreetBar Signature Gold Latte', qty: 1, price: 15000 },
      { name: 'Royal Bergamot Milk Tea', qty: 1, price: 13000 },
      { name: 'French Golden Butter Croissant', qty: 2, price: 16000 },
    ],
    subtotal: 60000,
    discount: 25000,
    total: 35000,
    paymentMethod: 'Bank Transfer BCA',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-001',
  },
  {
    id: 'txn-008',
    orderNumber: 'ORD-20261028-0008',
    date: '2026-10-28T11:35:00',
    customerName: 'Lina Marlina',
    items: [
      { name: 'Oatside Royal Street Latte', qty: 2, price: 18000 },
    ],
    subtotal: 36000,
    discount: 5400,
    total: 30600,
    paymentMethod: 'DANA',
    status: 'completed',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
  {
    id: 'txn-009',
    orderNumber: 'ORD-20261028-0009',
    date: '2026-10-28T12:10:00',
    customerName: 'Agus Prabowo',
    items: [
      { name: 'Single Origin Americano', qty: 1, price: 10000 },
      { name: 'Velvet Aren Espresso', qty: 1, price: 12000 },
    ],
    subtotal: 22000,
    discount: 0,
    total: 22000,
    paymentMethod: 'GoPay',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-002',
  },
  {
    id: 'txn-010',
    orderNumber: 'ORD-20261028-0010',
    date: '2026-10-28T12:48:00',
    customerName: 'Fitri Handayani',
    items: [
      { name: 'Kyoto Gold Matcha Latte', qty: 2, price: 15000 },
      { name: 'Artisan Glazed Cinnamon Roll', qty: 1, price: 15000 },
    ],
    subtotal: 45000,
    discount: 6750,
    total: 38250,
    paymentMethod: 'QRIS BCA',
    status: 'completed',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
  {
    id: 'txn-011',
    orderNumber: 'ORD-20261028-0011',
    date: '2026-10-28T13:05:00',
    customerName: 'Wahyu Setiawan',
    items: [
      { name: 'Citrus Gold Cold Brew', qty: 1, price: 14000 },
    ],
    subtotal: 14000,
    discount: 0,
    total: 14000,
    paymentMethod: 'OVO',
    status: 'cancelled',
    outletId: 'outlet-001',
    cartUnitId: 'cart-001',
  },
  {
    id: 'txn-012',
    orderNumber: 'ORD-20261028-0012',
    date: '2026-10-28T13:22:00',
    customerName: 'Nurul Aini',
    items: [
      { name: 'Royal Belgian Dark Chocolate', qty: 2, price: 14000 },
      { name: 'Mont Blanc Velvet Shake', qty: 1, price: 17000 },
    ],
    subtotal: 45000,
    discount: 0,
    total: 45000,
    paymentMethod: 'GoPay',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-002',
  },
  {
    id: 'txn-013',
    orderNumber: 'ORD-20261027-0045',
    date: '2026-10-27T15:30:00',
    customerName: 'Deni Suryadi',
    items: [
      { name: 'StreetBar Signature Gold Latte', qty: 1, price: 15000 },
      { name: 'Velvet Aren Espresso', qty: 1, price: 12000 },
    ],
    subtotal: 27000,
    discount: 13500,
    total: 13500,
    paymentMethod: 'DANA',
    status: 'completed',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
  {
    id: 'txn-014',
    orderNumber: 'ORD-20261027-0046',
    date: '2026-10-27T16:15:00',
    customerName: 'Rini Astuti',
    items: [
      { name: 'Oatside Royal Street Latte', qty: 1, price: 18000 },
      { name: 'French Golden Butter Croissant', qty: 1, price: 16000 },
    ],
    subtotal: 34000,
    discount: 0,
    total: 34000,
    paymentMethod: 'Bank Transfer BCA',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-001',
  },
  {
    id: 'txn-015',
    orderNumber: 'ORD-20261027-0047',
    date: '2026-10-27T17:00:00',
    customerName: 'Tomi Irawan',
    items: [
      { name: 'Single Origin Americano', qty: 2, price: 10000 },
      { name: 'Royal Bergamot Milk Tea', qty: 1, price: 13000 },
    ],
    subtotal: 33000,
    discount: 4950,
    total: 28050,
    paymentMethod: 'QRIS BCA',
    status: 'refunded',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
  {
    id: 'txn-016',
    orderNumber: 'ORD-20261027-0048',
    date: '2026-10-27T17:45:00',
    customerName: 'Yuni Kartika',
    items: [
      { name: 'Kyoto Gold Matcha Latte', qty: 1, price: 15000 },
    ],
    subtotal: 15000,
    discount: 0,
    total: 15000,
    paymentMethod: 'GoPay',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-002',
  },
  {
    id: 'txn-017',
    orderNumber: 'ORD-20261027-0049',
    date: '2026-10-27T18:30:00',
    customerName: 'Eko Prasetyo',
    items: [
      { name: 'Velvet Aren Espresso', qty: 1, price: 12000 },
      { name: 'Artisan Glazed Cinnamon Roll', qty: 2, price: 15000 },
    ],
    subtotal: 42000,
    discount: 0,
    total: 42000,
    paymentMethod: 'OVO',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-001',
  },
  {
    id: 'txn-018',
    orderNumber: 'ORD-20261027-0050',
    date: '2026-10-27T19:10:00',
    customerName: 'Citra Dewi',
    items: [
      { name: 'Royal Belgian Dark Chocolate', qty: 1, price: 14000 },
      { name: 'StreetBar Signature Gold Latte', qty: 1, price: 15000 },
    ],
    subtotal: 29000,
    discount: 5800,
    total: 23200,
    paymentMethod: 'DANA',
    status: 'completed',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
  {
    id: 'txn-019',
    orderNumber: 'ORD-20261026-0078',
    date: '2026-10-26T14:20:00',
    customerName: 'Hadi Wibowo',
    items: [
      { name: 'Citrus Gold Cold Brew', qty: 2, price: 14000 },
      { name: 'Mont Blanc Velvet Shake', qty: 1, price: 17000 },
    ],
    subtotal: 45000,
    discount: 0,
    total: 45000,
    paymentMethod: 'Bank Transfer BCA',
    status: 'completed',
    outletId: 'outlet-001',
    cartUnitId: 'cart-001',
  },
  {
    id: 'txn-020',
    orderNumber: 'ORD-20261026-0079',
    date: '2026-10-26T15:55:00',
    customerName: 'Dewi Anggraini',
    items: [
      { name: 'Oatside Royal Street Latte', qty: 1, price: 18000 },
      { name: 'Kyoto Gold Matcha Latte', qty: 1, price: 15000 },
      { name: 'French Golden Butter Croissant', qty: 1, price: 16000 },
    ],
    subtotal: 49000,
    discount: 7350,
    total: 41650,
    paymentMethod: 'GoPay',
    status: 'completed',
    outletId: 'outlet-002',
    cartUnitId: 'cart-003',
  },
];

// ===== STOCK ITEMS (per menu item × per outlet) =====
export const stockItems: StockItem[] = [
  // Hub Sudirman
  { menuItemId: 'menu-001', menuItemName: 'StreetBar Signature Gold Latte', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 120, minStock: 30, maxStock: 200, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-002', menuItemName: 'Velvet Aren Espresso', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 95, minStock: 25, maxStock: 180, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-003', menuItemName: 'Citrus Gold Cold Brew', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 50, minStock: 20, maxStock: 120, unit: 'porsi', lastRestocked: '2026-10-26', status: 'ok' },
  { menuItemId: 'menu-004', menuItemName: 'Oatside Royal Street Latte', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 70, minStock: 20, maxStock: 150, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-005', menuItemName: 'Mont Blanc Velvet Shake', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 18, minStock: 15, maxStock: 80, unit: 'porsi', lastRestocked: '2026-10-25', status: 'low' },
  { menuItemId: 'menu-006', menuItemName: 'Single Origin Americano', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 150, minStock: 40, maxStock: 250, unit: 'porsi', lastRestocked: '2026-10-28', status: 'ok' },
  { menuItemId: 'menu-007', menuItemName: 'Royal Belgian Dark Chocolate', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 80, minStock: 20, maxStock: 150, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-008', menuItemName: 'Kyoto Gold Matcha Latte', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 55, minStock: 20, maxStock: 130, unit: 'porsi', lastRestocked: '2026-10-26', status: 'ok' },
  { menuItemId: 'menu-009', menuItemName: 'Royal Bergamot Milk Tea', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 40, minStock: 15, maxStock: 100, unit: 'porsi', lastRestocked: '2026-10-26', status: 'ok' },
  { menuItemId: 'menu-010', menuItemName: 'French Golden Butter Croissant', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 12, minStock: 10, maxStock: 50, unit: 'pcs', lastRestocked: '2026-10-28', status: 'low' },
  { menuItemId: 'menu-011', menuItemName: 'Artisan Glazed Cinnamon Roll', outletId: 'outlet-001', outletName: 'Hub Sudirman', currentStock: 8, minStock: 10, maxStock: 40, unit: 'pcs', lastRestocked: '2026-10-27', status: 'low' },

  // Commissary Kemang
  { menuItemId: 'menu-001', menuItemName: 'StreetBar Signature Gold Latte', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 200, minStock: 50, maxStock: 400, unit: 'porsi', lastRestocked: '2026-10-28', status: 'ok' },
  { menuItemId: 'menu-002', menuItemName: 'Velvet Aren Espresso', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 185, minStock: 40, maxStock: 350, unit: 'porsi', lastRestocked: '2026-10-28', status: 'ok' },
  { menuItemId: 'menu-003', menuItemName: 'Citrus Gold Cold Brew', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 100, minStock: 30, maxStock: 200, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-004', menuItemName: 'Oatside Royal Street Latte', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 130, minStock: 30, maxStock: 250, unit: 'porsi', lastRestocked: '2026-10-28', status: 'ok' },
  { menuItemId: 'menu-005', menuItemName: 'Mont Blanc Velvet Shake', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 72, minStock: 20, maxStock: 150, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-006', menuItemName: 'Single Origin Americano', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 250, minStock: 60, maxStock: 400, unit: 'porsi', lastRestocked: '2026-10-28', status: 'ok' },
  { menuItemId: 'menu-007', menuItemName: 'Royal Belgian Dark Chocolate', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 140, minStock: 30, maxStock: 250, unit: 'porsi', lastRestocked: '2026-10-28', status: 'ok' },
  { menuItemId: 'menu-008', menuItemName: 'Kyoto Gold Matcha Latte', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 125, minStock: 25, maxStock: 220, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-009', menuItemName: 'Royal Bergamot Milk Tea', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 110, minStock: 20, maxStock: 180, unit: 'porsi', lastRestocked: '2026-10-27', status: 'ok' },
  { menuItemId: 'menu-010', menuItemName: 'French Golden Butter Croissant', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 48, minStock: 15, maxStock: 100, unit: 'pcs', lastRestocked: '2026-10-28', status: 'ok' },
  { menuItemId: 'menu-011', menuItemName: 'Artisan Glazed Cinnamon Roll', outletId: 'outlet-002', outletName: 'Commissary Kemang', currentStock: 37, minStock: 15, maxStock: 80, unit: 'pcs', lastRestocked: '2026-10-28', status: 'ok' },

  // Gudang Cikarang
  { menuItemId: 'menu-001', menuItemName: 'StreetBar Signature Gold Latte', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 500, minStock: 100, maxStock: 800, unit: 'porsi', lastRestocked: '2026-10-25', status: 'ok' },
  { menuItemId: 'menu-002', menuItemName: 'Velvet Aren Espresso', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 420, minStock: 80, maxStock: 700, unit: 'porsi', lastRestocked: '2026-10-25', status: 'ok' },
  { menuItemId: 'menu-003', menuItemName: 'Citrus Gold Cold Brew', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 0, minStock: 60, maxStock: 400, unit: 'porsi', lastRestocked: '2026-10-20', status: 'out' },
  { menuItemId: 'menu-004', menuItemName: 'Oatside Royal Street Latte', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 300, minStock: 60, maxStock: 500, unit: 'porsi', lastRestocked: '2026-10-25', status: 'ok' },
  { menuItemId: 'menu-005', menuItemName: 'Mont Blanc Velvet Shake', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 180, minStock: 40, maxStock: 300, unit: 'porsi', lastRestocked: '2026-10-24', status: 'ok' },
  { menuItemId: 'menu-006', menuItemName: 'Single Origin Americano', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 600, minStock: 120, maxStock: 900, unit: 'porsi', lastRestocked: '2026-10-26', status: 'ok' },
  { menuItemId: 'menu-007', menuItemName: 'Royal Belgian Dark Chocolate', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 350, minStock: 60, maxStock: 500, unit: 'porsi', lastRestocked: '2026-10-25', status: 'ok' },
  { menuItemId: 'menu-008', menuItemName: 'Kyoto Gold Matcha Latte', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 55, minStock: 50, maxStock: 400, unit: 'porsi', lastRestocked: '2026-10-22', status: 'low' },
  { menuItemId: 'menu-009', menuItemName: 'Royal Bergamot Milk Tea', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 280, minStock: 50, maxStock: 350, unit: 'porsi', lastRestocked: '2026-10-25', status: 'ok' },
  { menuItemId: 'menu-010', menuItemName: 'French Golden Butter Croissant', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 150, minStock: 30, maxStock: 200, unit: 'pcs', lastRestocked: '2026-10-26', status: 'ok' },
  { menuItemId: 'menu-011', menuItemName: 'Artisan Glazed Cinnamon Roll', outletId: 'outlet-003', outletName: 'Gudang Cikarang', currentStock: 120, minStock: 30, maxStock: 160, unit: 'pcs', lastRestocked: '2026-10-26', status: 'ok' },
];

// ===== DASHBOARD STATS =====
export const dashboardStats: DashboardStats = {
  totalRevenue: 24_850_000,
  totalOrders: 847,
  avgOrderValue: 29_340,
  activeCartUnits: 2,
  newCustomers: 126,
  returningCustomers: 389,
};
