import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Clock, Users, Zap, Search, Briefcase, Home, Sparkles, CloudRain, Tag, MapPin, AlertTriangle, Leaf, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils';
import { RIDE_OPTIONS } from '../../data/mockSuperApp';
import { useAIStore } from '../../store/useAIStore';
import { useSuperAppStore } from '../../store/useSuperAppStore';

interface BookingPanelProps {
  subType: string;
  onBack: () => void;
  onBook: (destination: string, vehicleId: string) => void;
}

export function BookingPanel({ subType, onBack, onBook }: BookingPanelProps) {
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const { isSurgePricing, toggleSurge, weather } = useAIStore();
  const { ride, setPickup, setDestination, calculateRoute, generateRideSuggestions } = useSuperAppStore();

  useEffect(() => {
    generateRideSuggestions();
  }, []);

  // Filter options based on the selected sub-service
  const options = RIDE_OPTIONS.filter(opt => opt.category === subType);
  
  if (!selectedRide && options.length > 0) setSelectedRide(options[0].id);

  const handleBook = () => {
    if (ride.destination && selectedRide) {
      onBook(ride.destination, selectedRide);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleRouteCalculation = () => {
    if (ride.destination.length > 3) {
      calculateRoute();
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'destination') {
      setDestination(suggestion.actionValue);
      setTimeout(() => calculateRoute(), 100); // Trigger route after state update
    } else if (suggestion.type === 'vehicle') {
      const vehicle = options.find(o => o.id === suggestion.actionValue);
      if (vehicle) setSelectedRide(vehicle.id);
    }
  };

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] max-h-[85vh] flex flex-col"
    >
      {/* Drag Handle */}
      <div className="w-full flex justify-center pt-4 pb-2" onClick={onBack}>
        <div className="w-12 h-1.5 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition-colors" />
      </div>

      <div className="p-6 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              {subType} <span className="text-gray-500 text-lg font-normal">Service</span>
            </h3>
          </div>
          <button 
            onClick={toggleSurge}
            className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 transition-all ${isSurgePricing ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'border-gray-700 text-gray-500'}`}
          >
            <Zap className="w-3 h-3" /> Surge {isSurgePricing ? 'On' : 'Off'}
          </button>
        </div>

        {/* AI Suggestions Bar */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {ride?.aiSuggestions?.map((s) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => handleSuggestionClick(s)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-2 whitespace-nowrap hover:bg-white/10 transition-colors"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${s.type === 'offer' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-400'}`}>
                {s.icon === 'Briefcase' && <Briefcase className="w-3 h-3" />}
                {s.icon === 'Home' && <Home className="w-3 h-3" />}
                {s.icon === 'Umbrella' && <CloudRain className="w-3 h-3" />}
                {s.icon === 'Tag' && <Tag className="w-3 h-3" />}
                {s.icon === 'Bike' && <Zap className="w-3 h-3" />}
                {s.icon === 'Dumbbell' && <Sparkles className="w-3 h-3" />}
                {s.icon === 'Car' && <Navigation className="w-3 h-3" />}
                {s.icon === 'ShoppingBag' && <Briefcase className="w-3 h-3" />}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">{s.label}</p>
                <p className="text-[10px] text-gray-400">{s.reason}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Route Planning */}
          <div className="flex-1 space-y-4">
            {/* Pickup Input */}
            <div className="relative flex items-center bg-gray-800 rounded-xl p-1 border border-gray-700">
              <div className="p-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="Current Location" 
                className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 w-full text-sm font-medium h-10 pr-4"
                value={ride.pickup || ''}
                onChange={(e) => setPickup(e.target.value)}
              />
            </div>

            {/* Dotted Line Connector */}
            <div className="absolute left-[3.25rem] top-[14.5rem] w-0.5 h-8 border-l-2 border-dashed border-gray-600 hidden lg:block"></div>

            {/* Destination Input */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
              <div className="relative flex items-center bg-gray-800 rounded-xl p-1">
                <div className="p-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 w-full text-sm font-medium h-10 pr-4"
                  value={ride.destination || ''}
                  onChange={handleDestinationChange}
                  onBlur={handleRouteCalculation}
                  onKeyDown={(e) => e.key === 'Enter' && handleRouteCalculation()}
                  autoFocus
                />
              </div>
            </div>

            {/* Route Summary Card with AI Alternatives */}
            {ride.route && (
              <div className="space-y-3">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">AI Route Prediction</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">{ride.route.duration}</span>
                      <span className="text-sm text-gray-400">({ride.route.distance})</span>
                    </div>
                  </div>
                  <div className={`text-right px-3 py-1 rounded-lg border ${ride.route.trafficCondition === 'Gridlock' ? 'bg-red-500/20 border-red-500 text-red-400' : ride.route.trafficCondition === 'Heavy' ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-green-500/20 border-green-500 text-green-400'}`}>
                    <p className="text-xs font-bold flex items-center gap-1">
                      {ride.route.trafficCondition === 'Gridlock' && <AlertTriangle className="w-3 h-3" />}
                      {ride.route.trafficCondition} Traffic
                    </p>
                  </div>
                </motion.div>
                
                {/* AI Alternatives */}
                {ride.route.alternatives && (
                  <div className="grid grid-cols-3 gap-2">
                    {ride.route.alternatives.map((alt, i) => (
                      <button key={i} className={`p-2 rounded-lg border text-center transition-all ${i === 0 ? 'bg-blue-600/20 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>
                        <p className={`text-[10px] font-bold uppercase mb-1 ${alt.type === 'fast' ? 'text-blue-400' : alt.type === 'cheap' ? 'text-green-400' : 'text-green-300'}`}>
                          {alt.type === 'eco' && <Leaf className="w-3 h-3 inline mr-1" />}
                          {alt.label}
                        </p>
                        <p className="text-white font-bold text-sm">{alt.duration}</p>
                        <p className="text-[10px] text-gray-400">{alt.priceDiff}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Vehicle Selection */}
          <div className="flex-1 flex flex-col">
            <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider flex justify-between">
              <span>Select Vehicle</span>
              {weather === 'rainy' && <span className="text-blue-400 text-xs flex items-center"><CloudRain className="w-3 h-3 mr-1" /> Rain Pricing Active</span>}
            </h4>
            
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              {options.map((opt) => {
                const routeEta = ride.route ? parseInt(ride.route.duration) : opt.eta;
                const adjustedEta = (ride.route && opt.subCategory === 'Bike') ? Math.ceil(routeEta * 0.6) : routeEta;

                return (
                  <motion.div
                    key={opt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRide(opt.id)}
                    className={`relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${selectedRide === opt.id ? 'bg-blue-600/20 border-blue-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-12 rounded-lg flex items-center justify-center ${selectedRide === opt.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                         <Navigation className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white text-lg">{opt.name}</p>
                          {opt.co2 && <span className="text-[10px] bg-green-900/50 text-green-400 px-1 rounded border border-green-800 flex items-center"><Leaf className="w-2 h-2 mr-0.5" />{opt.co2}</span>}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {adjustedEta} min</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {opt.capacity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-white">
                        {formatPrice(10 * opt.priceMultiplier * (isSurgePricing ? 1.5 : 1))}
                      </p>
                      {opt.subCategory === 'Premium' && (
                        <span className="text-[10px] text-yellow-400 font-bold">PREMIUM</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                <span>Payment Method</span>
                <span className="text-white font-bold flex items-center gap-2">
                  Super Wallet <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </span>
              </div>
              <Button 
                size="xl" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20"
                onClick={handleBook}
                disabled={!ride.destination}
              >
                Confirm {subType} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
