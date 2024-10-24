// src/components/Input.js
import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Input = ({
  label,
  type = "text",
  required = false,
  errorMessage,
  onFocus,
  onBlur,
  onChange,
  customClass = "",
  customLabelClass = "",
  customInputClass = "",
  customErrorClass = "",
  disabled = false,
  placeholder = "",
  icon,
  showPassword = false,
  maxLength,
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  iconPosition = "left", // 新增属性
  clearable = false, // 新增属性
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const clearInput = () => {
    setValue("");
    if (onChange) onChange({ target: { value: "" } });
  };

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div className={`input__container mb-4 ${customClass}`}>
      <label
        className={`input__label block text-sm font-semibold mb-1 transition-all duration-300 ${
          isFocused ? "text-blue-400" : "text-gray-600"
        } ${customLabelClass}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && iconPosition === "left" && (
          <span className="input__icon absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </span>
        )}
        <input
          type={showPassword && isPasswordVisible ? "text" : type}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`input__field border-${borderWidth} rounded-lg p-2 w-full transition duration-300
            ${
              isFocused
                ? "border-blue-400 ring-2 ring-blue-200"
                : "border-gray-400"
            }
            ${errorMessage ? "border-red-500" : ""}
            ${icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""}
            ${themeClasses[theme || currentTheme]}
            focus:shadow-neon focus:scale-105 ${customInputClass}`}
          title={tooltip}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <span className="input__icon absolute right-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </span>
        )}
        {showPassword && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="input__toggle-password absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
          >
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
        {clearable && value && (
          <button
            type="button"
            onClick={clearInput}
            className="input__clear absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
      {errorMessage && (
        <p
          className={`input__error text-red-500 text-sm mt-1 animate-pulse ${customErrorClass}`}
        >
          {errorMessage}
        </p>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .input__container {
            margin-bottom: 1rem;
          }
          .input__label {
            font-size: 0.875rem;
          }
          .input__field {
            padding: 0.5rem;
          }
          .input__error {
            font-size: 0.75rem;
          }
          .input__icon {
            left: 0.75rem;
          }
          .input__toggle-password {
            right: 0.75rem;
          }
          .input__clear {
            right: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Input;
