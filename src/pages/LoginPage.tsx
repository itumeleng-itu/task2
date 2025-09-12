import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';
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
    <div className="authContainer">
      <div className="authImage">
        <img src={logo} alt="Login visual" />
      </div>
      <div className="formContainer">
        <h2 className="formTitle">Login</h2>
        <form className="formElement" onSubmit={handleLogin}>
          <input
            type="email"
            className="formInput"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="formInput"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="formButton">Login</button>
        </form>
        {error && <div className="errorMessage">{error}</div>}
        <p className="formText">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="formLink"
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
