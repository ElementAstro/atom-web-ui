// src/components/Icon.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="inline-block transition-transform duration-300 ease-in-out transform hover:scale-125 hover:rotate-12 hover:shadow-neon"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon icon={icon} className="text-lg text-white" />
    </div>
  );
};

export default Icon;
