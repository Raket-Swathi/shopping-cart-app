import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrdersPage from './components/OrdersPage';
import UserDashboard from './components/UserDashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate('/items');        // IMPORTANT: go to items, not "/"
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  if (!loggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Logged in
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={handleLogout} />
      <Routes>
        {/* Default for logged-in user */}
        <Route path="/" element={<Navigate to="/items" replace />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<Navigate to="/items" replace />} />
      </Routes>
    </div>
  );
}

export default App;
