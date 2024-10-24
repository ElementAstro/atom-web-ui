import React from "react";

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
}) => {
  const handleChange = (event) => {
    if (disabled) return;
    onChange(event);
    if (onToggle) {
      onToggle(event.target.checked);
    }
  };

  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="sr-only"
        disabled={disabled}
        aria-checked={checked}
        aria-label={label ? label : "Checkbox"}
      />
      <div
        className={`relative flex items-center justify-center ${
          sizeClasses[size]
        } border-2 ${
          checked
            ? "border-blue-500 bg-gradient-to-r from-blue-500 to-purple-500"
            : "border-gray-600 bg-gray-800"
        } rounded-md transition duration-300 ease-in-out shadow-md transform ${
          checked ? "scale-105 shadow-neon" : ""
        }`}
      >
        {checked && (
          <svg
            className="h-3 w-3 text-white"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M6 10l2 2 6-6-1.5-1.5L8 10z" />
          </svg>
        )}
      </div>
      {label && <span className="ml-2 text-gray-200">{label}</span>}
    </label>
  );
};

export default CheckBox;
