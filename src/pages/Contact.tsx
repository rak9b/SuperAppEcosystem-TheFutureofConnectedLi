import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Button } from '../components/ui/Button';

export function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="Contact Support" color="bg-slate-900" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Info Side */}
          <div>
            <h1 className="text-4xl font-display font-bold mb-6 dark:text-white">Get in touch</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-12 text-lg">
              Have a question about the SuperApp ecosystem? Our AI support is available 24/7, but our human team loves to chat too.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Email Us</h3>
                  <p className="text-slate-500 mb-1">For general inquiries</p>
                  <a href="mailto:hello@superapp.com" className="text-blue-600 font-medium hover:underline">hello@superapp.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Visit HQ</h3>
                  <p className="text-slate-500 mb-1">Come say hello</p>
                  <p className="text-slate-900 dark:text-slate-300">100 Innovation Drive, Tech City, TC 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Call Us</h3>
                  <p className="text-slate-500 mb-1">Mon-Fri from 8am to 5pm</p>
                  <p className="text-slate-900 dark:text-slate-300">+1 (555) 000-0000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-white">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white resize-none" placeholder="How can we help?" />
              </div>

              <Button className="w-full" size="lg">
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
