import React, {
  useState,
  useEffect,
  useRef,
  DragEvent,
  KeyboardEvent,
  FocusEvent,
  MouseEvent,
} from "react";
import {
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineFullscreen,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface SkeletonScreenProps {
  width?: string;
  height?: string;
  shape?: "rectangle" | "circle";
  className?: string;
  onHover?: (e: MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: FocusEvent<HTMLDivElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onAnimationEnd?: (e: React.AnimationEvent<HTMLDivElement>) => void;
  onDoubleClick?: (e: MouseEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  maximizable?: boolean;
  onMaximize?: () => void;
  onMinimize?: () => void;
  closable?: boolean;
  autoHide?: boolean;
  hideAfter?: number;
  showProgress?: boolean;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  iconColor?: string;
  customClass?: string;
  customButtonClass?: string;
  customProgressClass?: string;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
}

const SkeletonScreen: React.FC<SkeletonScreenProps> = ({
  width = "100%",
  height = "20px",
  shape = "rectangle",
  className = "",
  onHover,
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
  onDoubleClick,
  draggable = false,
  maximizable = false,
  onMaximize,
  onMinimize,
  closable = false,
  autoHide = false,
  hideAfter = 3000,
  showProgress = false,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "animate-pulse",
  icon = null,
  fullscreen = false,
  iconColor = "text-gray-400",
  customClass = "",
  customButtonClass = "",
  customProgressClass = "",
  hoverColor = "",
  activeColor = "",
  disabledColor = "text-gray-400",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoHide) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsVisible(false);
            return 100;
          }
          return prev + 100 / (hideAfter / 100);
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoHide, hideAfter]);

  const shapeClasses = {
    rectangle: "rounded",
    circle: "rounded-full",
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (draggable) {
      const rect = e.currentTarget.getBoundingClientRect();
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        })
      );
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (draggable) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      e.currentTarget.style.left = `${e.clientX - data.offsetX}px`;
      e.currentTarget.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  const handleMaximize = (e: MouseEvent<HTMLButtonElement>) => {
    if (maximizable) {
      const target = e.currentTarget.parentElement as HTMLDivElement;
      target.style.width = "100%";
      target.style.height = "100%";
      if (onMaximize) onMaximize();
    }
  };

  const handleMinimize = (e: MouseEvent<HTMLButtonElement>) => {
    if (maximizable) {
      const target = e.currentTarget.parentElement as HTMLDivElement;
      target.style.width = width;
      target.style.height = height;
      if (onMinimize) onMinimize();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  if (!isVisible) return null;

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
    <div
      className={`relative ${animation} ${shapeClasses[shape]} ${className} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } border-${borderWidth} ${customClass}`}
      style={{ width, height }}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      onDoubleClick={onDoubleClick}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      draggable={draggable}
      role="status"
      aria-label="Loading..."
    >
      {maximizable && (
        <button
          onClick={handleMaximize}
          className={`absolute top-2 right-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-700 transition duration-300 ${iconColor} ${customButtonClass}`}
          title={tooltip}
        >
          {icon || <AiOutlineExpand />}
        </button>
      )}
      {maximizable && (
        <button
          onClick={handleMinimize}
          className={`absolute top-2 right-16 bg-blue-500 text-white p-1 rounded hover:bg-blue-700 transition duration-300 ${iconColor} ${customButtonClass}`}
          title={tooltip}
        >
          {icon || <AiOutlineCompress />}
        </button>
      )}
      {closable && (
        <button
          onClick={handleClose}
          className={`absolute top-2 right-8 bg-red-500 text-white p-1 rounded hover:bg-red-700 transition duration-300 ${iconColor} ${customButtonClass}`}
          title={tooltip}
        >
          {icon || <AiOutlineClose />}
        </button>
      )}
      {fullscreen && (
        <button
          onClick={handleFullscreen}
          className={`absolute top-2 right-24 bg-blue-500 text-white p-1 rounded hover:bg-blue-700 transition duration-300 ${iconColor} ${customButtonClass}`}
          title={tooltip}
        >
          {icon || <AiOutlineFullscreen />}
        </button>
      )}
      {showProgress && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-blue-500 ${customProgressClass}`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};

export default SkeletonScreen;
