// src/components/Tag.js
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Tag = ({
  children,
  onClick,
  removable,
  onRemove,
  disabled = false,
  size = "medium",
  onHover,
  onFocus,
  onBlur,
  color = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
  icon = null,
  tooltip = "",
  border = "border-none",
  rounded = "rounded-full",
  theme, // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition duration-300 transform hover:scale-105", // 新增属性
  fullscreen = false, // 新增属性
  draggable = false, // 新增属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-1.5",
    large: "text-md px-4 py-2",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  const handleDragStart = (e) => {
    if (draggable) {
      const rect = e.target.getBoundingClientRect();
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        })
      );
    }
  };

  const handleDrop = (e) => {
    if (draggable) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      e.target.style.left = `${e.clientX - data.offsetX}px`;
      e.target.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  return (
    <span
      className={`inline-flex items-center ${color} text-white font-bold ${rounded} cursor-pointer ${animation} ${
        sizeClasses[size]
      } ${disabled ? "cursor-not-allowed opacity-50" : ""} ${border} ${
        themeClasses[theme || currentTheme]
      } border-${borderWidth} ${fullscreen ? "w-full h-full" : ""}`}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
      title={tooltip}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {removable && !disabled && (
        <button
          className="ml-2 text-white hover:text-red-400 transition duration-300"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the tag onClick
            onRemove();
          }}
          aria-label="Remove tag"
        >
          <AiOutlineClose />
        </button>
      )}
    </span>
  );
};

export default Tag;
