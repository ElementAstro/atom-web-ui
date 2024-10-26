// src/components/Switch.tsx
import React, {
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
  AnimationEvent,
} from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface SwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  onToggle?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large" | "extraLarge";
  onHover?: (e: MouseEvent<HTMLLabelElement>) => void;
  onFocus?: (e: FocusEvent<HTMLLabelElement>) => void;
  onBlur?: (e: FocusEvent<HTMLLabelElement>) => void;
  onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "cyan";
  labelPosition?: "left" | "right";
  loading?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  borderWidth?: string;
  animation?: string;
  fullscreen?: boolean;
  onDoubleClick?: (e: MouseEvent<HTMLLabelElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLLabelElement>) => void;
  ariaLabel?: string;
}

const Switch: React.FC<SwitchProps> = ({
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
  color = "blue",
  labelPosition = "right",
  loading = false,
  icon = null,
  tooltip = "",
  theme,
  borderWidth = "2",
  animation = "transition-all duration-300 ease-in-out",
  fullscreen = false,
  onDoubleClick,
  onKeyDown,
  ariaLabel = "Toggle switch",
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    onChange(e);
    if (onToggle) {
      onToggle(e.target.checked);
    }
  };

  const sizeClasses = {
    small: "w-12 h-6",
    medium: "w-16 h-8",
    large: "w-20 h-10",
    extraLarge: "w-24 h-12", // 新增尺寸
  };

  const knobSizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-10 h-10",
    extraLarge: "w-12 h-12", // 新增尺寸
  };

  const colorClasses = {
    blue: "bg-gradient-to-r from-blue-500 to-purple-500",
    green: "bg-gradient-to-r from-green-500 to-teal-500",
    red: "bg-gradient-to-r from-red-500 to-pink-500",
    yellow: "bg-gradient-to-r from-yellow-500 to-orange-500",
    purple: "bg-gradient-to-r from-purple-500 to-indigo-500", // 新增颜色
    cyan: "bg-gradient-to-r from-cyan-500 to-blue-500", // 新增颜色
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
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500", // 新增主题
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500", // 新增主题
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500", // 新增主题
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled || loading ? "cursor-not-allowed opacity-50" : ""
      } ${fullscreen ? "w-full h-full" : ""} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      title={tooltip}
      aria-label={ariaLabel}
    >
      {label && labelPosition === "left" && (
        <span className="mr-3 text-gray-200">{label}</span>
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="sr-only"
        disabled={disabled || loading}
        aria-checked={checked}
        aria-label={label ? label : "Toggle switch"}
        onAnimationEnd={onAnimationEnd}
      />
      <div
        className={`relative ${animation} transform ${sizeClasses[size]} ${
          checked ? colorClasses[color] : "bg-gray-600"
        } rounded-full shadow-lg border-${borderWidth}`}
      >
        <div
          className={`absolute bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out transform ${
            knobSizeClasses[size]
          } ${checked ? "translate-x-full" : "translate-x-0.5"}`}
          style={{
            transition: "transform 0.3s ease",
          }}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12c0-4.418 1.791-8.365 4.688-11.264l5.688 5.688C9.472 6.112 7.314 9.836 8 12h-4z"
              />
            </svg>
          )}
          {icon && !loading && <span className="text-gray-900">{icon}</span>}
        </div>
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
      {label && labelPosition === "right" && (
        <span className="ml-3 text-gray-200">{label}</span>
      )}
    </label>
  );
};

export default Switch;
