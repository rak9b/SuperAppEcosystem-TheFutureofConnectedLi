import { Search, Mic, Camera, Sparkles, CloudRain, Sun, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAIStore } from '../../store/useAIStore';
import { useState } from 'react';

interface FoodHeroProps {
  onSearch: (query: string) => void;
  onScan: () => void;
}

export function FoodHero({ onSearch, onScan }: FoodHeroProps) {
  const { weather, userMood } = useAIStore();
  const [query, setQuery] = useState('');

  const getWeatherIcon = () => {
    switch (weather) {
      case 'rainy': return <CloudRain className="h-4 w-4 text-blue-400" />;
      case 'stormy': return <Wind className="h-4 w-4 text-gray-400" />;
      default: return <Sun className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getMoodSuggestion = () => {
    if (weather === 'rainy') return "It's raining! Perfect time for hot Ramen.";
    if (userMood === 'hungry') return "You seem hungry. Grab a heavy burger?";
    return "Discover local favorites near you.";
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 pt-6 pb-8 px-4 rounded-b-3xl shadow-sm border-b dark:border-gray-700">
      <div className="container mx-auto max-w-4xl">
        {/* AI Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-display font-bold dark:text-white">
              Craving something?
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {getWeatherIcon()} {weather.charAt(0).toUpperCase() + weather.slice(1)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Sparkles className="h-3 w-3" /> {getMoodSuggestion()}
              </span>
            </div>
          </div>
          <div className="hidden md:block">
             <img src="https://cdn-icons-png.flaticon.com/512/1046/1046751.png" alt="Food" className="w-16 h-16 opacity-80" />
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-30 group-hover:opacity-50 transition duration-500 blur"></div>
          <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-2">
            <Search className="ml-3 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search 'Spicy Burger' or 'Sushi'..."
              className="w-full px-4 py-3 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              value={query}
              onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
            />
            <div className="flex items-center gap-2 pr-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-500">
                <Mic className="h-5 w-5" />
              </button>
              <button 
                onClick={onScan}
                className="p-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors text-blue-600"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { name: 'Offers', icon: '🏷️', color: 'bg-red-50 text-red-600' },
            { name: 'Burger', icon: '🍔', color: 'bg-orange-50 text-orange-600' },
            { name: 'Pizza', icon: '🍕', color: 'bg-yellow-50 text-yellow-600' },
            { name: 'Healthy', icon: '🥗', color: 'bg-green-50 text-green-600' },
            { name: 'Asian', icon: '🍜', color: 'bg-pink-50 text-pink-600' },
            { name: 'Dessert', icon: '🍰', color: 'bg-purple-50 text-purple-600' },
          ].map((cat) => (
            <button 
              key={cat.name}
              onClick={() => onSearch(cat.name === 'Offers' ? '' : cat.name)}
              className="flex flex-col items-center gap-2 min-w-[70px] group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform ${cat.color} dark:bg-gray-700`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
