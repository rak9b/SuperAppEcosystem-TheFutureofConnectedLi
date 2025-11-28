import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Step {
  title: string;
  desc: string;
}

interface WorkflowStepperProps {
  steps: Step[];
  autoPlay?: boolean;
}

export function WorkflowStepper({ steps, autoPlay = true }: WorkflowStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % (steps.length + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex justify-between">
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-0"></div>
        <motion.div 
          className="absolute top-5 left-0 h-1 bg-blue-600 z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />

        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;

          return (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted || isActive ? '#2563eb' : '#f1f5f9',
                  scale: isActive ? 1.2 : 1,
                  borderColor: isActive ? '#93c5fd' : 'transparent'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${isCompleted || isActive ? 'text-white' : 'text-slate-400 dark:bg-slate-800'}`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="text-sm font-bold">{i + 1}</span>
                )}
              </motion.div>
              <div className="mt-3 text-center">
                <p className={`text-sm font-bold ${isActive ? 'text-blue-600' : 'text-slate-500 dark:text-slate-400'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-slate-400 hidden sm:block">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
