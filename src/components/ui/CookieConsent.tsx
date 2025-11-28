import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Cookie } from 'lucide-react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-50 md:left-auto md:right-6 md:w-96"
        >
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold dark:text-white text-sm mb-1">We use cookies</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To personalize your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="flex-1" onClick={() => setShow(false)}>Decline</Button>
              <Button size="sm" className="flex-1" onClick={handleAccept}>Accept</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
