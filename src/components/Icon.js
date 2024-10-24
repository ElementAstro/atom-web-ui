// src/components/Icon.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Icon = ({
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  size = "lg", // 新增属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const themeClasses = {
    light: "text-gray-900 border-gray-300",
    dark: "text-white border-gray-700",
    astronomy: "text-white border-purple-500",
    eyeCare: "text-green-900 border-green-300",
  };

  return (
    <div
      className={`inline-block ${animation} hover:scale-125 hover:rotate-12 hover:shadow-neon border-${borderWidth} ${
        themeClasses[theme || currentTheme]
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={tooltip}
    >
      <FontAwesomeIcon icon={icon} className={`text-${size}`} />
    </div>
  );
};

export default Icon;
