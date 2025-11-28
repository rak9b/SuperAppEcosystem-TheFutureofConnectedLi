import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ParcelStatus = 'Pending' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface ParcelLog {
  status: ParcelStatus;
  timestamp: string;
  note: string;
}

export interface Parcel {
  id: string;
  trackingId: string;
  senderId: string;
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  type: 'Document' | 'Box' | 'Fragile' | 'Electronics';
  weight: number;
  price: number;
  status: ParcelStatus;
  logs: ParcelLog[];
  createdAt: string;
  estimatedDelivery: string;
}

interface ParcelState {
  parcels: Parcel[];
  activeParcel: Parcel | null;
  
  // Actions
  createParcel: (data: Omit<Parcel, 'id' | 'trackingId' | 'status' | 'logs' | 'createdAt'>) => void;
  updateParcelStatus: (id: string, status: ParcelStatus, note?: string) => void;
  getParcelByTrackingId: (trackingId: string) => Parcel | undefined;
  cancelParcel: (id: string) => void;
  setActiveParcel: (parcel: Parcel | null) => void;
}

// Mock Initial Data
const MOCK_PARCELS: Parcel[] = [
  {
    id: 'p1',
    trackingId: 'TRK-882910',
    senderId: 'u1',
    senderName: 'John User',
    receiverName: 'Alice Smith',
    receiverPhone: '+8801711000000',
    receiverAddress: 'House 12, Road 5, Dhanmondi, Dhaka',
    type: 'Electronics',
    weight: 2.5,
    price: 150,
    status: 'In Transit',
    createdAt: '2024-03-10T10:00:00Z',
    estimatedDelivery: '2024-03-12',
    logs: [
      { status: 'Pending', timestamp: '2024-03-10T10:00:00Z', note: 'Request created' },
      { status: 'Picked Up', timestamp: '2024-03-10T14:30:00Z', note: 'Rider collected package' },
      { status: 'In Transit', timestamp: '2024-03-10T18:00:00Z', note: 'Arrived at sorting hub' }
    ]
  },
  {
    id: 'p2',
    trackingId: 'TRK-112233',
    senderId: 'u2', // Someone else
    senderName: 'Tech Store',
    receiverName: 'John User', // Current user is receiver
    receiverPhone: '+8801999999999',
    receiverAddress: '123 Innovation Blvd',
    type: 'Box',
    weight: 5.0,
    price: 300,
    status: 'Delivered',
    createdAt: '2024-03-08T09:00:00Z',
    estimatedDelivery: '2024-03-09',
    logs: [
      { status: 'Pending', timestamp: '2024-03-08T09:00:00Z', note: 'Order placed' },
      { status: 'Delivered', timestamp: '2024-03-09T11:00:00Z', note: 'Delivered to reception' }
    ]
  }
];

export const useParcelStore = create<ParcelState>()(
  persist(
    (set, get) => ({
      parcels: MOCK_PARCELS,
      activeParcel: null,

      createParcel: (data) => {
        const newParcel: Parcel = {
          ...data,
          id: `p-${Date.now()}`,
          trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'Pending',
          createdAt: new Date().toISOString(),
          logs: [{ status: 'Pending', timestamp: new Date().toISOString(), note: 'Parcel request created' }]
        };
        set((state) => ({ parcels: [newParcel, ...state.parcels] }));
      },

      updateParcelStatus: (id, status, note) => {
        set((state) => ({
          parcels: state.parcels.map((p) => {
            if (p.id === id) {
              return {
                ...p,
                status,
                logs: [...p.logs, { status, timestamp: new Date().toISOString(), note: note || `Status updated to ${status}` }]
              };
            }
            return p;
          })
        }));
      },

      cancelParcel: (id) => {
        const { updateParcelStatus } = get();
        updateParcelStatus(id, 'Cancelled', 'Request cancelled by sender');
      },

      getParcelByTrackingId: (trackingId) => {
        return get().parcels.find(p => p.trackingId === trackingId);
      },

      setActiveParcel: (parcel) => set({ activeParcel: parcel })
    }),
    {
      name: 'parcel-storage'
    }
  )
);
