// src/components/PhoneInput.tsx
import React, {
  useState,
  useEffect,
  FocusEvent,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface PhoneInputProps {
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
  defaultValue?: string;
  international?: boolean;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "sunset" | "ocean";
  tooltip?: string;
  borderWidth?: string;
  iconPosition?: "left" | "right";
  clearable?: boolean;
  size?: "small" | "medium" | "large";
  onDoubleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
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
  defaultValue = "",
  international = false,
  theme,
  tooltip = "",
  borderWidth = "2",
  iconPosition = "right",
  clearable = true,
  size = "medium",
  onDoubleClick,
  onKeyDown,
  ariaLabel = "电话号码输入框",
}) => {
  const [error, setError] = useState("");
  const [phoneValue, setPhoneValue] = useState(value || defaultValue);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    setPhoneValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneValue(newValue);
    onChange(newValue);

    const phonePattern = international
      ? /^\+\d{1,3}-\d{1,4}-\d{1,4}-\d{4}$/ // 国际电话号码格式检查 +123-1234-1234-1234
      : /^\d{3}-\d{3}-\d{4}$/; // 本地电话号码格式检查 123-456-7890

    if (phonePattern.test(newValue)) {
      setError("");
    } else {
      setError(
        international
          ? "请输入有效的国际电话号码格式 (+123-1234-1234-1234)"
          : "请输入有效的电话号码格式 (123-456-7890)"
      );
    }
  };

  const handleClear = () => {
    setPhoneValue("");
    onChange("");
    setError("");
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean";

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
  };

  const sizeClasses = {
    small: "p-1 text-sm",
    medium: "p-2 text-base",
    large: "p-3 text-lg",
  };

  return (
    <div
      className={`mb-4 ${customClass}`}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
    >
      {label && (
        <label className={`block text-gray-200 mb-1 ${customLabelClass}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="tel"
          value={phoneValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={onHover}
          disabled={disabled}
          placeholder={international ? "+123-1234-1234-1234" : "123-456-7890"}
          className={`border-${borderWidth} rounded ${sizeClasses[size]} ${
            themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
          } focus:outline-none focus:ring focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-neon ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${customInputClass}`}
          title={tooltip}
        />
        {clearable && phoneValue && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${
              iconPosition === "right" ? "right-2" : "left-2"
            } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition duration-300`}
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
