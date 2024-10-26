// src/components/ConfirmDialog.tsx
import React, { useEffect, useRef, KeyboardEvent } from "react";
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
}

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
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-100 ${animation}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      onAnimationEnd={onAnimationEnd}
      aria-label={ariaLabel}
    >
      <div
        className={`rounded-lg shadow-lg p-6 transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105 hover:shadow-neon w-full max-w-md mx-4 ${
          themeClasses[theme || currentTheme]
        }`}
      >
        {icon && iconPosition === "top" && (
          <div className="flex justify-center mb-4">{icon}</div>
        )}
        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
        <h3 className="text-lg font-bold">{message}</h3>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            onKeyDown={(e) => e.key === "Enter" && onCancel()}
            className={`mr-2 ${cancelButtonColor} hover:text-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 border-${borderWidth}`}
            title={tooltip}
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onConfirm}
            onKeyDown={(e) => e.key === "Enter" && onConfirm()}
            className={`${confirmButtonColor} text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 border-${borderWidth}`}
            disabled={disableConfirm}
            title={tooltip}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .p-6 {
            padding: 1.5rem;
          }
          .text-lg {
            font-size: 1rem;
          }
          .text-xl {
            font-size: 1.25rem;
          }
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .mr-2 {
            margin-right: 0.5rem;
          }
          .mt-4 {
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfirmDialog;
