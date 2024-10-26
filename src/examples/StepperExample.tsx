import React, { useState } from "react";
import Stepper from "../components/Stepper";

const StepperExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
    { label: "Step 4" },
  ];

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    console.log("Step clicked:", index);
  };

  return (
    <div className="p-4">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        theme="light"
        tooltip="Click to navigate"
        borderWidth="2"
        animation="transform transition-transform duration-300 ease-in-out"
        icon={null}
        fullscreen={false}
        showProgress={true}
        progressColor="bg-blue-500"
        progressHeight="h-1"
        rippleEffect={true}
        rippleColor="rgba(255, 255, 255, 0.6)"
        rippleDuration={600}
        showTooltip={true}
        tooltipPosition="top"
      />
    </div>
  );
};

export default StepperExample;