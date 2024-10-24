import React from "react";

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  disabledSteps = [],
  activeColor = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
  inactiveColor = "bg-gray-700",
  activeBorderColor = "border-purple-500",
  inactiveBorderColor = "border-gray-600",
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`h-10 w-10 flex items-center justify-center rounded-full border-2 transition duration-300 transform hover:scale-110 ${
              currentStep === index
                ? `${activeColor} ${activeBorderColor} text-white shadow-neon`
                : `${inactiveColor} ${inactiveBorderColor} text-gray-400 ${
                    disabledSteps.includes(index)
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`
            }`}
            onClick={() => {
              if (!disabledSteps.includes(index) && onStepClick) {
                onStepClick(index);
              }
            }}
            role="button"
            aria-label={`Step ${index + 1}: ${step.label || step}`}
            aria-current={currentStep === index ? "step" : undefined}
            tabIndex={0}
            onKeyPress={(e) => {
              if (
                e.key === "Enter" &&
                !disabledSteps.includes(index) &&
                onStepClick
              ) {
                onStepClick(index);
              }
            }}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-16 transition duration-300 ${
                currentStep > index ? `${activeColor}` : "bg-gray-600"
              }`}
            />
          )}
          {step.label && (
            <span className="ml-2 text-sm text-gray-500">{step.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
