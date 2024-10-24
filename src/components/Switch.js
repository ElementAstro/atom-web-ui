import React from "react";

const Switch = ({
  checked,
  onChange,
  label,
  onToggle,
  disabled = false,
  size = "medium",
  onHover,
  onFocus,
  onBlur,
  onAnimationEnd,
}) => {
  const handleToggle = (e) => {
    if (disabled) return;
    onChange(e);
    if (onToggle) {
      onToggle(e.target.checked);
    }
  };

  const sizeClasses = {
    small: "w-12 h-6",
    medium: "w-16 h-8",
    large: "w-20 h-10",
  };

  const knobSizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
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
        onChange={handleToggle}
        className="sr-only"
        disabled={disabled}
        aria-checked={checked}
        aria-label={label ? label : "Toggle switch"}
        onAnimationEnd={onAnimationEnd}
      />
      <div
        className={`relative transition-all duration-300 ease-in-out transform ${
          sizeClasses[size]
        } ${
          checked
            ? "bg-gradient-to-r from-blue-500 to-purple-500"
            : "bg-gray-600"
        } rounded-full shadow-lg`}
      >
        <div
          className={`absolute bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out transform ${
            knobSizeClasses[size]
          } ${checked ? "translate-x-full" : "translate-x-0.5"}`}
          style={{
            transition: "transform 0.3s ease",
          }}
        />
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
            checked ? "opacity-100" : "opacity-0"
          } text-gray-900 text-sm`}
        >
          ON
        </div>
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
            checked ? "opacity-0" : "opacity-100"
          } text-gray-900 text-sm`}
        >
          OFF
        </div>
      </div>
      {label && <span className="ml-3 text-gray-200">{label}</span>}
    </label>
  );
};

export default Switch;
