// src/components/LoadingOverlay.tsx
import React, {
  useEffect,
  useState,
  FC,
  ReactNode,
  KeyboardEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface LoadingOverlayProps {
  loadingText?: string;
  onShow?: () => void;
  onHide?: () => void;
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
  animation?: string;
  icon?: ReactNode;
  progress?: number | null;
  onClose?: () => void;
  closable?: boolean;
  customClass?: string;
  customIconClass?: string;
  customProgressClass?: string;
  customButtonClass?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  iconSize?: string;
  iconColor?: string;
  textSize?: string;
  progressBarColor?: string;
  progressBarHeight?: string;
  closeButtonText?: string;
  closeButtonPosition?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
  animationType?: "spin" | "pulse" | "bounce";
  animationDuration?: string;
  overlayOpacity?: string;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({
  loadingText = "Loading...",
  onShow,
  onHide,
  theme,
  tooltip = "",
  borderWidth = "4",
  animation = "animate-spin",
  icon = null,
  progress = null,
  onClose,
  closable = true,
  customClass = "",
  customIconClass = "",
  customProgressClass = "",
  customButtonClass = "",
  backgroundColor,
  textColor,
  borderColor,
  iconSize = "h-12 w-12",
  iconColor = "text-gray-300",
  textSize = "text-lg",
  progressBarColor = "bg-blue-600",
  progressBarHeight = "h-2.5",
  closeButtonText = "Close",
  closeButtonPosition = "bottom-right",
  animationType = "spin",
  animationDuration = "duration-300",
  overlayOpacity = "bg-opacity-70",
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const { theme: currentTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (onShow) onShow();
    return () => {
      if (onHide) onHide();
    };
  }, [onShow, onHide]);

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

  const animationClasses = {
    spin: "animate-spin",
    pulse: "animate-pulse",
    bounce: "animate-bounce",
  };

  const buttonPositionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black ${overlayOpacity} z-50 ${customClass} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
      role="alert"
      aria-live="assertive"
      title={tooltip}
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
        borderColor: borderColor || undefined,
      }}
    >
      <div className="flex flex-col items-center space-y-4">
        {icon ? (
          <div
            className={`${iconSize} ${animationClasses[animationType]} ${animationDuration} ${customIconClass}`}
            style={{ color: iconColor }}
          >
            {icon}
          </div>
        ) : (
          <div
            className={`${iconSize} border-${borderWidth} ${iconColor} border-t-transparent rounded-full shadow-neon ${animationClasses[animationType]} ${animationDuration} ${customIconClass}`}
          ></div>
        )}
        <span
          className={`${textSize} font-semibold`}
          style={{ color: textColor }}
        >
          {loadingText}
        </span>
        {progress !== null && (
          <div
            className={`w-full bg-gray-200 rounded-full ${progressBarHeight} dark:bg-gray-700 ${customProgressClass}`}
          >
            <div
              className={`${progressBarColor} ${progressBarHeight} rounded-full`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {closable && (
          <button
            className={`absolute ${buttonPositionClasses[closeButtonPosition]} px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${customButtonClass}`}
            onClick={() => {
              setIsVisible(false);
              onClose && onClose();
            }}
          >
            {closeButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;