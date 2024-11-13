import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/home.json';  // Updated import path
import './HomePage.css';

function HomePage({ setGoodsList }) {

  return (
    <div className="home-page">
      {/* Lottie Animation as Background */}
        <div className="lottie-background">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          />
        </div>

      {/* Card content */}
      <div className="card">
        <h2>WELCOME TO WAREHOUSE</h2>

        {/* Button Section */}
        <div className="button-container">
          <Link to="/scan-goods">
            <button className="rotate-button">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 1 0-1.414"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Scan Goods</span>
            </button>
          </Link>

          <Link to="/view-goods">
            <button className="rotate-button">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 1 0-1.414"
                  fill="currentColor"
                ></path>
              </svg>
              <span>View Goods</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
