import { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AIVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript("Listening...");
      setTimeout(() => setTranscript("Processing: 'Book a ride home'"), 1500);
      setTimeout(() => {
        setTranscript("");
        setIsListening(false);
        // In a real app, this would trigger navigation
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2 w-64 bg-black/80 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">SuperApp Voice AI</span>
            </div>
            <p className="text-sm font-medium">{transcript}</p>
            
            {/* Audio Wave Animation */}
            <div className="flex items-center justify-center gap-1 mt-4 h-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 16, 4] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                  className="w-1 bg-blue-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleListening}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all ${isListening ? 'bg-red-500 rotate-12' : 'bg-black hover:scale-110'}`}
      >
        {isListening ? <MicOff className="text-white h-6 w-6" /> : <Mic className="text-white h-6 w-6" />}
        {!isListening && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
