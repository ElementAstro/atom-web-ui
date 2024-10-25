// src/components/Rating.js
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Rating = ({
  max = 5,
  onRate,
  onHover,
  onLeave,
  disabled = false,
  size = "medium",
  label,
  onFocus,
  onBlur,
  allowHalf = false, // 新增半星评分功能
  clearable = false, // 新增清除评分功能
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = "★", // 新增属性
  fullscreen = false, // 新增属性
  border = false, // 新增边框可选功能
  borderColor = "border-gray-300", // 新增边框颜色选项
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleRate = (rate) => {
    if (disabled) return;
    setRating(rate);
    if (onRate) {
      onRate(rate);
    }
  };

  const handleMouseEnter = (rate) => {
    if (disabled) return;
    setHoverRating(rate);
    if (onHover) {
      onHover(rate);
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverRating(0);
    if (onLeave) {
      onLeave();
    }
  };

  const handleClear = () => {
    setRating(0);
    if (onRate) {
      onRate(0);
    }
  };

  const sizeClasses = {
    small: "text-xl w-8 h-8",
    medium: "text-3xl w-12 h-12",
    large: "text-5xl w-16 h-16",
  };

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
  };

  return (
    <div
      className={`flex flex-col items-center p-4 md:p-6 lg:p-8 ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[theme || currentTheme]}`}
    >
      {label && <span className="mb-2 text-gray-200">{label}</span>}
      <div
        className="flex space-x-1"
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
        role="radiogroup"
        aria-disabled={disabled}
      >
        {[...Array(max)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleRate(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer ${
              sizeClasses[size]
            } transition duration-300 transform ${animation} ${
              index < (hoverRating || rating)
                ? "text-yellow-500 scale-110"
                : "text-gray-300"
            } hover:scale-125 hover:text-blue-500 hover:shadow-neon ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            } ${border ? `border ${borderColor} border-${borderWidth}` : ""}`}
            role="radio"
            aria-checked={index < rating}
            title={tooltip}
          >
            {icon}
          </span>
        ))}
        {allowHalf &&
          [...Array(max)].map((_, index) => (
            <span
              key={`half-${index}`}
              onClick={() => handleRate(index + 0.5)}
              onMouseEnter={() => handleMouseEnter(index + 0.5)}
              onMouseLeave={handleMouseLeave}
              className={`cursor-pointer ${
                sizeClasses[size]
              } transition duration-300 transform ${animation} ${
                index + 0.5 <= (hoverRating || rating)
                  ? "text-yellow-500 scale-110"
                  : "text-gray-300"
              } hover:scale-125 hover:text-blue-500 hover:shadow-neon ${
                disabled ? "cursor-not-allowed opacity-50" : ""
              } ${border ? `border ${borderColor} border-${borderWidth}` : ""}`}
              role="radio"
              aria-checked={index + 0.5 <= rating}
              title={tooltip}
            >
              {icon}
            </span>
          ))}
      </div>
      {clearable && (
        <button
          onClick={handleClear}
          className="mt-2 text-red-500 hover:text-red-700 transition duration-300"
          title={tooltip}
        >
          <AiOutlineClose />
        </button>
      )}
    </div>
  );
};

export default Rating;
