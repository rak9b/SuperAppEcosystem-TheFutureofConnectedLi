import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Package, MapPin, User, Truck, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useParcelStore } from '../../store/useParcelStore';
import { useStore } from '../../store/useStore';
import { useToastStore } from '../../store/useToastStore';

interface CreateParcelModalProps {
  onClose: () => void;
}

export function CreateParcelModal({ onClose }: CreateParcelModalProps) {
  const { user } = useStore();
  const { createParcel } = useParcelStore();
  const { addToast } = useToastStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    type: 'Box' as any,
    weight: 1,
  });

  const calculatePrice = () => {
    const base = 50;
    const weightCost = formData.weight * 20;
    const typeCost = formData.type === 'Electronics' ? 50 : formData.type === 'Fragile' ? 30 : 0;
    return base + weightCost + typeCost;
  };

  const validateStep1 = () => {
    if (!formData.receiverName || !formData.receiverPhone || !formData.receiverAddress) {
      addToast("Please fill in all receiver details", "error");
      return false;
    }
    if (formData.receiverPhone.length < 11) {
      addToast("Please enter a valid phone number", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      createParcel({
        senderId: user?.id || 'guest',
        senderName: user?.name || 'Guest Sender',
        receiverName: formData.receiverName,
        receiverPhone: formData.receiverPhone,
        receiverAddress: formData.receiverAddress,
        type: formData.type,
        weight: formData.weight,
        price: calculatePrice(),
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // +2 days
      });
      setLoading(false);
      onClose();
      addToast("Parcel Request Created Successfully!", "success");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="bg-orange-600 p-6 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" /> Send Parcel
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full"><X className="w-6 h-6" /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <h3 className="font-bold text-lg dark:text-white mb-4">Receiver Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Receiver Name"
                    value={formData.receiverName}
                    onChange={e => setFormData({...formData, receiverName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 w-5 h-5 text-gray-400 font-bold text-center">📞</span>
                  <input 
                    type="tel" 
                    className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="+880..."
                    value={formData.receiverPhone}
                    onChange={e => setFormData({...formData, receiverPhone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea 
                    className="w-full pl-10 p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Full Address"
                    rows={3}
                    value={formData.receiverAddress}
                    onChange={e => setFormData({...formData, receiverAddress: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700" onClick={() => validateStep1() && setStep(2)}>Next</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <h3 className="font-bold text-lg dark:text-white mb-4">Package Info</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Document', 'Box', 'Fragile', 'Electronics'].map(t => (
                    <button
                      key={t}
                      onClick={() => setFormData({...formData, type: t as any})}
                      className={`p-3 rounded-xl border text-sm font-bold transition-all ${formData.type === t ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 dark:border-gray-700 dark:text-gray-300'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
                <input 
                  type="number" 
                  className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={formData.weight}
                  onChange={e => setFormData({...formData, weight: parseFloat(e.target.value)})}
                  min="0.1"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="font-bold text-lg dark:text-white mb-4">Review & Pay</h3>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Receiver</span>
                  <span className="font-bold dark:text-white">{formData.receiverName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-bold dark:text-white">{formData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight</span>
                  <span className="font-bold dark:text-white">{formData.weight} kg</span>
                </div>
                <div className="border-t dark:border-gray-700 pt-2 flex justify-between text-lg">
                  <span className="font-bold text-gray-900 dark:text-white">Total Cost</span>
                  <span className="font-bold text-orange-600">${calculatePrice()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-orange-200 bg-orange-50 rounded-xl text-orange-800 text-sm">
                <Truck className="w-5 h-5" />
                Standard Delivery (2 Days)
              </div>

              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)} disabled={loading}>Back</Button>
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleSubmit} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4 mr-2" />}
                  {loading ? 'Processing...' : 'Pay & Send'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
