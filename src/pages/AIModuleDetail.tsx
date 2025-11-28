import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Activity, Play, Layers } from 'lucide-react';
import { AI_MODULES } from '../data/aiModules';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { WorkflowStepper } from '../components/ui/WorkflowStepper';
import { FlashOffer } from '../components/ui/FlashOffer';
import { Button } from '../components/ui/Button';

export function AIModuleDetail() {
  const { id } = useParams();
  const module = AI_MODULES.find(m => m.id === id);

  if (!module) return <div>Module not found</div>;

  const Icon = module.icon;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title={module.title} color="bg-slate-900" />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/ai-hub" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Hub
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${module.gradient} flex items-center justify-center shadow-2xl`}
          >
            <Icon className="h-10 w-10 text-white" />
          </motion.div>
          
          <div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold dark:text-white mb-4"
            >
              {module.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl"
            >
              {module.description}
            </motion.p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {module.features.slice(0, 5).map((feat, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-sm font-medium dark:text-white flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-2 text-green-500" /> {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Simulation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-lg dark:text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-500" /> Live Simulation
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-slate-500 uppercase font-bold">Active</span>
                </div>
              </div>
              
              <div className="p-8 min-h-[400px] flex flex-col justify-center">
                {module.simulationType === 'workflow' && module.workflowSteps && (
                  <WorkflowStepper steps={module.workflowSteps} />
                )}

                {module.simulationType === 'visualization' && (
                  <div className="relative w-full h-64 bg-slate-100 dark:bg-black rounded-xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    {/* Simulated Data Viz */}
                    <div className="flex items-end gap-2 h-32">
                      {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                          className={`w-8 rounded-t-md bg-gradient-to-t ${module.gradient}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {module.simulationType === 'interactive' && (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-6 relative">
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
                      <Icon className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white mb-2">Interactive Mode</h3>
                    <p className="text-slate-500 mb-6">AI is analyzing your interactions in real-time.</p>
                    <Button>
                      <Play className="h-4 w-4 mr-2" /> Start Demo
                    </Button>
                  </div>
                )}

                {module.simulationType === 'dashboard' && (
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                         <div className="h-2 w-12 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                         <div className="h-8 w-24 bg-slate-300 dark:bg-slate-600 rounded mb-4"></div>
                         <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded flex items-end p-2 gap-1">
                            <div className="w-full bg-blue-500 h-[40%] rounded-t"></div>
                            <div className="w-full bg-blue-500 h-[60%] rounded-t"></div>
                            <div className="w-full bg-blue-500 h-[30%] rounded-t"></div>
                         </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex flex-col justify-between">
                         <div>
                           <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                           <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
                           <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                         </div>
                         <div className="flex gap-2 mt-4">
                            <div className="h-8 w-full bg-green-500 rounded opacity-20"></div>
                            <div className="h-8 w-full bg-red-500 rounded opacity-20"></div>
                         </div>
                      </div>
                   </div>
                )}
              </div>
            </div>
            
            {/* Sub-Categories List */}
            {module.subCategories && (
              <div className="mt-8">
                <h3 className="text-xl font-bold dark:text-white mb-6">Deep Dive Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {module.subCategories.map((sub, i) => (
                    <div key={i} className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10">
                      <h4 className="font-bold dark:text-white mb-4 flex items-center">
                        <Layers className="h-4 w-4 mr-2 text-blue-500" /> {sub.title}
                      </h4>
                      <ul className="space-y-2">
                        {sub.items.map((item, j) => (
                          <li key={j} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FlashOffer />
            
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
              <h3 className="font-bold text-lg mb-4">Technical Specs</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Latency</span>
                  <span className="font-mono text-white">12ms</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Accuracy</span>
                  <span className="font-mono text-white">99.8%</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Model</span>
                  <span className="font-mono text-white">Transformer v4</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>API Calls</span>
                  <span className="font-mono text-white">Unlimited</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
