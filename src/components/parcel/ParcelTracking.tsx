import { motion } from 'framer-motion';
import { CheckCircle2, Truck, Package, MapPin, Clock, XCircle } from 'lucide-react';
import { Parcel, ParcelStatus } from '../../store/useParcelStore';
import { format } from 'date-fns';

interface ParcelTrackingProps {
  parcel: Parcel;
  onClose: () => void;
}

export function ParcelTracking({ parcel, onClose }: ParcelTrackingProps) {
  const steps: ParcelStatus[] = ['Pending', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
  
  const currentStepIndex = steps.indexOf(parcel.status);
  const isCancelled = parcel.status === 'Cancelled';

  const getIcon = (step: string) => {
    switch(step) {
      case 'Pending': return Package;
      case 'Picked Up': return Truck;
      case 'In Transit': return MapPin;
      case 'Out for Delivery': return Truck;
      case 'Delivered': return CheckCircle2;
      default: return Package;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{parcel.trackingId}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${isCancelled ? 'bg-red-500' : 'bg-green-500'}`}>
                {parcel.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm">Est. Delivery: {format(new Date(parcel.estimatedDelivery), 'MMM dd, yyyy')}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
            <XCircle className="w-8 h-8" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Visual Progress */}
          {!isCancelled && (
            <div className="relative flex justify-between mb-12">
              {/* Line */}
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800"></div>
              <motion.div 
                className="absolute top-5 left-0 h-1 bg-green-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 1 }}
              />

              {steps.map((step, i) => {
                const Icon = getIcon(step);
                const isCompleted = i <= currentStepIndex;
                const isCurrent = i === currentStepIndex;

                return (
                  <div key={step} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className={`text-[10px] md:text-xs font-bold mt-2 text-center ${isCurrent ? 'text-green-600' : 'text-gray-500'}`}>{step}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">From</h3>
              <p className="font-bold dark:text-white">{parcel.senderName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sender ID: {parcel.senderId}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">To</h3>
              <p className="font-bold dark:text-white">{parcel.receiverName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{parcel.receiverAddress}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{parcel.receiverPhone}</p>
            </div>
          </div>

          {/* Timeline Logs */}
          <div>
            <h3 className="text-lg font-bold dark:text-white mb-4">Shipment History</h3>
            <div className="space-y-6 border-l-2 border-gray-200 dark:border-gray-800 ml-3 pl-6">
              {[...parcel.logs].reverse().map((log, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900"></div>
                  <p className="font-bold text-gray-900 dark:text-white">{log.status}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{log.note}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {format(new Date(log.timestamp), 'MMM dd, hh:mm a')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
