import { motion } from 'framer-motion';
import { X, Bot } from 'lucide-react';

interface HologramProps {
  onClose: () => void;
}

export function HologramSupport({ onClose }: HologramProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-video">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white z-50">
          <X className="h-8 w-8" />
        </button>
        
        {/* Hologram Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 overflow-hidden">
           {/* Light Beam */}
           <div className="absolute bottom-0 w-32 h-1/2 bg-gradient-to-t from-blue-500/50 to-transparent blur-2xl"></div>
           
           {/* Avatar */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             className="relative z-10 flex flex-col items-center"
           >
             <div className="w-32 h-32 rounded-full border-2 border-blue-400/50 bg-blue-900/30 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] backdrop-blur-sm animate-pulse">
               <Bot className="h-16 w-16 text-blue-200" />
             </div>
             <div className="mt-8 text-center space-y-2">
               <h2 className="text-2xl font-bold text-blue-100 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                 AI Hologram Assistant
               </h2>
               <p className="text-blue-200/80 text-sm max-w-xs mx-auto">
                 "I am analyzing your request. Accessing global inventory and logistics network..."
               </p>
             </div>
           </motion.div>

           {/* Floating Data Particles */}
           {[...Array(10)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1 h-1 bg-blue-400 rounded-full"
               initial={{ x: 0, y: 0, opacity: 0 }}
               animate={{ 
                 x: (Math.random() - 0.5) * 300, 
                 y: -300 - Math.random() * 200, 
                 opacity: [0, 1, 0] 
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 2 + Math.random() * 2,
                 delay: Math.random() * 2 
               }}
             />
           ))}
        </div>
      </div>
    </div>
  );
}
