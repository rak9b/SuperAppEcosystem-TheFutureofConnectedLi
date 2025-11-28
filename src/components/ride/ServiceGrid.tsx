import { motion } from 'framer-motion';
import { Category3DCard } from './Category3DCard';
import { Car, Utensils, ShoppingBag, Wallet, Plane, Clock, Package, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceGridProps {
  onSelect: (category: string, subType?: string) => void;
}

export function ServiceGrid({ onSelect }: ServiceGridProps) {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto px-4 pb-24"
    >
      <div className="mb-8">
        <motion.h2 variants={item} className="text-4xl font-display font-bold text-white mb-2">
          Where to next?
        </motion.h2>
        <motion.p variants={item} className="text-gray-400 text-lg">
          Choose a service to get started
        </motion.p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <motion.div variants={item}>
          <Category3DCard 
            title="Ride" 
            subtitle="Cars, Bikes & More" 
            icon={<Car />} 
            gradient="from-blue-600 to-indigo-600" 
            onClick={() => onSelect('Ride', 'Ride')}
          />
        </motion.div>
        <motion.div variants={item}>
          <Category3DCard 
            title="Food" 
            subtitle="Order Delivery" 
            icon={<Utensils />} 
            gradient="from-green-600 to-emerald-500" 
            onClick={() => navigate('/food')}
          />
        </motion.div>
        <motion.div variants={item}>
          <Category3DCard 
            title="Parcel" 
            subtitle="Send Packages" 
            icon={<Package />} 
            gradient="from-orange-500 to-red-500" 
            onClick={() => navigate('/parcel')} 
          />
        </motion.div>
        <motion.div variants={item}>
          <Category3DCard 
            title="Rentals" 
            subtitle="Hourly Cars" 
            icon={<Clock />} 
            gradient="from-purple-600 to-pink-500" 
            onClick={() => onSelect('Ride', 'Rentals')}
          />
        </motion.div>
        
        {/* Secondary Rows */}
        <motion.div variants={item}>
          <Category3DCard 
            title="Travel" 
            subtitle="Intercity Bus" 
            icon={<Plane />} 
            gradient="from-cyan-500 to-blue-500" 
            onClick={() => onSelect('Ride', 'Travel')}
          />
        </motion.div>
        <motion.div variants={item}>
          <Category3DCard 
            title="Shop" 
            subtitle="Groceries & More" 
            icon={<ShoppingBag />} 
            gradient="from-pink-500 to-rose-500" 
            onClick={() => navigate('/')}
          />
        </motion.div>
        <motion.div variants={item}>
          <Category3DCard 
            title="Wallet" 
            subtitle="Pay Bills" 
            icon={<Wallet />} 
            gradient="from-slate-600 to-slate-800" 
            onClick={() => navigate('/pay')}
          />
        </motion.div>
        <motion.div variants={item}>
          <Category3DCard 
            title="Offers" 
            subtitle="Promo Codes" 
            icon={<Tag />} 
            gradient="from-yellow-500 to-orange-500" 
            onClick={() => navigate('/flash-sale')}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
