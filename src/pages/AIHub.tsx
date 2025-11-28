import { motion } from 'framer-motion';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { AI_MODULES } from '../data/aiModules';
import { Sparkles } from 'lucide-react';

export function AIHub() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="AI Innovation Hub" color="bg-slate-900" />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-bold">Powered by Neural Engine v4.0</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 dark:text-white">
            The Brain of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">SuperApp</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
            Explore the 16 specialized AI modules that power our ecosystem. 
            From predictive logistics to holographic interfaces.
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AI_MODULES.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard 
                title={module.title}
                description={module.description}
                icon={module.icon}
                gradient={module.gradient}
                link={`/ai-modules/${module.id}`}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
