import { Sparkles, ThumbsUp, ThumbsDown, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIReviewSummaryProps {
  rating: number;
  reviewCount: number;
}

export function AIReviewSummary({ rating, reviewCount }: AIReviewSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-purple-600 text-white p-1.5 rounded-lg shadow-lg shadow-purple-500/30">
          <Sparkles className="h-4 w-4" />
        </div>
        <h3 className="font-bold text-purple-900 dark:text-purple-200">AI Review Analysis</h3>
        <span className="text-xs text-purple-600 dark:text-purple-400 bg-white dark:bg-purple-900/50 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
          Based on {reviewCount} reviews
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" /> What users love
          </h4>
          <ul className="space-y-2">
            {[
              "Exceptional build quality and materials",
              "Battery life exceeds manufacturer claims",
              "Fast shipping and secure packaging"
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
            <ThumbsDown className="h-4 w-4" /> What could be better
          </h4>
          <ul className="space-y-2">
            {[
              "Setup instructions could be clearer",
              "Slightly heavier than previous generation"
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800/50 text-xs text-purple-600 dark:text-purple-400 flex justify-between items-center">
        <span>Sentiment Score: <strong>92/100</strong> (Positive)</span>
        <span>Updated: Just now</span>
      </div>
    </div>
  );
}
