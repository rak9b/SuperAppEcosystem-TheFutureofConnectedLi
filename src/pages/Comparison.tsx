import { Link } from 'react-router-dom';
import { X, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Star } from 'lucide-react';

export function Comparison() {
  const { compareList, removeFromCompare } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No products to compare</h2>
        <p className="text-gray-500 mb-8">Add products from the same category to compare them.</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Product Comparison</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="p-4 border-b min-w-[200px]"></th>
              {compareList.map(product => (
                <th key={product.id} className="p-4 border-b min-w-[250px] relative">
                  <button 
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="aspect-square w-32 mx-auto mb-4 rounded-md overflow-hidden bg-gray-100">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <Link to={`/product/${product.id}`} className="text-lg font-medium hover:text-blue-600 block text-center">
                    {product.name}
                  </Link>
                  <p className="text-center text-xl font-bold mt-2">{formatPrice(product.price)}</p>
                </th>
              ))}
              {compareList.length < 3 && (
                <th className="p-4 border-b min-w-[250px] align-middle text-center bg-gray-50 border-l">
                  <div className="text-gray-400 mb-2">Add another product</div>
                  <Link to="/products">
                    <Button variant="outline" size="sm">Browse</Button>
                  </Link>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-4 font-medium text-gray-500">Rating</td>
              {compareList.map(product => (
                <td key={product.id} className="p-4 text-center">
                  <div className="flex items-center justify-center text-yellow-400">
                    <span className="text-gray-900 font-bold mr-1">{product.rating}</span>
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-gray-400 text-xs ml-1">({product.reviewsCount})</span>
                  </div>
                </td>
              ))}
              {compareList.length < 3 && <td className="border-l bg-gray-50"></td>}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-500">Vendor</td>
              {compareList.map(product => (
                <td key={product.id} className="p-4 text-center text-blue-600">
                  {product.vendorName}
                </td>
              ))}
              {compareList.length < 3 && <td className="border-l bg-gray-50"></td>}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-500">Availability</td>
              {compareList.map(product => (
                <td key={product.id} className="p-4 text-center">
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </td>
              ))}
              {compareList.length < 3 && <td className="border-l bg-gray-50"></td>}
            </tr>
            {/* Dynamic Attributes Comparison */}
            {Object.keys(compareList[0].attributes).map(attrKey => (
               <tr key={attrKey}>
                 <td className="p-4 font-medium text-gray-500">{attrKey}</td>
                 {compareList.map(product => (
                   <td key={product.id} className="p-4 text-center">
                     {product.attributes[attrKey] || '-'}
                   </td>
                 ))}
                 {compareList.length < 3 && <td className="border-l bg-gray-50"></td>}
               </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
