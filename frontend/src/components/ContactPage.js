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
          <img src={sandeepImage} alt="Sandeep N" />
          <div className="details">
            <p><strong>Sandeep N</strong></p>
            <p>Mobile: 9944882544</p>
            <p>Email: <a href="mailto:sandeepnadesankns.com">sandeepnadesankns@gmail.com</a></p> {/* Replace with actual email */}
          </div>
        </div>
        <div>
          <img src={vasanthasriImage} alt="Vasanthasri T" />
          <div className="details">
            <p><strong>Vasanthasri T</strong></p>
            <p>Mobile: 8072636468</p>
            <p>Email: <a href="mailto:vasanthasrit.com">vasanthasrit@gmail.com</a></p> {/* Replace with actual email */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
