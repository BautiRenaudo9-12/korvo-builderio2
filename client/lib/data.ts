import { User, WalletCard, Transaction, Shop } from '@/types';

export const mockUser: User = {
  name: 'Alex',
  points: 2450,
  level: 'Oro',
  email: 'alex.design@korvo.app',
};

export const mockWalletCards: WalletCard[] = [
  {
    id: 1,
    shop: 'Dark Roast Lab',
    logo: 'lucide:coffee',
    bg: 'from-neutral-800 to-neutral-900',
    stamps: 7,
    total: 10,
    color: '#F59E0B',
    lastVisit: '2 horas',
    ptsBalance: 350,
    rate: '$1000 = 10 pts',
    cover: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop',
    address: 'Av. Amsterdam 120, Hipódromo',
    rewards: [
      { id: 'r1', name: 'Muffin Arándanos', cost: 300, locked: false, icon: 'lucide:cookie' },
      { id: 'r2', name: 'Espresso Doble', cost: 400, locked: true, icon: 'lucide:cup-soda' },
      { id: 'r3', name: 'Café Latte', cost: 500, locked: true, icon: 'lucide:coffee' },
      { id: 'r4', name: 'Bagel Salmón', cost: 1200, locked: true, icon: 'lucide:croissant' },
    ],
  },
  {
    id: 2,
    shop: 'Matcha & Co.',
    logo: 'lucide:leaf',
    bg: 'from-emerald-900/40 to-neutral-900',
    stamps: 3,
    total: 8,
    color: '#10B981',
    lastVisit: '2 días',
    ptsBalance: 120,
    rate: '$1000 = 8 pts',
    cover: 'https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?q=80&w=1000&auto=format&fit=crop',
    address: 'Colima 300, Roma Norte',
    rewards: [
      { id: 'r1', name: 'Té Verde', cost: 200, locked: false, icon: 'lucide:cup-soda' },
      { id: 'r2', name: 'Matcha Latte', cost: 600, locked: true, icon: 'lucide:leaf' },
    ],
  },
  {
    id: 3,
    shop: 'Velvet Bakery',
    logo: 'lucide:croissant',
    bg: 'from-rose-900/40 to-neutral-900',
    stamps: 9,
    total: 12,
    color: '#F43F5E',
    lastVisit: '1 semana',
    ptsBalance: 890,
    rate: '$1000 = 12 pts',
    cover: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1000&auto=format&fit=crop',
    address: 'Mazatlán 20, Condesa',
    rewards: [
      { id: 'r1', name: 'Croissant', cost: 400, locked: false, icon: 'lucide:croissant' },
      { id: 'r2', name: 'Tarta de Fresa', cost: 800, locked: false, icon: 'lucide:cake-slice' },
    ],
  },
];

export const mockTransactions: Transaction[] = [
  { id: 1, date: 'Ayer 14:30', shop: 'Dark Roast Lab', amount: '+120 pts', type: 'earn' },
  { id: 2, date: 'Ayer 14:35', shop: 'Dark Roast Lab', amount: '-500 pts', type: 'burn', item: 'Café Latte' },
  { id: 3, date: 'Lunes', shop: 'Velvet Bakery', amount: '+50 pts', type: 'earn' },
  { id: 4, date: '05 Oct', shop: 'Matcha & Co.', amount: '+200 pts', type: 'earn' },
  { id: 5, date: '01 Oct', shop: 'Nomad Coffee', amount: '-300 pts', type: 'burn', item: 'Muffin' },
];

export const mockExploreShops: Shop[] = [
  { id: 101, name: 'Nomad Coffee', distance: '0.4 km', rating: 4.9, category: 'Café', promo: '2x1 Lattes', lat: 19.435, lng: -99.135 },
  { id: 102, name: 'Urban Roots', distance: '1.2 km', rating: 4.7, category: 'Saludable', promo: null, lat: 19.428, lng: -99.14 },
  { id: 103, name: 'Midnight Brew', distance: '2.1 km', rating: 4.8, category: 'Café', promo: 'Pan Gratis', lat: 19.438, lng: -99.125 },
];
