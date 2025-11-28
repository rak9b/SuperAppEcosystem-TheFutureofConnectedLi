import { useState, useEffect } from 'react';
import { Timer, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export function FlashOffer() {
  const [timeLeft, setTimeLeft] = useState({ m: 15, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s === 0) {
          if (prev.m === 0) return { m: 15, s: 0 }; // Reset
          return { m: prev.m - 1, s: 59 };
        }
        return { m: prev.m, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-4 text-white shadow-lg flex items-center justify-between max-w-md mx-auto"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Tag className="h-6 w-6" />
        </div>
        <div>
          <p className="font-bold text-lg">AI Exclusive Deal</p>
          <p className="text-xs text-red-100">50% OFF on Premium Features</p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="flex items-center gap-1 text-xs text-red-100 mb-1 justify-end">
          <Timer className="h-3 w-3" /> Expires in
        </div>
        <div className="font-mono text-2xl font-bold tabular-nums">
          {String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  );
}
