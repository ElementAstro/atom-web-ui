// src/components/Tooltip.js
import React, { useState } from "react";

const Tooltip = ({ text, children, onShow, onHide }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
    if (onShow) onShow();
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    if (onHide) onHide();
  };

  return (
    <div
      className="relative group inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xs p-2 rounded shadow-lg z-10`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
