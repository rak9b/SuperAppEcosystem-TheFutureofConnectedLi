import { useState } from 'react';
import { TrendingUp, Package, Users, Camera, Sparkles, BarChart3, Plus, Trash2, Edit, FileText, AlertTriangle, ArrowRight } from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { AIProductForm } from '../components/shop/AIProductForm';
import { formatPrice } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function VendorDashboard() {
  const { user, products, addProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'rfq'>('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Mock Vendor Products (In real app, filter by user.id)
  const myProducts = products.filter(p => p.vendorId === 'v1'); // Hardcoded for demo

  const handleAIProductAdd = (data: any) => {
    const newProduct = {
      id: `p-${Date.now()}`,
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: '1', // Default
      vendorId: 'v1',
      vendorName: user?.name || 'My Shop',
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60'],
      stock: 100,
      rating: 0,
      reviewsCount: 0,
      attributes: { Condition: 'New' },
      createdAt: new Date().toISOString()
    };
    addProduct(newProduct);
    setShowAddProduct(false);
    alert("Product added successfully!");
  };

  // Mock Inventory Data
  const inventoryData = [
    { day: 'Mon', stock: 100 },
    { day: 'Tue', stock: 95 },
    { day: 'Wed', stock: 80 },
    { day: 'Thu', stock: 75 },
    { day: 'Fri', stock: 40 },
    { day: 'Sat', stock: 20 },
    { day: 'Sun (Pred)', stock: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader title="Seller Center" color="bg-indigo-900" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b dark:border-gray-700 overflow-x-auto">
          {['overview', 'products', 'orders', 'rfq', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-4 text-sm font-bold capitalize transition-colors border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'rfq' ? 'RFQ (B2B)' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                  <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">$12,450</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> +15% this week</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                  <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">142</p>
                  <p className="text-xs text-blue-600 mt-1">5 pending shipment</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                  <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Shop Rating</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">4.8</p>
                  <p className="text-xs text-purple-600 mt-1">Top Rated Seller</p>
               </div>
            </div>

            {/* Smart Inventory Prediction */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 mb-8">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                     <Sparkles className="h-5 w-5 text-indigo-500" /> Smart Inventory Prediction
                  </h3>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded flex items-center">
                     <AlertTriangle className="h-3 w-3 mr-1" /> Restock Needed Soon
                  </span>
               </div>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={inventoryData}>
                        <defs>
                           <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="stock" stroke="#6366f1" fillOpacity={1} fill="url(#colorStock)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <p className="text-sm text-gray-500 mt-4 text-center">
                  AI predicts your "Wireless Headphones" will go out of stock by Sunday based on current sales velocity.
               </p>
            </div>

            <h2 className="text-xl font-bold mb-4 dark:text-white">AI Seller Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 hover:shadow-md transition-all group cursor-pointer" onClick={() => { setActiveTab('products'); setShowAddProduct(true); }}>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Sparkles className="h-6 w-6 text-indigo-600 group-hover:text-white" />
                  </div>
                  <h3 className="font-bold mb-2 dark:text-white">AI Listing Generator</h3>
                  <p className="text-sm text-gray-500">Create product listings in seconds with AI.</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 hover:shadow-md transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <BarChart3 className="h-6 w-6 text-orange-600 group-hover:text-white" />
                  </div>
                  <h3 className="font-bold mb-2 dark:text-white">Price Optimizer</h3>
                  <p className="text-sm text-gray-500">AI suggests competitive pricing based on market.</p>
               </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold dark:text-white">Product Management</h2>
              <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </div>

            {showAddProduct && <AIProductForm onGenerate={handleAIProductAdd} />}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border dark:border-gray-700">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                  <tr>
                    <th className="p-4 font-bold text-sm text-gray-500">Product</th>
                    <th className="p-4 font-bold text-sm text-gray-500">Price</th>
                    <th className="p-4 font-bold text-sm text-gray-500">Stock</th>
                    <th className="p-4 font-bold text-sm text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {myProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={product.images[0]} className="w-10 h-10 rounded object-cover bg-gray-100" />
                          <span className="font-medium dark:text-white">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 dark:text-gray-300">{formatPrice(product.price)}</td>
                      <td className="p-4 dark:text-gray-300">{product.stock}</td>
                      <td className="p-4 flex gap-2">
                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded"><Edit className="h-4 w-4" /></button>
                        <button className="p-2 hover:bg-red-50 text-red-600 rounded"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {myProducts.length === 0 && (
                <div className="p-8 text-center text-gray-500">No products found. Add one to get started.</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'rfq' && (
           <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-bold dark:text-white">Request for Quotations (B2B)</h2>
                 <span className="text-sm text-gray-500">3 New Requests</span>
              </div>

              <div className="space-y-4">
                 {[
                    { id: 1, product: 'Wireless Headphones', qty: 500, company: 'TechRetail Ltd', date: '2 hours ago' },
                    { id: 2, product: 'Smart Watch Series 5', qty: 200, company: 'GadgetZone', date: '5 hours ago' },
                    { id: 3, product: 'USB-C Cables', qty: 1000, company: 'Global Imports', date: '1 day ago' },
                 ].map((rfq) => (
                    <div key={rfq.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex justify-between items-center">
                       <div>
                          <h3 className="font-bold text-lg dark:text-white">{rfq.product}</h3>
                          <p className="text-sm text-gray-500 mb-2">Requested by <span className="font-medium text-blue-600">{rfq.company}</span> • {rfq.date}</p>
                          <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
                             <Package className="h-3 w-3 mr-1" /> Qty: {rfq.qty}
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <Button variant="outline" size="sm">Decline</Button>
                          <Button size="sm">Send Quote <ArrowRight className="h-3 w-3 ml-1" /></Button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
