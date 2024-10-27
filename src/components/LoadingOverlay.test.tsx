// src/components/LoadingOverlay.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoadingOverlay from "./LoadingOverlay";
import { ThemeProvider } from "../context/ThemeContext";

describe("LoadingOverlay Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnShow = jest.fn();
  const mockOnHide = jest.fn();
  const mockOnClose = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<LoadingOverlay />, "light");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders with custom loading text", () => {
    renderWithTheme(<LoadingOverlay loadingText="Please wait..." />, "light");
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  test("calls onShow when component is shown", () => {
    renderWithTheme(<LoadingOverlay onShow={mockOnShow} />, "light");
    expect(mockOnShow).toHaveBeenCalled();
  });

  test("calls onHide when component is hidden", () => {
    const { unmount } = renderWithTheme(
      <LoadingOverlay onHide={mockOnHide} />,
      "light"
    );
    unmount();
    expect(mockOnHide).toHaveBeenCalled();
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(<LoadingOverlay onClose={mockOnClose} />, "light");
    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("closes when Escape key is pressed", () => {
    renderWithTheme(<LoadingOverlay onClose={mockOnClose} />, "light");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<LoadingOverlay />, "dark");
    expect(screen.getByRole("alert")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with custom class", () => {
    renderWithTheme(<LoadingOverlay customClass="custom-class" />, "light");
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  test("renders with tooltip", () => {
    renderWithTheme(<LoadingOverlay tooltip="Loading tooltip" />, "light");
    expect(screen.getByRole("alert")).toHaveAttribute(
      "title",
      "Loading tooltip"
    );
  });

  test("renders progress bar", () => {
    renderWithTheme(<LoadingOverlay progress={50} />, "light");
    expect(
      screen.getByRole("alert").querySelector("div.bg-blue-600")
    ).toHaveStyle("width: 50%");
  });

  test("renders with custom icon", () => {
    renderWithTheme(
      <LoadingOverlay icon={<span>Custom Icon</span>} />,
      "light"
    );
    expect(screen.getByText("Custom Icon")).toBeInTheDocument();
  });

  test("renders with custom animation", () => {
    renderWithTheme(<LoadingOverlay animationType="pulse" />, "light");
    expect(screen.getByRole("alert").querySelector("div")).toHaveClass(
      "animate-pulse"
    );
  });

  test("renders with custom close button text", () => {
    renderWithTheme(<LoadingOverlay closeButtonText="Dismiss" />, "light");
    expect(screen.getByText("Dismiss")).toBeInTheDocument();
  });

  test("renders with custom close button position", () => {
    renderWithTheme(<LoadingOverlay closeButtonPosition="top-left" />, "light");
    expect(screen.getByText("Close")).toHaveClass("top-4 left-4");
  });

  test("renders with custom colors", () => {
    renderWithTheme(
      <LoadingOverlay
        backgroundColor="red"
        textColor="blue"
        borderColor="green"
      />,
      "light"
    );
    expect(screen.getByRole("alert")).toHaveStyle(
      "background-color: red; color: blue; border-color: green;"
    );
  });

  test("renders with custom icon size and color", () => {
    renderWithTheme(
      <LoadingOverlay iconSize="h-16 w-16" iconColor="text-red-500" />,
      "light"
    );
    expect(screen.getByRole("alert").querySelector("div")).toHaveClass(
      "h-16 w-16 text-red-500"
    );
  });

  test("renders with custom text size", () => {
    renderWithTheme(<LoadingOverlay textSize="text-2xl" />, "light");
    expect(screen.getByText("Loading...")).toHaveClass("text-2xl");
  });

  test("renders with custom progress bar color and height", () => {
    renderWithTheme(
      <LoadingOverlay progressBarColor="bg-red-600" progressBarHeight="h-4" />,
      "light"
    );
    expect(
      screen.getByRole("alert").querySelector("div.bg-red-600")
    ).toHaveClass("h-4");
  });

  test("renders with custom animation duration", () => {
    renderWithTheme(
      <LoadingOverlay animationDuration="duration-500" />,
      "light"
    );
    expect(screen.getByRole("alert").querySelector("div")).toHaveClass(
      "duration-500"
    );
  });

  test("renders with custom overlay opacity", () => {
    renderWithTheme(<LoadingOverlay overlayOpacity="bg-opacity-50" />, "light");
    expect(screen.getByRole("alert")).toHaveClass("bg-opacity-50");
  });

  test("renders with hover and active colors", () => {
    renderWithTheme(
      <LoadingOverlay
        hoverColor="hover:bg-red-500"
        activeColor="active:bg-blue-500"
      />,
      "light"
    );
    expect(screen.getByRole("alert")).toHaveClass(
      "hover:bg-red-500 active:bg-blue-500"
    );
  });

  test("renders with disabled state", () => {
    renderWithTheme(
      <LoadingOverlay disabled={true} disabledColor="text-gray-400" />,
      "light"
    );
    expect(screen.getByText("Loading...")).toHaveClass("text-gray-400");
  });

  test("renders with hover animation", () => {
    renderWithTheme(
      <LoadingOverlay hoverAnimation="hover:scale-105 hover:shadow-neon" />,
      "light"
    );
    expect(screen.getByRole("alert")).toHaveClass(
      "hover:scale-105 hover:shadow-neon"
    );
  });
});
