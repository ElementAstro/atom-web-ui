import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";

const ProgressBarExample: React.FC = () => {
  const [progress, setProgress] = useState(50);

  const handleProgressChange = (value: number) => {
    console.log("Progress changed:", value);
  };

  const handleProgressComplete = () => {
    console.log("Progress complete");
  };

  return (
    <div className="p-4">
      <ProgressBar
        progress={progress}
        onProgressChange={handleProgressChange}
        onProgressComplete={handleProgressComplete}
        label="Loading..."
        size="medium"
        showPercentage={true}
        showLabel={true}
        showTooltip={true}
        tooltipText="Progress"
        variant="info"
        height="medium"
        striped={true}
        animated={true}
        customClass="my-custom-progress-bar"
        customProgressClass="my-custom-progress"
        customLabelClass="my-custom-label"
        customPercentageClass="my-custom-percentage"
        theme="ocean"
        tooltip="Progress bar"
        borderWidth="2"
        icon={<span>🔄</span>}
        fullscreen={false}
        customTooltipClass="my-custom-tooltip"
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

export default ProgressBarExample;