// src/components/LoadMore.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoadMore from "./LoadMore";
import { ThemeProvider } from "../context/ThemeContext";

describe("LoadMore Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnClick = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <LoadMore onClick={mockOnClick} loading={false} />,
      "light"
    );
    expect(screen.getByText("加载更多")).toBeInTheDocument();
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <LoadMore
        onClick={mockOnClick}
        loading={false}
        tooltip="Load more items"
      />,
      "light"
    );
    expect(screen.getByTitle("Load more items")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    renderWithTheme(
      <LoadMore onClick={mockOnClick} loading={false} />,
      "light"
    );
    fireEvent.click(screen.getByText("加载更多"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("calls onHover when hovered", () => {
    renderWithTheme(
      <LoadMore onClick={mockOnClick} loading={false} onHover={mockOnHover} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("加载更多"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("calls onFocus when focused", () => {
    renderWithTheme(
      <LoadMore onClick={mockOnClick} loading={false} onFocus={mockOnFocus} />,
      "light"
    );
    fireEvent.focus(screen.getByText("加载更多"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when blurred", () => {
    renderWithTheme(
      <LoadMore onClick={mockOnClick} loading={false} onBlur={mockOnBlur} />,
      "light"
    );
    fireEvent.blur(screen.getByText("加载更多"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("renders loading spinner when loading", () => {
    renderWithTheme(<LoadMore onClick={mockOnClick} loading={true} />, "light");
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("加载中...")).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<LoadMore onClick={mockOnClick} loading={false} />, "dark");
    expect(screen.getByText("加载更多")).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <LoadMore
        onClick={mockOnClick}
        loading={false}
        customClass="custom-class"
      />,
      "light"
    );
    expect(screen.getByText("加载更多")).toHaveClass("custom-class");
  });

  test("renders with icon on the left", () => {
    renderWithTheme(
      <LoadMore
        onClick={mockOnClick}
        loading={false}
        icon={<span>Icon</span>}
        iconPosition="left"
      />,
      "light"
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("加载更多")).toBeInTheDocument();
  });

  test("renders with icon on the right", () => {
    renderWithTheme(
      <LoadMore
        onClick={mockOnClick}
        loading={false}
        icon={<span>Icon</span>}
        iconPosition="right"
      />,
      "light"
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("加载更多")).toBeInTheDocument();
  });

  test("renders with full width", () => {
    renderWithTheme(
      <LoadMore onClick={mockOnClick} loading={false} fullWidth={true} />,
      "light"
    );
    expect(screen.getByText("加载更多").parentElement).toHaveClass("w-full");
  });

  test("renders with disabled state", () => {
    renderWithTheme(
      <LoadMore onClick={mockOnClick} loading={false} disabled={true} />,
      "light"
    );
    expect(screen.getByText("加载更多")).toBeDisabled();
  });
});
