// src/components/VerticalMenu.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VerticalMenu from "./VerticalMenu";
import { ThemeProvider } from "../context/ThemeContext";

describe("VerticalMenu Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnItemSelect = jest.fn();
  const mockOnItemHover = jest.fn();
  const mockOnItemFocus = jest.fn();
  const mockOnItemBlur = jest.fn();

  const items = [
    { label: "Item 1", icon: <span>Icon 1</span> },
    { label: "Item 2", icon: <span>Icon 2</span>, subItems: [{ label: "SubItem 1" }] },
    { label: "Item 3", icon: <span>Icon 3</span> },
  ];

  test("renders with default props", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} />, "light");
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Icon 1")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <VerticalMenu
        items={items}
        activeIndex={0}
        onItemSelect={mockOnItemSelect}
        onItemHover={mockOnItemHover}
        onItemFocus={mockOnItemFocus}
        onItemBlur={mockOnItemBlur}
        customClass="custom-class"
        customItemClass="custom-item-class"
        customActiveItemClass="custom-active-item-class"
        customIconClass="custom-icon-class"
        multiSelect={true}
        draggable={true}
        theme="dark"
        tooltip="Menu Tooltip"
        animation="transition duration-500 transform hover:scale-110"
        fullscreen={true}
        collapsible={true}
        hoverColor="hover:bg-gray-700"
        activeColor="bg-gray-900"
        disabledColor="text-gray-400"
        hoverAnimation="hover:scale-110"
        showLabels={true}
        labelColor="text-gray-200"
        labelActiveColor="text-white"
      />,
      "dark"
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Icon 1")).toBeInTheDocument();
  });

  test("calls onItemSelect when an item is clicked", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} />, "light");
    fireEvent.click(screen.getByText("Item 2"));
    expect(mockOnItemSelect).toHaveBeenCalledWith(1);
  });

  test("calls onItemHover when an item is hovered", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} onItemHover={mockOnItemHover} />, "light");
    fireEvent.mouseEnter(screen.getByText("Item 2"));
    expect(mockOnItemHover).toHaveBeenCalledWith(1);
  });

  test("calls onItemFocus when an item is focused", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} onItemFocus={mockOnItemFocus} />, "light");
    fireEvent.focus(screen.getByText("Item 2"));
    expect(mockOnItemFocus).toHaveBeenCalledWith(1);
  });

  test("calls onItemBlur when an item loses focus", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} onItemBlur={mockOnItemBlur} />, "light");
    fireEvent.blur(screen.getByText("Item 2"));
    expect(mockOnItemBlur).toHaveBeenCalledWith(1);
  });

  test("handles item drag and drop correctly", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} draggable={true} />, "light");
    const item1 = screen.getByText("Item 1");
    const item2 = screen.getByText("Item 2");
    fireEvent.dragStart(item1);
    fireEvent.dragEnter(item2);
    fireEvent.drop(item2);
    expect(mockOnItemSelect).toHaveBeenCalledWith(1);
  });

  test("handles collapse/expand functionality correctly", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} collapsible={true} />, "light");
    const collapseToggle = screen.getByText("▼");
    fireEvent.click(collapseToggle);
    expect(screen.queryByText("SubItem 1")).not.toBeInTheDocument();
    fireEvent.click(collapseToggle);
    expect(screen.getByText("SubItem 1")).toBeInTheDocument();
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<VerticalMenu items={items} activeIndex={0} onItemSelect={mockOnItemSelect} theme="astronomy" />, "astronomy");
    expect(screen.getByText("Item 1").closest("ul")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});