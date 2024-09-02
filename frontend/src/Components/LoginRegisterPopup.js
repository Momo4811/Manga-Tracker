import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import './LoginRegisterPopup.css';

const LoginRegisterPopup = ({ togglePopup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsAuthenticated, setUserID } = useAuth();

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:${process.env.PORT || 4000}/auth/register`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await response.json();
      setUserID(data.userID);
      setIsAuthenticated(true);
      togglePopup();
      
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.message || 'Error logging in');
      clearFields();
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:${process.env.PORT || 4000}/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await response.json();

      setIsAuthenticated(true);
      setUserID(data.userID);
      togglePopup();

    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.message || 'Error logging in');
      clearFields();
    }
  };

  return (
    <div className="login-register-popup-overlay">
      <div className="login-register-popup-content">
        <button className="login-register-close-button" onClick={togglePopup}>X</button>
        {isLogin ? (
          <div>
            <h2>Login</h2>
            <form className="login-register-form" onSubmit={handleLogin}>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="submit" onClick={handleLogin}>Login</button>
            </form>
            <p>Don't have an account? <span className="login-register-switch" onClick={switchMode}>Register</span></p>
          </div>
        ) : (
          <div>
            <h2>Register</h2>
            <form className="login-register-form" >
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
              <button type="submit" onClick={handleRegister}>Register</button>
            </form>
            <p>Already have an account? <span className="login-register-switch" onClick={switchMode}>Login</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export { LoginRegisterPopup };