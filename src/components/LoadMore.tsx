// src/components/LoadMore.tsx
import React, { FC, MouseEventHandler, FocusEventHandler } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "../context/ThemeContext";

interface LoadMoreProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
  onHover?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "forest"
    | "astronomyDarkRed";
  borderWidth?: string;
  animation?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  customClass?: string;
  customIconClass?: string;
  customLoadingTextClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const LoadMore: FC<LoadMoreProps> = ({
  onClick,
  loading,
  onHover,
  onFocus,
  onBlur,
  disabled = false,
  icon = null,
  tooltip = "",
  variant = "primary",
  size = "medium",
  theme,
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconPosition = "left",
  fullWidth = false,
  customClass = "",
  customIconClass = "",
  customLoadingTextClass = "",
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const { theme: currentTheme } = useTheme();

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white",
    secondary: "bg-gray-700 text-white",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-md",
    large: "px-6 py-3 text-lg",
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "forest"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    forest: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed: "bg-red-100 text-red-900 border-red-300",
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`flex items-center ${variantClasses[variant]} ${
          sizeClasses[size]
        } rounded-lg shadow-lg ${animation} ${customClass} ${
          loading || disabled ? "cursor-not-allowed opacity-50" : ""
        } ${fullWidth ? "w-full" : ""} ${
          themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
        } border-${borderWidth} ${hoverColor} ${activeColor} ${
          disabled ? disabledColor : ""
        } ${hoverAnimation}`}
        disabled={loading || disabled}
        title={tooltip}
      >
        {loading ? (
          <>
            <LoadingSpinner
              size="6"
              color="white"
              speed="fast"
              customClass={customIconClass}
            />
            <span className={`ml-2 animate-pulse ${customLoadingTextClass}`}>
              加载中...
            </span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className={`mr-2 ${customIconClass}`}>{icon}</span>
            )}
            <span>加载更多</span>
            {icon && iconPosition === "right" && (
              <span className={`ml-2 ${customIconClass}`}>{icon}</span>
            )}
          </>
        )}
      </button>
      <style>{`
        @media (max-width: 640px) {
          button {
            width: 100%;
            padding: 0.5rem 1rem;
          }
        }
        @media (min-width: 640px) {
          button {
            width: auto;
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadMore;
