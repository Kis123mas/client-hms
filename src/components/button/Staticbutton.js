import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Staticbutton.css';

function Staticbutton({ href, isExternal = false, children = "Get Started" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isExternal && href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href) {
      navigate(href);
    }
  };

  return (
    <div className="button-container">
      <div className="static-button" onClick={handleClick}>
        {children}
      </div>
    </div>
  );
}

export default Staticbutton;