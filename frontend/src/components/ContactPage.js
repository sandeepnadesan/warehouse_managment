import React from 'react';
import './ContactPage.css';
import sandeepImage from '../assets/Sandeep.jpg'; // Replace with actual image path
import vasanthasriImage from '../assets/Sri.jpg'; // Replace with actual image path

function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <div>
          <div className="details">
            <p><strong>Sri Vishal Traders</strong></p>
            <p>Mobile: 9500628734</p>
            <p>Email: <a href="mailto:srivishaltraders.com">srivishaltraders@gmail.com</a></p> {/* Replace with actual email */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
