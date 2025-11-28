import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Minus, Plus, Sparkles, Camera, RefreshCw, Box, Package, Truck, ShieldCheck, Info, Factory, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { ProductCard } from '../components/product/ProductCard';
import { AIReviewSummary } from '../components/shop/AIReviewSummary';
import { RFQModal } from '../components/shop/RFQModal';
import { TradeAssuranceBadge } from '../components/shop/TradeAssuranceBadge';

export function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart, addRecentProduct, replaceCart, wishlist, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);
  const [showRFQ, setShowRFQ] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Default');
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'supplier'>('specs');

  const product = products.find(p => p.id === id);
  const isWishlisted = product ? wishlist.includes(product.id) : false;
  
  useEffect(() => {
    if (product) {
      addRecentProduct(product);
    }
  }, [product, addRecentProduct]);

  if (!product) {
    return <div className="p-10 text-center dark:text-white">Product not found</div>;
  }

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    const result = addToCart(product, quantity);
    if (!result.success && result.error === 'VENDOR_CONFLICT') {
      setShowConflictModal(true);
    }
  };

  const handleReplaceCart = () => {
    replaceCart(product, quantity);
    setShowConflictModal(false);
  };

  // B2B / Wholesale Logic
  const isWholesale = quantity >= 10;
  const currentPrice = isWholesale ? product.price * 0.85 : product.price;

  return (
    <div className="container mx-auto px-4 py-8 dark:text-white">
      <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 relative group">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => setShowTryOn(true)}
              className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm flex items-center hover:bg-white dark:hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              <Camera className="w-4 h-4 mr-2 text-blue-600" />
              Virtual Try-On
            </button>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="mb-2 flex justify-between items-start">
            <Link to={`/shop/${product.vendorId}`} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
              {product.vendorName}
            </Link>
            <TradeAssuranceBadge />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">({product.reviewsCount} reviews)</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="text-sm text-green-600 font-medium flex items-center">
               <CheckCircle2 className="h-4 w-4 mr-1" /> In Stock ({product.stock} units)
            </div>
          </div>

          <div className="flex items-end space-x-4 mb-8">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatPrice(currentPrice)}</span>
            {isWholesale && (
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Wholesale Price Applied (15% Off)</span>
            )}
          </div>

          {/* Variants */}
          <div className="mb-6">
            <p className="font-medium mb-2">Select Variant:</p>
            <div className="flex gap-2">
              {['Default', 'Premium', 'Limited Edition'].map(v => (
                <button 
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${selectedVariant === v ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 mb-6 border-t dark:border-gray-700 py-6">
            <div className="flex items-center border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
              >
                <Minus className="h-4 w-4 dark:text-white" />
              </button>
              <span className="w-12 text-center font-medium dark:text-white">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
              >
                <Plus className="h-4 w-4 dark:text-white" />
              </button>
            </div>
            <Button size="lg" className="flex-1 rounded-lg shadow-lg shadow-blue-600/20" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isWishlisted ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-400'}`}
            >
              <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {/* B2B Section */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-6 border border-slate-200 dark:border-slate-700">
             <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-sm flex items-center"><Package className="h-4 w-4 mr-2" /> Bulk Pricing (B2B)</h4>
                <button onClick={() => setShowRFQ(true)} className="text-xs font-bold text-blue-600 hover:underline flex items-center">
                   <FileText className="h-3 w-3 mr-1" /> Request Quote
                </button>
             </div>
             <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-white dark:bg-slate-800 rounded border dark:border-slate-700 text-center">
                   <div className="font-bold">1-9</div>
                   <div className="text-slate-500">{formatPrice(product.price)}</div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded border dark:border-slate-700 text-center border-blue-200">
                   <div className="font-bold text-blue-600">10-49</div>
                   <div className="text-slate-500">{formatPrice(product.price * 0.85)}</div>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded border dark:border-slate-700 text-center">
                   <div className="font-bold">50+</div>
                   <div className="text-slate-500">Contact Sales</div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center"><Truck className="h-4 w-4 mr-2" /> Free Shipping over $50</div>
            <div className="flex items-center"><ShieldCheck className="h-4 w-4 mr-2" /> 2 Year Warranty</div>
            <div className="flex items-center"><RefreshCw className="h-4 w-4 mr-2" /> 30 Day Returns</div>
            <div className="flex items-center"><Factory className="h-4 w-4 mr-2" /> Direct from Manufacturer</div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-16">
         <div className="flex border-b dark:border-gray-700 mb-6">
            {['specs', 'reviews', 'supplier'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-6 py-3 font-medium text-sm capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
               >
                 {tab === 'specs' ? 'Specifications' : tab}
               </button>
            ))}
         </div>

         {activeTab === 'specs' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                 <h3 className="font-bold mb-4">Product Details</h3>
                 <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{product.description}</p>
                 <h3 className="font-bold mb-4">Technical Specs</h3>
                 <div className="space-y-2">
                    {Object.entries(product.attributes).map(([key, value]) => (
                       <div key={key} className="flex justify-between py-2 border-b dark:border-gray-700">
                          <span className="text-gray-500 dark:text-gray-400">{key}</span>
                          <span className="font-medium">{value}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
         )}

         {activeTab === 'supplier' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700">
               <h3 className="font-bold mb-4">Supplier Information</h3>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div>
                     <h4 className="font-bold text-lg">{product.vendorName}</h4>
                     <p className="text-sm text-gray-500">Verified Supplier • 4.8/5 Rating</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Location:</span> Shenzhen, China</div>
                  <div><span className="text-gray-500">Response Time:</span> &lt; 24h</div>
                  <div><span className="text-gray-500">Established:</span> 2015</div>
                  <div><span className="text-gray-500">Main Products:</span> Electronics, Smart Home</div>
               </div>
            </div>
         )}
         
         {activeTab === 'reviews' && (
            <div className="space-y-8">
               {/* AI Summary Component */}
               <AIReviewSummary rating={product.rating} reviewCount={product.reviewsCount} />
               
               <div className="text-center py-10 text-gray-500 border-t dark:border-gray-700">
                  <p>Individual reviews list would appear here...</p>
               </div>
            </div>
         )}
      </div>

      {/* Cross Selling */}
      <div>
         <h2 className="text-2xl font-bold mb-6">Frequently Bought Together</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
               <ProductCard key={p.id} product={p} />
            ))}
         </div>
      </div>

      {/* Modals */}
      {showConflictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl transform scale-100 transition-all">
            <h3 className="text-lg font-bold text-red-600 mb-2">Cart Conflict</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your cart contains items from another vendor. You can only purchase from one vendor at a time.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowConflictModal(false)} className="dark:text-white dark:border-gray-600">Cancel</Button>
              <Button variant="danger" onClick={handleReplaceCart}>Replace Cart</Button>
            </div>
          </div>
        </div>
      )}

      {showRFQ && <RFQModal productName={product.name} onClose={() => setShowRFQ(false)} />}

      {/* Virtual Try-On Modal */}
      {showTryOn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative">
             <button onClick={() => setShowTryOn(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full dark:text-white">
               <Minus className="h-6 w-6 rotate-45" />
             </button>
             <div className="text-center mb-6">
               <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2 dark:text-white">
                 <Sparkles className="text-blue-600" /> AR Virtual Try-On
               </h3>
               <p className="text-gray-500 dark:text-gray-400">Allow camera access to see how this looks on you.</p>
             </div>
             
             <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-center text-white/50">
                     <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                     <p>Camera Feed Simulation</p>
                   </div>
                </div>
                <img src={product.images[0]} className="w-48 h-48 object-contain opacity-80 mix-blend-overlay absolute" alt="Overlay" />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Icon
function CheckCircle2(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
