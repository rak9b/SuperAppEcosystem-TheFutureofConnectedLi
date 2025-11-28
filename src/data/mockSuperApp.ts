import { User } from '../types';

export interface RideOption {
  id: string;
  name: string;
  category: 'Ride' | 'Parcel' | 'Freight' | 'Health' | 'Rentals' | 'Travel';
  subCategory?: 'Economy' | 'Premium' | 'Shared' | 'Special' | 'Bike' | 'Auto' | 'Luxury' | 'Hourly';
  image: string; // Icon name
  priceMultiplier: number;
  eta: number; // minutes
  description: string;
  capacity?: string;
  co2?: string; // Eco feature
}

export interface Restaurant {
  id: string;
  name: string;
  type: 'restaurant' | 'grocery' | 'pharmacy' | 'alcohol' | 'cloud_kitchen';
  image: string;
  rating: number;
  deliveryTime: string;
  tags: string[];
  menu: MenuItem[];
  isAiRecommended?: boolean;
  isPro?: boolean; // For Subscription (DashPass/Pro)
  offersPickup?: boolean;
  offersDining?: boolean; // For Zomato style reservations
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  variants?: { name: string; price: number }[];
  bulkPrice?: { qty: number; price: number }; // B2B Feature
  calories?: number; // Nutrition info
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: 'Food' | 'Ride' | 'Shop' | 'Transfer' | 'Bill' | 'Loan' | 'Savings';
  isAiFlagged?: boolean;
  method?: 'Wallet' | 'Card' | 'Bank';
}

export const RIDE_OPTIONS: RideOption[] = [
  // --- Two Wheelers ---
  { id: 'moto_bike', name: 'Moto', category: 'Ride', subCategory: 'Bike', image: 'Bike', priceMultiplier: 1.0, eta: 3, description: 'Fastest in traffic', capacity: '1', co2: '12g' },
  { id: 'scooter_electric', name: 'E-Scooter', category: 'Ride', subCategory: 'Bike', image: 'Zap', priceMultiplier: 0.9, eta: 5, description: 'Green & cheap', capacity: '1', co2: '0g' },

  // --- Three Wheelers ---
  { id: 'auto_cng', name: 'CNG / Auto', category: 'Ride', subCategory: 'Auto', image: 'CarFront', priceMultiplier: 1.3, eta: 5, description: 'Reliable 3-wheeler', capacity: '3', co2: '45g' },
  
  // --- Economy Cars ---
  { id: 'car_mini', name: 'Mini', category: 'Ride', subCategory: 'Economy', image: 'Car', priceMultiplier: 1.6, eta: 8, description: 'Compact hatchback', capacity: '4', co2: '90g' },
  { id: 'car_ac', name: 'Sedan', category: 'Ride', subCategory: 'Economy', image: 'Car', priceMultiplier: 1.9, eta: 7, description: 'Comfortable sedan', capacity: '4', co2: '110g' },
  
  // --- Shared ---
  { id: 'car_pool', name: 'Pool', category: 'Ride', subCategory: 'Shared', image: 'Users', priceMultiplier: 1.4, eta: 12, description: 'Share & save 30%', capacity: '1', co2: '40g' },

  // --- Premium ---
  { id: 'car_prime', name: 'Prime SUV', category: 'Ride', subCategory: 'Premium', image: 'Shield', priceMultiplier: 2.5, eta: 10, description: 'Spacious SUV with WiFi', capacity: '6', co2: '150g' },
  { id: 'car_lux', name: 'Lux', category: 'Ride', subCategory: 'Premium', image: 'Crown', priceMultiplier: 3.5, eta: 15, description: 'Mercedes / BMW', capacity: '4', co2: '140g' },
  
  // --- Delivery Services ---
  { id: 'del_bike', name: 'Bike Courier', category: 'Parcel', image: 'Package', priceMultiplier: 1.2, eta: 15, description: 'Small documents/packets', capacity: '5kg' },
  { id: 'del_truck', name: 'Mini Truck', category: 'Parcel', image: 'Truck', priceMultiplier: 3.0, eta: 45, description: 'Furniture & moving', capacity: '500kg' },
];

export const RESTAURANTS: Restaurant[] = [
  // Food
  {
    id: 'r1',
    name: 'Burger King',
    type: 'restaurant',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=60',
    rating: 4.5,
    deliveryTime: '25-35 min',
    tags: ['Burger', 'American', 'Fast Food'],
    isAiRecommended: true,
    isPro: true,
    offersPickup: true,
    offersDining: true,
    menu: [
      { id: 'm1', name: 'Whopper Meal', price: 12.99, description: 'Flame-grilled beef patty with fries and drink.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=60', variants: [{ name: 'Regular', price: 12.99 }, { name: 'Large', price: 14.99 }], calories: 850 },
      { id: 'm2', name: 'Chicken Royale', price: 10.99, description: 'Crispy chicken breast with lettuce and mayo.', image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?auto=format&fit=crop&w=200&q=60', calories: 600 }
    ]
  },
  {
    id: 'r2',
    name: 'Sushi Master',
    type: 'restaurant',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60',
    rating: 4.8,
    deliveryTime: '40-50 min',
    tags: ['Japanese', 'Sushi', 'Healthy'],
    isPro: true,
    offersDining: true,
    menu: [
      { id: 'm3', name: 'Salmon Platter', price: 24.99, description: '12 pieces of fresh salmon sushi and sashimi.', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=200&q=60', calories: 450 }
    ]
  },
  // Cloud Kitchen (Deliveroo Edition)
  {
    id: 'ck1',
    name: 'The Bowl Company',
    type: 'cloud_kitchen',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60',
    rating: 4.2,
    deliveryTime: '20-30 min',
    tags: ['Bowls', 'Healthy', 'Delivery Only'],
    isPro: false,
    offersPickup: false,
    menu: [
      { id: 'ck_m1', name: 'Teriyaki Chicken Bowl', price: 14.50, description: 'Rice, chicken, edamame, and sauce.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=60', calories: 550 }
    ]
  },
  // Alcohol (Postmates/Glovo)
  {
    id: 'alc1',
    name: 'Cheers Cellar',
    type: 'alcohol',
    image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=500&q=60',
    rating: 4.9,
    deliveryTime: '45 min',
    tags: ['Wine', 'Beer', 'Spirits', '21+'],
    isPro: true,
    offersPickup: true,
    menu: [
      { id: 'a_m1', name: 'Cabernet Sauvignon', price: 29.99, description: 'Aged red wine, vintage 2018.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=200&q=60' },
      { id: 'a_m2', name: 'Craft IPA 6-Pack', price: 15.99, description: 'Local brewery IPA.', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=60' }
    ]
  },
  // Grocery (Mart)
  {
    id: 'g1',
    name: 'Super Mart',
    type: 'grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=60',
    rating: 4.6,
    deliveryTime: '15-20 min',
    tags: ['Groceries', 'Fresh', 'Essentials'],
    menu: [
      { id: 'g_m1', name: 'Fresh Milk (1L)', price: 2.50, description: 'Organic whole milk.', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=200&q=60', bulkPrice: { qty: 10, price: 2.00 } },
      { id: 'g_m2', name: 'Eggs (Dozen)', price: 4.99, description: 'Free-range large eggs.', image: 'https://images.unsplash.com/photo-1582722878654-02fd2358ea2c?auto=format&fit=crop&w=200&q=60' }
    ]
  },
  // Pharmacy
  {
    id: 'ph1',
    name: 'HealthPlus Pharma',
    type: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=500&q=60',
    rating: 4.9,
    deliveryTime: '30 min',
    tags: ['Medicine', 'Healthcare', 'Personal Care'],
    menu: [
      { id: 'p_m1', name: 'Paracetamol 500mg', price: 5.99, description: 'Pain reliever and fever reducer.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=60' },
      { id: 'p_m2', name: 'Vitamin C 1000mg', price: 12.50, description: 'Immune system support.', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=200&q=60' }
    ]
  }
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', title: 'Top Up', amount: 500.00, date: '2024-03-15', type: 'credit', category: 'Transfer', method: 'Bank' },
  { id: 't2', title: 'Burger King', amount: 12.99, date: '2024-03-14', type: 'debit', category: 'Food', method: 'Wallet' },
  { id: 't3', title: 'Ride to Office', amount: 8.50, date: '2024-03-13', type: 'debit', category: 'Ride', method: 'Wallet' },
  { id: 't4', title: 'Electricity Bill', amount: 45.00, date: '2024-03-12', type: 'debit', category: 'Bill', method: 'Wallet' },
];
