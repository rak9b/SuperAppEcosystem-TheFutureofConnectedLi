import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Button } from '../components/ui/Button';
import { DollarSign, Users, BarChart, Globe } from 'lucide-react';

export function Affiliate() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="Affiliate Program" color="bg-purple-900" />
      
      <div className="container mx-auto px-4 py-20 text-center">
         <h1 className="text-4xl font-bold mb-6 dark:text-white">Earn with SuperApp</h1>
         <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">Promote products you love and earn up to 15% commission on every sale.</p>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"><DollarSign /></div>
               <h3 className="font-bold mb-2 dark:text-white">High Commissions</h3>
               <p className="text-sm text-gray-500">Competitive rates across all categories.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600"><BarChart /></div>
               <h3 className="font-bold mb-2 dark:text-white">Real-time Tracking</h3>
               <p className="text-sm text-gray-500">Monitor clicks and earnings instantly.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600"><Globe /></div>
               <h3 className="font-bold mb-2 dark:text-white">Global Reach</h3>
               <p className="text-sm text-gray-500">Monetize traffic from anywhere.</p>
            </div>
         </div>

         <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Join Now - It's Free</Button>
      </div>
    </div>
  );
}
