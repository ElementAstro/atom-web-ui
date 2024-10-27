// src/components/FlowLayout.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FlowLayout from "./FlowLayout";
import { ThemeProvider } from "../context/ThemeContext";

describe("FlowLayout Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockItems = ["Item 1", "Item 2", "Item 3"];
  const mockOnItemClick = jest.fn();
  const mockOnItemHover = jest.fn();
  const mockOnDragEnd = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<FlowLayout items={mockItems} />, "light");
    mockItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("calls onItemClick when an item is clicked", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} onItemClick={mockOnItemClick} />,
      "light"
    );
    fireEvent.click(screen.getByText("Item 1"));
    expect(mockOnItemClick).toHaveBeenCalledWith("Item 1");
  });

  test("calls onItemHover when an item is hovered", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} onItemHover={mockOnItemHover} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Item 1"));
    expect(mockOnItemHover).toHaveBeenCalledWith("Item 1");
  });

  test("handles drag and drop", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} onDragEnd={mockOnDragEnd} />,
      "light"
    );
    const item1 = screen.getByText("Item 1");
    const item2 = screen.getByText("Item 2");

    fireEvent.dragStart(item1);
    fireEvent.dragEnter(item2);
    fireEvent.drop(item2);

    expect(mockOnDragEnd).toHaveBeenCalledWith(["Item 2", "Item 1", "Item 3"]);
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} customClass="custom-class" />,
      "light"
    );
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).toHaveClass("custom-class");
  });

  test("renders with search functionality", () => {
    renderWithTheme(<FlowLayout items={mockItems} showSearch />, "light");
    const searchInput = screen.getByPlaceholderText("搜索...");
    fireEvent.change(searchInput, { target: { value: "Item 1" } });
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
  });

  test("clears search input when clear button is clicked", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} showSearch clearable />,
      "light"
    );
    const searchInput = screen.getByPlaceholderText("搜索...");
    fireEvent.change(searchInput, { target: { value: "Item 1" } });
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(searchInput).toHaveValue("");
  });

  test("applies theme classes", () => {
    renderWithTheme(<FlowLayout items={mockItems} />, "dark");
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with custom border width", () => {
    renderWithTheme(<FlowLayout items={mockItems} borderWidth="4" />, "light");
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).toHaveClass("border-4");
  });

  test("renders with custom animation", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} animation="custom-animation" />,
      "light"
    );
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).toHaveClass("custom-animation");
  });

  test("renders with custom icon", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} icon={<span>Icon</span>} />,
      "light"
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with custom text transform", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} textTransform="uppercase" />,
      "light"
    );
    expect(screen.getByText("Item 1")).toHaveClass("uppercase");
  });

  test("renders with custom border style", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} borderStyle="dashed" />,
      "light"
    );
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).toHaveClass("border-dashed");
  });

  test("renders with custom border color", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} borderColor="red-500" />,
      "light"
    );
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).toHaveClass("border-red-500");
  });

  test("renders with custom shadow", () => {
    renderWithTheme(<FlowLayout items={mockItems} shadow={false} />, "light");
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).not.toHaveClass("shadow-lg");
  });

  test("renders with custom hover effect", () => {
    renderWithTheme(
      <FlowLayout items={mockItems} hoverEffect={false} />,
      "light"
    );
    expect(
      screen.getByRole("button", { name: "Flow item" }).parentElement
    ).not.toHaveClass("hover:shadow-xl");
  });
});
