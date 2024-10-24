// src/components/Toast.js
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Toast = ({
  message,
  onClose,
  duration = 3000,
  onOpen,
  onCloseComplete,
  variant = "info",
  position = "bottom-right",
  customClass = "",
  customMessageClass = "",
  customButtonClass = "",
}) => {
  useEffect(() => {
    if (onOpen) onOpen();
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer); // 清除定时器
      if (onCloseComplete) onCloseComplete();
    };
  }, [onClose, duration, onOpen, onCloseComplete]);

  const variantClasses = {
    info: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
    success: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
    warning: "bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700",
    error: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} ${variantClasses[variant]} text-white p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-fade-in hover:scale-105 hover:shadow-neon z-50 ${customClass}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={`flex items-center ${customMessageClass}`}>
        {message}
        <button
          className={`ml-3 text-sm hover:text-red-400 transition duration-300 ${customButtonClass}`}
          onClick={onClose}
          onKeyDown={(e) => e.key === "Enter" && onClose()}
          aria-label="Close"
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Toast;
