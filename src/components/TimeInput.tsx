// src/components/TimeInput.tsx
import React, { useState, ChangeEvent, FocusEvent, MouseEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface TimeInputProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onHover?: (event: MouseEvent<HTMLInputElement>) => void;
  customClass?: string;
  customLabelClass?: string;
  customInputClass?: string;
  minTime?: string;
  maxTime?: string;
  defaultValue?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
  showLabels?: boolean;
  labelColor?: string;
  labelActiveColor?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({
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
  theme,
  tooltip = "",
  borderWidth = "2",
  icon = <AiOutlineClose />,
  fullscreen = false,
  hoverColor = "",
  activeColor = "",
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
  showLabels = true,
  labelColor = "text-gray-200",
  labelActiveColor = "text-white",
}) => {
  const [error, setError] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>(value || defaultValue);
  const { theme: currentTheme } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
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

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
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

  return (
    <div
      className={`mb-4 ${customClass} ${fullscreen ? "w-full h-full" : ""} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
    >
      {label && (
        <label
          className={`block mb-1 ${customLabelClass} ${
            timeValue ? labelActiveColor : labelColor
          }`}
        >
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
          className={`p-2 border-${borderWidth} rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-purple-500 transition duration-300 ease-in-out transform ${hoverAnimation} ${
            disabled ? disabledColor : ""
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