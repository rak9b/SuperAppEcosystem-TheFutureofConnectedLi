import { 
  Wallet, ArrowUpRight, ArrowDownLeft, ScanLine, CreditCard, History, 
  ShieldCheck, PieChart, FileText, Users, Gift, Smartphone, Landmark, 
  Banknote, Globe, Zap, TrendingUp, Umbrella, Ticket, Wifi, Droplets, 
  Lightbulb, GraduationCap, Plus, Bitcoin, DollarSign, Lock, Building2,
  Plane, Train, Bus, Receipt, Search, Filter, Calendar
} from 'lucide-react';
import { useSuperAppStore } from '../../store/useSuperAppStore';
import { formatPrice } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Chart Data
const SPENDING_DATA = [
  { name: 'Mon', amount: 120 },
  { name: 'Tue', amount: 250 },
  { name: 'Wed', amount: 80 },
  { name: 'Thu', amount: 400 },
  { name: 'Fri', amount: 150 },
  { name: 'Sat', amount: 550 },
  { name: 'Sun', amount: 300 },
];

export function UserWallet() {
  const { wallet, topUpWallet, sendMoney, payBill, takeLoan, addToSavings, invest, buyInsurance, requestMoney } = useSuperAppStore();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedTab, setSelectedTab] = useState<'services' | 'finance' | 'history'>('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Pagination for History
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = wallet.transactions.filter(t => 
    (filterType === 'all' || t.type === filterType) &&
    (t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.amount.toString().includes(searchTerm))
  );

  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleAction = () => {
    const val = parseFloat(amount);
    if (!val && activeModal !== 'request') return;

    let success = false;
    
    if (['ticketing', 'gov_pay', 'donation'].includes(activeModal || '')) {
      success = payBill(val, activeModal === 'ticketing' ? 'Ticket Purchase' : activeModal === 'gov_pay' ? 'Govt Fee' : 'Donation');
    } else {
       switch(activeModal) {
        case 'send': success = sendMoney(val, recipient || "Friend"); break;
        case 'remit': success = sendMoney(val, recipient || "International", true); break;
        case 'request': requestMoney(val, recipient || "Friend"); success = true; break;
        case 'topup': topUpWallet(val); success = true; break;
        case 'mobile': success = payBill(val, "Mobile Recharge"); break;
        case 'electricity': success = payBill(val, "Electricity"); break;
        case 'internet': success = payBill(val, "Internet"); break;
        case 'water': success = payBill(val, "Water"); break;
        case 'gas': success = payBill(val, "Gas Bill"); break;
        case 'education': success = payBill(val, "Tuition Fee"); break;
        case 'loan_bnpl': takeLoan(val, 'BNPL'); success = true; break;
        case 'loan_personal': takeLoan(val, 'Personal'); success = true; break;
        case 'savings': success = addToSavings(val); break;
        case 'invest_stock': success = invest(val, 'AAPL', 'Apple Inc.', 'stock'); break;
        case 'invest_crypto': success = invest(val, 'BTC', 'Bitcoin', 'crypto'); break;
        case 'insurance_health': success = buyInsurance('Health', val); break;
        default: success = false;
      }
    }

    if (success) {
      setActiveModal(null);
      setAmount('');
      setRecipient('');
      alert("Transaction Successful!");
    } else {
      alert("Insufficient Balance or Error");
    }
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'send': return { title: 'Send Money', icon: ArrowUpRight, color: 'text-blue-600', showRecipient: true };
      case 'remit': return { title: 'Remittance', icon: Globe, color: 'text-purple-600', showRecipient: true, note: 'Receive from abroad or send' };
      case 'request': return { title: 'Request Money', icon: ArrowDownLeft, color: 'text-green-600', showRecipient: true };
      case 'topup': return { title: 'Add Money', icon: Plus, color: 'text-green-600', note: 'From Bank or Card' };
      case 'mobile': return { title: 'Mobile Recharge', icon: Smartphone, color: 'text-blue-500' };
      case 'ticketing': return { title: 'Buy Tickets', icon: Ticket, color: 'text-pink-500', note: 'Bus, Train, Launch, Air' };
      case 'gov_pay': return { title: 'Govt. Payment', icon: Building2, color: 'text-gray-600', note: 'Tax, Fees, Challan' };
      case 'donation': return { title: 'Donation', icon: Gift, color: 'text-red-500' };
      default: return { title: 'Payment', icon: Wallet, color: 'text-gray-600' };
    }
  };

  const modalData = activeModal ? renderModalContent() : null;

  return (
    <div className="pb-20">
      {/* --- MFS HEADER (bKash Style) --- */}
      <div className="bg-pink-600 px-4 pb-8 pt-4 rounded-b-[2rem] shadow-xl text-white relative overflow-hidden" id="wallet-header">
        <div className="container mx-auto max-w-4xl relative z-10">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/10">
                    <span className="font-bold text-lg">JD</span>
                 </div>
                 <div className="bg-white/20 px-4 py-2 rounded-full cursor-pointer hover:bg-white/30 transition-all" id="balance-card">
                    <p className="text-xs opacity-80">Tap for Balance</p>
                    <p className="font-bold text-lg tracking-wide">{formatPrice(wallet.balance)}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs opacity-80">Reward Points</p>
                    <p className="font-bold text-yellow-300 flex items-center justify-end gap-1">
                       <Gift className="h-3 w-3" /> {wallet.points}
                    </p>
                 </div>
                 <button className="w-10 h-10 bg-white text-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <ScanLine className="h-5 w-5" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 -mt-6 relative z-20 max-w-4xl">
        
        {/* MFS Core Grid */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-8" id="quick-actions">
           <div className="grid grid-cols-4 md:grid-cols-4 gap-y-6 gap-x-2">
              {[
                { id: 'send', label: 'Send Money', icon: ArrowUpRight, color: 'text-pink-600' },
                { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone, color: 'text-pink-600' },
                { id: 'cashout', label: 'Cash Out', icon: ArrowDownLeft, color: 'text-pink-600' },
                { id: 'payment', label: 'Payment', icon: CreditCard, color: 'text-pink-600' },
                { id: 'topup', label: 'Add Money', icon: Plus, color: 'text-pink-600' },
                { id: 'paybill', label: 'Pay Bill', icon: Zap, color: 'text-pink-600' },
                { id: 'savings', label: 'Savings', icon: Landmark, color: 'text-pink-600' },
                { id: 'loan', label: 'Loan', icon: Banknote, color: 'text-pink-600' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveModal(item.id === 'paybill' ? 'electricity' : item.id === 'loan' ? 'loan_personal' : item.id)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <span className="text-[10px] md:text-xs font-medium text-center text-gray-600 dark:text-gray-300 leading-tight">{item.label}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b dark:border-gray-700 overflow-x-auto" id="wallet-tabs">
           {['services', 'finance', 'history'].map(tab => (
              <button 
                key={tab}
                onClick={() => setSelectedTab(tab as any)}
                className={`pb-2 px-4 text-sm font-bold capitalize transition-colors whitespace-nowrap ${selectedTab === tab ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
           ))}
        </div>

        {/* --- TAB CONTENT: SERVICES --- */}
        {selectedTab === 'services' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* More Services */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4">More Services</h3>
               <div className="grid grid-cols-4 gap-4">
                  {[
                     { id: 'ticketing', label: 'Tickets', icon: Ticket, color: 'text-orange-500' },
                     { id: 'gov_pay', label: 'Govt. Pay', icon: Building2, color: 'text-gray-600' },
                     { id: 'remit', label: 'Remittance', icon: Globe, color: 'text-blue-500' },
                     { id: 'donation', label: 'Donation', icon: Gift, color: 'text-red-500' },
                     { id: 'insurance', label: 'Insurance', icon: Umbrella, color: 'text-purple-500' },
                     { id: 'games', label: 'Games', icon: Zap, color: 'text-yellow-500' },
                  ].map(item => (
                     <button key={item.id} onClick={() => setActiveModal(item.id === 'insurance' ? 'insurance_health' : item.id)} className="flex flex-col items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-xl transition-colors">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                        <span className="text-[10px] text-center font-medium dark:text-gray-300">{item.label}</span>
                     </button>
                  ))}
               </div>
            </div>

            {/* Suggestions / Offers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white flex items-center justify-between shadow-lg">
                  <div>
                     <p className="font-bold text-lg">Get 20% Cashback</p>
                     <p className="text-xs opacity-80">On your first electricity bill payment</p>
                  </div>
                  <Zap className="h-10 w-10 opacity-50" />
               </div>
               <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl p-4 text-white flex items-center justify-between shadow-lg">
                  <div>
                     <p className="font-bold text-lg">Refer a Friend</p>
                     <p className="text-xs opacity-80">Earn $5 for every referral</p>
                  </div>
                  <Users className="h-10 w-10 opacity-50" />
               </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: FINANCE --- */}
        {selectedTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             {/* Spending Chart */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm" id="spending-chart">
                <h3 className="font-bold text-gray-900 dark:text-white mb-6">Weekly Spending</h3>
                <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={SPENDING_DATA}>
                         <defs>
                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#db2777" stopOpacity={0.8}/>
                               <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                         <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                         <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                         <Area type="monotone" dataKey="amount" stroke="#db2777" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Credit Score */}
             <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl p-6 text-white flex justify-between items-center shadow-lg">
                <div>
                   <p className="text-sm text-gray-400 mb-1">Credit Score</p>
                   <h2 className="text-4xl font-bold text-green-400">{wallet.creditScore}</h2>
                   <p className="text-xs text-gray-400 mt-1">Excellent • Updated today</p>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-green-500 flex items-center justify-center text-green-500 font-bold">
                   A+
                </div>
             </div>
          </div>
        )}

        {/* --- TAB CONTENT: HISTORY --- */}
        {selectedTab === 'history' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4" id="transaction-history">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                   <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search transactions..." 
                        className="w-full pl-10 p-2.5 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                   </div>
                   <div className="flex gap-2">
                      <select 
                        className="p-2.5 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                         <option value="all">All Types</option>
                         <option value="credit">Money In</option>
                         <option value="debit">Money Out</option>
                      </select>
                      <Button variant="outline" size="sm"><Calendar className="h-4 w-4" /></Button>
                   </div>
                </div>

                <div className="space-y-4">
                   {paginatedTransactions.length > 0 ? (
                      paginatedTransactions.map((t) => (
                         <div key={t.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors border-b dark:border-gray-700 last:border-0">
                            <div className="flex items-center gap-3">
                               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                  {t.type === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                               </div>
                               <div>
                                  <p className="font-bold text-sm dark:text-white">{t.title}</p>
                                  <p className="text-xs text-gray-500">{t.date} • {t.category}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className={`font-bold text-sm ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                  {t.type === 'credit' ? '+' : '-'}{formatPrice(t.amount)}
                               </p>
                               <p className="text-xs text-gray-400">{t.method}</p>
                            </div>
                         </div>
                      ))
                   ) : (
                      <div className="text-center py-8 text-gray-500">No transactions found</div>
                   )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                   <div className="flex justify-center gap-2 mt-6">
                      <Button size="sm" variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</Button>
                      <span className="text-sm flex items-center dark:text-white">Page {currentPage} of {totalPages}</span>
                      <Button size="sm" variant="outline" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
                   </div>
                )}
             </div>
          </div>
        )}

        {/* --- DYNAMIC MODAL --- */}
        <AnimatePresence>
          {activeModal && modalData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden"
              >
                 <div className="relative z-10">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                       <modalData.icon className={`h-8 w-8 ${modalData.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-center dark:text-white mb-1">{modalData.title}</h3>
                    {modalData.note && <p className="text-xs text-center text-gray-500 mb-6">{modalData.note}</p>}
                    
                    <div className="space-y-4 mt-6">
                       {modalData.showRecipient && (
                          <div>
                             <label className="text-xs font-bold text-gray-500 ml-1">Recipient</label>
                             <input 
                               type="text" 
                               placeholder="Name, Phone, or ID" 
                               className="w-full p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-none outline-none font-medium dark:text-white"
                               value={recipient}
                               onChange={(e) => setRecipient(e.target.value)}
                             />
                          </div>
                       )}
                       
                       <div>
                          <label className="text-xs font-bold text-gray-500 ml-1">Amount</label>
                          <div className="relative">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                             <input 
                               type="number" 
                               placeholder="0.00" 
                               className="w-full p-4 pl-8 bg-gray-50 dark:bg-gray-900 rounded-xl border-none outline-none font-bold text-lg dark:text-white"
                               value={amount}
                               onChange={(e) => setAmount(e.target.value)}
                               autoFocus
                             />
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <Button variant="outline" className="flex-1 h-12 rounded-xl border-gray-200 dark:border-gray-600 dark:text-white" onClick={() => setActiveModal(null)}>Cancel</Button>
                      <Button className="flex-1 h-12 rounded-xl bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-200 dark:shadow-none" onClick={handleAction}>Confirm</Button>
                    </div>
                 </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
