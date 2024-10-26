// src/components/CollapseButtonGroup.tsx
import React, { useState, useRef, DragEvent } from "react";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface Button {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
  loading?: boolean;
}

interface CollapseButtonGroupProps {
  mainLabel: string;
  buttons: Button[];
  onButtonClick: (value: string) => void;
  onToggle?: (isOpen: boolean) => void;
  onButtonHover?: (value: string) => void;
  onButtonFocus?: (value: string) => void;
  onButtonBlur?: (value: string) => void;
  direction?: "vertical" | "horizontal";
  disabled?: boolean;
  icon?: React.ReactNode;
  showLabels?: boolean;
  buttonSize?: number;
  buttonColor?: string;
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  iconPosition?: "left" | "right";
  draggable?: boolean;
  resizable?: boolean;
  ariaLabel?: string;
  customClass?: string;
  customButtonClass?: string;
  customIconClass?: string;
  customLabelClass?: string;
  customGroupClass?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const CollapseButtonGroup: React.FC<CollapseButtonGroupProps> = ({
  mainLabel,
  buttons,
  onButtonClick,
  onToggle,
  onButtonHover,
  onButtonFocus,
  onButtonBlur,
  direction = "vertical",
  disabled = false,
  icon,
  showLabels = true,
  buttonSize = 12,
  buttonColor = "bg-gradient-to-r from-purple-500 to-red-500",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconPosition = "left",
  draggable = false,
  resizable = false,
  ariaLabel = "Collapse button group",
  customClass = "",
  customButtonClass = "",
  customIconClass = "",
  customLabelClass = "",
  customGroupClass = "",
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme } = useTheme();
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [groupSize, setGroupSize] = useState({ width: 200, height: 300 });

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (onToggle) onToggle(!isOpen);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && buttonGroupRef.current) {
      e.dataTransfer.setData("text/plain", buttonGroupRef.current.id);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (draggable && buttonGroupRef.current) {
      e.preventDefault();
      const droppedGroupId = e.dataTransfer.getData("text/plain");
      const droppedGroup = document.getElementById(droppedGroupId);
      if (droppedGroup && buttonGroupRef.current.parentNode) {
        buttonGroupRef.current.parentNode.insertBefore(
          droppedGroup,
          buttonGroupRef.current.nextSibling
        );
      }
    }
  };

  const handleResizeStart = () => {
    if (resizable) {
      setIsResizing(true);
      document.addEventListener("mousemove", handleResize as EventListener);
      document.addEventListener("mouseup", handleResizeEnd as EventListener);
    }
  };

  const handleResize = (e: globalThis.MouseEvent) => {
    if (isResizing && buttonGroupRef.current) {
      setGroupSize({
        width: e.clientX - buttonGroupRef.current.offsetLeft,
        height: e.clientY - buttonGroupRef.current.offsetTop,
      });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleResize as EventListener);
    document.removeEventListener("mouseup", handleResizeEnd as EventListener);
  };

  const isVertical = direction === "vertical";

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  const onMouseEnter = () => {};
  const onMouseLeave = () => {};
  const onFocus = () => {};
  const onBlur = () => {};
  const onKeyDown = () => {};
  const onAnimationEnd = () => {};

  return (
    <div
      ref={buttonGroupRef}
      className={`relative ${customGroupClass}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
      style={{
        width: groupSize.width,
        height: groupSize.height,
        textTransform,
      }}
    >
      <button
        onClick={toggleOpen}
        className={`w-${buttonSize} h-${buttonSize} flex justify-center items-center p-3 rounded-full text-white ${buttonColor} focus:outline-none transition duration-200 ${
          isOpen ? "shadow-lg hover:shadow-neon" : ""
        } ${
          themeClasses[theme || currentTheme]
        } border-${borderWidth} ${customButtonClass}`}
        title={tooltip || mainLabel}
        disabled={disabled}
      >
        <span>
          {icon ? icon : isOpen ? <AiOutlineClose /> : <AiOutlineRight />}
        </span>
      </button>
      <div
        className={`mt-2 flex ${
          isVertical ? "flex-col space-y-1" : "flex-row space-x-1"
        } transition-all duration-500 ease-in-out transform ${animation} ${
          isOpen
            ? isVertical
              ? "max-h-screen opacity-100"
              : "max-w-screen opacity-100"
            : isVertical
            ? "max-h-0 opacity-0"
            : "max-w-0 opacity-0"
        } overflow-hidden`}
      >
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => onButtonClick(btn.value)}
            onMouseEnter={() => onButtonHover && onButtonHover(btn.value)}
            onFocus={() => onButtonFocus && onButtonFocus(btn.value)}
            onBlur={() => onButtonBlur && onButtonBlur(btn.value)}
            className={`flex justify-between items-center p-2 rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none transition duration-200 ${
              themeClasses[theme || currentTheme]
            } border-${borderWidth} ${customButtonClass}`}
            title={btn.tooltip}
            disabled={btn.disabled}
          >
            {iconPosition === "left" && btn.icon && (
              <span className={`mr-2 ${customIconClass}`}>{btn.icon}</span>
            )}
            {showLabels && (
              <span className={customLabelClass}>{btn.label}</span>
            )}
            {iconPosition === "right" && btn.icon && (
              <span className={`ml-2 ${customIconClass}`}>{btn.icon}</span>
            )}
            {btn.loading && (
              <svg
                className="animate-spin h-5 w-5 ml-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12c0-4.418 1.791-8.365 4.688-11.264l5.688 5.688C9.472 6.112 7.314 9.836 8 12h-4z"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
      {resizable && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
          onMouseDown={handleResizeStart}
        ></div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .w-${buttonSize} {
            width: ${buttonSize / 2}rem;
          }
          .h-${buttonSize} {
            height: ${buttonSize / 2}rem;
          }
          .p-3 {
            padding: 0.75rem;
          }
          .mt-2 {
            margin-top: 0.5rem;
          }
          .space-y-1 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
          }
          .space-x-1 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.25rem * var(--tw-space-x-reverse));
            margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
          }
        }
      `}</style>
    </div>
  );
};

export default CollapseButtonGroup;
