// src/components/Offcanvas.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Offcanvas from "./Offcanvas";
import { ThemeProvider } from "../context/ThemeContext";

describe("Offcanvas Component", () => {
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

  test("renders with default props", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose}>
        Content
      </Offcanvas>,
      "light"
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose}>
        Content
      </Offcanvas>,
      "light"
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onOpen when offcanvas is opened", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen}>
        Content
      </Offcanvas>,
      "light"
    );
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("calls onCloseComplete when offcanvas is closed", () => {
    renderWithTheme(
      <Offcanvas
        isOpen={false}
        onClose={mockOnClose}
        onCloseComplete={mockOnCloseComplete}
      >
        Content
      </Offcanvas>,
      "light"
    );
    expect(mockOnCloseComplete).toHaveBeenCalled();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose} tooltip="Custom Tooltip">
        Content
      </Offcanvas>,
      "light"
    );
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose} customClass="custom-class">
        Content
      </Offcanvas>,
      "light"
    );
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "custom-class"
    );
  });

  test("renders with fullscreen functionality", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose} fullscreen={true}>
        Content
      </Offcanvas>,
      "light"
    );
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "w-full h-full"
    );
  });

  test("renders with auto-close functionality", async () => {
    renderWithTheme(
      <Offcanvas
        isOpen={true}
        onClose={mockOnClose}
        autoClose={true}
        autoCloseDuration={1000}
      >
        Content
      </Offcanvas>,
      "light"
    );
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled(), {
      timeout: 1500,
    });
  });

  test("renders with draggable functionality", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose} draggable={true}>
        Content
      </Offcanvas>,
      "light"
    );
    const contentParent = screen.getByText("Content").parentElement;
    if (contentParent) {
      fireEvent.dragStart(contentParent);
      fireEvent.drop(contentParent);
    }
    expect(contentParent).toHaveAttribute("draggable", "true");
  });

  test("renders with maximizable functionality", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose} maximizable={true}>
        Content
      </Offcanvas>,
      "light"
    );
    const maximizeButton = screen.getByTitle("最大化");
    fireEvent.click(maximizeButton);
    expect(screen.getByText("Content").parentElement).toHaveClass("w-full h-full");
  });

  test("calls onFocus and onBlur event handlers", () => {
    renderWithTheme(
      <Offcanvas
        isOpen={true}
        onClose={mockOnClose}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      >
        Content
      </Offcanvas>,
      "light"
    );
    const contentParent = screen.getByText("Content").parentElement;
    if (contentParent) {
      fireEvent.focus(contentParent);
      fireEvent.blur(contentParent);
    }
    expect(mockOnFocus).toHaveBeenCalled();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown event handler", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose} onKeyDown={mockOnKeyDown}>
        Content
      </Offcanvas>,
      "light"
    );
    const contentParent = screen.getByText("Content").parentElement;
    if (contentParent) {
      fireEvent.keyDown(contentParent, { key: "Escape" });
    }
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onAnimationEnd event handler", () => {
    renderWithTheme(
      <Offcanvas
        isOpen={true}
        onClose={mockOnClose}
        onAnimationEnd={mockOnAnimationEnd}
      >
        Content
      </Offcanvas>,
      "light"
    );
    const contentParent = screen.getByText("Content").parentElement;
    if (contentParent) {
      fireEvent.animationEnd(contentParent);
    }
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("calls onDoubleClick event handler", () => {
    renderWithTheme(
      <Offcanvas
        isOpen={true}
        onClose={mockOnClose}
        onDoubleClick={mockOnDoubleClick}
      >
        Content
      </Offcanvas>,
      "light"
    );
    const contentParent = screen.getByText("Content").parentElement;
    if (contentParent) {
      fireEvent.doubleClick(contentParent);
    }
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <Offcanvas isOpen={true} onClose={mockOnClose}>
        Content
      </Offcanvas>,
      "dark"
    );
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });
});