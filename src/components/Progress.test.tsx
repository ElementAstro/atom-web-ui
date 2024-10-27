// src/components/Progress.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Progress from "./Progress";
import { ThemeProvider } from "../context/ThemeContext";

describe("Progress Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnProgressComplete = jest.fn();
  const mockOnProgressChange = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<Progress value={50} max={100} />, "light");
    expect(screen.getByText("50/100")).toBeInTheDocument();
  });

  test("calls onProgressComplete when progress reaches 100%", () => {
    renderWithTheme(
      <Progress
        value={100}
        max={100}
        onProgressComplete={mockOnProgressComplete}
      />,
      "light"
    );
    expect(mockOnProgressComplete).toHaveBeenCalled();
  });

  test("calls onProgressChange when progress changes", () => {
    renderWithTheme(
      <Progress value={50} max={100} onProgressChange={mockOnProgressChange} />,
      "light"
    );
    expect(mockOnProgressChange).toHaveBeenCalledWith(50);
  });

  test("pauses and resumes progress", () => {
    renderWithTheme(<Progress value={50} max={100} />, "light");
    const pauseButton = screen.getByRole("button", { name: /pause/i });
    fireEvent.click(pauseButton);
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton);
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });

  test("closes progress", () => {
    renderWithTheme(
      <Progress
        value={50}
        max={100}
        onProgressComplete={mockOnProgressComplete}
      />,
      "light"
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnProgressComplete).toHaveBeenCalled();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Progress value={50} max={100} customClass="custom-class" />,
      "light"
    );
    expect(screen.getByText("50/100").parentElement).toHaveClass(
      "custom-class"
    );
  });

  test("renders with custom progress class", () => {
    renderWithTheme(
      <Progress
        value={50}
        max={100}
        customProgressClass="custom-progress-class"
      />,
      "light"
    );
    expect(screen.getByText("50/100").previousElementSibling).toHaveClass(
      "custom-progress-class"
    );
  });

  test("renders with custom text class", () => {
    renderWithTheme(
      <Progress value={50} max={100} customTextClass="custom-text-class" />,
      "light"
    );
    expect(screen.getByText("50/100")).toHaveClass("custom-text-class");
  });

  test("renders with custom button class", () => {
    renderWithTheme(
      <Progress value={50} max={100} customButtonClass="custom-button-class" />,
      "light"
    );
    expect(screen.getByRole("button", { name: /pause/i })).toHaveClass(
      "custom-button-class"
    );
  });

  test("applies theme classes", () => {
    renderWithTheme(<Progress value={50} max={100} />, "dark");
    expect(screen.getByText("50/100").parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });
});
