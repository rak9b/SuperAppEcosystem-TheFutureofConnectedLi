import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Search, Loader2, Camera } from 'lucide-react';
import { Button } from '../ui/Button';

interface ImageSearchModalProps {
  onClose: () => void;
  onSearch: (term: string) => void;
}

export function ImageSearchModal({ onClose, onSearch }: ImageSearchModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      onSearch("Headphones"); // Mock result
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-white/10 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full dark:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <Camera className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold dark:text-white mb-2">AI Visual Search</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Upload a photo to find similar products instantly.</p>
        </div>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative overflow-hidden">
          {preview ? (
            <div className="relative h-48 w-full">
              <img src={preview} alt="Preview" className="h-full w-full object-contain" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p className="text-sm font-medium">Analyzing image...</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <p className="text-sm font-medium dark:text-white mb-1">Click to upload</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileUpload}
              />
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">Powered by SuperApp Vision AI</p>
        </div>
      </motion.div>
    </div>
  );
}
