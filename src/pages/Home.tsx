import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Cpu, ShoppingBag, Shield, Globe, Code, Zap, CheckCircle2, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ServiceHeader } from '../components/layout/ServiceHeader';

export function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-5xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">The Future of Fintech & AI is Here</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6 dark:text-white leading-[1.1]"
            >
              Finance. AI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Everything Connected.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Manage your money, automate your life with AI, and access a world of services in one unified ecosystem.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/pay">
                <Button variant="glow" size="xl" className="w-full sm:w-auto min-w-[200px]">
                  Open Wallet <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/ai-hub">
                <Button variant="outline" size="xl" className="w-full sm:w-auto min-w-[200px]">
                  Explore AI Tools
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="py-24 bg-white dark:bg-[#0A0A0A] relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold dark:text-white mb-4">One Platform. Three Pillars.</h2>
            <p className="text-slate-500 text-lg">Designed to empower individuals and businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* MFS Card */}
            <Link to="/pay" className="group p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-3">Mobile Finance</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Send money, pay bills, and manage savings with bank-grade security. The complete digital wallet experience.
              </p>
              <ul className="space-y-2 mb-6">
                {['Instant Transfers', 'QR Payments', 'Govt. Fees'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" /> {item}
                  </li>
                ))}
              </ul>
              <div className="text-blue-600 font-bold flex items-center">Go to Wallet <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* AI Card */}
            <Link to="/ai-hub" className="group p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-3">AI Intelligence</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Access state-of-the-art AI models for imaging, text, and automation. Build workflows that work for you.
              </p>
              <ul className="space-y-2 mb-6">
                {['Generative AI', 'Voice Cloning', 'Data Analytics'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2" /> {item}
                  </li>
                ))}
              </ul>
              <div className="text-purple-600 font-bold flex items-center">Open AI Hub <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* Commerce Card */}
            <Link to="/products" className="group p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-pink-500/50 transition-all hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white mb-3">Global Commerce</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Shop millions of products or order food and rides. One account for all your daily needs.
              </p>
              <ul className="space-y-2 mb-6">
                {['Marketplace', 'Food Delivery', 'Ride Sharing'].map(item => (
                  <li key={item} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 mr-2" /> {item}
                  </li>
                ))}
              </ul>
              <div className="text-pink-600 font-bold flex items-center">Start Shopping <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. DEVELOPER & API SECTION */}
      <section className="py-24 bg-slate-900 dark:bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                <Code className="w-4 h-4" /> For Developers
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Build on our Infrastructure</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Integrate our Payment Gateway, AI Models, and Logistics network directly into your applications. 
                Robust APIs, webhooks, and SDKs ready for scale.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/developer">
                  <Button className="bg-white text-black hover:bg-gray-200 border-none">
                    Read Documentation
                  </Button>
                </Link>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                  Get API Key
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-2xl border border-white/10 font-mono text-sm overflow-hidden">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2">
                  <p className="text-purple-400">const <span className="text-blue-400">superApp</span> = <span className="text-yellow-400">require</span>('superapp-sdk');</p>
                  <p className="text-gray-500">// Initialize Payment</p>
                  <p className="text-purple-400">await <span className="text-blue-400">superApp</span>.pay.<span className="text-yellow-400">create</span>({`{`}</p>
                  <p className="pl-4 text-green-400">amount: <span className="text-orange-400">500</span>,</p>
                  <p className="pl-4 text-green-400">currency: <span className="text-orange-400">'USD'</span>,</p>
                  <p className="pl-4 text-green-400">callback: <span className="text-orange-400">'https://api.you.com/webhook'</span></p>
                  <p className="text-purple-400">`{'}'});</p>
                  <p className="text-gray-500 mt-4">// Generate AI Image</p>
                  <p className="text-purple-400">const <span className="text-blue-400">image</span> = await <span className="text-blue-400">superApp</span>.ai.<span className="text-yellow-400">generate</span>({`{`}</p>
                  <p className="pl-4 text-green-400">prompt: <span className="text-orange-400">'Futuristic city with flying cars'</span></p>
                  <p className="text-purple-400">`{'}'});</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST & PARTNERS */}
      <section className="py-20 border-t border-slate-200 dark:border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 font-bold uppercase tracking-widest mb-8 text-sm">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
             {/* Mock Logos */}
             {['Acme Corp', 'Global Bank', 'TechFlow', 'Nebula AI', 'LogiStick'].map((name, i) => (
               <div key={i} className="text-2xl font-bold font-display">{name}</div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
