import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Askquestion from './pages/AskQuestion';
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar'; // 👈 Add this

function App() {
  return (
    <Router>
      <Navbar /> {/* 👈 Add this just before Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<Askquestion />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;