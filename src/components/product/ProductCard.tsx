import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToCompare } = useStore();
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const result = addToCart(product);
    if (!result.success && result.error === 'VENDOR_CONFLICT') {
      alert("You can only add products from one vendor at a time. Please clear your cart or checkout first.");
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    const result = addToCompare(product);
    if (!result.success) {
      if (result.error === 'FULL') alert("You can only compare up to 3 products.");
      if (result.error === 'CATEGORY_MISMATCH') alert("You can only compare products from the same category.");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isFlashSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Link to={`/shop/${product.vendorId}`} className="text-xs text-gray-500 hover:underline">
            {product.vendorName}
          </Link>
          <div className="flex items-center text-yellow-400 text-xs">
            <Star className="h-3 w-3 fill-current" />
            <span className="ml-1 text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 text-sm font-medium text-gray-900 line-clamp-2 h-10">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
             <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
             {product.originalPrice && (
               <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
             )}
          </div>
          
          <div className="flex space-x-2">
             <button 
               onClick={handleCompare}
               className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
               title="Compare"
             >
               <Eye className="h-4 w-4" />
             </button>
             <Button size="sm" onClick={handleAddToCart} className="h-8 px-3">
               <ShoppingCart className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
