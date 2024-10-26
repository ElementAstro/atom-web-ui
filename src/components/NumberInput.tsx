import React, { useState, useCallback } from "react";

interface NumberInputProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  disabled?: boolean;
  readOnly?: boolean;
  formatThousands?: boolean;
  onValueChange?: (value: number) => void;
  theme?:
    | "light"
    | "dark"
    | "ocean"
    | "sunset"
    | "astronomy"
    | "eyeCare"
    | "forest"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 0,
  disabled = false,
  readOnly = false,
  formatThousands = false,
  onValueChange,
  theme = "light",
  tooltip = "",
  borderWidth = "1",
  animation = "transition-transform duration-300 ease-in-out",
}) => {
  const [value, setValue] = useState<number>(initialValue);

  // Helper to format numbers with thousand separators
  const formatNumber = useCallback(
    (num: number) => {
      return formatThousands ? num.toLocaleString() : num.toString();
    },
    [formatThousands]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/,/g, "");
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue) || inputValue === "") {
      setValue(newValue);
      onValueChange?.(newValue);
    }
  };

  const increment = () => {
    if (!disabled && !readOnly) {
      const newValue = Math.min(max, value + step);
      setValue(newValue);
      onValueChange?.(newValue);
    }
  };

  const decrement = () => {
    if (!disabled && !readOnly) {
      const newValue = Math.max(min, value - step);
      setValue(newValue);
      onValueChange?.(newValue);
    }
  };

  const handleBlur = () => {
    // Clamp value within min and max on blur
    const clampedValue = Math.min(max, Math.max(min, value || 0));
    setValue(clampedValue);
    onValueChange?.(clampedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") increment();
    if (e.key === "ArrowDown") decrement();
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    ocean: "bg-blue-500 text-white border-blue-300",
    sunset: "bg-orange-500 text-white border-orange-300",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    forest: "bg-green-500 text-white border-green-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  return (
    <div className={`flex items-center space-x-2 ${animation}`} title={tooltip}>
      <button
        onClick={decrement}
        className={`px-3 py-1 ${
          themeClasses[theme]
        } hover:bg-gray-400 text-gray-700 font-semibold rounded-l-lg focus:outline-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled || value <= min}
        style={{ borderWidth }}
      >
        -
      </button>
      <input
        type="text"
        value={formatNumber(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-20 text-center py-1 ${
          themeClasses[theme]
        } border rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        style={{ borderWidth }}
      />
      <button
        onClick={increment}
        className={`px-3 py-1 ${
          themeClasses[theme]
        } hover:bg-gray-400 text-gray-700 font-semibold rounded-r-lg focus:outline-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled || value >= max}
        style={{ borderWidth }}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput;
