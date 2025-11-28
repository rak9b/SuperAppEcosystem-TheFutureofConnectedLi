import { useStore } from '../store/useStore';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { PayLanding } from '../components/pay/PayLanding';
import { UserWallet } from '../components/pay/UserWallet';
import { AgentWallet } from '../components/pay/AgentWallet';
import { WalletTour } from '../components/pay/WalletTour';

export function Pay() {
  const { user } = useStore();

  // 1. Public Landing (Not Logged In)
  if (!user) {
    return (
      <>
        <ServiceHeader title="SuperPay" color="bg-pink-600" />
        <PayLanding />
      </>
    );
  }

  // 2. Agent Dashboard
  if (user.role === 'agent') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ServiceHeader title="Agent Portal" color="bg-purple-900" />
        <AgentWallet />
      </div>
    );
  }

  // 3. User Dashboard (Default)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader title="Mobile Finance" color="bg-pink-600" />
      <UserWallet />
      <WalletTour />
    </div>
  );
}
