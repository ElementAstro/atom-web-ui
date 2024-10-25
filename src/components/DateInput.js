import React, { useState } from "react";
import { AiOutlineClose, AiOutlineCalendar } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  ariaLabel = "日期输入",
}) => {
  const [error, setError] = useState("");
  const [dateValue, setDateValue] = useState(value || defaultValue);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleChange = (date) => {
    const newValue = date ? date.toISOString().split("T")[0] : "";
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
  };

  const handleClear = () => {
    setDateValue("");
    onChange("");
  };

  const handleToggleDatePicker = () => {
    setDatePickerOpen(!isDatePickerOpen);
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
          type="text"
          value={dateValue}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={onHover}
          onChange={(e) => handleChange(new Date(e.target.value))}
          disabled={disabled}
          className={`p-2 border-${borderWidth} rounded ${
            themeClasses[theme || currentTheme]
          } focus:outline-none focus:ring focus:ring-purple-500 ${animation} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${customInputClass}`}
          min={minDate}
          max={maxDate}
          title={tooltip}
          aria-label={ariaLabel}
        />
        <button
          type="button"
          onClick={handleToggleDatePicker}
          className={`absolute ${
            iconPosition === "right" ? "right-2" : "left-2"
          } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition duration-300`}
        >
          <AiOutlineCalendar />
        </button>
        {dateValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${
              iconPosition === "right" ? "right-8" : "left-8"
            } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-300`}
          >
            <AiOutlineClose />
          </button>
        )}
        {isDatePickerOpen && (
          <DatePicker
            selected={dateValue ? new Date(dateValue) : null}
            onChange={handleChange}
            inline
            minDate={minDate ? new Date(minDate) : null}
            maxDate={maxDate ? new Date(maxDate) : null}
            excludeDates={disabledDates.map((date) => new Date(date))}
            className="absolute z-10 mt-2"
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <style jsx>{`
        @media (max-width: 768px) {
          .p-2 {
            padding: 0.5rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .mt-1 {
            margin-top: 0.25rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DateInput;
