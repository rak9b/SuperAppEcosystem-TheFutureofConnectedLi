import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Mic, Camera, Moon, Sun, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { SuperAppMenu } from './SuperAppMenu';

export function Navbar() {
  const { cart, user, isDarkMode, toggleDarkMode, currency, setCurrency, language, setLanguage } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  const isImmersivePage = ['/ride', '/safety', '/pay', '/checkout', '/market'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isImmersivePage) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className={cn(
        "container mx-auto px-4 md:px-6 transition-all duration-300",
        isScrolled ? "max-w-6xl" : ""
      )}>
        <div className={cn(
          "glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300",
          isScrolled ? "shadow-lg shadow-black/5" : "bg-transparent border-transparent backdrop-blur-none"
        )}>
          
          {/* Logo Area */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold font-display text-xl group-hover:rotate-12 transition-transform">S</div>
              <span className="font-display font-bold text-xl tracking-tight dark:text-white hidden sm:block">
                Super<span className="text-blue-600">App</span>
              </span>
            </Link>

            <div className="hidden md:block border-l border-slate-200 dark:border-white/10 pl-4">
              <SuperAppMenu />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-white/5 rounded-full p-1 border border-slate-200 dark:border-white/10 mx-4">
            {[
              { name: 'Shop', path: '/market' },
              { name: 'Ride', path: '/ride' },
              { name: 'Food', path: '/food' },
              { name: 'Pay', path: '/pay' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  location.pathname === item.path 
                    ? "bg-white dark:bg-white/10 text-black dark:text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/ai-hub"
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1",
                location.pathname === '/ai-hub'
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-blue-600 hover:text-blue-700 dark:text-blue-400"
              )}
            >
              <Sparkles className="w-3 h-3" /> AI Hub
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden xl:flex items-center flex-1 max-w-xs relative group mr-4">
            <div className="relative w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full flex items-center px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:bg-white dark:focus-within:bg-black">
              <Search className="w-4 h-4 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search products, services..." 
                className="bg-transparent border-none outline-none text-sm w-full dark:text-white placeholder:text-slate-400"
              />
              <div className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-3 ml-2">
                <Mic className="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-pointer" />
                <Camera className="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Settings Dropdown (Currency/Lang) */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold">{currency}</span>
              </button>
              {showSettings && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border dark:border-white/10 p-2 z-50">
                  <div className="text-xs font-bold text-slate-400 px-2 py-1">Currency</div>
                  {['USD', 'EUR', 'GBP', 'BDT'].map(c => (
                    <button key={c} onClick={() => { setCurrency(c as any); setShowSettings(false); }} className={`w-full text-left px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-sm ${currency === c ? 'text-blue-600' : 'dark:text-white'}`}>{c}</button>
                  ))}
                  <div className="border-t dark:border-white/10 my-1"></div>
                  <div className="text-xs font-bold text-slate-400 px-2 py-1">Language</div>
                  {['en', 'es', 'fr'].map(l => (
                    <button key={l} onClick={() => { setLanguage(l as any); setShowSettings(false); }} className={`w-full text-left px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-white/10 text-sm ${language === l ? 'text-blue-600' : 'dark:text-white'}`}>{l.toUpperCase()}</button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/cart" className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <Link to="/profile" className="flex items-center gap-3 pl-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                     <span className="font-bold text-sm">{user.name[0]}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <button className="px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity">
                  Sign In
                </button>
              </Link>
            )}

            <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6 dark:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b dark:border-white/10 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <input type="search" placeholder="Search..." className="w-full p-3 rounded-xl bg-slate-100 dark:bg-white/5 dark:text-white" />
              <div className="grid grid-cols-2 gap-3">
                {['Shop', 'Ride', 'Food', 'Pay', 'Safety', 'Support'].map(item => (
                  <Link 
                    key={item} 
                    to={item === 'Shop' ? '/market' : `/${item.toLowerCase()}`} 
                    className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 text-center font-medium dark:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <Link 
                  to="/ai-hub" 
                  className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-center font-medium text-blue-600 col-span-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Innovation Hub
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
