// src/components/CollapseButtonGroup.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CollapseButtonGroup from "./CollapseButtonGroup";
import { ThemeProvider } from "../context/ThemeContext";

describe("CollapseButtonGroup Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockButtons = [
    { label: "Button 1", value: "btn1" },
    { label: "Button 2", value: "btn2", disabled: true },
    { label: "Button 3", value: "btn3", loading: true },
  ];

  const mockOnButtonClick = jest.fn();
  const mockOnToggle = jest.fn();
  const mockOnButtonHover = jest.fn();
  const mockOnButtonFocus = jest.fn();
  const mockOnButtonBlur = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
      />,
      "light"
    );
    const mainButton = screen.getByTitle("Main Button");
    expect(mainButton).toBeInTheDocument();
  });

  test("toggles open/close state", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        onToggle={mockOnToggle}
      />,
      "light"
    );
    const mainButton = screen.getByTitle("Main Button");
    fireEvent.click(mainButton);
    expect(mockOnToggle).toHaveBeenCalledWith(true);
    fireEvent.click(mainButton);
    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });

  test("handles button click", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
      />,
      "light"
    );
    const mainButton = screen.getByTitle("Main Button");
    fireEvent.click(mainButton);
    const button1 = screen.getByText("Button 1");
    fireEvent.click(button1);
    expect(mockOnButtonClick).toHaveBeenCalledWith("btn1");
  });

  test("handles button hover", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        onButtonHover={mockOnButtonHover}
      />,
      "light"
    );
    const mainButton = screen.getByTitle("Main Button");
    fireEvent.click(mainButton);
    const button1 = screen.getByText("Button 1");
    fireEvent.mouseEnter(button1);
    expect(mockOnButtonHover).toHaveBeenCalledWith("btn1");
  });

  test("handles button focus and blur", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        onButtonFocus={mockOnButtonFocus}
        onButtonBlur={mockOnButtonBlur}
      />,
      "light"
    );
    const mainButton = screen.getByTitle("Main Button");
    fireEvent.click(mainButton);
    const button1 = screen.getByText("Button 1");
    fireEvent.focus(button1);
    expect(mockOnButtonFocus).toHaveBeenCalledWith("btn1");
    fireEvent.blur(button1);
    expect(mockOnButtonBlur).toHaveBeenCalledWith("btn1");
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        customClass="custom-class"
      />,
      "light"
    );
    const buttonGroup = screen.getByLabelText("Collapse button group");
    expect(buttonGroup).toHaveClass("custom-class");
  });

  test("renders with custom button class", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        customButtonClass="custom-button-class"
      />,
      "light"
    );
    const mainButton = screen.getByTitle("Main Button");
    expect(mainButton).toHaveClass("custom-button-class");
  });

  test("renders with custom icon class", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        customIconClass="custom-icon-class"
        icon={<span className="icon">Icon</span>}
      />,
      "light"
    );
    const icon = screen.getByText("Icon");
    expect(icon).toHaveClass("custom-icon-class");
  });

  test("renders with custom label class", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        customLabelClass="custom-label-class"
      />,
      "light"
    );
    const mainButton = screen.getByTitle("Main Button");
    fireEvent.click(mainButton);
    const button1 = screen.getByText("Button 1");
    expect(button1).toHaveClass("custom-label-class");
  });

  test("renders with custom group class", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        customGroupClass="custom-group-class"
      />,
      "light"
    );
    const buttonGroup = screen.getByLabelText("Collapse button group");
    expect(buttonGroup).toHaveClass("custom-group-class");
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        theme="dark"
      />,
      "dark"
    );
    const mainButton = screen.getByTitle("Main Button");
    expect(mainButton).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("handles draggable functionality", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        draggable
      />,
      "light"
    );
    const buttonGroup = screen.getByLabelText("Collapse button group");
    fireEvent.dragStart(buttonGroup);
    expect(buttonGroup).toHaveAttribute("draggable", "true");
  });

  test("handles resizable functionality", () => {
    renderWithTheme(
      <CollapseButtonGroup
        mainLabel="Main Button"
        buttons={mockButtons}
        onButtonClick={mockOnButtonClick}
        resizable
      />,
      "light"
    );
    const resizeHandle = screen.getByText("", {
      selector: ".cursor-se-resize",
    });
    fireEvent.mouseDown(resizeHandle);
    fireEvent.mouseMove(document, { clientX: 300, clientY: 400 });
    fireEvent.mouseUp(document);
    const buttonGroup = screen.getByLabelText("Collapse button group");
    expect(buttonGroup).toHaveStyle({ width: "300px", height: "400px" });
  });
});
