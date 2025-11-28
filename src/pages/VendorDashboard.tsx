import { TrendingUp, Package, Users, Camera, Sparkles, BarChart3 } from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Button } from '../components/ui/Button';

export function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceHeader title="Merchant AI Studio" color="bg-indigo-900" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Sales Forecast (AI)</h3>
              <p className="text-3xl font-bold text-gray-900">$12,450</p>
              <p className="text-xs text-green-600 mt-1">Predicted for next week (+15%)</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Inventory Alert</h3>
              <p className="text-3xl font-bold text-gray-900">2 Items</p>
              <p className="text-xs text-red-600 mt-1">Low stock predicted by Friday</p>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Customer Sentiment</h3>
              <p className="text-3xl font-bold text-gray-900">Positive</p>
              <p className="text-xs text-purple-600 mt-1">Based on recent review analysis</p>
           </div>
        </div>

        <h2 className="text-xl font-bold mb-4">AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Camera className="h-6 w-6 text-indigo-600 group-hover:text-white" />
              </div>
              <h3 className="font-bold mb-2">AI Photo Enhancer</h3>
              <p className="text-sm text-gray-500">Automatically improve product lighting and remove backgrounds.</p>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                <Sparkles className="h-6 w-6 text-pink-600 group-hover:text-white" />
              </div>
              <h3 className="font-bold mb-2">Smart Description Writer</h3>
              <p className="text-sm text-gray-500">Generate SEO-optimized product descriptions in seconds.</p>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <BarChart3 className="h-6 w-6 text-orange-600 group-hover:text-white" />
              </div>
              <h3 className="font-bold mb-2">Dynamic Pricing Engine</h3>
              <p className="text-sm text-gray-500">Adjust prices automatically based on competitor analysis.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
