import React from "react";

const DateInput = ({
  value,
  onChange,
  label,
  disabled,
  onFocus,
  onBlur,
  onHover,
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-200 mb-1">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onHover}
        disabled={disabled}
        className={`p-2 border border-gray-600 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default DateInput;
