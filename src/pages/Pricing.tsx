import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { motion } from 'framer-motion';

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Essential access to the ecosystem.',
      features: ['Access to Shop, Ride, Food', 'Standard Delivery Speed', 'Basic Support', 'Pay with Card'],
      missing: ['No AI Personalization', 'No Loyalty Points', 'No Free Delivery'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: annual ? 99 : 9.99,
      description: 'For power users who want more.',
      features: ['Everything in Free', 'AI Smart Assistant', '5% Cashback on Rides', 'Free Delivery > $20', 'Priority Support'],
      missing: ['No Concierge Service'],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Elite',
      price: annual ? 199 : 19.99,
      description: 'The ultimate VIP experience.',
      features: ['Everything in Pro', 'Dedicated Concierge', '10% Cashback Everywhere', 'Zero Delivery Fees', 'Exclusive Event Access'],
      missing: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="Pricing" color="bg-slate-900" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 dark:text-white">Simple, transparent pricing</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">Choose the plan that fits your lifestyle. Cancel anytime.</p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative w-16 h-8 bg-slate-200 dark:bg-slate-800 rounded-full p-1 transition-colors"
            >
              <motion.div 
                layout 
                className="w-6 h-6 bg-white rounded-full shadow-sm"
                animate={{ x: annual ? 32 : 0 }}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Yearly <span className="text-green-500 text-xs font-bold ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={plan.name}
              className={`relative p-8 rounded-3xl border ${plan.popular ? 'bg-slate-900 text-white border-slate-900 dark:bg-white/10 dark:border-white/20 ring-4 ring-blue-500/20' : 'bg-white dark:bg-black border-slate-200 dark:border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>{plan.description}</p>
              
              <div className="flex items-baseline mb-8">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>${plan.price}</span>
                <span className={`text-sm ml-2 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>/{annual ? 'year' : 'mo'}</span>
              </div>

              <Button 
                className="w-full mb-8" 
                variant={plan.popular ? 'glow' : 'outline'}
              >
                {plan.cta}
              </Button>

              <div className="space-y-4">
                {plan.features.map(feat => (
                  <div key={feat} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 ${plan.popular ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={plan.popular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}>{feat}</span>
                  </div>
                ))}
                {plan.missing.map(feat => (
                  <div key={feat} className="flex items-start gap-3 text-sm opacity-50">
                    <X className="w-5 h-5" />
                    <span className={plan.popular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
