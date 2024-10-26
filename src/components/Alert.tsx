// src/components/Alert.tsx
import React, {
  useState,
  useEffect,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface AlertProps {
  message: string;
  severity: "error" | "info" | "warning" | "success";
  onClose: () => void;
  onOpen?: () => void;
  customClass?: string;
  customMessageClass?: string;
  customButtonClass?: string;
  autoClose?: boolean;
  autoCloseDuration?: number;
  pauseOnHover?: boolean;
  icon?: React.ReactNode;
  title?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "astronomyDarkRed";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  animation?: string;
  dismissible?: boolean;
  showIcon?: boolean;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  showProgress?: boolean;
  progressColor?: string;
  progressHeight?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  showAnimation?: string;
  hideAnimation?: string;
  errorIcon?: React.ReactNode;
  infoIcon?: React.ReactNode;
  warningIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  onShow?: () => void;
  onHide?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  message,
  severity,
  onClose,
  onOpen,
  customClass = "",
  customMessageClass = "",
  customButtonClass = "",
  autoClose = false,
  autoCloseDuration = 5000,
  pauseOnHover = true,
  icon,
  title,
  theme,
  position = "top-right",
  animation = "transform transition-transform duration-300 ease-in-out",
  dismissible = true,
  showIcon = true,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  showProgress = false,
  progressColor = "bg-blue-500",
  progressHeight = "h-1",
  onClick,
  showAnimation = "fadeIn",
  hideAnimation = "fadeOut",
  errorIcon,
  infoIcon,
  warningIcon,
  successIcon,
  onShow,
  onHide,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme: currentTheme } = useTheme();

  useEffect(() => {
    if (isVisible && onOpen) {
      onOpen();
    }
    if (isVisible && onShow) {
      onShow();
    }
  }, [isVisible, onOpen, onShow]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoClose && !isPaused) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose();
          if (onHide) onHide();
        }, 300);
      }, autoCloseDuration);
    }
    return () => clearTimeout(timer);
  }, [autoClose, autoCloseDuration, isPaused, onClose, onHide]);

  useEffect(() => {
    if (autoClose && showProgress && !isPaused) {
      const interval = setInterval(() => {
        setProgress((prev) =>
          Math.min(prev + 100 / (autoCloseDuration / 100), 100)
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [autoClose, autoCloseDuration, showProgress, isPaused]);

  const bgColor = {
    error: "bg-red-900",
    info: "bg-blue-900",
    warning: "bg-yellow-900",
    success: "bg-green-900",
  }[severity];

  const textColor = {
    error: "text-red-300",
    info: "text-blue-300",
    warning: "text-yellow-300",
    success: "text-green-300",
  }[severity];

  const borderColor = {
    error: "border-red-500",
    info: "border-blue-500",
    warning: "border-yellow-500",
    success: "border-green-500",
  }[severity];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      if (onHide) onHide();
    }, 300);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
    if (onMouseLeave) onMouseLeave();
  };

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const themeClasses = {
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

  const iconMap = {
    error: errorIcon,
    info: infoIcon,
    warning: warningIcon,
    success: successIcon,
  };

  return (
    isVisible && (
      <div
        className={`alert border-l-4 ${borderColor} ${bgColor} ${textColor} p-4 my-2 rounded ${animation} ${showAnimation} ${
          positionClasses[position]
        } ${
          themeClasses[(theme as keyof typeof themeClasses) || currentTheme]
        } ${customClass}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onAnimationEnd={onAnimationEnd}
        onClick={onClick}
      >
        {showProgress && (
          <div className={`absolute top-0 left-0 w-full ${progressHeight}`}>
            <div
              className={`${progressColor} h-full`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        <div className="alert__content flex justify-between items-center">
          {showIcon && (
            <span className="alert__icon mr-2">
              {icon || iconMap[severity]}
            </span>
          )}
          <div className="flex-1">
            {title && (
              <div className="alert__title font-bold mb-1">{title}</div>
            )}
            <span className={`alert__message ${customMessageClass}`}>
              {message}
            </span>
          </div>
          {dismissible && (
            <button
              onClick={handleClose}
              onKeyDown={(e) => e.key === "Enter" && handleClose()}
              tabIndex={0}
              className={`alert__close-button text-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Alert;
