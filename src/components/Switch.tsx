// src/components/Switch.tsx
import React, {
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
  AnimationEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

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
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
  showLabels?: boolean;
  labelColor?: string;
  labelActiveColor?: string;
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
  hoverColor = "",
  activeColor = "",
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
  showLabels = true,
  labelColor = "text-gray-200",
  labelActiveColor = "text-white",
}) => {
  const { theme: currentTheme } = useTheme();

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
    extraLarge: "w-24 h-12",
  };

  const knobSizeClasses = {
    small: "w-5 h-5",
    medium: "w-7 h-7",
    large: "w-9 h-9",
    extraLarge: "w-11 h-11",
  };

  const colorClasses = {
    blue: "bg-gradient-to-r from-blue-500 to-purple-500",
    green: "bg-gradient-to-r from-green-500 to-teal-500",
    red: "bg-gradient-to-r from-red-500 to-pink-500",
    yellow: "bg-gradient-to-r from-yellow-500 to-orange-500",
    purple: "bg-gradient-to-r from-purple-500 to-indigo-500",
    cyan: "bg-gradient-to-r from-cyan-500 to-blue-500",
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
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled || loading ? disabledColor : ""
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
        <span className={`mr-3 ${labelColor}`}>{label}</span>
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
        } rounded-full shadow-lg border-${borderWidth} transition-colors duration-300 ease-in-out`}
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
          {icon && !loading && (
            <span className="flex items-center justify-center h-full w-full">
              {icon}
            </span>
          )}
        </div>
        {showLabels && (
          <>
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                checked
                  ? `opacity-100 left-2 ${labelActiveColor}`
                  : "opacity-0 right-2"
              } text-sm`}
            >
              ON
            </div>
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                checked
                  ? "opacity-0 left-2"
                  : `opacity-100 right-2 ${labelColor}`
              } text-sm`}
            >
              OFF
            </div>
          </>
        )}
      </div>
      {label && labelPosition === "right" && (
        <span className={`ml-3 ${labelColor}`}>{label}</span>
      )}
    </label>
  );
};

export default Switch;
