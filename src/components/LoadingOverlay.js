import React, { useEffect } from "react";

const LoadingOverlay = ({ loadingText = "Loading...", onShow, onHide }) => {
  useEffect(() => {
    if (onShow) onShow();
    return () => {
      if (onHide) onHide();
    };
  }, [onShow, onHide]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-transparent rounded-full shadow-neon"></div>
        <span className="text-white text-lg font-semibold">{loadingText}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
