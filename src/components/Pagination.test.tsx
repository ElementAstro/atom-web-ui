// src/components/Pagination.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pagination from "./Pagination";
import { ThemeProvider } from "../context/ThemeContext";

describe("Pagination Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnPageChange = jest.fn();
  const mockOnPageHover = jest.fn();
  const mockOnDoubleClickButton = jest.fn();
  const mockOnDoubleClickInput = jest.fn();
  const mockOnKeyDown = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
      "light"
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("calls onPageChange when a page button is clicked", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
      "light"
    );
    fireEvent.click(screen.getByText("2"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageHover when a page button is hovered", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        onPageHover={mockOnPageHover}
      />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("2"));
    expect(mockOnPageHover).toHaveBeenCalledWith(2);
  });

  test("calls onDoubleClickButton when a page button is double-clicked", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        onDoubleClickButton={mockOnDoubleClickButton}
      />,
      "light"
    );
    fireEvent.doubleClick(screen.getByText("2"));
    expect(mockOnDoubleClickButton).toHaveBeenCalled();
  });

  test("calls onDoubleClickInput when the input is double-clicked", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        onDoubleClickInput={mockOnDoubleClickInput}
      />,
      "light"
    );
    fireEvent.doubleClick(screen.getByPlaceholderText("页"));
    expect(mockOnDoubleClickInput).toHaveBeenCalled();
  });

  test("calls onKeyDown when a key is pressed", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        onKeyDown={mockOnKeyDown}
      />,
      "light"
    );
    fireEvent.keyDown(screen.getByText("2"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("changes page when input value is changed and blurred", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
      "light"
    );
    const input = screen.getByPlaceholderText("页");
    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.blur(input);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
      "dark"
    );
    expect(screen.getByText("1").parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("disables previous button on first page", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
      "light"
    );
    expect(screen.getByText("« 上")).toBeDisabled();
  });

  test("disables next button on last page", () => {
    renderWithTheme(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
      "light"
    );
    expect(screen.getByText("下 »")).toBeDisabled();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        customClass="custom-class"
      />,
      "light"
    );
    expect(screen.getByRole("navigation")).toHaveClass("custom-class");
  });

  test("renders with custom button class", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        customButtonClass="custom-button-class"
      />,
      "light"
    );
    expect(screen.getByText("1")).toHaveClass("custom-button-class");
  });

  test("renders with custom input class", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        customInputClass="custom-input-class"
      />,
      "light"
    );
    expect(screen.getByPlaceholderText("页")).toHaveClass("custom-input-class");
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        tooltip="Custom Tooltip"
      />,
      "light"
    );
    expect(screen.getByText("« 首")).toHaveAttribute("title", "Custom Tooltip");
  });

  test("renders with icon", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        icon={<span>Icon</span>}
      />,
      "light"
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with compact mode", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        compact={true}
      />,
      "light"
    );
    expect(screen.getByRole("navigation")).toHaveClass("space-x-0.5");
  });

  test("renders with hover color", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        hoverColor="hover:bg-red-500"
      />,
      "light"
    );
    expect(screen.getByText("1")).toHaveClass("hover:bg-red-500");
  });

  test("renders with active color", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        activeColor="text-red-500"
      />,
      "light"
    );
    expect(screen.getByText("1")).toHaveClass("text-red-500");
  });

  test("renders with disabled color", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        disabledColor="text-red-500"
      />,
      "light"
    );
    expect(screen.getByText("« 上")).toHaveClass("text-red-500");
  });

  test("renders with hover animation", () => {
    renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
        hoverAnimation="hover:scale-110"
      />,
      "light"
    );
    expect(screen.getByText("1")).toHaveClass("hover:scale-110");
  });
});
