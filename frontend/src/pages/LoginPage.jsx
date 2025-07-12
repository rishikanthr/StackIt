import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleGuest = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/guest');
    localStorage.setItem('token', res.data.token);
    navigate('/guest');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const endpoint = 'http://localhost:5000/api/auth/register';
    const res = await axios.post(endpoint, { ...formData, role });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } else {
      alert('Registration succeeded but token missing');
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    alert('Registration failed: ' + (error.response?.data || error.message));
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-3xl font-bold">Welcome to StackIt</h1>
      <button onClick={handleGuest} className="bg-blue-500 text-white px-4 py-2 rounded">
        Continue as Guest
      </button>
      <div className="flex gap-4">
        <button onClick={() => setRole('user')} className="border px-4 py-2 rounded">
          User
        </button>
        <button onClick={() => setRole('admin')} className="border px-4 py-2 rounded">
          Admin
        </button>
      </div>

      {role && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
          <input
            placeholder="Name"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Register as {role}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
