// src/components/Menu.js
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Menu = ({
  items,
  onOpen,
  onClose,
  onItemClick,
  responsive = true,
  position = "bottom",
  icon = null,
  disabled = false,
  animation = "scale-105",
  closeOnClickOutside = true,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  iconPosition = "left", // 新增属性
  fullWidth = false, // 新增属性
  multiSelect = false, // 新增属性
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const menuRef = useRef(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const toggleMenu = () => {
    if (disabled) return;
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState && onOpen) onOpen();
      if (!newState && onClose) onClose();
      return newState;
    });
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    if (closeOnClickOutside) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [closeOnClickOutside]);

  const handleItemClick = (item) => {
    if (multiSelect) {
      setSelectedItems((prevSelected) =>
        prevSelected.includes(item)
          ? prevSelected.filter((i) => i !== item)
          : [...prevSelected, item]
      );
    } else {
      setSelectedItems([item]);
      setIsOpen(false);
    }
    onItemClick && onItemClick(item);
  };

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-2 rounded-lg shadow-lg transition duration-300 transform hover:${animation} hover:shadow-neon ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${fullWidth ? "w-full" : ""} ${
          themeClasses[theme || currentTheme]
        } border-${borderWidth}`}
        disabled={disabled}
        title={tooltip}
      >
        {icon && iconPosition === "left" && (
          <span className="mr-2">{icon}</span>
        )}
        菜单
        {icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
      {isOpen && (
        <ul
          className={`absolute ${
            positionClasses[position]
          } bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:${animation} hover:shadow-neon ${
            responsive ? "w-full sm:w-auto" : ""
          }`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={`p-2 hover:bg-blue-500 transition duration-150 cursor-pointer ${
                selectedItems.includes(item) ? "bg-blue-500" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        @media (max-width: 640px) {
          .w-full {
            width: 100%;
          }
        }
        @media (min-width: 640px) {
          .sm\\:w-auto {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
