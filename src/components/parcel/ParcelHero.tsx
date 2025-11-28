import { useState } from 'react';
import { Search, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useParcelStore } from '../../store/useParcelStore';

interface ParcelHeroProps {
  onTrack: (trackingId: string) => void;
}

export function ParcelHero({ onTrack }: ParcelHeroProps) {
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) onTrack(trackingId);
  };

  return (
    <div className="relative bg-orange-600 dark:bg-orange-900 pt-12 pb-20 px-4 rounded-b-[3rem] shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

      <div className="container mx-auto max-w-4xl relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/10"
        >
          <Package className="w-4 h-4" /> Fast • Secure • Reliable
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6"
        >
          Track your package <br /> in real-time
        </motion.h1>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto relative"
        >
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex items-center">
            <Search className="ml-3 w-6 h-6 text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter Tracking ID (e.g. TRK-882910)" 
              className="flex-1 px-4 py-3 text-gray-900 outline-none font-medium placeholder:text-gray-400"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
              Track <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
