// src/components/SearchBox.js
import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const SearchBox = ({
  placeholder,
  onSearch,
  onFocus,
  onBlur,
  customClass = "",
  customInputClass = "",
  customIconClass = "",
  suggestions = [],
  historyKey = "searchHistory",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  iconPosition = "left", // 新增属性
  clearable = true, // 新增属性
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    const history = localStorage.getItem(historyKey);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, [historyKey]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    setFilteredSuggestions([]);
    updateSearchHistory(suggestion);
  };

  const updateSearchHistory = (query) => {
    const updatedHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
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
      className={`relative ${customClass} ${
        themeClasses[theme || currentTheme]
      }`}
    >
      {iconPosition === "left" && (
        <AiOutlineSearch
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
            isFocused ? "text-blue-500 scale-110" : "text-gray-400"
          } ${customIconClass}`}
          title={tooltip}
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`border-${borderWidth} rounded-lg p-2 ${
          iconPosition === "left" ? "pl-10" : "pr-10"
        } w-full transition duration-300 transform ${
          isFocused
            ? "border-blue-500 ring-2 ring-blue-500 scale-105 shadow-neon"
            : "border-gray-300"
        } bg-gray-800 text-white focus:outline-none ${customInputClass}`}
      />
      {iconPosition === "right" && (
        <AiOutlineSearch
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
            isFocused ? "text-blue-500 scale-110" : "text-gray-400"
          } ${customIconClass}`}
          title={tooltip}
        />
      )}
      {clearable && inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-300"
        >
          <AiOutlineClose />
        </button>
      )}
      {filteredSuggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-700"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {searchHistory.length > 0 && !inputValue && (
        <ul className="absolute left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
          {searchHistory.map((historyItem, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(historyItem)}
              className="p-2 cursor-pointer hover:bg-gray-700"
            >
              {historyItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
