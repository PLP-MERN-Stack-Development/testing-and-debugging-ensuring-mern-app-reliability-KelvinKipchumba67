import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear the token from localStorage
    localStorage.removeItem('token');
    
    // 2. Redirect to the homepage
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Cypress looks for this text */}
      <h2>Welcome, testuser</h2>
      
      {/* Cypress clicks this button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;