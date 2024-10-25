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
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Dropdown",
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`relative ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      {label && (
        <label className={`block text-gray-200 mb-1 ${customClass}`}>
          {label}
        </label>
      )}
      <button
        onClick={toggleDropdown}
        className={`w-full p-2 border-${borderWidth} rounded ${
          themeClasses[theme || currentTheme]
        } focus:outline-none focus:ring focus:ring-purple-500 ${animation} ${customButtonClass}`}
        disabled={disabled}
        title={tooltip}
      >
        {multiSelect
          ? selected.length > 0
            ? selected.join(", ")
            : "Select options"
          : selected}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            themeClasses[theme || currentTheme]
          } ${animation}`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className={`w-full p-2 border-${borderWidth} rounded-t ${
              themeClasses[theme || currentTheme]
            } focus:outline-none focus:ring focus:ring-purple-500 ${customInputClass}`}
            placeholder="Search..."
          />
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${customOptionClass} ${
                  selected.includes(option) ? customSelectedClass : ""
                }`}
                onClick={() => selectOption(option)}
                onMouseEnter={onHover}
              >
                <span
                  className={`block truncate ${
                    selected.includes(option) ? "font-semibold" : "font-normal"
                  }`}
                >
                  {option}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .p-2 {
            padding: 0.5rem;
          }
          .text-base {
            font-size: 1rem;
          }
          .leading-6 {
            line-height: 1.5rem;
          }
          .mt-2 {
            margin-top: 0.5rem;
          }
          .max-h-60 {
            max-height: 15rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
