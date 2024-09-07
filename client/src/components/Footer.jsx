import React from 'react';
import '../styles/footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-phone">Questions? Call 1-844-505-2993</p>
        <div className="footer-links">
          <a href="#">FAQ</a>
          <a href="#">Help Center</a>
          <a href="#">Netflix Shop</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Corporate Information</a>
          <a href="#">Do Not Sell or Share My Personal Information</a>
          <a href="#">Ad Choices</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Netflix, Inc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
