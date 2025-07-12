import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationBell } from './NotificationBell';

export default function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-100 shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        StackIt
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/ask" className="text-blue-600 font-medium">
          Ask Question
        </Link>
        <NotificationBell />
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
