import { motion } from 'framer-motion';
import { Phone, Shield, Star, MapPin, Navigation, AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

interface ActiveRideOverlayProps {
  status: string;
  driver: any;
  eta: number;
  onCancel: () => void;
  onComplete: () => void;
}

export function ActiveRideOverlay({ status, driver, eta, onCancel, onComplete }: ActiveRideOverlayProps) {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Status Bar with Progress */}
        <div className="relative bg-gray-800 h-12 flex items-center px-6 overflow-hidden">
          {/* Progress Bar Background */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-blue-600/20"
            initial={{ width: '0%' }}
            animate={{ width: status === 'in-progress' ? '100%' : '30%' }}
            transition={{ duration: status === 'in-progress' ? 20 : 1 }}
          />
          
          <div className="relative z-10 flex justify-between w-full items-center">
             <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
               {status === 'searching' && <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />}
               {status === 'arriving' && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
               {status === 'in-progress' && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
               {status === 'searching' ? 'Connecting to Driver Network...' : status === 'arriving' ? 'Driver Arriving' : 'Heading to Destination'}
             </span>
             <span className="text-white font-mono font-bold bg-black/30 px-2 py-1 rounded text-sm">
               {Math.ceil(eta)} min
             </span>
          </div>
        </div>

        <div className="p-6">
          {status === 'searching' ? (
            <div className="flex flex-col items-center py-8">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
                <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Finding your ride...</h3>
              <p className="text-gray-400 text-sm mb-6">AI is negotiating the best rate with nearby drivers.</p>
              <Button variant="outline" onClick={onCancel} className="border-white/10 text-gray-300 hover:bg-white/5">Cancel Request</Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Driver Profile */}
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-white/20 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=60" alt="Driver" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center shadow-lg">
                    <Star className="w-3 h-3 fill-current mr-1 text-yellow-500" /> {driver?.rating}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{driver?.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-blue-400 font-medium">{driver?.vehicle}</p>
                    <span className="text-gray-600">•</span>
                    <p className="font-mono text-white bg-white/10 px-1.5 rounded text-sm">{driver?.plate}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Shield className="w-3 h-3 text-green-500" /> Verified • {driver?.phone}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none border-white/10 text-white hover:bg-white/10">
                  <MessageSquare className="w-4 h-4 mr-2" /> Chat
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none border-white/10 text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
                <Button variant="danger" className="flex-1 md:flex-none bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white">
                  <AlertTriangle className="w-4 h-4" />
                </Button>
                <Button onClick={onComplete} className="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white px-6">
                  End Trip
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
