// src/components/Toast.test.tsx
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Toast from "./Toast";
import { ThemeProvider } from "../context/ThemeContext";

describe("Toast Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnClose = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnCloseComplete = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("renders with default props", () => {
    renderWithTheme(<Toast message="Test Message" onClose={mockOnClose} />, "light");
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Toast
        message="Custom Message"
        onClose={mockOnClose}
        duration={5000}
        onOpen={mockOnOpen}
        onCloseComplete={mockOnCloseComplete}
        variant="success"
        position="top-left"
        customClass="custom-toast"
        customMessageClass="custom-message"
        customButtonClass="custom-button"
        theme="dark"
        tooltip="Custom Tooltip"
        borderWidth="4"
        icon={<span>Icon</span>}
        fullscreen={true}
        size="large"
        onDoubleClick={mockOnDoubleClick}
        onKeyDown={mockOnKeyDown}
        ariaLabel="Custom Toast"
        hoverColor="hover:bg-red-500"
        activeColor="active:bg-blue-500"
        disabledColor="text-gray-400"
        hoverAnimation="hover:scale-110"
        showLabels={false}
        labelColor="text-yellow-500"
        labelActiveColor="text-green-500"
      />,
      "dark"
    );
    expect(screen.getByText("Custom Message")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("custom-toast");
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(<Toast message="Test Message" onClose={mockOnClose} />, "light");
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("auto-closes after duration", () => {
    renderWithTheme(<Toast message="Test Message" onClose={mockOnClose} duration={3000} />, "light");
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onOpen and onCloseComplete callbacks", () => {
    renderWithTheme(
      <Toast
        message="Test Message"
        onClose={mockOnClose}
        onOpen={mockOnOpen}
        onCloseComplete={mockOnCloseComplete}
      />,
      "light"
    );
    expect(mockOnOpen).toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(mockOnCloseComplete).toHaveBeenCalled();
  });

  test("calls onDoubleClick when double-clicked", () => {
    renderWithTheme(
      <Toast message="Test Message" onClose={mockOnClose} onDoubleClick={mockOnDoubleClick} />,
      "light"
    );
    fireEvent.doubleClick(screen.getByRole("alert"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <Toast message="Test Message" onClose={mockOnClose} onKeyDown={mockOnKeyDown} />,
      "light"
    );
    fireEvent.keyDown(screen.getByRole("alert"), { key: "Enter", code: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("renders tooltip correctly", () => {
    renderWithTheme(
      <Toast message="Test Message" onClose={mockOnClose} tooltip="Test Tooltip" />,
      "light"
    );
    expect(screen.getByRole("alert")).toHaveAttribute("title", "Test Tooltip");
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<Toast message="Test Message" onClose={mockOnClose} theme="astronomy" />, "astronomy");
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});