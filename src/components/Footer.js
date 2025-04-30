import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <a href="/contact">Contact Us</a>
        <span>|</span>
        <a href="/contact-info">Contact Information</a>
        <span>|</span>
        <a href="/privacy-policy">Privacy Policy</a>
        <span>|</span>
        <a href="/refund-policy">Refund Policy</a>
        <span>|</span>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
      {/* <div className="footer-payments">
        <img src="/amex.png" alt="American Express" />
        <img src="/apple-pay.png" alt="Apple Pay" />
        <img src="/google-pay.png" alt="Google Pay" />
        <img src="/mastercard.png" alt="MasterCard" />
        <img src="/shopify-pay.png" alt="Shopify Pay" />
        <img src="/unionpay.png" alt="UnionPay" />
        <img src="/visa.png" alt="Visa" />
      </div> */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer">
          <i className="fab fa-pinterest-p"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <div className="footer-follow">
        <button className="follow-button">
          <i className="fas fa-heart"></i> Follow on Shop
        </button>
      </div>
      <div className="footer-copyright">
        © 2025, CUP SHOP
      </div>
    </footer>
  );
};

export default Footer;
