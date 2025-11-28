import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Code, Terminal, Book, Webhook, Box, Key } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Developer() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505]">
      <ServiceHeader title="Developer Portal" color="bg-slate-900" />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-display font-bold dark:text-white mb-4">Build the Future with SuperApp APIs</h1>
          <p className="text-slate-500 text-lg mb-8">
            Access our Payment Gateway, AI Models, and Logistics network via simple, robust REST APIs.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Get API Keys</Button>
            <Button variant="outline" size="lg">Read Docs</Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
            <Terminal className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold dark:text-white mb-2">SDKs & Libraries</h3>
            <p className="text-slate-500 text-sm">Official libraries for Node.js, Python, React, and Flutter.</p>
          </div>
          <div className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
            <Webhook className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold dark:text-white mb-2">Webhooks</h3>
            <p className="text-slate-500 text-sm">Real-time events for payments, orders, and AI task completions.</p>
          </div>
          <div className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
            <Box className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-xl font-bold dark:text-white mb-2">Sandbox Environment</h3>
            <p className="text-slate-500 text-sm">Test your integration safely with unlimited mock data.</p>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl overflow-hidden relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <h3 className="text-white font-bold mb-6 flex items-center gap-2"><Key className="w-4 h-4" /> Authentication</h3>
          <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
{`curl -X POST https://api.superapp.com/v1/payments \\
  -H "Authorization: Bearer sk_test_51Mx..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2000,
    "currency": "usd",
    "payment_method": "pm_card_visa"
  }'`}
          </pre>
        </div>
      </div>
    </div>
  );
}
