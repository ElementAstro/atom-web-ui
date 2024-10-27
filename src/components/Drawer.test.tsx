// src/components/Drawer.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Drawer from "./Drawer";
import { ThemeProvider } from "../context/ThemeContext";

describe("Drawer Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnClose = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnCloseComplete = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnAnimationEnd = jest.fn();
  const mockOnDoubleClick = jest.fn();

  test("renders when isOpen is true", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose}>
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    renderWithTheme(
      <Drawer isOpen={false} onClose={mockOnClose}>
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.queryByText("Drawer Content")).not.toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose}>
        Drawer Content
      </Drawer>,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onClose when Escape key is pressed", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose}>
        Drawer Content
      </Drawer>,
      "light"
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onFocus when drawer is focused", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} onFocus={mockOnFocus}>
        Drawer Content
      </Drawer>,
      "light"
    );
    fireEvent.focus(screen.getByLabelText("Drawer"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when drawer is blurred", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} onBlur={mockOnBlur}>
        Drawer Content
      </Drawer>,
      "light"
    );
    fireEvent.blur(screen.getByLabelText("Drawer"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} onKeyDown={mockOnKeyDown}>
        Drawer Content
      </Drawer>,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("Drawer"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        onAnimationEnd={mockOnAnimationEnd}
      >
        Drawer Content
      </Drawer>,
      "light"
    );
    fireEvent.animationEnd(screen.getByLabelText("Drawer"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("calls onDoubleClick when drawer is double-clicked", () => {
    renderWithTheme(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        onDoubleClick={mockOnDoubleClick}
      >
        Drawer Content
      </Drawer>,
      "light"
    );
    fireEvent.doubleClick(screen.getByLabelText("Drawer"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose}>
        Drawer Content
      </Drawer>,
      "dark"
    );
    expect(screen.getByLabelText("Drawer")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} customClass="custom-class">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).toHaveClass("custom-class");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} ariaLabel="Custom Aria Label">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} tooltip="Custom Tooltip">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByRole("button", { name: /close/i })).toHaveAttribute(
      "title",
      "Custom Tooltip"
    );
  });

  test("renders with custom border width", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} borderWidth="4">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} animation="custom-animation">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).toHaveClass("custom-animation");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} textTransform="uppercase">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByText("Drawer Content")).toHaveClass("uppercase");
  });

  test("renders with custom shadow", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} shadow={false}>
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).not.toHaveClass("shadow-lg");
  });

  test("renders with custom hover effect", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} hoverEffect={false}>
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).not.toHaveClass("hover:shadow-xl");
  });

  test("renders with custom border style", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} borderStyle="dashed">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).toHaveClass("border-dashed");
  });

  test("renders with custom border color", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} borderColor="red-500">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).toHaveClass("border-red-500");
  });

  test("renders with custom icon color", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} iconColor="text-blue-600">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByRole("button", { name: /close/i })).toHaveClass(
      "text-blue-600"
    );
  });

  test("renders with custom width", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} width="80">
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByLabelText("Drawer")).toHaveClass("w-80");
  });

  test("auto closes after specified duration", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        autoClose={true}
        autoCloseDuration={1000}
      >
        Drawer Content
      </Drawer>,
      "light"
    );
    jest.advanceTimersByTime(1000);
    expect(mockOnClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test("handles dragging", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} draggable={true}>
        Drawer Content
      </Drawer>,
      "light"
    );
    const drawer = screen.getByLabelText("Drawer");
    fireEvent.dragStart(drawer, { clientX: 100, clientY: 100 });
    fireEvent.drop(drawer, { clientX: 200, clientY: 200 });
    expect(drawer).toHaveStyle({ left: "100px", top: "100px" });
  });

  test("handles maximizing", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} maximizable={true}>
        Drawer Content
      </Drawer>,
      "light"
    );
    const maximizeButton = screen.getByRole("button", { name: /expand/i });
    fireEvent.click(maximizeButton);
    expect(screen.getByLabelText("Drawer")).toHaveClass("w-full h-full");
    fireEvent.click(maximizeButton);
    expect(screen.getByLabelText("Drawer")).not.toHaveClass("w-full h-full");
  });

  test("handles fullscreen", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} fullscreen={true}>
        Drawer Content
      </Drawer>,
      "light"
    );
    const fullscreenButton = screen.getByRole("button", {
      name: /fullscreen/i,
    });
    fireEvent.click(fullscreenButton);
    expect(document.fullscreenElement).toBeTruthy();
    fireEvent.click(fullscreenButton);
    expect(document.fullscreenElement).toBeFalsy();
  });

  test("handles docking", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} dockable={true}>
        Drawer Content
      </Drawer>,
      "light"
    );
    const dockButton = screen.getByRole("button", { name: /dock/i });
    fireEvent.click(dockButton);
    expect(screen.getByLabelText("Drawer")).toHaveClass("docked");
    fireEvent.click(dockButton);
    expect(screen.getByLabelText("Drawer")).not.toHaveClass("docked");
  });

  test("renders additional buttons", () => {
    const additionalButtons = [
      { icon: <span>Btn1</span>, onClick: jest.fn(), tooltip: "Button 1" },
      { icon: <span>Btn2</span>, onClick: jest.fn(), tooltip: "Button 2" },
    ];
    renderWithTheme(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        additionalButtons={additionalButtons}
      >
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(screen.getByText("Btn1")).toBeInTheDocument();
    expect(screen.getByText("Btn2")).toBeInTheDocument();
  });

  test("handles ripple effect on close button", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} rippleEffect={true}>
        Drawer Content
      </Drawer>,
      "light"
    );
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton, { clientX: 50, clientY: 50 });
    expect(closeButton.querySelector(".ripple")).toBeInTheDocument();
  });

  test("calls onOpen when drawer opens", () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen}>
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("calls onCloseComplete when drawer closes", () => {
    renderWithTheme(
      <Drawer
        isOpen={false}
        onClose={mockOnClose}
        onCloseComplete={mockOnCloseComplete}
      >
        Drawer Content
      </Drawer>,
      "light"
    );
    expect(mockOnCloseComplete).toHaveBeenCalled();
  });
});
