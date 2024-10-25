// src/components/Button.js
import React, { useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
  onHover,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onAnimationEnd,
  ripple = false,
  icon = null,
  tooltip = "",
  fullWidth = false,
  outline = false,
  gradient = false,
  ariaLabel = "",
}) => {
  const buttonRef = useRef(null);
  const { theme } = useTheme(); // 获取当前主题

  const baseStyle =
    "px-4 py-2 rounded focus:outline-none transition duration-300 ease-in-out transform";

  const themeClasses = {
    light: {
      primary: "bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-800",
      secondary: "bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-500",
      alert: "bg-red-500 text-white hover:bg-red-700 active:bg-red-800",
      success: "bg-green-500 text-white hover:bg-green-700 active:bg-green-800",
    },
    dark: {
      primary: "bg-blue-700 text-white hover:bg-blue-500 active:bg-blue-400",
      secondary: "bg-gray-500 text-white hover:bg-gray-400 active:bg-gray-300",
      alert: "bg-red-700 text-white hover:bg-red-500 active:bg-red-400",
      success: "bg-green-700 text-white hover:bg-green-500 active:bg-green-400",
    },
    astronomy: {
      primary:
        "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
      secondary:
        "bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white",
      alert: "bg-gradient-to-r from-red-900 via-pink-900 to-black text-white",
      success:
        "bg-gradient-to-r from-green-900 via-teal-900 to-black text-white",
    },
    eyeCare: {
      primary:
        "bg-green-500 text-green-900 hover:bg-green-700 active:bg-green-800",
      secondary:
        "bg-green-300 text-green-900 hover:bg-green-400 active:bg-green-500",
      alert: "bg-red-500 text-green-900 hover:bg-red-700 active:bg-red-800",
      success:
        "bg-green-700 text-green-900 hover:bg-green-500 active:bg-green-400",
    },
  };

  const variantStyle = outline
    ? `border ${themeClasses[theme][variant]}`
    : themeClasses[theme][variant];

  const sizeStyle =
    size === "small"
      ? "text-xs px-2 py-1"
      : size === "large"
      ? "text-lg px-6 py-3"
      : "text-md px-4 py-2"; // 默认大小

  const disabledStyle = "opacity-50 cursor-not-allowed"; // 禁用样式
  const loadingStyle = "cursor-wait";

  const sciFiStyle =
    "hover:shadow-neon hover:scale-105 focus:ring-2 focus:ring-purple-600";

  const fullWidthStyle = fullWidth ? "w-full" : "";

  const gradientStyle = gradient
    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
    : "";

  const handleRipple = (event) => {
    if (!ripple) return;

    const button = buttonRef.current;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const rippleEffect = button.getElementsByClassName("ripple")[0];

    if (rippleEffect) {
      rippleEffect.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${sciFiStyle} ${fullWidthStyle} ${gradientStyle} ${
        disabled ? disabledStyle : ""
      } ${isLoading ? loadingStyle : ""}`}
      onClick={!disabled && !isLoading ? onClick : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      onMouseDown={handleRipple}
      disabled={disabled || isLoading} // 禁用按钮或加载时禁用
      title={tooltip}
      aria-label={ariaLabel}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12c0-4.418 1.791-8.365 4.688-11.264l5.688 5.688C9.472 6.112 7.314 9.836 8 12h-4z"
            />
          </svg>
          Loading...
        </div>
      ) : (
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
};

export default Button;
