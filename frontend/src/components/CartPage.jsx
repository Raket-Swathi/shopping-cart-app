import { useEffect, useState } from 'react';
import api from '../api';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await api.get('/carts/me');
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) {
    return <div className="p-4">Loading cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <div className="p-4">Your cart is empty.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      <p className="mb-2 text-sm text-gray-600">Cart ID: {cart._id}</p>
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Item ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(ci => (
            <tr key={ci._id || ci.item._id}>
              <td className="px-4 py-2 border">
                {ci.item?._id || ci.item}
              </td>
              <td className="px-4 py-2 border">
                {ci.item?.name || 'Item'}
              </td>
              <td className="px-4 py-2 border">
                {ci.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
