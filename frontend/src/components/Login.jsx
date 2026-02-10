import { useState } from 'react';
import api from '../api';

export default function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { username, password });
      window.alert('User created successfully, now login.');
      setMode('login');
    } catch (err) {
      window.alert(err.response?.data || 'Error creating user');
    }
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/users/login', { username, password });
    localStorage.setItem('token', res.data.token);
    onLoginSuccess();           // navigation happens in App.jsx
  } catch (err) {
    if (err.response && err.response.status === 403) {
      window.alert('You are already logged in on another device.');
    } else {
      window.alert('Invalid username/password');
    }
  }
};


  const handleSubmit = mode === 'login' ? handleLogin : handleSignup;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        <input
          className="w-full border px-3 py-2 mb-3 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full border px-3 py-2 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
        >
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>

        <div className="text-center text-sm">
          {mode === 'login' ? (
            <span>
              New user?{' '}
              <button
                type="button"
                className="text-blue-600 underline"
                onClick={() => setMode('signup')}
              >
                Create an account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-600 underline"
                onClick={() => setMode('login')}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

