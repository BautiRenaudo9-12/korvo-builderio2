export interface User {
  name: string;
  points: number;
  level: string;
  email: string;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  locked: boolean;
  icon: string;
}

export interface WalletCard {
  id: number;
  shop: string;
  logo: string;
  bg: string;
  stamps: number;
  total: number;
  color: string;
  lastVisit: string;
  ptsBalance: number;
  rate: string;
  cover: string;
  address: string;
  rewards: Reward[];
}

export interface Transaction {
  id: number;
  date: string;
  shop: string;
  amount: string;
  type: 'earn' | 'burn';
  item?: string;
}

export interface Shop {
  id: number;
  name: string;
  distance: string;
  rating: number;
  category: string;
  promo: string | null;
  lat: number;
  lng: number;
}

export interface NavigationHistory {
  route: string;
  params?: any;
}
