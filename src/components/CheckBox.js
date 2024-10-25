// src/components/CheckBox.js
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const CheckBox = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "medium",
  onHover,
  onFocus,
  onBlur,
  onToggle,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  customClass = "",
  customLabelClass = "",
  customBoxClass = "",
  customIconClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconPosition = "right",
  ariaLabel = "Checkbox",
  indeterminate = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event) => {
    if (disabled) return;
    setIsChecked(event.target.checked);
    onChange(event);
    if (onToggle) {
      onToggle(event.target.checked);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      handleChange({ target: { checked: !isChecked } });
    }
    if (onKeyDown) onKeyDown(event);
  };

  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
  };

  const themeClasses = {
    light: "border-gray-300 bg-white text-gray-900",
    dark: "border-gray-700 bg-gray-900 text-white",
    astronomy:
      "border-purple-500 bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "border-green-300 bg-green-100 text-green-900",
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      onAnimationEnd={onAnimationEnd}
      title={tooltip}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
        disabled={disabled}
        aria-checked={isChecked}
        aria-label={label ? label : ariaLabel}
      />
      <div
        className={`relative flex items-center justify-center ${
          sizeClasses[size]
        } border-${borderWidth} ${
          isChecked
            ? `border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500`
            : `${themeClasses[theme || currentTheme]}`
        } rounded-md ${animation} ${
          isChecked ? "scale-105 shadow-neon" : ""
        } ${customBoxClass}`}
      >
        {isChecked && !indeterminate && (
          <svg
            className={`h-3 w-3 text-white ${customIconClass}`}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M6 10l2 2 6-6-1.5-1.5L8 10z" />
          </svg>
        )}
        {indeterminate && (
          <svg
            className={`h-3 w-3 text-white ${customIconClass}`}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <rect x="4" y="9" width="12" height="2" />
          </svg>
        )}
      </div>
      {label && (
        <span className={`ml-2 text-gray-200 ${customLabelClass}`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckBox;
