// src/components/Notification.js
import React, { useEffect } from "react";

const Notification = ({
  message,
  type,
  onClose,
  duration = 3000,
  onOpen,
  onCloseComplete,
}) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-yellow-500";

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

  return (
    <div
      className={`fixed bottom-5 right-5 ${bgColor} text-white p-4 rounded-lg shadow-lg flex justify-between items-center transform transition-transform duration-500 animate-slide-in hover:scale-105 hover:shadow-neon`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-xl font-bold hover:text-red-500 transition duration-300"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
