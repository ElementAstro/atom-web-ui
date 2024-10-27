// src/components/CheckBox.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CheckBox from "./CheckBox";
import { ThemeProvider } from "../context/ThemeContext";

describe("CheckBox Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  test("renders with default props", () => {
    renderWithTheme(<CheckBox checked={false} onChange={() => {}} />, "light");
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("renders with label", () => {
    renderWithTheme(
      <CheckBox checked={false} onChange={() => {}} label="Test Label" />,
      "light"
    );
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("handles change event", () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <CheckBox checked={false} onChange={handleChange} />,
      "light"
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  test("applies custom classes", () => {
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        customClass="custom-class"
        customLabelClass="custom-label-class"
        customBoxClass="custom-box-class"
        customIconClass="custom-icon-class"
      />,
      "light"
    );
    const label = screen.getByRole("checkbox").parentElement;
    expect(label).toHaveClass("custom-class");
    expect(label?.querySelector("span")).toHaveClass("custom-label-class");
    expect(label?.querySelector("div")).toHaveClass("custom-box-class");
  });

  test("handles keyboard interactions", () => {
    const handleKeyDown = jest.fn();
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
      />,
      "light"
    );
    const label = screen.getByRole("checkbox").parentElement;
    fireEvent.keyDown(label!, { key: "Enter" });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  test("renders with different sizes", () => {
    renderWithTheme(
      <CheckBox checked={false} onChange={() => {}} size="large" />,
      "light"
    );
    const box = screen.getByRole("checkbox").nextElementSibling;
    expect(box).toHaveClass("h-6 w-6");
  });

  test("renders with different themes", () => {
    renderWithTheme(
      <CheckBox checked={false} onChange={() => {}} theme="dark" />,
      "dark"
    );
    const box = screen.getByRole("checkbox").nextElementSibling;
    expect(box).toHaveClass("border-gray-700 bg-gray-900 text-white");
  });

  test("renders with tooltip", () => {
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        tooltip="Tooltip text"
        showTooltip
      />,
      "light"
    );
    const label = screen.getByRole("checkbox").parentElement;
    fireEvent.mouseEnter(label!);
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  test("handles ripple effect", () => {
    renderWithTheme(
      <CheckBox checked={false} onChange={() => {}} rippleEffect />,
      "light"
    );
    const box = screen.getByRole("checkbox").nextElementSibling;
    fireEvent.mouseDown(box!);
    expect(box?.querySelector(".ripple")).toBeInTheDocument();
  });

  test("handles focus and blur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
      "light"
    );
    const label = screen.getByRole("checkbox").parentElement;
    fireEvent.focus(label!);
    expect(handleFocus).toHaveBeenCalled();
    fireEvent.blur(label!);
    expect(handleBlur).toHaveBeenCalled();
  });

  test("handles mouse enter and leave events", () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />,
      "light"
    );
    const label = screen.getByRole("checkbox").parentElement;
    fireEvent.mouseEnter(label!);
    expect(handleMouseEnter).toHaveBeenCalled();
    fireEvent.mouseLeave(label!);
    expect(handleMouseLeave).toHaveBeenCalled();
  });

  test("handles animation end event", () => {
    const handleAnimationEnd = jest.fn();
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        onAnimationEnd={handleAnimationEnd}
      />,
      "light"
    );
    const label = screen.getByRole("checkbox").parentElement;
    fireEvent.animationEnd(label!);
    expect(handleAnimationEnd).toHaveBeenCalled();
  });

  test("handles indeterminate state", () => {
    renderWithTheme(
      <CheckBox checked={false} onChange={() => {}} indeterminate />,
      "light"
    );
    const box = screen.getByRole("checkbox").nextElementSibling;
    expect(box?.querySelector("svg")).toBeInTheDocument();
  });

  test("handles disabled state", () => {
    renderWithTheme(
      <CheckBox checked={false} onChange={() => {}} disabled />,
      "light"
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  test("handles checked state", () => {
    renderWithTheme(<CheckBox checked={true} onChange={() => {}} />, "light");
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("handles label position", () => {
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        label="Test Label"
        labelPosition="left"
      />,
      "light"
    );
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("mr-2");
  });

  test("handles custom border color and width", () => {
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        borderColor="red-500"
        borderWidth="4"
      />,
      "light"
    );
    const box = screen.getByRole("checkbox").nextElementSibling;
    expect(box).toHaveClass("border-4 border-red-500");
  });

  test("handles custom text transform", () => {
    renderWithTheme(
      <CheckBox
        checked={false}
        onChange={() => {}}
        textTransform="uppercase"
        label="Test Label"
      />,
      "light"
    );
    const label = screen.getByText("Test Label");
    expect(label).toHaveStyle("text-transform: uppercase");
  });
});
