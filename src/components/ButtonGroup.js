// src/components/ButtonGroup.js
import React from "react";
import { useTheme } from "../context/ThemeContext";

const ButtonGroup = ({
  buttons,
  orientation = "horizontal",
  onButtonClick,
  size = "medium",
  disabled = false,
  variant = "primary",
  className = "",
  tooltip = "",
  borderWidth = "2",
  iconPosition = "left",
  animation = "transform transition-transform duration-200 ease-in-out",
  onHover,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onAnimationEnd,
  ariaLabel = "",
}) => {
  const { theme } = useTheme(); // 获取当前主题

  const sizeClasses = {
    small: "p-1 text-sm",
    medium: "p-2 text-md",
    large: "p-3 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon",
    secondary: "bg-gray-700 hover:bg-gray-600",
    alert: "bg-red-500 text-white hover:bg-red-700 active:bg-red-800",
    success: "bg-green-500 text-white hover:bg-green-700 active:bg-green-800",
  };

  const orientationClasses = {
    horizontal: "flex-row space-x-2",
    vertical: "flex-col space-y-2",
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

  return (
    <div
      className={`flex ${orientationClasses[orientation]} ${className} ${themeClasses[theme]}`}
      aria-label={ariaLabel}
    >
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={() => !btn.disabled && !disabled && onButtonClick(btn.value)} // 禁用按钮时不触发点击事件
          className={`flex items-center justify-center rounded-md focus:outline-none ${animation} ${
            sizeClasses[size]
          } ${variantClasses[variant]} ${
            btn.disabled || disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onAnimationEnd={onAnimationEnd}
          title={tooltip}
          aria-label={btn.label}
        >
          {iconPosition === "left" && btn.icon && (
            <span className="mr-2">{btn.icon}</span>
          )}
          {btn.label}
          {iconPosition === "right" && btn.icon && (
            <span className="ml-2">{btn.icon}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
