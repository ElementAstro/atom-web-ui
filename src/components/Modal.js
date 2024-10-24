// src/components/Modal.js
import React, { useEffect } from "react";
import Divider from "./Divider";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Modal = ({
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
  direction = "center", // 新增方向属性
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transform transition-transform duration-300 ease-in-out", // 新增属性
  icon = "X", // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const handleClose = (e) => {
    // 确保用户单击的是背景而不是模态框内部
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
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

  if (!isOpen) return null;

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

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex ${
        positionClasses[position]
      } transition-opacity duration-300 ease-in-out z-50 ${customClass} ${
        fullscreen ? "w-full h-full" : ""
      } ${themeClasses[theme || currentTheme]}`}
      onClick={handleClose}
    >
      <div
        className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-lg p-6 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-fade-in hover:shadow-neon relative border-${borderWidth}`}
      >
        <button
          className="absolute top-3 right-3 text-white hover:text-red-500 transition duration-300"
          onClick={onClose}
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
      </div>
    </div>
  );
};

export default Modal;
