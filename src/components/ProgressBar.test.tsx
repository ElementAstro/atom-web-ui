// src/components/ProgressBar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProgressBar from "./ProgressBar";
import { ThemeProvider } from "../context/ThemeContext";

describe("ProgressBar Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnProgressComplete = jest.fn();
  const mockOnProgressChange = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<ProgressBar progress={50} />, "light");
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  test("calls onProgressChange when progress changes", () => {
    renderWithTheme(
      <ProgressBar progress={50} onProgressChange={mockOnProgressChange} />,
      "light"
    );
    expect(mockOnProgressChange).toHaveBeenCalledWith(50);
  });

  test("calls onProgressComplete when progress reaches 100%", () => {
    renderWithTheme(
      <ProgressBar
        progress={100}
        onProgressComplete={mockOnProgressComplete}
      />,
      "light"
    );
    expect(mockOnProgressComplete).toHaveBeenCalled();
  });

  test("renders with custom label", () => {
    renderWithTheme(<ProgressBar progress={50} label="Loading..." />, "light");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <ProgressBar progress={50} customClass="custom-class" />,
      "light"
    );
    expect(screen.getByRole("progressbar").parentElement).toHaveClass(
      "custom-class"
    );
  });

  test("renders with custom progress class", () => {
    renderWithTheme(
      <ProgressBar progress={50} customProgressClass="custom-progress-class" />,
      "light"
    );
    expect(screen.getByRole("progressbar")).toHaveClass(
      "custom-progress-class"
    );
  });

  test("renders with custom label class", () => {
    renderWithTheme(
      <ProgressBar
        progress={50}
        label="Loading..."
        customLabelClass="custom-label-class"
      />,
      "light"
    );
    expect(screen.getByText("Loading...")).toHaveClass("custom-label-class");
  });

  test("renders with custom percentage class", () => {
    renderWithTheme(
      <ProgressBar
        progress={50}
        customPercentageClass="custom-percentage-class"
      />,
      "light"
    );
    expect(screen.getByText("50%")).toHaveClass("custom-percentage-class");
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <ProgressBar progress={50} showTooltip={true} tooltipText="Progress" />,
      "light"
    );
    expect(screen.getByTitle("Progress")).toBeInTheDocument();
  });

  test("calls onHover event handler", () => {
    renderWithTheme(
      <ProgressBar progress={50} onHover={mockOnHover} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByRole("progressbar").parentElement!);
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("calls onFocus and onBlur event handlers", () => {
    renderWithTheme(
      <ProgressBar progress={50} onFocus={mockOnFocus} onBlur={mockOnBlur} />,
      "light"
    );
    const progressBar = screen.getByRole("progressbar").parentElement;
    if (progressBar) {
      fireEvent.focus(progressBar);
    }
    if (progressBar) {
      fireEvent.blur(progressBar);
    }
    expect(mockOnFocus).toHaveBeenCalled();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<ProgressBar progress={50} />, "dark");
    expect(screen.getByRole("progressbar").parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with striped and animated functionality", () => {
    renderWithTheme(
      <ProgressBar progress={50} striped={true} animated={true} />,
      "light"
    );
    expect(screen.getByRole("progressbar")).toHaveClass(
      "bg-stripes animate-stripes"
    );
  });

  test("renders with fullscreen functionality", () => {
    renderWithTheme(<ProgressBar progress={50} fullscreen={true} />, "light");
    expect(screen.getByRole("progressbar").parentElement).toHaveClass(
      "w-full h-full"
    );
  });

  test("renders with custom height", () => {
    renderWithTheme(<ProgressBar progress={50} height="large" />, "light");
    expect(screen.getByRole("progressbar").parentElement).toHaveStyle(
      "height: h-8"
    );
  });

  test("renders with custom border width", () => {
    renderWithTheme(<ProgressBar progress={50} borderWidth="4" />, "light");
    expect(screen.getByRole("progressbar").parentElement).toHaveClass(
      "border-4"
    );
  });

  test("renders with custom icon", () => {
    renderWithTheme(
      <ProgressBar progress={50} icon={<span>Icon</span>} />,
      "light"
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });
});
