import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useStore } from '../../store/useStore';

export function WalletTour() {
  const { tourCompleted, completeTour } = useStore();

  useEffect(() => {
    if (tourCompleted) return;

    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '#wallet-header', popover: { title: 'Your Wallet', description: 'This is your main dashboard. See your balance and points here.' } },
        { element: '#balance-card', popover: { title: 'Check Balance', description: 'Tap here to reveal your current balance securely.' } },
        { element: '#quick-actions', popover: { title: 'Quick Actions', description: 'Send money, pay bills, or recharge instantly from here.' } },
        { element: '#wallet-tabs', popover: { title: 'Explore More', description: 'Switch tabs to see financial services and transaction history.' } },
        { element: '#spending-chart', popover: { title: 'Track Spending', description: 'Visualize your weekly expenses to stay on budget.' } },
      ],
      onDestroyStarted: () => {
        completeTour();
        driverObj.destroy();
      },
    });

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      driverObj.drive();
    }, 1000);

  }, [tourCompleted, completeTour]);

  return null;
}
