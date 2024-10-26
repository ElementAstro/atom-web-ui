// src/components/DateInput.tsx
import React, { useState, ChangeEvent, FocusEvent, MouseEvent } from "react";
import { AiOutlineClose, AiOutlineCalendar } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onHover?: (event: MouseEvent<HTMLInputElement>) => void;
  customClass?: string;
  customLabelClass?: string;
  customInputClass?: string;
  minDate?: string;
  maxDate?: string;
  defaultValue?: string;
  disabledDates?: string[];
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  iconPosition?: "left" | "right";
  ariaLabel?: string;
  showClearButton?: boolean;
  showCalendarIcon?: boolean;
  calendarIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  dateFormat?: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
  tabIndex?: number;
  autoComplete?: string;
  spellCheck?: boolean;
  maxLength?: number;
  pattern?: string;
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
}

const DateInput: React.FC<DateInputProps> = ({
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
  showClearButton = true,
  showCalendarIcon = true,
  calendarIcon = <AiOutlineCalendar />,
  clearIcon = <AiOutlineClose />,
  dateFormat = "yyyy-MM-dd",
  placeholder = "请选择日期",
  autoFocus = false,
  required = false,
  readOnly = false,
  name,
  id,
  tabIndex,
  autoComplete,
  spellCheck,
  maxLength,
  pattern,
  inputMode,
}) => {
  const [error, setError] = useState("");
  const [dateValue, setDateValue] = useState(value || defaultValue);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const { theme: currentTheme } = useTheme();

  const handleChange = (date: Date | null) => {
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

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(new Date(e.target.value))
          }
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
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          readOnly={readOnly}
          name={name}
          id={id}
          tabIndex={tabIndex}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
        />
        {showCalendarIcon && (
          <button
            type="button"
            onClick={handleToggleDatePicker}
            className={`absolute ${
              iconPosition === "right" ? "right-2" : "left-2"
            } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition duration-300`}
          >
            {calendarIcon}
          </button>
        )}
        {showClearButton && dateValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${
              iconPosition === "right" ? "right-8" : "left-8"
            } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-300`}
          >
            {clearIcon}
          </button>
        )}
        {isDatePickerOpen && (
          <DatePicker
            selected={dateValue ? new Date(dateValue) : undefined}
            onChange={handleChange}
            inline
            minDate={minDate ? new Date(minDate) : undefined}
            maxDate={maxDate ? new Date(maxDate) : undefined}
            excludeDates={disabledDates.map((date) => new Date(date))}
            className="absolute z-10 mt-2"
            dateFormat={dateFormat}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <style>{`
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
