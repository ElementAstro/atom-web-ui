// src/components/Divider.js
import React, { useEffect } from "react";

const Divider = ({ title, onHover, onClick }) => {
  useEffect(() => {
    if (onHover) {
      const handleMouseEnter = () => onHover();
      const dividerElement = document.getElementById("divider");
      dividerElement.addEventListener("mouseenter", handleMouseEnter);
      return () => {
        dividerElement.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [onHover]);

  return (
    <div
      id="divider"
      className="flex items-center my-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon"
      onClick={onClick}
    >
      <div className="flex-1 border-t border-gray-400 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
      <span className="mx-4 text-gray-600 hover:text-white transition-colors duration-300">
        {title}
      </span>
      <div className="flex-1 border-t border-gray-400 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
    </div>
  );
};

export default Divider;
