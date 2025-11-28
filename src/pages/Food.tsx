import { useState } from 'react';
import { 
  Search, Star, Clock, ShoppingBag, Plus, CloudRain, Box, Plane, 
  Utensils, Coffee, Pill, ShoppingCart, Users, Wine, CalendarClock, 
  MapPin, Crown, Briefcase, ChefHat, Building2, Bike
} from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { RESTAURANTS } from '../data/mockSuperApp';
import { useSuperAppStore } from '../store/useSuperAppStore';
import { useAIStore } from '../store/useAIStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Food() {
  const { 
    addToFoodCart, food, toggleGroupOrder, setFoodOrderType, 
    setFoodScheduledTime, toggleProMember, toggleCorporateMode 
  } = useSuperAppStore();
  const { weather, setWeather, isDroneAvailable } = useAIStore();
  
  const [category, setCategory] = useState<'restaurant' | 'grocery' | 'pharmacy' | 'alcohol' | 'cloud_kitchen'>('restaurant');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showTableReservation, setShowTableReservation] = useState(false);

  const cartCount = food.cart.reduce((acc, item) => acc + item.quantity, 0);
  
  // Filter Logic
  let filteredItems = RESTAURANTS.filter(r => r.type === category);
  if (food.orderType === 'pickup') {
    filteredItems = filteredItems.filter(r => r.offersPickup);
  }
  if (food.orderType === 'dine-in') {
    filteredItems = filteredItems.filter(r => r.offersDining);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <ServiceHeader 
        title={
          category === 'restaurant' ? "Super Eats" : 
          category === 'grocery' ? "Super Mart" : 
          category === 'alcohol' ? "Cheers" :
          category === 'cloud_kitchen' ? "Cloud Kitchens" : "Super Pharma"
        } 
        color={
          category === 'restaurant' ? "bg-green-600" : 
          category === 'grocery' ? "bg-orange-600" : 
          category === 'alcohol' ? "bg-purple-800" :
          category === 'cloud_kitchen' ? "bg-indigo-600" : "bg-teal-600"
        }
        actions={
          <Link to="/checkout?type=food" className="relative p-2 hover:bg-white/20 rounded-full">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        }
      />

      {/* --- GLOBAL DELIVERY TOGGLE (Uber/DoorDash Style) --- */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-14 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full flex relative">
            <div 
              className="absolute top-1 bottom-1 w-1/3 bg-white dark:bg-gray-600 rounded-full shadow-sm transition-all duration-300"
              style={{ 
                left: food.orderType === 'delivery' ? '4px' : food.orderType === 'pickup' ? '33%' : '66%' 
              }}
            />
            <button 
              onClick={() => setFoodOrderType('delivery')}
              className={`relative z-10 px-4 py-1.5 text-sm font-bold rounded-full transition-colors ${food.orderType === 'delivery' ? 'text-black dark:text-white' : 'text-gray-500'}`}
            >
              Delivery
            </button>
            <button 
              onClick={() => setFoodOrderType('pickup')}
              className={`relative z-10 px-4 py-1.5 text-sm font-bold rounded-full transition-colors ${food.orderType === 'pickup' ? 'text-black dark:text-white' : 'text-gray-500'}`}
            >
              Pickup
            </button>
            <button 
              onClick={() => setFoodOrderType('dine-in')}
              className={`relative z-10 px-4 py-1.5 text-sm font-bold rounded-full transition-colors ${food.orderType === 'dine-in' ? 'text-black dark:text-white' : 'text-gray-500'}`}
            >
              Dining
            </button>
          </div>
        </div>
      </div>

      {/* --- SUBSCRIPTION BANNER (DashPass/Pro) --- */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-2 px-4 cursor-pointer" onClick={toggleProMember}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            <span className="font-bold text-sm">
              {food.isProMember ? 'SuperEats Pro Active' : 'Get SuperEats Pro'}
            </span>
          </div>
          <span className="text-xs font-medium">
            {food.isProMember ? 'Saving $0 delivery fees' : 'Try 1 month free • $0 Delivery'}
          </span>
        </div>
      </div>

      {/* --- CATEGORY TABS --- */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { id: 'restaurant', label: 'Food', icon: Utensils, color: 'bg-green-100 text-green-600' },
            { id: 'grocery', label: 'Mart', icon: ShoppingCart, color: 'bg-orange-100 text-orange-600' },
            { id: 'alcohol', label: 'Alcohol', icon: Wine, color: 'bg-purple-100 text-purple-600' },
            { id: 'pharmacy', label: 'Pharma', icon: Pill, color: 'bg-teal-100 text-teal-600' },
            { id: 'cloud_kitchen', label: 'Kitchens', icon: ChefHat, color: 'bg-indigo-100 text-indigo-600' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setCategory(item.id as any)}
              className={`flex flex-col items-center min-w-[70px] gap-2 ${category === item.id ? 'opacity-100 scale-105' : 'opacity-60'} transition-all`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold dark:text-white">{item.label}</span>
            </button>
          ))}
        </div>

        {/* --- QUICK FILTERS & TOOLS --- */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
           <button onClick={() => setWeather(weather === 'sunny' ? 'rainy' : 'sunny')} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors ${weather === 'rainy' ? 'bg-blue-600 text-white border-blue-400' : 'bg-white dark:bg-gray-800 dark:text-white border-gray-200'}`}>
             <CloudRain className="h-3 w-3 mr-1" /> {weather === 'rainy' ? 'Rainy Mode' : 'Simulate Rain'}
           </button>
           
           <button onClick={toggleGroupOrder} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors ${food.isGroupOrder ? 'bg-purple-600 text-white border-purple-400' : 'bg-white dark:bg-gray-800 dark:text-white border-gray-200'}`}>
             <Users className="h-3 w-3 mr-1" /> Group Order {food.isGroupOrder ? 'On' : 'Off'}
           </button>

           <button onClick={() => setShowScheduleModal(true)} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors ${food.scheduledTime ? 'bg-blue-600 text-white border-blue-400' : 'bg-white dark:bg-gray-800 dark:text-white border-gray-200'}`}>
             <CalendarClock className="h-3 w-3 mr-1" /> {food.scheduledTime ? 'Scheduled' : 'Schedule'}
           </button>

           <button onClick={toggleCorporateMode} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border transition-colors ${food.isCorporate ? 'bg-slate-800 text-white border-slate-600' : 'bg-white dark:bg-gray-800 dark:text-white border-gray-200'}`}>
             <Briefcase className="h-3 w-3 mr-1" /> Corporate {food.isCorporate ? 'On' : 'Off'}
           </button>

           {isDroneAvailable && (
             <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center border border-purple-200">
               <Plane className="h-3 w-3 mr-1" /> Drone Ready
             </span>
           )}
        </div>

        {/* --- ACTIVE ORDER TRACKING --- */}
        {food.activeOrder && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4 border-green-500 mb-6 animate-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-2">
               <h3 className="font-bold text-gray-900 dark:text-white">Order in Progress</h3>
               <span className="text-green-600 font-bold text-sm">{food.activeOrder.eta + (weather === 'rainy' ? 10 : 0)} min</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
               <div className="bg-green-500 h-full w-2/3 animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Bike className="h-3 w-3 mr-1" /> Rider is on the way
              </p>
              <button className="text-xs text-blue-600 font-bold">Track on Map</button>
            </div>
          </div>
        )}

        <h2 className="font-bold text-xl mb-4 dark:text-white flex items-center gap-2">
          {food.orderType === 'pickup' ? 'Pickup near you' : 
           food.orderType === 'dine-in' ? 'Book a Table' : 
           category === 'alcohol' ? 'Drinks Delivery' : 'Restaurants & Stores'}
        </h2>
        
        {/* --- RESTAURANT LIST --- */}
        <div className="space-y-6">
          {filteredItems.map(restaurant => (
            <div key={restaurant.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border dark:border-gray-700 hover:shadow-md transition-all">
              <div className="relative h-48">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {restaurant.isPro && (
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded-md text-[10px] font-bold flex items-center shadow-sm">
                      <Crown className="h-3 w-3 mr-1" /> PRO
                    </span>
                  )}
                  {restaurant.offersPickup && food.orderType !== 'pickup' && (
                    <span className="bg-white/90 text-black px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
                      Pickup Available
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-900 dark:text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {weather === 'rainy' ? 'Delayed' : restaurant.deliveryTime}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                      {restaurant.name}
                      {restaurant.isAiRecommended && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">AI Pick</span>}
                    </h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex gap-2 mt-1">
                      {restaurant.tags.map(tag => <span key={tag}>• {tag}</span>)}
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-lg text-sm font-bold flex items-center">
                    {restaurant.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                  </div>
                </div>

                {/* Action Buttons based on Type */}
                {food.orderType === 'dine-in' ? (
                  <Button className="w-full mt-4" onClick={() => setShowTableReservation(true)}>
                    Book Table
                  </Button>
                ) : (
                  /* Menu Preview */
                  <div className="mt-4 space-y-3">
                    {restaurant.menu.map(item => (
                      <div key={item.id} className="flex items-center justify-between border-t dark:border-gray-700 pt-3">
                        <div className="flex items-center gap-3">
                          <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100" alt="" />
                          <div>
                            <p className="text-sm font-medium dark:text-white">{item.name}</p>
                            <div className="flex items-center gap-2">
                               <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{item.description}</p>
                               {item.calories && <span className="text-[10px] text-gray-400">{item.calories} kcal</span>}
                            </div>
                            <p className="text-sm font-bold mt-0.5 dark:text-gray-200">
                              {formatPrice(item.price)}
                              {food.isProMember && <span className="ml-2 text-[10px] text-yellow-600 line-through">{formatPrice(item.price * 1.1)}</span>}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0 rounded-full dark:border-gray-600 dark:text-white"
                            onClick={() => addToFoodCart(item, restaurant.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SCHEDULE MODAL --- */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="text-lg font-bold mb-4 dark:text-white">Schedule Order</h3>
              <div className="space-y-2 mb-6">
                {['Today, 12:00 PM', 'Today, 1:00 PM', 'Today, 7:00 PM', 'Tomorrow, 12:00 PM'].map(time => (
                  <button 
                    key={time}
                    onClick={() => { setFoodScheduledTime(time); setShowScheduleModal(false); }}
                    className="w-full p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    {time}
                  </button>
                ))}
              </div>
              <Button variant="outline" className="w-full" onClick={() => setShowScheduleModal(false)}>Cancel</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- TABLE RESERVATION MODAL --- */}
      <AnimatePresence>
        {showTableReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="text-lg font-bold mb-2 dark:text-white">Reserve a Table</h3>
              <p className="text-sm text-gray-500 mb-6">Book a spot at Burger King for tonight.</p>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[2, 4, 6].map(p => (
                  <button key={p} className="p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-500 dark:border-gray-600 dark:text-white">
                    {p} People
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {['7:00 PM', '7:30 PM', '8:00 PM'].map(t => (
                  <button key={t} className="p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-500 dark:border-gray-600 dark:text-white">
                    {t}
                  </button>
                ))}
              </div>

              <Button className="w-full mb-2" onClick={() => { alert("Table Reserved!"); setShowTableReservation(false); }}>Confirm Booking</Button>
              <Button variant="outline" className="w-full" onClick={() => setShowTableReservation(false)}>Cancel</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
