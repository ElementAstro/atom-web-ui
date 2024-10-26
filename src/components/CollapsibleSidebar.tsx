// src/components/CollapsibleSidebar.tsx
import React, {
  useState,
  useRef,
  DragEvent,
  KeyboardEvent,
} from "react";
import { useTheme } from "../context/ThemeContext";

interface CollapsibleSidebarProps {
  items: React.ReactNode[];
  theme?: "light" | "dark" | "astronomy" | "eyeCare" | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: React.ReactNode;
  fullscreen?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  draggable?: boolean;
  resizable?: boolean;
  customClass?: string;
  customButtonClass?: string;
  customItemClass?: string;
  customIconClass?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  rippleEffect?: boolean;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  items,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transition-all duration-300 ease-in-out",
  icon = null,
  fullscreen = false,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Collapsible sidebar",
  draggable = false,
  resizable = false,
  customClass = "",
  customButtonClass = "",
  customItemClass = "",
  customIconClass = "",
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
  showTooltip = false,
  tooltipPosition = "top",
  rippleEffect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme: currentTheme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarSize, setSidebarSize] = useState({
    width: 256,
    height: "100%",
  });

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (draggable) {
      e.dataTransfer.setData("text/plain", sidebarRef.current!.id);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (draggable) {
      e.preventDefault();
      const droppedSidebarId = e.dataTransfer.getData("text/plain");
      const droppedSidebar = document.getElementById(droppedSidebarId);
      if (droppedSidebar && sidebarRef.current?.parentNode) {
        sidebarRef.current.parentNode.insertBefore(
          droppedSidebar,
          sidebarRef.current.nextSibling
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
    if (isResizing && sidebarRef.current) {
      setSidebarSize({
        width: e.clientX - sidebarRef.current.offsetLeft,
        height: sidebarRef.current.offsetHeight.toString(),
      });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleResize as EventListener);
    document.removeEventListener("mouseup", handleResizeEnd as EventListener);
  };

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
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
      ref={sidebarRef}
      className={`flex ${animation} ${isOpen ? "w-64" : "w-16"} h-full ${
        themeClasses[theme || currentTheme]
      } ${
        fullscreen ? "w-full h-full" : ""
      } border-${borderWidth} ${customClass}`}
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
        width: sidebarSize.width,
        height: sidebarSize.height,
        textTransform,
      }}
    >
      <div
        className={`flex flex-col p-4 space-y-4 overflow-hidden ${animation} ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`hover:bg-gray-300 rounded p-2 cursor-pointer ${customItemClass}`}
          >
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={toggleSidebar}
        className={`flex items-center justify-center w-16 bg-gray-300 rounded-l hover:bg-gray-400 ${customButtonClass}`}
        title={tooltip}
      >
        {icon || (isOpen ? "◀" : "▶")}
      </button>
      {resizable && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize"
          onMouseDown={handleResizeStart}
        ></div>
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
        @media (max-width: 768px) {
          .w-64 {
            width: 16rem;
          }
          .w-16 {
            width: 4rem;
          }
          .h-full {
            height: 100%;
          }
          .p-4 {
            padding: 1rem;
          }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(1rem * var(--tw-space-y-reverse));
          }
        }
      `}</style>
    </div>
  );
};

export default CollapsibleSidebar;
