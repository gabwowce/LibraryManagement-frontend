import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import config from '../config';
import { useAuthContext } from '../context/AuthContext';

function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuthContext();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleLogin(e);
  }
};

  return (
    <div className="popup-overlay login-page">
      <div className="login-content">
        <div className="login-form-container">
            <div className="login-title">
              <h4 className="main-title">Login to Account</h4>
              <p>Please enter your email and password to continue</p>
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="password-input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button type="button" className="login-btn" onClick={handleLogin}>Log In</button>
              <p className="dont-have-acc">Don't have an account? <a className='contact-us'>Contact us</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
