// src/components/Avatar.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Avatar = ({
  src,
  alt,
  size = "40",
  isLoading = false,
  onLoad,
  onError,
  borderColor = "transparent",
  showStatus = false,
  statusColor = "green",
  shape = "circle",
  fallbackSrc = "https://via.placeholder.com/150",
  tooltip = "",
  borderWidth = "2",
  statusPosition = "bottom-right",
  animation = "scale-105 shadow-lg shadow-neon",
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
}) => {
  const [isError, setIsError] = useState(false);
  const { theme } = useTheme(); // 获取当前主题

  const handleError = () => {
    setIsError(true); // 若图片加载失败，则显示默认头像
    if (onError) onError();
  };

  useEffect(() => {
    if (!isError && onLoad) {
      onLoad();
    }
  }, [isError, onLoad]);

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  const statusPositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const themeClasses = {
    light: "border-gray-300",
    dark: "border-gray-700",
    astronomy: "border-gradient-to-r from-purple-900 via-blue-900 to-black",
    eyeCare: "border-green-300",
    ocean: "border-blue-300",
    sunset: "border-orange-300",
  };

  return (
    <div
      className={`relative w-${size} h-${size} group flex items-center justify-center`}
      title={tooltip}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>{" "}
          {/* Loading Spinner */}
        </div>
      )}
      <img
        src={isError ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        className={`${shapeClass} w-${size} h-${size} object-cover transition-transform duration-300 ease-in-out group-hover:${animation}`}
      />
      <div
        className={`absolute inset-0 ${shapeClass} border-${borderWidth} border-${borderColor} group-hover:border-neon transition-all duration-300 ease-in-out ${themeClasses[theme]}`}
      ></div>
      {showStatus && (
        <span
          className={`absolute ${statusPositionClasses[statusPosition]} block w-3 h-3 bg-${statusColor}-500 border-${borderWidth} border-white ${shapeClass}`}
        ></span>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .w-${size} {
            width: ${size / 2}px;
          }
          .h-${size} {
            height: ${size / 2}px;
          }
        }
      `}</style>
    </div>
  );
};

export default Avatar;
