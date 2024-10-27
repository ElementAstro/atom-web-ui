// src/components/Rating.tsx
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface RatingProps {
  max?: number;
  onRate?: (rate: number) => void;
  onHover?: (rate: number) => void;
  onLeave?: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  label?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  allowHalf?: boolean;
  clearable?: boolean;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: string;
  fullscreen?: boolean;
  border?: boolean;
  borderColor?: string;
  customClass?: string;
  customLabelClass?: string;
  customIconClass?: string;
  customButtonClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const Rating: React.FC<RatingProps> = ({
  max = 5,
  onRate,
  onHover,
  onLeave,
  disabled = false,
  size = "medium",
  label,
  onFocus,
  onBlur,
  allowHalf = false,
  clearable = false,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = "★",
  fullscreen = false,
  border = false,
  borderColor = "border-gray-300",
  customClass = "",
  customLabelClass = "",
  customIconClass = "",
  customButtonClass = "",
  hoverColor = "",
  activeColor = "",
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const { theme: currentTheme } = useTheme();

  const handleRate = (rate: number) => {
    if (disabled) return;
    setRating(rate);
    if (onRate) {
      onRate(rate);
    }
  };

  const handleMouseEnter = (rate: number) => {
    if (disabled) return;
    setHoverRating(rate);
    if (onHover) {
      onHover(rate);
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverRating(0);
    if (onLeave) {
      onLeave();
    }
  };

  const handleClear = () => {
    setRating(0);
    if (onRate) {
      onRate(0);
    }
  };

  const sizeClasses: { [key: string]: string } = {
    small: "text-xl w-8 h-8",
    medium: "text-3xl w-12 h-12",
    large: "text-5xl w-16 h-16",
  };

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white",
  };

  const appliedTheme =
    themeClasses[theme as ThemeKeys] || themeClasses[currentTheme as ThemeKeys];

  return (
    <div
      className={`flex flex-col items-center p-4 md:p-6 lg:p-8 ${
        fullscreen ? "w-full h-full" : ""
      } ${appliedTheme} ${customClass}`}
    >
      {label && (
        <span className={`mb-2 text-gray-200 ${customLabelClass}`}>
          {label}
        </span>
      )}
      <div
        className="flex space-x-1"
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
        role="radiogroup"
        aria-disabled={disabled}
      >
        {[...Array(max)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleRate(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer ${
              sizeClasses[size]
            } transition duration-300 transform ${animation} ${
              index < (hoverRating || rating)
                ? "text-yellow-500 scale-110"
                : "text-gray-300"
            } ${hoverColor} ${activeColor} ${hoverAnimation} ${
              disabled ? disabledColor : ""
            } ${
              border ? `border ${borderColor} border-${borderWidth}` : ""
            } ${customIconClass}`}
            role="radio"
            aria-checked={index < rating}
            title={tooltip}
          >
            {icon}
          </span>
        ))}
        {allowHalf &&
          [...Array(max)].map((_, index) => (
            <span
              key={`half-${index}`}
              onClick={() => handleRate(index + 0.5)}
              onMouseEnter={() => handleMouseEnter(index + 0.5)}
              onMouseLeave={handleMouseLeave}
              className={`cursor-pointer ${
                sizeClasses[size]
              } transition duration-300 transform ${animation} ${
                index + 0.5 <= (hoverRating || rating)
                  ? "text-yellow-500 scale-110"
                  : "text-gray-300"
              } ${hoverColor} ${activeColor} ${hoverAnimation} ${
                disabled ? disabledColor : ""
              } ${
                border ? `border ${borderColor} border-${borderWidth}` : ""
              } ${customIconClass}`}
              role="radio"
              aria-checked={index + 0.5 <= rating}
              title={tooltip}
            >
              {icon}
            </span>
          ))}
      </div>
      {clearable && (
        <button
          onClick={handleClear}
          className={`mt-2 text-red-500 hover:text-red-700 transition duration-300 ${customButtonClass}`}
          title={tooltip}
        >
          <AiOutlineClose />
        </button>
      )}
    </div>
  );
};

export default Rating;
