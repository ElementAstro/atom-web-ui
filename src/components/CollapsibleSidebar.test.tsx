// src/components/CollapsibleSidebar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CollapsibleSidebar from "./CollapsibleSidebar";
import { ThemeProvider } from "../context/ThemeContext";

describe("CollapsibleSidebar Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockItems = [<div key="1">Item 1</div>, <div key="2">Item 2</div>];

  test("renders with default props", () => {
    renderWithTheme(<CollapsibleSidebar items={mockItems} />, "light");
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  test("toggles sidebar open/close state", () => {
    renderWithTheme(<CollapsibleSidebar items={mockItems} />, "light");
    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);
    expect(screen.getByText("Item 1")).toBeVisible();
    fireEvent.click(toggleButton);
    expect(screen.queryByText("Item 1")).not.toBeVisible();
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <CollapsibleSidebar items={mockItems} customClass="custom-class" />,
      "light"
    );
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    expect(sidebar).toHaveClass("custom-class");
  });

  test("handles drag and drop", () => {
    renderWithTheme(<CollapsibleSidebar items={mockItems} draggable />, "light");
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    fireEvent.dragStart(sidebar);
    fireEvent.drop(sidebar);
    expect(sidebar).toBeInTheDocument();
  });

  test("applies theme classes", () => {
    renderWithTheme(<CollapsibleSidebar items={mockItems} theme="dark" />, "dark");
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    expect(sidebar).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <CollapsibleSidebar items={mockItems} showTooltip tooltip="Tooltip text" />,
      "light"
    );
    const toggleButton = screen.getByRole("button");
    fireEvent.mouseEnter(toggleButton);
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  test("handles ripple effect", () => {
    renderWithTheme(<CollapsibleSidebar items={mockItems} rippleEffect />, "light");
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    fireEvent.mouseDown(sidebar);
    expect(sidebar.querySelector(".ripple")).toBeInTheDocument();
  });

  test("handles focus and blur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    renderWithTheme(
      <CollapsibleSidebar items={mockItems} onFocus={handleFocus} onBlur={handleBlur} />,
      "light"
    );
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    fireEvent.focus(sidebar);
    expect(handleFocus).toHaveBeenCalled();
    fireEvent.blur(sidebar);
    expect(handleBlur).toHaveBeenCalled();
  });

  test("handles keyboard interactions", () => {
    const handleKeyDown = jest.fn();
    renderWithTheme(
      <CollapsibleSidebar items={mockItems} onKeyDown={handleKeyDown} />,
      "light"
    );
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    fireEvent.keyDown(sidebar, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  test("handles mouse enter and leave events", () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    renderWithTheme(
      <CollapsibleSidebar
        items={mockItems}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />,
      "light"
    );
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    fireEvent.mouseEnter(sidebar);
    expect(handleMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(sidebar);
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    const handleAnimationEnd = jest.fn();
    renderWithTheme(
      <CollapsibleSidebar items={mockItems} onAnimationEnd={handleAnimationEnd} />,
      "light"
    );
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    fireEvent.animationEnd(sidebar);
    expect(handleAnimationEnd).toHaveBeenCalled();
  });

  test("renders with custom border color and style", () => {
    renderWithTheme(
      <CollapsibleSidebar items={mockItems} borderColor="red-500" borderStyle="dashed" />,
      "light"
    );
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    expect(sidebar).toHaveStyle("border-color: red-500");
    expect(sidebar).toHaveStyle("border-style: dashed");
  });

  test("renders with custom text transform", () => {
    renderWithTheme(
      <CollapsibleSidebar items={mockItems} textTransform="uppercase" />,
      "light"
    );
    const sidebar = screen.getByLabelText("Collapsible sidebar");
    expect(sidebar).toHaveStyle("text-transform: uppercase");
  });
});