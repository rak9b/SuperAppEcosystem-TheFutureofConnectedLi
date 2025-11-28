import { motion } from 'framer-motion';
import { X, Camera, ScanLine, Loader2, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

interface AIScanFoodModalProps {
  onClose: () => void;
  onResult: (term: string) => void;
}

export function AIScanFoodModal({ onClose, onResult }: AIScanFoodModalProps) {
  const [scanning, setScanning] = useState(true);
  const [identified, setIdentified] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
      setIdentified("Pepperoni Pizza");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    if (identified) {
      onResult(identified);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white">
          <X className="h-6 w-6" />
        </button>

        {/* Camera Viewfinder Simulation */}
        <div className="relative aspect-[3/4] bg-gray-800 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" 
            alt="Food" 
            className="w-full h-full object-cover opacity-60"
          />
          
          {/* Scanning Overlay */}
          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-64 h-64 border-2 border-blue-500 rounded-2xl relative"
                animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.5)', '0 0 0px rgba(59,130,246,0)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1"></div>
                
                <motion.div 
                  className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              </motion.div>
              <div className="absolute bottom-10 bg-black/60 px-4 py-2 rounded-full text-white flex items-center gap-2 backdrop-blur-md">
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing food...
              </div>
            </div>
          )}

          {/* Result Overlay */}
          {!scanning && identified && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <ScanLine className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">It looks like...</h3>
              <h2 className="text-3xl font-bold text-green-400 mb-6">{identified}</h2>
              
              <div className="w-full space-y-3">
                <Button onClick={handleConfirm} className="w-full bg-green-600 hover:bg-green-500 text-lg h-12">
                  <Search className="mr-2 h-5 w-5" /> Find Restaurants
                </Button>
                <Button variant="outline" onClick={() => setScanning(true)} className="w-full border-white/20 text-white hover:bg-white/10">
                  Scan Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-black p-6 flex justify-between items-center">
          <button className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700"><Camera className="h-6 w-6" /></button>
          <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full"></div>
          </div>
          <button className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden border border-gray-700">
             <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=60" className="w-full h-full object-cover opacity-50" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
