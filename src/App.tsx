import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Comparison } from './pages/Comparison';
import { useStore } from './store/useStore';
import { AIChatbot } from './components/ai/AIChatbot';
import { AIVoiceAssistant } from './components/ai/AIVoiceAssistant';
import { useEffect, useState } from 'react';
import { Facebook, Smartphone, Fingerprint } from 'lucide-react';
import { CookieConsent } from './components/ui/CookieConsent';
import { ToastContainer } from './components/ui/Toast';

// New SuperApp Pages
import { Ride } from './pages/Ride';
import { Food } from './pages/Food';
import { Pay } from './pages/Pay';
import { Safety } from './pages/Safety';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { VendorDashboard } from './pages/VendorDashboard';
import { DriverDashboard } from './pages/DriverDashboard';
import { Profile } from './pages/Profile';
import { Developer } from './pages/Developer';
import { Parcel } from './pages/Parcel';

// Shop Pages
import { Marketplace } from './pages/Marketplace';
import { VendorShop } from './pages/VendorShop';
import { RecentProducts } from './pages/RecentProducts';

// AI Showcase Pages
import { AIHub } from './pages/AIHub';
import { AIModuleDetail } from './pages/AIModuleDetail';

// Marketing Pages
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Features } from './pages/Features';
import { Listing } from './pages/Listing';
import { Support } from './pages/Support';
import { Affiliate } from './pages/Affiliate';

// Enhanced Login Component
const Login = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<'method' | 'otp' | 'biometric'>('method');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = (role: 'user' | 'vendor' | 'admin' | 'driver') => {
    setLoading(true);
    setTimeout(() => {
      if (role === 'user') login({ id: 'u1', name: 'John User', email: 'user@example.com', role: 'user' });
      if (role === 'vendor') login({ id: 'v1', name: 'Tech Vendor', email: 'vendor@example.com', role: 'vendor', shopName: 'Tech Haven' } as any);
      if (role === 'admin') login({ id: 'a1', name: 'Super Admin', email: 'admin@example.com', role: 'admin' });
      if (role === 'driver') login({ id: 'd1', name: 'Driver Dave', email: 'driver@example.com', role: 'driver' } as any);
      navigate(role === 'driver' ? '/driver/dashboard' : '/');
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} Login Simulated`);
    handleLogin('user');
  };

  const sendOTP = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#050505] p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-blob" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />

      <div className="relative z-10 p-8 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl text-center bg-white/70 dark:bg-black/70 backdrop-blur-xl max-w-md w-full transition-all">
        <div className="mb-8">
           <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-4">S</div>
           <h2 className="text-3xl font-display font-bold mb-2 text-slate-900 dark:text-white">Welcome Back</h2>
           <p className="text-slate-500 dark:text-slate-400">Login to your SuperApp account</p>
        </div>
        
        {step === 'method' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => handleSocialLogin('Google')} className="flex items-center justify-center p-3 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors dark:text-white">
                <span className="font-bold text-red-500 mr-2">G</span> Google
              </button>
              <button onClick={() => handleSocialLogin('Facebook')} className="flex items-center justify-center p-3 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors dark:text-white">
                <Facebook className="h-5 w-5 text-blue-600 mr-2" /> Facebook
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-transparent text-slate-500">Or continue with</span></div>
            </div>

            <button onClick={sendOTP} className="w-full bg-slate-900 dark:bg-white dark:text-black text-white px-4 py-3.5 rounded-xl hover:opacity-90 flex items-center justify-center gap-2 font-medium transition-all">
              <Smartphone className="h-5 w-5" /> Login with Phone Number
            </button>
            
            <button onClick={() => setStep('biometric')} className="w-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 px-4 py-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-center gap-2 font-medium transition-all">
              <Fingerprint className="h-5 w-5" /> Biometric Login
            </button>

            <div className="text-xs text-slate-400 mt-6 flex justify-center gap-4">
              <span className="cursor-pointer hover:text-blue-500 transition-colors" onClick={() => handleLogin('vendor')}>Vendor Login</span>
              <span className="cursor-pointer hover:text-blue-500 transition-colors" onClick={() => handleLogin('driver')}>Driver Login</span>
              <span className="cursor-pointer hover:text-blue-500 transition-colors" onClick={() => handleLogin('admin')}>Admin Login</span>
            </div>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 dark:text-slate-300">Enter the 4-digit code sent to your phone.</p>
            <div className="flex justify-center gap-3 my-4">
              {[1,2,3,4].map(i => (
                <input key={i} type="text" maxLength={1} className="w-14 h-14 text-center text-2xl font-bold border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              ))}
            </div>
            <button onClick={() => handleLogin('user')} className="w-full bg-blue-600 text-white px-4 py-3.5 rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/30 transition-all">
              Verify & Login
            </button>
            <button onClick={() => setStep('method')} className="text-sm text-slate-500 hover:underline">Back</button>
          </div>
        )}

        {step === 'biometric' && (
          <div className="space-y-8 py-4">
            <div className="w-24 h-24 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-20"></div>
              <Fingerprint className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">Scanning Face ID / Fingerprint...</p>
            <button onClick={() => handleLogin('user')} className="w-full bg-blue-600 text-white px-4 py-3.5 rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/30 transition-all">
              Simulate Success
            </button>
            <button onClick={() => setStep('method')} className="text-sm text-slate-500 hover:underline">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isDarkMode } = useStore();
  
  const isImmersivePage = ['/ride', '/food', '/pay', '/safety', '/checkout', '/admin', '/vendor', '/driver', '/login', '/ai-hub', '/ai-modules', '/market', '/parcel'].some(path => location.pathname.startsWith(path));

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {!isImmersivePage && <Footer />}
      <AIChatbot />
      <AIVoiceAssistant />
      <CookieConsent />
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing & Shop */}
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Marketplace />} />
          <Route path="/products" element={<Listing title="All Products" />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/compare" element={<Comparison />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          
          {/* Marketing Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/support" element={<Support />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/developer" element={<Developer />} />
          
          {/* SuperApp Verticals */}
          <Route path="/ride" element={<Ride />} />
          <Route path="/food" element={<Food />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/parcel" element={<Parcel />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProtectedRoute role="user"><Profile /></ProtectedRoute>} />
          
          {/* AI Showcase */}
          <Route path="/ai-hub" element={<AIHub />} />
          <Route path="/ai-modules/:id" element={<AIModuleDetail />} />

          {/* Listings */}
          <Route path="/flash-sale" element={<Listing title="Flash Sales" filter="flash" />} />
          <Route path="/vendors" element={<Listing title="Our Vendors" />} />
          <Route path="/shop/:id" element={<VendorShop />} />
          <Route path="/recent" element={<RecentProducts />} />
          
          {/* Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/vendor/dashboard" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
          <Route path="/driver/dashboard" element={<ProtectedRoute role="driver"><DriverDashboard /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
