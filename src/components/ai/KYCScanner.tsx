import { useState, useEffect } from 'react';
import { ScanFace, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface KYCScannerProps {
  onComplete: (success: boolean) => void;
}

export function KYCScanner({ onComplete }: KYCScannerProps) {
  const [status, setStatus] = useState<'scanning' | 'success' | 'failed'>('scanning');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
      setTimeout(() => onComplete(true), 1500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="w-full max-w-md p-8 text-center">
        {status === 'scanning' && (
          <div className="relative w-64 h-64 mx-auto mb-8 border-2 border-blue-500/30 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')] bg-cover opacity-50 grayscale"></div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent h-full w-full"
              animate={{ top: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <ScanFace className="absolute inset-0 m-auto h-16 w-16 text-blue-400 opacity-80" />
          </div>
        )}

        {status === 'success' && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 mx-auto mb-8 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
          </motion.div>
        )}

        <h2 className="text-2xl font-bold text-white mb-2">
          {status === 'scanning' ? 'Verifying Identity...' : 'Identity Verified'}
        </h2>
        <p className="text-gray-400">
          {status === 'scanning' ? 'Please hold still while our AI scans your biometrics.' : 'Secure login approved.'}
        </p>
      </div>
    </div>
  );
}
