// src/components/Alert.js
import React, { useState, useEffect } from "react";

const Alert = ({
  message,
  severity,
  onClose,
  onOpen,
  customClass = "",
  customMessageClass = "",
  customButtonClass = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible && onOpen) {
      onOpen();
    }
  }, [isVisible, onOpen]);

  const bgColor = severity === "error" ? "bg-red-900" : "bg-blue-900";
  const textColor = severity === "error" ? "text-red-300" : "text-blue-300";
  const borderColor =
    severity === "error" ? "border-red-500" : "border-blue-500";

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // 等待动画结束后再调用 onClose
  };

  return (
    isVisible && (
      <div
        className={`border-l-4 ${borderColor} ${bgColor} ${textColor} p-4 my-2 rounded transition-opacity duration-300 ease-in-out opacity-100 transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 ${customClass}`}
      >
        <div className="flex justify-between items-center">
          <span className={`flex-1 ${customMessageClass}`}>{message}</span>
          <button
            onClick={handleClose}
            onKeyDown={(e) => e.key === "Enter" && handleClose()}
            tabIndex={0}
            className={`text-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-600 ${customButtonClass}`}
          >
            ✕
          </button>
        </div>
      </div>
    )
  );
};

export default Alert;
