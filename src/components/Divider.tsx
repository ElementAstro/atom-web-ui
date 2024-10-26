// src/components/Divider.tsx
import React, {
  useEffect,
  useRef,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface DividerProps {
  title?: string;
  onHover?: () => void;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onAnimationEnd?: () => void;
  draggable?: boolean;
  customClass?: string;
  customTitleClass?: string;
  customLineClass?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "ocean"
    | "sunset"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: ReactNode;
  ariaLabel?: string;
}

const Divider: React.FC<DividerProps> = ({
  title,
  onHover,
  onClick,
  onDoubleClick,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  draggable = false,
  customClass = "",
  customTitleClass = "",
  customLineClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  icon = null,
  ariaLabel = "Divider",
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (onHover) {
      const handleMouseEnter = () => onHover();
      const dividerElement = dividerRef.current;
      if (dividerElement) {
        dividerElement.addEventListener("mouseenter", handleMouseEnter);
        return () => {
          dividerElement.removeEventListener("mouseenter", handleMouseEnter);
        };
      }
    }
  }, [onHover]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggable && dividerRef.current) {
      const rect = dividerRef.current.getBoundingClientRect();
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          offsetX: e.clientX - rect.left,
          offsetY: e.clientY - rect.top,
        })
      );
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggable && dividerRef.current) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      dividerRef.current.style.left = `${e.clientX - data.offsetX}px`;
      dividerRef.current.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  const themeClasses: Record<string, string> = {
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

  return (
    <div
      ref={dividerRef}
      id="divider"
      className={`flex items-center my-4 ${animation} hover:scale-105 hover:shadow-neon ${customClass} ${
        themeClasses[theme || currentTheme]
      }`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onAnimationEnd={onAnimationEnd}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      tabIndex={0}
      title={tooltip}
      aria-label={ariaLabel}
    >
      <div
        className={`flex-1 border-t border-gray-400 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-${borderWidth} ${customLineClass}`}
      ></div>
      <span
        className={`mx-4 text-gray-600 hover:text-white transition-colors duration-300 ${customTitleClass}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </span>
      <div
        className={`flex-1 border-t border-gray-400 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-${borderWidth} ${customLineClass}`}
      ></div>
    </div>
  );
};

export default Divider;
