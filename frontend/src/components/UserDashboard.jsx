import { useEffect, useState } from 'react';
import api from '../api';

export default function UserDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await api.get('/user-stats');
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching user stats', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-4">Could not load stats.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Dashboard</h2>
      <table className="min-w-[320px] bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Metric</th>
            <th className="px-4 py-2 border">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">User ID</td>
            <td className="px-4 py-2 border">{stats.userId}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Current Cart ID</td>
            <td className="px-4 py-2 border">
              {stats.cartId || 'No cart yet'}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Items in Current Cart</td>
            <td className="px-4 py-2 border">{stats.cartItemsCount}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Total Orders Placed</td>
            <td className="px-4 py-2 border">{stats.ordersCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
