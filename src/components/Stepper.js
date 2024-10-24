import React from "react";
import { useTheme } from "../context/ThemeContext"; // 确保已创建并导入 ThemeContext

const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  disabledSteps = [],
  activeColor = "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
  inactiveColor = "bg-gray-700",
  activeBorderColor = "border-purple-500",
  inactiveBorderColor = "border-gray-600",
  orientation = "horizontal",
  showLabels = true,
  completedColor = "bg-green-500",
  stepSize = "h-10 w-10",
  lineThickness = "h-1",
  theme, // 新增属性
  tooltip = "", // 新增属性
  borderWidth = "2", // 新增属性
  animation = "transition duration-300 transform hover:scale-110", // 新增属性
  icon = null, // 新增属性
  fullscreen = false, // 新增属性
}) => {
  const isHorizontal = orientation === "horizontal";
  const { theme: currentTheme } = useTheme(); // 获取当前主题

  const themeClasses = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy: "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
  };

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row space-x-4" : "flex-col space-y-4"
      } items-center justify-center ${fullscreen ? "w-full h-full" : ""} ${
        themeClasses[theme || currentTheme]
      }`}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex ${
            isHorizontal ? "flex-row" : "flex-col"
          } items-center`}
        >
          <div
            className={`flex items-center justify-center rounded-full border-${borderWidth} ${animation} ${stepSize} ${
              currentStep === index
                ? `${activeColor} ${activeBorderColor} text-white shadow-neon`
                : currentStep > index
                ? `${completedColor} ${activeBorderColor} text-white`
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
            title={tooltip}
          >
            {icon || index + 1}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`transition duration-300 ${
                isHorizontal ? "w-16" : "h-16"
              } ${
                currentStep > index ? `${activeColor}` : "bg-gray-600"
              } ${lineThickness}`}
            />
          )}
          {showLabels && step.label && (
            <span
              className={`${
                isHorizontal ? "ml-2" : "mt-2"
              } text-sm text-gray-500`}
            >
              {step.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;