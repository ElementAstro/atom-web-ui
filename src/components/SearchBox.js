// src/components/SearchBox.js
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBox = ({ placeholder, onSearch, onFocus, onBlur }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className="relative">
      <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`border rounded-lg p-2 pl-10 w-full bg-gray-800 text-white transition duration-300 transform ${
          isFocused
            ? "border-blue-500 ring-2 ring-blue-500 scale-105 shadow-neon"
            : "border-gray-300"
        } focus:outline-none`}
      />
    </div>
  );
};

export default SearchBox;
