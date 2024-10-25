// src/components/Icon.js
import React from "react";
import { IconContext } from "react-icons";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Icon = ({
  icon: IconComponent,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onKeyDown,
  onDoubleClick,
  onAnimationEnd,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  size = "lg", // 新增属性
  color = "", // 新增属性
  ariaLabel = "图标", // 新增属性
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
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onDoubleClick={onDoubleClick}
      onAnimationEnd={onAnimationEnd}
      title={tooltip}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <IconContext.Provider value={{ size, color }}>
        <IconComponent />
      </IconContext.Provider>
    </div>
  );
};

export default Icon;