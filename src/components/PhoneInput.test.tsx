// src/components/PhoneInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PhoneInput from "./PhoneInput";
import { ThemeProvider } from "../context/ThemeContext";

describe("PhoneInput Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} />,
      "light"
    );
    expect(screen.getByPlaceholderText("123-456-7890")).toBeInTheDocument();
  });

  test("calls onChange when input value changes", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.change(screen.getByPlaceholderText("123-456-7890"), {
      target: { value: "123-456-7890" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("123-456-7890");
  });

  test("displays error message for invalid phone number", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.change(screen.getByPlaceholderText("123-456-7890"), {
      target: { value: "123" },
    });
    expect(screen.getByText("请输入有效的电话号码格式 (123-456-7890)")).toBeInTheDocument();
  });

  test("clears input value when clear button is clicked", () => {
    renderWithTheme(
      <PhoneInput value="123-456-7890" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  test("calls onFocus when input is focused", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} onFocus={mockOnFocus} />,
      "light"
    );
    fireEvent.focus(screen.getByPlaceholderText("123-456-7890"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when input loses focus", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} onBlur={mockOnBlur} />,
      "light"
    );
    fireEvent.blur(screen.getByPlaceholderText("123-456-7890"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onHover when input is hovered", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} onHover={mockOnHover} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByPlaceholderText("123-456-7890"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("calls onDoubleClick when input is double-clicked", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} onDoubleClick={mockOnDoubleClick} />,
      "light"
    );
    fireEvent.doubleClick(screen.getByPlaceholderText("123-456-7890"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} onKeyDown={mockOnKeyDown} />,
      "light"
    );
    fireEvent.keyDown(screen.getByPlaceholderText("123-456-7890"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("applies custom classes", () => {
    renderWithTheme(
      <PhoneInput
        value=""
        onChange={mockOnChange}
        customClass="custom-class"
        customLabelClass="custom-label-class"
        customInputClass="custom-input-class"
      />,
      "light"
    );
    expect(screen.getByPlaceholderText("123-456-7890").parentElement).toHaveClass("custom-class");
    expect(screen.getByPlaceholderText("123-456-7890")).toHaveClass("custom-input-class");
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} />,
      "dark"
    );
    expect(screen.getByPlaceholderText("123-456-7890")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with international phone number format", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} international={true} />,
      "light"
    );
    expect(screen.getByPlaceholderText("+123-1234-1234-1234")).toBeInTheDocument();
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} tooltip="Custom Tooltip" />,
      "light"
    );
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with disabled state", () => {
    renderWithTheme(
      <PhoneInput value="" onChange={mockOnChange} disabled={true} />,
      "light"
    );
    expect(screen.getByPlaceholderText("123-456-7890")).toBeDisabled();
  });
});