// src/components/Select.tsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  customStyles?: string;
  clearable?: boolean;
  loading?: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  multiple = false,
  searchable = false,
  placeholder = "",
  customStyles = "",
  clearable = false,
  loading = false,
  theme = "light",
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme } = useTheme();

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themeClasses = {
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

  const handleClear = () => {
    onChange(multiple ? [] : "");
  };

  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      if (Array.isArray(value) && value.includes(selectedValue)) {
        onChange(value.filter((val) => val !== selectedValue));
      } else {
        onChange([...(Array.isArray(value) ? value : []), selectedValue]);
      }
    } else {
      onChange(selectedValue);
      setIsOpen(false);
    }
  };

  const handleDelete = (deletedValue: string) => {
    if (Array.isArray(value)) {
      onChange(value.filter((val) => val !== deletedValue));
    }
  };

  return (
    <div
      className={`custom-select ${customStyles} ${
        themeClasses[theme || currentTheme]
      }`}
    >
      <div className="relative">
        <div
          className="w-full p-2 border border-gray-300 rounded cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {multiple ? (
            Array.isArray(value) && value.length > 0 ? (
              value.map((val, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-200 text-gray-800 rounded px-2 py-1 mr-2"
                >
                  {options.find((option) => option.value === val)?.label}
                  <button
                    type="button"
                    className="ml-1 text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(val);
                    }}
                  >
                    &times;
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )
          ) : (
            <span className="text-gray-800">
              {options.find((option) => option.value === value)?.label ||
                placeholder}
            </span>
          )}
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
            {searchable && (
              <input
                type="text"
                className="w-full p-2 border-b border-gray-300"
                placeholder="搜索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            <ul className="max-h-60 overflow-auto">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${
                    multiple &&
                    Array.isArray(value) &&
                    value.includes(option.value)
                      ? "bg-gray-100"
                      : ""
                  } ${hoverColor} ${activeColor} ${disabledColor} ${hoverAnimation}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(value) && value.includes(option.value)
                      }
                      onChange={() => handleSelect(option.value)}
                      className="mr-2"
                    />
                  )}
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
        {clearable && !multiple && value && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={handleClear}
          >
            &times;
          </button>
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-200">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12c0-4.418 1.791-8.365 4.688-11.264l5.688 5.688C9.472 6.112 7.314 9.836 8 12h-4z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  searchable: PropTypes.bool,
  placeholder: PropTypes.string,
  customStyles: PropTypes.string,
  clearable: PropTypes.bool,
  loading: PropTypes.bool,
  theme: PropTypes.oneOf([
    "light",
    "dark",
    "astronomy",
    "eyeCare",
    "sunset",
    "ocean",
    "astronomyDarkRed",
  ]),
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  disabledColor: PropTypes.string,
  hoverAnimation: PropTypes.string,
};

export default Select;
