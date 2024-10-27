// src/components/Switch.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Switch from "./Switch";
import { ThemeProvider } from "../context/ThemeContext";

describe("Switch Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnChange = jest.fn();
  const mockOnToggle = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnAnimationEnd = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} />, "light");
    expect(screen.getByLabelText("Toggle switch")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Switch
        checked={true}
        onChange={mockOnChange}
        label="Custom Label"
        onToggle={mockOnToggle}
        disabled={false}
        size="large"
        onHover={mockOnHover}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onAnimationEnd={mockOnAnimationEnd}
        color="green"
        labelPosition="left"
        loading={false}
        icon={<span>Icon</span>}
        tooltip="Switch Tooltip"
        theme="dark"
        borderWidth="4"
        animation="transition-opacity duration-500 ease-in-out"
        fullscreen={true}
        onDoubleClick={mockOnDoubleClick}
        onKeyDown={mockOnKeyDown}
        ariaLabel="Custom Switch"
        hoverColor="hover-color"
        activeColor="active-color"
        disabledColor="disabled-color"
        hoverAnimation="hover-animation"
        showLabels={true}
        labelColor="text-gray-200"
        labelActiveColor="text-white"
      />,
      "dark"
    );
    expect(screen.getByLabelText("Custom Switch")).toBeInTheDocument();
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("calls onChange and onToggle when toggled", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} onToggle={mockOnToggle} />, "light");
    fireEvent.click(screen.getByLabelText("Toggle switch"));
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnToggle).toHaveBeenCalledWith(true);
  });

  test("handles hover functionality", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} onHover={mockOnHover} />, "light");
    fireEvent.mouseEnter(screen.getByLabelText("Toggle switch"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("handles focus and blur functionality", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} onFocus={mockOnFocus} onBlur={mockOnBlur} />, "light");
    fireEvent.focus(screen.getByLabelText("Toggle switch"));
    expect(mockOnFocus).toHaveBeenCalled();
    fireEvent.blur(screen.getByLabelText("Toggle switch"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("handles key down functionality", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByLabelText("Toggle switch"), { key: "Enter", code: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("handles animation end functionality", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} onAnimationEnd={mockOnAnimationEnd} />, "light");
    fireEvent.animationEnd(screen.getByLabelText("Toggle switch"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("handles double click functionality", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} onDoubleClick={mockOnDoubleClick} />, "light");
    fireEvent.doubleClick(screen.getByLabelText("Toggle switch"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("displays loading state", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} loading={true} />, "light");
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders icon when provided", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} icon={<span>Icon</span>} />, "light");
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("displays tooltip when provided", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} tooltip="Switch Tooltip" />, "light");
    expect(screen.getByLabelText("Toggle switch")).toHaveAttribute("title", "Switch Tooltip");
  });

  test("applies theme classes", () => {
    renderWithTheme(<Switch checked={false} onChange={mockOnChange} theme="astronomy" />, "astronomy");
    expect(screen.getByLabelText("Toggle switch").parentElement).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});