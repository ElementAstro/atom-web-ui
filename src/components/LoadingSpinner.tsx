// src/components/LoadingSpinner.tsx
import React, { useEffect, useState, FC, KeyboardEvent } from "react";
import { useTheme } from "../context/ThemeContext";

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
  speed?: "slow" | "normal" | "fast";
  onStart?: () => void;
  onStop?: () => void;
  label?: string;
  labelPosition?: "top" | "bottom" | "left" | "right";
  thickness?: string;
  backgroundColor?: string;
  animation?: "spin" | "pulse" | "bounce" | "custom";
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "forest"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  progress?: number | null;
  onClose?: () => void;
  customAnimation?: string;
  customClass?: string;
  customIconClass?: string;
  customProgressClass?: string;
  customButtonClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  size = "10",
  color = "blue",
  speed = "normal",
  onStart,
  onStop,
  label = "",
  labelPosition = "bottom",
  thickness = "2",
  backgroundColor = "transparent",
  animation = "spin",
  theme,
  tooltip = "",
  borderWidth = "2",
  icon = null,
  fullscreen = false,
  progress = null,
  onClose,
  customAnimation = "",
  customClass = "",
  customIconClass = "",
  customProgressClass = "",
  customButtonClass = "",
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const { theme: currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const sizeClasses = `h-${size} w-${size}`;
  const colorClasses = `border-${color}-500`;
  const thicknessClasses = `border-${thickness}`;
  const backgroundColorClasses = `bg-${backgroundColor}`;
  const spinSpeedClasses = {
    slow: "animate-spin-slow",
    normal: "animate-spin",
    fast: "animate-spin-fast",
  };
  const animationClasses = {
    spin: spinSpeedClasses[speed],
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    custom: customAnimation,
  };

  useEffect(() => {
    if (onStart) onStart();
    return () => {
      if (onStop) onStop();
    };
  }, [onStart, onStop]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      setIsVisible(false);
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
    };
  }, []);

  const labelClasses = {
    top: "flex-col-reverse",
    bottom: "flex-col",
    left: "flex-row-reverse",
    right: "flex-row",
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

  if (!isVisible) return null;

  return (
    <div
      className={`flex justify-center items-center ${
        labelClasses[labelPosition]
      } ${fullscreen ? "fixed inset-0 z-50" : ""} ${customClass} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
      title={tooltip}
    >
      {icon ? (
        <div
          className={`h-${size} w-${size} ${animationClasses[animation]} ${customIconClass}`}
        >
          {icon}
        </div>
      ) : (
        <div
          className={`rounded-full ${backgroundColorClasses} ${thicknessClasses} ${sizeClasses} ${colorClasses} ${animationClasses[animation]} shadow-neon border-${borderWidth}`}
        />
      )}
      {label && <span className="mt-2 text-white">{label}</span>}
      {progress !== null && (
        <div
          className={`w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2 ${customProgressClass}`}
        >
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {onClose && (
        <button
          className={`mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${customButtonClass}`}
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default LoadingSpinner;
