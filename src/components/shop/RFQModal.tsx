import { motion } from 'framer-motion';
import { X, Send, Building2, Package, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface RFQModalProps {
  productName: string;
  onClose: () => void;
}

export function RFQModal({ productName, onClose }: RFQModalProps) {
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => {
      onClose();
      alert("RFQ Sent Successfully! Suppliers will contact you shortly.");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="bg-blue-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold mb-1">Request for Quotation</h2>
          <p className="text-blue-100 text-sm">Get the best bulk pricing for "{productName}"</p>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity Required</label>
                <div className="relative">
                  <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="number" className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="e.g. 500" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Price (Per Unit)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 font-bold">$</span>
                  <input type="number" className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="e.g. 45.00" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company / Business Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="text" className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="Your Company Ltd." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Required By</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="date" className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full h-12 text-lg">
                  Submit RFQ <Send className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  By submitting, you agree to our Trade Assurance terms.
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">RFQ Submitted!</h3>
              <p className="text-gray-500">We have sent your request to 5 verified suppliers.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
