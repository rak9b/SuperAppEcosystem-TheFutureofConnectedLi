import { useState } from 'react';
import { useSuperAppStore } from '../../store/useSuperAppStore';
import { formatPrice } from '../../lib/utils';
import { Button } from '../ui/Button';
import { ArrowUpRight, ArrowDownLeft, DollarSign, History, User, Phone, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function AgentWallet() {
  const { wallet, agentCashIn, agentCashOut } = useSuperAppStore();
  const [activeAction, setActiveAction] = useState<'cashin' | 'cashout' | null>(null);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');

  const handleTransaction = () => {
    const val = parseFloat(amount);
    if (!val || !phone) return;

    if (activeAction === 'cashin') {
      agentCashIn(val, phone);
      alert(`Cash In of ${formatPrice(val)} to ${phone} successful!`);
    } else {
      agentCashOut(val, phone);
      alert(`Cash Out of ${formatPrice(val)} from ${phone} successful!`);
    }
    setActiveAction(null);
    setAmount('');
    setPhone('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Agent Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-purple-200 text-sm font-bold uppercase tracking-wider mb-1">Agent Balance</p>
            <h1 className="text-5xl font-bold mb-2">{formatPrice(wallet.agentBalance)}</h1>
            <p className="text-sm opacity-80">Total Commission Earned: {formatPrice(wallet.totalCommission)}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 p-4 rounded-2xl text-center backdrop-blur-md">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <p className="text-xs text-purple-200">Daily Vol</p>
              <p className="font-bold">$12,450</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl text-center backdrop-blur-md">
              <User className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <p className="text-xs text-purple-200">Customers</p>
              <p className="font-bold">142</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-green-500 cursor-pointer"
          onClick={() => setActiveAction('cashin')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white">Cash In</h3>
          </div>
          <p className="text-gray-500 text-sm">Deposit money into a customer's wallet.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-red-500 cursor-pointer"
          onClick={() => setActiveAction('cashout')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <ArrowDownLeft className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white">Cash Out</h3>
          </div>
          <p className="text-gray-500 text-sm">Withdraw money from a customer's wallet.</p>
        </motion.div>
      </div>

      {/* Transaction Form */}
      {activeAction && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg mb-8 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2">
            {activeAction === 'cashin' ? <ArrowUpRight className="text-green-500" /> : <ArrowDownLeft className="text-red-500" />}
            {activeAction === 'cashin' ? 'Process Cash In' : 'Process Cash Out'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Customer Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="017..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-2">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="number" 
                  className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setActiveAction(null)}>Cancel</Button>
            <Button 
              className={activeAction === 'cashin' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              onClick={handleTransaction}
            >
              Confirm Transaction
            </Button>
          </div>
        </motion.div>
      )}

      {/* History */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6">
        <h3 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2">
          <History className="w-5 h-5" /> Recent Transactions
        </h3>
        <div className="space-y-4">
          {wallet.agentTransactions.length > 0 ? (
            wallet.agentTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div>
                  <p className="font-bold dark:text-white">{t.title}</p>
                  <p className="text-xs text-gray-500">{new Date(t.date).toLocaleString()}</p>
                </div>
                <p className={`font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'credit' ? '+' : '-'}{formatPrice(t.amount)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
