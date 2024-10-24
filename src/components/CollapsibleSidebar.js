// src/components/CollapsibleSidebar.js
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const CollapsibleSidebar = ({
  items,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition-all duration-300 ease-in-out", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
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
      className={`flex ${animation} ${isOpen ? "w-64" : "w-16"} h-full ${
        themeClasses[theme || currentTheme]
      } ${fullscreen ? "w-full h-full" : ""} border-${borderWidth}`}
    >
      <div
        className={`flex flex-col p-4 space-y-4 overflow-hidden ${animation} ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="hover:bg-gray-300 rounded p-2 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center w-16 bg-gray-300 rounded-l hover:bg-gray-400"
        title={tooltip}
      >
        {icon || (isOpen ? "◀" : "▶")}
      </button>
    </div>
  );
};

export default CollapsibleSidebar;
