import { useState } from 'react';
import { Sparkles, Loader2, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface AIProductFormProps {
  onGenerate: (data: { name: string; description: string; price: number; tags: string[] }) => void;
}

export function AIProductForm({ onGenerate }: AIProductFormProps) {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!keyword) return;
    setLoading(true);
    
    // Simulate AI Generation
    setTimeout(() => {
      setLoading(false);
      onGenerate({
        name: `Premium ${keyword} - 2025 Edition`,
        description: `Experience the ultimate quality with our new ${keyword}. Designed for durability and style, this product features state-of-the-art materials and ergonomic design. Perfect for daily use.`,
        price: Math.floor(Math.random() * 100) + 20,
        tags: [keyword, 'Premium', 'New Arrival', 'Best Seller']
      });
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-purple-600 text-white p-1.5 rounded-lg">
          <Sparkles className="h-4 w-4" />
        </div>
        <h3 className="font-bold text-purple-900 dark:text-purple-300">AI Listing Assistant</h3>
      </div>
      
      <div className="flex gap-3">
        <input 
          type="text" 
          placeholder="Enter product keyword (e.g., 'Leather Wallet')" 
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button 
          onClick={handleGenerate} 
          disabled={loading || !keyword}
          className="bg-purple-600 hover:bg-purple-700 text-white min-w-[140px]"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? 'Generating...' : 'Auto-Fill'}
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
        AI will generate a professional title, SEO-optimized description, and suggested pricing.
      </p>
    </div>
  );
}
