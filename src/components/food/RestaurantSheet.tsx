import { motion } from 'framer-motion';
import { ChevronDown, Star, Clock, MapPin, Info, MessageSquare, ThumbsUp, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Restaurant, MenuItem } from '../../data/mockSuperApp';
import { formatPrice } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { useSuperAppStore } from '../../store/useSuperAppStore';

interface RestaurantSheetProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export function RestaurantSheet({ restaurant, onClose }: RestaurantSheetProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');
  const { addToFoodCart, food } = useSuperAppStore();

  // Helper to get quantity of item in cart
  const getItemQty = (itemId: string) => {
    const item = food.cart.find(i => i.item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-40 flex flex-col bg-white dark:bg-gray-900 mt-20 rounded-t-[2rem] shadow-2xl overflow-hidden"
    >
      {/* Header Image */}
      <div className="relative h-48 shrink-0">
        <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-black/50 backdrop-blur p-2 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronDown className="h-6 w-6" />
        </button>

        <div className="absolute bottom-0 inset-x-0 p-6 text-white">
          <h2 className="text-3xl font-bold mb-1">{restaurant.name}</h2>
          <div className="flex items-center gap-4 text-sm opacity-90">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {restaurant.rating} (500+)</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {restaurant.deliveryTime}</span>
            <span>• {restaurant.tags[0]}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        {['menu', 'reviews', 'info'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-4 text-sm font-bold capitalize transition-colors border-b-2 ${activeTab === tab ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-32 bg-gray-50 dark:bg-gray-900/50">
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {/* Categories (Mock) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['Popular', 'Mains', 'Sides', 'Drinks'].map((cat, i) => (
                <button key={cat} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${i === 0 ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border dark:border-gray-700'}`}>
                  {cat}
                </button>
              ))}
            </div>

            {restaurant.menu.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold dark:text-white line-clamp-1">{item.name}</h4>
                      <span className="font-bold text-green-600">{formatPrice(item.price)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{item.description}</p>
                  </div>
                  
                  <div className="flex justify-end mt-2">
                    {getItemQty(item.id) > 0 ? (
                      <div className="flex items-center bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <button className="p-1.5 hover:bg-green-100 dark:hover:bg-green-800 rounded-l-lg" onClick={() => addToFoodCart(item, restaurant.id)}>
                           <Plus className="h-4 w-4 text-green-700 dark:text-green-400" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-green-700 dark:text-green-400">{getItemQty(item.id)}</span>
                        <button className="p-1.5 hover:bg-green-100 dark:hover:bg-green-800 rounded-r-lg">
                           <Minus className="h-4 w-4 text-green-700 dark:text-green-400" />
                        </button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        className="rounded-full h-8 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-green-600 hover:text-white border-none shadow-none"
                        onClick={() => addToFoodCart(item, restaurant.id)}
                      >
                        Add <Plus className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* AI Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4" /> AI Summary
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">
                Customers love the <span className="font-bold">Spicy Burger</span> and praise the fast delivery. Some mentioned the fries could be crispier. Overall sentiment is <span className="font-bold text-green-600">Very Positive (92%)</span>.
              </p>
            </div>

            {/* Reviews List */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="border-b dark:border-gray-800 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs">JD</div>
                    <span className="font-bold text-sm dark:text-white">John Doe</span>
                  </div>
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Great food, arrived hot!</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                  <span>2 days ago</span>
                  <button className="flex items-center gap-1 hover:text-blue-500"><ThumbsUp className="h-3 w-3" /> Helpful</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h4 className="font-bold dark:text-white mb-4 flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</h4>
              <div className="h-32 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/OpenStreetMap_Logo_2011.svg/1024px-OpenStreetMap_Logo_2011.svg.png" className="w-full h-full object-cover opacity-50" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
                 </div>
              </div>
              <p className="text-sm text-gray-500">123 Food Street, Culinary District</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <h4 className="font-bold dark:text-white mb-4 flex items-center gap-2"><Info className="h-4 w-4" /> Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Opening Hours</span> <span className="dark:text-white">10:00 AM - 11:00 PM</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Cuisines</span> <span className="dark:text-white">American, Fast Food</span></div>
                <div className="flex justify-between"><span className="text-gray-500">License</span> <span className="dark:text-white">#FD-2024-8892</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
