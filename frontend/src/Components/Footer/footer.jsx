import React from 'react';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Profile-Playground</h3>
          <p className="footer-description">
            A playground for managing and showcasing my information.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/skills">Skills</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-links">
            <li><a href="https://github.com/Abhishek-Kumar111" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/abhishekkr111/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="/api/health" target="_blank" rel="noopener noreferrer">API Health</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Profile-Playground. Built for JD Intern Assignment.</p>
      </div>
    </footer>
  );
};

export default Footer;