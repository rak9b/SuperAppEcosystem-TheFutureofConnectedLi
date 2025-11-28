import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Camera, ShoppingCart, Bell, Menu, Zap, Star, TrendingUp, Clock, ArrowRight, Filter, Sparkles, Factory, Globe, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/product/ProductCard';
import { ImageSearchModal } from '../components/shop/ImageSearchModal';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/mock';

export function Marketplace() {
  const { products, cart, user } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(p => 
    (selectedCategory === 'All' || p.categoryId === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const flashSaleProducts = products.filter(p => p.isFlashSale);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] pb-20">
      {/* 1. Header (Amazon Style) */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">S</div>
            <span className="font-display font-bold text-xl hidden md:block">Shop</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-3xl mx-auto relative">
            <div className="flex rounded-lg bg-white overflow-hidden">
              <div className="flex-1 flex items-center px-3">
                <Search className="h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for products, brands and more" 
                  className="w-full px-3 py-2.5 text-gray-900 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowImageSearch(true)}
                className="p-2.5 text-gray-500 hover:text-blue-600 border-l border-gray-200"
              >
                <Camera className="h-5 w-5" />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-medium transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-full">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xs">
                  {user.name[0]}
                </div>
                <div className="hidden md:block text-xs text-left">
                  <p className="text-gray-400">Hello,</p>
                  <p className="font-bold">{user.name}</p>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-bold hover:underline">Sign In</Link>
            )}
          </div>
        </div>

        {/* Sub-Header Categories */}
        <div className="bg-slate-800 text-gray-300 text-sm overflow-x-auto">
          <div className="container mx-auto px-4 flex items-center gap-6 h-10">
            <button className="flex items-center gap-1 font-bold text-white hover:text-blue-400">
              <Menu className="h-4 w-4" /> All Categories
            </button>
            {['Electronics', 'Fashion', 'Home', 'Beauty', 'Toys', 'Sports'].map(cat => (
              <button key={cat} className="hover:text-white whitespace-nowrap transition-colors">
                {cat}
              </button>
            ))}
            <div className="flex-1"></div>
            <Link to="/vendor/dashboard" className="hover:text-white font-bold text-orange-400">Sell on SuperApp</Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Banner */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative rounded-2xl overflow-hidden h-[200px] md:h-[350px] bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2000&q=80" 
            alt="Banner" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent flex flex-col justify-center p-8 md:p-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-orange-400 font-bold tracking-wider text-sm mb-2"
            >
              BIG BILLION DAYS
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Up to 80% Off <br /> on Electronics
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Category Circles */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-lg font-bold dark:text-white mb-4">Shop by Category</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.id)}
              className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group"
            >
              <div className={`w-20 h-20 rounded-full p-1 border-2 transition-all ${selectedCategory === cat.id ? 'border-blue-600' : 'border-transparent group-hover:border-gray-300'}`}>
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <span className={`text-xs font-medium text-center ${selectedCategory === cat.id ? 'text-blue-600 font-bold' : 'text-gray-600 dark:text-gray-400'}`}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. B2B Sourcing Section (Alibaba Style) */}
      <div className="bg-slate-100 dark:bg-slate-900 py-12 mb-12">
         <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
               <div>
                  <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                     <Factory className="text-blue-600" /> Global Sourcing (B2B)
                  </h2>
                  <p className="text-gray-500 mt-1">Source directly from factories with Trade Assurance</p>
               </div>
               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Post RFQ</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                  <Globe className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="font-bold text-lg dark:text-white mb-2">Verified Suppliers</h3>
                  <p className="text-sm text-gray-500 mb-4">Connect with 50,000+ verified factories worldwide.</p>
                  <div className="flex -space-x-2">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800"></div>
                     ))}
                  </div>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                  <ShieldCheck className="h-8 w-8 text-yellow-500 mb-4" />
                  <h3 className="font-bold text-lg dark:text-white mb-2">Trade Assurance</h3>
                  <p className="text-sm text-gray-500 mb-4">Protect your orders from payment to delivery.</p>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">Free Protection</span>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                  <TrendingUp className="h-8 w-8 text-green-500 mb-4" />
                  <h3 className="font-bold text-lg dark:text-white mb-2">Dropshipping</h3>
                  <p className="text-sm text-gray-500 mb-4">Start your business with zero inventory.</p>
                  <button className="text-blue-600 text-sm font-bold hover:underline">Learn More</button>
               </div>
            </div>
         </div>
      </div>

      {/* 5. Flash Sales */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
              <Zap className="fill-orange-500 text-orange-500" /> Flash Sale
            </h2>
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Ending in 04:32:12
            </div>
          </div>
          <Link to="/flash-sale" className="text-blue-600 font-bold text-sm flex items-center hover:underline">
            See All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {flashSaleProducts.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 6. Just For You (Recommendations) */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Sparkles className="text-purple-500" /> Just For You
          </h2>
          <div className="flex gap-2">
             <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700"><Filter className="h-4 w-4 dark:text-white" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Image Search Modal */}
      {showImageSearch && (
        <ImageSearchModal 
          onClose={() => setShowImageSearch(false)}
          onSearch={(term) => { setSearchQuery(term); setShowImageSearch(false); }}
        />
      )}
    </div>
  );
}
