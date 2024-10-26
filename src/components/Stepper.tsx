// src/components/Stepper.tsx
import React, { FC, ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";

interface StepperProps {
  steps: Array<{ label?: string } | string>;
  currentStep: number;
  onStepClick?: (index: number) => void;
  disabledSteps?: number[];
  activeColor?: string;
  inactiveColor?: string;
  activeBorderColor?: string;
  inactiveBorderColor?: string;
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
  completedColor?: string;
  stepSize?: string;
  lineThickness?: string;
  theme?:
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "desert"
    | "astronomyDarkRed";
  tooltip?: string;
  borderWidth?: string;
  animation?: string;
  icon?: ReactNode;
  fullscreen?: boolean;
  onDoubleClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  showProgress?: boolean;
  progressColor?: string;
  progressHeight?: string;
  rippleEffect?: boolean;
  rippleColor?: string;
  rippleDuration?: number;
  showTooltip?: boolean;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const Stepper: FC<StepperProps> = ({
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
  theme,
  tooltip = "",
  borderWidth = "2",
  animation = "transition duration-300 transform hover:scale-110",
  icon = null,
  fullscreen = false,
  onDoubleClick,
  onKeyDown,
  showProgress = false,
  progressColor = "bg-blue-500",
  progressHeight = "h-1",
  rippleEffect = true,
  rippleColor = "rgba(255, 255, 255, 0.6)",
  rippleDuration = 600,
  showTooltip = false,
  tooltipPosition = "top",
}) => {
  const isHorizontal = orientation === "horizontal";
  const { theme: currentTheme } = useTheme();

  type ThemeKeys =
    | "light"
    | "dark"
    | "astronomy"
    | "eyeCare"
    | "sunset"
    | "ocean"
    | "forest"
    | "desert"
    | "astronomyDarkRed";

  const themeClasses: Record<ThemeKeys, string> = {
    light: "bg-white text-gray-900 border-gray-300",
    dark: "bg-gray-900 text-white border-gray-700",
    astronomy:
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500",
    eyeCare: "bg-green-100 text-green-900 border-green-300",
    sunset:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-pink-500",
    ocean:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white border-teal-500",
    forest:
      "bg-gradient-to-r from-green-500 to-lime-500 text-white border-green-500",
    desert:
      "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-500",
    astronomyDarkRed:
      "bg-gradient-to-r from-red-900 via-black to-black text-white border-red-500",
  };

  const createRipple = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.style.background = rippleColor;
    ripple.classList.add("ripple");
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, rippleDuration);
  };

  const tooltipClasses = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row space-x-4" : "flex-col space-y-4"
      } items-center justify-center ${fullscreen ? "w-full h-full" : ""} ${
        themeClasses[(theme as ThemeKeys) || (currentTheme as ThemeKeys)]
      }`}
    >
      {showProgress && (
        <div className={`absolute top-0 left-0 w-full ${progressHeight}`}>
          <div
            className={`${progressColor} h-full`}
            style={{ width: `${((currentStep + 1) * 100) / steps.length}%` }}
          ></div>
        </div>
      )}
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex ${
            isHorizontal ? "flex-row" : "flex-col"
          } items-center`}
        >
          <div
            className={`relative flex items-center justify-center rounded-full border-${borderWidth} ${animation} ${stepSize} ${
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
            onClick={(e) => {
              if (!disabledSteps.includes(index) && onStepClick) {
                onStepClick(index);
                if (rippleEffect) createRipple(e);
              }
            }}
            role="button"
            aria-label={`Step ${index + 1}: ${
              typeof step === "string" ? step : step.label
            }`}
            aria-current={currentStep === index ? "step" : undefined}
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !disabledSteps.includes(index) &&
                onStepClick
              ) {
                onStepClick(index);
              }
            }}
            onDoubleClick={onDoubleClick}
            title={tooltip}
          >
            {icon || index + 1}
            {showTooltip && (
              <div className={`tooltip ${tooltipClasses[tooltipPosition]}`}>
                {tooltip}
              </div>
            )}
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
          {showLabels && typeof step !== "string" && step.label && (
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
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple ${rippleDuration}ms linear;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          white-space: nowrap;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .tooltip-top {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 0.5rem;
        }
        .tooltip-bottom {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 0.5rem;
        }
        .tooltip-left {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 0.5rem;
        }
        .tooltip-right {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
        }
        .ripple:hover .tooltip {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Stepper;
