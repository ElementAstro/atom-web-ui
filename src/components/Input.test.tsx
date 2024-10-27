// src/components/Input.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Input from "./Input";
import { ThemeProvider } from "../context/ThemeContext";

describe("Input Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnChange = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnAnimationEnd = jest.fn();

  test("renders with label", () => {
    renderWithTheme(<Input label="Username" />, "light");
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  test("renders with placeholder", () => {
    renderWithTheme(<Input placeholder="Enter your username" />, "light");
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
  });

  test("calls onFocus when input is focused", () => {
    renderWithTheme(<Input onFocus={mockOnFocus} />, "light");
    fireEvent.focus(screen.getByLabelText("输入框"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when input is blurred", () => {
    renderWithTheme(<Input onBlur={mockOnBlur} />, "light");
    fireEvent.blur(screen.getByLabelText("输入框"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onChange when input value changes", () => {
    renderWithTheme(<Input onChange={mockOnChange} />, "light");
    fireEvent.change(screen.getByLabelText("输入框"), { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("calls onDoubleClick when input container is double-clicked", () => {
    renderWithTheme(<Input onDoubleClick={mockOnDoubleClick} />, "light");
    fireEvent.doubleClick(screen.getByLabelText("输入框"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(<Input onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByLabelText("输入框"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(<Input onAnimationEnd={mockOnAnimationEnd} />, "light");
    fireEvent.animationEnd(screen.getByLabelText("输入框"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(<Input tooltip="Custom Tooltip" />, "light");
    expect(screen.getByLabelText("输入框")).toHaveAttribute("title", "Custom Tooltip");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(<Input ariaLabel="Custom Aria Label" />, "light");
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with custom border width", () => {
    renderWithTheme(<Input borderWidth="4" />, "light");
    expect(screen.getByLabelText("输入框")).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(<Input animation="custom-animation" />, "light");
    expect(screen.getByLabelText("输入框")).toHaveClass("custom-animation");
  });

  test("renders with password visibility toggle", () => {
    renderWithTheme(<Input type="password" showPassword={true} />, "light");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByLabelText("输入框")).toHaveAttribute("type", "text");
  });

  test("renders with clearable input functionality", () => {
    renderWithTheme(<Input clearable={true} value="test" />, "light");
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByLabelText("输入框")).toHaveValue("");
  });

  test("renders with error message", () => {
    renderWithTheme(<Input errorMessage="Error occurred" />, "light");
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Input />, "dark");
    expect(screen.getByLabelText("输入框")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom hover color", () => {
    renderWithTheme(<Input hoverColor="hover:bg-red-500" />, "light");
    expect(screen.getByLabelText("输入框")).toHaveClass("hover:bg-red-500");
  });

  test("renders with custom active color", () => {
    renderWithTheme(<Input activeColor="active:bg-blue-500" />, "light");
    expect(screen.getByLabelText("输入框")).toHaveClass("active:bg-blue-500");
  });

  test("renders with custom disabled color", () => {
    renderWithTheme(<Input disabled={true} disabledColor="text-gray-400" />, "light");
    expect(screen.getByLabelText("输入框")).toHaveClass("text-gray-400");
  });

  test("renders with custom hover animation", () => {
    renderWithTheme(<Input hoverAnimation="hover:scale-105" />, "light");
    expect(screen.getByLabelText("输入框")).toHaveClass("hover:scale-105");
  });
});