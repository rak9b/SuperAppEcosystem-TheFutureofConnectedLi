import { useState } from 'react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { ParcelHero } from '../components/parcel/ParcelHero';
import { ParcelDashboard } from '../components/parcel/ParcelDashboard';
import { ParcelTracking } from '../components/parcel/ParcelTracking';
import { useParcelStore } from '../store/useParcelStore';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Clock, Globe, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export function Parcel() {
  const { getParcelByTrackingId } = useParcelStore();
  const [trackedParcel, setTrackedParcel] = useState<any>(null);

  const handleTrack = (id: string) => {
    const parcel = getParcelByTrackingId(id);
    if (parcel) {
      setTrackedParcel(parcel);
    } else {
      alert("Tracking ID not found. Try TRK-882910");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505]">
      <ServiceHeader 
        title="Super Courier" 
        color="bg-orange-600" 
        actions={
          <Link to="/ride" className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        }
      />
      
      <ParcelHero onTrack={handleTrack} />
      
      <div className="-mt-12 relative z-20 mb-20">
        <ParcelDashboard />
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold dark:text-white mb-4">Why Choose Super Courier?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">We deliver happiness with speed, security, and transparency.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Clock, title: "Fastest Delivery", desc: "Same-day delivery within city limits." },
            { icon: ShieldCheck, title: "Secure Handling", desc: "Tamper-proof packaging & insurance." },
            { icon: Globe, title: "Nationwide", desc: "Covering 64 districts across the country." },
            { icon: Truck, title: "Real-time Tracking", desc: "Live GPS updates for every step." }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold dark:text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-gray-500">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold dark:text-white mb-12 text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0"></div>
            
            {[
              { step: "1", title: "Book Request", desc: "Enter pickup & delivery details." },
              { step: "2", title: "Pickup", desc: "Our rider collects the parcel." },
              { step: "3", title: "Transit", desc: "Sorted at our smart hubs." },
              { step: "4", title: "Delivery", desc: "Safely delivered to receiver." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 bg-white dark:bg-gray-900 p-4 rounded-xl text-center max-w-xs">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-lg border-4 border-white dark:border-gray-900">
                  {item.step}
                </div>
                <h3 className="font-bold dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {trackedParcel && (
        <ParcelTracking 
          parcel={trackedParcel} 
          onClose={() => setTrackedParcel(null)} 
        />
      )}
    </div>
  );
}
