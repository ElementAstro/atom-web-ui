// src/components/Calendar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Calendar from "./Calendar";
import { ThemeProvider } from "../context/ThemeContext";

describe("Calendar Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  test("renders with default props", () => {
    renderWithTheme(<Calendar />, "light");
    const buttonElement = screen.getByRole("button", { name: /select date/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("toggles calendar visibility", () => {
    renderWithTheme(<Calendar />, "light");
    const buttonElement = screen.getByRole("button", { name: /select date/i });
    fireEvent.click(buttonElement);
    const dropdownElement = screen.getByRole("dialog");
    expect(dropdownElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(dropdownElement).not.toBeInTheDocument();
  });

  test("handles date change", () => {
    const handleDateChange = jest.fn();
    renderWithTheme(<Calendar onDateChange={handleDateChange} />, "light");
    const buttonElement = screen.getByRole("button", { name: /select date/i });
    fireEvent.click(buttonElement);
    const inputElement = screen.getByLabelText(/calendar/i);
    fireEvent.change(inputElement, { target: { value: "2023-10-10" } });
    expect(handleDateChange).toHaveBeenCalledWith(new Date("2023-10-10"));
  });

  test("handles time change", () => {
    const handleTimeChange = jest.fn();
    renderWithTheme(<Calendar onTimeChange={handleTimeChange} />, "light");
    const buttonElement = screen.getByRole("button", { name: /select date/i });
    fireEvent.click(buttonElement);
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "14:00" } });
    expect(handleTimeChange).toHaveBeenCalledWith(expect.any(Date));
  });

  test("handles clear button", () => {
    const handleDateChange = jest.fn();
    renderWithTheme(
      <Calendar onDateChange={handleDateChange} clearable />,
      "light"
    );
    const buttonElement = screen.getByRole("button", { name: /select date/i });
    fireEvent.click(buttonElement);
    const clearButton = screen.getByRole("button", { name: /清除/i });
    fireEvent.click(clearButton);
    expect(handleDateChange).toHaveBeenCalledWith(null);
  });

  test("applies custom classes", () => {
    renderWithTheme(
      <Calendar
        customClass="custom-calendar"
        customButtonClass="custom-button"
        customInputClass="custom-input"
        customDropdownClass="custom-dropdown"
        customClearButtonClass="custom-clear-button"
      />,
      "light"
    );
    const calendarElement = screen.getByRole("button", {
      name: /select date/i,
    }).parentElement;
    expect(calendarElement).toHaveClass("custom-calendar");
    expect(screen.getByRole("button", { name: /select date/i })).toHaveClass(
      "custom-button"
    );
    fireEvent.click(screen.getByRole("button", { name: /select date/i }));
    expect(screen.getByRole("dialog")).toHaveClass("custom-dropdown");
    expect(screen.getByLabelText(/calendar/i)).toHaveClass("custom-input");
    expect(screen.getByRole("button", { name: /清除/i })).toHaveClass(
      "custom-clear-button"
    );
  });

  test("applies theme classes", () => {
    renderWithTheme(<Calendar />, "dark");
    fireEvent.click(screen.getByRole("button", { name: /select date/i }));
    const dropdownElement = screen.getByRole("dialog");
    expect(dropdownElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("handles keyboard interactions", () => {
    const handleKeyDown = jest.fn();
    renderWithTheme(<Calendar onKeyDown={handleKeyDown} />, "light");
    fireEvent.click(screen.getByRole("button", { name: /select date/i }));
    const dropdownElement = screen.getByRole("dialog");
    fireEvent.keyDown(dropdownElement, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  test("handles mouse interactions", () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    renderWithTheme(
      <Calendar
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />,
      "light"
    );
    fireEvent.click(screen.getByRole("button", { name: /select date/i }));
    const dropdownElement = screen.getByRole("dialog");
    fireEvent.mouseEnter(dropdownElement);
    expect(handleMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(dropdownElement);
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  test("handles animation end", () => {
    const handleAnimationEnd = jest.fn();
    renderWithTheme(<Calendar onAnimationEnd={handleAnimationEnd} />, "light");
    fireEvent.click(screen.getByRole("button", { name: /select date/i }));
    const dropdownElement = screen.getByRole("dialog");
    fireEvent.animationEnd(dropdownElement);
    expect(handleAnimationEnd).toHaveBeenCalled();
  });

  test("renders week numbers", () => {
    renderWithTheme(<Calendar showWeekNumbers />, "light");
    fireEvent.click(screen.getByRole("button", { name: /select date/i }));
    const weekNumbers = screen.getAllByText(/week/i);
    expect(weekNumbers.length).toBeGreaterThan(0);
  });
});
