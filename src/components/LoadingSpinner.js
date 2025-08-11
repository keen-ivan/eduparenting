// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // Assuming you have a CSS file for styling

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;