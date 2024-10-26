import React, { useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

const LoadingOverlayExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleShow = () => {
    console.log("Loading overlay shown");
  };

  const handleHide = () => {
    console.log("Loading overlay hidden");
  };

  const handleClose = () => {
    setIsLoading(false);
    console.log("Loading overlay closed");
  };

  return (
    <div className="p-4">
      {isLoading && (
        <LoadingOverlay
          loadingText="Loading, please wait..."
          onShow={handleShow}
          onHide={handleHide}
          theme="ocean"
          tooltip="Loading overlay"
          borderWidth="4"
          animation="animate-spin"
          icon={<span>🔄</span>}
          progress={50}
          onClose={handleClose}
          closable={true}
          customClass="my-custom-loading-overlay"
          customIconClass="my-custom-icon"
          customProgressClass="my-custom-progress"
          customButtonClass="my-custom-button"
        />
      )}
      <button
        onClick={() => setIsLoading(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Show Loading Overlay
      </button>
    </div>
  );
};

export default LoadingOverlayExample;