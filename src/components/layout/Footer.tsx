import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, ShieldCheck, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-slate-200 dark:border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold font-display text-xl">S</div>
              <span className="font-display font-bold text-xl tracking-tight dark:text-white">
                Super<span className="text-blue-600">App</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm leading-relaxed">
              The world's first AI-powered ecosystem designed to simplify your digital life. 
              Shop, Ride, Eat, and Pay - all in one place.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold dark:text-white mb-6">Ecosystem</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Marketplace</Link></li>
              <li><Link to="/ride" className="hover:text-blue-600 transition-colors">Ride Hailing</Link></li>
              <li><Link to="/food" className="hover:text-blue-600 transition-colors">Food Delivery</Link></li>
              <li><Link to="/pay" className="hover:text-blue-600 transition-colors">Fintech</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold dark:text-white mb-6">Support</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><Link to="/support" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2024 SuperApp Inc. All rights reserved.</p>
          
          {/* Trust Badges */}
          <div className="flex items-center gap-4 text-slate-400 text-xs">
             <div className="flex items-center gap-1"><Lock className="h-3 w-3" /> SSL Secured</div>
             <div className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> PCI DSS Compliant</div>
             <div>GDPR Ready</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
