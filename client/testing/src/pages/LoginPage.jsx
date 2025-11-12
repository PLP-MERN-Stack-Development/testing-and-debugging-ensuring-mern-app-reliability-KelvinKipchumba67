import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add a real fetch() call to your server's /api/auth/login endpoint
    console.log('Logging in with:', email, password);

    // For now, we'll pretend the login is successful
    if (email === 'test@example.com' && password === 'password123') {
      
      // 1. Set the token in localStorage
      localStorage.setItem('token', 'fake_token_for_testing');

      // 2. Redirect to the dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* This is for the "redirect" test */}
      <h2>You must be logged in</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Cypress needs this name attribute
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Cypress needs this name attribute
            name="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;