import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import logo from '../assets/images/Minimalist Abstract Art.png';


export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      setError('User already exists.');
      return;
    }
    users[email] = { password, username };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        {/* You can replace this with your image or background */}
        <img src={logo} alt="Signup visual" />
      </div>
      <div className="auth-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
        {error && <div className="error-msg">{error}</div>}
        <p>
          Already have an account?{' '}
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
