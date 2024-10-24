// src/components/Modal.js
import React, { useEffect } from "react";
import Divider from "./Divider";

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
}) => {
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
    small: "w-1/4",
    medium: "w-1/2",
    large: "w-3/4",
  };

  const positionClasses = {
    center: "justify-center items-center",
    top: "justify-center items-start mt-10",
    bottom: "justify-center items-end mb-10",
  };

  const variantClasses = {
    primary: "bg-gray-800",
    secondary: "bg-gray-700",
    alert: "bg-red-700",
    success: "bg-green-700",
    sciFi: "bg-gradient-to-r from-purple-900 via-blue-900 to-black",
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex ${positionClasses[position]} transition-opacity duration-300 ease-in-out z-50 ${customClass}`}
      onClick={handleClose}
    >
      <div
        className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-lg p-6 transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-fade-in hover:shadow-neon relative`}
      >
        <button
          className="absolute top-3 right-3 text-white hover:text-red-500 transition duration-300"
          onClick={onClose}
        >
          X
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
