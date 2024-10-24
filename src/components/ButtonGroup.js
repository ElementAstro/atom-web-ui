// src/components/ButtonGroup.js
import React from "react";

const ButtonGroup = ({
  buttons,
  vertical = false,
  onButtonClick,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "p-1 text-sm",
    medium: "p-2 text-md",
    large: "p-3 text-lg",
  };

  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} ${
        vertical ? "space-y-2" : "space-x-2"
      }`}
    >
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={() => !btn.disabled && onButtonClick(btn.value)} // 禁用按钮时不触发点击事件
          className={`flex items-center justify-center rounded-md text-white focus:outline-none transition duration-200 transform hover:scale-105 ${
            sizeClasses[size]
          } ${
            btn.active
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon"
              : "bg-gray-700 hover:bg-gray-600"
          } ${btn.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          title={btn.tooltip}
          disabled={btn.disabled} // 使用禁用状态
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
            btn.icon && <span className="mr-2">{btn.icon}</span>
          )}
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
