// src/components/Modal.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Modal from "./Modal";
import { ThemeProvider } from "../context/ThemeContext";

describe("Modal Component", () => {
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
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>,
      "light"
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>,
      "light"
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onOpen when modal is opened", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} onOpen={mockOnOpen}>
        Content
      </Modal>,
      "light"
    );
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("calls onCloseComplete when modal is closed", () => {
    renderWithTheme(
      <Modal
        isOpen={false}
        onClose={mockOnClose}
        onCloseComplete={mockOnCloseComplete}
      >
        Content
      </Modal>,
      "light"
    );
    expect(mockOnCloseComplete).toHaveBeenCalled();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} tooltip="Custom Tooltip">
        Content
      </Modal>,
      "light"
    );
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} customClass="custom-class">
        Content
      </Modal>,
      "light"
    );
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "custom-class"
    );
  });

  test("renders with fullscreen functionality", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} fullscreen={true}>
        Content
      </Modal>,
      "light"
    );
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "w-full h-full"
    );
  });

  test("renders with auto-close functionality", async () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        autoClose={true}
        autoCloseDuration={1000}
      >
        Content
      </Modal>,
      "light"
    );
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled(), {
      timeout: 1500,
    });
  });

  test("renders with header and footer", () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        header={<div>Header</div>}
        footer={<div>Footer</div>}
      >
        Content
      </Modal>,
      "light"
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  test("calls onFocus and onBlur event handlers", () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      >
        Content
      </Modal>,
      "light"
    );
    const contentParent = screen.getByText("Content").parentElement;
    if (contentParent) {
      fireEvent.focus(contentParent);
    }
    expect(mockOnFocus).toHaveBeenCalled();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown event handler", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} onKeyDown={mockOnKeyDown}>
        Content
      </Modal>,
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
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onAnimationEnd={mockOnAnimationEnd}
      >
        Content
      </Modal>,
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
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onDoubleClick={mockOnDoubleClick}
      >
        Content
      </Modal>,
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
      <Modal isOpen={true} onClose={mockOnClose}>
        Content
      </Modal>,
      "dark"
    );
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with disabled state", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} disabled={true}>
        Content
      </Modal>,
      "light"
    );
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "opacity-50 cursor-not-allowed"
    );
  });
});
