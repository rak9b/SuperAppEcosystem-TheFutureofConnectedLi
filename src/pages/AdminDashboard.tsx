import { Activity, Server, AlertTriangle, Users, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: '00:00', load: 20, prediction: 25 },
  { name: '04:00', load: 15, prediction: 18 },
  { name: '08:00', load: 65, prediction: 70 },
  { name: '12:00', load: 85, prediction: 90 },
  { name: '16:00', load: 75, prediction: 80 },
  { name: '20:00', load: 50, prediction: 55 },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ServiceHeader title="AI Command Center" color="bg-gray-800" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Server Load AI</h3>
              <Server className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold mb-1">42%</div>
            <div className="text-xs text-green-400">Auto-scaling active</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Threat Detection</h3>
              <ShieldAlert className="h-5 w-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold mb-1">0</div>
            <div className="text-xs text-gray-400">System secure</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">AI Predictions</h3>
              <Cpu className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold mb-1">98.5%</div>
            <div className="text-xs text-purple-400">Accuracy rate</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm">Active Users</h3>
              <Users className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold mb-1">12.4k</div>
            <div className="text-xs text-yellow-400">+12% vs predicted</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold mb-6 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-500" /> 
              Traffic Load vs AI Prediction
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                  <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="prediction" stroke="#8b5cf6" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
             <h3 className="font-bold mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" /> 
              System Anomalies (Last 24h)
            </h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                   <span className="text-sm">Payment Gateway Latency Spike</span>
                 </div>
                 <span className="text-xs text-gray-400">Fixed by AI (Auto-reroute)</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                   <span className="text-sm">Unusual Login Pattern (Region: Asia)</span>
                 </div>
                 <span className="text-xs text-gray-400">Flagged for Review</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                   <span className="text-sm">Inventory Sync Delay</span>
                 </div>
                 <span className="text-xs text-gray-400">Optimized</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
