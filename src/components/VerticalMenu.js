// src/components/VerticalMenu.js
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const VerticalMenu = ({
  items,
  activeIndex,
  onItemSelect,
  onItemHover,
  onItemFocus,
  onItemBlur,
  customClass = "",
  customItemClass = "",
  customActiveItemClass = "",
  customIconClass = "",
  multiSelect = false,
  draggable = false,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition duration-300 transform hover:scale-105", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
  collapsible = false, // 新增属性
}) => {
  const [selectedIndices, setSelectedIndices] = useState(
    multiSelect ? [] : [activeIndex]
  );
  const [collapsedIndices, setCollapsedIndices] = useState([]);
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
    onItemSelect(index);
  };

  const handleDragStart = (e, index) => {
    if (draggable) {
      e.dataTransfer.setData("text/plain", index);
    }
  };

  const handleDrop = (e, index) => {
    if (draggable) {
      const draggedIndex = e.dataTransfer.getData("text/plain");
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      onItemSelect(newItems);
    }
  };

  const handleCollapseToggle = (index) => {
    setCollapsedIndices((prevCollapsed) =>
      prevCollapsed.includes(index)
        ? prevCollapsed.filter((i) => i !== index)
        : [...prevCollapsed, index]
    );
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
      className={`flex flex-col space-y-2 p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-neon ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[theme || currentTheme]}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`p-2 rounded ${animation} 
          ${
            selectedIndices.includes(index)
              ? `bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-neon ${customActiveItemClass}`
              : `hover:bg-gray-700 hover:text-white ${customItemClass}`
          }`}
          draggable={draggable}
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onMouseEnter={() => onItemHover && onItemHover(index)}
          onFocus={() => onItemFocus && onItemFocus(index)}
          onBlur={() => onItemBlur && onItemBlur(index)}
          title={tooltip}
        >
          <button
            className="flex items-center text-blue-700 bg-transparent border-none p-0 m-0 cursor-pointer"
            onClick={() => handleItemClick(index)} // Handle item click
          >
            {item.icon && (
              <span className={`mr-2 ${customIconClass}`}>{item.icon}</span> // Include icon if present
            )}
            {item.label}
            {collapsible && item.subItems && (
              <span
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCollapseToggle(index);
                }}
              >
                {collapsedIndices.includes(index) ? "▲" : "▼"}
              </span>
            )}
          </button>
          {item.subItems && !collapsedIndices.includes(index) && (
            <ul className="ml-4 mt-2 space-y-2">
              {item.subItems.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className={`p-2 rounded ${animation} 
                  ${
                    selectedIndices.includes(`${index}-${subIndex}`)
                      ? `bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-neon ${customActiveItemClass}`
                      : `hover:bg-gray-700 hover:text-white ${customItemClass}`
                  }`}
                  onClick={() => handleItemClick(`${index}-${subIndex}`)}
                >
                  <button className="flex items-center text-blue-700 bg-transparent border-none p-0 m-0 cursor-pointer">
                    {subItem.icon && (
                      <span className={`mr-2 ${customIconClass}`}>
                        {subItem.icon}
                      </span>
                    )}
                    {subItem.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default VerticalMenu;
