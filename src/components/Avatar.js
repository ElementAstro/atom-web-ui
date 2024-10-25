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
  showBadge = false,
  badgeContent = "",
  badgeColor = "red",
  badgePosition = "top-right",
  badgeSize = "small",
  badgeShape = "circle",
  badgeBorderColor = "white",
  badgeBorderWidth = "1",
  lazyLoad = false,
  intersectionThreshold = 0.1,
  onClick,
}) => {
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazyLoad);
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

  useEffect(() => {
    if (lazyLoad) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: intersectionThreshold }
      );

      observer.observe(document.querySelector(`#avatar-${alt}`));
      return () => observer.disconnect();
    }
  }, [lazyLoad, intersectionThreshold, alt]);

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  const statusPositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const badgePositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const badgeSizeClasses = {
    small: "w-4 h-4 text-xs",
    medium: "w-6 h-6 text-sm",
    large: "w-8 h-8 text-md",
  };

  const badgeShapeClass =
    badgeShape === "circle" ? "rounded-full" : "rounded-lg";

  const themeClasses = {
    light: "border-gray-300",
    dark: "border-gray-700",
    astronomy: "border-gradient-to-r from-purple-900 via-blue-900 to-black",
    eyeCare: "border-green-300",
    ocean: "border-blue-300",
    sunset: "border-orange-300",
  };

  const handleClick = (e) => {
    const ripple = document.createElement("span");
    const diameter = Math.max(
      e.currentTarget.clientWidth,
      e.currentTarget.clientHeight
    );
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - e.currentTarget.offsetLeft - radius}px`;
    ripple.style.top = `${e.clientY - e.currentTarget.offsetTop - radius}px`;
    ripple.classList.add("ripple");
    const rippleContainer = e.currentTarget.querySelector(".ripple-container");
    rippleContainer.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <div
      id={`avatar-${alt}`}
      className={`relative w-${size} h-${size} group flex items-center justify-center cursor-pointer`}
      title={tooltip}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      onClick={handleClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>{" "}
          {/* Loading Spinner */}
        </div>
      )}
      {isVisible && (
        <img
          src={isError ? fallbackSrc : src}
          alt={alt}
          onError={handleError}
          className={`${shapeClass} w-${size} h-${size} object-cover transition-transform duration-300 ease-in-out group-hover:${animation}`}
        />
      )}
      <div
        className={`absolute inset-0 ${shapeClass} border-${borderWidth} border-${borderColor} group-hover:border-neon transition-all duration-300 ease-in-out ${themeClasses[theme]}`}
      ></div>
      {showStatus && (
        <span
          className={`absolute ${statusPositionClasses[statusPosition]} block w-3 h-3 bg-${statusColor}-500 border-${borderWidth} border-white ${shapeClass}`}
        ></span>
      )}
      {showBadge && (
        <span
          className={`absolute ${badgePositionClasses[badgePosition]} flex items-center justify-center ${badgeSizeClasses[badgeSize]} bg-${badgeColor}-500 border-${badgeBorderWidth} border-${badgeBorderColor} ${badgeShapeClass}`}
        >
          {badgeContent}
        </span>
      )}
      <div className="ripple-container absolute inset-0 overflow-hidden rounded-full"></div>
      <style jsx>{`
        @media (max-width: 768px) {
          .w-${size} {
            width: ${size / 2}px;
          }
          .h-${size} {
            height: ${size / 2}px;
          }
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 600ms linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Avatar;
