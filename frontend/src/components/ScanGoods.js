import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import axios from 'axios';
import Lottie from 'lottie-react';
import scanAnimation from '../assets/scan.json';  // Ensure the correct path
import './ScanGoods.css';

function ScanGoods() {
  const [result, setResult] = useState('');
  const [showScanner, setShowScanner] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
      setShowScanner(false);
      setShowActions(true);
    }
  };

  const handleImport = async () => {
    setLoading(true);
    setIsProcessing(true);
    try {
      await axios.post(`${process.env.REACT_APP_URL}api/import`, {
        name: result,
        weight: 1,
        expiryDate: new Date(),
        stockAmount: 1
      });

      setTimeout(() => {
        setLoading(false);
        setShowSuccess(true);
        setIsProcessing(false);
      }, 3000); // 3-second delay
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import item.');
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    setIsProcessing(true);
    try {
      await axios.post(`${process.env.REACT_APP_URL}export`, { name: result });

      setTimeout(() => {
        setLoading(false);
        setShowSuccess(true); // Show success message
        setIsProcessing(false);
      }, 3000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export item.');
      setLoading(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="scan-goods-page">
      {/* Lottie Animation as Background */}
      <div className="lottie-background">
        <Lottie
          animationData={scanAnimation}
          loop={true}  // Ensure it loops indefinitely
          autoplay={true}  // Ensure it starts playing automatically
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,  // Ensure the animation is behind the content
          }}
        />
      </div>

      <h2 className="welcome-message">Please scan now</h2>

      {showScanner && (
        <div className="qr-scanner-container">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            className="qr-scanner"
          />
        </div>
      )}

      {result && !showActions && <p className="scanned-result">Scanned Result: {result}</p>}

      {showActions && !isProcessing && (
        <div className="action-buttons">
          <button onClick={handleImport} className="import-button" disabled={loading}>
            {loading ? '' : 'Import'}
          </button>
          <button onClick={handleExport} className="export-button" disabled={loading}>
            {loading ? '' : 'Export'}
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="main">
            <div className="loaders">
              {[...Array(9)].map((_, index) => (
                <div key={index} className={`loader loaderA ball${index}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="success-message">
          <p>Product added successfully! 💐</p>
        </div>
      )}
    </div>
  );
}

export default ScanGoods;
