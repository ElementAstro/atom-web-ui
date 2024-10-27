// src/components/Icon.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Icon from "./Icon";
import { ThemeProvider } from "../context/ThemeContext";
import { FaBeer } from "react-icons/fa";

describe("Icon Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  test("renders with default props", () => {
    renderWithTheme(<Icon />, "light");
    expect(screen.getByLabelText("图标")).toBeInTheDocument();
  });

  test("renders with custom icon", () => {
    renderWithTheme(<Icon icon={FaBeer} />, "light");
    expect(screen.getByLabelText("图标")).toBeInTheDocument();
  });

  test("renders with custom name", () => {
    renderWithTheme(<Icon name="Custom Icon" />, "light");
    expect(screen.getByLabelText("Custom Icon")).toBeInTheDocument();
  });

  test("calls onClick handler", () => {
    const handleClick = jest.fn();
    renderWithTheme(<Icon onClick={handleClick} />, "light");
    fireEvent.click(screen.getByLabelText("图标"));
    expect(handleClick).toHaveBeenCalled();
  });

  test("calls onFocus handler", () => {
    const handleFocus = jest.fn();
    renderWithTheme(<Icon onFocus={handleFocus} />, "light");
    fireEvent.focus(screen.getByLabelText("图标"));
    expect(handleFocus).toHaveBeenCalled();
  });

  test("calls onBlur handler", () => {
    const handleBlur = jest.fn();
    renderWithTheme(<Icon onBlur={handleBlur} />, "light");
    fireEvent.blur(screen.getByLabelText("图标"));
    expect(handleBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown handler", () => {
    const handleKeyDown = jest.fn();
    renderWithTheme(<Icon onKeyDown={handleKeyDown} />, "light");
    fireEvent.keyDown(screen.getByLabelText("图标"), { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(<Icon />, "dark");
    expect(screen.getByLabelText("图标")).toHaveClass("text-white border-gray-700");
  });

  test("applies custom class", () => {
    renderWithTheme(<Icon customClass="custom-class" />, "light");
    expect(screen.getByLabelText("图标")).toHaveClass("custom-class");
  });

  test("renders with tooltip", () => {
    renderWithTheme(<Icon tooltip="Custom Tooltip" />, "light");
    expect(screen.getByLabelText("图标")).toHaveAttribute("title", "Custom Tooltip");
  });

  test("renders with custom aria label", () => {
    renderWithTheme(<Icon ariaLabel="Custom Aria Label" />, "light");
    expect(screen.getByLabelText("Custom Aria Label")).toBeInTheDocument();
  });

  test("renders with border", () => {
    renderWithTheme(<Icon border={true} borderWidth="4" borderColor="border-red-500" />, "light");
    expect(screen.getByLabelText("图标")).toHaveClass("border-4 border-red-500");
  });

  test("renders with custom color", () => {
    renderWithTheme(<Icon color="text-blue-600" />, "light");
    expect(screen.getByLabelText("图标")).toHaveStyle({ color: "text-blue-600" });
  });

  test("renders with custom size", () => {
    renderWithTheme(<Icon size="2em" />, "light");
    expect(screen.getByLabelText("图标")).toHaveStyle({ fontSize: "2em" });
  });

  test("renders with hover animation", () => {
    renderWithTheme(<Icon hoverAnimation="hover:scale-150" />, "light");
    expect(screen.getByLabelText("图标")).toHaveClass("hover:scale-150");
  });

  test("renders with disabled state", () => {
    renderWithTheme(<Icon disabled={true} />, "light");
    expect(screen.getByLabelText("图标")).toHaveStyle({ cursor: "not-allowed" });
    fireEvent.click(screen.getByLabelText("图标"));
    expect(screen.getByLabelText("图标")).toHaveClass("text-gray-400");
  });
});