import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { useSuperAppStore } from '../../store/useSuperAppStore';

interface MapBackgroundProps {
  mapType?: 'default' | 'satellite' | 'terrain';
  showTraffic?: boolean;
  show3D?: boolean;
  showRoute?: boolean;
}

export function MapBackground({ 
  mapType = 'default', 
  showTraffic = false, 
  show3D = false,
  showRoute = false 
}: MapBackgroundProps) {
  const [cars, setCars] = useState<{ id: number; x: number; y: number; delay: number; duration: number }[]>([]);
  const { ride } = useSuperAppStore();

  useEffect(() => {
    // Generate random "cars" moving on the map
    const newCars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
    }));
    setCars(newCars);
  }, []);

  // Map Style Configurations
  const mapStyles = {
    default: {
      filter: 'grayscale(100%) contrast(125%) invert(100%)', // Light mode vector look
      opacity: 0.8
    },
    satellite: {
      filter: 'contrast(110%) brightness(80%)', // Darker, realistic
      opacity: 1,
      backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80')` // Satellite texture
    },
    terrain: {
      filter: 'sepia(20%) contrast(110%)', // Earthy tones
      opacity: 0.9
    }
  };

  const currentStyle = mapStyles[mapType];

  // Determine Traffic Color based on Route Condition
  const trafficColor = ride.route?.trafficCondition === 'Gridlock' ? '#ef4444' : ride.route?.trafficCondition === 'Heavy' ? '#f97316' : '#22c55e';

  return (
    <div className={cn(
      "absolute inset-0 z-0 overflow-hidden bg-gray-900 pointer-events-none transition-all duration-1000",
      show3D && "perspective-[1000px]"
    )}>
      {/* Base Map Layer */}
      <motion.div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage: mapType === 'satellite' 
            ? currentStyle.backgroundImage 
            : `url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/OpenStreetMap_Logo_2011.svg/1024px-OpenStreetMap_Logo_2011.svg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: currentStyle.filter,
          opacity: currentStyle.opacity,
          transform: show3D ? 'rotateX(45deg) scale(1.5)' : 'rotateX(0deg) scale(1)',
          transformOrigin: 'center 80%'
        }}
      />
      
      {/* 3D Buildings Simulation (CSS Blocks) */}
      {show3D && (
        <div className="absolute inset-0 pointer-events-none" style={{ transform: 'rotateX(45deg) scale(1.5)', transformOrigin: 'center 80%' }}>
          {[...Array(8)].map((_, i) => (
             <div key={i} className="absolute bg-gray-700/50 border border-white/10" 
               style={{
                 width: '40px', height: `${40 + Math.random() * 60}px`, 
                 left: `${10 + i * 12}%`, top: `${30 + Math.random() * 40}%`,
                 transform: 'translateZ(20px)',
                 boxShadow: '10px 10px 20px rgba(0,0,0,0.5)'
               }} 
             />
          ))}
        </div>
      )}

      {/* Traffic Layer (BD Style - Dense) */}
      {showTraffic && (
        <svg className="absolute inset-0 w-full h-full opacity-70" style={{ transform: show3D ? 'rotateX(45deg) scale(1.5)' : 'none', transformOrigin: 'center 80%' }}>
          {/* Main Arteries (Green/Orange/Red) */}
          <path d="M -100 200 Q 400 400 1200 200" stroke="#ef4444" strokeWidth="8" fill="none" className="animate-pulse" /> {/* Red for Dhaka */}
          <path d="M 200 -100 Q 400 400 200 1200" stroke="#f97316" strokeWidth="6" fill="none" />
          <path d="M 800 -100 L 600 1200" stroke="#22c55e" strokeWidth="6" fill="none" />
          
          {/* Smaller Roads */}
          <path d="M 0 0 L 1000 1000" stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M 1000 0 L 0 1000" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
      )}

      {/* Route Navigation Layer (Dynamic Polyline) */}
      {showRoute && ride.route && (
        <svg className="absolute inset-0 w-full h-full z-10" style={{ transform: show3D ? 'rotateX(45deg) scale(1.5)' : 'none', transformOrigin: 'center 80%' }}>
          {/* Route Path */}
          <motion.path 
            d={`M 50% 50% Q 55% 45% 80% 35%`} // Matches mock polyline logic
            stroke="#3b82f6" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Traffic Overlay on Route */}
          <motion.path 
            d={`M 50% 50% Q 55% 45% 80% 35%`} 
            stroke={trafficColor} 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round"
            strokeDasharray="5 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Start Marker */}
          <circle cx="50%" cy="50%" r="6" fill="white" stroke="#3b82f6" strokeWidth="3" />
          
          {/* Destination Marker */}
          <circle cx="80%" cy="35%" r="8" fill="#ef4444" stroke="white" strokeWidth="2" />
        </svg>
      )}

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-gray-900/40 pointer-events-none" />

      {/* User Location (Radar) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transform: show3D ? 'rotateX(45deg)' : 'none' }}>
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_20px_rgba(59,130,246,0.8)] z-20 relative" />
          <motion.div 
            animate={{ scale: [1, 3], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-blue-500 rounded-full"
          />
        </div>
      </div>

      {/* Simulated Moving Traffic (Cars) */}
      {cars.map((car) => (
        <motion.div
          key={car.id}
          initial={{ x: `${car.x}vw`, y: `${car.y}vh`, opacity: 0 }}
          animate={{ 
            x: [`${car.x}vw`, `${car.x + (Math.random() > 0.5 ? 20 : -20)}vw`], 
            y: [`${car.y}vh`, `${car.y + (Math.random() > 0.5 ? 20 : -20)}vh`],
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: car.duration, 
            repeat: Infinity, 
            delay: car.delay, 
            ease: "linear" 
          }}
          className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"
          style={{ transform: show3D ? 'rotateX(45deg)' : 'none' }}
        />
      ))}

      {/* ACTIVE DRIVER SIMULATION */}
      {ride.status === 'arriving' && (
        <motion.div
          initial={{ x: '20vw', y: '20vh', opacity: 0 }}
          animate={{ x: '50%', y: '50%', opacity: 1 }}
          transition={{ duration: 10, ease: "linear" }} // Simulates car arriving at center
          className="absolute top-0 left-0 z-20"
          style={{ transform: show3D ? 'rotateX(45deg)' : 'none' }}
        >
           <div className="relative">
             <div className="w-6 h-3 bg-white rounded-sm shadow-[0_0_10px_white] transform -rotate-45" />
             <div className="absolute -top-4 -left-4 bg-white text-black text-[10px] px-1 rounded font-bold whitespace-nowrap">
               {ride.driver?.plate}
             </div>
           </div>
        </motion.div>
      )}

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
