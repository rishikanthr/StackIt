import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to your dashboard</h2>
        <p className="mb-4">Logged in as user/admin.</p>

        <div className="space-y-4">
          <Link
            to="/ask"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ask a Question
          </Link>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Explore Questions</h3>
            <p>To view and answer questions, go to the Questions list or select a question to open its details.</p>
          </div>
        </div>
      </div>
    </>
  );
}
