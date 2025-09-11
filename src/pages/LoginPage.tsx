import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
// Replace '../assets/logo.png' with the actual image file you want to use
import logo from '../assets/images/Minimalist Abstract Art.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[email] || users[email].password !== password) {
      setError('Invalid credentials.');
      return;
    }
    localStorage.setItem('currentUser', users[email].username || email);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="image">
        <img src={logo} alt="Login visual" />
      </div>
      <div className="formContainer">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <div className="error-msg">{error}</div>}
        <p>
          Don't have an account?{' '}
          <a
            href="/signup"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
