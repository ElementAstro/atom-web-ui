// src/components/ListGroup.js
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const ListGroup = ({
  items,
  onItemClick,
  onItemHover,
  variant = "primary",
  customClass = "",
  icon = null,
  disabled = false,
  tooltip = "",
  selected = null,
  size = "medium",
  theme, // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  iconPosition = "left", // 新增属性
  multiSelect = false, // 新增属性
}) => {
  const [selectedIndices, setSelectedIndices] = useState(
    multiSelect ? [] : [selected]
  );
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleItemClick = (index) => {
    if (multiSelect) {
      setSelectedIndices((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedIndices([index]);
    }
    onItemClick && onItemClick(items[index]);
  };

  const variantClasses = {
    primary: "bg-gray-800 text-white",
    secondary: "bg-gray-700 text-gray-300",
    alert: "bg-red-700 text-white",
    success: "bg-green-700 text-white",
  };

  const sizeClasses = {
    small: "text-sm px-2 py-1",
    medium: "text-md px-4 py-2",
    large: "text-lg px-6 py-3",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <ul
      className={`rounded-md shadow-md ${
        variantClasses[variant]
      } ${customClass} ${themeClasses[theme || currentTheme]}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex items-center ${
            sizeClasses[size]
          } border-${borderWidth} border-gray-600 last:border-b-0 transition-colors duration-200 transform ${animation} ${
            selectedIndices.includes(index)
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-700 hover:scale-105 hover:shadow-neon"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={() => !disabled && handleItemClick(index)}
          onMouseEnter={() => !disabled && onItemHover && onItemHover(item)}
          role="button"
          aria-label={`List item ${index + 1}`}
          title={tooltip}
        >
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}
          {item}
          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
        </li>
      ))}
      <style jsx>{`
        @media (max-width: 640px) {
          li {
            padding: 0.5rem 1rem;
          }
        }
        @media (min-width: 640px) {
          li {
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
    </ul>
  );
};

export default ListGroup;
