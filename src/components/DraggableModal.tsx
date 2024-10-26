// src/components/DraggableModal.tsx
import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  KeyboardEvent,
} from "react";
import {
  AiOutlineClose,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { useTheme } from "../context/ThemeContext";

interface DraggableModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
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
  icon?: React.ReactNode;
  fullscreen?: boolean;
  resizable?: boolean;
  header?: string;
  autoClose?: boolean;
  autoCloseDuration?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  customClass?: string;
  customHeaderClass?: string;
  customContentClass?: string;
  customFooterClass?: string;
  customButtonClass?: string;
  customIconClass?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
  showCloseButton?: boolean;
  closeButtonColor?: string;
  closeButtonPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  showFullscreenButton?: boolean;
  fullscreenButtonColor?: string;
}

const DraggableModal: React.FC<DraggableModalProps> = ({
  isOpen,
  onClose,
  children,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transition-transform duration-300 ease-in-out",
  icon = <AiOutlineClose />,
  fullscreen = false,
  resizable = false,
  header = "Modal Title",
  autoClose = false,
  autoCloseDuration = 5000,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "Draggable Modal",
  customClass = "",
  customHeaderClass = "",
  customContentClass = "",
  customFooterClass = "",
  customButtonClass = "",
  customIconClass = "",
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
  showCloseButton = true,
  closeButtonColor = "text-red-600",
  closeButtonPosition = "top-right",
  showFullscreenButton = true,
  fullscreenButtonColor = "text-blue-600",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [size, setSize] = useState({ width: "auto", height: "auto" });
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPosition({ top: "50%", left: "50%" });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: WindowEventMap["keydown"]) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

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

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setOffset({
      x: e.clientX - modalRef.current!.getBoundingClientRect().left,
      y: e.clientY - modalRef.current!.getBoundingClientRect().top,
    });
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newTop = e.clientY - offset.y;
      const newLeft = e.clientX - offset.x;
      const modalRect = modalRef.current!.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const clampedTop = Math.max(
        0,
        Math.min(newTop, viewportHeight - modalRect.height)
      );
      const clampedLeft = Math.max(
        0,
        Math.min(newLeft, viewportWidth - modalRect.width)
      );

      setPosition({
        top: `${clampedTop}px`,
        left: `${clampedLeft}px`,
      });
    }
  };

  const handleResize = (e: MouseEvent<HTMLDivElement>, direction: string) => {
    if (resizable) {
      const modalRect = modalRef.current!.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newWidth = modalRect.width;
      let newHeight = modalRect.height;

      if (direction === "right") {
        newWidth = Math.min(
          viewportWidth - modalRect.left,
          e.clientX - modalRect.left
        );
      } else if (direction === "bottom") {
        newHeight = Math.min(
          viewportHeight - modalRect.top,
          e.clientY - modalRect.top
        );
      } else if (direction === "bottom-right") {
        newWidth = Math.min(
          viewportWidth - modalRect.left,
          e.clientX - modalRect.left
        );
        newHeight = Math.min(
          viewportHeight - modalRect.top,
          e.clientY - modalRect.top
        );
      }

      setSize({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) {
    return null;
  }

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

  const closeButtonPositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center transition-opacity duration-300 ${
        isFullscreen ? "w-full h-full" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ opacity: isOpen ? 1 : 0 }}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <div
        ref={modalRef}
        className={`rounded shadow-lg p-4 ${animation} ${
          themeClasses[theme || currentTheme]
        } border-${borderWidth} ${customClass}`}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          cursor: "move",
          transform: isOpen ? "scale(1)" : "scale(0.9)",
          width: size.width,
          height: size.height,
        }}
        onMouseDown={handleMouseDown}
      >
        <div
          className={`flex justify-between items-center mb-4 ${customHeaderClass}`}
        >
          <h2 className="text-lg font-bold">{header}</h2>
          <div className="flex space-x-2">
            {showFullscreenButton && (
              <button
                onClick={toggleFullscreen}
                className={`${fullscreenButtonColor} ${customButtonClass}`}
                title="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <AiOutlineFullscreenExit className={customIconClass} />
                ) : (
                  <AiOutlineFullscreen className={customIconClass} />
                )}
              </button>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`${closeButtonColor} ${customButtonClass}`}
                title={tooltip}
              >
                {icon}
              </button>
            )}
          </div>
        </div>
        <div className={customContentClass}>{children}</div>
        {resizable && (
          <>
            <div
              className="absolute right-0 bottom-0 w-4 h-4 bg-transparent cursor-se-resize"
              onMouseDown={(e) => handleResize(e, "bottom-right")}
            />
            <div
              className="absolute right-0 top-0 w-4 h-full bg-transparent cursor-e-resize"
              onMouseDown={(e) => handleResize(e, "right")}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-4 bg-transparent cursor-s-resize"
              onMouseDown={(e) => handleResize(e, "bottom")}
            />
          </>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .p-4 {
            padding: 1rem;
          }
          .text-lg {
            font-size: 1.125rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .w-4 {
            width: 1rem;
          }
          .h-4 {
            height: 1rem;
          }
          .h-full {
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default DraggableModal;
