// src/components/CheckBox.tsx
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useTheme } from "../context/ThemeContext";

interface CheckBoxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onFocus?: () => void;
  onBlur?: () => void;
  onToggle?: (checked: boolean) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLLabelElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  customClass?: string;
  customLabelClass?: string;
  customBoxClass?: string;
  customIconClass?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  ariaLabel?: string;
  indeterminate?: boolean;
  hoverColor?: string;
  focusColor?: string;
  checkedColor?: string;
  indeterminateColor?: string;
  labelPosition?: "left" | "right";
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  rippleEffect?: boolean;
  shadow?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "medium",
  onFocus,
  onBlur,
  onToggle,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  customClass = "",
  customLabelClass = "",
  customBoxClass = "",
  customIconClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  ariaLabel = "Checkbox",
  indeterminate = false,
  hoverColor = "hover:bg-blue-500",
  focusColor = "focus:ring-blue-500",
  checkedColor = "bg-blue-500",
  indeterminateColor = "bg-gray-500",
  labelPosition = "right",
  showTooltip = false,
  tooltipPosition = "top",
  rippleEffect = false,
  shadow = false,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setIsChecked(event.target.checked);
    onChange(event);
    if (onToggle) {
      onToggle(event.target.checked);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === " ") {
      event.preventDefault();
      handleChange({
        target: { checked: !isChecked },
      } as ChangeEvent<HTMLInputElement>);
    }
    if (onKeyDown) onKeyDown(event);
  };

  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
  };

  const themeClasses: Record<string, string> = {
    light: "border-gray-300 bg-white text-gray-900",
    dark: "border-gray-700 bg-gray-900 text-white",
    astronomy:
      "border-purple-500 bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "border-green-300 bg-green-100 text-green-900",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  const tooltipClasses = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };

  const handleRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!rippleEffect) return;

    const ripple = document.createElement("span");
    const diameter = Math.max(
      event.currentTarget.clientWidth,
      event.currentTarget.clientHeight
    );
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${
      event.clientX - event.currentTarget.offsetLeft - radius
    }px`;
    ripple.style.top = `${
      event.clientY - event.currentTarget.offsetTop - radius
    }px`;
    ripple.classList.add("ripple");

    const rippleContainer =
      event.currentTarget.querySelector(".ripple-container");
    rippleContainer?.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${customClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      onAnimationEnd={onAnimationEnd}
      title={tooltip}
      style={{ textTransform }}
    >
      {label && labelPosition === "left" && (
        <span className={`mr-2 ${customLabelClass}`}>{label}</span>
      )}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
        disabled={disabled}
        aria-checked={isChecked}
        aria-label={label ? label : ariaLabel}
      />
      <div
        className={`relative flex items-center justify-center ${
          sizeClasses[size]
        } border-${borderWidth} border-${borderColor} border-${borderStyle} ${
          isChecked
            ? `${checkedColor}`
            : indeterminate
            ? `${indeterminateColor}`
            : `${themeClasses[theme || currentTheme]}`
        } rounded-md ${animation} ${
          isChecked ? "scale-105 shadow-neon" : ""
        } ${hoverColor} ${focusColor} ${customBoxClass} ${
          shadow ? "shadow-lg" : ""
        }`}
        onMouseDown={handleRipple}
      >
        {isChecked && !indeterminate && (
          <svg
            className={`h-3 w-3 text-white ${customIconClass}`}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M6 10l2 2 6-6-1.5-1.5L8 10z" />
          </svg>
        )}
        {indeterminate && (
          <svg
            className={`h-3 w-3 text-white ${customIconClass}`}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <rect x="4" y="9" width="12" height="2" />
          </svg>
        )}
        <div className="ripple-container absolute inset-0 overflow-hidden rounded-md"></div>
      </div>
      {label && labelPosition === "right" && (
        <span className={`ml-2 ${customLabelClass}`}>{label}</span>
      )}
      {showTooltip && (
        <div className={`tooltip ${tooltipClasses[tooltipPosition]}`}>
          {tooltip}
        </div>
      )}
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
        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          white-space: nowrap;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tooltip-top {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
        }
        .tooltip-bottom {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.5rem;
        }
        .tooltip-left {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 0.5rem;
        }
        .tooltip-right {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        }
        label:hover .tooltip {
          opacity: 1;
        }
      `}</style>
    </label>
  );
};

export default CheckBox;
