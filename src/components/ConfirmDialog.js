// src/components/ConfirmDialog.js
import React, { useEffect } from "react";

const ConfirmDialog = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  onOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    } else if (!isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-100">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-300 ease-in-out scale-100 hover:scale-105 hover:shadow-neon">
        <h3 className="text-lg font-bold text-white">{message}</h3>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            onKeyDown={(e) => e.key === "Enter" && onCancel()}
            className="mr-2 text-gray-300 hover:text-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            onKeyDown={(e) => e.key === "Enter" && onConfirm()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
