import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Tag, Gift, Truck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { useState } from 'react';

export function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isGift, setIsGift] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% Tax
  const shipping = subtotal > 50 ? 0 : 10;
  const giftWrapFee = isGift ? 5 : 0;
  const total = subtotal + tax + shipping + giftWrapFee - discount;

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(subtotal * 0.10);
      alert("Coupon Applied: 10% Off");
    } else {
      alert("Invalid Coupon");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
        <Link to="/products">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 dark:text-white">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700 flex justify-between items-center">
              <span className="font-medium text-gray-700 dark:text-gray-300">Vendor: <span className="text-blue-600">{cart[0].vendorName}</span></span>
              <button onClick={clearCart} className="text-sm text-red-500 hover:underline">Clear Cart</button>
            </div>
            <div className="divide-y dark:divide-gray-700">
              {cart.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100">
                    <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{Object.values(item.attributes).join(', ')}</p>
                      </div>
                      <p className="text-base font-medium text-gray-900 dark:text-white">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border dark:border-gray-600 rounded-md">
                        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"><Minus className="h-4 w-4" /></button>
                        <span className="w-8 text-center text-sm dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"><Plus className="h-4 w-4" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 flex items-center"><Trash2 className="h-4 w-4 mr-1" /> Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Sell */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
             <h3 className="font-bold text-sm mb-2 flex items-center"><Tag className="h-4 w-4 mr-2" /> Special Offer</h3>
             <p className="text-sm text-slate-600 dark:text-slate-400">Add <strong>Premium Warranty</strong> for just $15?</p>
             <Button size="sm" variant="outline" className="mt-2 bg-white">Add to Order</Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Promo Code" 
                className="flex-1 border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button size="sm" variant="outline" onClick={applyCoupon}>Apply</Button>
            </div>

            {/* Gift Option */}
            <div className="flex items-center mb-4">
               <input 
                 type="checkbox" 
                 id="gift" 
                 checked={isGift} 
                 onChange={(e) => setIsGift(e.target.checked)}
                 className="mr-2"
               />
               <label htmlFor="gift" className="text-sm flex items-center cursor-pointer dark:text-white"><Gift className="h-3 w-3 mr-1" /> Add Gift Wrap (+{formatPrice(5)})</label>
            </div>

            <div className="space-y-3 border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                 <span className="flex items-center"><Truck className="h-3 w-3 mr-1" /> Shipping</span>
                 <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span>
              </div>
              {isGift && <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400"><span>Gift Wrap</span><span>{formatPrice(giftWrapFee)}</span></div>}
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>
              )}
              <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-white"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
            <Link to="/checkout">
              <Button className="w-full mt-6" size="lg">Checkout <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
