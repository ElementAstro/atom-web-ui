// src/components/Modal.tsx
import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  MouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
  FocusEvent,
  AnimationEvent,
} from "react";
import styled, { css, keyframes } from "styled-components";
import Divider from "./Divider";
import { useTheme } from "../context/ThemeContext";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onOpen?: () => void;
  onCloseComplete?: () => void;
  size?: "small" | "medium" | "large";
  position?: "center" | "top" | "bottom" | "left" | "right";
  variant?: "primary" | "secondary" | "alert" | "success" | "sciFi";
  header?: ReactNode;
  footer?: ReactNode;
  customClass?: string;
  customHeaderClass?: string;
  customFooterClass?: string;
  customContentClass?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  icon?: ReactNode;
  fullscreen?: boolean;
  autoClose?: boolean;
  autoCloseDuration?: number;
  iconColor?: string;
  onFocus?: (e: FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: FocusEvent<HTMLDivElement>) => void;
  onKeyDown?: (e: ReactKeyboardEvent<HTMLDivElement>) => void;
  onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
  onDoubleClick?: (e: MouseEvent<HTMLDivElement>) => void;
  ariaLabel?: string;
  hoverColor?: string;
  activeColor?: string;
  disabled?: boolean;
  disabledColor?: string;
  hoverAnimation?: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const ModalWrapper = styled.div<{ isExiting: boolean; themeClass: string }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  transition: opacity 0.3s ease-in-out;
  z-index: 50;
  ${(props) =>
    props.isExiting
      ? css`
          animation: ${fadeOut} 0.3s forwards;
        `
      : css`
          animation: ${fadeIn} 0.3s forwards;
        `}
  ${(props) => props.themeClass}
`;

const ModalContent = styled.div<{ sizeClass: string; variantClass: string }>`
  border-radius: 0.5rem;
  padding: 1.5rem;
  transform: scale(0.95);
  opacity: 0;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  ${(props) => props.sizeClass}
  ${(props) => props.variantClass}
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  onOpen,
  onCloseComplete,
  size = "medium",
  position = "center",
  variant = "primary",
  header,
  footer,
  customClass = "",
  customHeaderClass = "",
  customFooterClass = "",
  customContentClass = "",
  theme,
  tooltip = "",
  borderWidth = "2",
  icon = <AiOutlineClose />,
  fullscreen = false,
  autoClose = false,
  autoCloseDuration = 5000,
  iconColor = "text-gray-400",
  onFocus,
  onBlur,
  onKeyDown,
  onAnimationEnd,
  onDoubleClick,
  ariaLabel = "模态框",
  hoverColor = "",
  activeColor = "",
  disabled = false,
  disabledColor = "opacity-50 cursor-not-allowed",
  hoverAnimation = "hover:scale-105 hover:shadow-neon",
}) => {
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsExiting(true);
    }
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsExiting(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExiting(true);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      if (onOpen) onOpen();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (!isOpen && onCloseComplete) onCloseComplete();
    };
  }, [isOpen, onClose, onOpen, onCloseComplete]);

  useEffect(() => {
    if (isOpen && autoClose) {
      timerRef.current = setTimeout(() => {
        setIsExiting(true);
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onClose();
        setIsExiting(false);
      }, 300); // Duration of the exit animation

      return () => clearTimeout(timer);
    }
  }, [isExiting, onClose]);

  if (!isOpen && !isExiting) return null;

  const sizeClasses = {
    small: "w-11/12 sm:w-1/4",
    medium: "w-11/12 sm:w-1/2",
    large: "w-11/12 sm:w-3/4",
  };

  const positionClasses = {
    center: "justify-center items-center",
    top: "justify-center items-start mt-10",
    bottom: "justify-center items-end mb-10",
    left: "justify-start items-center ml-10",
    right: "justify-end items-center mr-10",
  };

  const variantClasses = {
    primary: "bg-gray-800",
    secondary: "bg-gray-700",
    alert: "bg-red-700",
    success: "bg-green-700",
    sciFi: "bg-gradient-to-r from-purple-900 via-blue-900 to-black",
  };

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset: "bg-orange-100 text-orange-900 border-orange-300",
    ocean: "bg-blue-100 text-blue-900 border-blue-300",
    forest: "bg-green-100 text-green-900 border-green-300",
    astronomyDarkRed: "bg-red-100 text-red-900 border-red-300",
  };

  return (
    <ModalWrapper
      isExiting={isExiting}
      themeClass={`${positionClasses[position]} ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[theme || currentTheme]}`}
      onClick={handleClose}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onAnimationEnd={onAnimationEnd}
      onDoubleClick={onDoubleClick}
      aria-label={ariaLabel}
    >
      <ModalContent
        sizeClass={`${sizeClasses[size]} rounded-lg p-6 relative border-${borderWidth} ${hoverColor} ${activeColor} ${
          disabled ? disabledColor : ""
        } ${hoverAnimation}`}
        variantClass={variantClasses[variant]}
      >
        <button
          className={`absolute top-3 right-3 ${iconColor} hover:text-red-500 transition duration-300`}
          onClick={handleButtonClick}
          title={tooltip}
        >
          {icon}
        </button>
        {header && (
          <div className={`mb-4 ${customHeaderClass}`}>
            {header}
            <Divider />
          </div>
        )}
        <div className={`my-4 ${customContentClass}`}>{children}</div>
        {footer && (
          <div className={`mt-4 ${customFooterClass}`}>
            <Divider />
            {footer}
          </div>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;