import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem, Restaurant, Transaction } from '../data/mockSuperApp';

interface RideState {
  status: 'idle' | 'searching' | 'arriving' | 'in-progress' | 'completed';
  driver?: { name: string; rating: number; vehicle: string; plate: string; verified: boolean };
  eta?: number;
  destination?: string;
  type?: 'Ride' | 'Parcel' | 'Freight' | 'Health';
}

interface FoodState {
  cart: { item: MenuItem; quantity: number; restaurantId: string; variant?: string }[];
  activeOrder?: { id: string; status: 'preparing' | 'delivering' | 'delivered'; eta: number };
  isGroupOrder: boolean;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  scheduledTime: string | null; // ISO string
  isProMember: boolean; // SuperEats Pro / DashPass
  isCorporate: boolean; // Corporate Account Mode
}

interface Investment {
  id: string;
  symbol: string;
  name: string;
  amount: number; // Quantity held
  currentPrice: number;
  type: 'stock' | 'crypto' | 'fund';
}

interface WalletState {
  balance: number;
  savings: number;
  loanDue: number;
  creditScore: number;
  points: number;
  transactions: Transaction[];
  investments: Investment[];
  cards: { id: string; type: 'visa' | 'mastercard'; last4: string; expiry: string; balance?: number }[];
  insurancePolicies: { id: string; type: 'Health' | 'Vehicle' | 'Life'; status: 'Active' | 'Expired'; expiry: string }[];
}

interface SuperAppState {
  ride: RideState;
  food: FoodState;
  wallet: WalletState;

  // Ride Actions
  requestRide: (destination: string, type: 'Ride' | 'Parcel' | 'Freight' | 'Health') => void;
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
}

export const useSuperAppStore = create<SuperAppState>()(
  persist(
    (set, get) => ({
      ride: { status: 'idle' },
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
        transactions: [],
        investments: [
          { id: 'inv1', symbol: 'AAPL', name: 'Apple Inc.', amount: 5, currentPrice: 175.50, type: 'stock' },
          { id: 'inv2', symbol: 'BTC', name: 'Bitcoin', amount: 0.05, currentPrice: 65000.00, type: 'crypto' }
        ],
        cards: [
          { id: 'c1', type: 'visa', last4: '4242', expiry: '12/28' },
          { id: 'c2', type: 'mastercard', last4: '8899', expiry: '09/26' }
        ],
        insurancePolicies: [
          { id: 'ins1', type: 'Health', status: 'Active', expiry: '2025-12-31' }
        ]
      },

      requestRide: (destination, type) => {
        set({ ride: { status: 'searching', destination, type } });
        setTimeout(() => {
          set({ 
            ride: { 
              status: 'arriving', 
              destination,
              type,
              driver: { name: 'Michael Knight', rating: 4.9, vehicle: type === 'Parcel' ? 'Delivery Van' : 'Tesla Model 3', plate: 'AI-9000', verified: true },
              eta: 4
            } 
          });
        }, 3000);
      },
      cancelRide: () => set({ ride: { status: 'idle' } }),
      completeRide: () => set({ ride: { status: 'completed' } }),

      addToFoodCart: (item, restaurantId, variant) => {
        const { food } = get();
        const isSameRestaurant = food.cart.length === 0 || food.cart[0].restaurantId === restaurantId;
        
        if (!isSameRestaurant) {
          if (!confirm("Start a new basket? Adding items from a new place will clear your current cart.")) return;
          set({ food: { ...food, cart: [{ item, quantity: 1, restaurantId, variant }] } });
          return;
        }

        const existing = food.cart.find(i => i.item.id === item.id && i.variant === variant);
        if (existing) {
          set({
            food: {
              ...food,
              cart: food.cart.map(i => (i.item.id === item.id && i.variant === variant) ? { ...i, quantity: i.quantity + 1 } : i)
            }
          });
        } else {
          set({ food: { ...food, cart: [...food.cart, { item, quantity: 1, restaurantId, variant }] } });
        }
      },
      clearFoodCart: () => set({ food: { ...get().food, cart: [] } }),
      placeFoodOrder: () => {
        set({ 
          food: { 
            ...get().food,
            cart: [], 
            activeOrder: { id: 'ord-' + Date.now(), status: 'preparing', eta: 25 } 
          } 
        });
      },
      toggleGroupOrder: () => set(state => ({ food: { ...state.food, isGroupOrder: !state.food.isGroupOrder } })),
      setFoodOrderType: (type) => set(state => ({ food: { ...state.food, orderType: type } })),
      setFoodScheduledTime: (time) => set(state => ({ food: { ...state.food, scheduledTime: time } })),
      toggleProMember: () => set(state => ({ food: { ...state.food, isProMember: !state.food.isProMember } })),
      toggleCorporateMode: () => set(state => ({ food: { ...state.food, isCorporate: !state.food.isCorporate } })),

      topUpWallet: (amount) => set(state => ({ 
        wallet: { 
          ...state.wallet,
          balance: state.wallet.balance + amount,
          transactions: [{
            id: Date.now().toString(),
            title: 'Wallet Top Up',
            amount,
            date: new Date().toISOString().split('T')[0],
            type: 'credit',
            category: 'Transfer',
            method: 'Bank'
          }, ...state.wallet.transactions]
        } 
      })),
      
      pay: (amount, title, category) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        
        set(state => ({
          wallet: {
            ...state.wallet,
            balance: state.wallet.balance - amount,
            points: state.wallet.points + Math.floor(amount * 0.1), // 10% points
            transactions: [{
              id: Date.now().toString(),
              title,
              amount,
              date: new Date().toISOString().split('T')[0],
              type: 'debit',
              category,
              method: 'Wallet'
            }, ...state.wallet.transactions]
          }
        }));
        return true;
      },

      sendMoney: (amount, recipient, isCrossBorder = false) => {
        const { wallet } = get();
        const fee = isCrossBorder ? amount * 0.02 : 0;
        const total = amount + fee;
        
        if (wallet.balance < total) return false;
        set(state => ({
          wallet: {
            ...state.wallet,
            balance: state.wallet.balance - total,
            transactions: [{
              id: Date.now().toString(),
              title: isCrossBorder ? `Remittance to ${recipient}` : `Sent to ${recipient}`,
              amount: total,
              date: new Date().toISOString().split('T')[0],
              type: 'debit',
              category: 'Transfer',
              method: 'Wallet'
            }, ...state.wallet.transactions]
          }
        }));
        return true;
      },

      requestMoney: (amount, from) => {
        // Simulation only
        alert(`Request for $${amount} sent to ${from}`);
      },

      payBill: (amount, billType) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        set(state => ({
          wallet: {
            ...state.wallet,
            balance: state.wallet.balance - amount,
            transactions: [{
              id: Date.now().toString(),
              title: `${billType} Bill`,
              amount,
              date: new Date().toISOString().split('T')[0],
              type: 'debit',
              category: 'Bill',
              method: 'Wallet'
            }, ...state.wallet.transactions]
          }
        }));
        return true;
      },

      takeLoan: (amount, type) => set(state => ({
        wallet: {
          ...state.wallet,
          balance: state.wallet.balance + amount,
          loanDue: state.wallet.loanDue + amount * (type === 'BNPL' ? 1 : 1.05),
          transactions: [{
            id: Date.now().toString(),
            title: type === 'BNPL' ? 'BNPL Credit' : 'Personal Loan',
            amount,
            date: new Date().toISOString().split('T')[0],
            type: 'credit',
            category: 'Loan',
            method: 'Bank'
          }, ...state.wallet.transactions]
        }
      })),

      addToSavings: (amount) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        set(state => ({
          wallet: {
            ...state.wallet,
            balance: state.wallet.balance - amount,
            savings: state.wallet.savings + amount,
            transactions: [{
              id: Date.now().toString(),
              title: 'Deposit to Savings',
              amount,
              date: new Date().toISOString().split('T')[0],
              type: 'debit',
              category: 'Savings',
              method: 'Wallet'
            }, ...state.wallet.transactions]
          }
        }));
        return true;
      },

      invest: (amount, symbol, name, type) => {
        const { wallet } = get();
        if (wallet.balance < amount) return false;
        
        // Calculate quantity based on mock price (simplified)
        const price = type === 'stock' ? 150 : 60000; 
        const qty = amount / price;

        set(state => ({
          wallet: {
            ...state.wallet,
            balance: state.wallet.balance - amount,
            investments: [...state.wallet.investments, { id: Date.now().toString(), symbol, name, amount: qty, currentPrice: price, type }],
            transactions: [{
              id: Date.now().toString(),
              title: `Bought ${symbol}`,
              amount,
              date: new Date().toISOString().split('T')[0],
              type: 'debit',
              category: 'Shop', // Investment category
              method: 'Wallet'
            }, ...state.wallet.transactions]
          }
        }));
        return true;
      },

      buyInsurance: (type, premium) => {
        const { wallet } = get();
        if (wallet.balance < premium) return false;
        
        set(state => ({
          wallet: {
            ...state.wallet,
            balance: state.wallet.balance - premium,
            insurancePolicies: [...state.wallet.insurancePolicies, { id: Date.now().toString(), type, status: 'Active', expiry: '2025-12-31' }],
            transactions: [{
              id: Date.now().toString(),
              title: `${type} Insurance Premium`,
              amount: premium,
              date: new Date().toISOString().split('T')[0],
              type: 'debit',
              category: 'Bill',
              method: 'Wallet'
            }, ...state.wallet.transactions]
          }
        }));
        return true;
      },

      addCard: (type, last4) => set(state => ({
        wallet: {
          ...state.wallet,
          cards: [...state.wallet.cards, { id: Date.now().toString(), type, last4, expiry: '12/29' }]
        }
      }))
    }),
    { name: 'super-app-store-v2' }
  )
);
