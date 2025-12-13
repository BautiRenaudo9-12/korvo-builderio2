export interface BusinessStats {
  totalPoints: number;
  pointsEarned: number;
  pointsRedeemed: number;
  activeCustomers: number;
  totalTransactions: number;
  monthlyRevenue: number;
  rewardsClaimed: number;
  customerRetentionRate: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  image?: string;
  active: boolean;
  redeemCount: number;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  stamps: number;
  totalStamps: number;
  lastVisit: string;
  joinedAt: string;
  totalSpent: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'bonus-points';
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface TransactionLog {
  id: string;
  customerId: string;
  customerName: string;
  type: 'earn' | 'redeem';
  points: number;
  reward?: string;
  date: string;
  time: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  category: string;
  logo?: string;
  coverImage?: string;
  description: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

// Mock Statistics
export const mockBusinessStats: BusinessStats = {
  totalPoints: 8500,
  pointsEarned: 12300,
  pointsRedeemed: 3800,
  activeCustomers: 156,
  totalTransactions: 342,
  monthlyRevenue: 45000,
  rewardsClaimed: 87,
  customerRetentionRate: 72,
};

// Mock Rewards
export const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Café Gratis',
    description: 'Taza de café americano o capuchino',
    cost: 300,
    category: 'Bebidas',
    active: true,
    redeemCount: 23,
    createdAt: '2025-10-01',
  },
  {
    id: '2',
    name: 'Pastry + Café',
    description: 'Croissant o muffin con bebida caliente',
    cost: 500,
    category: 'Combos',
    active: true,
    redeemCount: 31,
    createdAt: '2025-10-05',
  },
  {
    id: '3',
    name: 'Sándwich Premium',
    description: 'Sándwich con ingredientes premium',
    cost: 800,
    category: 'Alimentos',
    active: true,
    redeemCount: 12,
    createdAt: '2025-10-15',
  },
  {
    id: '4',
    name: 'Desayuno Completo',
    description: 'Desayuno buffet completo',
    cost: 1200,
    category: 'Promocionales',
    active: true,
    redeemCount: 5,
    createdAt: '2025-11-01',
  },
  {
    id: '5',
    name: 'Bebida Especial Limitada',
    description: 'Bebida especial de temporada',
    cost: 400,
    category: 'Bebidas',
    active: false,
    redeemCount: 0,
    createdAt: '2025-11-10',
  },
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Alex García',
    email: 'alex@gmail.com',
    phone: '555-0101',
    points: 350,
    stamps: 7,
    totalStamps: 10,
    lastVisit: 'Ayer 14:30',
    joinedAt: '2025-01-15',
    totalSpent: 3200,
  },
  {
    id: 'cust-2',
    name: 'María López',
    email: 'maria@gmail.com',
    phone: '555-0102',
    points: 620,
    stamps: 8,
    totalStamps: 8,
    lastVisit: 'Hace 3 días',
    joinedAt: '2025-02-20',
    totalSpent: 5100,
  },
  {
    id: 'cust-3',
    name: 'Carlos Ruiz',
    email: 'carlos@gmail.com',
    phone: '555-0103',
    points: 180,
    stamps: 3,
    totalStamps: 10,
    lastVisit: 'Hace 1 semana',
    joinedAt: '2025-03-10',
    totalSpent: 1800,
  },
  {
    id: 'cust-4',
    name: 'Sofia Martínez',
    email: 'sofia@gmail.com',
    phone: '555-0104',
    points: 890,
    stamps: 9,
    totalStamps: 12,
    lastVisit: 'Hace 2 días',
    joinedAt: '2024-12-05',
    totalSpent: 7200,
  },
  {
    id: 'cust-5',
    name: 'Juan Flores',
    email: 'juan@gmail.com',
    phone: '555-0105',
    points: 450,
    stamps: 5,
    totalStamps: 10,
    lastVisit: 'Hace 5 días',
    joinedAt: '2025-01-30',
    totalSpent: 2900,
  },
];

// Mock Promotions
export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Descuento Black Friday',
    description: 'Todos los productos con 20% de descuento',
    discount: 20,
    type: 'percentage',
    startDate: '2025-11-15',
    endDate: '2025-11-30',
    active: true,
  },
  {
    id: 'promo-2',
    title: 'Doble puntos en bebidas',
    description: 'Gana el doble de puntos en todas las bebidas',
    discount: 0,
    type: 'bonus-points',
    startDate: '2025-11-20',
    endDate: '2025-12-05',
    active: true,
  },
  {
    id: 'promo-3',
    title: 'Compra 1 lleva 2',
    description: '$50 de descuento en compras mayores a $200',
    discount: 50,
    type: 'fixed',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    active: false,
  },
];

// Mock Transactions Log
export const mockTransactionsLog: TransactionLog[] = [
  { id: 'tx-1', customerId: 'cust-1', customerName: 'Alex García', type: 'earn', points: 120, date: 'Hoy', time: '14:30' },
  { id: 'tx-2', customerId: 'cust-2', customerName: 'María López', type: 'redeem', points: 300, reward: 'Café Gratis', date: 'Hoy', time: '12:15' },
  { id: 'tx-3', customerId: 'cust-4', customerName: 'Sofia Martínez', type: 'earn', points: 180, date: 'Ayer', time: '18:45' },
  { id: 'tx-4', customerId: 'cust-3', customerName: 'Carlos Ruiz', type: 'earn', points: 95, date: 'Ayer', time: '10:20' },
  { id: 'tx-5', customerId: 'cust-5', customerName: 'Juan Flores', type: 'redeem', points: 500, reward: 'Pastry + Café', date: '2 días atrás', time: '09:00' },
];

// Mock Business Profile
export const mockBusinessProfile: BusinessProfile = {
  id: 'biz-1',
  name: 'Dark Roast Lab',
  email: 'info@darkroastlab.com',
  phone: '+1 (555) 123-4567',
  address: 'Av. Amsterdam 120',
  city: 'Hipódromo',
  category: 'Café',
  description: 'Café artesanal con los mejores granos seleccionados de todo el mundo.',
  openingHours: {
    monday: '07:00 - 21:00',
    tuesday: '07:00 - 21:00',
    wednesday: '07:00 - 21:00',
    thursday: '07:00 - 21:00',
    friday: '07:00 - 23:00',
    saturday: '08:00 - 23:00',
    sunday: '08:00 - 20:00',
  },
};

// Chart data for dashboard
export const mockChartData = [
  { month: 'Enero', earned: 2400, redeemed: 1200, revenue: 35000 },
  { month: 'Febrero', earned: 3100, redeemed: 1800, revenue: 42000 },
  { month: 'Marzo', earned: 2800, redeemed: 1500, revenue: 38000 },
  { month: 'Abril', earned: 3900, redeemed: 2100, revenue: 48000 },
  { month: 'Mayo', earned: 4200, redeemed: 2400, revenue: 52000 },
  { month: 'Noviembre', earned: 4500, redeemed: 2800, revenue: 55000 },
];
