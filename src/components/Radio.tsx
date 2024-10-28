import React from "react";

interface RadioProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  color?: string;
  size?: number;
  error?: boolean;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  value,
  checked,
  onChange,
  disabled = false,
  color = "blue",
  size = 20,
  error = false,
}) => {
  return (
    <label
      className={`flex items-center space-x-3 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600"
      } ${error ? "text-red-600" : ""}`}
      style={{ fontSize: size }}
    >
      <input
        type="radio"
        className={`form-radio h-${size} w-${size} text-${color}-600 transition duration-200 ease-in-out ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        value={value}
        checked={checked}
        onChange={() => !disabled && onChange(value)}
        disabled={disabled}
        aria-checked={checked}
        aria-disabled={disabled}
      />
      <span
        className={`text-gray-800 ${
          checked ? `font-semibold text-${color}-600` : "text-gray-600"
        } transition duration-200 ease-in-out`}
      >
        {label}
      </span>
    </label>
  );
};
