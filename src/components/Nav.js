import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Navs = ({
  items,
  onNavClick,
  onHover,
  onFocus,
  onBlur,
  customClass = "",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  iconPosition = "left", // 新增属性
  multiSelect = false, // 新增属性
}) => {
  const [selectedIndices, setSelectedIndices] = useState(
    multiSelect ? [] : [items.findIndex((item) => item.selected)]
  );
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleNavClick = (index) => {
    if (multiSelect) {
      setSelectedIndices((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index)
          : [...prevSelected, index]
      );
    } else {
      setSelectedIndices([index]);
    }
    onNavClick(items[index].value);
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`bg-gray-800 rounded-md shadow-md p-4 ${customClass} ${
        themeClasses[theme || currentTheme]
      }`}
    >
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleNavClick(index)}
              onMouseEnter={() => onHover && onHover(item.value)}
              onFocus={() => onFocus && onFocus(item.value)}
              onBlur={() => onBlur && onBlur(item.value)}
              className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition duration-200 transform hover:scale-105 hover:shadow-neon focus:outline-none border-${borderWidth} ${animation} ${
                selectedIndices.includes(index) ? "bg-blue-500 text-white" : ""
              }`}
              disabled={item.disabled}
              aria-disabled={item.disabled}
              title={tooltip}
            >
              {icon && iconPosition === "left" && (
                <span className="mr-2">{icon}</span>
              )}
              {item.label}
              {icon && iconPosition === "right" && (
                <span className="ml-2">{icon}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navs;
