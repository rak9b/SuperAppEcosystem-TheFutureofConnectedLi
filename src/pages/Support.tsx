import { ServiceHeader } from '../components/layout/ServiceHeader';
import { MessageSquare, HelpCircle, RotateCcw, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

export function Support() {
  const [activeTab, setActiveTab] = useState<'faq' | 'ticket'>('faq');

  const faqs = [
    { q: "How do I track my order?", a: "Go to Profile > Order History to see real-time tracking." },
    { q: "What is your return policy?", a: "We offer a 30-day no-questions-asked return policy for most items." },
    { q: "How do I use my loyalty points?", a: "Points can be redeemed at checkout for discounts." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="Help Center" color="bg-blue-900" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-all">
              <MessageSquare className="h-8 w-8 mx-auto text-blue-600 mb-3" />
              <h3 className="font-bold dark:text-white">Live Chat</h3>
              <p className="text-sm text-gray-500">Talk to an agent now</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-all">
              <RotateCcw className="h-8 w-8 mx-auto text-orange-600 mb-3" />
              <h3 className="font-bold dark:text-white">Returns</h3>
              <p className="text-sm text-gray-500">Start a return request</p>
           </div>
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-all">
              <Phone className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <h3 className="font-bold dark:text-white">Call Us</h3>
              <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
           </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
           <div className="flex border-b dark:border-gray-700">
              <button 
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 font-bold text-sm ${activeTab === 'faq' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                FAQs
              </button>
              <button 
                onClick={() => setActiveTab('ticket')}
                className={`flex-1 py-4 font-bold text-sm ${activeTab === 'ticket' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                Submit Ticket
              </button>
           </div>

           <div className="p-6">
              {activeTab === 'faq' && (
                 <div className="space-y-4">
                    {faqs.map((faq, i) => (
                       <div key={i} className="border-b dark:border-gray-700 pb-4">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center"><HelpCircle className="h-4 w-4 mr-2 text-blue-500" /> {faq.q}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm pl-6">{faq.a}</p>
                       </div>
                    ))}
                 </div>
              )}

              {activeTab === 'ticket' && (
                 <form className="space-y-4 max-w-lg mx-auto">
                    <div>
                       <label className="block text-sm font-medium mb-1 dark:text-white">Issue Type</label>
                       <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <option>Order Issue</option>
                          <option>Payment Problem</option>
                          <option>Account Access</option>
                          <option>Other</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium mb-1 dark:text-white">Description</label>
                       <textarea rows={4} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Describe your issue..."></textarea>
                    </div>
                    <Button className="w-full">Submit Ticket</Button>
                 </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
