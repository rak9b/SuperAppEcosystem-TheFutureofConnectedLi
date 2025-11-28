import { useState } from 'react';
import { useParcelStore, Parcel } from '../../store/useParcelStore';
import { useStore } from '../../store/useStore';
import { useToastStore } from '../../store/useToastStore';
import { Package, ArrowUpRight, ArrowDownLeft, Settings, Search, XCircle, Eye, Check, Users, Ban, Unlock } from 'lucide-react';
import { Button } from '../ui/Button';
import { format } from 'date-fns';
import { CreateParcelModal } from './CreateParcelModal';
import { ParcelTracking } from './ParcelTracking';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function ParcelDashboard() {
  const { user } = useStore();
  const { parcels, cancelParcel, updateParcelStatus } = useParcelStore();
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState<'sender' | 'receiver' | 'admin'>('sender');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [trackingParcel, setTrackingParcel] = useState<Parcel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Logic
  const mySentParcels = parcels.filter(p => p.senderId === (user?.id || 'guest'));
  const myReceivedParcels = parcels.filter(p => p.receiverName === (user?.name || 'Guest'));
  const allParcels = parcels.filter(p => 
    p.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.senderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const paginate = (items: any[]) => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const totalPages = (items: any[]) => Math.ceil(items.length / itemsPerPage);

  // Admin Stats
  const stats = {
    total: parcels.length,
    delivered: parcels.filter(p => p.status === 'Delivered').length,
    transit: parcels.filter(p => p.status === 'In Transit').length,
    pending: parcels.filter(p => p.status === 'Pending').length
  };

  const pieData = [
    { name: 'Delivered', value: stats.delivered, color: '#22c55e' },
    { name: 'Transit', value: stats.transit, color: '#3b82f6' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
  ];

  const barData = [
    { name: 'Jan', shipments: 40 },
    { name: 'Feb', shipments: 65 },
    { name: 'Mar', shipments: 85 },
    { name: 'Apr', shipments: 55 },
  ];

  // Mock Users for Admin
  const mockUsers = [
    { id: 1, name: 'John User', role: 'Sender', status: 'Active' },
    { id: 2, name: 'Alice Smith', role: 'Receiver', status: 'Blocked' },
    { id: 3, name: 'Bob Brown', role: 'Sender', status: 'Active' },
  ];

  const handleStatusUpdate = (id: string, status: any) => {
    updateParcelStatus(id, status, 'Admin Update');
    addToast(`Parcel status updated to ${status}`, 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Role Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm border dark:border-gray-700 inline-flex">
          {[
            { id: 'sender', label: 'Sender', icon: ArrowUpRight },
            { id: 'receiver', label: 'Receiver', icon: ArrowDownLeft },
            { id: 'admin', label: 'Admin', icon: Settings },
          ].map(role => (
            <button
              key={role.id}
              onClick={() => { setActiveTab(role.id as any); setCurrentPage(1); }}
              className={`px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === role.id ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <role.icon className="w-4 h-4" /> {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* SENDER VIEW */}
      {activeTab === 'sender' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold dark:text-white">My Shipments</h2>
            <Button onClick={() => setShowCreateModal(true)} className="bg-orange-600 hover:bg-orange-700">
              <Package className="w-4 h-4 mr-2" /> New Shipment
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border dark:border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                <tr>
                  <th className="p-4 text-sm font-bold text-gray-500">Tracking ID</th>
                  <th className="p-4 text-sm font-bold text-gray-500">Receiver</th>
                  <th className="p-4 text-sm font-bold text-gray-500">Status</th>
                  <th className="p-4 text-sm font-bold text-gray-500">Date</th>
                  <th className="p-4 text-sm font-bold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {paginate(mySentParcels).map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="p-4 font-mono text-sm font-bold text-blue-600">{p.trackingId}</td>
                    <td className="p-4 dark:text-white">{p.receiverName}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.status === 'Delivered' ? 'bg-green-100 text-green-700' : p.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{format(new Date(p.createdAt), 'MMM dd, yyyy')}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => setTrackingParcel(p)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg" title="Track"><Eye className="w-4 h-4" /></button>
                      {p.status === 'Pending' && (
                        <button onClick={() => { cancelParcel(p.id); addToast('Parcel Cancelled', 'info'); }} className="p-2 hover:bg-red-50 text-red-600 rounded-lg" title="Cancel"><XCircle className="w-4 h-4" /></button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {mySentParcels.length > itemsPerPage && (
              <div className="p-4 border-t dark:border-gray-700 flex justify-center gap-2">
                <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</Button>
                <span className="px-3 py-1 text-sm font-medium dark:text-white">Page {currentPage} of {totalPages(mySentParcels)}</span>
                <Button size="sm" variant="outline" disabled={currentPage === totalPages(mySentParcels)} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RECEIVER VIEW */}
      {activeTab === 'receiver' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold dark:text-white">Incoming Deliveries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myReceivedParcels.map(p => (
              <div key={p.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-blue-600 font-bold">{p.trackingId}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">{p.status}</span>
                  </div>
                  <p className="font-bold dark:text-white text-lg">From: {p.senderName}</p>
                  <p className="text-sm text-gray-500">Est: {format(new Date(p.estimatedDelivery), 'MMM dd')}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={() => setTrackingParcel(p)}>Track</Button>
                  {p.status === 'Out for Delivery' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => { updateParcelStatus(p.id, 'Delivered', 'Confirmed by Receiver'); addToast('Delivery Confirmed!', 'success'); }}>
                      Confirm Receipt
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {myReceivedParcels.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-500 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700">
                No incoming parcels found for your account.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN VIEW */}
      {activeTab === 'admin' && (
        <div className="space-y-8">
          {/* Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
              <p className="text-gray-500 text-xs uppercase font-bold">Total Parcels</p>
              <p className="text-2xl font-bold dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-green-500">
              <p className="text-gray-500 text-xs uppercase font-bold">Delivered</p>
              <p className="text-2xl font-bold dark:text-white">{stats.delivered}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <p className="text-gray-500 text-xs uppercase font-bold">In Transit</p>
              <p className="text-2xl font-bold dark:text-white">{stats.transit}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-l-4 border-red-500">
              <p className="text-gray-500 text-xs uppercase font-bold">Pending</p>
              <p className="text-2xl font-bold dark:text-white">{stats.pending}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Pie Chart */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold mb-4 dark:text-white">Delivery Status</h3>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {pieData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Pie>
                         <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Bar Chart */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold mb-4 dark:text-white">Monthly Shipments</h3>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} />
                         <YAxis axisLine={false} tickLine={false} />
                         <Tooltip cursor={{fill: 'transparent'}} />
                         <Bar dataKey="shipments" fill="#ea580c" radius={[4, 4, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>

          {/* Management Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Parcel Table */}
             <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold dark:text-white">Manage Parcels</h3>
                   <div className="relative">
                      <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search ID..." 
                        className="pl-8 pr-4 py-1.5 rounded-lg border text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                   </div>
                </div>
                <div className="overflow-y-auto flex-1 max-h-80">
                   <table className="w-full text-left text-sm">
                      <thead className="text-gray-500 border-b dark:border-gray-700">
                         <tr>
                            <th className="pb-2">ID</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2">Action</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-gray-700">
                         {allParcels.map(p => (
                            <tr key={p.id}>
                               <td className="py-3 font-mono text-blue-600">{p.trackingId}</td>
                               <td className="py-3">{p.status}</td>
                               <td className="py-3">
                                  <select 
                                    className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-xs"
                                    value={p.status}
                                    onChange={(e) => handleStatusUpdate(p.id, e.target.value)}
                                  >
                                     <option>Pending</option>
                                     <option>In Transit</option>
                                     <option>Delivered</option>
                                     <option>Cancelled</option>
                                  </select>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* User Management */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold dark:text-white mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> User Management</h3>
                <div className="space-y-4">
                   {mockUsers.map(u => (
                      <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                         <div>
                            <p className="font-bold text-sm dark:text-white">{u.name}</p>
                            <p className="text-xs text-gray-500">{u.role}</p>
                         </div>
                         {u.status === 'Active' ? (
                            <button className="text-red-500 hover:bg-red-50 p-1 rounded" title="Block"><Ban className="w-4 h-4" /></button>
                         ) : (
                            <button className="text-green-500 hover:bg-green-50 p-1 rounded" title="Unblock"><Unlock className="w-4 h-4" /></button>
                         )}
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateParcelModal onClose={() => setShowCreateModal(false)} />}
      {trackingParcel && <ParcelTracking parcel={trackingParcel} onClose={() => setTrackingParcel(null)} />}
    </div>
  );
}
