import React, { useState, useEffect } from 'react';
import exclamationIcon from '../assets/exclamation.svg';

function LoginPage() {

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="popup-overlay login-page">
      <div className="login-content">
        <div className="login-form-container">
            <div className="login-title">
              <h4 className="main-title">Login to Account</h4>
              <p>Please enter your email and password to continue</p>
            </div>
            <div className="form-group">
                <label htmlFor="nickname">Nickname</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  placeholder='Enter nickname'
                  value={nickname || ""}
                  
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder='Enter password'
                  value={password || ""}
                  
                />
              </div>
              <button type="button" className="login-btn" >Log In</button>
              <p className="dont-have-acc">Don't have an account? <a className='contact-us'>Contact us</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
