import { Star, Clock, Heart, Crown, Bike } from 'lucide-react';
import { Restaurant } from '../../data/mockSuperApp';
import { formatPrice } from '../../lib/utils';
import { useStore } from '../../store/useStore';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const { toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(restaurant.id);

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {restaurant.isPro && (
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-lg text-[10px] font-bold flex items-center shadow-sm">
              <Crown className="h-3 w-3 mr-1" /> PRO
            </span>
          )}
          {restaurant.isAiRecommended && (
            <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
              AI Pick 98% Match
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(restaurant.id); }}
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Delivery Time Badge */}
        <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-900 px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center dark:text-white">
          <Clock className="h-3 w-3 mr-1" /> {restaurant.deliveryTime}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg dark:text-white line-clamp-1">{restaurant.name}</h3>
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded text-xs font-bold flex items-center">
            {restaurant.rating} <Star className="h-3 w-3 ml-0.5 fill-current" />
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
          {restaurant.tags.join(' • ')}
        </div>

        <div className="flex items-center justify-between pt-3 border-t dark:border-gray-700">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Bike className="h-3 w-3 mr-1" /> $0.99 Delivery
          </div>
          {restaurant.offersPickup && (
             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">Pickup</span>
          )}
        </div>
      </div>
    </div>
  );
}
