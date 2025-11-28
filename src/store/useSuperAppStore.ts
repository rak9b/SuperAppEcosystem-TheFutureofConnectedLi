import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem, Transaction } from '../data/mockSuperApp';
import { useAIStore } from './useAIStore';

// ... (RideState and FoodState interfaces remain the same)
interface RideState {
  status: 'idle' | 'searching' | 'arriving' | 'in-progress' | 'completed';
  driver?: { 
    name: string; 
    rating: number; 
    vehicle: string; 
    plate: string; 
    verified: boolean; 
    phone: string;
    location: { lat: number; lng: number };
  };
  pickup: string;
  destination: string;
  route?: {
    distance: string; 
    duration: string; 
    trafficCondition: 'Clear' | 'Moderate' | 'Heavy' | 'Gridlock';
    polyline: { x: number; y: number }[];
    alternatives?: { label: string; duration: string; priceDiff: string; type: 'fast' | 'cheap' | 'eco' }[];
  };
  eta?: number; 
  progress?: number; 
  type?: 'Ride' | 'Parcel' | 'Freight' | 'Health';
  aiSuggestions: { 
    id: string; 
    type: 'destination' | 'vehicle' | 'offer'; 
    label: string; 
    subLabel?: string;
    icon: string; 
    actionValue: string;
    reason: string;
  }[];
}

interface FoodState {
  cart: { item: MenuItem; quantity: number; restaurantId: string; variant?: string }[];
  activeOrder?: { id: string; status: 'preparing' | 'delivering' | 'delivered'; eta: number };
  isGroupOrder: boolean;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  scheduledTime: string | null;
  isProMember: boolean;
  isCorporate: boolean;
}

interface WalletState {
  balance: number;
  savings: number;
  loanDue: number;
  creditScore: number;
  points: number;
  transactions: Transaction[];
  investments: any[];
  cards: any[];
  insurancePolicies: any[];
  // Agent Specific
  agentBalance: number;
  totalCommission: number;
  agentTransactions: Transaction[];
}

interface SuperAppState {
  ride: RideState;
  food: FoodState;
  wallet: WalletState;

  // Ride Actions
  setPickup: (location: string) => void;
  setDestination: (location: string) => void;
  calculateRoute: () => void; 
  generateRideSuggestions: () => void;
  requestRide: (type: 'Ride' | 'Parcel' | 'Freight' | 'Health', vehicleId: string) => void;
  cancelRide: () => void;
  completeRide: () => void;
  
  // Food Actions
  addToFoodCart: (item: MenuItem, restaurantId: string, variant?: string) => void;
  clearFoodCart: () => void;
  placeFoodOrder: () => void;
  toggleGroupOrder: () => void;
  setFoodOrderType: (type: 'delivery' | 'pickup' | 'dine-in') => void;
  setFoodScheduledTime: (time: string | null) => void;
  toggleProMember: () => void;
  toggleCorporateMode: () => void;

  // Wallet Actions
  topUpWallet: (amount: number) => void;
  pay: (amount: number, title: string, category: Transaction['category']) => boolean;
  sendMoney: (amount: number, recipient: string, isCrossBorder?: boolean) => boolean;
  requestMoney: (amount: number, from: string) => void;
  payBill: (amount: number, billType: string) => boolean;
  takeLoan: (amount: number, type: 'BNPL' | 'Personal') => void;
  addToSavings: (amount: number) => boolean;
  invest: (amount: number, symbol: string, name: string, type: 'stock' | 'crypto') => boolean;
  buyInsurance: (type: 'Health' | 'Vehicle' | 'Life', premium: number) => boolean;
  addCard: (type: 'visa' | 'mastercard', last4: string) => void;
  
  // Agent Actions
  agentCashIn: (amount: number, userPhone: string) => void;
  agentCashOut: (amount: number, userPhone: string) => void;
}

export const useSuperAppStore = create<SuperAppState>()(
  persist(
    (set, get) => ({
      ride: { 
        status: 'idle',
        pickup: 'Current Location',
        destination: '',
        aiSuggestions: [] 
      },
      food: { 
        cart: [], 
        isGroupOrder: false,
        orderType: 'delivery',
        scheduledTime: null,
        isProMember: false,
        isCorporate: false
      },
      wallet: { 
        balance: 2450.75, 
        savings: 15000.00, 
        loanDue: 0, 
        creditScore: 780,
        points: 1250,
        transactions: [
           { id: 't1', title: 'Top Up', amount: 500.00, date: '2024-03-15', type: 'credit', category: 'Transfer', method: 'Bank' },
           { id: 't2', title: 'Burger King', amount: 12.99, date: '2024-03-14', type: 'debit', category: 'Food', method: 'Wallet' },
        ],
        investments: [],
        cards: [
          { id: 'c1', type: 'visa', last4: '4242', expiry: '12/28' },
          { id: 'c2', type: 'mastercard', last4: '8899', expiry: '09/26' }
        ],
        insurancePolicies: [],
        agentBalance: 50000,
        totalCommission: 1250,
        agentTransactions: []
      },

      // --- RIDE ACTIONS ---
      setPickup: (pickup) => set(state => ({ ride: { ...state.ride, pickup } })),
      setDestination: (destination) => set(state => ({ ride: { ...state.ride, destination } })),
      calculateRoute: () => { /* ... existing code ... */ },
      generateRideSuggestions: () => { /* ... existing code ... */ },
      requestRide: (type, vehicleId) => { /* ... existing code ... */ },
      cancelRide: () => set(state => ({ ride: { ...state.ride, status: 'idle', driver: undefined, eta: undefined, progress: 0, route: undefined, destination: '' } })),
      completeRide: () => set(state => ({ ride: { ...state.ride, status: 'completed' } })),
      
      // --- FOOD ACTIONS ---
      addToFoodCart: (item, restaurantId, variant) => { /* ... existing code ... */ },
      clearFoodCart: () => set({ food: { ...get().food, cart: [] } }),
      placeFoodOrder: () => set({ food: { ...get().food, cart: [], activeOrder: { id: 'ord-' + Date.now(), status: 'preparing', eta: 25 } } }),
      toggleGroupOrder: () => set(state => ({ food: { ...state.food, isGroupOrder: !state.food.isGroupOrder } })),
      setFoodOrderType: (type) => set(state => ({ food: { ...state.food, orderType: type } })),
      setFoodScheduledTime: (time) => set(state => ({ food: { ...state.food, scheduledTime: time } })),
      toggleProMember: () => set(state => ({ food: { ...state.food, isProMember: !state.food.isProMember } })),
      toggleCorporateMode: () => set(state => ({ food: { ...state.food, isCorporate: !state.food.isCorporate } })),

      // --- WALLET ACTIONS ---
      topUpWallet: (amount) => set(state => ({ 
        wallet: { ...state.wallet, balance: state.wallet.balance + amount, transactions: [{ id: Date.now().toString(), title: 'Wallet Top Up', amount, date: new Date().toISOString().split('T')[0], type: 'credit', category: 'Transfer', method: 'Bank' }, ...state.wallet.transactions] } 
      })),
      pay: (amount, title, category) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        set(state => ({ wallet: { ...state.wallet, balance: state.wallet.balance - amount, points: state.wallet.points + Math.floor(amount * 0.1), transactions: [{ id: Date.now().toString(), title, amount, date: new Date().toISOString().split('T')[0], type: 'debit', category, method: 'Wallet' }, ...state.wallet.transactions] } }));
        return true;
      },
      sendMoney: (amount, recipient, isCrossBorder = false) => {
        const { wallet } = get();
        const fee = isCrossBorder ? amount * 0.02 : 0;
        const total = amount + fee;
        if (wallet.balance < total) return false;
        set(state => ({ wallet: { ...state.wallet, balance: state.wallet.balance - total, transactions: [{ id: Date.now().toString(), title: isCrossBorder ? `Remittance to ${recipient}` : `Sent to ${recipient}`, amount: total, date: new Date().toISOString().split('T')[0], type: 'debit', category: 'Transfer', method: 'Wallet' }, ...state.wallet.transactions] } }));
        return true;
      },
      requestMoney: (amount, from) => alert(`Request for $${amount} sent to ${from}`),
      payBill: (amount, billType) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        set(state => ({ wallet: { ...state.wallet, balance: state.wallet.balance - amount, transactions: [{ id: Date.now().toString(), title: `${billType} Bill`, amount, date: new Date().toISOString().split('T')[0], type: 'debit', category: 'Bill', method: 'Wallet' }, ...state.wallet.transactions] } }));
        return true;
      },
      takeLoan: (amount, type) => set(state => ({ wallet: { ...state.wallet, balance: state.wallet.balance + amount, loanDue: state.wallet.loanDue + amount * (type === 'BNPL' ? 1 : 1.05), transactions: [{ id: Date.now().toString(), title: type === 'BNPL' ? 'BNPL Credit' : 'Personal Loan', amount, date: new Date().toISOString().split('T')[0], type: 'credit', category: 'Loan', method: 'Bank' }, ...state.wallet.transactions] } })),
      addToSavings: (amount) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        set(state => ({ wallet: { ...state.wallet, balance: state.wallet.balance - amount, savings: state.wallet.savings + amount, transactions: [{ id: Date.now().toString(), title: 'Deposit to Savings', amount, date: new Date().toISOString().split('T')[0], type: 'debit', category: 'Savings', method: 'Wallet' }, ...state.wallet.transactions] } }));
        return true;
      },
      invest: (amount, symbol, name, type) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        const price = type === 'stock' ? 150 : 60000; 
        const qty = amount / price;
        set(state => ({ wallet: { ...state.wallet, balance: state.wallet.balance - amount, investments: [...state.wallet.investments, { id: Date.now().toString(), symbol, name, amount: qty, currentPrice: price, type }], transactions: [{ id: Date.now().toString(), title: `Bought ${symbol}`, amount, date: new Date().toISOString().split('T')[0], type: 'debit', category: 'Shop', method: 'Wallet' }, ...state.wallet.transactions] } }));
        return true;
      },
      buyInsurance: (type, premium) => {
        const { wallet } = get();
        if (wallet.balance < premium) return false;
        set(state => ({ wallet: { ...state.wallet, balance: state.wallet.balance - premium, insurancePolicies: [...state.wallet.insurancePolicies, { id: Date.now().toString(), type, status: 'Active', expiry: '2025-12-31' }], transactions: [{ id: Date.now().toString(), title: `${type} Insurance Premium`, amount: premium, date: new Date().toISOString().split('T')[0], type: 'debit', category: 'Bill', method: 'Wallet' }, ...state.wallet.transactions] } }));
        return true;
      },
      addCard: (type, last4) => set(state => ({ wallet: { ...state.wallet, cards: [...state.wallet.cards, { id: Date.now().toString(), type, last4, expiry: '12/29' }] } })),

      // --- AGENT ACTIONS ---
      agentCashIn: (amount, userPhone) => {
        set(state => {
          const commission = amount * 0.005; // 0.5% commission
          return {
            wallet: {
              ...state.wallet,
              agentBalance: state.wallet.agentBalance - amount + commission,
              totalCommission: state.wallet.totalCommission + commission,
              agentTransactions: [{ id: Date.now().toString(), title: `Cash In to ${userPhone}`, amount, date: new Date().toISOString(), type: 'debit', category: 'Transfer' }, ...state.wallet.agentTransactions]
            }
          };
        });
      },
      agentCashOut: (amount, userPhone) => {
        set(state => {
          const commission = amount * 0.01; // 1% commission
          return {
            wallet: {
              ...state.wallet,
              agentBalance: state.wallet.agentBalance + amount + commission,
              totalCommission: state.wallet.totalCommission + commission,
              agentTransactions: [{ id: Date.now().toString(), title: `Cash Out from ${userPhone}`, amount, date: new Date().toISOString(), type: 'credit', category: 'Transfer' }, ...state.wallet.agentTransactions]
            }
          };
        });
      }
    }),
    { name: 'super-app-store-v3' }
  )
);
