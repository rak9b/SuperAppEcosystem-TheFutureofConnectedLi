import { useState } from 'react';
import { Activity, Server, AlertTriangle, Users, TrendingUp, ShieldAlert, Cpu, Wallet, Briefcase, Ban, CheckCircle } from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Button } from '../components/ui/Button';

const data = [
  { name: '00:00', load: 20, prediction: 25 },
  { name: '04:00', load: 15, prediction: 18 },
  { name: '08:00', load: 65, prediction: 70 },
  { name: '12:00', load: 85, prediction: 90 },
  { name: '16:00', load: 75, prediction: 80 },
  { name: '20:00', load: 50, prediction: 55 },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'system' | 'fintech'>('system');

  // Mock Fintech Data
  const walletStats = [
    { label: 'Total Money in System', value: '$12.5M', icon: Wallet, color: 'text-green-400' },
    { label: 'Active Agents', value: '1,240', icon: Briefcase, color: 'text-purple-400' },
    { label: 'Daily Transactions', value: '45.2k', icon: Activity, color: 'text-blue-400' },
    { label: 'Fraud Attempts', value: '12', icon: ShieldAlert, color: 'text-red-400' },
  ];

  const agents = [
    { id: 1, name: 'Agent Smith', location: 'Dhaka', balance: 50000, status: 'Active' },
    { id: 2, name: 'Agent Doe', location: 'Chittagong', balance: 12000, status: 'Suspended' },
    { id: 3, name: 'Agent Johnson', location: 'Sylhet', balance: 85000, status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ServiceHeader title="Command Center" color="bg-gray-800" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button 
            onClick={() => setActiveTab('system')}
            className={`pb-3 px-4 font-bold ${activeTab === 'system' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          >
            System Health
          </button>
          <button 
            onClick={() => setActiveTab('fintech')}
            className={`pb-3 px-4 font-bold ${activeTab === 'fintech' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400'}`}
          >
            Fintech & Wallet
          </button>
        </div>

        {activeTab === 'system' && (
          <div className="animate-in fade-in">
            {/* Existing System Dashboard Content */}
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
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fintech' && (
          <div className="animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {walletStats.map((stat, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="font-bold mb-6 text-xl">Agent Management</h3>
              <table className="w-full text-left text-sm">
                <thead className="text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="pb-3">Agent Name</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Wallet Balance</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {agents.map(agent => (
                    <tr key={agent.id}>
                      <td className="py-4 font-bold">{agent.name}</td>
                      <td className="py-4">{agent.location}</td>
                      <td className="py-4">${agent.balance.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs ${agent.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="py-4">
                        {agent.status === 'Active' ? (
                          <Button size="sm" variant="danger" className="h-8"><Ban className="w-3 h-3 mr-1" /> Suspend</Button>
                        ) : (
                          <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700"><CheckCircle className="w-3 h-3 mr-1" /> Approve</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
