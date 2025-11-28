import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MapBackground } from '../components/ride/MapBackground';
import { MapControls } from '../components/ride/MapControls';
import { ServiceGrid } from '../components/ride/ServiceGrid';
import { BookingPanel } from '../components/ride/BookingPanel';
import { ActiveRideOverlay } from '../components/ride/ActiveRideOverlay';
import { RideSafetyModal } from '../components/ride/RideSafetyModal';
import { useSuperAppStore } from '../store/useSuperAppStore';
import { ChevronLeft, Bell, User, Search, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Ride() {
  const { ride, requestRide, cancelRide, completeRide, pay } = useSuperAppStore();
  const [viewState, setViewState] = useState<'explore' | 'booking'>('explore');
  const [subType, setSubType] = useState('Ride');
  
  // Map State
  const [mapType, setMapType] = useState<'default' | 'satellite' | 'terrain'>('default');
  const [showTraffic, setShowTraffic] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  const handleServiceSelect = (category: string, sub?: string) => {
    if (sub) {
      setSubType(sub);
      setViewState('booking');
    }
  };

  const handleBook = (destination: string, vehicleId: string) => {
    requestRide(destination, subType as any);
  };

  const handleComplete = () => {
    pay(25.00, `${subType} Trip`, 'Ride');
    completeRide();
    setTimeout(() => {
      cancelRide();
      setViewState('explore');
    }, 2000);
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-900">
      {/* 1. Immersive Map Background with Google Maps Features */}
      <MapBackground 
        mapType={mapType}
        showTraffic={showTraffic}
        show3D={show3D}
        showRoute={viewState === 'booking' || ride.status !== 'idle'}
      />

      {/* 2. Map Controls (Google Maps Style) */}
      <MapControls 
        mapType={mapType}
        setMapType={setMapType}
        showTraffic={showTraffic}
        setShowTraffic={setShowTraffic}
        show3D={show3D}
        setShow3D={setShow3D}
        onZoomIn={() => {}}
        onZoomOut={() => {}}
        onCenter={() => {}}
      />

      {/* 3. Floating Header (Search & Profile) */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 w-full max-w-md">
          {viewState === 'booking' && ride.status === 'idle' ? (
            <button 
              onClick={() => setViewState('explore')}
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            // Persistent Search Bar (Google Maps Style)
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-full shadow-lg h-12 flex items-center px-4 border border-gray-100 dark:border-gray-700">
               <Search className="w-5 h-5 text-gray-400 mr-3" />
               <input 
                 type="text" 
                 placeholder="Search here" 
                 className="bg-transparent border-none outline-none text-sm w-full dark:text-white placeholder:text-gray-500"
               />
               <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 text-xs font-bold ml-2">
                  AI
               </div>
            </div>
          )}
        </div>
        
        <div className="pointer-events-auto flex gap-3 ml-4">
          {/* Safety Shield Trigger */}
          {ride.status !== 'idle' && (
             <button 
               onClick={() => setShowSafetyModal(true)}
               className="w-12 h-12 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white hover:bg-blue-700 animate-pulse"
             >
               <Shield className="w-5 h-5" />
             </button>
          )}
          <Link to="/profile" className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* 4. Main Content Area */}
      <div className="absolute inset-0 z-10 pt-24 overflow-y-auto custom-scrollbar pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            {/* State: Explore (Service Grid) */}
            {viewState === 'explore' && ride.status === 'idle' && (
              <ServiceGrid onSelect={handleServiceSelect} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 5. Booking Panel (Bottom Sheet) */}
      <AnimatePresence>
        {viewState === 'booking' && ride.status === 'idle' && (
          <BookingPanel 
            subType={subType} 
            onBack={() => setViewState('explore')} 
            onBook={handleBook} 
          />
        )}
      </AnimatePresence>

      {/* 6. Active Ride Overlay */}
      <AnimatePresence>
        {ride.status !== 'idle' && ride.status !== 'completed' && (
          <ActiveRideOverlay 
            status={ride.status}
            driver={ride.driver}
            eta={ride.eta || 0}
            onCancel={cancelRide}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>

      {/* 7. Safety Modal */}
      <AnimatePresence>
        {showSafetyModal && <RideSafetyModal onClose={() => setShowSafetyModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
