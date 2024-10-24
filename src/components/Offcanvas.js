import React, { useEffect } from "react";

const Offcanvas = ({
  isOpen,
  onClose,
  onOpen,
  onCloseComplete,
  children,
  customClass = "",
  closeButton = true,
  closeButtonContent = "Close",
}) => {
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
    if (!isOpen && onCloseComplete) {
      onCloseComplete();
    }
  }, [isOpen, onOpen, onCloseComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${customClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {closeButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-400"
          >
            {closeButtonContent}
          </button>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Offcanvas;
