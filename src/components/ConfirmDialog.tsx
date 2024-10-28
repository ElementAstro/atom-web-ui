// src/components/ConfirmDialog.tsx
import React, { useEffect, useRef, KeyboardEvent, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useTheme } from "../context/ThemeContext";

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  title?: string;
  icon?: React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  disableConfirm?: boolean;
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
  iconPosition?: "top" | "bottom" | "left" | "right";
  autoClose?: boolean;
  autoCloseDuration?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onAnimationEnd?: () => void;
  ariaLabel?: string;
  showCloseButton?: boolean;
  closeButtonColor?: string;
  closeButtonPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  customClass?: string;
  customButtonClass?: string;
  customIconClass?: string;
  customTitleClass?: string;
  customMessageClass?: string;
  customDialogClass?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  borderStyle?: string;
  borderColor?: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
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

const DialogWrapper = styled.div<{ isExiting: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-center: center;
  align-items: center;
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
`;

const DialogContent = styled.div<{ themeClass: string }>`
  border-radius: 0.5rem;
  padding: 1.5rem;
  transform: scale(0.95);
  opacity: 0;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  max-width: 500px;
  width: 100%;
  ${(props) => props.themeClass}
  ${(props) =>
    props.themeClass.includes("bg-gradient")
      ? css`
          background: linear-gradient(
            to right,
            #ff7e5f,
            #feb47b
          ); /* Example gradient */
        `
      : ""}
`;

const Button = styled.button<{ color: string }>`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
      color: white;
    `}
  &:hover {
    background-color: darken(${(props) => props.color}, 10%);
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  onOpen,
  onClose,
  title,
  icon,
  confirmButtonText = "确认",
  cancelButtonText = "取消",
  confirmButtonColor = "bg-blue-600",
  cancelButtonColor = "text-gray-300",
  disableConfirm = false,
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transform transition-transform duration-300 ease-in-out",
  iconPosition = "top",
  autoClose = false,
  autoCloseDuration = 5000,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onAnimationEnd,
  ariaLabel = "确认对话框",
  showCloseButton = false,
  closeButtonColor = "text-gray-300",
  closeButtonPosition = "top-right",
  customClass = "",
  customButtonClass = "",
  customIconClass = "",
  customTitleClass = "",
  customMessageClass = "",
  customDialogClass = "",
  shadow = true,
  hoverEffect = true,
  borderStyle = "solid",
  borderColor = "gray-300",
  textTransform = "none",
}) => {
  const { theme: currentTheme } = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    } else if (!isOpen && onClose) {
      onClose();
    }

    if (isOpen && autoClose) {
      timerRef.current = setTimeout(() => {
        onCancel();
      }, autoCloseDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, onOpen, onClose, autoClose, autoCloseDuration, onCancel]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onCancel();
    }
    if (onKeyDown) onKeyDown(e);
  };

  if (!isOpen) return null;

  const themeClasses: Record<string, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
    ocean: "bg-blue-100 text-blue-900",
    sunset: "bg-orange-100 text-orange-900",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white",
  };

  const closeButtonPositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <DialogWrapper
      isExiting={isExiting}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <DialogContent
        themeClass={`${
          themeClasses[theme || currentTheme]
        } ${customDialogClass}`}
      >
        {showCloseButton && (
          <button
            onClick={onCancel}
            className={`absolute ${closeButtonPositionClasses[closeButtonPosition]} ${closeButtonColor} hover:text-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600`}
            title="关闭"
          >
            ✕
          </button>
        )}
        {icon && iconPosition === "top" && (
          <div className={`flex justify-center mb-4 ${customIconClass}`}>
            {icon}
          </div>
        )}
        {title && (
          <h2 className={`text-xl font-bold mb-2 ${customTitleClass}`}>
            {title}
          </h2>
        )}
        <h3 className={`text-lg font-bold ${customMessageClass}`}>{message}</h3>
        <div className="flex justify-end mt-4">
          <Button
            onClick={onCancel}
            onKeyDown={(e) => e.key === "Enter" && onCancel()}
            color={cancelButtonColor}
            className={`mr-2 hover:text-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 border-${borderWidth} ${customButtonClass}`}
            title={tooltip}
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={onConfirm}
            onKeyDown={(e) => e.key === "Enter" && onConfirm()}
            color={confirmButtonColor}
            className={`text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 border-${borderWidth} ${customButtonClass}`}
            disabled={disableConfirm}
            title={tooltip}
          >
            {confirmButtonText}
          </Button>
        </div>
      </DialogContent>
    </DialogWrapper>
  );
};

export default ConfirmDialog;
