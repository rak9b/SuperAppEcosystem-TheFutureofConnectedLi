import { useState } from 'react';
import { Layers, Navigation, Compass, Plus, Minus, Map as MapIcon, Globe, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

interface MapControlsProps {
  mapType: 'default' | 'satellite' | 'terrain';
  setMapType: (type: 'default' | 'satellite' | 'terrain') => void;
  showTraffic: boolean;
  setShowTraffic: (show: boolean) => void;
  show3D: boolean;
  setShow3D: (show: boolean) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
}

export function MapControls({ 
  mapType, setMapType, 
  showTraffic, setShowTraffic, 
  show3D, setShow3D,
  onZoomIn, onZoomOut, onCenter 
}: MapControlsProps) {
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  return (
    <>
      {/* Top Right Controls (Layers) */}
      <div className="absolute top-24 right-4 z-20 flex flex-col gap-2">
        <div className="relative">
          <button 
            onClick={() => setIsLayersOpen(!isLayersOpen)}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Layers className="w-5 h-5" />
          </button>

          {/* Layers Menu */}
          <AnimatePresence>
            {isLayersOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 20, y: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-12 right-0 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-100 dark:border-gray-700 origin-top-right"
              >
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Map Type</h4>
                  <div className="flex justify-between gap-2">
                    {[
                      { id: 'default', label: 'Default', icon: MapIcon },
                      { id: 'satellite', label: 'Satellite', icon: Globe },
                      { id: 'terrain', label: 'Terrain', icon: Box }, // Using Box as placeholder for terrain
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setMapType(type.id as any)}
                        className={`flex-1 flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${mapType === type.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                      >
                        <type.icon className={`w-6 h-6 ${mapType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className={`text-[10px] font-medium ${mapType === type.id ? 'text-blue-600' : 'text-gray-500'}`}>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Map Details</h4>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setShowTraffic(!showTraffic)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${showTraffic ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                    >
                      <span className="text-sm font-medium">Traffic</span>
                      <div className={`w-4 h-4 rounded-full border ${showTraffic ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`} />
                    </button>
                    <button 
                      onClick={() => setShow3D(!show3D)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${show3D ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                    >
                      <span className="text-sm font-medium">3D Buildings</span>
                      <div className={`w-4 h-4 rounded-full border ${show3D ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Compass className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Right Controls (Zoom & Location) */}
      <div className="absolute bottom-32 right-4 z-20 flex flex-col gap-4">
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden">
          <button onClick={onZoomIn} className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
            <Plus className="w-5 h-5" />
          </button>
          <button onClick={onZoomOut} className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
            <Minus className="w-5 h-5" />
          </button>
        </div>

        <button 
          onClick={onCenter}
          className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Navigation className="w-5 h-5 fill-current" />
        </button>
      </div>
    </>
  );
}
