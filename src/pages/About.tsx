import { motion } from 'framer-motion';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Users, Target, Globe, Award } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="About Us" color="bg-blue-900" />
      
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/5 dark:bg-blue-900/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 dark:text-white"
          >
            We are building the <br /><span className="text-blue-600">Operating System</span> for Life.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
          >
            SuperApp isn't just an app. It's a seamless integration of commerce, mobility, and finance, powered by ethical AI.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-slate-200 dark:border-white/10 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '2M+' },
              { label: 'Countries', value: '15+' },
              { label: 'Partners', value: '50k+' },
              { label: 'Transactions', value: '$1B+' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Grid */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To simplify daily life by connecting fragmented services into one intuitive, AI-driven ecosystem that anticipates your needs before you do.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Global Scale</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Operating across 3 continents, we adapt to local cultures while providing world-class technology standards to every user.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 text-green-600">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Excellence</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We don't just build features; we craft experiences. Every pixel, every animation, and every interaction is obsessed over.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white dark:bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-16 dark:text-white">Meet the Visionaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=400&q=80`} 
                  alt="Team Member" 
                  className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg">Alex Morgan</h3>
                  <p className="text-blue-400 text-sm">Co-Founder & CTO</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
