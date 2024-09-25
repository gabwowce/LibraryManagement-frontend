import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import BackIcon from '../assets/back2.png';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  const { login } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
  
      await login(username, password, rememberMe);
      setErrorMessage(''); 
    } catch (error) {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  const handleContactUs = () => {
    setCurrentView('contact');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgotPassword');
  };

  const renderFormTitle = (title, subtitle) => (
    <div className="login-title">
      <h4 className="main-title">{title}</h4>
      <p className="additional-title">{subtitle}</p>
    </div>
  );

  const renderInput = (label, type, value, onChange) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={`Enter ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );

  const renderLoginForm = () => (
    <>
      {renderFormTitle('Login to Account', 'Please enter your email and password to continue')}
      
      {renderInput('Username', 'text', username, (e) => setUsername(e.target.value))}
      {renderInput('Password', 'password', password, (e) => setPassword(e.target.value))}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="forgot-password">
        <a href="#" onClick={handleForgotPassword} className="forget-password-link">Forgot Password?</a>
      </div>
      <div className="remember-me">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e)=>setRememberMe(e.target.checked)}
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <div className="login-form-actions">
        <button type="button" className="main-login-btn" onClick={handleLogin}>Log In</button>
        <p className="dont-have-acc">
          Don't have an account? <a href="#" onClick={handleContactUs} className='contact-us'>Contact us</a>
        </p>
      </div>
    </>
  );

  const renderContactUsForm = () => (
    <>
      {renderFormTitle('Contact Us', 'Please enter your email and send us a message')}
      {renderInput('Your Email', 'email', '', () => {})}
      <div className="form-group">
        <label>Your Message</label>
        <textarea  type="text" className='text-area-for-massage' placeholder="Send a message..." ></textarea>
      </div>
      <div className="form-actions">
        <button type="button" className="main-login-btn">Send Message</button>
        <p className='back-to-login'><img src={BackIcon} alt='back icon'/><a href="#" onClick={() => setCurrentView('login')}>Back to Login</a></p>
      </div>
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
      {renderFormTitle('Forgot Password?', 'Enter your email and we will recover your password')}
      {renderInput('Your Email', 'email', '', () => {})}
      <div className="form-actions">
        <button type="button" className="main-login-btn">Reset Password</button>
        <p className='back-to-login'><img src={BackIcon} alt='back icon'/><a href="#" onClick={() => setCurrentView('login')}>Back to Login</a></p>
      </div>
    </>
  );

  return (
    <div className="popup-overlay login-page">
      <div className="login-content">
        <div className="login-form-container">
          {currentView === 'login' && renderLoginForm()}
          {currentView === 'contact' && renderContactUsForm()}
          {currentView === 'forgotPassword' && renderForgotPasswordForm()}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
