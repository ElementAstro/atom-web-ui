// src/components/ButtonGroup.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ButtonGroup from "./ButtonGroup";
import { ThemeProvider } from "../context/ThemeContext";

describe("ButtonGroup Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const buttons = [
    { label: "Button 1", value: "btn1" },
    { label: "Button 2", value: "btn2", disabled: true },
    { label: "Button 3", value: "btn3" },
  ];

  test("renders with default props", () => {
    renderWithTheme(
      <ButtonGroup buttons={buttons} onButtonClick={() => {}} />,
      "light"
    );
    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
    expect(screen.getByText("Button 3")).toBeInTheDocument();
  });

  test("handles button click", () => {
    const onButtonClick = jest.fn();
    renderWithTheme(
      <ButtonGroup buttons={buttons} onButtonClick={onButtonClick} />,
      "light"
    );
    fireEvent.click(screen.getByText("Button 1"));
    expect(onButtonClick).toHaveBeenCalledWith("btn1");
  });

  test("does not call onButtonClick for disabled buttons", () => {
    const onButtonClick = jest.fn();
    renderWithTheme(
      <ButtonGroup buttons={buttons} onButtonClick={onButtonClick} />,
      "light"
    );
    fireEvent.click(screen.getByText("Button 2"));
    expect(onButtonClick).not.toHaveBeenCalled();
  });

  test("applies custom classes and styles", () => {
    renderWithTheme(
      <ButtonGroup
        buttons={buttons}
        onButtonClick={() => {}}
        className="custom-class"
        size="large"
        variant="success"
        rounded={false}
        shadow={true}
        hoverEffect={false}
        borderStyle="dashed"
        borderWidth="2"
        borderColor="blue"
        textTransform="uppercase"
      />,
      "light"
    );
    const buttonElement = screen.getByText("Button 1").parentElement;
    expect(buttonElement).toHaveClass("custom-class");
    expect(screen.getByText("Button 1")).toHaveClass(
      "p-3 text-lg bg-green-500"
    );
    expect(screen.getByText("Button 1")).toHaveClass(
      "border-2 border-blue border-dashed"
    );
    expect(screen.getByText("Button 1")).toHaveClass("uppercase");
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <ButtonGroup
        buttons={buttons}
        onButtonClick={() => {}}
        tooltip="Tooltip text"
      />,
      "light"
    );
    expect(screen.getByText("Button 1")).toHaveAttribute(
      "title",
      "Tooltip text"
    );
  });

  test("handles focus and blur events", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    renderWithTheme(
      <ButtonGroup
        buttons={buttons}
        onButtonClick={() => {}}
        onFocus={onFocus}
        onBlur={onBlur}
      />,
      "light"
    );
    const buttonElement = screen.getByText("Button 1");
    fireEvent.focus(buttonElement);
    expect(onFocus).toHaveBeenCalled();
    fireEvent.blur(buttonElement);
    expect(onBlur).toHaveBeenCalled();
  });

  test("handles mouse enter and leave events", () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    renderWithTheme(
      <ButtonGroup
        buttons={buttons}
        onButtonClick={() => {}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />,
      "light"
    );
    const buttonElement = screen.getByText("Button 1");
    fireEvent.mouseEnter(buttonElement);
    expect(onMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(buttonElement);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  test("handles key down event", () => {
    const onKeyDown = jest.fn();
    renderWithTheme(
      <ButtonGroup
        buttons={buttons}
        onButtonClick={() => {}}
        onKeyDown={onKeyDown}
      />,
      "light"
    );
    const buttonElement = screen.getByText("Button 1");
    fireEvent.keyDown(buttonElement, { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  test("applies theme classes", () => {
    renderWithTheme(
      <ButtonGroup buttons={buttons} onButtonClick={() => {}} />,
      "dark"
    );
    const buttonElement = screen.getByText("Button 1").parentElement;
    expect(buttonElement).toHaveClass("bg-gray-900 text-white border-gray-700");
  });

  test("handles ripple effect", () => {
    renderWithTheme(
      <ButtonGroup buttons={buttons} onButtonClick={() => {}} ripple />,
      "light"
    );
    const buttonElement = screen.getByText("Button 1");
    fireEvent.mouseDown(buttonElement);
    const rippleElement = buttonElement.querySelector(".ripple");
    expect(rippleElement).toBeInTheDocument();
  });
});
