import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Globe, ChevronRight, Play, Briefcase, Server, PenTool, Truck, Headphones, Code } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../store/useStore';
import { useAIStore } from '../store/useAIStore';
import { HologramSupport } from '../components/ai/HologramSupport';

export function Home() {
  const { products } = useStore();
  const { showHologram, toggleHologram } = useAIStore();
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const featuredProducts = products.slice(0, 4);

  const businessServices = [
    { icon: Briefcase, title: "Product Sourcing", desc: "Connect with global suppliers." },
    { icon: Code, title: "Web Development", desc: "Custom storefront solutions." },
    { icon: Server, title: "Hosting & Domain", desc: "Reliable cloud infrastructure." },
    { icon: PenTool, title: "Digital Marketing", desc: "SEO, SEM & Social Media." },
    { icon: Truck, title: "Logistics Solutions", desc: "End-to-end shipping mgmt." },
    { icon: Headphones, title: "Customer Support", desc: "24/7 Managed AI agents." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] overflow-x-hidden">
      {showHologram && <HologramSupport onClose={toggleHologram} />}

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">SuperApp Ecosystem v2.0 is live</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-6 dark:text-white leading-[1.1]"
            >
              One App.<br />
              <span className="text-gradient">Infinite Possibilities.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the future of connected living. Shop, Ride, Eat, and Pay with the world's first AI-powered ecosystem.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="glow" size="xl" className="w-full sm:w-auto group">
                Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="w-full sm:w-auto group" onClick={toggleHologram}>
                <Play className="mr-2 w-5 h-5 fill-current" /> Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- FLASH DEALS BANNER ---------------- */}
      <section className="py-8 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-white/20 p-3 rounded-full animate-pulse">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Flash Sale is Live!</h3>
              <p className="text-red-100">Up to 70% off on Electronics & Fashion. Ends in 02:45:10</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/20">
               <span className="text-xs text-red-200 block">Coupon Code</span>
               <span className="font-mono font-bold text-lg">SUPER20</span>
             </div>
             <Link to="/flash-sale">
               <Button variant="secondary" className="h-full">Shop Now</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* ---------------- BUSINESS SERVICES (B2B) ---------------- */}
      <section className="py-20 bg-white dark:bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold dark:text-white mb-2">Business Solutions</h2>
            <p className="text-slate-500">Comprehensive services for merchants and enterprises.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {businessServices.map((svc, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-white/10 hover:shadow-lg transition-all bg-slate-50 dark:bg-white/5 text-center group cursor-pointer">
                <div className="w-10 h-10 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <svc.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm dark:text-white mb-1">{svc.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- BENTO GRID SERVICES ---------------- */}
      <section className="py-20 container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-display font-bold dark:text-white mb-4">Everything you need. <span className="text-slate-500">Nothing you don't.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Our ecosystem integrates every aspect of your daily life into one seamless, beautiful interface.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Large Card - Shop */}
          <Link to="/products" className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-3xl font-bold text-white mb-2">Global Marketplace</h3>
              <p className="text-slate-300 mb-6 max-w-md">Access millions of products with AI-powered recommendations and same-day drone delivery.</p>
              <div className="flex items-center text-white font-medium">Explore Shop <ChevronRight className="w-4 h-4 ml-1" /></div>
            </div>
          </Link>

          {/* Medium Card - Ride */}
          <Link to="/ride" className="group relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white mb-1">Smart Mobility</h3>
              <p className="text-slate-300 text-sm">Autonomous & Human-driven rides.</p>
            </div>
          </Link>

          {/* Medium Card - Food */}
          <Link to="/food" className="group relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-white mb-1">Cravings, Solved.</h3>
              <p className="text-slate-300 text-sm">Food delivery in minutes.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="py-20 bg-white dark:bg-[#0A0A0A] border-y border-slate-200 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold dark:text-white mb-2">Trending Now</h2>
              <p className="text-slate-500">Curated specifically for your taste.</p>
            </div>
            <Link to="/products" className="text-blue-600 font-medium hover:underline">View Collection</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- AFFILIATE & B2B CTA ---------------- */}
      <section className="py-20 container mx-auto px-4">
         <div className="bg-slate-900 dark:bg-white/5 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-xl">
               <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
               <p className="text-slate-300 mb-6">Join our Affiliate Program or start selling as a Vendor. Access bulk pricing, wholesale tools, and global reach.</p>
               <div className="flex gap-4">
                 <Link to="/affiliate"><Button variant="primary" className="bg-white text-black hover:bg-gray-200">Affiliate Program</Button></Link>
                 <Link to="/vendor/dashboard"><Button variant="outline" className="text-white border-white hover:bg-white/10">Vendor Login</Button></Link>
               </div>
            </div>
            <div className="flex gap-6">
               <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">15%</div>
                  <div className="text-sm text-slate-400">Commission</div>
               </div>
               <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">50k+</div>
                  <div className="text-sm text-slate-400">Partners</div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
