import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Zap, Shield, Sparkles, Globe, Smartphone, CreditCard } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Instant AI Routing",
      desc: "Our algorithms predict traffic patterns 30 minutes in advance to save you time.",
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      icon: Sparkles,
      title: "Hyper-Personalization",
      desc: "The app learns your preferences to suggest the perfect meal, ride, or product.",
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: Shield,
      title: "Biometric Security",
      desc: "Bank-grade security with FaceID and fingerprint scanning for every transaction.",
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20"
    },
    {
      icon: Globe,
      title: "Global Roaming",
      desc: "Use your SuperApp account in over 15 countries without switching apps.",
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: Smartphone,
      title: "Offline Mode",
      desc: "Access your tickets, wallet, and saved maps even without internet.",
      color: "text-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/20"
    },
    {
      icon: CreditCard,
      title: "Universal Wallet",
      desc: "Pay for coffee, rent, or rides with one unified digital balance.",
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="Platform Features" color="bg-slate-900" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 dark:text-white">Technology that feels like magic.</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">
            We've packed the world's most advanced AI into a simple, elegant interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 hover:shadow-xl transition-all group">
              <div className={`w-14 h-14 ${feat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feat.icon className={`w-7 h-7 ${feat.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{feat.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
