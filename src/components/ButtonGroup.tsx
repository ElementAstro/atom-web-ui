// src/components/ButtonGroup.tsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

interface Button {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface ButtonGroupProps {
  buttons: Button[];
  orientation?: "horizontal" | "vertical";
  onButtonClick: (value: string) => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "alert" | "success";
  className?: string;
  tooltip?: string;
  iconPosition?: "left" | "right";
  animation?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  fullWidth?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderWidth?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  ripple?: boolean;
}

type Theme =
  | "light"
  | "dark"
  | "astronomy"
  | "eyeCare"
  | "ocean"
  | "sunset"
  | "astronomyDarkRed";

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  orientation = "horizontal",
  onButtonClick,
  size = "medium",
  disabled = false,
  variant = "primary",
  className = "",
  tooltip = "",
  iconPosition = "left",
  animation = "transform transition-transform duration-200 ease-in-out",
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onAnimationEnd,
  ariaLabel = "",
  fullWidth = false,
  rounded = true,
  shadow = false,
  hoverEffect = true,
  borderStyle = "solid",
  borderWidth = "1",
  borderColor = "transparent",
  textTransform = "none",
  ripple = false,
}) => {
  const { theme } = useTheme() as { theme: Theme };

  const sizeClasses = {
    small: "p-1 text-sm",
    medium: "p-2 text-md",
    large: "p-3 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-neon",
    secondary: "bg-gray-700 hover:bg-gray-600",
    alert: "bg-red-500 text-white hover:bg-red-700 active:bg-red-800",
    success: "bg-green-500 text-white hover:bg-green-700 active:bg-green-800",
  };

  const orientationClasses = {
    horizontal: "flex-row space-x-2",
    vertical: "flex-col space-y-2",
  };

  const themeClasses: Record<Theme, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple) return;

    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const rippleEffect = button.getElementsByClassName("ripple")[0];

    if (rippleEffect) {
      rippleEffect.remove();
    }

    button.appendChild(circle);
  };

  return (
    <div
      className={`flex ${orientationClasses[orientation]} ${className} ${
        themeClasses[theme]
      } ${fullWidth ? "w-full" : ""}`}
      aria-label={ariaLabel}
    >
      {buttons.map((btn, index) => (
        <button
          key={index}
          onClick={() => !btn.disabled && !disabled && onButtonClick(btn.value)}
          className={`flex items-center justify-center ${
            rounded ? "rounded-md" : ""
          } focus:outline-none ${animation} ${sizeClasses[size]} ${
            variantClasses[variant]
          } ${
            btn.disabled || disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${shadow ? "shadow-lg" : ""} ${
            hoverEffect ? "hover:shadow-neon hover:scale-105" : ""
          } border-${borderWidth} border-${borderColor} border-${borderStyle} ${textTransform}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onAnimationEnd={onAnimationEnd}
          title={tooltip}
          aria-label={btn.label}
          onMouseDown={handleRipple}
        >
          {iconPosition === "left" && btn.icon && (
            <span className="mr-2">{btn.icon}</span>
          )}
          {btn.label}
          {iconPosition === "right" && btn.icon && (
            <span className="ml-2">{btn.icon}</span>
          )}
        </button>
      ))}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 600ms linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ButtonGroup;
