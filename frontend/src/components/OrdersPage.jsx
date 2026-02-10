import { useEffect, useState } from 'react';
import api from '../api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const res = await api.get('/orders/me');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  if (!orders.length) {
    return <div className="p-4">You have no orders yet.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Cart ID</th>
            <th className="px-4 py-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="px-4 py-2 border">{order._id}</td>
              <td className="px-4 py-2 border">{order.cart}</td>
              <td className="px-4 py-2 border">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
