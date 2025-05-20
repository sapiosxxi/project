import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <button onClick={() => navigate('/home')}>Εστιατόρια</button>
      <button onClick={() => navigate('/profile')}>Οι Κρατήσεις μου</button>
      <button onClick={() => navigate('/reserve')}>Νέα Κράτηση</button>
      <button onClick={handleLogout}>Αποσύνδεση</button>
    </nav>
  );
};

export default Navbar;
