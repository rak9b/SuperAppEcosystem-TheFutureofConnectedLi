import { Grid, Car, Utensils, Wallet, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export function SuperAppMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { name: 'Shop', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600', link: '/' },
    { name: 'Ride', icon: Car, color: 'bg-black text-white', link: '/ride' },
    { name: 'Food', icon: Utensils, color: 'bg-green-100 text-green-600', link: '/food' },
    { name: 'Pay', icon: Wallet, color: 'bg-pink-100 text-pink-600', link: '/pay' },
    { name: 'Safety', icon: ShieldCheck, color: 'bg-orange-100 text-orange-600', link: '/safety' },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Grid className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium hidden md:block">Services</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border z-50 p-4 animate-in fade-in slide-in-from-top-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">SuperApp Ecosystem</h3>
            <div className="grid grid-cols-3 gap-3">
              {services.map((service) => (
                <Link 
                  key={service.name} 
                  to={service.link}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110", service.color)}>
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{service.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t text-center">
              <p className="text-[10px] text-gray-400">
                One account. Endless possibilities.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
