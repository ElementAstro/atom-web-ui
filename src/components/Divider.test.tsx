// src/components/Divider.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Divider from "./Divider";
import { ThemeProvider } from "../context/ThemeContext";

describe("Divider Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnClick = jest.fn();
  const mockOnDoubleClick = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnKeyDown = jest.fn();
  const mockOnMouseEnter = jest.fn();
  const mockOnMouseLeave = jest.fn();
  const mockOnAnimationEnd = jest.fn();
  const mockOnHover = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<Divider />, "light");
    expect(screen.getByLabelText("Divider")).toBeInTheDocument();
  });

  test("renders with custom title", () => {
    renderWithTheme(<Divider title="Custom Title" />, "light");
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    renderWithTheme(<Divider onClick={mockOnClick} />, "light");
    fireEvent.click(screen.getByLabelText("Divider"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("calls onDoubleClick when double-clicked", () => {
    renderWithTheme(<Divider onDoubleClick={mockOnDoubleClick} />, "light");
    fireEvent.doubleClick(screen.getByLabelText("Divider"));
    expect(mockOnDoubleClick).toHaveBeenCalled();
  });

  test("calls onFocus when focused", () => {
    renderWithTheme(<Divider onFocus={mockOnFocus} />, "light");
    fireEvent.focus(screen.getByLabelText("Divider"));
    expect(mockOnFocus).toHaveBeenCalled();
  });

  test("calls onBlur when blurred", () => {
    renderWithTheme(<Divider onBlur={mockOnBlur} />, "light");
    fireEvent.blur(screen.getByLabelText("Divider"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("calls onKeyDown when key is pressed", () => {
    renderWithTheme(<Divider onKeyDown={mockOnKeyDown} />, "light");
    fireEvent.keyDown(screen.getByLabelText("Divider"), { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  test("calls onMouseEnter when mouse enters", () => {
    renderWithTheme(<Divider onMouseEnter={mockOnMouseEnter} />, "light");
    fireEvent.mouseEnter(screen.getByLabelText("Divider"));
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  test("calls onMouseLeave when mouse leaves", () => {
    renderWithTheme(<Divider onMouseLeave={mockOnMouseLeave} />, "light");
    fireEvent.mouseLeave(screen.getByLabelText("Divider"));
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  test("calls onAnimationEnd when animation ends", () => {
    renderWithTheme(<Divider onAnimationEnd={mockOnAnimationEnd} />, "light");
    fireEvent.animationEnd(screen.getByLabelText("Divider"));
    expect(mockOnAnimationEnd).toHaveBeenCalled();
  });

  test("applies custom classes", () => {
    renderWithTheme(
      <Divider customClass="custom-class" customTitleClass="custom-title-class" customLineClass="custom-line-class" />,
      "light"
    );
    const divider = screen.getByLabelText("Divider");
    expect(divider).toHaveClass("custom-class");
    expect(divider.querySelector("span")).toHaveClass("custom-title-class");
    expect(divider.querySelector("div")).toHaveClass("custom-line-class");
  });

  test("applies theme classes", () => {
    renderWithTheme(<Divider />, "dark");
    const divider = screen.getByLabelText("Divider");
    expect(divider).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with tooltip", () => {
    renderWithTheme(<Divider tooltip="Tooltip text" showTooltip />, "light");
    fireEvent.mouseEnter(screen.getByLabelText("Divider"));
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  test("renders with ripple effect", () => {
    renderWithTheme(<Divider rippleEffect />, "light");
    const divider = screen.getByLabelText("Divider");
    fireEvent.click(divider);
    expect(divider.querySelector(".ripple")).toBeInTheDocument();
  });

  test("renders with custom border width and color", () => {
    renderWithTheme(<Divider borderWidth="4" borderColor="red-500" />, "light");
    const divider = screen.getByLabelText("Divider");
    expect(divider.querySelector("div")).toHaveClass("border-red-500 border-4");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(<Divider textTransform="uppercase" />, "light");
    const divider = screen.getByLabelText("Divider");
    expect(divider).toHaveStyle("textTransform: uppercase");
  });

  test("renders with custom orientation", () => {
    renderWithTheme(<Divider orientation="vertical" />, "light");
    const divider = screen.getByLabelText("Divider");
    expect(divider).toHaveClass("flex-col h-full");
  });

  test("handles drag and drop", () => {
    renderWithTheme(<Divider draggable />, "light");
    const divider = screen.getByLabelText("Divider");
    fireEvent.dragStart(divider, { clientX: 100, clientY: 100 });
    fireEvent.drop(divider, { clientX: 200, clientY: 200 });
    expect(divider).toHaveStyle("left: 100px; top: 100px;");
  });

  test("handles hover event", () => {
    renderWithTheme(<Divider onHover={mockOnHover} />, "light");
    fireEvent.mouseEnter(screen.getByLabelText("Divider"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("renders with custom icon", () => {
    renderWithTheme(<Divider icon={<span>Icon</span>} />, "light");
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("renders with shadow effect", () => {
    renderWithTheme(<Divider shadow />, "light");
    const divider = screen.getByLabelText("Divider");
    expect(divider).toHaveClass("hover:shadow-neon");
  });
});