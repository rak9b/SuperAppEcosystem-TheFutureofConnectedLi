import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Vendor } from '../types';
import { PRODUCTS, VENDORS } from '../data/mock';

interface Address {
  id: string;
  label: string; // Home, Work
  details: string;
  isDefault: boolean;
}

interface AppState {
  // Auth & User
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  
  // Preferences
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currency: 'USD' | 'EUR' | 'GBP' | 'BDT';
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP' | 'BDT') => void;
  language: 'en' | 'es' | 'fr';
  setLanguage: (lang: 'en' | 'es' | 'fr') => void;

  addresses: Address[];
  addAddress: (address: Address) => void;
  
  // Features
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;
  
  membershipTier: 'Silver' | 'Gold' | 'Platinum';
  loyaltyPoints: number;
  addPoints: (points: number) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => { success: boolean; error?: 'VENDOR_CONFLICT' };
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  replaceCart: (product: Product, quantity?: number) => void;
  
  // Comparison
  compareList: Product[];
  addToCompare: (product: Product) => { success: boolean; error?: 'CATEGORY_MISMATCH' | 'FULL' };
  removeFromCompare: (productId: string) => void;
  
  // Recent Products
  recentProducts: Product[];
  addRecentProduct: (product: Product) => void;

  // Data (Mocked Database)
  products: Product[];
  vendors: Vendor[];
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
      language: 'en',
      setLanguage: (language) => set({ language }),

      addresses: [
        { id: 'a1', label: 'Home', details: '123 Innovation Blvd, Tech City', isDefault: true },
        { id: 'a2', label: 'Work', details: '456 Startup Lane, Silicon Valley', isDefault: false }
      ],
      addAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })),

      wishlist: [],
      toggleWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.includes(id) 
          ? state.wishlist.filter(i => i !== id) 
          : [...state.wishlist, id]
      })),

      membershipTier: 'Gold',
      loyaltyPoints: 2450,
      addPoints: (points) => set((state) => ({ loyaltyPoints: state.loyaltyPoints + points })),

      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        if (cart.length > 0 && cart[0].vendorId !== product.vendorId) {
          return { success: false, error: 'VENDOR_CONFLICT' };
        }
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
        return { success: true };
      },
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== productId) })),
      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      replaceCart: (product, quantity = 1) => {
        set({ cart: [{ ...product, quantity }] });
      },

      compareList: [],
      addToCompare: (product) => {
        const { compareList } = get();
        if (compareList.length >= 3) return { success: false, error: 'FULL' };
        if (compareList.length > 0 && compareList[0].categoryId !== product.categoryId) {
          return { success: false, error: 'CATEGORY_MISMATCH' };
        }
        if (compareList.find(p => p.id === product.id)) return { success: true };
        set({ compareList: [...compareList, product] });
        return { success: true };
      },
      removeFromCompare: (productId) =>
        set((state) => ({ compareList: state.compareList.filter(p => p.id !== productId) })),

      recentProducts: [],
      addRecentProduct: (product) => {
        set((state) => {
          const filtered = state.recentProducts.filter(p => p.id !== product.id);
          return { recentProducts: [product, ...filtered].slice(0, 10) };
        });
      },

      products: PRODUCTS,
      vendors: VENDORS,
    }),
    {
      name: 'ecommerce-storage',
      partialize: (state) => ({ 
        cart: state.cart, 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        isDarkMode: state.isDarkMode,
        wishlist: state.wishlist,
        loyaltyPoints: state.loyaltyPoints,
        addresses: state.addresses,
        currency: state.currency,
        language: state.language
      }),
    }
  )
);
