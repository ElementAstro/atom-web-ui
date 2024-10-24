// src/components/Divider.js
import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const Divider = ({
  title,
  onHover,
  onClick,
  onDoubleClick,
  onFocus,
  onBlur,
  draggable = false,
  customClass = "",
  customTitleClass = "",
  customLineClass = "",
  theme, 
  tooltip = "", 
  borderWidth = "2", 
  animation = "transform transition-transform duration-300 ease-in-out", 
  icon = null, 
}) => {
  const dividerRef = useRef(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (onHover) {
      const handleMouseEnter = () => onHover();
      const dividerElement = dividerRef.current;
      dividerElement.addEventListener("mouseenter", handleMouseEnter);
      return () => {
        dividerElement.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [onHover]);

  const handleDragStart = (e) => {
    if (draggable) {
      const rect = dividerRef.current.getBoundingClientRect();
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        })
      );
    }
  };

  const handleDrop = (e) => {
    if (draggable) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      dividerRef.current.style.left = `${e.clientX - data.offsetX}px`;
      dividerRef.current.style.top = `${e.clientY - data.offsetY}px`;
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
      ref={dividerRef}
      id="divider"
      className={`flex items-center my-4 ${animation} hover:scale-105 hover:shadow-neon ${customClass} ${
        themeClasses[theme || currentTheme]
      }`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      tabIndex={0}
      title={tooltip}
    >
      <div
        className={`flex-1 border-t border-gray-400 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-${borderWidth} ${customLineClass}`}
      ></div>
      <span
        className={`mx-4 text-gray-600 hover:text-white transition-colors duration-300 ${customTitleClass}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </span>
      <div
        className={`flex-1 border-t border-gray-400 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-${borderWidth} ${customLineClass}`}
      ></div>
    </div>
  );
};

export default Divider;
