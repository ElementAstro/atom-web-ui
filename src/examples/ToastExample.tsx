import React, { useState } from "react";
import Toast from "../components/Toast";

const ToastExample: React.FC = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleShowToast}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Toast
      </button>
      {showToast && (
        <Toast
          message="This is a toast notification!"
          onClose={handleCloseToast}
          duration={3000}
          variant="success"
          position="top-right"
          customClass="my-custom-toast"
          customMessageClass="my-custom-message"
          customButtonClass="my-custom-button"
          theme="light"
          tooltip="This is a toast"
          borderWidth="2"
          icon={<span>🔔</span>}
          fullscreen={false}
          size="medium"
          onDoubleClick={() => console.log("Toast double-clicked")}
          onKeyDown={(e) => console.log("Key down on toast", e)}
          ariaLabel="示例通知"
        />
      )}
    </div>
  );
};

export default ToastExample;