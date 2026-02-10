import { useState, useEffect } from 'react';
import api from '../api';

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState('');

  const loadCart = async () => {
    try {
      const res = await api.get('/carts/me');
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = async () => {
    try {
      await api.post('/orders');
      setMessage('Order successful.');
      await loadCart(); // cart will be empty after order
    } catch (err) {
      setMessage(err.response?.data || 'Checkout failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {message && (
        <p className="mb-4 text-sm text-green-700">{message}</p>
      )}
      {cart && cart.items && cart.items.length > 0 ? (
        <>
          <p className="mb-2 text-sm text-gray-600">Items in your cart:</p>
          <ul className="list-disc ml-6 mb-4">
            {cart.items.map(ci => (
              <li key={ci._id || ci.item._id}>
                {ci.item?.name || 'Item'} × {ci.quantity}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
