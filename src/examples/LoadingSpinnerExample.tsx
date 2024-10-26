import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const LoadingSpinnerExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleStart = () => {
    console.log("Loading started");
  };

  const handleStop = () => {
    console.log("Loading stopped");
  };

  const handleClose = () => {
    setIsLoading(false);
    console.log("Loading spinner closed");
  };

  return (
    <div className="p-4">
      {isLoading && (
        <LoadingSpinner
          size="12"
          color="blue"
          speed="normal"
          onStart={handleStart}
          onStop={handleStop}
          label="Loading..."
          labelPosition="bottom"
          thickness="4"
          backgroundColor="transparent"
          animation="spin"
          theme="ocean"
          tooltip="Loading spinner"
          borderWidth="2"
          icon={null}
          fullscreen={false}
          progress={50}
          onClose={handleClose}
          customAnimation=""
          customClass="my-custom-spinner"
          customIconClass="my-custom-icon"
          customProgressClass="my-custom-progress"
          customButtonClass="my-custom-button"
        />
      )}
      <button
        onClick={() => setIsLoading(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Show Loading Spinner
      </button>
    </div>
  );
};

export default LoadingSpinnerExample;
