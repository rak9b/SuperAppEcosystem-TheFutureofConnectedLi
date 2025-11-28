import { useState } from 'react';
import { 
  ShoppingBag, CloudRain, Users, CalendarClock, 
  Briefcase, Plane, Crown, Filter, ChevronDown, MapPin
} from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { RESTAURANTS } from '../data/mockSuperApp';
import { useSuperAppStore } from '../store/useSuperAppStore';
import { useAIStore } from '../store/useAIStore';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { FoodHero } from '../components/food/FoodHero';
import { RestaurantCard } from '../components/food/RestaurantCard';
import { AIScanFoodModal } from '../components/food/AIScanFoodModal';
import { OrderTrackingModal } from '../components/food/OrderTrackingModal';
import { FoodFilters } from '../components/food/FoodFilters';
import { RestaurantSheet } from '../components/food/RestaurantSheet';
import { FoodCartBar } from '../components/food/FoodCartBar';

export function Food() {
  const { 
    food, toggleGroupOrder, setFoodOrderType, 
    toggleProMember, toggleCorporateMode 
  } = useSuperAppStore();
  const { weather, setWeather, isDroneAvailable } = useAIStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanModal, setShowScanModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);

  // Filtering Logic
  let filteredItems = RESTAURANTS.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (food.orderType === 'pickup') {
    filteredItems = filteredItems.filter(r => r.offersPickup);
  }

  const activeRestaurant = RESTAURANTS.find(r => r.id === selectedRestaurantId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <ServiceHeader 
        title="Super Eats" 
        color="bg-green-600"
        actions={
          <Link to="/checkout?type=food" className="relative p-2 hover:bg-white/20 rounded-full">
            <ShoppingBag className="h-5 w-5" />
          </Link>
        }
      />

      {/* 1. AI Hero Section */}
      <FoodHero 
        onSearch={setSearchQuery} 
        onScan={() => setShowScanModal(true)} 
      />

      {/* 2. Delivery Toggle & Pro Banner */}
      <div className="sticky top-14 z-30 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
           {/* Toggle */}
           <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full flex">
              {['delivery', 'pickup', 'dine-in'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setFoodOrderType(type as any)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all capitalize ${food.orderType === type ? 'bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm' : 'text-gray-500'}`}
                >
                  {type}
                </button>
              ))}
           </div>
           
           {/* Filter Btn */}
           <button 
             onClick={() => setShowFilters(true)}
             className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
           >
             <Filter className="h-4 w-4" />
           </button>
        </div>
        
        {/* Pro Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-1.5 px-4 cursor-pointer" onClick={toggleProMember}>
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              <span className="font-bold text-xs">
                {food.isProMember ? 'Pro Active' : 'Get Pro'}
              </span>
            </div>
            <span className="text-[10px] font-medium">
              {food.isProMember ? 'Saving $0 delivery' : 'Try Free • $0 Delivery'}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        {/* 3. Quick Tools */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
           <button onClick={() => setWeather(weather === 'sunny' ? 'rainy' : 'sunny')} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors ${weather === 'rainy' ? 'bg-blue-600 text-white border-blue-400' : 'bg-white dark:bg-gray-800 dark:text-white border-gray-200'}`}>
             <CloudRain className="h-3 w-3 mr-1" /> {weather === 'rainy' ? 'Rainy Mode' : 'Simulate Rain'}
           </button>
           <button onClick={toggleGroupOrder} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors ${food.isGroupOrder ? 'bg-purple-600 text-white border-purple-400' : 'bg-white dark:bg-gray-800 dark:text-white border-gray-200'}`}>
             <Users className="h-3 w-3 mr-1" /> Group Order
           </button>
           <button onClick={() => alert("Schedule Modal")} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors bg-white dark:bg-gray-800 dark:text-white border-gray-200`}>
             <CalendarClock className="h-3 w-3 mr-1" /> Schedule
           </button>
           <button onClick={toggleCorporateMode} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors ${food.isCorporate ? 'bg-slate-800 text-white border-slate-600' : 'bg-white dark:bg-gray-800 dark:text-white border-gray-200'}`}>
             <Briefcase className="h-3 w-3 mr-1" /> Corporate
           </button>
           {isDroneAvailable && (
             <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border border-purple-200">
               <Plane className="h-3 w-3 mr-1" /> Drone Ready
             </span>
           )}
        </div>

        {/* 4. Active Order Banner */}
        {food.activeOrder && (
          <div 
            onClick={() => setShowTrackingModal(true)}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4 border-green-500 mb-8 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center mb-2">
               <h3 className="font-bold text-gray-900 dark:text-white">Order in Progress</h3>
               <span className="text-green-600 font-bold text-sm">{food.activeOrder.eta} min</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
               <div className="bg-green-500 h-full w-1/2 animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Preparing your meal...</p>
              <span className="text-xs text-blue-600 font-bold flex items-center">Track Order <ChevronDown className="h-3 w-3 ml-1" /></span>
            </div>
          </div>
        )}

        {/* 5. Restaurant List */}
        <h2 className="font-bold text-xl mb-4 dark:text-white flex items-center justify-between">
          <span>{searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}</span>
          <span className="text-xs font-normal text-gray-500">{filteredItems.length} places</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              onClick={() => setSelectedRestaurantId(restaurant.id)} 
            />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🤔</div>
            <h3 className="font-bold text-gray-500">No restaurants found</h3>
            <p className="text-sm text-gray-400">Try changing your filters or search term.</p>
          </div>
        )}
      </div>

      {/* 6. Overlays & Modals */}
      <AnimatePresence>
        {selectedRestaurantId && activeRestaurant && (
          <RestaurantSheet 
            restaurant={activeRestaurant} 
            onClose={() => setSelectedRestaurantId(null)} 
          />
        )}
        
        {showScanModal && (
          <AIScanFoodModal 
            onClose={() => setShowScanModal(false)} 
            onResult={(term) => { setSearchQuery(term); setShowScanModal(false); }} 
          />
        )}
        
        {showTrackingModal && food.activeOrder && (
          <OrderTrackingModal 
            onClose={() => setShowTrackingModal(false)} 
            eta={food.activeOrder.eta} 
          />
        )}

        {showFilters && (
          <FoodFilters 
            onClose={() => setShowFilters(false)}
            onApply={(filters) => {
              console.log("Filters applied:", filters);
              setShowFilters(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* 7. Floating Cart Bar */}
      <AnimatePresence>
        {food.cart.length > 0 && !selectedRestaurantId && <FoodCartBar />}
      </AnimatePresence>
    </div>
  );
}
