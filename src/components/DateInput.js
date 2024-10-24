import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

const DateInput = ({
  value,
  onChange,
  label,
  disabled,
  onFocus,
  onBlur,
  onHover,
  customClass = "",
  customLabelClass = "",
  customInputClass = "",
  minDate,
  maxDate,
  defaultValue = "",
  disabledDates = [],
  theme, 
  tooltip = "", 
  borderWidth = "2", 
  animation = "transform transition-transform duration-300 ease-in-out", 
  iconPosition = "right", 
}) => {
  const [error, setError] = useState("");
  const [dateValue, setDateValue] = useState(value || defaultValue);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleChange = (e) => {
    const newValue = e.target.value;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // 日期格式检查 YYYY-MM-DD
    if (datePattern.test(newValue)) {
      if (
        (!minDate || newValue >= minDate) &&
        (!maxDate || newValue <= maxDate) &&
        !disabledDates.includes(newValue)
      ) {
        setError("");
        setDateValue(newValue);
        onChange(newValue);
      } else {
        setError(`请输入 ${minDate} 到 ${maxDate} 之间的有效日期`);
      }
    } else {
      setError("请输入有效的日期格式 (YYYY-MM-DD)");
    }
  };

  const handleClear = () => {
    setDateValue("");
    onChange("");
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className={`mb-4 ${customClass}`}>
      {label && (
        <label className={`block text-gray-200 mb-1 ${customLabelClass}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={dateValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={onHover}
          disabled={disabled}
          className={`p-2 border-${borderWidth} rounded ${
            themeClasses[theme || currentTheme]
          } focus:outline-none focus:ring focus:ring-purple-500 ${animation} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${customInputClass}`}
          min={minDate}
          max={maxDate}
          title={tooltip}
        />
        {dateValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${
              iconPosition === "right" ? "right-2" : "left-2"
            } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-300`}
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
