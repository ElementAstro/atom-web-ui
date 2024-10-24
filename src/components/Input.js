// src/components/Input.js
import React, { useState } from "react";

const Input = ({
  label,
  type = "text",
  required = false,
  errorMessage,
  onFocus,
  onBlur,
  onChange,
  customClass = "",
  customLabelClass = "",
  customInputClass = "",
  customErrorClass = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || "");

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className={`mb-4 ${customClass}`}>
      <label
        className={`block text-sm font-semibold mb-1 transition-all duration-300 ${
          isFocused ? "text-blue-400" : "text-gray-600"
        } ${customLabelClass}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={`border rounded-lg p-2 w-full transition duration-300
          ${
            isFocused
              ? "border-blue-400 ring-2 ring-blue-200"
              : "border-gray-400"
          }
          ${errorMessage ? "border-red-500" : ""}
          bg-gray-800 text-white
          focus:shadow-neon focus:scale-105 ${customInputClass}`}
        {...props}
      />
      {errorMessage && (
        <p
          className={`text-red-500 text-sm mt-1 animate-pulse ${customErrorClass}`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
