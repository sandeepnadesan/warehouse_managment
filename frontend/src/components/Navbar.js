import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaEye, FaPhoneAlt, FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  return (
    <>
      {/* Left Sidebar Navbar */}
      <nav className="navbar">
        <Link to="/"><FaHome /> Home</Link>
        <Link to="/scan-goods"><FaShoppingCart /> Scan Goods</Link>
        <Link to="/view-goods"><FaEye /> View Goods</Link>
        <Link to="/contact"><FaPhoneAlt /> Contact</Link>
        <Link to="/about"><FaInfoCircle /> About</Link>
      </nav>

      {/* Top Navbar with Account Icon */}
      <div className="top-navbar">
        <div className="account-icon">
          <Link to="/account">
            <FaUserCircle size={30} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
