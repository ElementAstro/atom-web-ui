// src/components/ListGroup.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ListGroup from "./ListGroup";
import { ThemeProvider } from "../context/ThemeContext";

describe("ListGroup Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnItemClick = jest.fn();
  const mockOnItemHover = jest.fn();
  const mockOnContextMenu = jest.fn();
  const mockOnDragEnd = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnCheckboxChange = jest.fn();

  const items = ["Item 1", "Item 2", "Item 3"];

  test("renders with default props", () => {
    renderWithTheme(<ListGroup items={items} />, "light");
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders with custom aria label", () => {
    renderWithTheme(<ListGroup items={items} ariaLabel="Custom Aria Label" />, "light");
    items.forEach((item, index) => {
      expect(screen.getByLabelText(`Custom Aria Label ${index + 1}`)).toBeInTheDocument();
    });
  });

  test("calls onItemClick when an item is clicked", () => {
    renderWithTheme(<ListGroup items={items} onItemClick={mockOnItemClick} />, "light");
    fireEvent.click(screen.getByText("Item 1"));
    expect(mockOnItemClick).toHaveBeenCalledWith("Item 1");
  });

  test("calls onItemHover when an item is hovered", () => {
    renderWithTheme(<ListGroup items={items} onItemHover={mockOnItemHover} />, "light");
    fireEvent.mouseEnter(screen.getByText("Item 1"));
    expect(mockOnItemHover).toHaveBeenCalledWith("Item 1");
  });

  test("applies theme classes", () => {
    renderWithTheme(<ListGroup items={items} />, "dark");
    expect(screen.getByText("Item 1")).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom class", () => {
    renderWithTheme(<ListGroup items={items} customClass="custom-class" />, "light");
    expect(screen.getByText("Item 1")).toHaveClass("custom-class");
  });

  test("displays tooltip", () => {
    renderWithTheme(<ListGroup items={items} showTooltip={true} tooltip="Tooltip text" />, "light");
    fireEvent.mouseEnter(screen.getByText("Item 1"));
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  test("applies ripple effect on click", () => {
    renderWithTheme(<ListGroup items={items} rippleEffect={true} />, "light");
    const item = screen.getByText("Item 1");
    fireEvent.click(item);
    expect(item.querySelector(".ripple")).toBeInTheDocument();
  });

  test("renders with checkboxes", () => {
    renderWithTheme(<ListGroup items={items} showCheckbox={true} />, "light");
    expect(screen.getAllByRole("checkbox").length).toBe(items.length);
  });

  test("calls onCheckboxChange when checkbox is changed", () => {
    renderWithTheme(<ListGroup items={items} showCheckbox={true} onCheckboxChange={mockOnCheckboxChange} />, "light");
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(mockOnCheckboxChange).toHaveBeenCalledWith(0);
  });

  test("handles keyboard navigation", () => {
    renderWithTheme(<ListGroup items={items} onItemClick={mockOnItemClick} />, "light");
    fireEvent.keyDown(document, { key: "ArrowDown" });
    expect(mockOnItemClick).toHaveBeenCalledWith("Item 1");
    fireEvent.keyDown(document, { key: "ArrowDown" });
    expect(mockOnItemClick).toHaveBeenCalledWith("Item 2");
    fireEvent.keyDown(document, { key: "ArrowUp" });
    expect(mockOnItemClick).toHaveBeenCalledWith("Item 1");
  });

  test("handles drag and drop", () => {
    renderWithTheme(<ListGroup items={items} onDragEnd={mockOnDragEnd} />, "light");
    const item = screen.getByText("Item 1");
    fireEvent.dragEnd(item, { dataTransfer: { getData: () => "0", setData: () => {} } });
    expect(mockOnDragEnd).toHaveBeenCalled();
  });

  test("calls onContextMenu when context menu is opened", () => {
    renderWithTheme(<ListGroup items={items} onContextMenu={mockOnContextMenu} />, "light");
    fireEvent.contextMenu(screen.getByText("Item 1"));
    expect(mockOnContextMenu).toHaveBeenCalled();
  });

  test("calls onDoubleClick when item is double-clicked", () => {
    renderWithTheme(<ListGroup items={items} onDoubleClick={mockOnDoubleClick} />, "light");
    fireEvent.doubleClick(screen.getByText("Item 1"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(<ListGroup items={items} onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByText("Item 1"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });
});