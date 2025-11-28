import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { UserPlus, Check, Star, MapPin, MessageSquare } from 'lucide-react';

export function VendorShop() {
  const { id } = useParams();
  const { vendors, products, followedVendors, toggleFollowVendor } = useStore();

  const vendor = vendors.find(v => v.id === id);
  const vendorProducts = products.filter(p => p.vendorId === id);
  const isFollowing = vendor ? followedVendors.includes(vendor.id) : false;

  if (!vendor) return <div className="p-10 text-center">Vendor not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505]">
      <ServiceHeader title={vendor.shopName} color="bg-slate-900" />
      
      {/* Vendor Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <img src={vendor.logo || 'https://via.placeholder.com/150'} alt={vendor.shopName} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold dark:text-white mb-2">{vendor.shopName}</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mb-4">{vendor.shopDescription}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-400 fill-current" /> 4.8 Rating</span>
                <span className="flex items-center gap-1"><UserPlus className="h-4 w-4" /> {vendor.followers + (isFollowing ? 1 : 0)} Followers</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Verified Seller</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant={isFollowing ? "outline" : "primary"}
                onClick={() => toggleFollowVendor(vendor.id)}
                className={isFollowing ? "border-green-500 text-green-600" : ""}
              >
                {isFollowing ? <><Check className="h-4 w-4 mr-2" /> Following</> : <><UserPlus className="h-4 w-4 mr-2" /> Follow</>}
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" /> Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-bold dark:text-white mb-6">All Products ({vendorProducts.length})</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {vendorProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">This vendor hasn't added any products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
