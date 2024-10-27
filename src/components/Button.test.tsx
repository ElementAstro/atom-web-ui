// src/components/Button.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";
import { ThemeProvider } from "../context/ThemeContext";

describe("Button Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  test("renders with default props", () => {
    renderWithTheme(<Button>Click Me</Button>, "light");
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-blue-500 text-white");
  });

  test("renders with custom variant", () => {
    renderWithTheme(<Button variant="alert">Alert</Button>, "light");
    const buttonElement = screen.getByText("Alert");
    expect(buttonElement).toHaveClass("bg-red-500 text-white");
  });

  test("renders with custom size", () => {
    renderWithTheme(<Button size="large">Large Button</Button>, "light");
    const buttonElement = screen.getByText("Large Button");
    expect(buttonElement).toHaveClass("text-lg px-6 py-3");
  });

  test("renders with loading state", () => {
    renderWithTheme(<Button isLoading>Loading</Button>, "light");
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass("animate-spin");
  });

  test("renders with custom class", () => {
    renderWithTheme(
      <Button customClass="custom-class">Custom</Button>,
      "light"
    );
    const buttonElement = screen.getByText("Custom");
    expect(buttonElement).toHaveClass("custom-class");
  });

  test("renders with icon", () => {
    renderWithTheme(<Button icon="check">With Icon</Button>, "light");
    const iconElement = screen.getByText("With Icon").querySelector("svg");
    expect(iconElement).toBeInTheDocument();
  });

  test("handles click event", () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click Me</Button>, "light");
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });

  test("applies disabled state", () => {
    renderWithTheme(<Button disabled>Disabled</Button>, "light");
    const buttonElement = screen.getByText("Disabled");
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("opacity-50 cursor-not-allowed");
  });

  test("applies ripple effect on click", () => {
    renderWithTheme(<Button ripple>Ripple</Button>, "light");
    const buttonElement = screen.getByText("Ripple");
    fireEvent.mouseDown(buttonElement);
    const rippleElement = buttonElement.querySelector(".ripple");
    expect(rippleElement).toBeInTheDocument();
  });

  test("applies full width style", () => {
    renderWithTheme(<Button fullWidth>Full Width</Button>, "light");
    const buttonElement = screen.getByText("Full Width");
    expect(buttonElement).toHaveClass("w-full");
  });

  test("applies gradient style", () => {
    renderWithTheme(<Button gradient>Gradient</Button>, "light");
    const buttonElement = screen.getByText("Gradient");
    expect(buttonElement).toHaveClass(
      "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
    );
  });

  test("applies shadow style", () => {
    renderWithTheme(<Button shadow>Shadow</Button>, "light");
    const buttonElement = screen.getByText("Shadow");
    expect(buttonElement).toHaveClass("shadow-lg");
  });

  test("applies custom border radius", () => {
    renderWithTheme(
      <Button borderRadius="rounded-full">Rounded</Button>,
      "light"
    );
    const buttonElement = screen.getByText("Rounded");
    expect(buttonElement).toHaveClass("rounded-full");
  });

  test("applies text transform style", () => {
    renderWithTheme(
      <Button textTransform="uppercase">Uppercase</Button>,
      "light"
    );
    const buttonElement = screen.getByText("Uppercase");
    expect(buttonElement).toHaveClass("uppercase");
  });

  test("handles focus event", () => {
    const handleFocus = jest.fn();
    renderWithTheme(<Button onFocus={handleFocus}>Focus</Button>, "light");
    const buttonElement = screen.getByText("Focus");
    fireEvent.focus(buttonElement);
    expect(handleFocus).toHaveBeenCalled();
  });

  test("handles blur event", () => {
    const handleBlur = jest.fn();
    renderWithTheme(<Button onBlur={handleBlur}>Blur</Button>, "light");
    const buttonElement = screen.getByText("Blur");
    fireEvent.blur(buttonElement);
    expect(handleBlur).toHaveBeenCalled();
  });

  test("handles mouse enter event", () => {
    const handleMouseEnter = jest.fn();
    renderWithTheme(
      <Button onMouseEnter={handleMouseEnter}>Mouse Enter</Button>,
      "light"
    );
    const buttonElement = screen.getByText("Mouse Enter");
    fireEvent.mouseEnter(buttonElement);
    expect(handleMouseEnter).toHaveBeenCalled();
  });

  test("handles mouse leave event", () => {
    const handleMouseLeave = jest.fn();
    renderWithTheme(
      <Button onMouseLeave={handleMouseLeave}>Mouse Leave</Button>,
      "light"
    );
    const buttonElement = screen.getByText("Mouse Leave");
    fireEvent.mouseLeave(buttonElement);
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  test("handles key down event", () => {
    const handleKeyDown = jest.fn();
    renderWithTheme(
      <Button onKeyDown={handleKeyDown}>Key Down</Button>,
      "light"
    );
    const buttonElement = screen.getByText("Key Down");
    fireEvent.keyDown(buttonElement, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    const handleAnimationEnd = jest.fn();
    renderWithTheme(
      <Button onAnimationEnd={handleAnimationEnd}>Animation End</Button>,
      "light"
    );
    const buttonElement = screen.getByText("Animation End");
    fireEvent.animationEnd(buttonElement);
    expect(handleAnimationEnd).toHaveBeenCalled();
  });
});
