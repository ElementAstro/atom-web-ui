// src/components/FluidLayout.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FluidLayout from "./FluidLayout";
import { ThemeProvider } from "../context/ThemeContext";

describe("FluidLayout Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnSidebarToggle = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders sidebar and main content", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
      />,
      "light"
    );
    expect(screen.getByText("Sidebar Content")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  test("toggles sidebar visibility", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        onSidebarToggle={mockOnSidebarToggle}
      />,
      "light"
    );
    const toggleButton = screen.getAllByRole("button")[0];
    fireEvent.click(toggleButton);
    expect(mockOnSidebarToggle).toHaveBeenCalledWith(false);
    fireEvent.click(toggleButton);
    expect(mockOnSidebarToggle).toHaveBeenCalledWith(true);
  });

  test("handles fullscreen toggle", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
      />,
      "light"
    );
    const fullscreenButton = screen.getByTitle("Toggle Fullscreen");
    fireEvent.click(fullscreenButton);
    expect(screen.getByText("Main Content").parentElement).toHaveClass(
      "w-full h-full"
    );
    fireEvent.click(fullscreenButton);
    expect(screen.getByText("Main Content").parentElement).not.toHaveClass(
      "w-full h-full"
    );
  });

  test("handles touch events for sidebar", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
      />,
      "light"
    );
    const sidebar = screen.getByText("Sidebar Content").parentElement!;
    fireEvent.touchStart(sidebar, { touches: [{ clientX: 0 }] });
    fireEvent.touchMove(sidebar, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(sidebar);
    expect(sidebar).toHaveStyle("transform: translateX(100px)");
  });

  test("handles resize events for sidebar", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
      />,
      "light"
    );
    const resizeHandle = screen.getByRole("button", { name: /close/i })
      .parentElement!.nextElementSibling!;
    fireEvent.mouseDown(resizeHandle, { clientX: 0 });
    fireEvent.mouseMove(document, { clientX: 100 });
    fireEvent.mouseUp(document);
    expect(resizeHandle.parentElement).toHaveStyle("width: 300px");
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
      />,
      "dark"
    );
    expect(screen.getByLabelText("Fluid Layout")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("calls onFocus when focused", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        onFocus={mockOnFocus}
      />,
      "light"
    );
    fireEvent.focus(screen.getByLabelText("Fluid Layout"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when blurred", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        onBlur={mockOnBlur}
      />,
      "light"
    );
    fireEvent.blur(screen.getByLabelText("Fluid Layout"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        onKeyDown={mockOnKeyDown}
      />,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("Fluid Layout"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onMouseEnter and onMouseLeave", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByLabelText("Fluid Layout"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(screen.getByLabelText("Fluid Layout"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        onAnimationEnd={mockOnAnimationEnd}
      />,
      "light"
    );
    fireEvent.animationEnd(screen.getByLabelText("Fluid Layout"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        customClass="custom-class"
      />,
      "light"
    );
    expect(screen.getByLabelText("Fluid Layout")).toHaveClass("custom-class");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        ariaLabel="Custom Aria Label"
      />,
      "light"
    );
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("auto closes sidebar after specified duration", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <FluidLayout
        sidebarContent={<div>Sidebar Content</div>}
        mainContent={<div>Main Content</div>}
        autoClose={true}
        autoCloseDuration={1000}
        onSidebarToggle={mockOnSidebarToggle}
      />,
      "light"
    );
    jest.advanceTimersByTime(1000);
    expect(mockOnSidebarToggle).toHaveBeenCalledWith(false);
    jest.useRealTimers();
  });
});
