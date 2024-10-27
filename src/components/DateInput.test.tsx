// src/components/DateInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DateInput from "./DateInput";
import { ThemeProvider } from "../context/ThemeContext";

describe("DateInput Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnHover = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toBeInTheDocument();
  });

  test("renders with custom label", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} label="Custom Label" />,
      "light"
    );
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  test("calls onChange when date is selected", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.change(screen.getByPlaceholderText("请选择日期"), {
      target: { value: "2023-10-10" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("2023-10-10");
  });

  test("calls onFocus when input is focused", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} onFocus={mockOnFocus} />,
      "light"
    );
    fireEvent.focus(screen.getByPlaceholderText("请选择日期"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when input is blurred", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} onBlur={mockOnBlur} />,
      "light"
    );
    fireEvent.blur(screen.getByPlaceholderText("请选择日期"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onHover when input is hovered", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} onHover={mockOnHover} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByPlaceholderText("请选择日期"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} customClass="custom-class" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期").parentElement).toHaveClass("custom-class");
  });

  test("renders with custom input class", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} customInputClass="custom-input-class" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveClass("custom-input-class");
  });

  test("renders with custom label class", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} label="Custom Label" customLabelClass="custom-label-class" />,
      "light"
    );
    expect(screen.getByText("Custom Label")).toHaveClass("custom-label-class");
  });

  test("displays error message for invalid date", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} minDate="2023-01-01" maxDate="2023-12-31" />,
      "light"
    );
    fireEvent.change(screen.getByPlaceholderText("请选择日期"), {
      target: { value: "2024-01-01" },
    });
    expect(screen.getByText("请输入 2023-01-01 到 2023-12-31 之间的有效日期")).toBeInTheDocument();
  });

  test("clears date when clear button is clicked", () => {
    renderWithTheme(
      <DateInput value="2023-10-10" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  test("toggles date picker when calendar icon is clicked", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} />,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /calendar/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} />,
      "dark"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom date format", () => {
    renderWithTheme(
      <DateInput value="2023-10-10" onChange={mockOnChange} dateFormat="dd/MM/yyyy" />,
      "light"
    );
    expect(screen.getByDisplayValue("10/10/2023")).toBeInTheDocument();
  });

  test("renders with custom placeholder", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} placeholder="Enter date" />,
      "light"
    );
    expect(screen.getByPlaceholderText("Enter date")).toBeInTheDocument();
  });

  test("renders with custom icons", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} calendarIcon={<span>📅</span>} clearIcon={<span>❌</span>} />,
      "light"
    );
    expect(screen.getByText("📅")).toBeInTheDocument();
    expect(screen.getByText("❌")).toBeInTheDocument();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} tooltip="Select a date" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("title", "Select a date");
  });

  test("renders with custom border width", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} borderWidth="4" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} animation="custom-animation" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveClass("custom-animation");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} ariaLabel="Custom Aria Label" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("aria-label", "Custom Aria Label");
  });

  test("renders with custom tab index", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} tabIndex={5} />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("tabindex", "5");
  });

  test("renders with custom input mode", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} inputMode="numeric" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("inputmode", "numeric");
  });

  test("renders with custom spell check", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} spellCheck={false} />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("spellcheck", "false");
  });

  test("renders with custom max length", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} maxLength={10} />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("maxlength", "10");
  });

  test("renders with custom pattern", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} pattern="\d{4}-\d{2}-\d{2}" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("pattern", "\\d{4}-\\d{2}-\\d{2}");
  });

  test("renders with custom name and id", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} name="custom-name" id="custom-id" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("name", "custom-name");
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("id", "custom-id");
  });

  test("renders with auto focus", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} autoFocus={true} />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveFocus();
  });

  test("renders with required attribute", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} required={true} />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toBeRequired();
  });

  test("renders with read only attribute", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} readOnly={true} />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("readonly");
  });

  test("renders with auto complete attribute", () => {
    renderWithTheme(
      <DateInput value="" onChange={mockOnChange} autoComplete="off" />,
      "light"
    );
    expect(screen.getByPlaceholderText("请选择日期")).toHaveAttribute("autocomplete", "off");
  });
});