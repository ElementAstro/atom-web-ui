// src/components/Menu.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Menu from "./Menu";
import { ThemeProvider } from "../context/ThemeContext";

describe("Menu Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();
  const mockOnItemClick = jest.fn();

  const items = [
    { label: "Item 1" },
    { label: "Item 2", disabled: true },
    { label: "Item 3", tooltip: "Tooltip for Item 3" },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Menu items={items} />, "light");
    expect(screen.getByText("菜单")).toBeInTheDocument();
  });

  test("calls onOpen when menu is opened", () => {
    renderWithTheme(<Menu items={items} onOpen={mockOnOpen} />, "light");
    fireEvent.click(screen.getByText("菜单"));
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test("calls onClose when menu is closed", () => {
    renderWithTheme(<Menu items={items} onClose={mockOnClose} />, "light");
    fireEvent.click(screen.getByText("菜单"));
    fireEvent.click(screen.getByText("菜单"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls onItemClick when an item is clicked", () => {
    renderWithTheme(<Menu items={items} onItemClick={mockOnItemClick} />, "light");
    fireEvent.click(screen.getByText("菜单"));
    fireEvent.click(screen.getByText("Item 1"));
    expect(mockOnItemClick).toHaveBeenCalledWith("Item 1");
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(<Menu items={items} tooltip="Custom Tooltip" />, "light");
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with icon on the left", () => {
    renderWithTheme(<Menu items={items} icon={<span>Icon</span>} iconPosition="left" />, "light");
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with icon on the right", () => {
    renderWithTheme(<Menu items={items} icon={<span>Icon</span>} iconPosition="right" />, "light");
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with full width", () => {
    renderWithTheme(<Menu items={items} fullWidth={true} />, "light");
    expect(screen.getByText("菜单").parentElement).toHaveClass("w-full");
  });

  test("renders with disabled state", () => {
    renderWithTheme(<Menu items={items} disabled={true} />, "light");
    expect(screen.getByText("菜单")).toBeDisabled();
  });

  test("renders with multi-select functionality", () => {
    renderWithTheme(<Menu items={items} multiSelect={true} />, "light");
    fireEvent.click(screen.getByText("菜单"));
    fireEvent.click(screen.getByText("Item 1"));
    fireEvent.click(screen.getByText("Item 3"));
    expect(screen.getByText("Item 1")).toHaveClass("customItemSelectedClass");
    expect(screen.getByText("Item 3")).toHaveClass("customItemSelectedClass");
  });

  test("applies theme classes", () => {
    renderWithTheme(<Menu items={items} />, "dark");
    expect(screen.getByText("菜单")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom class", () => {
    renderWithTheme(<Menu items={items} customClass="custom-class" />, "light");
    expect(screen.getByText("菜单").parentElement).toHaveClass("custom-class");
  });

  test("renders with open animation", () => {
    renderWithTheme(<Menu items={items} openAnimation="fade-in" />, "light");
    fireEvent.click(screen.getByText("菜单"));
    expect(screen.getByRole("list")).toHaveClass("fade-in");
  });

  test("renders with close animation", () => {
    renderWithTheme(<Menu items={items} closeAnimation="fade-out" />, "light");
    fireEvent.click(screen.getByText("菜单"));
    fireEvent.click(screen.getByText("菜单"));
    expect(screen.getByRole("list")).toHaveClass("fade-out");
  });

  test("closes menu when clicking outside", () => {
    renderWithTheme(<Menu items={items} closeOnClickOutside={true} />, "light");
    fireEvent.click(screen.getByText("菜单"));
    fireEvent.mouseDown(document);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});