// src/components/ConfirmDialog.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmDialog from "./ConfirmDialog";
import { ThemeProvider } from "../context/ThemeContext";

describe("ConfirmDialog Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  test("calls onConfirm when confirm button is clicked", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    fireEvent.click(screen.getByText("确认"));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test("calls onCancel when cancel button is clicked", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    fireEvent.click(screen.getByText("取消"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test("calls onOpen when dialog is opened", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onOpen={mockOnOpen}
      />,
      "light"
    );
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("calls onClose when dialog is closed", () => {
    const { rerender } = renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onClose={mockOnClose}
      />,
      "light"
    );
    rerender(
      <ConfirmDialog
        isOpen={false}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onClose={mockOnClose}
      />
    );
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders with custom title", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        title="Custom Title"
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  test("renders with custom icon", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        icon={<span>Icon</span>}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with custom button text", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        confirmButtonText="Yes"
        cancelButtonText="No"
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  test("renders with custom button colors", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        confirmButtonColor="bg-green-600"
        cancelButtonColor="text-red-300"
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    expect(screen.getByText("确认")).toHaveClass("bg-green-600");
    expect(screen.getByText("取消")).toHaveClass("text-red-300");
  });

  test("disables confirm button when disableConfirm is true", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        disableConfirm={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    expect(screen.getByText("确认")).toBeDisabled();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        theme="dark"
      />,
      "dark"
    );
    expect(screen.getByText("Are you sure?").parentElement).toHaveClass(
      "bg-gray-900 text-white"
    );
  });

  test("handles autoClose functionality", () => {
    jest.useFakeTimers();
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        autoClose={true}
        autoCloseDuration={3000}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
      "light"
    );
    jest.advanceTimersByTime(3000);
    expect(mockOnCancel).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test("handles keyboard interactions", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onKeyDown={mockOnKeyDown}
      />,
      "light"
    );
    fireEvent.keyDown(screen.getByLabelText("确认对话框"), { key: "Escape" });
    expect(mockOnCancel).toHaveBeenCalled();
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("handles mouse events", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onMouseEnter={mockOnMouseEnter}
        onMouseLeave={mockOnMouseLeave}
      />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByLabelText("确认对话框"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(screen.getByLabelText("确认对话框"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("handles focus and blur events", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
      "light"
    );
    fireEvent.focus(screen.getByLabelText("确认对话框"));
    expect(mockOnFocus).toHaveBeenCalled();
    fireEvent.blur(screen.getByLabelText("确认对话框"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onAnimationEnd={mockOnAnimationEnd}
      />,
      "light"
    );
    fireEvent.animationEnd(screen.getByLabelText("确认对话框"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("renders with custom classes", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        customClass="custom-class"
        customButtonClass="custom-button-class"
        customIconClass="custom-icon-class"
        customTitleClass="custom-title-class"
        customMessageClass="custom-message-class"
        customDialogClass="custom-dialog-class"
      />,
      "light"
    );
    expect(screen.getByLabelText("确认对话框")).toHaveClass("custom-class");
    expect(screen.getByText("确认")).toHaveClass("custom-button-class");
    expect(screen.getByText("取消")).toHaveClass("custom-button-class");
    expect(screen.getByText("Are you sure?")).toHaveClass("custom-message-class");
  });

  test("renders with shadow and hover effect", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        shadow={true}
        hoverEffect={true}
      />,
      "light"
    );
    const dialog = screen.getByLabelText("确认对话框").querySelector(".shadow-lg");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass("hover:scale-105 hover:shadow-neon");
  });

  test("renders with custom border style and color", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        borderStyle="dashed"
        borderColor="red-500"
      />,
      "light"
    );
    const dialog = screen.getByLabelText("确认对话框").querySelector(".border-2");
    expect(dialog).toHaveClass("border-dashed border-red-500");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        textTransform="uppercase"
      />,
      "light"
    );
    expect(screen.getByText("Are you sure?")).toHaveClass("uppercase");
  });
});