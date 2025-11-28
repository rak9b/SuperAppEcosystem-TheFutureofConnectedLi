import { 
  Car, TrafficCone, Package, Sparkles, Wallet, ShieldAlert, 
  Headphones, Megaphone, Store, ShoppingBag, TrendingUp, 
  UserCheck, Server, Cpu, Zap, Activity, Lock, Globe, 
  Smartphone, ScanFace, Navigation, Mic
} from 'lucide-react';

export interface AIModule {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  features: string[];
  subCategories?: { title: string; items: string[] }[];
  simulationType: 'workflow' | 'dashboard' | 'interactive' | 'visualization';
  workflowSteps?: { title: string; desc: string }[];
}

export const AI_MODULES: AIModule[] = [
  {
    id: 'ride-ai',
    title: '1. Ride-Sharing AI',
    description: 'Uber-level matching, routing, and safety intelligence.',
    icon: Car,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Driver-Rider Matching', 'Route Optimization', 'Live Traffic Prediction',
      'Demand Heatmaps', 'Surge Pricing', 'ETA Calculation',
      'Best Driver Selection', 'Split-Fare Calculation'
    ],
    subCategories: [
      { title: 'Monitoring & Safety', items: ['Accident Detection', 'Dangerous Behavior Alerts', 'Sudden-Stop Detection', 'Speed-Limit Violation', 'Ride Anomaly Alerts', 'Trip Audio Recording', 'Face Recognition Verification'] },
      { title: 'Convenience', items: ['Voice Command Booking', 'Voice Navigation', 'Ride Chatbot', 'Split Fare'] }
    ],
    simulationType: 'workflow',
    workflowSteps: [
      { title: 'Matching', desc: 'Scanning 50+ drivers based on proximity & rating' },
      { title: 'Routing', desc: 'Analyzing traffic patterns for fastest path' },
      { title: 'Safety Check', desc: 'Verifying driver identity via FaceID' },
      { title: 'Dispatched', desc: 'Ride confirmed with ETA prediction' }
    ]
  },
  {
    id: 'delivery-ai',
    title: '2. Delivery AI',
    description: 'Optimized logistics for Food, Parcel, and Grocery.',
    icon: Package,
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'Order Batching', 'Smart Rider Assignment', 'Route Optimization',
      'Weather-based Prediction', 'Traffic-based Suggestions', 'Drone Delivery Mgmt'
    ],
    subCategories: [
      { title: 'Food Recommendations', items: ['Personalized Menus', 'Reorder Suggestions', 'Meal-Time Predictions', 'Restaurant Ranking'] },
      { title: 'Parcel Mgmt', items: ['Fraud Detection (CoD)', 'Weight/Size Recognition', 'Proof-of-Delivery', 'Smart Return Assignment'] }
    ],
    simulationType: 'visualization'
  },
  {
    id: 'ecommerce-ai',
    title: '3. E-Commerce AI',
    description: 'Amazon-level product discovery and shopping experience.',
    icon: ShoppingBag,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-fuchsia-500',
    features: [
      'Semantic Search', 'Auto-Tagging', 'Personalized Recommendations',
      'Similarity Finder', 'Price Comparison', 'Trending Detection', 'Category Prediction'
    ],
    subCategories: [
      { title: 'Shopping Experience', items: ['Virtual Try-On (AR)', 'Size Recommendation', 'Voice Search', 'Auto-fill Details', 'Quality Scoring'] },
      { title: 'Order & Fraud', items: ['Order Risk Score', 'Fake Review Detection', 'Fake Seller Detection', 'Return Fraud Detection', 'Auto-Approve Refunds'] }
    ],
    simulationType: 'interactive'
  },
  {
    id: 'fintech-ai',
    title: '4. Payment / Fintech AI',
    description: 'Next-gen wallet security and financial insights.',
    icon: Wallet,
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-rose-500',
    features: [
      'Spending Analytics', 'Auto-Categorization', 'Budget Suggestions',
      'Recurring Bill Prediction', 'Financial Insights', 'Bill Reminders', 'Cashback Optimization'
    ],
    subCategories: [
      { title: 'Fraud & Security', items: ['Transaction Monitoring', 'Unusual Behavior Detection', 'Location-based Protection', 'Instant KYC', 'Document OCR', 'Biometric Verification', 'Phishing Detection', 'Scam-Block Alerts'] }
    ],
    simulationType: 'dashboard'
  },
  {
    id: 'support-ai',
    title: '5. Customer Support AI',
    description: '90% automated resolution with human-like empathy.',
    icon: Headphones,
    color: 'text-cyan-500',
    gradient: 'from-cyan-500 to-sky-500',
    features: [
      '24/7 Chatbot', 'Auto-Ticket Generation', 'Issue Auto-Resolve',
      'Refund Assistant', 'Dispute Resolver', 'Sentiment Analysis',
      'Voice Support Bot', 'Call Summarization'
    ],
    simulationType: 'interactive'
  },
  {
    id: 'merchant-ai',
    title: '6. Merchant AI',
    description: 'Empowering businesses with predictive tools.',
    icon: Store,
    color: 'text-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    features: [
      'Sales Analytics', 'Demand Prediction', 'Pricing Suggestions',
      'Ranking Improvement', 'Photo Enhancement', 'Keyword Suggestions',
      'Inventory Forecasting', 'Customer Segmentation', 'Marketing Automation'
    ],
    subCategories: [
      { title: 'Logistics', items: ['Smart Dispatch Rules', 'Performance Scoring', 'Return-Rate Prediction'] }
    ],
    simulationType: 'dashboard'
  },
  {
    id: 'personalization-ai',
    title: '7. App Personalization',
    description: 'A unique interface for every single user.',
    icon: UserCheck,
    color: 'text-indigo-500',
    gradient: 'from-indigo-500 to-violet-500',
    features: [
      'Home Screen Personalization', 'Personalized Banners', 'Offer Recommendations',
      'Behavior Prediction', 'User Journey Optimization'
    ],
    subCategories: [
      { title: 'Voice & Accessibility', items: ['Full Voice Control', 'Voice Navigation', 'Voice Shopping', 'Voice Payment', 'Built-in Assistant'] }
    ],
    simulationType: 'interactive'
  },
  {
    id: 'safety-ai',
    title: '8. Safety & Verification',
    description: 'Identity trust and real-time physical safety.',
    icon: ShieldAlert,
    color: 'text-red-500',
    gradient: 'from-red-500 to-red-700',
    features: [
      'Face Recognition Login', 'Liveness Detection', 'Driver Verification',
      'Suspicious Activity Alerts'
    ],
    subCategories: [
      { title: 'Location Safety', items: ['Real-time Trip Monitoring', 'Unsafe Area Detection', 'Night-mode Alerts', 'SOS Auto-Trigger'] }
    ],
    simulationType: 'dashboard'
  },
  {
    id: 'marketing-ai',
    title: '9. Marketing AI',
    description: 'Automated growth and retention engines.',
    icon: Megaphone,
    color: 'text-lime-500',
    gradient: 'from-lime-500 to-green-500',
    features: [
      'Offer Personalization', 'Campaign Prediction', 'Notification Timing Opt.',
      'Churn Prediction', 'Email Generation', 'A/B Testing Automation', 'LTV Prediction'
    ],
    simulationType: 'dashboard'
  },
  {
    id: 'backend-ai',
    title: '10. Performance & Backend',
    description: 'Self-healing infrastructure and predictive scaling.',
    icon: Server,
    color: 'text-slate-500',
    gradient: 'from-slate-500 to-gray-600',
    features: [
      'Load Prediction', 'Auto-scaling Servers', 'Error Detection',
      'Crash Prediction', 'Log Analysis', 'API Optimization',
      'Business Analytics', 'Dashboard Forecasting', 'Operational Insights'
    ],
    simulationType: 'visualization'
  },
  {
    id: 'future-ai',
    title: '11. Next-Gen Future AI',
    description: 'Experimental technologies for the metaverse era.',
    icon: Cpu,
    color: 'text-fuchsia-500',
    gradient: 'from-fuchsia-500 to-pink-600',
    features: [
      'Hologram Assistant', 'AI-Generated Photos', 'AI-Generated Ads',
      'Drone Delivery Mgmt', 'Autonomous Vehicle Support', 'Voice-to-Avatar',
      'Metaverse Shopping', 'Emotion-based Personalization'
    ],
    simulationType: 'interactive'
  }
];
