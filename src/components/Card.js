// src/components/Card.js
import React, { useState, useEffect } from "react";

const Card = ({ title, children, onCollapse, onClose, onOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible && onOpen) {
      onOpen();
    }
  }, [isVisible, onOpen]);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (onCollapse) onCollapse(!isCollapsed);
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null; // 如果不可见，返回 null

  return (
    <div
      className={`border rounded-lg shadow-lg transition-all duration-300 ${
        isCollapsed ? "h-12" : "h-auto"
      } hover:shadow-xl hover:shadow-neon transform hover:scale-105`}
    >
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-gradient-to-r from-purple-900 via-pink-900 to-red-900"
        onClick={handleToggleCollapse}
        onKeyDown={(e) => e.key === "Enter" && handleToggleCollapse()}
        tabIndex={0}
      >
        <h2 className="font-bold text-xl text-white">{title}</h2>
        <button
          onClick={handleClose}
          onKeyDown={(e) => e.key === "Enter" && handleClose()}
          className="text-lg text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
          tabIndex={0}
        >
          ✕
        </button>
      </div>
      {!isCollapsed && (
        <div className="p-4 bg-gray-900 text-white">{children}</div>
      )}
    </div>
  );
};

export default Card;
