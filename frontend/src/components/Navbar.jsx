// frontend/src/components/Navbar.jsx
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
    } catch (err) {
      console.error('Logout error', err.response?.data || err.message);
    } finally {
      onLogout();
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
      {/* Brand → Items page */}
      <div
        className="font-semibold text-lg cursor-pointer"
        onClick={() => navigate('/items')}
      >
        Shopping Cart
      </div>

      <div className="space-x-2">
        
        <button
          onClick={() => navigate('/checkout')}
          className="bg-green-600 px-3 py-1 rounded"
        >
          Checkout
        </button>
        <button
          onClick={() => navigate('/cart')}
          className="bg-blue-600 px-3 py-1 rounded"
        >
          Cart
        </button>
        <button
          onClick={() => navigate('/orders')}
          className="bg-indigo-600 px-3 py-1 rounded"
        >
          Order History
        </button>

      <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-600 px-3 py-1 rounded"
        >
          My Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
