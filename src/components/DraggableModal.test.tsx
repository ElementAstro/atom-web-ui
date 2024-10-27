// src/components/DraggableModal.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DraggableModal from "./DraggableModal";
import { ThemeProvider } from "../context/ThemeContext";

describe("DraggableModal Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnClose = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders when isOpen is true", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    renderWithTheme(
      <DraggableModal isOpen={false} onClose={mockOnClose}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when Escape key is pressed", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onFocus when modal is focused", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} onFocus={mockOnFocus}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.focus(screen.getByLabelText("Draggable Modal"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when modal is blurred", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} onBlur={mockOnBlur}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.blur(screen.getByLabelText("Draggable Modal"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} onKeyDown={mockOnKeyDown}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("Draggable Modal"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onMouseEnter when mouse enters modal", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} onMouseEnter={mockOnMouseEnter}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.mouseEnter(screen.getByLabelText("Draggable Modal"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  test("calls onMouseLeave when mouse leaves modal", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} onMouseLeave={mockOnMouseLeave}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.mouseLeave(screen.getByLabelText("Draggable Modal"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} onAnimationEnd={mockOnAnimationEnd}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    fireEvent.animationEnd(screen.getByLabelText("Draggable Modal"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </DraggableModal>,
      "dark"
    );
    expect(screen.getByLabelText("Draggable Modal")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} customClass="custom-class">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Draggable Modal")).toHaveClass("custom-class");
  });

  test("renders with custom header class", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} customHeaderClass="custom-header-class">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByText("Modal Title")).toHaveClass("custom-header-class");
  });

  test("renders with custom content class", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} customContentClass="custom-content-class">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByText("Modal Content")).toHaveClass("custom-content-class");
  });

  test("renders with custom footer class", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} customFooterClass="custom-footer-class">
        <div>Footer Content</div>
      </DraggableModal>,
      "light"
    );
    expect(screen.getByText("Footer Content")).toHaveClass("custom-footer-class");
  });

  test("renders with custom button class", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} customButtonClass="custom-button-class">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByRole("button", { name: /close/i })).toHaveClass("custom-button-class");
  });

  test("renders with custom icon class", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} customIconClass="custom-icon-class">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByRole("button", { name: /close/i }).firstChild).toHaveClass("custom-icon-class");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} ariaLabel="Custom Aria Label">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} tooltip="Custom Tooltip">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByRole("button", { name: /close/i })).toHaveAttribute("title", "Custom Tooltip");
  });

  test("renders with custom border width", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} borderWidth="4">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Draggable Modal")).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} animation="custom-animation">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Draggable Modal")).toHaveClass("custom-animation");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} textTransform="uppercase">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByText("Modal Title")).toHaveClass("uppercase");
  });

  test("renders with custom shadow", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} shadow={false}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Draggable Modal")).not.toHaveClass("shadow-lg");
  });

  test("renders with custom hover effect", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} hoverEffect={false}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Draggable Modal")).not.toHaveClass("hover:shadow-xl");
  });

  test("renders with custom border style", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} borderStyle="dashed">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Draggable Modal")).toHaveClass("border-dashed");
  });

  test("renders with custom border color", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} borderColor="red-500">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByLabelText("Draggable Modal")).toHaveClass("border-red-500");
  });

  test("renders with custom close button color", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} closeButtonColor="text-blue-600">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByRole("button", { name: /close/i })).toHaveClass("text-blue-600");
  });

  test("renders with custom close button position", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} closeButtonPosition="bottom-left">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByRole("button", { name: /close/i }).parentElement).toHaveClass("bottom-0 left-0");
  });

  test("renders with custom fullscreen button color", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} fullscreenButtonColor="text-green-600">
        Modal Content
      </DraggableModal>,
      "light"
    );
    expect(screen.getByRole("button", { name: /toggle fullscreen/i })).toHaveClass("text-green-600");
  });

  test("toggles fullscreen mode when fullscreen button is clicked", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    const fullscreenButton = screen.getByRole("button", { name: /toggle fullscreen/i });
    fireEvent.click(fullscreenButton);
    expect(screen.getByLabelText("Draggable Modal")).toHaveClass("w-full h-full");
    fireEvent.click(fullscreenButton);
    expect(screen.getByLabelText("Draggable Modal")).not.toHaveClass("w-full h-full");
  });

  test("auto closes after specified duration", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} autoClose={true} autoCloseDuration={1000}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    jest.advanceTimersByTime(1000);
    expect(mockOnClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test("handles dragging", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    const modal = screen.getByLabelText("Draggable Modal");
    fireEvent.mouseDown(modal, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(modal, { clientX: 200, clientY: 200 });
    fireEvent.mouseUp(modal);
    expect(modal).toHaveStyle({ top: "100px", left: "100px" });
  });

  test("handles resizing", () => {
    renderWithTheme(
      <DraggableModal isOpen={true} onClose={mockOnClose} resizable={true}>
        Modal Content
      </DraggableModal>,
      "light"
    );
    const resizeHandle = screen.getByRole("button", { name: /resize/i });
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(resizeHandle, { clientX: 200, clientY: 200 });
    fireEvent.mouseUp(resizeHandle);
    expect(screen.getByLabelText("Draggable Modal")).toHaveStyle({ width: "100px", height: "100px" });
  });
});