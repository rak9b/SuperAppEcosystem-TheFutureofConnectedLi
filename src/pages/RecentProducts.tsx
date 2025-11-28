import { ServiceHeader } from '../components/layout/ServiceHeader';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../store/useStore';
import { Clock } from 'lucide-react';

export function RecentProducts() {
  const { recentProducts } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="Recently Viewed" color="bg-slate-900" />
      
      <div className="container mx-auto px-4 py-12">
        {recentProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold dark:text-white mb-2">No recent history</h3>
            <p className="text-gray-500">Products you view will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
