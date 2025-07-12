import { useEffect, useState } from 'react';
import axios from 'axios';

export function NotificationBell() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      // Ensure notifications is always an array
      const data = Array.isArray(res.data) ? res.data : [];
      setNotifs(data);
    })
    .catch(err => {
      console.error("Error fetching notifications:", err);
      setNotifs([]); // fallback to empty
    });
  }, []);

  return (
    <div className="relative">
      <button>🔔 {notifs.filter(n => !n.isRead).length}</button>
      <div className="absolute right-0 bg-white border shadow p-2 mt-1 w-64 z-50">
        {notifs.map(n => (
          <div key={n._id} className="text-sm border-b py-1">
            <a href={n.link} className="text-blue-600 hover:underline">
              {n.message}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
