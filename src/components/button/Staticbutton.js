import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Staticbutton.css';

function Staticbutton({ 
  href, 
  isExternal = false, 
  children = "Get Started", 
  type = "button",
  onClick,
  ...props 
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (type === "submit") {
      if (onClick) onClick(e);
      return;
    }
    
    if (isExternal && href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href) {
      navigate(href);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className="button-container">
      <button 
        type={type}
        className="static-button" 
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Staticbutton;