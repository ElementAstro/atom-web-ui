// src/components/ConfirmDialog.js
import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ConfirmDialog = ({
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
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    } else if (!isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  if (!isOpen) return null;

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white",
    eyeCare: "bg-green-100 text-green-900",
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-100 ${animation}`}
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
      <style jsx>{`
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
