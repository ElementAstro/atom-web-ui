import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Toast = ({
  message,
  onClose,
  duration = 3000,
  onOpen,
  onCloseComplete,
  variant = "info",
  position = "bottom-right",
  customClass = "",
  customMessageClass = "",
  customButtonClass = "",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-500 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  size = "medium", // 新增属性
  onDoubleClick, // 新增属性
  onKeyDown, // 新增属性
  ariaLabel = "通知", // 新增属性
}) => {
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const toastRef = useRef(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (onOpen) onOpen();
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer); // 清除定时器
      if (onCloseComplete) onCloseComplete();
    };
  }, [onClose, duration, onOpen, onCloseComplete]);

  useEffect(() => {
    if (toastRef.current) {
      const toastRect = toastRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (position === "top-left" && toastRect.top < 0) {
        setCalculatedPosition("bottom-left");
      } else if (position === "top-right" && toastRect.top < 0) {
        setCalculatedPosition("bottom-right");
      } else if (
        position === "bottom-left" &&
        toastRect.bottom > viewportHeight
      ) {
        setCalculatedPosition("top-left");
      } else if (
        position === "bottom-right" &&
        toastRect.bottom > viewportHeight
      ) {
        setCalculatedPosition("top-right");
      } else if (position === "top-center" && toastRect.top < 0) {
        setCalculatedPosition("bottom-center");
      } else if (
        position === "bottom-center" &&
        toastRect.bottom > viewportHeight
      ) {
        setCalculatedPosition("top-center");
      } else {
        setCalculatedPosition(position);
      }
    }
  }, [position]);

  const variantClasses = {
    info: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
    success: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
    warning: "bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700",
    error: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
    neutral: "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700", // 新增颜色
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
  };

  const sizeClasses = {
    small: "p-2 text-sm",
    medium: "p-4 text-base",
    large: "p-6 text-lg",
  };

  return (
    <div
      ref={toastRef}
      className={`fixed ${positionClasses[calculatedPosition]} ${
        variantClasses[variant]
      } text-white ${
        sizeClasses[size]
      } rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-fade-in hover:scale-105 hover:shadow-neon z-50 ${customClass} ${
        themeClasses[theme || currentTheme]
      } border-${borderWidth} ${fullscreen ? "w-full h-full" : ""}`}
      role="alert"
      aria-live="assertive"
      aria-label={ariaLabel}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      title={tooltip}
    >
      <div className={`flex items-center ${customMessageClass}`}>
        {icon && <span className="mr-2">{icon}</span>}
        {message}
        <button
          className={`ml-3 text-sm hover:text-red-400 transition duration-300 ${customButtonClass}`}
          onClick={onClose}
          onKeyDown={(e) => e.key === "Enter" && onClose()}
          aria-label="Close"
          title={tooltip}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Toast;
