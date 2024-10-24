import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight, AiOutlineClose } from "react-icons/ai";

const CollapseButtonGroup = ({
  mainLabel,
  buttons,
  onButtonClick,
  onToggle,
  onButtonHover,
  onButtonFocus,
  onButtonBlur,
  direction = "vertical", // 新增属性，默认值为 vertical
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (onToggle) onToggle(!isOpen);
  };

  const isVertical = direction === "vertical";

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className={`w-12 h-12 flex justify-center items-center p-3 rounded-full text-white bg-gradient-to-r from-purple-500 to-red-500 focus:outline-none transition duration-200 ${
          isOpen ? "shadow-lg hover:shadow-neon" : ""
        }`}
        title={mainLabel}
      >
        <span>{isOpen ? <AiOutlineClose /> : <AiOutlineRight />}</span>
      </button>
      <div
        className={`mt-2 flex ${
          isVertical ? "flex-col space-y-1" : "flex-row space-x-1"
        } transition-all duration-500 ease-in-out transform ${
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
            className={`flex justify-between items-center p-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none transition duration-200`}
            title={btn.tooltip}
            disabled={btn.disabled}
          >
            {btn.label}
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
    </div>
  );
};

export default CollapseButtonGroup;
