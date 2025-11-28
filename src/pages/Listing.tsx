import { ServiceHeader } from '../components/layout/ServiceHeader';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

interface ListingProps {
  title: string;
  filter?: 'flash' | 'all';
}

export function Listing({ title, filter = 'all' }: ListingProps) {
  const { products } = useStore();
  
  const displayProducts = filter === 'flash' 
    ? products.filter(p => p.isFlashSale) 
    : products;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title={title} color="bg-slate-900" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        {displayProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl text-slate-500">No products found in this collection.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
