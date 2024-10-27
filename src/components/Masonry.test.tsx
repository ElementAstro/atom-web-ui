// src/components/Masonry.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Masonry from "./Masonry";
import { ThemeProvider } from "../context/ThemeContext";

describe("Masonry Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const items = [<div>Item 1</div>, <div>Item 2</div>, <div>Item 3</div>];

  test("renders with default props", () => {
    renderWithTheme(<Masonry items={items} />, "light");
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  test("renders with custom columns and gap", () => {
    renderWithTheme(<Masonry items={items} columns={4} gap={2} />, "light");
    expect(screen.getByText("Item 1").parentElement).toHaveClass("grid-cols-4 gap-2");
  });

  test("applies custom background and text color", () => {
    renderWithTheme(<Masonry items={items} bgColor="gray-200" textColor="red-500" />, "light");
    expect(screen.getByText("Item 1").parentElement).toHaveClass("bg-gray-200 text-red-500");
  });

  test("renders with custom class", () => {
    renderWithTheme(<Masonry items={items} customClass="custom-class" />, "light");
    expect(screen.getByText("Item 1").parentElement).toHaveClass("custom-class");
  });

  test("renders items with custom item class", () => {
    renderWithTheme(<Masonry items={items} customItemClass="custom-item-class" />, "light");
    expect(screen.getByText("Item 1")).toHaveClass("custom-item-class");
  });

  test("applies hover and active colors", () => {
    renderWithTheme(<Masonry items={items} hoverColor="hover:bg-blue-500" activeColor="active:bg-red-500" />, "light");
    expect(screen.getByText("Item 1")).toHaveClass("hover:bg-blue-500 active:bg-red-500");
  });

  test("renders with disabled state", () => {
    renderWithTheme(<Masonry items={items} disabled={true} />, "light");
    expect(screen.getByText("Item 1")).toHaveClass("opacity-50 cursor-not-allowed");
  });

  test("renders with custom hover animation", () => {
    renderWithTheme(<Masonry items={items} hoverAnimation="hover:rotate-6" />, "light");
    expect(screen.getByText("Item 1")).toHaveClass("hover:rotate-6");
  });

  test("renders items using custom renderItem function", () => {
    const customRenderItem = (item: React.ReactNode) => <div className="custom-render">{item}</div>;
    renderWithTheme(<Masonry items={items} renderItem={customRenderItem} />, "light");
    expect(screen.getByText("Item 1").parentElement).toHaveClass("custom-render");
  });
});