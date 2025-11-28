import { motion } from 'framer-motion';
import { X, Phone, Share2, Mic, ShieldAlert, UserCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface RideSafetyModalProps {
  onClose: () => void;
}

export function RideSafetyModal({ onClose }: RideSafetyModalProps) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="bg-red-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full">
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Safety Toolkit</h2>
          </div>
          <p className="text-red-100 text-sm">We are tracking your ride in real-time.</p>
        </div>

        <div className="p-6 space-y-4">
          <button className="w-full bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/50 p-4 rounded-xl flex items-center gap-4 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors group">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Phone className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-red-600 dark:text-red-400 text-lg">Emergency SOS</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Call Local Authorities & Alert Contacts</p>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-bold text-sm dark:text-white">Share Trip</h3>
              <p className="text-xs text-gray-500">Send live location</p>
            </button>
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`p-4 rounded-xl text-left transition-colors ${isRecording ? 'bg-red-50 dark:bg-red-900/20 border border-red-200' : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <div className="flex justify-between items-start">
                <Mic className={`h-6 w-6 mb-2 ${isRecording ? 'text-red-600 animate-pulse' : 'text-purple-600'}`} />
                {isRecording && <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 rounded">REC</span>}
              </div>
              <h3 className="font-bold text-sm dark:text-white">{isRecording ? 'Recording...' : 'Record Audio'}</h3>
              <p className="text-xs text-gray-500">For safety evidence</p>
            </button>
          </div>

          <button className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <UserCheck className="h-5 w-5 text-green-600" />
            <div className="text-left">
              <h3 className="font-bold text-sm dark:text-white">I feel unsafe</h3>
              <p className="text-xs text-gray-500">Report driver behavior anonymously</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
