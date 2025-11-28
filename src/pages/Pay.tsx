import { 
  Wallet, ArrowUpRight, ArrowDownLeft, ScanLine, CreditCard, History, 
  ShieldCheck, PieChart, FileText, Users, Gift, Smartphone, Landmark, 
  Banknote, Globe, Zap, TrendingUp, Umbrella, Ticket, Wifi, Droplets, 
  Lightbulb, GraduationCap, Plus, Bitcoin, DollarSign, Lock
} from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { useSuperAppStore } from '../store/useSuperAppStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePie, Pie, Cell } from 'recharts';

const SPENDING_DATA = [
  { name: 'Mon', amount: 120 },
  { name: 'Tue', amount: 250 },
  { name: 'Wed', amount: 80 },
  { name: 'Thu', amount: 400 },
  { name: 'Fri', amount: 150 },
  { name: 'Sat', amount: 550 },
  { name: 'Sun', amount: 300 },
];

const EXPENSE_DATA = [
  { name: 'Food', value: 400, color: '#10B981' },
  { name: 'Ride', value: 300, color: '#3B82F6' },
  { name: 'Bills', value: 300, color: '#F59E0B' },
  { name: 'Shop', value: 200, color: '#EC4899' },
];

export function Pay() {
  const { wallet, topUpWallet, sendMoney, payBill, takeLoan, addToSavings, invest, buyInsurance, requestMoney } = useSuperAppStore();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedTab, setSelectedTab] = useState<'services' | 'finance' | 'insights'>('services');

  const handleAction = () => {
    const val = parseFloat(amount);
    if (!val && activeModal !== 'request') return;

    let success = false;
    
    switch(activeModal) {
      case 'send': success = sendMoney(val, recipient || "Friend"); break;
      case 'remit': success = sendMoney(val, recipient || "International", true); break;
      case 'request': requestMoney(val, recipient || "Friend"); success = true; break;
      case 'topup': topUpWallet(val); success = true; break;
      case 'mobile': success = payBill(val, "Mobile Recharge"); break;
      case 'electricity': success = payBill(val, "Electricity"); break;
      case 'internet': success = payBill(val, "Internet"); break;
      case 'water': success = payBill(val, "Water"); break;
      case 'loan_bnpl': takeLoan(val, 'BNPL'); success = true; break;
      case 'loan_personal': takeLoan(val, 'Personal'); success = true; break;
      case 'savings': success = addToSavings(val); break;
      case 'invest_stock': success = invest(val, 'AAPL', 'Apple Inc.', 'stock'); break;
      case 'invest_crypto': success = invest(val, 'BTC', 'Bitcoin', 'crypto'); break;
      case 'insurance_health': success = buyInsurance('Health', val); break;
      default: success = false;
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
      case 'remit': return { title: 'Cross-Border Remittance', icon: Globe, color: 'text-purple-600', showRecipient: true, note: '2% Fee applies' };
      case 'request': return { title: 'Request Money', icon: ArrowDownLeft, color: 'text-green-600', showRecipient: true };
      case 'topup': return { title: 'Add Money to Wallet', icon: Plus, color: 'text-green-600' };
      case 'mobile': return { title: 'Mobile Recharge', icon: Smartphone, color: 'text-blue-500' };
      case 'electricity': return { title: 'Pay Electricity Bill', icon: Zap, color: 'text-yellow-500' };
      case 'loan_bnpl': return { title: 'Buy Now, Pay Later', icon: CreditCard, color: 'text-pink-500', note: '0% Interest for 30 days' };
      case 'invest_stock': return { title: 'Buy Apple Stock (AAPL)', icon: TrendingUp, color: 'text-green-600' };
      case 'insurance_health': return { title: 'Buy Health Insurance', icon: Umbrella, color: 'text-red-500', note: 'Coverage starts immediately' };
      default: return { title: 'Payment', icon: Wallet, color: 'text-gray-600' };
    }
  };

  const modalData = activeModal ? renderModalContent() : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <ServiceHeader title="Super Pay" color="bg-indigo-900" />
      
      {/* --- PREMIUM WALLET HEADER --- */}
      <div className="bg-indigo-900 px-4 pb-16 pt-6 rounded-b-[3rem] shadow-2xl text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Top Row */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/10">
                  <span className="font-bold">JD</span>
               </div>
               <div>
                  <p className="text-xs text-indigo-200">Total Balance</p>
                  <h1 className="text-3xl font-bold tracking-tight">{formatPrice(wallet.balance)}</h1>
               </div>
            </div>
            <div className="flex gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-xs text-indigo-200">Super Points</p>
                  <p className="font-bold text-yellow-400 flex items-center justify-end gap-1">
                     <Gift className="h-3 w-3" /> {wallet.points}
                  </p>
               </div>
               <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-all">
                  <ScanLine className="h-6 w-6" />
               </button>
            </div>
          </div>

          {/* Cards Carousel (Visual) */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
             {/* Digital Wallet Card */}
             <div className="snap-center shrink-0 w-72 h-44 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between border border-white/10">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="flex justify-between items-start">
                   <span className="text-xs font-bold tracking-widest uppercase opacity-80">Super Card</span>
                   <Wifi className="h-5 w-5 opacity-70 rotate-90" />
                </div>
                <div className="text-lg font-mono tracking-widest mt-4">
                   •••• •••• •••• 8892
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] opacity-70 uppercase">Card Holder</p>
                      <p className="text-sm font-bold">JOHN DOE</p>
                   </div>
                   <div className="flex flex-col items-end">
                      <p className="text-[10px] opacity-70 uppercase">Expires</p>
                      <p className="text-sm font-bold">12/28</p>
                   </div>
                </div>
             </div>

             {/* Linked Bank Card */}
             {wallet.cards.map(card => (
               <div key={card.id} className="snap-center shrink-0 w-72 h-44 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between border border-white/10">
                  <div className="flex justify-between items-start">
                     <span className="text-xs font-bold tracking-widest uppercase opacity-80">{card.type}</span>
                     <Lock className="h-4 w-4 opacity-70" />
                  </div>
                  <div className="text-lg font-mono tracking-widest mt-4">
                     •••• •••• •••• {card.last4}
                  </div>
                  <p className="text-xs opacity-60">Linked Bank Account</p>
               </div>
             ))}

             {/* Add Card */}
             <button onClick={() => alert("Simulate: Link Bank")} className="snap-center shrink-0 w-16 h-44 bg-white/5 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center hover:bg-white/10 transition-all">
                <Plus className="h-6 w-6 mb-2" />
                <span className="text-xs font-bold">Add</span>
             </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 max-w-4xl">
        
        {/* Quick Actions Floating Bar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex justify-between items-center mb-8">
           {[
             { id: 'send', label: 'Send', icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-100' },
             { id: 'request', label: 'Request', icon: ArrowDownLeft, color: 'text-green-600', bg: 'bg-green-100' },
             { id: 'topup', label: 'Add Money', icon: Plus, color: 'text-purple-600', bg: 'bg-purple-100' },
             { id: 'remit', label: 'Remit', icon: Globe, color: 'text-orange-600', bg: 'bg-orange-100' },
           ].map((action) => (
             <button 
               key={action.id}
               onClick={() => setActiveModal(action.id)}
               className="flex flex-col items-center gap-2 group"
             >
               <div className={`w-12 h-12 ${action.bg} rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}>
                 <action.icon className={`h-6 w-6 ${action.color}`} />
               </div>
               <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{action.label}</span>
             </button>
           ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b dark:border-gray-700">
           {['services', 'finance', 'insights'].map(tab => (
              <button 
                key={tab}
                onClick={() => setSelectedTab(tab as any)}
                className={`pb-2 px-2 text-sm font-bold capitalize transition-colors ${selectedTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
           ))}
        </div>

        {/* --- TAB CONTENT: SERVICES --- */}
        {selectedTab === 'services' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Bill Payments */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-500" /> Bills & Utilities
               </h3>
               <div className="grid grid-cols-4 gap-4">
                  {[
                     { id: 'mobile', label: 'Recharge', icon: Smartphone, color: 'text-blue-500' },
                     { id: 'electricity', label: 'Electricity', icon: Zap, color: 'text-yellow-500' },
                     { id: 'internet', label: 'Internet', icon: Wifi, color: 'text-cyan-500' },
                     { id: 'water', label: 'Water', icon: Droplets, color: 'text-blue-400' },
                     { id: 'gas', label: 'Gas', icon: Zap, color: 'text-orange-500' }, // Reusing Zap for Gas
                     { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-green-600' },
                  ].map(item => (
                     <button key={item.id} onClick={() => setActiveModal(item.id)} className="flex flex-col items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-xl transition-colors">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                        <span className="text-[10px] text-center font-medium dark:text-gray-300">{item.label}</span>
                     </button>
                  ))}
               </div>
            </div>

            {/* Lifestyle */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-pink-500" /> Lifestyle
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-md transition-all">
                     <Ticket className="h-8 w-8 text-pink-600" />
                     <div>
                        <p className="font-bold text-sm dark:text-white">Movie Tickets</p>
                        <p className="text-xs text-gray-500">Book Now</p>
                     </div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl flex items-center gap-3 cursor-pointer hover:shadow-md transition-all">
                     <Gift className="h-8 w-8 text-orange-600" />
                     <div>
                        <p className="font-bold text-sm dark:text-white">Gift Cards</p>
                        <p className="text-xs text-gray-500">Send love</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: FINANCE --- */}
        {selectedTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
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

             {/* Investments */}
             <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" /> Investments
                   </h3>
                   <button className="text-xs text-blue-600 font-bold">Portfolio</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                   <button onClick={() => setActiveModal('invest_stock')} className="p-4 border rounded-xl hover:border-green-500 hover:bg-green-50 dark:border-gray-700 dark:hover:bg-green-900/20 transition-all text-left">
                      <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 mb-2"><TrendingUp className="h-5 w-5" /></div>
                      <p className="font-bold text-sm dark:text-white">Stocks</p>
                      <p className="text-xs text-green-600">+12.5% return</p>
                   </button>
                   <button onClick={() => setActiveModal('invest_crypto')} className="p-4 border rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:border-gray-700 dark:hover:bg-orange-900/20 transition-all text-left">
                      <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 mb-2"><Bitcoin className="h-5 w-5" /></div>
                      <p className="font-bold text-sm dark:text-white">Crypto</p>
                      <p className="text-xs text-orange-600">Bitcoin, ETH</p>
                   </button>
                </div>

                {/* Holdings List */}
                <div className="space-y-3">
                   {wallet.investments.map(inv => (
                      <div key={inv.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-xs shadow-sm">{inv.symbol[0]}</div>
                            <div>
                               <p className="font-bold text-sm dark:text-white">{inv.symbol}</p>
                               <p className="text-xs text-gray-500">{inv.amount} units</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="font-bold text-sm dark:text-white">{formatPrice(inv.currentPrice * inv.amount)}</p>
                            <p className="text-xs text-green-500">+2.4%</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Loans & Insurance */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                   <h3 className="font-bold text-sm mb-3 dark:text-white flex items-center gap-2"><Banknote className="h-4 w-4 text-red-500" /> Loans</h3>
                   <button onClick={() => setActiveModal('loan_bnpl')} className="w-full text-left p-3 bg-red-50 dark:bg-red-900/20 rounded-xl mb-2 hover:bg-red-100 transition-colors">
                      <p className="text-xs font-bold text-red-600">BNPL (Pay Later)</p>
                      <p className="text-[10px] text-gray-500">0% interest for 30 days</p>
                   </button>
                   <button onClick={() => setActiveModal('loan_personal')} className="w-full text-left p-3 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 transition-colors">
                      <p className="text-xs font-bold text-red-600">Instant Loan</p>
                      <p className="text-[10px] text-gray-500">Up to $5000</p>
                   </button>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                   <h3 className="font-bold text-sm mb-3 dark:text-white flex items-center gap-2"><Umbrella className="h-4 w-4 text-blue-500" /> Insurance</h3>
                   <button onClick={() => setActiveModal('insurance_health')} className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-2 hover:bg-blue-100 transition-colors">
                      <p className="text-xs font-bold text-blue-600">Health</p>
                      <p className="text-[10px] text-gray-500">From $5/mo</p>
                   </button>
                   <div className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-xs font-bold text-gray-400">Vehicle (Coming Soon)</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB CONTENT: INSIGHTS --- */}
        {selectedTab === 'insights' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             {/* Spending Chart */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-6">Weekly Spending</h3>
                <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={SPENDING_DATA}>
                         <defs>
                            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                               <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                         <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                         <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                         <Area type="monotone" dataKey="amount" stroke="#6366f1" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Category Breakdown */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                   <h3 className="font-bold text-gray-900 dark:text-white mb-4">Expense Breakdown</h3>
                   <div className="h-48 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                         <RePie data={EXPENSE_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {EXPENSE_DATA.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </RePie>
                      </ResponsiveContainer>
                   </div>
                   <div className="flex justify-center gap-4 mt-2">
                      {EXPENSE_DATA.map(e => (
                         <div key={e.name} className="flex items-center gap-1 text-xs text-gray-500">
                            <div className="w-2 h-2 rounded-full" style={{backgroundColor: e.color}}></div>
                            {e.name}
                         </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                   <h3 className="font-bold text-gray-900 dark:text-white mb-4">Financial Health</h3>
                   <div className="space-y-4">
                      <div>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Budget Used</span>
                            <span className="font-bold text-gray-900 dark:text-white">65%</span>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Savings Goal</span>
                            <span className="font-bold text-gray-900 dark:text-white">40%</span>
                         </div>
                         <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '40%'}}></div>
                         </div>
                      </div>
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl flex items-start gap-3 mt-4">
                         <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                         <div>
                            <p className="text-xs font-bold text-yellow-800 dark:text-yellow-400">Smart Insight</p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-1">You spent 15% more on dining this week. Consider cooking at home to save $45.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

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
               {/* Decorative Header */}
               <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 -z-0"></div>
               
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
                    <Button className="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none" onClick={handleAction}>Confirm</Button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
