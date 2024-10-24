import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const TimeInput = ({
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
  minTime = "00:00",
  maxTime = "23:59",
  defaultValue = "",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = <AiOutlineClose />, // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const [error, setError] = useState("");
  const [timeValue, setTimeValue] = useState(value || defaultValue);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleChange = (e) => {
    const newValue = e.target.value;
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // 24小时制时间格式检查
    if (timePattern.test(newValue)) {
      if (newValue >= minTime && newValue <= maxTime) {
        setError("");
        setTimeValue(newValue);
        onChange(newValue);
      } else {
        setError(`请输入 ${minTime} 到 ${maxTime} 之间的时间`);
      }
    } else {
      setError("请输入有效的时间格式 (HH:MM)");
    }
  };

  const handleClear = () => {
    setTimeValue("");
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
    <div
      className={`mb-4 ${customClass} ${fullscreen ? "w-full h-full" : ""} ${
        themeClasses[theme || currentTheme]
      }`}
    >
      {label && (
        <label className={`block text-gray-200 mb-1 ${customLabelClass}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="time"
          value={timeValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={onHover}
          disabled={disabled}
          className={`p-2 border-${borderWidth} rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${customInputClass}`}
          min={minTime}
          max={maxTime}
        />
        {timeValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-300"
            title={tooltip}
          >
            {icon}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TimeInput;
