import React from 'react';
import hospitalLogo from '../../assets/logo.png';
import './Preloader.css'; // Import your CSS

function Preloader({ customLogo, loadingText = "Loading..." }) {
  return (
    <div className="preloader">
      <img 
        src={customLogo || hospitalLogo} 
        alt={loadingText} 
        className="spinning-logo" 
      />
    </div>
  );
}

export default Preloader;