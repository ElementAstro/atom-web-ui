// src/components/LoadingSpinner.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoadingSpinner from "./LoadingSpinner";
import { ThemeProvider } from "../context/ThemeContext";

describe("LoadingSpinner Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnStart = jest.fn();
  const mockOnStop = jest.fn();
  const mockOnClose = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<LoadingSpinner />, "light");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders with custom size and color", () => {
    renderWithTheme(<LoadingSpinner size="20" color="red" />, "light");
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("h-20 w-20 border-red-500");
  });

  test("calls onStart and onStop", () => {
    renderWithTheme(<LoadingSpinner onStart={mockOnStart} onStop={mockOnStop} />, "light");
    expect(mockOnStart).toHaveBeenCalled();
    expect(mockOnStop).toHaveBeenCalled();
  });

  test("renders with custom label", () => {
    renderWithTheme(<LoadingSpinner label="Loading..." />, "light");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders with custom label position", () => {
    renderWithTheme(<LoadingSpinner label="Loading..." labelPosition="top" />, "light");
    const spinner = screen.getByRole("status");
    expect(spinner.parentElement).toHaveClass("flex-col-reverse");
  });

  test("renders with custom animation", () => {
    renderWithTheme(<LoadingSpinner animation="pulse" />, "light");
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("animate-pulse");
  });

  test("applies theme classes", () => {
    renderWithTheme(<LoadingSpinner />, "dark");
    expect(screen.getByRole("status")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom class", () => {
    renderWithTheme(<LoadingSpinner customClass="custom-class" />, "light");
    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });

  test("renders with tooltip", () => {
    renderWithTheme(<LoadingSpinner tooltip="Loading spinner" />, "light");
    expect(screen.getByRole("status")).toHaveAttribute("title", "Loading spinner");
  });

  test("renders with progress bar", () => {
    renderWithTheme(<LoadingSpinner progress={50} />, "light");
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders with custom icon", () => {
    renderWithTheme(<LoadingSpinner icon={<div>Custom Icon</div>} />, "light");
    expect(screen.getByText("Custom Icon")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(<LoadingSpinner onClose={mockOnClose} />, "light");
    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("closes on Escape key press", () => {
    renderWithTheme(<LoadingSpinner onClose={mockOnClose} />, "light");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders in fullscreen mode", () => {
    renderWithTheme(<LoadingSpinner fullscreen={true} />, "light");
    expect(screen.getByRole("status").parentElement).toHaveClass("fixed inset-0 z-50");
  });

  test("renders with custom animation class", () => {
    renderWithTheme(<LoadingSpinner customAnimation="custom-animation" />, "light");
    expect(screen.getByRole("status")).toHaveClass("custom-animation");
  });

  test("renders with custom progress class", () => {
    renderWithTheme(<LoadingSpinner progress={50} customProgressClass="custom-progress" />, "light");
    expect(screen.getByRole("progressbar")).toHaveClass("custom-progress");
  });

  test("renders with custom button class", () => {
    renderWithTheme(<LoadingSpinner onClose={mockOnClose} customButtonClass="custom-button" />, "light");
    expect(screen.getByText("Close")).toHaveClass("custom-button");
  });

  test("renders with hover and active colors", () => {
    renderWithTheme(<LoadingSpinner hoverColor="hover-red" activeColor="active-blue" />, "light");
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("hover-red active-blue");
  });

  test("renders with disabled state", () => {
    renderWithTheme(<LoadingSpinner disabled={true} />, "light");
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("text-gray-400");
  });

  test("renders with hover animation", () => {
    renderWithTheme(<LoadingSpinner hoverAnimation="hover:scale-110" />, "light");
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("hover:scale-110");
  });
});