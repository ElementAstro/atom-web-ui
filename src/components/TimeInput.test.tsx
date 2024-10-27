// src/components/TimeInput.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TimeInput from "./TimeInput";
import { ThemeProvider } from "../context/ThemeContext";

describe("TimeInput Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnHover = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} />, "light");
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <TimeInput
        value="12:00"
        onChange={mockOnChange}
        label="Time"
        disabled={false}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onHover={mockOnHover}
        customClass="custom-class"
        customLabelClass="custom-label-class"
        customInputClass="custom-input-class"
        minTime="08:00"
        maxTime="18:00"
        defaultValue="10:00"
        theme="dark"
        tooltip="Clear time"
        borderWidth="2"
        icon={<span>Clear</span>}
        fullscreen={true}
        hoverColor="hover:bg-gray-700"
        activeColor="active:bg-gray-900"
        disabledColor="opacity-50 cursor-not-allowed"
        hoverAnimation="hover:scale-105"
        showLabels={true}
        labelColor="text-gray-200"
        labelActiveColor="text-white"
      />,
      "dark"
    );
    expect(screen.getByLabelText("Time")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  test("calls onChange when time is changed", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} />, "light");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "12:00" } });
    expect(mockOnChange).toHaveBeenCalledWith("12:00");
  });

  test("clears the time when clear button is clicked", () => {
    renderWithTheme(<TimeInput value="12:00" onChange={mockOnChange} />, "light");
    fireEvent.click(screen.getByText("Clear"));
    expect(mockOnChange).toHaveBeenCalledWith("");
  });

  test("calls onFocus when input is focused", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} onFocus={mockOnFocus} />, "light");
    fireEvent.focus(screen.getByRole("textbox"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when input is blurred", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} onBlur={mockOnBlur} />, "light");
    fireEvent.blur(screen.getByRole("textbox"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onHover when input is hovered", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} onHover={mockOnHover} />, "light");
    fireEvent.mouseEnter(screen.getByRole("textbox"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("shows error for invalid time format", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} />, "light");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "25:00" } });
    expect(screen.getByText("请输入有效的时间格式 (HH:MM)")).toBeInTheDocument();
  });

  test("shows error for time out of range", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} minTime="08:00" maxTime="18:00" />, "light");
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "07:00" } });
    expect(screen.getByText("请输入 08:00 到 18:00 之间的时间")).toBeInTheDocument();
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<TimeInput onChange={mockOnChange} theme="astronomy" />, "astronomy");
    expect(screen.getByRole("textbox").closest("div")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});