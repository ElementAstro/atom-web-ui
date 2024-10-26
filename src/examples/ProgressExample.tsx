import React, { useState } from "react";
import Progress from "../components/Progress";

const ProgressExample: React.FC = () => {
  const [progress, setProgress] = useState(50);

  const handleProgressChange = (value: number) => {
    console.log("Progress changed:", value);
  };

  const handleProgressComplete = () => {
    console.log("Progress complete");
  };

  return (
    <div className="p-4">
      <Progress
        value={progress}
        max={100}
        onProgressChange={handleProgressChange}
        onProgressComplete={handleProgressComplete}
        customClass="my-custom-progress"
        customProgressClass="my-custom-progress-bar"
        customTextClass="my-custom-progress-text"
        customButtonClass="my-custom-button"
        color="linear-gradient(to right, #4caf50, #8bc34a)"
        theme="ocean"
        tooltip="Progress control"
        borderWidth="2"
        animation="transform transition-transform duration-500 ease-in-out"
        fullscreen={false}
      />
      <button
        onClick={() => setProgress((prev) => Math.min(prev + 10, 100))}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Increase Progress
      </button>
      <button
        onClick={() => setProgress((prev) => Math.max(prev - 10, 0))}
        className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Decrease Progress
      </button>
    </div>
  );
};

export default ProgressExample;