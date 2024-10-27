// src/components/Tag.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Tag from "./Tag";
import { ThemeProvider } from "../context/ThemeContext";

describe("Tag Component", () => {
  const renderWithTheme = (ui: React.ReactElement, theme: string) => {
    return render(<ThemeProvider initialTheme={theme}>{ui}</ThemeProvider>);
  };

  const mockOnClick = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnHover = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  test("renders with default props", () => {
    renderWithTheme(<Tag>Default Tag</Tag>, "light");
    expect(screen.getByText("Default Tag")).toBeInTheDocument();
  });

  test("renders with custom props", () => {
    renderWithTheme(
      <Tag
        onClick={mockOnClick}
        removable={true}
        onRemove={mockOnRemove}
        disabled={false}
        size="large"
        onHover={mockOnHover}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        color="bg-blue-500"
        icon={<span>Icon</span>}
        tooltip="Custom Tooltip"
        border="border-solid"
        rounded="rounded-lg"
        theme="dark"
        borderWidth="4"
        animation="transition duration-500 transform hover:scale-110"
        fullscreen={true}
        draggable={true}
        hoverColor="hover:bg-blue-700"
        activeColor="active:bg-blue-900"
        disabledColor="opacity-25 cursor-not-allowed"
        hoverAnimation="hover:scale-110"
        showLabels={false}
        labelColor="text-yellow-200"
        labelActiveColor="text-green-200"
      >
        Custom Tag
      </Tag>,
      "dark"
    );
    expect(screen.getByText("Custom Tag")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByTitle("Custom Tooltip")).toBeInTheDocument();
  });

  test("calls onClick when tag is clicked", () => {
    renderWithTheme(<Tag onClick={mockOnClick}>Clickable Tag</Tag>, "light");
    fireEvent.click(screen.getByText("Clickable Tag"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  test("calls onHover when tag is hovered", () => {
    renderWithTheme(<Tag onHover={mockOnHover}>Hoverable Tag</Tag>, "light");
    fireEvent.mouseEnter(screen.getByText("Hoverable Tag"));
    expect(mockOnHover).toHaveBeenCalled();
  });

  test("calls onFocus and onBlur when tag is focused and blurred", () => {
    renderWithTheme(
      <Tag onFocus={mockOnFocus} onBlur={mockOnBlur}>
        Focusable Tag
      </Tag>,
      "light"
    );
    const tag = screen.getByText("Focusable Tag");
    fireEvent.focus(tag);
    expect(mockOnFocus).toHaveBeenCalled();
    fireEvent.blur(tag);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test("handles drag and drop correctly", () => {
    renderWithTheme(<Tag draggable={true}>Draggable Tag</Tag>, "light");
    const tag = screen.getByText("Draggable Tag");
    fireEvent.dragStart(tag, {
      clientX: 100,
      clientY: 100,
    });
    fireEvent.drop(tag, {
      clientX: 200,
      clientY: 200,
    });
    expect(tag).toBeInTheDocument();
  });

  test("calls onRemove when remove button is clicked", () => {
    renderWithTheme(
      <Tag removable={true} onRemove={mockOnRemove}>
        Removable Tag
      </Tag>,
      "light"
    );
    fireEvent.click(screen.getByLabelText("Remove tag"));
    expect(mockOnRemove).toHaveBeenCalled();
  });

  test("applies theme classes correctly", () => {
    renderWithTheme(<Tag theme="astronomy">Themed Tag</Tag>, "astronomy");
    expect(screen.getByText("Themed Tag").closest("span")).toHaveClass(
      "bg-gradient-to-r from-purple-900 via-blue-900 to-black text-white border-purple-500"
    );
  });
});