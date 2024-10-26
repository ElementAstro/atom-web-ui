// src/components/Tooltip.tsx
import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

interface TooltipProps {
  text: string;
  children: ReactNode;
  onShow?: () => void;
  onHide?: () => void;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click";
  delay?: number;
  customClass?: string;
  customTextClass?: string;
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
  icon?: ReactNode;
  fullscreen?: boolean;
  size?: "small" | "medium" | "large";
  onDoubleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  onShow,
  onHide,
  position = "top",
  trigger = "hover",
  delay = 0,
  customClass = "",
  customTextClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transition-opacity duration-300 ease-in-out",
  icon = null,
  fullscreen = false,
  size = "medium",
  onDoubleClick,
  onKeyDown,
  ariaLabel = "提示",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleShow = () => {
    if (delay > 0) {
      const id = setTimeout(() => {
        setIsVisible(true);
        if (onShow) onShow();
      }, delay);
      setTimeoutId(id);
    } else {
      setIsVisible(true);
      if (onShow) onShow();
    }
  };

  const handleHide = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
    if (onHide) onHide();
  };

  const handleMouseEnter = () => {
    if (trigger === "hover") handleShow();
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") handleHide();
  };

  const handleClick = () => {
    if (trigger === "click") {
      if (isVisible) {
        handleHide();
      } else {
        handleShow();
      }
    }
  };

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (position === "top" && containerRect.top < tooltipRect.height) {
        setCalculatedPosition("bottom");
      } else if (
        position === "bottom" &&
        containerRect.bottom + tooltipRect.height > viewportHeight
      ) {
        setCalculatedPosition("top");
      } else if (
        position === "left" &&
        containerRect.left < tooltipRect.width
      ) {
        setCalculatedPosition("right");
      } else if (
        position === "right" &&
        containerRect.right + tooltipRect.width > viewportWidth
      ) {
        setCalculatedPosition("left");
      } else {
        setCalculatedPosition(position);
      }
    }
  }, [isVisible, position]);

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

  const sizeClasses = {
    small: "text-xs p-1",
    medium: "text-sm p-2",
    large: "text-lg p-3",
  };

  return (
    <div
      ref={containerRef}
      className={`relative group inline-block ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      title={tooltip}
      aria-label={ariaLabel}
    >
      {children}
      <div
        ref={tooltipRef}
        className={`absolute ${
          positionClasses[calculatedPosition]
        } ${animation} ${
          isVisible ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded shadow-lg z-10 border-${borderWidth} ${customTextClass} ${
          sizeClasses[size]
        }`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
