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
  orientation?: "horizontal" | "vertical";
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  rippleEffect?: boolean;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
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
  orientation = "horizontal",
  showTooltip = false,
  tooltipPosition = "top",
  rippleEffect = false,
  shadow = false,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme();

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
    <div
      ref={dividerRef}
      id="divider"
      className={`flex ${
        orientation === "vertical" ? "flex-col h-full" : "items-center my-4"
      } ${animation} ${
        hoverEffect ? "hover:scale-105 hover:shadow-neon" : ""
      } ${customClass} ${themeClasses[theme || currentTheme]}`}
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
      style={{ textTransform }}
    >
      <div
        className={`flex-1 ${
          orientation === "vertical" ? "border-l" : "border-t"
        } border-${borderColor} border-${borderWidth} ${customLineClass}`}
      ></div>
      {(title || icon) && (
        <span
          className={`mx-4 text-gray-600 hover:text-white transition-colors duration-300 ${customTitleClass}`}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </span>
      )}
      <div
        className={`flex-1 ${
          orientation === "vertical" ? "border-l" : "border-t"
        } border-${borderColor} border-${borderWidth} ${customLineClass}`}
      ></div>
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
    </div>
  );
};

export default Divider;
