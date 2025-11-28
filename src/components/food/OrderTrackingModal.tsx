import { motion } from 'framer-motion';
import { X, Phone, MessageSquare, MapPin, Clock, CheckCircle2, Bike } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState, useEffect } from 'react';

interface OrderTrackingModalProps {
  onClose: () => void;
  eta: number;
}

export function OrderTrackingModal({ onClose, eta }: OrderTrackingModalProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p < 100 ? p + 1 : 100));
    }, 200); // Simulate progress
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Confirmed', time: '10:30 AM', done: true },
    { label: 'Preparing', time: '10:35 AM', done: progress > 20 },
    { label: 'Picked Up', time: '10:50 AM', done: progress > 50 },
    { label: 'Delivered', time: '11:10 AM', done: progress === 100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-0 md:p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white dark:bg-gray-900 w-full md:max-w-lg md:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl h-[90vh] md:h-auto flex flex-col"
      >
        {/* Map Area (Simulated) */}
        <div className="relative h-64 bg-gray-200 dark:bg-gray-800 w-full overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/OpenStreetMap_Logo_2011.svg/1024px-OpenStreetMap_Logo_2011.svg.png')] bg-cover opacity-50 grayscale"></div>
          <button onClick={onClose} className="absolute top-4 left-4 bg-white dark:bg-black p-2 rounded-full shadow-lg z-10">
            <X className="h-5 w-5 dark:text-white" />
          </button>
          
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full">
             <path d="M 100 100 Q 200 200 300 150" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="5 5" className="animate-pulse" />
          </svg>

          {/* Rider Marker */}
          <motion.div 
            className="absolute"
            animate={{ left: ['20%', '60%'], top: ['30%', '50%'] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <div className="bg-white p-1.5 rounded-full shadow-xl border-2 border-blue-500">
              <Bike className="h-5 w-5 text-blue-600" />
            </div>
            <div className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              Rider • 5 min away
            </div>
          </motion.div>
        </div>

        {/* Status Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold dark:text-white">Arriving in {eta} min</h2>
              <p className="text-gray-500 text-sm">Latest arrival by 11:15 AM</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-green-600">{Math.floor(progress)}%</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="relative pl-8 space-y-8 mb-8">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-8 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors ${step.done ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-300'}`}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-gray-300"></div>}
                </div>
                <h4 className={`font-bold text-sm ${step.done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.label}</h4>
                <p className="text-xs text-gray-500">{step.time}</p>
              </div>
            ))}
          </div>

          {/* Rider Info */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=60" alt="Rider" />
                </div>
                <div>
                   <h4 className="font-bold dark:text-white">Rahim (Rider)</h4>
                   <p className="text-xs text-gray-500">Yamaha FZ-S • 4.9 ★</p>
                </div>
             </div>
             <div className="flex gap-2">
                <button className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:bg-gray-100"><MessageSquare className="h-5 w-5 text-blue-600" /></button>
                <button className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:bg-gray-100"><Phone className="h-5 w-5 text-green-600" /></button>
             </div>
          </div>

          <Button className="w-full" variant="outline" onClick={onClose}>Close Tracking</Button>
        </div>
      </motion.div>
    </div>
  );
}
