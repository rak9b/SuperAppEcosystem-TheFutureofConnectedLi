import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useSuperAppStore } from '../../store/useSuperAppStore';
import { formatPrice } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export function FoodCartBar() {
  const { food } = useSuperAppStore();
  const navigate = useNavigate();

  const itemCount = food.cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = food.cart.reduce((acc, item) => acc + (item.item.price * item.quantity), 0);

  if (itemCount === 0) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-4 left-4 right-4 z-50"
    >
      <button 
        onClick={() => navigate('/checkout?type=food')}
        className="w-full bg-green-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between hover:bg-green-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
            {itemCount}
          </div>
          <div className="text-left">
            <p className="text-xs text-green-100 uppercase font-bold">Total</p>
            <p className="font-bold text-lg leading-none">{formatPrice(total)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-bold text-sm">
          View Cart <ChevronRight className="h-4 w-4" />
        </div>
      </button>
    </motion.div>
  );
}
