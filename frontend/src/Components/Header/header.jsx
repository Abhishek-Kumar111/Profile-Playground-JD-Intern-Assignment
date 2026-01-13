import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is logged in (check token in localStorage)
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-logo">Candidate Profile</h1>
        </div>
        <nav className="header-nav">
          <a href="/" className="nav-link">Home</a>
          {isLoggedIn && (
            <>
              <a href="/profile" className="nav-link">Profile</a>
              <a href="/projects" className="nav-link">Projects</a>
              <a href="/skills" className="nav-link">Skills</a>
            </>
          )}
        </nav>
        <div className="header-auth">
          {isLoggedIn ? (
            <>
              <span className="user-name">Hello, {userName}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="btn-login">Login</a>
              <a href="/signup" className="btn-signup">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;