import { ShieldAlert, Phone, UserCheck, MapPin, BellRing } from 'lucide-react';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Button } from '../components/ui/Button';

export function Safety() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceHeader title="Safety Center" color="bg-orange-600" />
      
      <div className="bg-orange-600 px-4 pb-8 pt-4 rounded-b-3xl shadow-lg text-white text-center">
        <ShieldAlert className="h-16 w-16 mx-auto mb-4 opacity-90" />
        <h1 className="text-2xl font-bold mb-2">We're here for you</h1>
        <p className="text-orange-100 text-sm max-w-xs mx-auto">
          AI-powered safety monitoring is active 24/7 across all your rides and orders.
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 animate-pulse">
              <BellRing className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-900">Emergency Assistance</h2>
              <p className="text-xs text-gray-500">Press for immediate help from local authorities.</p>
            </div>
          </div>
          <Button variant="danger" className="w-full h-12 text-lg font-bold">
            CALL SOS
          </Button>
        </div>

        <h3 className="font-bold text-gray-900 mb-4 ml-1">Safety Tools</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-orange-300 transition-colors cursor-pointer">
            <UserCheck className="h-8 w-8 text-blue-600 mb-3" />
            <h4 className="font-bold text-sm">Trusted Contacts</h4>
            <p className="text-xs text-gray-500 mt-1">Share trip details automatically.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border hover:border-orange-300 transition-colors cursor-pointer">
             <MapPin className="h-8 w-8 text-green-600 mb-3" />
             <h4 className="font-bold text-sm">Share Location</h4>
             <p className="text-xs text-gray-500 mt-1">Live tracking for friends.</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
          <h4 className="font-bold text-indigo-900 text-sm mb-2">AI Safety Report</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-xs text-indigo-700">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
              Last ride driver verification: Passed
            </li>
            <li className="flex items-center text-xs text-indigo-700">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
              Login location check: Normal
            </li>
            <li className="flex items-center text-xs text-indigo-700">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
              Payment security: High
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
