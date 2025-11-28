import { motion } from 'framer-motion';
import { X, Star, Leaf, Flame, Clock, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface FoodFiltersProps {
  onClose: () => void;
  onApply: (filters: any) => void;
}

export function FoodFilters({ onClose, onApply }: FoodFiltersProps) {
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);

  const toggleSelection = (list: string[], setList: any, item: string) => {
    if (list.includes(item)) setList(list.filter(i => i !== item));
    else setList([...list, item]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-bold dark:text-white">Filters & Sort</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full dark:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          {/* Sort By */}
          <section>
            <h4 className="font-bold text-sm text-gray-500 uppercase mb-3">Sort By</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'recommended', label: 'Recommended' },
                { id: 'rating', label: 'Rating' },
                { id: 'delivery_time', label: 'Delivery Time' },
                { id: 'distance', label: 'Distance' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${sortBy === opt.id ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Price Range */}
          <section>
            <h4 className="font-bold text-sm text-gray-500 uppercase mb-3">Price Range</h4>
            <div className="flex gap-2">
              {['$', '$$', '$$$', '$$$$'].map(price => (
                <button
                  key={price}
                  onClick={() => toggleSelection(priceRange, setPriceRange, price)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors ${priceRange.includes(price) ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 border-2 border-transparent'}`}
                >
                  {price}
                </button>
              ))}
            </div>
          </section>

          {/* Dietary */}
          <section>
            <h4 className="font-bold text-sm text-gray-500 uppercase mb-3">Dietary & Cuisines</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'veg', label: 'Vegetarian', icon: Leaf },
                { id: 'spicy', label: 'Spicy', icon: Flame },
                { id: 'fast', label: 'Fast Food', icon: Clock },
                { id: 'offers', label: 'Offers', icon: DollarSign },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleSelection(dietary, setDietary, item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${dietary.includes(item.id) ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="p-4 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg" onClick={() => onApply({ sortBy, priceRange, dietary })}>
            Show Results
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
