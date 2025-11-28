import { useState, useEffect } from 'react';
import { 
  MapPin, Car, Bike, Users, Clock, Zap, Package, Truck, 
  Accessibility, Stethoscope, Container, Gem, Plane, BusFront, 
  Wrench, Search, Bell, ChevronRight, ArrowLeft, Navigation, 
  Locate, Star, ShieldCheck, Smartphone, Utensils, ShoppingBag, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { RIDE_OPTIONS } from '../data/mockSuperApp';
import { useSuperAppStore } from '../store/useSuperAppStore';
import { useAIStore } from '../store/useAIStore';
import { formatPrice } from '../lib/utils';
import { KYCScanner } from '../components/ai/KYCScanner';
import { Category3DCard } from '../components/ride/Category3DCard';
import { useNavigate } from 'react-router-dom';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const panelVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { 
    y: "100%", 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export function Ride() {
  const { ride, requestRide, cancelRide, pay } = useSuperAppStore();
  const { isSurgePricing, toggleSurge } = useAIStore();
  const navigate = useNavigate();
  
  const [viewState, setViewState] = useState<'explore' | 'booking'>('explore');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(RIDE_OPTIONS[2].id);
  const [showDriverVerify, setShowDriverVerify] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'Ride' | 'Food' | 'Shop' | 'Pay' | 'Travel' | 'Services'>('Ride');
  const [subServiceType, setSubServiceType] = useState<'Ride' | 'Parcel' | 'Freight' | 'Health' | 'Rentals' | 'Travel'>('Ride');
  
  // Filter ride options based on sub-service type
  const filteredOptions = RIDE_OPTIONS.filter(opt => opt.category === subServiceType);

  // Simulate "AI Scanning" effect on map
  const [scanPulse, setScanPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setScanPulse(prev => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCategorySelect = (category: any, subType?: any) => {
    setActiveCategory(category);
    if (subType) {
      setSubServiceType(subType);
      setViewState('booking');
    } else if (category === 'Food') navigate('/food');
    else if (category === 'Shop') navigate('/');
    else if (category === 'Pay') navigate('/pay');
  };

  const handleBook = () => {
    if (!destination) return;
    requestRide(destination, subServiceType);
  };

  const handlePayment = () => {
    pay(15.50 * (isSurgePricing ? 1.5 : 1), `${subServiceType} to ${ride.destination}`, 'Ride');
    cancelRide();
    setViewState('explore');
    setDestination('');
  };

  const getIcon = (image: string) => {
    switch(image) {
      case 'Bike': return <Bike className="h-5 w-5" />;
      case 'Car': return <Car className="h-5 w-5" />;
      case 'CarFront': return <Car className="h-5 w-5" />;
      case 'Truck': return <Truck className="h-5 w-5" />;
      case 'Package': return <Package className="h-5 w-5" />;
      case 'Users': return <Users className="h-5 w-5" />;
      case 'Accessibility': return <Accessibility className="h-5 w-5" />;
      case 'Stethoscope': return <Stethoscope className="h-5 w-5" />;
      case 'Container': return <Container className="h-5 w-5" />;
      case 'Zap': return <Zap className="h-5 w-5" />;
      case 'Bus': return <BusFront className="h-5 w-5" />;
      case 'Armchair': return <Car className="h-5 w-5" />;
      case 'Crown': return <Car className="h-5 w-5 text-yellow-500" />;
      case 'Clock': return <Clock className="h-5 w-5" />;
      case 'Gem': return <Gem className="h-5 w-5" />;
      case 'Plane': return <Plane className="h-5 w-5" />;
      case 'BusFront': return <BusFront className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-900 text-white font-sans">
      {showDriverVerify && <KYCScanner onComplete={() => setShowDriverVerify(false)} />}

      {/* --- IMMERSIVE MAP BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dark Map Base */}
        <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/OpenStreetMap_Logo_2011.svg/1024px-OpenStreetMap_Logo_2011.svg.png')] bg-cover bg-center opacity-20 grayscale contrast-125 invert" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/40 to-gray-900/90" />
        
        {/* AI Radar Scan Effect */}
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/10 rounded-full animate-[ping_3s_linear_infinite]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/20 rounded-full animate-[ping_3s_linear_infinite_1s]" />
        </div>

        {/* Simulated Live Traffic / Cars */}
        <motion.div 
          animate={{ x: [0, 100], y: [0, 50], opacity: [0, 1, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
        />
        <motion.div 
          animate={{ x: [0, -150], y: [0, 80], opacity: [0, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/2 right-1/3 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red]"
        />

        {/* User Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="relative">
             <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-20 relative" />
             <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" />
             <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-white/10 whitespace-nowrap">
               <p className="text-[10px] font-bold text-blue-400">YOU ARE HERE</p>
             </div>
           </div>
        </div>
      </div>

      {/* --- FLOATING HEADER --- */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent"
      >
        <div className="flex items-center gap-3">
          {viewState === 'booking' && (
            <button 
              onClick={() => setViewState('explore')}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-colors mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="font-bold text-sm">JD</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-300">Current Location</p>
            <h2 className="text-sm font-bold flex items-center gap-1">
              Tech City, Innovation Blvd <ChevronRight className="w-3 h-3 text-gray-500" />
            </h2>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
        </div>
      </motion.div>

      {/* --- MAIN CONTENT LAYERS --- */}
      <div className="absolute inset-0 z-10 flex flex-col pt-24 pb-4 px-4 md:px-8 overflow-y-auto scrollbar-hide">
        
        {/* VIEW 1: EXPLORE GRID */}
        <AnimatePresence>
          {viewState === 'explore' && ride.status === 'idle' && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-5xl mx-auto"
            >
              <div className="flex justify-between items-end mb-6">
                <div>
                  <motion.h2 variants={itemVariants} className="text-2xl font-bold">Where to next?</motion.h2>
                  <motion.p variants={itemVariants} className="text-sm text-gray-400">Choose a service to get started</motion.p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Ride" 
                    subtitle="Go anywhere" 
                    icon={<Car />} 
                    gradient="from-blue-600 to-blue-400" 
                    isActive={activeCategory === 'Ride'}
                    onClick={() => handleCategorySelect('Ride', 'Ride')}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Food" 
                    subtitle="Hungry?" 
                    icon={<Utensils />} 
                    gradient="from-green-600 to-emerald-400" 
                    isActive={activeCategory === 'Food'}
                    onClick={() => handleCategorySelect('Food')}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Shop" 
                    subtitle="Essentials" 
                    icon={<ShoppingBag />} 
                    gradient="from-purple-600 to-pink-400" 
                    isActive={activeCategory === 'Shop'}
                    onClick={() => handleCategorySelect('Shop')}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Pay" 
                    subtitle="Wallet & Bills" 
                    icon={<Wallet />} 
                    gradient="from-pink-600 to-rose-400" 
                    isActive={activeCategory === 'Pay'}
                    onClick={() => handleCategorySelect('Pay')}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Travel" 
                    subtitle="Bus & Flights" 
                    icon={<Plane />} 
                    gradient="from-orange-500 to-yellow-400" 
                    isActive={activeCategory === 'Travel'}
                    onClick={() => handleCategorySelect('Travel', 'Travel')}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Rentals" 
                    subtitle="Cars by hour" 
                    icon={<Clock />} 
                    gradient="from-indigo-600 to-blue-500" 
                    isActive={activeCategory === 'Ride' && subServiceType === 'Rentals'}
                    onClick={() => handleCategorySelect('Ride', 'Rentals')}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Parcel" 
                    subtitle="Send Items" 
                    icon={<Package />} 
                    gradient="from-teal-600 to-cyan-400" 
                    isActive={activeCategory === 'Ride' && subServiceType === 'Parcel'}
                    onClick={() => handleCategorySelect('Ride', 'Parcel')}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Category3DCard 
                    title="Offers" 
                    subtitle="Hot Deals" 
                    icon={<Tag />} 
                    gradient="from-red-600 to-orange-500" 
                    isActive={false}
                    onClick={() => navigate('/flash-sale')}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VIEW 2: BOOKING SHEET */}
        <AnimatePresence>
          {(viewState === 'booking' || ride.status !== 'idle') && (
            <motion.div 
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-0 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Handle Bar */}
              <div className="w-full flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
              </div>

              <div className="p-6 overflow-y-auto">
                {/* Sub-Navigation */}
                {ride.status === 'idle' && (
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {['Ride', 'Parcel', 'Freight', 'Health', 'Rentals'].map((type) => (
                      <button 
                        key={type}
                        onClick={() => setSubServiceType(type as any)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${subServiceType === type ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}

                {/* RIDE STATUS: IDLE (Booking Form) */}
                {ride.status === 'idle' && (
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Inputs */}
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Where to?
                      </h3>
                      
                      {/* Destination Input */}
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 group-hover:opacity-75 transition duration-500 blur"></div>
                        <div className="relative flex items-center bg-gray-800 rounded-xl p-4">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mr-4 shrink-0">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Enter destination" 
                            className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 w-full text-lg font-medium"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            autoFocus
                          />
                          <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                            <Locate className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Saved Places */}
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        <button 
                          onClick={() => setDestination("Home")}
                          className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 min-w-[120px]"
                        >
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-500"><MapPin className="w-4 h-4" /></div>
                          <div className="text-left">
                            <p className="text-xs font-bold">Home</p>
                            <p className="text-[10px] text-gray-500">15 mins</p>
                          </div>
                        </button>
                        <button 
                          onClick={() => setDestination("Work")}
                          className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 min-w-[120px]"
                        >
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500"><Briefcase className="w-4 h-4" /></div>
                          <div className="text-left">
                            <p className="text-xs font-bold">Work</p>
                            <p className="text-[10px] text-gray-500">35 mins</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Right: Vehicle Selection */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-300 flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-blue-500" /> Available Rides
                        </h4>
                        <button 
                          onClick={toggleSurge} 
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${isSurgePricing ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}
                        >
                          <Zap className="w-3 h-3" /> Surge: {isSurgePricing ? 'ON' : 'OFF'}
                        </button>
                      </div>
                      
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {filteredOptions.map((opt, idx) => (
                          <motion.div 
                            key={opt.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setSelectedRide(opt.id)}
                            className={`relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border group ${selectedRide === opt.id ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${selectedRide === opt.id ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                                {getIcon(opt.image)}
                              </div>
                              <div>
                                <p className="font-bold text-base group-hover:text-blue-400 transition-colors">{opt.name}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-2">
                                  <Clock className="w-3 h-3" /> {opt.eta} min • <Users className="w-3 h-3" /> {opt.capacity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{formatPrice(10 * opt.priceMultiplier * (isSurgePricing ? 1.5 : 1))}</p>
                              {idx === 0 && <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">BEST VALUE</span>}
                              {idx === 2 && <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold">FASTEST</span>}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Button 
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 h-14 text-lg font-bold shadow-lg shadow-blue-600/20 rounded-xl"
                        onClick={handleBook}
                        disabled={!destination}
                      >
                        Confirm {subServiceType}
                      </Button>
                    </div>
                  </div>
                )}

                {/* RIDE STATUS: SEARCHING */}
                {ride.status === 'searching' && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="relative w-32 h-32 mb-8">
                      <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping"></div>
                      <div className="absolute inset-2 border-4 border-purple-500/30 rounded-full animate-ping animation-delay-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-white/10 z-10">
                          <Search className="w-8 h-8 text-blue-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Connecting to nearby drivers...</h3>
                    <p className="text-gray-400">AI is optimizing your route for fastest arrival.</p>
                    <Button variant="outline" className="mt-8 border-white/10 text-gray-400 hover:text-white" onClick={cancelRide}>
                      Cancel Request
                    </Button>
                  </div>
                )}

                {/* RIDE STATUS: ARRIVING / IN-PROGRESS */}
                {(ride.status === 'arriving' || ride.status === 'in-progress') && ride.driver && (
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-4">
                    {/* Driver Info */}
                    <div className="flex items-center gap-6 flex-1">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden border-4 border-green-500 p-1">
                           <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=60" className="w-full h-full object-cover rounded-full" alt="Driver" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold border-4 border-gray-900 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> {ride.driver.rating}
                        </div>
                      </div>
                      
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                           <h3 className="text-3xl font-bold">{ride.driver.name}</h3>
                           {ride.driver.verified && <ShieldCheck className="w-5 h-5 text-blue-400" />}
                         </div>
                         <p className="text-gray-400 text-lg mb-2">{ride.driver.vehicle}</p>
                         <div className="flex gap-2">
                           <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-lg font-mono font-bold border border-yellow-400/30 text-sm">
                             {ride.driver.plate}
                           </span>
                           <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-sm">
                             White Tesla
                           </span>
                         </div>
                      </div>
                    </div>
                    
                    {/* Status & Actions */}
                    <div className="flex flex-col items-end gap-6 flex-1 w-full lg:w-auto">
                       <div className="text-right">
                          <p className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-1">
                            {ride.status === 'arriving' ? 'Arriving In' : 'Trip Duration'}
                          </p>
                          <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            {ride.eta} <span className="text-2xl text-gray-500 font-normal">min</span>
                          </p>
                       </div>
        
                       <div className="grid grid-cols-2 md:flex gap-3 w-full lg:w-auto">
                          <Button variant="outline" className="border-white/10 hover:bg-white/10 h-12" onClick={() => alert("Calling Driver...")}>
                             <Smartphone className="w-4 h-4 mr-2" /> Contact
                          </Button>
                          <Button variant="danger" className="h-12 bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white" onClick={() => alert("SOS Signal Sent!")}>
                             SOS
                          </Button>
                          <Button className="col-span-2 md:col-span-1 h-12 bg-green-600 hover:bg-green-500 font-bold px-8" onClick={handlePayment}>
                             Complete Ride
                          </Button>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Helper Icon Component
function Briefcase(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

// Helper Icon Component
function Tag(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7-7a2 2 0 0 0 0-2.828l-5-5z" />
      <path d="M6 9h.01" />
    </svg>
  )
}
