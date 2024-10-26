// src/components/Tag.tsx
import React, { MouseEvent, FocusEvent, DragEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface TagProps {
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onHover?: (event: MouseEvent<HTMLSpanElement>) => void;
  onFocus?: (event: FocusEvent<HTMLSpanElement>) => void;
  onBlur?: (event: FocusEvent<HTMLSpanElement>) => void;
  color?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  border?: string;
  rounded?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "astronomyDarkRed";
  borderWidth?: string;
  animation?: string;
  fullscreen?: boolean;
  draggable?: boolean;
  hoverColor?: string;
  activeColor?: string;
  disabledColor?: string;
  hoverAnimation?: string;
  showLabels?: boolean;
  labelColor?: string;
  labelActiveColor?: string;
}

const Tag: React.FC<TagProps> = ({
  children,
  onClick,
  removable,
  onRemove,
  disabled = false,
  size = "medium",
  onHover,
  onFocus,
  onBlur,
  color = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
  icon = null,
  tooltip = "",
  border = "border-none",
  rounded = "rounded-full",
  theme,
  borderWidth = "2",
  animation = "transition duration-300 transform hover:scale-105",
  fullscreen = false,
  draggable = false,
  hoverColor = "",
  activeColor = "",
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
  showLabels = true,
  labelColor = "text-gray-200",
  labelActiveColor = "text-white",
}) => {
  const { theme: currentTheme } = useTheme();

  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-1.5",
    large: "text-md px-4 py-2",
  };

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

  const handleDragStart = (e: DragEvent<HTMLSpanElement>) => {
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

  const handleDrop = (e: DragEvent<HTMLSpanElement>) => {
    if (draggable) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      e.currentTarget.style.left = `${e.clientX - data.offsetX}px`;
      e.currentTarget.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  return (
    <span
      className={`inline-flex items-center ${color} text-white font-bold ${rounded} cursor-pointer ${animation} ${
        sizeClasses[size]
      } ${disabled ? disabledColor : ""} ${border} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      } border-${borderWidth} ${
        fullscreen ? "w-full h-full" : ""
      } ${hoverColor} ${activeColor} ${hoverAnimation}`}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
      title={tooltip}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {removable && !disabled && (
        <button
          className="ml-2 text-white hover:text-red-400 transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onRemove && onRemove();
          }}
          aria-label="Remove tag"
        >
          <AiOutlineClose />
        </button>
      )}
    </span>
  );
};

export default Tag;
