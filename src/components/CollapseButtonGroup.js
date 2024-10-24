import React, { useState } from "react";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

const CollapseButtonGroup = ({
  mainLabel,
  buttons,
  onButtonClick,
  onToggle,
  onButtonHover,
  onButtonFocus,
  onButtonBlur,
  direction = "vertical",
  disabled = false,
  icon,
  showLabels = true,
  buttonSize = "12",
  buttonColor = "bg-gradient-to-r from-purple-500 to-red-500",
  theme, 
  tooltip = "", 
  borderWidth = "2", 
  animation = "transform transition-transform duration-300 ease-in-out", 
  iconPosition = "left", 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (onToggle) onToggle(!isOpen);
  };

  const isVertical = direction === "vertical";

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className={`w-${buttonSize} h-${buttonSize} flex justify-center items-center p-3 rounded-full text-white ${buttonColor} focus:outline-none transition duration-200 ${
          isOpen ? "shadow-lg hover:shadow-neon" : ""
        } ${themeClasses[theme || currentTheme]} border-${borderWidth}`}
        title={tooltip || mainLabel}
        disabled={disabled}
      >
        <span>
          {icon ? icon : isOpen ? <AiOutlineClose /> : <AiOutlineRight />}
        </span>
      </button>
      <div
        className={`mt-2 flex ${
          isVertical ? "flex-col space-y-1" : "flex-row space-x-1"
        } transition-all duration-500 ease-in-out transform ${animation} ${
          isOpen
            ? isVertical
              ? "max-h-screen opacity-100"
              : "max-w-screen opacity-100"
            : isVertical
            ? "max-h-0 opacity-0"
            : "max-w-0 opacity-0"
        } overflow-hidden`}
      >
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(btn.value)}
            onMouseEnter={() => onButtonHover && onButtonHover(btn.value)}
            onFocus={() => onButtonFocus && onButtonFocus(btn.value)}
            onBlur={() => onButtonBlur && onButtonBlur(btn.value)}
            className={`flex justify-between items-center p-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none transition duration-200 ${
              themeClasses[theme || currentTheme]
            } border-${borderWidth}`}
            title={btn.tooltip}
            disabled={btn.disabled}
          >
            {iconPosition === "left" && btn.icon && (
              <span className="mr-2">{btn.icon}</span>
            )}
            {showLabels && btn.label}
            {iconPosition === "right" && btn.icon && (
              <span className="ml-2">{btn.icon}</span>
            )}
            {btn.loading && (
              <svg
                className="animate-spin h-5 w-5 ml-2 text-white"
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
            )}
          </button>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .w-${buttonSize} {
            width: ${buttonSize / 2}rem;
          }
          .h-${buttonSize} {
            height: ${buttonSize / 2}rem;
          }
          .p-3 {
            padding: 0.75rem;
          }
          .mt-2 {
            margin-top: 0.5rem;
          }
          .space-y-1 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
          }
          .space-x-1 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.25rem * var(--tw-space-x-reverse));
            margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
          }
        }
      `}</style>
    </div>
  );
};

export default CollapseButtonGroup;
