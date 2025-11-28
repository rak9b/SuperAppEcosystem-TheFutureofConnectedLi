import { Link } from 'react-router-dom';
import { ShieldCheck, Smartphone, Globe, Zap, CreditCard, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function PayLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-bold text-sm mb-6"
              >
                <Zap className="w-4 h-4" /> The Future of Payments
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your Money, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Reimagined.</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Send money, pay bills, and manage your finances with bank-grade security. Join millions of users trusting SuperPay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/login">
                  <Button size="xl" className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80" 
                  alt="App Interface" 
                  className="rounded-[3rem] shadow-2xl border-8 border-white dark:border-gray-800 mx-auto max-w-sm"
                />
                {/* Floating Elements */}
                <div className="absolute top-10 -right-10 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Sent</p>
                      <p className="font-bold text-gray-900 dark:text-white">$500.00</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose SuperPay?</h2>
            <p className="text-gray-600 dark:text-gray-400">Everything you need to manage your digital life in one secure place.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Bank-Grade Security", desc: "PCI-DSS compliant with biometric authentication and fraud detection." },
              { icon: Globe, title: "Global Transfers", desc: "Send money to over 100 countries instantly with low fees." },
              { icon: Smartphone, title: "Mobile First", desc: "Designed for your phone. Pay QR codes, bills, and more on the go." },
              { icon: CreditCard, title: "Virtual Cards", desc: "Create instant virtual cards for safe online shopping." },
              { icon: Lock, title: "Encrypted Data", desc: "Your financial data is encrypted end-to-end. We never sell your data." },
              { icon: Zap, title: "Instant Settlements", desc: "No waiting days. Transfers happen in seconds, 24/7." },
            ].map((feat, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feat.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Is SuperPay free to use?", a: "Yes, creating an account and receiving money is free. We charge a small 1% fee for withdrawals." },
              { q: "How do I add money?", a: "You can add money via Bank Transfer, Credit Card, or visit any of our 50,000+ agents." },
              { q: "Is it safe?", a: "Absolutely. We use 256-bit encryption and require 2FA for all sensitive transactions." },
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-400 mb-8">Join the financial revolution today.</p>
          <Link to="/login">
            <Button size="xl" className="bg-white text-black hover:bg-gray-100">
              Create Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
