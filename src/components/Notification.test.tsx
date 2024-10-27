// src/components/Notification.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Notification from "./Notification";
import { ThemeProvider } from "../context/ThemeContext";

describe("Notification Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnClose = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnCloseComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default props", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
      />,
      "light"
    );
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
      />,
      "light"
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onOpen when notification is opened", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        onOpen={mockOnOpen}
      />,
      "light"
    );
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("calls onCloseComplete when notification is closed", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        onCloseComplete={mockOnCloseComplete}
        autoClose={false}
      />,
      "light"
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnCloseComplete).toHaveBeenCalled();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        tooltip="Custom Tooltip"
      />,
      "light"
    );
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        customClass="custom-class"
      />,
      "light"
    );
    expect(screen.getByText("Test Message").parentElement).toHaveClass(
      "custom-class"
    );
  });

  test("renders with fullscreen functionality", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        fullscreen={true}
      />,
      "light"
    );
    expect(screen.getByText("Test Message").parentElement).toHaveClass(
      "w-full h-full"
    );
  });

  test("renders with auto-close functionality", async () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        autoClose={true}
        duration={1000}
      />,
      "light"
    );
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled(), {
      timeout: 1500,
    });
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
      />,
      "dark"
    );
    expect(screen.getByText("Test Message").parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with disabled state", () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        disabledColor="opacity-50 cursor-not-allowed"
      />,
      "light"
    );
    expect(screen.getByText("Test Message").parentElement).toHaveClass(
      "opacity-50 cursor-not-allowed"
    );
  });

  test("pauses auto-close on hover", async () => {
    renderWithTheme(
      <Notification
        message="Test Message"
        type="success"
        onClose={mockOnClose}
        autoClose={true}
        duration={1000}
        pauseOnHover={true}
      />,
      "light"
    );
    const parentElement = screen.getByText("Test Message").parentElement;
    if (parentElement) {
      fireEvent.mouseEnter(parentElement);
    }
    await waitFor(() => expect(mockOnClose).not.toHaveBeenCalled(), {
      timeout: 1500,
    });
    const parentElementA = screen.getByText("Test Message").parentElement;
    if (parentElementA) {
      fireEvent.mouseLeave(parentElementA);
    }
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled(), {
      timeout: 1500,
    });
  });
});
