// src/components/Alert.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Alert = ({
  message,
  severity,
  onClose,
  onOpen,
  customClass = "",
  customMessageClass = "",
  customButtonClass = "",
  autoClose = false,
  autoCloseDuration = 5000,
  pauseOnHover = true,
  icon,
  title,
  theme, 
  position = "top-right", 
  animation = "transform transition-transform duration-300 ease-in-out", 
  dismissible = true, 
  showIcon = true, 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (isVisible && onOpen) {
      onOpen();
    }
  }, [isVisible, onOpen]);

  useEffect(() => {
    let timer;
    if (autoClose && !isPaused) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // 等待动画结束后再调用 onClose
      }, autoCloseDuration);
    }
    return () => clearTimeout(timer);
  }, [autoClose, autoCloseDuration, isPaused, onClose]);

  const bgColor = severity === "error" ? "bg-red-900" : "bg-blue-900";
  const textColor = severity === "error" ? "text-red-300" : "text-blue-300";
  const borderColor =
    severity === "error" ? "border-red-500" : "border-blue-500";

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // 等待动画结束后再调用 onClose
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    isVisible && (
      <div
        className={`alert border-l-4 ${borderColor} ${bgColor} ${textColor} p-4 my-2 rounded ${animation} ${
          positionClasses[position]
        } ${themeClasses[theme || currentTheme]} ${customClass}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="alert__content flex justify-between items-center">
          {showIcon && icon && <span className="alert__icon mr-2">{icon}</span>}
          <div className="flex-1">
            {title && (
              <div className="alert__title font-bold mb-1">{title}</div>
            )}
            <span className={`alert__message ${customMessageClass}`}>
              {message}
            </span>
          </div>
          {dismissible && (
            <button
              onClick={handleClose}
              onKeyDown={(e) => e.key === "Enter" && handleClose()}
              tabIndex={0}
              className={`alert__close-button text-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Alert;

<style jsx>{`
  @media (max-width: 768px) {
    .alert {
      padding: 1rem;
    }
    .alert__message {
      font-size: 0.875rem;
    }
    .alert__close-button {
      font-size: 1.25rem;
    }
    .alert__title {
      font-size: 1rem;
    }
  }
`}</style>;
