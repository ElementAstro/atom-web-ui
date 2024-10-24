// src/components/Dropdown.js
import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, label, onOptionSelect, onDropdownToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (onDropdownToggle) {
      onDropdownToggle(isOpen);
    }
  }, [isOpen, onDropdownToggle]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border rounded-lg p-2 w-full text-left bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:bg-gradient-to-l transition duration-300 flex justify-between items-center shadow-lg hover:shadow-neon"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selected}</span>
        <span
          className={`ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 bg-gray-900 border border-gray-700 rounded-lg mt-1 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-black rounded-t-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="搜索选项"
          />
          <ul className="max-h-60 overflow-y-auto" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => selectOption(option)}
                  className={`px-4 py-2 hover:bg-blue-600 text-white cursor-pointer transition-colors duration-150 ${
                    selected === option ? "bg-blue-500" : ""
                  }`}
                  role="option"
                  aria-selected={selected === option}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">没有找到选项</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
