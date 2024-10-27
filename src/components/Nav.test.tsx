// src/components/Nav.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navs from "./Nav";
import { ThemeProvider } from "../context/ThemeContext";

describe("Nav Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnNavClick = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  const items = [
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Contact", value: "contact", disabled: true },
  ];

  test("renders with default props", () => {
    renderWithTheme(<Navs items={items} onNavClick={mockOnNavClick} />, "light");
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("calls onNavClick when a nav item is clicked", () => {
    renderWithTheme(<Navs items={items} onNavClick={mockOnNavClick} />, "light");
    fireEvent.click(screen.getByText("Home"));
    expect(mockOnNavClick).toHaveBeenCalledWith("home");
  });

  test("calls onHover when a nav item is hovered", () => {
    renderWithTheme(
      <Navs items={items} onNavClick={mockOnNavClick} onHover={mockOnHover} />,
      "light"
    );
    fireEvent.mouseEnter(screen.getByText("Home"));
    expect(mockOnHover).toHaveBeenCalledWith("home");
  });

  test("calls onFocus and onBlur event handlers", () => {
    renderWithTheme(
      <Navs
        items={items}
        onNavClick={mockOnNavClick}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
      "light"
    );
    const homeButton = screen.getByText("Home");
    fireEvent.focus(homeButton);
    expect(mockOnFocus).toHaveBeenCalledWith("home");
    fireEvent.blur(homeButton);
    expect(mockOnBlur).toHaveBeenCalledWith("home");
  });

  test("applies custom class", () => {
    renderWithTheme(
      <Navs items={items} onNavClick={mockOnNavClick} customClass="custom-class" />,
      "light"
    );
    expect(screen.getByText("Home").parentElement?.parentElement).toHaveClass(
      "custom-class"
    );
  });

  test("applies theme classes", () => {
    renderWithTheme(<Navs items={items} onNavClick={mockOnNavClick} />, "dark");
    expect(screen.getByText("Home").parentElement?.parentElement).toHaveClass(
      "bg-gray-900 text-white border-gray-700"
    );
  });

  test("renders with disabled state", () => {
    renderWithTheme(<Navs items={items} onNavClick={mockOnNavClick} />, "light");
    expect(screen.getByText("Contact").parentElement).toHaveClass(
      "text-gray-400"
    );
  });

  test("renders with custom tooltip", () => {
    renderWithTheme(
      <Navs items={items} onNavClick={mockOnNavClick} tooltip="Custom Tooltip" />,
      "light"
    );
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("renders with custom icon", () => {
    renderWithTheme(
      <Navs
        items={items}
        onNavClick={mockOnNavClick}
        icon={<span>Icon</span>}
        iconPosition="left"
      />,
      "light"
    );
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with multi-select functionality", () => {
    renderWithTheme(
      <Navs items={items} onNavClick={mockOnNavClick} multiSelect={true} />,
      "light"
    );
    fireEvent.click(screen.getByText("Home"));
    fireEvent.click(screen.getByText("About"));
    expect(screen.getByText("Home").parentElement).toHaveClass("bg-blue-500 text-white");
    expect(screen.getByText("About").parentElement).toHaveClass("bg-blue-500 text-white");
  });
});