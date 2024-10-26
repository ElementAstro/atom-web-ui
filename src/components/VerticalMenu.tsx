// src/components/VerticalMenu.tsx
import React, { useState, DragEvent } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
}

interface VerticalMenuProps {
  items: MenuItem[];
  activeIndex: number;
  onItemSelect: (index: number | string) => void;
  onItemHover?: (index: number) => void;
  onItemFocus?: (index: number) => void;
  onItemBlur?: (index: number) => void;
  customClass?: string;
  customItemClass?: string;
  customActiveItemClass?: string;
  customIconClass?: string;
  multiSelect?: boolean;
  draggable?: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  animation?: string;
  fullscreen?: boolean;
  collapsible?: boolean;
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({
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
  theme,
  tooltip = "",
  animation = "transition duration-300 transform hover:scale-105",
  fullscreen = false,
  collapsible = false,
}) => {
  const [selectedIndices, setSelectedIndices] = useState<(number | string)[]>(
    multiSelect ? [] : [activeIndex]
  );
  const [collapsedIndices, setCollapsedIndices] = useState<number[]>([]);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleItemClick = (index: number | string) => {
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

  const handleDragStart = (e: DragEvent<HTMLLIElement>, index: number) => {
    if (draggable) {
      e.dataTransfer.setData("text/plain", index.toString());
    }
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>, index: number) => {
    if (draggable) {
      const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      // 这里修复类型错误，确保 onItemSelect 的参数类型正确
      onItemSelect(index);
    }
  };

  const handleCollapseToggle = (index: number) => {
    setCollapsedIndices((prevCollapsed) =>
      prevCollapsed.includes(index)
        ? prevCollapsed.filter((i) => i !== index)
        : [...prevCollapsed, index]
    );
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <ul
      className={`flex flex-col space-y-2 p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-neon ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]}`}
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
