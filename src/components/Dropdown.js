// src/components/Dropdown.js
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Dropdown = ({
  options,
  label,
  onOptionSelect,
  onDropdownToggle,
  multiSelect = false,
  customClass = "",
  customButtonClass = "",
  customInputClass = "",
  customOptionClass = "",
  customSelectedClass = "",
  theme, 
  tooltip = "", 
  borderWidth = "2", 
  animation = "transform transition-transform duration-300 ease-in-out", 
  iconPosition = "right", 
  disabled = false, 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(multiSelect ? [] : options[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (onDropdownToggle) {
      onDropdownToggle(isOpen);
    }
  }, [isOpen, onDropdownToggle]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    if (multiSelect) {
      setSelected((prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item !== option)
          : [...prevSelected, option]
      );
    } else {
      setSelected(option);
      setIsOpen(false);
    }
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  const clearSelection = () => {
    setSelected(multiSelect ? [] : options[0]);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (dropdownRef.current) {
      const maxWidth = Math.max(
        ...filteredOptions.map((option) => option.length)
      );
      dropdownRef.current.style.width = `${maxWidth + 4}ch`; // 根据最长选项调整宽度
    }
  }, [filteredOptions]);

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className={`relative ${customClass}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`border-${borderWidth} rounded-lg p-2 w-full text-left bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:bg-gradient-to-l transition duration-300 flex justify-between items-center shadow-lg hover:shadow-neon ${customButtonClass} ${
          themeClasses[theme || currentTheme]
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={tooltip}
        disabled={disabled}
      >
        <span>
          {multiSelect
            ? selected.length > 0
              ? selected.join(", ")
              : "请选择..."
            : selected}
        </span>
        <span
          className={`ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } ${iconPosition === "left" ? "order-first mr-2" : ""}`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          className={`absolute z-10 bg-gray-900 border border-gray-700 rounded-lg mt-1 shadow-lg ${animation}`}
        >
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`p-2 text-black rounded-t-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600 ${customInputClass}`}
            aria-label="搜索选项"
          />
          <ul className="max-h-60 overflow-y-auto" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => selectOption(option)}
                  className={`px-4 py-2 hover:bg-blue-600 text-white cursor-pointer transition-colors duration-150 ${
                    multiSelect
                      ? selected.includes(option)
                        ? "bg-blue-500"
                        : ""
                      : selected === option
                      ? "bg-blue-500"
                      : ""
                  } ${customOptionClass}`}
                  role="option"
                  aria-selected={
                    multiSelect
                      ? selected.includes(option)
                      : selected === option
                  }
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">没有找到选项</li>
            )}
          </ul>
          <button
            onClick={clearSelection}
            className="w-full text-left px-4 py-2 bg-red-500 text-white hover:bg-red-700 transition-colors duration-150 rounded-b-lg"
          >
            清除选项
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
