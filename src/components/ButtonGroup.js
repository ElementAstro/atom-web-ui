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
  };

  return (
    <div className={`flex ${orientationClasses[orientation]} ${className}`}>
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={() => !btn.disabled && !disabled && onButtonClick(btn.value)} // 禁用按钮时不触发点击事件
          className={`flex items-center justify-center rounded-md focus:outline-none ${animation} ${
            sizeClasses[size]
          } ${
            btn.active
              ? variantClasses[variant]
              : "bg-gray-700 hover:bg-gray-600"
          } ${
            btn.disabled || disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${themeClasses[theme]} border-${borderWidth}`}
          title={tooltip}
          disabled={btn.disabled || disabled} // 使用禁用状态
        >
          {btn.loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
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
          ) : (
            btn.icon && (
              <span
                className={`mr-2 ${
                  iconPosition === "right" ? "order-last" : ""
                }`}
              >
                {btn.icon}
              </span>
            )
          )}
          {btn.label}
        </button>
      ))}
      <style jsx>{`
        @media (max-width: 768px) {
          .p-1 {
            padding: 0.25rem;
          }
          .p-2 {
            padding: 0.5rem;
          }
          .p-3 {
            padding: 0.75rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .text-md {
            font-size: 1rem;
          }
          .text-lg {
            font-size: 1.125rem;
          }
          .space-y-2 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
          }
          .space-x-2 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.5rem * var(--tw-space-x-reverse));
            margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
          }
        }
      `}</style>
    </div>
  );
};

export default ButtonGroup;
