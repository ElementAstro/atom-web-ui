// src/components/Input.tsx
import React, {
  useState,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent,
  AnimationEvent,
  MouseEvent,
  FC,
} from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface InputProps {
  label?: string;
  type?: string;
  required?: boolean;
  errorMessage?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void; // 新增 onKeyUp 属性
  customClass?: string;
  customLabelClass?: string;
  customInputClass?: string;
  customErrorClass?: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  showPassword?: boolean;
  maxLength?: number;
  theme?: "light" | "dark" | "astronomy" | "eyeCare";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  iconPosition?: "left" | "right";
  clearable?: boolean;
  iconColor?: string;
  onDoubleClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
  value?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Input: FC<InputProps> = ({
  label,
  type = "text",
  required = false,
  errorMessage,
  onFocus,
  onBlur,
  onChange,
  onKeyUp, // 新增 onKeyUp 属性
  customClass = "",
  customLabelClass = "",
  customInputClass = "",
  customErrorClass = "",
  disabled = false,
  placeholder = "",
  icon,
  showPassword = false,
  maxLength,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconPosition = "left",
  clearable = false,
  iconColor = "text-gray-400",
  onDoubleClick,
  onKeyDown,
  onAnimationEnd,
  ariaLabel = "输入框",
  value: initialValue = "",
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { theme: currentTheme } = useTheme();

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyUp) onKeyUp(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const clearInput = () => {
    setValue("");
    if (onChange)
      onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
  };

  type ThemeKeys = "light" | "dark" | "astronomy" | "eyeCare";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`input__container mb-4 ${customClass}`}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <label
        className={`input__label block text-sm font-semibold mb-1 transition-all duration-300 ${
          isFocused ? "text-blue-400" : "text-gray-600"
        } ${customLabelClass}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && iconPosition === "left" && (
          <span
            className={`input__icon absolute left-3 top-1/2 transform -translate-y-1/2 ${iconColor}`}
          >
            {icon}
          </span>
        )}
        <input
          type={showPassword && isPasswordVisible ? "text" : type}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyUp={handleKeyUp} // 添加 onKeyUp 处理函数
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
            ${themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]}
            focus:shadow-neon focus:scale-105 ${customInputClass} ${hoverColor} ${activeColor} ${
            disabled ? disabledColor : ""
          } ${hoverAnimation}`}
          title={tooltip}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <span
            className={`input__icon absolute right-3 top-1/2 transform -translate-y-1/2 ${iconColor}`}
          >
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
      <style>{`
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