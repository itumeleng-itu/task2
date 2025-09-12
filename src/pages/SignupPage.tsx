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
    <div className="authContainer">
      <div className="authImage">
        <img src={logo} alt="Signup visual" />
      </div>
      <div className="formContainer">
        <h2 className="formTitle">Sign Up</h2>
        <form className="formElement" onSubmit={handleSignup}>
          <input
            type="text"
            className="formInput"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit" className="formButton">Sign Up</button>
        </form>
        {error && <div className="errorMessage">{error}</div>}
        <p className="formText">
          Already have an account?{' '}
          <a
            href="/login"
            className="formLink"
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
