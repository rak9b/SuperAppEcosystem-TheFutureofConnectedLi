import { create } from 'zustand';

interface AIState {
  // Context
  weather: 'sunny' | 'rainy' | 'stormy';
  traffic: 'low' | 'moderate' | 'heavy';
  userMood: 'happy' | 'rushed' | 'hungry';
  
  // Toggles for Simulation
  isSurgePricing: boolean;
  isFraudDetected: boolean;
  isDroneAvailable: boolean;
  showHologram: boolean;
  
  // Actions
  setWeather: (w: 'sunny' | 'rainy' | 'stormy') => void;
  toggleSurge: () => void;
  triggerFraudAlert: () => void;
  toggleHologram: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  weather: 'sunny',
  traffic: 'moderate',
  userMood: 'happy',
  
  isSurgePricing: false,
  isFraudDetected: false,
  isDroneAvailable: true,
  showHologram: false,
  
  setWeather: (weather) => set({ weather }),
  toggleSurge: () => set((state) => ({ isSurgePricing: !state.isSurgePricing })),
  triggerFraudAlert: () => {
    set({ isFraudDetected: true });
    setTimeout(() => set({ isFraudDetected: false }), 5000);
  },
  toggleHologram: () => set((state) => ({ showHologram: !state.showHologram })),
}));
