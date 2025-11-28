import { useStore } from '../store/useStore';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { User, MapPin, Shield, CreditCard, Gift, Crown, Share2, Moon, LogOut, Fingerprint, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Profile() {
  const { user, addresses, membershipTier, loyaltyPoints, isDarkMode, toggleDarkMode, logout } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <ServiceHeader title="My Profile" color="bg-blue-600" />
      
      <div className="container mx-auto px-4 -mt-6">
        {/* User Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl flex items-center">
            <Crown className="h-3 w-3 mr-1" /> {membershipTier} Member
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {user?.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
            <div className="mt-2 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
              <Gift className="h-4 w-4 mr-1" /> {loyaltyPoints} Points
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" /> Account Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-3" /> Saved Addresses
                </div>
                <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{addresses.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <CreditCard className="h-4 w-4 mr-3" /> Payment Methods
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Share2 className="h-4 w-4 mr-3" /> Refer & Earn
                </div>
                <span className="text-xs text-green-600 font-bold">Get $10</span>
              </div>
            </div>
          </div>

          {/* Security & App Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" /> Security & App
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Fingerprint className="h-4 w-4 mr-3" /> Biometric Login
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-400"/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Lock className="h-4 w-4 mr-3" /> 2-Factor Auth
                </div>
                <span className="text-xs text-green-600 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer" onClick={toggleDarkMode}>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Moon className="h-4 w-4 mr-3" /> Dark Mode
                </div>
                <span className="text-xs text-gray-500">{isDarkMode ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Banner */}
        <div className="mt-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="text-lg font-bold mb-2 flex items-center"><Crown className="mr-2 text-yellow-400" /> SuperApp Platinum</h3>
             <p className="text-sm text-gray-300 mb-4">Upgrade to Platinum to get 5% cashback on all rides and free delivery on food orders.</p>
             <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 border-none">View Benefits</Button>
           </div>
           <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
             <Crown className="h-48 w-48" />
           </div>
        </div>

        <div className="mt-8">
          <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" /> Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
