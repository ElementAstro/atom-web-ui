// src/components/Stepper.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Stepper from "./Stepper";
import { ThemeProvider } from "../context/ThemeContext";

describe("Stepper Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnStepClick = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();

  const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Stepper steps={steps} currentStep={0} />, "light");
    expect(screen.getByLabelText("Step 1: Step 1")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Stepper
        steps={steps}
        currentStep={1}
        onStepClick={mockOnStepClick}
        disabledSteps={[2]}
        activeColor="bg-blue-500"
        inactiveColor="bg-gray-300"
        activeBorderColor="border-blue-500"
        inactiveBorderColor="border-gray-300"
        orientation="vertical"
        showLabels={false}
        completedColor="bg-green-500"
        stepSize="h-12 w-12"
        lineThickness="h-2"
        theme="dark"
        tooltip="Step Tooltip"
        borderWidth="3"
        animation="transition duration-500 transform hover:scale-125"
        icon={<span>Icon</span>}
        fullscreen={true}
        onDoubleClick={mockOnDoubleClick}
        onKeyDown={mockOnKeyDown}
        showProgress={true}
        progressColor="bg-red-500"
        progressHeight="h-2"
        rippleEffect={true}
        rippleColor="rgba(0, 0, 255, 0.6)"
        rippleDuration={800}
        showTooltip={true}
        tooltipPosition="bottom"
      />,
      "dark"
    );
    expect(screen.getByLabelText("Step 2: Step 2")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("calls onStepClick when a step is clicked", () => {
    renderWithTheme(
      <Stepper steps={steps} currentStep={0} onStepClick={mockOnStepClick} />,
      "light"
    );
    fireEvent.click(screen.getByLabelText("Step 2: Step 2"));
    expect(mockOnStepClick).toHaveBeenCalledWith(1);
  });

  test("calls onDoubleClick when a step is double-clicked", () => {
    renderWithTheme(
      <Stepper
        steps={steps}
        currentStep={0}
        onDoubleClick={mockOnDoubleClick}
      />,
      "light"
    );
    fireEvent.doubleClick(screen.getByLabelText("Step 1: Step 1"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <Stepper steps={steps} currentStep={0} onKeyDown={mockOnKeyDown} />,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("Step 1: Step 1"), {
      key: "Enter",
      code: "Enter",
    });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("displays progress bar correctly", () => {
    renderWithTheme(
      <Stepper steps={steps} currentStep={1} showProgress={true} />,
      "light"
    );
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle("width: 66.6667%");
  });

  test("applies ripple effect on step click", () => {
    renderWithTheme(
      <Stepper steps={steps} currentStep={0} rippleEffect={true} />,
      "light"
    );
    const step = screen.getByLabelText("Step 1: Step 1");
    fireEvent.click(step);
    const ripple = step.querySelector(".ripple");
    expect(ripple).toBeInTheDocument();
  });

  test("displays tooltip on hover", () => {
    renderWithTheme(
      <Stepper steps={steps} currentStep={0} showTooltip={true} tooltip="Step Tooltip" />,
      "light"
    );
    const step = screen.getByLabelText("Step 1: Step 1");
    fireEvent.mouseOver(step);
    const tooltip = screen.getByText("Step Tooltip");
    expect(tooltip).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Stepper steps={steps} currentStep={0} theme="astronomy" />, "astronomy");
    expect(screen.getByLabelText("Step 1: Step 1").parentElement).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});