import { useState } from 'react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { MapPin, TrendingUp, DollarSign, Navigation, Shield, Star, Battery, Fuel, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { formatPrice } from '../lib/utils';

export function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'earnings' | 'performance'>('home');

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <ServiceHeader title="Driver Partner" color={isOnline ? "bg-green-600" : "bg-gray-800"} />

      <div className="container mx-auto px-4 py-6">
        {/* Status Toggle */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 flex items-center justify-between border border-gray-700 shadow-lg">
          <div>
            <h2 className="text-2xl font-bold">{isOnline ? 'You are Online' : 'You are Offline'}</h2>
            <p className="text-gray-400 text-sm">{isOnline ? 'Finding trips near Gulshan...' : 'Go online to start earning'}</p>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`w-16 h-8 rounded-full p-1 transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}
          >
            <motion.div 
              layout 
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              animate={{ x: isOnline ? 32 : 0 }}
            />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {['home', 'earnings', 'performance'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* AI Demand Heatmap Simulation */}
            <div className="bg-gray-800 rounded-2xl p-1 overflow-hidden border border-gray-700 relative h-64">
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/OpenStreetMap_Logo_2011.svg/1024px-OpenStreetMap_Logo_2011.svg.png')] bg-cover opacity-20 grayscale"></div>
              
              {/* Heatmap Blobs */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/40 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-orange-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur p-4 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">High Demand in Banani</h3>
                    <p className="text-xs text-gray-400">1.5x Surge Pricing Active • 5 min away</p>
                  </div>
                  <Button size="sm" className="ml-auto bg-blue-600">Navigate</Button>
                </div>
              </div>
            </div>

            {/* Today's Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Today's Earnings</p>
                <h3 className="text-2xl font-bold text-green-400">$45.20</h3>
                <p className="text-xs text-gray-500">5 Trips</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Acceptance Rate</p>
                <h3 className="text-2xl font-bold text-blue-400">92%</h3>
                <p className="text-xs text-gray-500">Top Tier</p>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl">
              <h3 className="font-bold text-blue-400 text-sm mb-2 flex items-center"><Navigation className="h-4 w-4 mr-2" /> AI Route Suggestion</h3>
              <p className="text-xs text-gray-300 mb-3">Traffic is building up on Airport Road. Take the bypass to save 15 mins on your next trip.</p>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">Weekly Balance</p>
              <h1 className="text-5xl font-bold text-white mb-2">$342.50</h1>
              <p className="text-green-400 text-sm">+12% vs last week</p>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden">
              {[
                { day: 'Today', amount: 45.20 },
                { day: 'Yesterday', amount: 82.10 },
                { day: 'Mon', amount: 65.00 },
                { day: 'Sun', amount: 120.50 },
              ].map((d, i) => (
                <div key={i} className="flex justify-between p-4 border-b border-gray-700 last:border-0">
                  <span className="text-gray-300">{d.day}</span>
                  <span className="font-bold">{formatPrice(d.amount)}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">Instant Cashout</Button>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
              <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="h-10 w-10 text-yellow-400 fill-current" />
              </div>
              <h2 className="text-3xl font-bold">4.92</h2>
              <p className="text-gray-400 text-sm">Average Rating</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                 <Shield className="h-6 w-6 text-green-500 mb-2" />
                 <h3 className="font-bold text-sm">Safety Score</h3>
                 <p className="text-2xl font-bold">98/100</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                 <Fuel className="h-6 w-6 text-orange-500 mb-2" />
                 <h3 className="font-bold text-sm">Eco Driving</h3>
                 <p className="text-2xl font-bold">Excellent</p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="font-bold text-sm mb-4">Document Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Driving License</span>
                  <span className="text-green-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> Verified</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Vehicle Insurance</span>
                  <span className="text-green-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> Verified</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Background Check</span>
                  <span className="text-green-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> Clear</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
