import { ShieldCheck } from 'lucide-react';

export function TradeAssuranceBadge() {
  return (
    <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 px-3 py-2 rounded-lg">
      <div className="bg-yellow-500 text-white p-1 rounded-full">
        <ShieldCheck className="h-3 w-3" />
      </div>
      <div>
        <p className="text-xs font-bold text-yellow-800 dark:text-yellow-400 uppercase tracking-wide">Trade Assurance</p>
        <p className="text-[10px] text-yellow-700 dark:text-yellow-500">Protects your order from payment to delivery</p>
      </div>
    </div>
  );
}
