// src/components/Tooltip.js
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Tooltip = ({
  text,
  children,
  onShow,
  onHide,
  position = "top",
  trigger = "hover",
  delay = 0,
  customClass = "",
  customTextClass = "",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-opacity duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleShow = () => {
    if (delay > 0) {
      const id = setTimeout(() => {
        setIsVisible(true);
        if (onShow) onShow();
      }, delay);
      setTimeoutId(id);
    } else {
      setIsVisible(true);
      if (onShow) onShow();
    }
  };

  const handleHide = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
    if (onHide) onHide();
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") handleShow();
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") handleHide();
  };

  const handleClick = () => {
    if (trigger === "click") {
      if (isVisible) {
        handleHide();
      } else {
        handleShow();
      }
    }
  };

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (position === "top" && containerRect.top < tooltipRect.height) {
        setCalculatedPosition("bottom");
      } else if (
        position === "bottom" &&
        containerRect.bottom + tooltipRect.height > viewportHeight
      ) {
        setCalculatedPosition("top");
      } else if (
        position === "left" &&
        containerRect.left < tooltipRect.width
      ) {
        setCalculatedPosition("right");
      } else if (
        position === "right" &&
        containerRect.right + tooltipRect.width > viewportWidth
      ) {
        setCalculatedPosition("left");
      } else {
        setCalculatedPosition(position);
      }
    }
  }, [isVisible, position]);

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      ref={containerRef}
      className={`relative group inline-block ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[theme || currentTheme]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      title={tooltip}
    >
      {children}
      <div
        ref={tooltipRef}
        className={`absolute ${
          positionClasses[calculatedPosition]
        } ${animation} ${
          isVisible ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xs p-2 rounded shadow-lg z-10 border-${borderWidth} ${customTextClass}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
