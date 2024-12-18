// src/components/Drawer.tsx
import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from "react";
import {
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  customClass?: string;
  closeButton?: boolean;
  closeButtonContent?: ReactNode;
  draggable?: boolean;
  maximizable?: boolean;
  direction?: "right" | "left" | "top" | "bottom";
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "desert";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  iconColor?: string;
  fullscreen?: boolean;
  autoClose?: boolean;
  autoCloseDuration?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onAnimationEnd?: () => void;
  onDoubleClick?: () => void;
  ariaLabel?: string;
  showProgress?: boolean;
  progressColor?: string;
  progressHeight?: string;
  rippleEffect?: boolean;
  rippleColor?: string;
  rippleDuration?: number;
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  width?: string;
  additionalButtons?: {
    icon: ReactNode;
    onClick: () => void;
    tooltip?: string;
  }[];
  onCloseComplete?: () => void;
  onOpen?: () => void;
  dockable?: boolean;
  resizable?: boolean;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  customClass = "",
  closeButton = true,
  closeButtonContent = <AiOutlineClose />,
  draggable = false,
  maximizable = false,
  direction = "right",
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconColor = "text-gray-400",
  fullscreen = false,
  autoClose = false,
  autoCloseDuration = 5000,
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
  onDoubleClick,
  ariaLabel = "Drawer",
  showProgress = false,
  progressColor = "bg-blue-500",
  progressHeight = "h-1",
  rippleEffect = true,
  rippleColor = "rgba(255, 255, 255, 0.6)",
  rippleDuration = 600,
  showTooltip = false,
  tooltipPosition = "top",
  width = "64",
  additionalButtons = [],
  onCloseComplete,
  onOpen,
  dockable = false,
  resizable = false,
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
    if (!isOpen && onCloseComplete) {
      onCloseComplete();
    }
  }, [isOpen, onOpen, onCloseComplete]);

  useEffect(() => {
    const handleKeyDown = (e: WindowEventMap["keydown"]) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && autoClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggable) {
      const rect = drawerRef.current!.getBoundingClientRect();
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
    if (draggable) {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      drawerRef.current!.style.left = `${e.clientX - data.offsetX}px`;
      drawerRef.current!.style.top = `${e.clientY - data.offsetY}px`;
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const handleDock = () => {
    setIsDocked(!isDocked);
  };

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.style.background = rippleColor;
    ripple.classList.add("ripple");
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, rippleDuration);
  };

  const directionClasses = {
    right: `right-0 top-0 h-full w-${width}`,
    left: `left-0 top-0 h-full w-${width}`,
    top: `top-0 left-0 w-full h-${width}`,
    bottom: `bottom-0 left-0 w-full h-${width}`,
  };

  const transformClasses = {
    right: isOpen ? "translate-x-0" : "translate-x-full",
    left: isOpen ? "translate-x-0" : "-translate-x-full",
    top: isOpen ? "translate-y-0" : "-translate-y-full",
    bottom: isOpen ? "translate-y-0" : "translate-y-full",
  };

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
    forest:
      "bg-gradient-to-r from-green-500 to-lime-500 text-white border-green-500",
    desert:
      "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-500",
  };

  const tooltipClasses = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      {showProgress && (
        <div className={`absolute top-0 left-0 w-full ${progressHeight}`}>
          <div
            className={`${progressColor} h-full`}
            style={{ width: `${isOpen ? 100 : 0}%` }}
          ></div>
        </div>
      )}
      <div
        ref={drawerRef}
        className={`fixed ${
          directionClasses[direction]
        } shadow-lg transform transition-transform duration-300 ${
          transformClasses[direction]
        } ${isMaximized ? "w-full h-full" : ""} ${
          isDocked ? "docked" : ""
        } ${customClass} ${
          themeClasses[theme || currentTheme]
        } border-${borderWidth} ${animation}`}
        onClick={(e) => e.stopPropagation()}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onAnimationEnd={onAnimationEnd}
        onDoubleClick={onDoubleClick}
        aria-label={ariaLabel}
      >
        {closeButton && (
          <button
            onClick={(e) => {
              onClose();
              if (rippleEffect) createRipple(e);
            }}
            className={`absolute top-4 right-4 ${iconColor} hover:text-gray-400`}
            title={tooltip}
          >
            {closeButtonContent}
            {showTooltip && (
              <div className={`tooltip ${tooltipClasses[tooltipPosition]}`}>
                {tooltip}
              </div>
            )}
          </button>
        )}
        {maximizable && (
          <button
            onClick={handleMaximize}
            className={`absolute top-4 right-16 ${iconColor} hover:text-gray-400`}
          >
            {isMaximized ? <AiOutlineCompress /> : <AiOutlineExpand />}
          </button>
        )}
        {fullscreen && (
          <button
            onClick={handleFullscreen}
            className={`absolute top-4 right-28 ${iconColor} hover:text-gray-400`}
          >
            {document.fullscreenElement ? (
              <AiOutlineFullscreenExit />
            ) : (
              <AiOutlineFullscreen />
            )}
          </button>
        )}
        {dockable && (
          <button
            onClick={handleDock}
            className={`absolute top-4 right-40 ${iconColor} hover:text-gray-400`}
          >
            {isDocked ? "Undock" : "Dock"}
          </button>
        )}
        {additionalButtons.map((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick}
            className={`absolute top-4 right-${
              52 + index * 12
            } ${iconColor} hover:text-gray-400`}
            title={btn.tooltip}
          >
            {btn.icon}
          </button>
        ))}
        <div className="p-4">{children}</div>
      </div>
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple ${rippleDuration}ms linear;
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
        button:hover .tooltip {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .w-${width} {
            width: 100%;
          }
          .h-${width} {
            height: 100%;
          }
        }
        .docked {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: auto;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Drawer;
