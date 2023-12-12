import React from 'react';
import "../Styles/FooterStyles.css";

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p style={{ color: 'black' }}>Email: info@example.com</p>
            <p style={{ color: 'black' }}>Phone: +123 456 789</p>
          </div>
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
         
        </div>
        <div className="footer-bottom">
          <p style={{ color: 'black' }}>&copy; 2023 Team1 Website. All rights reserved.</p>
        </div>
      </footer>
  )
}

export default Footer;
