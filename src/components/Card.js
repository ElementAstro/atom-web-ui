// src/components/Card.js
import React, { useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const Card = ({
  title,
  children,
  isCollapsed = false,
  isMaximized = false,
  draggable = false,
  onToggleCollapse,
  onMaximize,
  onClose,
  customClass = "",
  customHeaderClass = "",
  customContentClass = "",
  tooltip = "", 
  borderWidth = "2", 
  animation = "transform transition-transform duration-300 ease-in-out", 
  icon = null, 
}) => {
  const cardRef = useRef(null);
  const { theme } = useTheme(); // 获取当前主题

  const handleToggleCollapse = () => {
    if (onToggleCollapse) onToggleCollapse();
  };

  const handleMaximize = () => {
    if (onMaximize) onMaximize();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleDragStart = (e) => {
    if (draggable) {
      e.dataTransfer.setData("text/plain", cardRef.current.id);
    }
  };

  const handleDrop = (e) => {
    if (draggable) {
      e.preventDefault();
      const droppedCardId = e.dataTransfer.getData("text/plain");
      const droppedCard = document.getElementById(droppedCardId);
      cardRef.current.parentNode.insertBefore(
        droppedCard,
        cardRef.current.nextSibling
      );
    }
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      ref={cardRef}
      className={`border-${borderWidth} rounded-lg shadow-lg ${animation} ${
        isCollapsed ? "h-12" : "h-auto"
      } ${isMaximized ? "fixed inset-0 z-50" : ""} ${
        draggable ? "absolute" : ""
      } hover:shadow-xl hover:shadow-neon transform hover:scale-105 ${customClass} ${
        themeClasses[theme]
      }`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      title={tooltip}
    >
      <div
        className={`flex justify-between items-center p-4 cursor-pointer bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 ${customHeaderClass}`}
        onClick={handleToggleCollapse}
        onKeyDown={(e) => e.key === "Enter" && handleToggleCollapse()}
        tabIndex={0}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h2 className="font-bold text-xl text-white">{title}</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleMaximize}
            onKeyDown={(e) => e.key === "Enter" && handleMaximize()}
            className="text-lg text-green-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
            tabIndex={0}
          >
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button
            onClick={handleClose}
            onKeyDown={(e) => e.key === "Enter" && handleClose()}
            className="text-lg text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600"
            tabIndex={0}
          >
            ✕
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className={`p-4 ${customContentClass}`}>{children}</div>
      )}
    </div>
  );
};

export default Card;
