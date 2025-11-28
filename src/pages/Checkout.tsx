import { useSearchParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useSuperAppStore } from '../store/useSuperAppStore';
import { ServiceHeader } from '../components/layout/ServiceHeader';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Wallet, CreditCard, CheckCircle, Banknote, Smartphone, User } from 'lucide-react';
import { useState } from 'react';

export function Checkout() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'shop';
  const navigate = useNavigate();

  // Shop Store
  const { cart: shopCart, clearCart: clearShopCart, user } = useStore();
  // Food Store
  const { food, placeFoodOrder, pay } = useSuperAppStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card' | 'cod' | 'upi'>('wallet');
  const [isGuest, setIsGuest] = useState(!user);

  const cartItems = type === 'food' ? food.cart : shopCart;
  
  const subtotal = cartItems.reduce((acc, item) => {
    const price = 'price' in item ? item.price : item.item.price;
    return acc + price * item.quantity;
  }, 0);
  
  const deliveryFee = type === 'food' ? 2.99 : 10.00;
  const total = subtotal + deliveryFee;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // If using wallet, check balance
      if (paymentMethod === 'wallet') {
        const success = pay(total, type === 'food' ? 'Food Order' : 'Shop Order', type === 'food' ? 'Food' : 'Shop');
        if (!success) {
          alert("Insufficient funds in Super Wallet!");
          setIsProcessing(false);
          return;
        }
      }
      
      setIsSuccess(true);
      if (type === 'food') placeFoodOrder();
      else clearShopCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">Your order #{Math.floor(Math.random() * 10000)} has been placed.</p>
        <Button onClick={() => navigate(type === 'food' ? '/food' : '/')}>
          Return to {type === 'food' ? 'Food' : 'Shop'}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader title="Checkout" color={type === 'food' ? 'bg-green-600' : 'bg-blue-600'} />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Guest Checkout Toggle */}
        {!user && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <span className="font-medium dark:text-white">Guest Checkout</span>
             </div>
             <div className="text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Log In for Points</div>
          </div>
        )}

        {/* Address Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
           <h3 className="font-bold mb-4 dark:text-white">Shipping Address</h3>
           <div className="space-y-3">
              <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <input type="text" placeholder="Street Address" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              <div className="grid grid-cols-2 gap-3">
                 <input type="text" placeholder="City" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                 <input type="text" placeholder="Zip Code" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
           </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <h2 className="font-bold mb-4 dark:text-white">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cartItems.map((item, idx) => {
               const name = 'name' in item ? item.name : item.item.name;
               const price = 'price' in item ? item.price : item.item.price;
               return (
                <div key={idx} className="flex justify-between text-sm dark:text-gray-300">
                  <span className="text-gray-600 dark:text-gray-400">{item.quantity}x {name}</span>
                  <span className="font-medium">{formatPrice(price * item.quantity)}</span>
                </div>
               );
            })}
          </div>
          <div className="border-t dark:border-gray-700 pt-3 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery Fee</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 dark:text-white">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
          <h2 className="font-bold mb-4 dark:text-white">Payment Method</h2>
          <div className="space-y-3">
            {/* Wallet */}
            <div 
              onClick={() => setPaymentMethod('wallet')}
              className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'wallet' ? 'bg-pink-50 border-pink-500' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm dark:text-white">Super Wallet</p>
                  <p className="text-xs text-gray-500">Balance: {formatPrice(useSuperAppStore.getState().wallet.balance)}</p>
                </div>
              </div>
              <div className={`h-4 w-4 rounded-full border-2 ${paymentMethod === 'wallet' ? 'border-pink-600 bg-pink-600' : 'border-gray-300'}`}></div>
            </div>

            {/* Card */}
            <div 
              onClick={() => setPaymentMethod('card')}
              className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'card' ? 'bg-blue-50 border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm dark:text-white">Credit / Debit Card</span>
              </div>
              <div className={`h-4 w-4 rounded-full border-2 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}></div>
            </div>

            {/* UPI */}
            <div 
              onClick={() => setPaymentMethod('upi')}
              className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'upi' ? 'bg-purple-50 border-purple-500' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm dark:text-white">UPI / Mobile Payment</span>
              </div>
              <div className={`h-4 w-4 rounded-full border-2 ${paymentMethod === 'upi' ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}></div>
            </div>

            {/* COD */}
            <div 
              onClick={() => setPaymentMethod('cod')}
              className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${paymentMethod === 'cod' ? 'bg-green-50 border-green-500' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Banknote className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm dark:text-white">Cash on Delivery</span>
              </div>
              <div className={`h-4 w-4 rounded-full border-2 ${paymentMethod === 'cod' ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}></div>
            </div>
          </div>
        </div>

        <Button 
          size="lg" 
          className={`w-full rounded-xl text-lg ${type === 'food' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={handlePayment}
          isLoading={isProcessing}
        >
          Pay {formatPrice(total)}
        </Button>
      </div>
    </div>
  );
}
